/* ============================================================================
   SYNC-INSTAGRAM — pulls the latest posts from Meta's Instagram Graph API and
   commits the result into the repo. Runs ONLY in CI (see
   .github/workflows/instagram-sync.yml), on a schedule, never as part of the
   normal `npm run build`. This is a static site with no backend — a build-time
   sync that commits its output is the only way to show an Instagram feed
   without hot-linking Instagram's own CDN (which expires in days) or standing
   up a server.

   Fails SOFT on any API/network error: logs a warning, leaves the existing
   public/instagram/ images and src/data/instagram.js untouched, exits 0. A
   token blip must never blank the homepage or turn a scheduled run into a
   red, blocking build.
   ========================================================================== */
import { readdirSync, mkdirSync, writeFileSync, unlinkSync, appendFileSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

// --- Tuning knobs ----------------------------------------------------------
const POST_LIMIT = 9          // how many recent posts to show
const IMAGE_WIDTHS = [640, 1280] // srcset widths generated per post, px
const WEBP_QUALITY = 78
const CAPTION_MAX_LENGTH = 120   // characters, truncated on a word boundary
// ----------------------------------------------------------------------------

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const IMAGE_DIR = join(root, 'public', 'instagram')
const DATA_FILE = join(root, 'src', 'data', 'instagram.js')

const TOKEN = process.env.IG_ACCESS_TOKEN

function setOutput(name, value) {
  const file = process.env.GITHUB_OUTPUT
  if (!file) return
  appendFileSync(file, `${name}=${String(value).replace(/\r?\n/g, ' ')}\n`, 'utf8')
}

function cleanCaption(raw, maxLength) {
  if (!raw) return ''
  // Drop a trailing run of "#tag" tokens (and the whitespace before it) —
  // the block of hashtags most captions end with, not hashtags mid-sentence.
  let text = raw.replace(/(?:\s*#[^\s#]+)+\s*$/u, '')
  text = text.replace(/\s+/g, ' ').trim()
  if (text.length <= maxLength) return text
  const cut = text.slice(0, maxLength)
  const lastSpace = cut.lastIndexOf(' ')
  const base = (lastSpace > 20 ? cut.slice(0, lastSpace) : cut).trimEnd()
  return `${base}…`
}

function sourceUrlFor(media) {
  // Images and carousel covers use media_url; video/Reels have no usable
  // media_url for a static <img>, so their poster frame (thumbnail_url)
  // stands in — Reels/videos render as a static frame, never autoplay here.
  if (media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM') {
    return media.media_url || media.thumbnail_url
  }
  return media.thumbnail_url || media.media_url
}

async function fetchMedia() {
  const params = new URLSearchParams({
    fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp',
    limit: String(POST_LIMIT),
    access_token: TOKEN,
  })
  const res = await fetch(`https://graph.instagram.com/me/media?${params.toString()}`)
  if (!res.ok) {
    throw new Error(`Instagram /me/media responded ${res.status} ${res.statusText}`)
  }
  const body = await res.json()
  if (!Array.isArray(body?.data)) {
    throw new Error('Instagram /me/media returned an unexpected response shape.')
  }
  return body.data.slice(0, POST_LIMIT)
}

async function downloadImage(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Image download responded ${res.status} ${res.statusText}`)
  return Buffer.from(await res.arrayBuffer())
}

// Resizes one source image to every configured width and returns the
// buffers plus the real intrinsic dimensions of the largest variant, read
// straight from sharp's own output — never hardcoded.
async function buildVariants(sourceBuffer, id) {
  const variants = {}
  let largest = null

  for (const width of IMAGE_WIDTHS) {
    const { data, info } = await sharp(sourceBuffer)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer({ resolveWithObject: true })

    const filename = `${id}-${width}.webp`
    variants[width] = { filename, data }
    if (!largest || info.width > largest.width) {
      largest = { width: info.width, height: info.height }
    }
  }

  return { variants, width: largest.width, height: largest.height }
}

async function refreshToken() {
  const params = new URLSearchParams({
    grant_type: 'ig_refresh_token',
    access_token: TOKEN,
  })
  const res = await fetch(`https://graph.instagram.com/refresh_access_token?${params.toString()}`)
  if (!res.ok) {
    throw new Error(`refresh_access_token responded ${res.status} ${res.statusText}`)
  }
  const body = await res.json()
  if (!body?.access_token || typeof body.expires_in !== 'number') {
    throw new Error('refresh_access_token returned an unexpected response shape.')
  }
  return body
}

async function main() {
  if (!TOKEN) {
    console.warn('sync-instagram: IG_ACCESS_TOKEN is not set. Skipping sync — existing feed left untouched.')
    return
  }

  let media
  try {
    media = await fetchMedia()
  } catch (err) {
    console.warn('sync-instagram: could not fetch media from Instagram. Existing feed left untouched.')
    console.warn(err?.message || err)
    return
  }

  // Build everything in memory first. Nothing on disk changes unless every
  // post in this batch is processed successfully — a failure partway through
  // must never leave public/instagram/ or instagram.js half-written.
  const posts = []
  const filesToWrite = []

  for (const item of media) {
    const src = sourceUrlFor(item)
    if (!src) {
      console.warn(`sync-instagram: post ${item.id} has no usable image URL. Skipping this post.`)
      continue
    }

    try {
      const sourceBuffer = await downloadImage(src)
      const { variants, width, height } = await buildVariants(sourceBuffer, item.id)

      for (const width of IMAGE_WIDTHS) {
        filesToWrite.push(variants[width])
      }

      posts.push({
        id: item.id,
        permalink: item.permalink,
        caption: cleanCaption(item.caption, CAPTION_MAX_LENGTH),
        mediaType: item.media_type,
        timestamp: item.timestamp,
        src: `/instagram/${variants[IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1]].filename}`,
        srcSmall: `/instagram/${variants[IMAGE_WIDTHS[0]].filename}`,
        width,
        height,
      })
    } catch (err) {
      console.warn(`sync-instagram: failed to process post ${item.id}. Skipping this post.`)
      console.warn(err?.message || err)
    }
  }

  if (posts.length === 0) {
    console.warn('sync-instagram: no posts could be processed. Existing feed left untouched.')
    return
  }

  // Prune any file whose media id is no longer in this batch, so the working
  // tree stays at POST_LIMIT posts × IMAGE_WIDTHS.length files.
  mkdirSync(IMAGE_DIR, { recursive: true })
  const keepFilenames = new Set(filesToWrite.map((f) => f.filename))
  if (existsSync(IMAGE_DIR)) {
    for (const existing of readdirSync(IMAGE_DIR)) {
      if (!keepFilenames.has(existing)) unlinkSync(join(IMAGE_DIR, existing))
    }
  }
  for (const file of filesToWrite) {
    writeFileSync(join(IMAGE_DIR, file.filename), file.data)
  }

  const fileContents = `// GENERATED by scripts/sync-instagram.mjs — do not edit by hand.
export default ${JSON.stringify(posts, null, 2)}
`
  writeFileSync(DATA_FILE, fileContents, 'utf8')
  console.log(`sync-instagram: wrote ${posts.length} post(s) to src/data/instagram.js.`)

  // Token refresh is independent of the content sync above — a refresh
  // failure should warn, not undo a sync that already succeeded.
  try {
    const refreshed = await refreshToken()
    const daysRemaining = Math.floor(refreshed.expires_in / 86400)
    console.log(`sync-instagram: refreshed access token, expires in ${daysRemaining} day(s).`)
    setOutput('new_token', refreshed.access_token)
    setOutput('days_remaining', daysRemaining)
  } catch (err) {
    console.warn('sync-instagram: token refresh failed. Existing token (and its real expiry) is unchanged.')
    console.warn(err?.message || err)
  }
}

main().catch((err) => {
  console.warn('sync-instagram: unexpected error. Existing feed left untouched.')
  console.warn(err?.message || err)
})
