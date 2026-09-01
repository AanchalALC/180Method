/* ============================================================================
   PRERENDER — bakes page-specific <title>/meta description/canonical/OG tags
   into a static index.html per route, post `vite build`. Also generates
   dist/sitemap.xml.

   Why this exists: this is a client-only SPA. vercel.json rewrites every path
   to /index.html, and the <Seo> component (src/components/ui/Widgets.jsx)
   only rewrites document.title/meta tags *after* React mounts. Anything that
   reads the raw HTML response — view-source, most SEO auditors, link-preview
   crawlers — never runs that JS and sees whatever is baked into index.html,
   which was only ever the Home page's tags. Vercel serves a matching static
   file before falling back to a rewrite, so writing dist/<route>/index.html
   per page fixes this without touching the app's runtime behavior.

   SEO copy for the nine static pages and five team pages is read straight out
   of each page's <Seo title=".." description=".." path=".."> JSX (and
   src/data/team.js for member profiles) so this can never drift from what's
   already shown to users — it's a mirror, not a second source of truth. That
   part of this file is UNCHANGED from before the blog existed.

   Blog routes are different on purpose: their content lives in
   src/content/posts.json (written by scripts/fetch-content.mjs from Sanity
   before this script ever runs), and — unlike every other route — their
   article HTML is actually injected into #root. The prerender step needs the
   article body available at build time; a blog that only fetches its own
   text client-side would put the article outside the HTML response, which
   defeats the entire SEO reason this feature exists. React's
   createRoot().render() replaces this injected markup on hydration — that is
   expected, and is why it only has to be reasonably complete, not pixel
   perfect (no Navbar/Footer chrome is duplicated here).
   ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'
import { team } from '../src/data/team.js'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(root, 'dist')
const template = readFileSync(join(distDir, 'index.html'), 'utf8')
const SITE_URL = 'https://180method.in'
const BUILD_TIME = new Date().toISOString()

// Real "last modified" per URL, not a hand-maintained guess: the source
// file's last commit date for static/team pages, Sanity's own _updatedAt
// for blog content. Falls back to build time if git history isn't available
// (e.g. a shallow clone) so a missing/failed git lookup never breaks the build.
function gitLastMod(relPath) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${relPath}"`, {
      cwd: root,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    return out || BUILD_TIME
  } catch {
    return BUILD_TIME
  }
}

const STATIC_PAGES = [
  'Home',
  'About',
  'Services',
  'Team',
  'Counselling',
  'Reviews',
  'Faqs',
  'MediaFeatures',
  'Contact',
]

function extractSeo(componentName) {
  const src = readFileSync(join(root, 'src', 'pages', `${componentName}.jsx`), 'utf8')
  const tag = src.match(/<Seo\b([\s\S]*?)\/>/)
  if (!tag) throw new Error(`No <Seo /> tag found in ${componentName}.jsx`)
  const attrs = tag[1]
  const title = attrs.match(/\btitle="([^"]*)"/)?.[1]
  const description = attrs.match(/\bdescription="([^"]*)"/)?.[1]
  const path = attrs.match(/\bpath="([^"]*)"/)?.[1]
  if (!title || !description || !path) {
    throw new Error(`Could not extract title/description/path from <Seo> in ${componentName}.jsx`)
  }
  return { path, title, description }
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/* ----------------------------------------------------------------------------
   1) STATIC PAGES + TEAM — unchanged behaviour. Meta tags only, #root untouched.
---------------------------------------------------------------------------- */
const legacyRoutes = [
  ...STATIC_PAGES.map(extractSeo),
  ...team.map((m) => ({ path: m.path, title: m.seoTitle, description: m.seoDescription })),
]

for (const { path, title, description } of legacyRoutes) {
  const url = `${SITE_URL}${path}`
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)

  let html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${safeDescription}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${safeTitle}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${safeDescription}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)

  // Google Search Console verification tag is only valid for the home page.
  if (path !== '/') {
    html = html.replace(/\r?\n?\s*<meta name="google-site-verification"[^>]*\/>/, '')
  }

  const outDir = path === '/' ? distDir : join(distDir, path.replace(/^\/|\/$/g, ''))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
}

console.log(`prerender: wrote page-specific SEO tags for ${legacyRoutes.length} static/team routes.`)

/* ----------------------------------------------------------------------------
   2) BLOG — content-driven routes. Meta tags + og:type/og:image + JSON-LD +
   real article/card HTML injected into #root.
---------------------------------------------------------------------------- */
const postsFile = join(root, 'src', 'content', 'posts.json')
if (!existsSync(postsFile)) {
  throw new Error(
    'prerender: src/content/posts.json not found. Run `npm run content` (or let `npm run build` do it) before prerendering.'
  )
}
const posts = JSON.parse(readFileSync(postsFile, 'utf8'))

