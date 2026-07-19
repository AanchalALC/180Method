import { ArrowUpRight, Instagram } from 'lucide-react'
import { Seo } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from '@/components/ui/Primitives'
import { site, links } from '@/data/site'

/* ============================================================================
   COUNSELLING
   Copy is unchanged from the live page (it's good and the outline keeps it),
   with one fix: audit C1 — "Send us a mesage in Whatsapp" is misspelled on the
   live site, in two places.

   HERO: bespoke, replaces <PageHero> so the photo shows in its REAL colours,
   matching Home / About / Services / Team. `.grain` (film texture only, not
   colour) is kept.
   ========================================================================== */

const points = [
  {
    title: 'Supported, not pushed',
    copy: 'Your body isn’t pushed through psychological concerns; it’s supported through it.',
  },
  {
    title: 'With your mind, not against it',
    copy: 'We don’t train against your mind — we train with it.',
  },
  {
    title: 'Mental health is part of the plan',
    copy: 'Performance grows when mental health is built into the programme from day one.',
  },
]

/* ---------------------------------------------------------------------------
   HERO — bespoke, replaces <PageHero> so the photo shows in its REAL colours.
   Mirrors ServicesHero / TeamHero exactly (PageHero lays a heavier colour wash
   across the whole photo; this does not).

     • Dark `ink` base (bg-ink-950).
     • Image is RAW / full-colour — `.grain` film texture only, NO `.duotone`,
       NO wash over the whole photo.
     • Scrims are CORNER-ONLY: both gradients fade to transparent, so they only
       darken the bottom-left where the eyebrow / H1 / lede sit. The rest of the
       photo stays clean and in colour.
         - want MORE photo visible → lower the /80 and /65 stops
         - text hard to read on a bright shot → raise them
     • Headline is REAL HTML <h1> (never baked into the image) — one H1, SEO-safe.
     • Hero image is eager + fetchPriority="high" — it's the LCP element.

   HEIGHT: min-h-[72svh] — matches Services / Team. Nudge to taste.
   NOTE: the eyebrow is long ("In partnership with Another Light Counselling"),
   so its row is flex-wrap to stay tidy on narrow widths.
--------------------------------------------------------------------------- */
function CounsellingHero() {
  return (
    <section className="on-dark relative isolate flex min-h-[72svh] items-end overflow-hidden bg-ink-950 pb-16 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="absolute inset-0 -z-10">
        {/* Raw photo — `.grain` texture only, no `.duotone`, no colour wash. */}
        <div className="grain absolute inset-0">
          <img
            src="/images/home/counselling-room2.jpeg"
            alt=""                                 /* decorative — the H1 carries the meaning */
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* CORNER-ONLY SCRIMS — both fade to transparent, so they only darken the
            bottom-left where the text sits. The rest of the photo stays clean and
            in full colour. Lower the /80 and /65 stops to show more photo. */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-ink-950/65 via-ink-950/5 to-transparent" />
      </div>

      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-5 flex flex-wrap items-center gap-3">
            <span className="inline-block h-px w-10 bg-lime" aria-hidden="true" />
            In partnership with {site.partner.name}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="max-w-5xl font-display text-fluid-3xl uppercase leading-[0.95] tracking-tight text-paper [text-shadow:0_2px_28px_rgba(11,13,11,0.65)]">
            A more human approach to transformation
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-3xl text-fluid-lg leading-relaxed text-paper-100/75 [text-shadow:0_1px_18px_rgba(11,13,11,0.75)]">
            Whether you’re beginning your fitness journey or returning after a
            break, this integrated approach helps you move forward with clarity,
            confidence, and support.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

export default function Counselling() {
  return (
    <>
      <Seo
        title="Counselling & Fitness Together | 180 Method × Another Light"
        description="Through our partnership with Another Light Counselling, every 180 Method package includes a free counselling session. Training that works with your mind, not against it."
        path="/counselling"
      />

      <CounsellingHero />

      <Section tone="paper">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="What changes"
                title="Because real transformation isn’t just about doing more"
                lede="It’s about understanding yourself better."
              />
              <Reveal delay={0.15}>
                <div className="mt-8 rounded-3xl bg-lime p-7">
                  <p className="font-display text-fluid-base uppercase leading-snug text-ink">
                    Every 180 Method package includes at least one free counselling session with a
                    qualified professional.
                  </p>
                </div>
              </Reveal>
            </div>

            <RevealGroup className="space-y-px overflow-hidden rounded-4xl bg-ink/10 lg:col-span-7" gap={0.08}>
              {points.map((point, i) => (
                <RevealItem key={point.title} className="group bg-paper p-8 transition-colors duration-500 hover:bg-paper-100">
                  <div className="flex gap-6">
                    <span className="font-display text-fluid-sm text-forest-600" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-fluid-lg leading-none">{point.title}</h3>
                      <p className="mt-3 leading-relaxed text-ink/65">{point.copy}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow="Talk to us"
              title="Get in touch today and let’s work together"
              align="center"
            />
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                {/* "message", spelled correctly — audit C1. */}
                <Button href={links.whatsapp} variant="lime" size="lg" icon={ArrowUpRight}>
                  Send us a message on WhatsApp
                </Button>
                <Button href={links.instagram} variant="outlineLight" size="lg" icon={Instagram}>
                  Instagram
                </Button>
              </div>
              <p className="mt-8 text-fluid-sm text-paper-200/50">
                Counselling is delivered by qualified professionals at{' '}
                <a
                  href={site.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-lime"
                >
                  {site.partner.name}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}