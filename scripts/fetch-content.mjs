/* ============================================================================
   FETCH-CONTENT — pulls published posts from Sanity at BUILD TIME and writes
   src/content/posts.json. Runs before `vite build` (see package.json), so
   the converted article HTML already exists on disk by the time
   scripts/prerender.mjs bakes it into #root.

   Nothing here ever ships to the browser: @sanity/client and
   @portabletext/to-html are devDependencies used only by this script.

   Fails loudly (non-zero exit) on a fetch error or a malformed post — a
   silent empty blog deploying over a working one is worse than a red build.
   A genuinely empty dataset (zero published posts) is not an error: it
   writes an empty array and warns, so a brand-new blog can still ship.
   ========================================================================== */
import { createClient } from '@sanity/client'
import { toHTML } from '@portabletext/to-html'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { projectId, dataset, apiVersion } from '../src/data/blog.config.js'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const outFile = join(root, 'src', 'content', 'posts.json')

const WORDS_PER_MINUTE = 200

if (!projectId || projectId === 'REPLACE_WITH_SANITY_PROJECT_ID') {
  console.error(
    'fetch-content: src/data/blog.config.js still has the placeholder projectId.\n' +
    'Create the Sanity project first (see 180method-studio/), then paste the real ' +
    'project ID into blog.config.js, sanity.config.js and sanity.cli.js.'
  )
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, useCdn: true })

// Drafts are explicitly excluded by ID pattern (belt-and-braces alongside the
// client's default published perspective) and unpublished-future posts are
// excluded by the publishedAt <= now() clause.
const QUERY = `*[_type == "post" && !(_id in path("drafts.**")) && publishedAt <= now()] | order(publishedAt desc){
  title,
  "slug": slug.current,
  seoTitle,
  seoDescription,
  excerpt,
  heroImage,
  body,
  category,
  author,
  publishedAt,
  _updatedAt
}`

function plainText(blocks) {
  return (blocks || [])
    .filter((block) => block._type === 'block')
    .map((block) => (block.children || []).map((span) => span.text || '').join(''))
    .join(' ')
}