function injectRoot(html, bodyHtml) {
  if (!html.includes('<div id="root"></div>')) {
    throw new Error('prerender: expected an empty <div id="root"></div> in the built index.html template.')
  }
  return html.replace('<div id="root"></div>', `<div id="root">${bodyHtml}</div>`)
}

function injectSchema(html, schemaObj) {
  // < guards against a literal "</script>" inside JSON-LD string values
  // (e.g. a title containing that text) breaking out of the script tag early.
  const json = JSON.stringify(schemaObj).replace(/</g, '\\u003c')
  const scriptTag = `<script type="application/ld+json">${json}</script>\n  </head>`
  return html.replace('</head>', scriptTag)
}

function applyMeta(html, { title, description, url, ogImage, ogType }) {
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)
  if (ogImage) {
    out = out.replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${ogImage}" />`)
  }
  if (ogType) {
    out = out.replace(/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${ogType}" />`)
  }
  // Google Search Console verification tag is only valid for the home page.
  out = out.replace(/\r?\n?\s*<meta name="google-site-verification"[^>]*\/>/, '')
  return out
}

function renderCard(post, index) {
  const cycle = ['bg-lime text-ink', 'border border-forest-600/35 text-forest-700', 'bg-forest-600 text-paper', 'bg-aloe-300 text-forest-950']
  const tag = post.category
    ? `<span class="mb-4 inline-block w-fit rounded-full border font-display text-fluid-xs uppercase tracking-[0.12em] px-5 py-2.5 ${cycle[index % cycle.length]}">${escapeHtml(post.category)}</span>`
    : ''
  return `
    <a href="/blog/${post.slug}/" class="flex h-full flex-col overflow-hidden rounded-4xl border border-ink/10 bg-paper">
      <div class="aspect-[8/5] w-full overflow-hidden">
        <img src="${post.image.card.url}" width="${post.image.card.width}" height="${post.image.card.height}" alt="${escapeHtml(post.image.alt)}" loading="lazy" class="h-full w-full object-cover" />
      </div>
      <div class="flex flex-1 flex-col p-7">
        ${tag}
        <h3 class="text-fluid-lg leading-snug">${escapeHtml(post.title)}</h3>
        <p class="mt-3 flex-1 leading-relaxed text-ink/60">${escapeHtml(post.excerpt)}</p>
        <p class="mt-6 border-t border-ink/10 pt-4 text-fluid-xs uppercase tracking-[0.14em] text-ink/40">${formatDate(post.publishedAt)} · ${post.readingTime} min read</p>
      </div>
    </a>`
}

function renderBlogIndexBody(posts) {
  const grid = posts.length
    ? `<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${posts.map(renderCard).join('')}</div>`
    : `<p class="max-w-prose leading-relaxed text-ink/70">We're writing the first post. Check back shortly.</p>`

  return `<div class="flex min-h-screen flex-col"><main id="main" class="flex-1">
    <header class="relative flex min-h-[48vh] items-end overflow-hidden bg-ink-950 pb-14 pt-24 md:min-h-[58vh] md:pb-20">
      <div class="absolute inset-0 -z-10" style="background:radial-gradient(130% 130% at 12% 0%,#275442 0%,#0F2618 42%,#040604 100%)"></div>
      <div class="container mx-auto px-5">
        <p class="mb-5 font-display text-fluid-xs uppercase tracking-[0.24em] text-lime">180 Journal</p>
        <h1 class="max-w-4xl text-fluid-3xl leading-none text-paper">Ideas worth training on</h1>
        <p class="mt-6 max-w-prose text-fluid-lg leading-relaxed text-paper-100/70">Coaching notes on strength, nutrition, recovery and the mindset that holds it all together.</p>
      </div>
    </header>
    <section class="bg-paper-100 py-16">
      <div class="container mx-auto px-5">${grid}</div>
    </section>
  </main></div>`
}

