import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { Seo } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
  Tag,
} from '@/components/ui/Primitives'
import posts from '@/content/posts.json'
import { whatsappLink } from '@/data/site'
import NotFound from './NotFound'

function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

/* ============================================================================
   BLOG POST
   Hero deliberately does NOT reuse the shared <PageHero> — that component
   wraps its image in `.duotone`, and the brief for this feature is explicit
   that blog imagery stays raw photography. This hand-rolls the same visual
   language (gradient overlay, lime hairline, hero typography) minus duotone.
   ========================================================================== */
export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)
  if (!post) return <NotFound />

  const others = posts.filter((p) => p.slug !== slug).slice(0, 3)

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
      logo: { '@type': 'ImageObject', url: 'https://180method.in/images/logo-ink.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://180method.in/blog/${post.slug}/` },
  }

  return (
    <>
      <Seo
        title={post.seoTitle}
        description={post.seoDescription}
        path={`/blog/${post.slug}/`}
        image={post.image.og.url}
        schema={schema}
      />

      <header className="on-dark relative isolate flex min-h-[48vh] items-end overflow-hidden bg-ink-950 pb-14 pt-[calc(var(--header-h)+3.5rem)] md:min-h-[58vh] md:pb-20">
        <div className="grain absolute inset-0 -z-10">
          <img
            src={post.image.hero.url}
            width={post.image.hero.width}
            height={post.image.hero.height}
            alt={post.image.alt}
            fetchpriority="high"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/30" />
        </div>
        <div
          className="absolute inset-x-0 top-[var(--header-h)] h-px bg-gradient-to-r from-lime/50 via-lime/10 to-transparent"
          aria-hidden="true"
        />

        <div className="container-x">
          {post.category && (
            <Reveal>
              <Tag variant="lime" size="sm" className="mb-5">
                {post.category}
              </Tag>
            </Reveal>
          )}
          <Reveal delay={0.05}>
            <h1 className="max-w-4xl text-fluid-3xl leading-[0.95] text-paper display-tight">{post.title}</h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 font-display text-fluid-xs uppercase tracking-[0.14em] text-paper-100/60">
              {formatDate(post.publishedAt)} · {post.readingTime} min read · {post.author}
            </p>
          </Reveal>
        </div>
      </header>

      <Section tone="paper">
        <div className="container-x">
          <Reveal>
            <Link
              to="/blog/"
              className="link-underline mb-10 inline-flex items-center gap-1.5 font-display text-fluid-xs uppercase tracking-[0.14em] text-ink/50 transition-colors hover:text-forest-600"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All posts
            </Link>
          </Reveal>

          {/* Body HTML is generated at build time from our own CMS by our own
              serializer (scripts/fetch-content.mjs) — never from user input —
              so injecting it raw here is safe. */}
          <div className="max-w-prose" dangerouslySetInnerHTML={{ __html: post.bodyHtml }} />
        </div>
      </Section>

      {others.length > 0 && (
        <Section tone="paperAlt" className="py-section-sm">
          <div className="container-x">
            <SectionHeading eyebrow="Keep reading" title="Read next" />
            <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" gap={0.08}>
              {others.map((p) => (
                <RevealItem key={p.slug}>
                  <Link
                    to={`/blog/${p.slug}/`}
                    className="group flex h-full flex-col overflow-hidden rounded-4xl border border-ink/10 bg-paper transition-all duration-500 ease-brand hover:-translate-y-1"
                  >
                    <div className="aspect-[8/5] w-full overflow-hidden">
                      <img
                        src={p.image.card.url}
                        width={p.image.card.width}
                        height={p.image.card.height}
                        alt={p.image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-fluid-base leading-snug">{p.title}</h3>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      )}

      <Section tone="ink" className="py-section-sm">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-fluid-xl leading-tight text-paper">Ready to put this into practice?</h2>
            <p className="mx-auto mt-3 max-w-lg leading-relaxed text-paper-200/60">
              Message us on WhatsApp and we’ll help you build a routine that actually fits your life.
            </p>
            <div className="mt-8">
              <Button href={whatsappLink()} variant="lime" size="lg" icon={ArrowUpRight}>
                Workout with us
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
