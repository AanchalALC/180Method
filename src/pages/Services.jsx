import { ArrowUpRight, Check, Info } from 'lucide-react'
import { Seo } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
} from '@/components/ui/Primitives'
import { services, whoWeServe } from '@/data/services'
import { cn } from '@/lib/cn'

/* ============================================================================
   SERVICES
   Changes against the live page, all from the audit + final draft:
   - "End with this: (...)" editor notes REMOVED from the copy and rendered as
     a styled tagline instead (audit S1 — currently visible on the live site)
   - "Our Programs" → "What We Offer"
   - "Therapy" → "Counselling & Mental Well-being"
   - "Why choose us for your career" removed (belongs on a Careers page)
   - Who We Serve redesigned from a bullet list into a chip grid
   - The Nutrition WhatsApp link is built by whatsappLink(), so the malformed
     "&?type=" query (audit S2) cannot recur
   ========================================================================== */

/* ---------------------------------------------------------------------------
   HERO — bespoke, replaces <PageHero> so the photo shows in its REAL colours.
   Mirrors AboutHero exactly (PageHero lays a heavier colour wash across the
   whole photo; this does not).

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

   HEIGHT: min-h-[72svh] — taller than the ~58vh inner-page default so the raw
   photo has room to read, matching About's baseline. About was later pushed to
   84svh because its hero copy is long; this lede is shorter, so 72svh sits
   better here. Nudge to taste (→ 84svh to match About one-for-one).

   TITLE SIZE: text-fluid-3xl — matches About's current headline size.
   NOTE: "Train with the best" is short, so text-fluid-4xl also reads well if
   you want it bolder — swap the one class.
--------------------------------------------------------------------------- */
function ServicesHero() {
  return (
    <section className="on-dark relative isolate flex min-h-[72svh] items-end overflow-hidden bg-ink-950 pb-16 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="absolute inset-0 -z-10">
        {/* Raw photo — `.grain` texture only, no `.duotone`, no colour wash. */}
        <div className="grain absolute inset-0">
          <img
            src="/images/services/hero.jpeg"
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
            Our services
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="max-w-5xl font-display text-fluid-3xl uppercase leading-[0.95] tracking-tight text-paper [text-shadow:0_2px_28px_rgba(11,13,11,0.65)]">
            Train with the best
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-3xl text-fluid-lg leading-relaxed text-paper-100/75 [text-shadow:0_1px_18px_rgba(11,13,11,0.75)]">
            Five ways in. All of them personalised, all of them built around the
            same idea — that the body and the mind are the same project.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function WhoWeServe() {
  return (
    <Section tone="forestDeep">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Who we serve"
              title="If you have a body, you qualify"
              lede="There is no fitness prerequisite here, and no type of person we are building this for at the expense of everyone else."
            />
          </div>

          <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:col-span-8" gap={0.06}>
            {whoWeServe.map((item) => (
              <RevealItem
                key={item.label}
                className="group rounded-3xl border border-paper/12 bg-paper/[0.04] p-6 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-lime/50 hover:bg-lime"
              >
                <p className="font-display text-fluid-sm uppercase tracking-[0.1em] text-paper transition-colors duration-500 group-hover:text-ink">
                  {item.label}
                </p>
                <p className="mt-2 text-fluid-sm leading-relaxed text-paper-100/55 transition-colors duration-500 group-hover:text-ink/70">
                  {item.detail}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </Section>
  )
}

function ServiceBlock({ service, index }) {
  const flip = index % 2 === 1

  return (
    <article
      id={service.slug}
      className={cn('grid items-center gap-10 lg:grid-cols-2 lg:gap-16', flip && 'lg:[direction:rtl]')}
    >
      {/* Raw photo — no `.duotone`, shows true colours. `.grain` is film texture only. */}
      <Reveal className="grain relative aspect-[4/3] overflow-hidden rounded-5xl lg:[direction:ltr]">
        <img
          src={service.image}
          alt={service.imageAlt}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover"
        />
        <span
          className="absolute left-6 top-6 z-[4] grid h-12 w-12 place-items-center rounded-full bg-lime font-display text-fluid-xs text-ink"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </Reveal>

      <div className="lg:[direction:ltr]">
        <SectionHeading eyebrow={`0${index + 1} — What we offer`} title={service.title} />

        <Reveal delay={0.08}>
          <p className="mt-5 max-w-prose text-fluid-lg leading-relaxed text-ink/70">
            {service.intro}
          </p>
          {service.lead && (
            <p className="mt-4 max-w-prose leading-relaxed text-ink/70">{service.lead}</p>
          )}
        </Reveal>

        {service.pointsLabel && (
          <Reveal delay={0.1}>
            <p className="mt-7 font-display text-fluid-xs uppercase tracking-[0.18em] text-ink/45">
              {service.pointsLabel}
            </p>
          </Reveal>
        )}

        <RevealGroup as="ul" className={cn('grid gap-2.5 sm:grid-cols-2', service.pointsLabel ? 'mt-3' : 'mt-7')} gap={0.05}>
          {service.points.map((point) => (
            <RevealItem as="li" key={point} className="flex items-start gap-2.5">
              <Check className="mt-1 h-4 w-4 shrink-0 text-forest-600" aria-hidden="true" />
              <span className="text-fluid-sm leading-relaxed text-ink/75">{point}</span>
            </RevealItem>
          ))}
        </RevealGroup>

        {service.note && (
          <Reveal delay={0.1}>
            <p className="mt-5 max-w-prose leading-relaxed text-ink/60">{service.note}</p>
          </Reveal>
        )}

        {/* The line that is currently prefixed with "End with this:" on the
            live site. Here it is what it was always meant to be — a pull line. */}
        <Reveal delay={0.12}>
          <p className="mt-7 border-l-2 border-lime-600 pl-5 font-display text-fluid-base uppercase leading-snug tracking-tight text-forest-600">
            {service.tagline}
          </p>
        </Reveal>

        {service.disclaimer && (
          <Reveal delay={0.14}>
            <div className="mt-7 flex gap-3 rounded-2xl bg-paper-200/70 p-5">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-ink/50" aria-hidden="true" />
              <p className="text-fluid-xs leading-relaxed text-ink/60">{service.disclaimer}</p>
            </div>
          </Reveal>
        )}

        <Reveal delay={0.16}>
          <div className="mt-8">
            <Button href={service.cta} variant="ink" icon={ArrowUpRight}>
              Book now
            </Button>
          </div>
        </Reveal>
      </div>
    </article>
  )
}

export default function Services() {
  return (
    <>
      <Seo
        title="Services — Personal, Group & Nutrition Training | 180 Method"
        description="Personal Training, Buddy Training, Focused Group Training with a 1:5 ratio, nutrition support and counselling. Every 180 Method package includes a free counselling session."
        path="/services"
      />

      <ServicesHero />

      <WhoWeServe />

      <Section tone="paper">
        <div className="container-x">
          <SectionHeading
            eyebrow="What we offer"
            title="Programs built around you"
            align="center"
            className="mb-16"
          />
          <div className="space-y-section">
            {services.map((service, i) => (
              <ServiceBlock key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>
      </Section>
    </>
  )
}