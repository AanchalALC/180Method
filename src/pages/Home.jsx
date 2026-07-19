import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

import { Seo, Counter, Marquee, Stars } from '@/components/ui/Widgets'
import {
  Button, Section, Reveal, RevealGroup, RevealItem, SectionHeading, SplitHeading, TickerBand,
} from '@/components/ui/Primitives'
import { pillars, journey, stats, heroSlides } from '@/data/home'
import { reviews, formatDate } from '@/data/reviews'
import { pressLogos } from '@/data/media'
import { site, links } from '@/data/site'
import { EASE, viewport, fadeUp } from '@/lib/motion'

/* ---------------------------------------------------------------------------
   HERO — 3-image cross-fade carousel  (LEFT AS-IS, per request)
   The hero is the ONE place that keeps a treatment, because the headline sits
   over the photo and needs contrast. Everywhere else on the page the images
   now show RAW — no `.duotone`, no colour layer.
     • Headline stays REAL TEXT over the images, never baked in (audit PF2).
     • Only the FIRST slide is eager + fetchPriority="high" (LCP element).
     • Cross-fade is opacity only; the slow zoom is transform (scale) only.
     • Auto-advance + zoom disabled under prefers-reduced-motion; dots still work.
   The scrims below only darken the bottom-left corner where the text sits —
   the rest of the photo stays clean and in colour.
--------------------------------------------------------------------------- */
function Hero() {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])

  useEffect(() => {
    if (reduceMotion || heroSlides.length < 2) return
    const id = setInterval(() => {
      setActive((i) => (i + 1) % heroSlides.length)
    }, 5500)
    return () => clearInterval(id)
  }, [reduceMotion])

  return (
    <section
      ref={ref}
      className="on-dark relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink-950 pb-16 pt-[var(--header-h)]"
    >
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        {heroSlides.map((slide, i) => (
          <div
            key={slide.src}
            aria-hidden={active === i ? undefined : true}
            /* No `.duotone` — the photo keeps its TRUE colours. `.grain` is only
               a faint film texture, not a colour. */
            className="grain absolute inset-0 transition-opacity duration-[1200ms] ease-brand"
            style={{ opacity: active === i ? 1 : 0 }}
          >
            <motion.img
              src={slide.src}
              alt=""                                 /* decorative — the H1 carries the meaning */
              className="h-[116%] w-full object-cover"
              width={1920}
              height={1080}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              animate={reduceMotion ? {} : { scale: active === i ? 1.06 : 1 }}
              transition={{ duration: 7, ease: 'linear' }}
            />
          </div>
        ))}

        {/* TEXT-ONLY SCRIMS — these do NOT wash the whole image. Both fade fully
            to transparent, so they only darken the bottom-left corner where the
            headline, subtext and buttons sit. The rest of the photo (plates,
            window, subject on the right) stays clean and in full colour.
            To show more photo: lower the /85 and /70 stops.
            To read text better on bright shots: raise them. */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink-950/85 via-ink-950/30 to-transparent" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-ink-950/70 via-ink-950/10 to-transparent" />
      </motion.div>

      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-lime" aria-hidden="true" />
            {site.tagline}
          </p>
        </Reveal>

        {/* Two lines, so "TRAIN BODIES" lands as its own hit. Text-shadow on
            the letters (not the photo) keeps them legible. */}
        <SplitHeading as="h1" text="We don’t just" className="block max-w-5xl text-fluid-4xl text-paper [text-shadow:0_2px_28px_rgba(11,13,11,0.65)]" />
        <SplitHeading text="train bodies" className="block max-w-5xl text-fluid-4xl text-lime [text-shadow:0_2px_28px_rgba(11,13,11,0.65)]" delay={0.18} as="p" />

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="mt-7 max-w-xl text-fluid-lg leading-relaxed text-paper-100/75 [text-shadow:0_1px_18px_rgba(11,13,11,0.75)]"
        >
          We transform lifestyles by combining fitness, nutrition, and psychology into one powerful,
          sustainable system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
          className="mt-9 flex flex-wrap items-center gap-3"
        >
          <Button href={links.whatsapp} variant="lime" size="lg" icon={ArrowUpRight}>Get started</Button>
          <Button to="/about" variant="outlineLight" size="lg">Read more</Button>
        </motion.div>

        {/* Carousel dots — active pill is lime; inactive are faint on the dark hero. */}
        {heroSlides.length > 1 && (
          <div className="mt-10 flex items-center gap-2.5" role="tablist" aria-label="Hero images">
            {heroSlides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Show hero image ${i + 1} of ${heroSlides.length}`}
                onClick={() => setActive(i)}
                className="h-2.5 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lime"
              >
                <span
                  className={`block h-full rounded-full transition-all duration-500 ease-brand ${
                    active === i ? 'w-8 bg-lime' : 'w-2.5 bg-paper/40 hover:bg-paper/70'
                  }`}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   VENN — "Remove '+' from physical, mental and nutrition. Make venn diagram."
--------------------------------------------------------------------------- */
function VennDiagram() {
  const lobes = [
    { key: 'physical', label: 'Physical', cx: 100, cy: 84, fill: '#275442' },
    { key: 'mental', label: 'Mental', cx: 160, cy: 84, fill: '#DCE576' },
    { key: 'nutrition', label: 'Nutrition', cx: 130, cy: 136, fill: '#48906F' },
  ]

  return (
    <svg
      viewBox="0 0 260 220" className="h-auto w-full max-w-lg"
      role="img"
      aria-label="Three overlapping circles — Physical, Mental and Nutrition — meeting at the centre, which is the 180 Method."
    >
      <g style={{ mixBlendMode: 'multiply' }}>
        {lobes.map((lobe, i) => (
          <motion.circle
            key={lobe.key}
            cx={lobe.cx} cy={lobe.cy} r="58" fill={lobe.fill} fillOpacity="0.75"
            initial={{ scale: 0.55, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={viewport}
            transition={{ delay: i * 0.14, duration: 0.9, ease: EASE }}
            style={{ transformOrigin: `${lobe.cx}px ${lobe.cy}px` }}
          />
        ))}
      </g>

      {lobes.map((lobe, i) => (
        <motion.text
          key={`${lobe.key}-label`}
          x={lobe.cx} y={lobe.key === 'nutrition' ? lobe.cy + 48 : lobe.cy - 38}
          textAnchor="middle" className="font-display uppercase"
          fontSize="10" letterSpacing="1.8" fill="#0B0D0B"
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={viewport}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.6 }}
        >
          {lobe.label}
        </motion.text>
      ))}

      <motion.text
        x="130" y="106" textAnchor="middle" className="font-display uppercase"
        fontSize="10" letterSpacing="1.4" fill="#F6F8F3"
        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={viewport}
        transition={{ delay: 0.9, duration: 0.6, ease: EASE }}
        style={{ transformOrigin: '130px 106px' }}
      >
        180
      </motion.text>
    </svg>
  )
}

/* Cycles each pillar's three theme words (Regulated → Discipline → Consistent).
   All stay in the DOM for screen readers and Google; the motion is decoration. */
function PillarWords({ words }) {
  return (
    <div className="relative mt-5 h-6 overflow-hidden" aria-hidden="true">
      <motion.div
        animate={{ y: ['0%', '-33.333%', '-66.666%', '0%'] }}
        transition={{ duration: 6, times: [0, 0.33, 0.66, 1], repeat: Infinity, ease: EASE }}
      >
        {[...words, words[0]].map((word, i) => (
          <p key={i} className="flex h-6 items-center font-display text-fluid-xs uppercase tracking-[0.24em] text-forest-600">
            {word}
          </p>
        ))}
      </motion.div>
    </div>
  )
}

function Pillars() {
  return (
    <Section tone="paper">
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="The 180 Method"
              title="Physical. Mental. Nutrition."
              lede="Not three services bolted together — one system. Progress stalls when any of the three is missing, so we never treat them separately."
              size="lg"
            />
          </div>
          <Reveal className="flex justify-center lg:col-span-7" delay={0.1}>
            <VennDiagram />
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-4 md:grid-cols-3" gap={0.1}>
          {pillars.map((pillar) => (
            <RevealItem key={pillar.key}>
              <Link
                to={pillar.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-4xl border border-ink/10 bg-paper transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:border-forest-600 hover:shadow-[0_28px_70px_-30px_rgba(11,13,11,0.4)]"
              >
                {/* Raw photo — no `.duotone`, shows true colours. */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={pillar.image} alt={pillar.imageAlt} loading="lazy" width={1200} height={900}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <p className="eyebrow">{pillar.label}</p>
                  <h3 className="mt-2 text-fluid-xl">{pillar.heading}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink/60">{pillar.copy}</p>
                  <PillarWords words={pillar.words} />
                  <span className="mt-5 inline-flex items-center gap-2 font-display text-fluid-xs uppercase tracking-[0.16em] text-forest-600">
                    Explore
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 ease-brand group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------------------
   JOURNEY — kept dark on purpose (one of two dark anchors; the lime rail on
   black is a signature moment). "All 5 cards should look simpler and crisp
   altogether instead of scattered" (final draft) — one numbered rail.
   Step thumbnails are RAW (no `.duotone`, no dimming) and a bit bigger now.
--------------------------------------------------------------------------- */
function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })

  return (
    <Section tone="ink" className="overflow-hidden">
      <div className="absolute -left-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-forest-600/20 blur-[120px]" aria-hidden="true" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="How it works"
          title="Start your journey with 180 Method"
          lede="Five steps, in order. No guesswork about what happens after you message us."
          align="center" size="lg"
        />

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-[27px] top-2 hidden h-full w-px bg-paper/10 md:block" aria-hidden="true">
            <motion.div className="h-full w-full origin-top bg-lime" style={{ scaleY: scrollYProgress }} />
          </div>

          <ol className="space-y-3">
            {journey.map((step) => (
              <motion.li
                key={step.n}
                variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport}
                className="group relative grid gap-5 rounded-3xl border border-paper/10 bg-paper/[0.02] p-6 transition-all duration-500 hover:border-lime/40 hover:bg-forest-950/60 md:grid-cols-[56px_1fr_auto] md:items-center md:gap-8 md:p-7"
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full border border-lime/30 bg-ink-950 font-display text-fluid-sm text-lime transition-colors duration-500 group-hover:bg-lime group-hover:text-ink">
                  {step.n}
                </span>

                <div>
                  <h3 className="text-fluid-lg text-paper">{step.title}</h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-paper-100/55">{step.copy}</p>
                </div>

                {/* Bigger raw thumbnail — no `.duotone`, no dimming. Shows from tablet (md) up. */}
                <div className="hidden h-28 w-44 shrink-0 overflow-hidden rounded-2xl md:block lg:h-32 lg:w-52">
                  <img
                    src={step.image} alt="" loading="lazy" width={520} height={400}
                    className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-105"
                  />
                </div>
              </motion.li>
            ))}
          </ol>
        </div>

        <Reveal className="mt-12 text-center" delay={0.1}>
          <Button href={links.whatsapp} variant="lime" size="lg" icon={ArrowUpRight}>Take the first step</Button>
        </Reveal>
      </div>
    </Section>
  )
}

/* Counters on forest — lime numbers still pop, and this breaks the black run
   after the dark Journey with a strong hue shift (black → green). */
function Stats() {
  return (
    <Section tone="forest" className="overflow-hidden py-section-sm">
      <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-lime/10 blur-[100px]" aria-hidden="true" />
      <div className="container-x relative">
        <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:items-center">
          <RevealItem>
            <p className="eyebrow mb-3">Sessions conducted</p>
            <p className="max-w-xs leading-relaxed text-paper-100/65">
              Real hours on the floor, with real people, since we opened the doors.
            </p>
          </RevealItem>

          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <p className="font-display text-fluid-3xl leading-none text-lime">
                <Counter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-3 font-display text-fluid-xs uppercase tracking-[0.2em] text-paper-100/70">
                {stat.label}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

function HomeReviews() {
  const featured = reviews.filter((r) => r.featured)

  return (
    <Section tone="paperAlt">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading eyebrow="Hear from our clients" title="Don’t just take our word for it" className="max-w-2xl" size="lg" />
          <Reveal><Button to="/reviews" variant="outline" icon={ArrowRight}>Read our reviews</Button></Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3" gap={0.1}>
          {featured.map((review) => (
            <RevealItem
              key={review.id}
              className="flex flex-col rounded-4xl border border-ink/10 bg-paper p-7 transition-all duration-500 ease-brand hover:-translate-y-1.5 hover:border-forest-600"
            >
              <Stars rating={review.rating} />
              <blockquote className="mt-5 flex-1 leading-relaxed text-ink/75">“{review.text}”</blockquote>
              <footer className="mt-6 border-t border-ink/10 pt-4">
                <p className="font-display text-fluid-xs uppercase tracking-[0.14em]">{review.name}</p>
                <p className="mt-1 text-fluid-xs text-ink/40">{formatDate(review.date)}</p>
              </footer>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  )
}

/* ALC integration on forestDeep — the second (and last) dark anchor.
   Final draft: less text-heavy, better laid out, renamed from
   "A More Human Approach to Transformation". */
function CounsellingTeaser() {
  return (
    <Section tone="forestDeep" className="overflow-hidden">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            {/* Raw photo — no `.duotone`, no `.grain`. Shows true colours. */}
            <div className="relative aspect-[4/5] overflow-hidden rounded-5xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src="/images/home/counselling-room.jpeg"
                alt="The counselling room at the 180 Method studio"
                loading="lazy" width={1200} height={1500}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -right-3 max-w-[230px] rounded-3xl bg-lime p-5 sm:-right-5">
              <p className="font-display text-fluid-xs uppercase leading-snug tracking-[0.12em] text-ink">
                Every package includes a free counselling session
              </p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow={`In partnership with ${site.partner.name}`} title="Train with your mind, not against it" size="lg" />
            <RevealGroup className="mt-8 space-y-4" gap={0.08}>
              {[
                'Your body isn’t pushed through psychological concerns — it’s supported through it.',
                'We don’t train against your mind. We train with it.',
                'Performance grows when mental health is part of the plan.',
              ].map((point) => (
                <RevealItem key={point} className="flex gap-4">
                  <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-lime" aria-hidden="true" />
                  <p className="leading-relaxed text-paper-100/75">{point}</p>
                </RevealItem>
              ))}
            </RevealGroup>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-prose leading-relaxed text-paper-100/50">
                Because real transformation isn’t just about doing more — it’s about understanding yourself better.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button to="/counselling" variant="lime" icon={ArrowRight}>How it works</Button>
                <Button href={links.whatsapp} variant="outlineLight">Talk to us</Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  )
}

/* ---------------------------------------------------------------------------
   PRESS STRIP — light surface (paperDeep). Removes the third near-black slab
   and lets the page end light before the dark footer.

   WARM ACCENTS (the browns, on request): each logo sits in a `sand`-tinted card
   hairlined with `charcoal`, with a warm charcoal shadow on hover — the two
   benched brand tokens used strictly as TINTS on a light surface, never as a
   section background. Logos are bigger and every one links out in a new tab;
   URLs live in `media.js`, with a safe fallback to /media-features (no dead `#`).
--------------------------------------------------------------------------- */
function PressStrip() {
  return (
    <Section tone="paperDeep" className="py-section-sm">
      <div className="container-x">
        <Reveal>
          <p className="eyebrow mb-10 flex items-center justify-center gap-3 text-forest-600">
            <span className="inline-block h-px w-8 bg-forest-600/40" aria-hidden="true" />
            180 Bulletin — as featured in
            <span className="inline-block h-px w-8 bg-forest-600/40" aria-hidden="true" />
          </p>
        </Reveal>
      </div>

      <Marquee className="py-2">
        {pressLogos.map((logo, i) => (
          <a
            key={`${logo.name}-${i}`}
            href={logo.url || '/media-features'}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Read the ${logo.name} feature (opens in a new tab)`}
            className="group/logo relative flex h-28 w-64 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-ink/[0.08] bg-white px-8 shadow-[0_12px_30px_-20px_rgba(11,13,11,0.35)] transition-[transform,box-shadow,border-color] duration-500 ease-brand hover:-translate-y-1.5 hover:border-forest-600/40 hover:shadow-[0_26px_60px_-28px_rgba(39,84,66,0.5)]"
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

      <div className="container-x mt-10 text-center">
        <Reveal><Button to="/media-features" variant="outline" icon={ArrowRight}>Explore our media features</Button></Reveal>
      </div>
    </Section>
  )
}

export default function Home() {
  return (
    <>
      <Seo
        title="180 Method — Fitness, Nutrition & Counselling Studio in Bandra, Mumbai"
        description="Personal, buddy and group training with nutrition and counselling built in. One system for body and mind, in Bandra, Mumbai. Every package includes a free counselling session."
        path="/"
      />
      <Hero />
      <TickerBand items={[site.promise, site.strapline, site.tagline]} />
      <Pillars />
      <Journey />
      <Stats />
      <HomeReviews />
      <CounsellingTeaser />
      <PressStrip />
    </>
  )
}
