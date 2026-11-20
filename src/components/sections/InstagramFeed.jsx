import { ArrowUpRight, Instagram } from 'lucide-react'
import { Button, Section, Reveal, RevealGroup, RevealItem, SectionHeading } from '@/components/ui/Primitives'
import { site } from '@/data/site'
import posts from '@/data/instagram'
import collaborations from '@/data/instagram-collaborations'
import instagramProfile from '@/data/instagram-profile'

const FEED_LIMIT = 15

/* ============================================================================
   INSTAGRAM FEED
   Original posts are synced by scripts/sync-instagram.mjs in CI. Collaboration
   posts use official Instagram embeds because the API omits coauthored media.

   No skeleton/placeholder tiles when the array is empty: an honest "follow
   us" card is correct, a feed of fabricated posts is not.

   Reusable as-is on another page (e.g. /contact) — nothing here depends on
   being rendered from Home.
   ========================================================================== */
export default function InstagramFeed() {
  const profileOrder = [
    ...posts.map((post) => ({ ...post, kind: 'media' })),
    ...collaborations.map((post) => ({ ...post, kind: 'collaboration' })),
  ].sort(
    (a, b) => {
      const aPinnedOrder = a.pinnedOrder ?? 0
      const bPinnedOrder = b.pinnedOrder ?? 0

      if (aPinnedOrder && bPinnedOrder) return aPinnedOrder - bPinnedOrder
      if (aPinnedOrder) return -1
      if (bPinnedOrder) return 1
      return Date.parse(b.timestamp) - Date.parse(a.timestamp)
    },
  ).slice(0, FEED_LIMIT)

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

        <Reveal className="mt-10 rounded-4xl border border-ink/10 bg-paper-100 p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lime text-ink">
                <Instagram className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-fluid-base uppercase tracking-tight text-ink hover:text-forest-600"
                >
                  @{instagramProfile.username}
                </a>
                <p className="mt-1 font-medium text-ink/75">{instagramProfile.name}</p>
                <p className="mt-3 whitespace-pre-line leading-relaxed text-ink/65">
                  {instagramProfile.biography}
                </p>
              </div>
            </div>
            <dl className="flex gap-8 pl-16 sm:pl-0">
              <div>
                <dt className="eyebrow text-forest-600">Followers</dt>
                <dd className="mt-1 font-display text-fluid-base uppercase text-ink">
                  {instagramProfile.followersCount.toLocaleString('en-IN')}
                </dd>
              </div>
              <div>
                <dt className="eyebrow text-forest-600">Following</dt>
                <dd className="mt-1 font-display text-fluid-base uppercase text-ink">
                  {instagramProfile.followsCount.toLocaleString('en-IN')}
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>

        {profileOrder.length === 0 ? (
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
          <RevealGroup className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3" gap={0.06}>
            {profileOrder.map((post) => (
              <RevealItem key={post.id}>
                {post.kind === 'collaboration' ? (
                  <div className="aspect-square overflow-hidden rounded-3xl bg-white">
                    <iframe
                      src={`${post.permalink}embed/`}
                      title={`Instagram collaboration with @${post.collaborator}`}
                      width="100%"
                      height="100%"
                      loading="lazy"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="h-full w-full border-0"
                    />
                  </div>
                ) : (
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
                      sizes="(min-width: 1536px) 33vw, 50vw"
                      width={post.width}
                      height={post.height}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-105"
                    />
                  </a>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        )}
      </div>
    </Section>
  )
}