function readingTime(blocks) {
  const words = plainText(blocks).trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

// Sanity image asset refs encode dimensions + format in the ID itself:
// image-<assetId>-<width>x<height>-<format>. Parsing that means we can build
// every transformed CDN URL locally — no extra network round-trip and no
// @sanity/image-url dependency just to assemble a query string.
const REF_PATTERN = /^image-([a-z0-9]+)-(\d+)x(\d+)-(\w+)$/i

function imageVariant(ref, { w, h, fit = 'crop', fm = 'webp', q = 80 }) {
  const match = REF_PATTERN.exec(ref)
  if (!match) throw new Error(`Unrecognised Sanity image asset ref: "${ref}"`)
  // The path segment must be the ORIGINAL uploaded asset's own dimensions —
  // that's the actual filename Sanity stored, not the size we're requesting.
  // The resize itself only happens via the ?w=&h= query params below.
  const [, assetId, originalWidth, originalHeight, format] = match
  const base = `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${originalWidth}x${originalHeight}.${format}`
  const params = new URLSearchParams({ w: String(w), h: String(h), fit, fm, q: String(q) })
  // fit=crop guarantees the delivered image is exactly w×h, so the requested
  // transform size doubles as the correct intrinsic width/height attribute.
  return { url: `${base}?${params.toString()}`, width: w, height: h }
}

function buildImage(heroImage, slugForError) {
  const ref = heroImage?.asset?._ref
  if (!ref || !heroImage?.alt) {
    throw new Error(`Post "${slugForError}" is missing a hero image or its alt text.`)
  }
  return {
    alt: heroImage.alt,
    hero: imageVariant(ref, { w: 1600, h: 900 }),
    card: imageVariant(ref, { w: 800, h: 500 }),
    og: imageVariant(ref, { w: 1200, h: 630 }),
  }
}

// Serializers bake in the same Tailwind classes the rest of the site uses for
// each heading level (h1–h4 already get font-display/uppercase/tracking from
// the global base layer — src/index.css — so only size + spacing are added
// here) so the injected article HTML needs no separate "blog prose" stylesheet.
const portableComponents = {
  block: {
    h2: ({ children }) => `<h2 class="mt-12 mb-5 text-fluid-xl leading-tight">${children}</h2>`,
    h3: ({ children }) => `<h3 class="mt-9 mb-4 text-fluid-lg leading-snug">${children}</h3>`,
    blockquote: ({ children }) =>
      `<blockquote class="my-8 border-l-2 border-lime pl-6 text-fluid-lg italic leading-relaxed text-ink/70">${children}</blockquote>`,
    normal: ({ children }) => `<p class="mb-5 text-fluid-lg leading-relaxed text-ink/80">${children}</p>`,
  },
  list: {
    bullet: ({ children }) => `<ul class="mb-5 ml-5 list-disc space-y-2 text-fluid-lg leading-relaxed text-ink/80">${children}</ul>`,
    number: ({ children }) => `<ol class="mb-5 ml-5 list-decimal space-y-2 text-fluid-lg leading-relaxed text-ink/80">${children}</ol>`,
  },
  listItem: {
    bullet: ({ children }) => `<li class="pl-1">${children}</li>`,
    number: ({ children }) => `<li class="pl-1">${children}</li>`,
  },
  marks: {
    strong: ({ children }) => `<strong class="font-semibold text-ink">${children}</strong>`,
    em: ({ children }) => `<em class="italic">${children}</em>`,
    link: ({ children, value }) => {
      const href = value?.href || ''
      // Only ever emit href schemes the Studio itself validated (see
      // schemaTypes/post.js) — refuses to render anything else, e.g. javascript:.
      if (!/^(https?:|mailto:|tel:)/.test(href)) return children
      const external = value?.blank !== false
      // "No follow" is an editorial choice per link (e.g. citing WHO — we
      // don't want to pass authority to a page we don't control), set from
      // the Studio's link popup, not inferred from the domain.
      const relTokens = [external && 'noopener', external && 'noreferrer', value?.nofollow && 'nofollow'].filter(Boolean)
      const relAttr = relTokens.length ? ` rel="${relTokens.join(' ')}"` : ''
      const targetAttr = external ? ' target="_blank"' : ''
      // Solid lime-on-white text fails contrast (≈1.6:1 — unreadable), so the
      // "yellow-green" pop comes from a soft lime highlight behind dark green
      // text instead of the text itself being lime.
      return `<a href="${href}" class="rounded bg-lime/35 px-1 py-0.5 text-forest-700 underline decoration-forest-700 decoration-2 underline-offset-2 transition-colors hover:bg-lime/55"${targetAttr}${relAttr}>${children}</a>`
    },
  },
}

function assertPost(post) {
  const required = ['title', 'slug', 'seoTitle', 'seoDescription', 'excerpt', 'body', 'publishedAt']
  for (const field of required) {
    if (!post[field]) {
      throw new Error(`Post "${post.slug || post.title || '(untitled)'}" is missing required field "${field}".`)
    }
  }
  if (post.seoTitle.length > 60) {
    throw new Error(`Post "${post.slug}": seoTitle is ${post.seoTitle.length} characters (max 60). Fix it in Sanity.`)
  }
  if (post.seoDescription.length < 140 || post.seoDescription.length > 160) {
    throw new Error(
      `Post "${post.slug}": seoDescription is ${post.seoDescription.length} characters (must be 140–160). Fix it in Sanity.`
    )
  }
}

async function main() {
  let raw
  try {
    raw = await client.fetch(QUERY)
  } catch (err) {
    console.error('fetch-content: could not reach Sanity.')
    console.error(err?.message || err)
    process.exit(1)
  }

  mkdirSync(dirname(outFile), { recursive: true })

  if (!raw || raw.length === 0) {
    writeFileSync(outFile, '[]\n', 'utf8')
    console.warn('fetch-content: no published posts found. Wrote an empty src/content/posts.json.')
    return
  }

  const posts = raw.map((post) => {
    assertPost(post)
    return {
      title: post.title,
      slug: post.slug,
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      excerpt: post.excerpt,
      category: post.category || null,
      author: post.author || '180 Method',
      publishedAt: post.publishedAt,
      // Sanity's own last-edit timestamp — the real "last modified" signal
      // for the sitemap, distinct from publishedAt (which never changes once set).
      updatedAt: post._updatedAt || post.publishedAt,
      readingTime: readingTime(post.body),
      bodyHtml: toHTML(post.body, { components: portableComponents }),
      image: buildImage(post.heroImage, post.slug),
    }
  })

  writeFileSync(outFile, JSON.stringify(posts, null, 2) + '\n', 'utf8')
  console.log(`fetch-content: wrote ${posts.length} post(s) to src/content/posts.json.`)
}

main().catch((err) => {
  console.error('fetch-content: build-breaking error.')
  console.error(err?.message || err)
  process.exit(1)
})