function renderBlogPostBody(post) {
  return `<div class="flex min-h-screen flex-col"><main id="main" class="flex-1">
    <header class="relative flex min-h-[48vh] items-end overflow-hidden bg-ink-950 pb-14 pt-24 md:min-h-[58vh] md:pb-20">
      <img src="${post.image.hero.url}" width="${post.image.hero.width}" height="${post.image.hero.height}" alt="${escapeHtml(post.image.alt)}" class="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
      <div class="container mx-auto px-5">
        ${post.category ? `<span class="mb-5 inline-block rounded-full bg-lime px-5 py-2.5 font-display text-fluid-xs uppercase tracking-[0.12em] text-ink">${escapeHtml(post.category)}</span>` : ''}
        <h1 class="max-w-4xl text-fluid-3xl leading-none text-paper">${escapeHtml(post.title)}</h1>
        <p class="mt-6 font-display text-fluid-xs uppercase tracking-[0.14em] text-paper-100/60">${formatDate(post.publishedAt)} · ${post.readingTime} min read · ${escapeHtml(post.author)}</p>
      </div>
    </header>
    <section class="bg-paper py-16">
      <div class="container mx-auto px-5">
        <a href="/blog/" class="mb-10 inline-block font-display text-fluid-xs uppercase tracking-[0.14em] text-ink/50">All posts</a>
        <div class="max-w-prose">${post.bodyHtml}</div>
      </div>
    </section>
  </main></div>`
}

const blogRouteCount = 1 + posts.length

// /blog/
{
  const url = `${SITE_URL}/blog/`
  const html = injectRoot(
    applyMeta(template, {
      title: 'Blog | 180 Method',
      description:
        'Coaching notes on strength, nutrition, recovery and the mindset that holds it all together — from the team at 180 Method.',
      url,
    }),
    renderBlogIndexBody(posts)
  )
  mkdirSync(join(distDir, 'blog'), { recursive: true })
  writeFileSync(join(distDir, 'blog', 'index.html'), html, 'utf8')
}

// /blog/<slug>/
for (const post of posts) {
  const url = `${SITE_URL}/blog/${post.slug}/`
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.seoDescription,
    image: post.image.og.url,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: '180 Method',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/logo-ink.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  }

  let html = applyMeta(template, {
    title: post.seoTitle,
    description: post.seoDescription,
    url,
    ogImage: post.image.og.url,
    ogType: 'article',
  })
  html = injectSchema(html, schema)
  html = injectRoot(html, renderBlogPostBody(post))

  const outDir = join(distDir, 'blog', post.slug)
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
}

console.log(`prerender: wrote ${blogRouteCount} blog route(s) (1 index + ${posts.length} post[s]).`)

/* ----------------------------------------------------------------------------
   3) SITEMAP — the original 14 URLs (same paths/priorities, byte-for-byte
   order), plus /blog/ and every post. Every entry now carries a real
   <lastmod> (git commit date for static/team pages, Sanity's _updatedAt for
   blog content) and a uniform weekly <changefreq> per Sujoy's request
   (2026-08-24) so Google has a reason to recrawl on a predictable cadence.
   No <?xml-stylesheet?> (a stylesheet PI pointing at a missing XSL file makes
   browsers render a blank page).
---------------------------------------------------------------------------- */
const STATIC_PAGE_PRIORITY = {
  Home: '1.0',
  About: '0.8',
  Services: '0.9',
  Team: '0.8',
  Counselling: '0.8',
  Reviews: '0.7',
  Faqs: '0.7',
  MediaFeatures: '0.6',
  Contact: '0.9',
}

function sitemapUrl(loc, priority, lastmod) {
  return `  <url><loc>${loc}</loc><priority>${priority}</priority><changefreq>weekly</changefreq><lastmod>${lastmod}</lastmod></url>`
}

const staticSitemapUrls = []
for (const component of STATIC_PAGES) {
  const { path } = extractSeo(component)
  staticSitemapUrls.push(
    sitemapUrl(`${SITE_URL}${path}`, STATIC_PAGE_PRIORITY[component], gitLastMod(`src/pages/${component}.jsx`))
  )
  // Team member profile pages sit right after /team/ in the original URL order.
  if (component === 'Team') {
    const teamLastMod = gitLastMod('src/data/team.js')
    for (const member of team) {
      staticSitemapUrls.push(sitemapUrl(`${SITE_URL}${member.path}`, '0.6', teamLastMod))
    }
  }
}

const blogIndexLastMod = posts.length
  ? posts.reduce((latest, post) => (post.updatedAt > latest ? post.updatedAt : latest), posts[0].updatedAt)
  : BUILD_TIME

const blogSitemapUrls = [
  sitemapUrl(`${SITE_URL}/blog/`, '0.7', blogIndexLastMod),
  ...posts.map((post) => sitemapUrl(`${SITE_URL}/blog/${post.slug}/`, '0.6', post.updatedAt)),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticSitemapUrls, ...blogSitemapUrls].join('\n')}
</urlset>
`

writeFileSync(join(distDir, 'sitemap.xml'), sitemap, 'utf8')
console.log(`prerender: wrote dist/sitemap.xml with ${staticSitemapUrls.length + blogSitemapUrls.length} URLs.`)
