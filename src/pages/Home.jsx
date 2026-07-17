import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, ArrowRight } from 'lucide-react'

import { Seo, Counter, Marquee, Stars } from '@/components/ui/Widgets'
import {
  Button, Section, Reveal, RevealGroup, RevealItem, SectionHeading, SplitHeading, TickerBand,
} from '@/components/ui/Primitives'
import { pillars, journey, stats } from '@/data/home'
import { reviews, formatDate } from '@/data/reviews'
import { pressLogos } from '@/data/media'
import { site, links } from '@/data/site'
import { EASE, viewport, fadeUp } from '@/lib/motion'

/* ---------------------------------------------------------------------------
   HERO
   The headline is REAL TEXT over the image, not baked into it — the live site
   bakes it in, which is what drives the 12.2s LCP and hides the H1 from Google
   (audit PF2). Height capped at 88svh, not 100vh (final draft, note 1).
--------------------------------------------------------------------------- */
function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '16%'])

  return (
    <section
      ref={ref}
      className="on-dark relative isolate flex min-h-[88svh] items-end overflow-hidden bg-ink-950 pb-16 pt-[var(--header-h)]"
    >
      <motion.div style={{ y }} className="duotone grain absolute inset-0 -z-10">
        <img
          src="/images/home/hero.jpg"
          alt=""
          className="h-[116%] w-full object-cover opacity-60"
          loading="eager" fetchPriority="high" width={1920} height={1080}
        />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink-950 via-ink-950/70 to-ink-950/20" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-ink-950/85 via-ink-950/30 to-transparent" />
      </motion.div>

      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-lime" aria-hidden="true" />
            {site.tagline}
          </p>
        </Reveal>

        {/* Two lines, so "TRAIN BODIES" lands as its own hit. */}
        <SplitHeading as="h1" text="We don’t just" className="block max-w-5xl text-fluid-4xl text-paper" />
        <SplitHeading text="train bodies" className="block max-w-5xl text-fluid-4xl text-lime" delay={0.18} as="p" />

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
          className="mt-7 max-w-xl text-fluid-lg leading-relaxed text-paper-100/75"
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
      </div>
    </section>
  )
}

/* ---------------------------------------------------------------------------
   VENN
   The outline asks for it by name: "Remove '+' from physical, mental and
   nutrition. Make venn diagram."
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

/* Cycles each pillar's three theme words — the outline asks for "animated text
   as per the following theme" (Regulated → Discipline → Consistent). All three
   stay in the DOM for screen readers and Google; the motion is decoration. */
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
                <div className="duotone relative aspect-[4/3] overflow-hidden">
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
   JOURNEY
   Final draft: "All 5 cards should look simpler and crisp altogether instead of
   scattered." One numbered rail with a scroll-driven progress line. The live
   site links each step to "#" — a dead link (audit H6). Nothing here is
   clickable, because nothing here should be.
--------------------------------------------------------------------------- */
function Journey() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })

  return (
    <Section tone="ink" className="overflow-hidden">
      {/* Green glow, so the black section isn't a flat void. */}
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

                <div className="duotone hidden h-24 w-32 shrink-0 overflow-hidden rounded-2xl lg:block">
                  <img
                    src={step.image} alt="" loading="lazy" width={400} height={300}
                    className="h-full w-full object-cover opacity-60 transition-all duration-700 ease-brand group-hover:scale-105 group-hover:opacity-100"
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

/* Counters. The live site ships these at 0 / 0 (audit H5); the real numbers are
   in the outline. Full words, not "PT"/"GT" — also from the outline. */
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

/* ALC integration. The final draft asks for this to be less text-heavy, better
   laid out, and renamed from "A More Human Approach to Transformation". */
function CounsellingTeaser() {
  return (
    <Section tone="forestDeep" className="overflow-hidden">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative order-2 lg:order-1">
            <div className="duotone grain relative aspect-[4/5] overflow-hidden rounded-5xl sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src="/images/home/counselling-room.jpg"
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

/* Press strip. Logos link out where we have an article; the rest are plain
   images rather than dead links. */
function PressStrip() {
  return (
    <Section tone="ink" className="py-section-sm">
      <div className="container-x">
        <Reveal><p className="eyebrow mb-8 text-center">180 Bulletin — as featured in</p></Reveal>
      </div>

      <Marquee className="py-2">
        {pressLogos.map((logo) => {
          const img = (
            <img
              src={logo.logo} alt={logo.name} loading="lazy" width={400} height={200}
              className="h-9 w-auto object-contain opacity-45 brightness-0 invert transition-opacity duration-500 hover:opacity-100 md:h-11"
            />
          )
          return logo.url ? (
            <a key={logo.name} href={logo.url} target="_blank" rel="noopener noreferrer" aria-label={`Read the ${logo.name} feature`}>{img}</a>
          ) : (
            <div key={logo.name}>{img}</div>
          )
        })}
      </Marquee>

      <div className="container-x mt-8 text-center">
        <Reveal><Button to="/media-features" variant="outlineLime" icon={ArrowRight}>Explore our media features</Button></Reveal>
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
