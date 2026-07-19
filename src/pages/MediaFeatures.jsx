import { ArrowUpRight } from 'lucide-react'
import { Seo, Marquee } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
  PageHero,
} from '@/components/ui/Primitives'
import { mediaFeatures, pressLogos } from '@/data/media'
import { links } from '@/data/site'

/* ============================================================================
   MEDIA FEATURES  (audit M1)
   The live page is empty — a heading and a logo. The press logos it should be
   showing live on the homepage instead.

   Note the shape of the data: the shared sheet has 15 rows but only 3 unique
   articles; the other 12 are syndicated reprints of the same three pieces.
   So this page leads with 3 real stories and lists the reprints underneath
   each one. Fifteen cards with three headlines repeated five times each would
   look like padding, because it would be padding.

   LOGO CAROUSEL: now uses the SAME white-card treatment as the homepage
   PressStrip (white cards, larger logos, a scoped `group/logo` hover, and a
   lime link-chip affordance). Deliberately kept on `tone="ink"`: the white
   cards read better on dark, AND this section is the page's dark anchor between
   two light sections — flipping it light would make three light slabs in a row
   (against the section-rhythm rule). The old `brightness-0 invert` silhouette
   treatment is gone; logos show full colour inside the white cards.
   ========================================================================== */

function FeatureCard({ feature }) {
  return (
    <RevealItem className="group relative flex flex-col overflow-hidden rounded-4xl border border-ink/10 bg-paper transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-transparent hover:shadow-[0_28px_70px_-30px_rgba(40,37,26,0.32)]">
      <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-7 py-5">
        <img
          src={feature.logo}
          alt={feature.outlet}
          loading="lazy"
          width={400}
          height={200}
          className="h-6 w-auto object-contain"
        />
        {feature.date && (
          <time className="text-fluid-xs text-ink/40" dateTime={feature.date}>
            {new Date(feature.date).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </time>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-fluid-base leading-snug">
          <a href={feature.url} target="_blank" rel="noopener noreferrer" className="link-underline">
            {/* Stretches the click target across the whole card without
                nesting the syndication links inside an anchor. */}
            <span className="absolute inset-0 z-0" aria-hidden="true" />
            {feature.title}
          </a>
        </h3>

        <p className="mt-4 flex-1 leading-relaxed text-ink/60">{feature.excerpt}</p>

        <span className="mt-6 inline-flex items-center gap-2 font-display text-fluid-xs uppercase tracking-[0.16em] text-forest-600">
          Read article
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-500 ease-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden="true"
          />
        </span>

        {feature.syndicated?.length > 0 && (
          <div className="relative z-10 mt-6 border-t border-ink/10 pt-4">
            <p className="text-fluid-xs uppercase tracking-[0.14em] text-ink/35">
              Also carried by
            </p>
            <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1.5">
              {feature.syndicated.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline text-fluid-xs text-ink/45 hover:text-forest-600"
                  >
                    {s.outlet}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </RevealItem>
  )
}

export default function MediaFeatures() {
  return (
    <>
      <Seo
        title="180 Method in the Press | Media Features"
        description="Press coverage of 180 Method and founders Aanchal Narang and Arya Talwalkar — on mind–body training, breaking the shame cycle, and fitness for senior citizens."
        path="/media-features"
      />

      <PageHero
        eyebrow="180 Bulletin"
        title="180 Method in the press"
        lede="What has been written about the studio, the founders, and the idea that the body and the mind are the same project."
      />

      <Section tone="paperAlt">
        <div className="container-x">
          <SectionHeading
            eyebrow="Featured"
            title="The stories"
            lede="Each of these was picked up and reprinted across several outlets — the reprints are listed under each piece."
            className="mb-14"
          />

          <RevealGroup className="grid gap-6 lg:grid-cols-3" gap={0.1}>
            {mediaFeatures.map((feature) => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* DARK ANCHOR — logo carousel, same white-card treatment as the homepage. */}
      <Section tone="ink" className="py-section-sm">
        <div className="container-x">
          <Reveal>
            <p className="eyebrow mb-10 flex items-center justify-center gap-3">
              <span className="inline-block h-px w-8 bg-lime/50" aria-hidden="true" />
              As featured in
              <span className="inline-block h-px w-8 bg-lime/50" aria-hidden="true" />
            </p>
          </Reveal>
        </div>

        <Marquee speed="slow">
          {pressLogos.map((logo, i) => (
            <a
              key={`${logo.name}-${i}`}
              href={logo.url || '/media-features'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Read the ${logo.name} feature (opens in a new tab)`}
              className="group/logo relative flex h-28 w-64 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-ink/[0.08] bg-white px-8 shadow-[0_12px_30px_-20px_rgba(0,0,0,0.5)] transition-[transform,box-shadow,border-color] duration-500 ease-brand hover:-translate-y-1.5 hover:border-lime/50 hover:shadow-[0_26px_60px_-28px_rgba(220,229,118,0.4)]"
            >
              {/* Persistent affordance — subtle at rest, lime on hover. Scoped to THIS card only. */}
              <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-forest-600/10 text-forest-600 opacity-60 transition-[background-color,color,opacity] duration-500 ease-brand group-hover/logo:bg-lime group-hover/logo:text-ink group-hover/logo:opacity-100">
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </span>

              <img
                src={logo.logo}
                alt={logo.name}
                loading="lazy"
                width={400}
                height={200}
                className="h-16 w-auto max-w-full object-contain md:h-20"
              />
            </a>
          ))}
        </Marquee>
      </Section>

      <Section tone="paper" className="py-section-sm">
        <div className="container-x">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-fluid-xl leading-tight">Writing about fitness and mental health?</h2>
              <p className="mt-2 max-w-lg leading-relaxed text-ink/60">
                Arya and Aanchal are available for comment, interviews and workshops.
              </p>
            </div>
            <Button href={links.whatsapp} variant="ink" icon={ArrowUpRight}>
              Get in touch
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}