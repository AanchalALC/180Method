import { ArrowUpRight } from 'lucide-react'
import { Button, Section, Reveal, RevealGroup, RevealItem, SectionHeading } from '@/components/ui/Primitives'
import { site } from '@/data/site'
import posts from '@/data/instagram'

/* ============================================================================
   INSTAGRAM FEED
   Content is 100% data-driven from src/data/instagram.js, written by
   scripts/sync-instagram.mjs in CI — never hardcode a post here.

   No skeleton/placeholder tiles when the array is empty: an honest "follow
   us" card is correct, a feed of fabricated posts is not.

   Reusable as-is on another page (e.g. /contact) — nothing here depends on
   being rendered from Home.
   ========================================================================== */
export default function InstagramFeed() {
  return (
    <Section tone="paper">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Follow along"
            title="From the 180 Method feed"
            lede="A look at the studio day to day — sessions, coaching notes and the odd behind-the-scenes moment."
            className="max-w-2xl"
            size="lg"
          />
          <Reveal>
            <Button href={site.instagram} variant="outline" icon={ArrowUpRight}>
              Follow {site.instagramHandle}
            </Button>
          </Reveal>
        </div>

        {posts.length === 0 ? (
          <Reveal className="mt-12 flex flex-col items-start gap-5 rounded-4xl border border-ink/10 bg-paper-100 p-10">
            <p className="font-display text-fluid-xs uppercase tracking-[0.2em] text-forest-600">{site.instagramHandle}</p>
            <p className="max-w-prose leading-relaxed text-ink/65">
              We're just getting our feed synced here — in the meantime, catch us on Instagram directly.
            </p>
            <Button href={site.instagram} variant="lime" icon={ArrowUpRight}>
              Follow us on Instagram
            </Button>
          </Reveal>
        ) : (
          <RevealGroup className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3" gap={0.06}>
            {posts.map((post) => (
              <RevealItem key={post.id}>
                <a
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View "${post.caption || 'Instagram post'}" on Instagram (opens in a new tab)`}
                  className="group block aspect-square overflow-hidden rounded-3xl"
                >
                  <img
                    src={post.src}
                    srcSet={`${post.srcSmall} 640w, ${post.src} 1280w`}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    width={post.width}
                    height={post.height}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-105"
                  />
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </Section>
  )
}
