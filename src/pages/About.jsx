import { ArrowUpRight } from 'lucide-react'
import { Seo } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from '@/components/ui/Primitives'
import { aboutIntro, vision, mission, howThisShowsUp, brandValues } from '@/data/home'
import { links } from '@/data/site'

/* ============================================================================
   ABOUT
   Follows the final draft exactly:
   - "Vision will come first. Remove 'about us' text"
   - "Use right side symmetrical for 'our vision' / Left side symmetrical for
     'our mission'"  → the two blocks mirror each other
   - "'Values we live by' and 'what makes us different' need to be removed"
     → replaced by "How this shows up"
   - The two leftover Travel Agency sticker SVGs (audit A1) are simply not here

   IMAGES: shown RAW — no `.duotone`, no colour layer over the photography,
   matching the home page's current direction. `.grain` (film texture only,
   not colour) is kept.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   HERO — bespoke, replaces <PageHero> so this page owns its height and image
   treatment. (PageHero lives in Primitives.jsx and lays a heavier colour wash
   across the whole photo + uses a shorter inner-page cap. This mirrors the HOME
   hero instead.)

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

   SPACING (matches home, so the text reads GROUPED not spread):
     • Headline uses leading-[0.95] — without it a wrapping display headline
       inherits a huge default line-height and the two lines drift apart.
     • Lede is max-w-3xl so it wraps to fewer lines, keeping the block short.
     • `items-end` then anchors the compact block to the bottom, with the photo
       showing above it — the same composition as the home hero.

   >>> SPACE ABOVE THE EYEBROW (this request):
       Because the block is bottom-anchored, `pt` alone can't push the eyebrow
       down — the flex gap above the block is already larger than the padding.
       The real lever is `min-h`: with items-end, extra height lands ABOVE the
       text. So min-h was raised 84svh → 90svh to open more room over "About us".
       `pt` was also raised to header-h + 4rem as a guaranteed floor so the
       eyebrow never hugs the navbar even if the copy grows.
         - want EVEN more space  → raise min-h (92svh, 94svh…)
         - want less             → lower it back toward 84svh
       NOTE: the client's early note was that near-full-screen heroes feel heavy.
       90svh is just above the home hero's 88svh — don't push it much higher.

   TITLE SIZE: text-fluid-3xl — one step down from the 4xl display size, per
   request, so the headline reads a touch smaller.
--------------------------------------------------------------------------- */
function AboutHero() {
  return (
    <section className="on-dark relative isolate flex min-h-[90svh] items-end overflow-hidden bg-ink-950 pb-16 pt-[calc(var(--header-h)+4rem)]">
      <div className="absolute inset-0 -z-10">
        {/* Raw photo — `.grain` texture only, no `.duotone`, no colour wash. */}
        <div className="grain absolute inset-0">
          <img
            src="/images/about/hero.jpeg"
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
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-lime" aria-hidden="true" />
            About us
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="max-w-5xl font-display text-fluid-3xl uppercase leading-[0.95] tracking-tight text-paper [text-shadow:0_2px_28px_rgba(11,13,11,0.65)]">
            Turn your life 180 degrees
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-3xl text-fluid-lg leading-relaxed text-paper-100/75 [text-shadow:0_1px_18px_rgba(11,13,11,0.75)]">
            {aboutIntro}
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function VisionMission() {
  return (
    <Section tone="paper">
      <div className="container-x space-y-section">
        {/* VISION — image left, text right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="grain relative aspect-[4/5] overflow-hidden rounded-5xl">
            <img
              src="/images/about/vision.jpeg"
              alt="Members training on the 180 Method floor"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
            />
          </Reveal>
          <div>
            <SectionHeading eyebrow="Our vision" title="Design who you can be" />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-prose text-fluid-lg leading-relaxed text-ink/70">{vision}</p>
            </Reveal>
          </div>
        </div>

        {/* MISSION — mirrored: text left, image right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="order-2 lg:order-1">
            <SectionHeading eyebrow="Our mission" title="Take the first step. We will do the rest." />
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-prose text-fluid-lg leading-relaxed text-ink/70">{mission}</p>
            </Reveal>
          </div>
          <Reveal className="grain relative order-1 aspect-[4/5] overflow-hidden rounded-5xl lg:order-2">
            <img
              src="/images/about/mission.jpeg"
              alt="A coach and client working together at the studio"
              loading="lazy"
              width={1200}
              height={1500}
              className="h-full w-full object-cover"
            />
          </Reveal>
        </div>
      </div>
    </Section>
  )
}

function HowThisShowsUp() {
  return (
    <Section tone="ink">
      <div className="container-x">
        <SectionHeading
          eyebrow="In practice"
          title="How this shows up"
          lede="Philosophy is easy to write. Here is what it actually looks like on the floor."
        />

        <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-4xl bg-paper/10 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {howThisShowsUp.map((item, i) => (
            <RevealItem
              key={item.title}
              className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink-800"
            >
              <span
                className="font-display text-fluid-xs tracking-[0.2em] text-lime/40"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-fluid-lg leading-none text-paper">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-paper-200/60">{item.copy}</p>
              <span
                className="absolute inset-x-8 bottom-0 h-px origin-left scale-x-0 bg-lime transition-transform duration-700 ease-brand group-hover:scale-x-100"
                aria-hidden="true"
              />
            </RevealItem>
          ))}

          {/* Fills the grid's last cell rather than leaving a hole. */}
          <RevealItem className="flex flex-col justify-center bg-lime p-8">
            <p className="font-display text-fluid-lg uppercase leading-tight text-ink">
              Supportive → inclusive environment
            </p>
            <p className="mt-3 leading-relaxed text-ink/70">
              Nothing to prove. Nobody to keep up with.
            </p>
          </RevealItem>
        </RevealGroup>
      </div>
    </Section>
  )
}

function WhoWeAre() {
  return (
    <Section tone="paperAlt" className="py-section-sm">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Who we are" title="Six words we hold ourselves to" />
          </div>
          <RevealGroup className="flex flex-wrap gap-3 lg:col-span-8" gap={0.06}>
            {brandValues.map((value) => (
              <RevealItem key={value}>
                <span className="inline-block rounded-full border border-ink/15 px-6 py-3 font-display text-fluid-sm uppercase tracking-[0.14em] text-ink transition-colors duration-500 hover:border-transparent hover:bg-forest-600 hover:text-paper">
                  {value}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}

export default function About() {
  return (
    <>
      <Seo
        title="About 180 Method — Fitness + Counselling Studio, Bandra"
        description="We are not about quick fixes. 180 Method focuses on long-term lifestyle change — fitness, nutrition and psychology together, in a warm, inclusive studio in Bandra, Mumbai."
        path="/about"
      />

      <AboutHero />

      <VisionMission />
      <HowThisShowsUp />
      <WhoWeAre />

      <Section tone="paper" className="py-section-sm">
        <div className="container-x text-center">
          <Reveal>
            <Button href={links.whatsapp} variant="lime" size="lg" icon={ArrowUpRight}>
              Start your journey
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}