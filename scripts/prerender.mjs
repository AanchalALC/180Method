/* ============================================================================
   PRERENDER — bakes page-specific <title>/meta description/canonical/OG tags
   into a static index.html per route, post `vite build`.

   Why this exists: this is a client-only SPA. vercel.json rewrites every path
   to /index.html, and the <Seo> component (src/components/ui/Widgets.jsx)
   only rewrites document.title/meta tags *after* React mounts. Anything that
   reads the raw HTML response — view-source, most SEO auditors, link-preview
   crawlers — never runs that JS and sees whatever is baked into index.html,
   which was only ever the Home page's tags. Vercel serves a matching static
   file before falling back to a rewrite, so writing dist/<route>/index.html
   per page fixes this without touching the app's runtime behavior.

   SEO copy is read straight out of each page's <Seo title=".." description=".."
   path=".."> JSX (and src/data/team.js for member profiles) so this can never
   drift from what's already shown to users — it's a mirror, not a second
   source of truth.
   ========================================================================== */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { team } from '../src/data/team.js'

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const distDir = join(root, 'dist')
const template = readFileSync(join(distDir, 'index.html'), 'utf8')

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

const routes = [
  ...STATIC_PAGES.map(extractSeo),
  ...team.map((m) => ({ path: m.path, title: m.seoTitle, description: m.seoDescription })),
]

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

for (const { path, title, description } of routes) {
  const url = `https://180method.in${path}`
  const safeTitle = escapeHtml(title)
  const safeDescription = escapeHtml(description)

  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${safeDescription}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${safeTitle}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${safeDescription}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`)

  const outDir = path === '/' ? distDir : join(distDir, path.replace(/^\/|\/$/g, ''))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html, 'utf8')
}

console.log(`prerender: wrote page-specific SEO tags for ${routes.length} routes.`)
