import { ArrowUpRight } from 'lucide-react'
import { Seo } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
  PageHero,
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
   ========================================================================== */

function VisionMission() {
  return (
    <Section tone="paper">
      <div className="container-x space-y-section">
        {/* VISION — image left, text right */}
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="duotone grain relative aspect-[4/5] overflow-hidden rounded-5xl">
            <img
              src="/images/about/vision.jpg"
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
          <Reveal className="duotone grain relative order-1 aspect-[4/5] overflow-hidden rounded-5xl lg:order-2">
            <img
              src="/images/about/mission.jpg"
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

      <PageHero
        eyebrow="About us"
        title="Turn your life 180 degrees"
        lede={aboutIntro}
        image="/images/about/hero.jpg"
      />

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
