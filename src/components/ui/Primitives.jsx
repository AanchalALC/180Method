import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { fadeUp, stagger, viewport, wordReveal } from '@/lib/motion'

/* ============================================================================
   BUTTON
   ========================================================================== */
const variants = {
  lime: 'bg-lime text-ink hover:bg-lime-300 hover:shadow-[0_10px_36px_-8px_rgba(220,229,118,0.6)]',
  ink: 'bg-ink text-paper hover:bg-forest-600',
  forest: 'bg-forest-600 text-paper hover:bg-forest-500',
  outline: 'border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper',
  outlineLight: 'border border-paper/35 text-paper hover:border-lime hover:bg-lime hover:text-ink',
  outlineLime: 'border border-lime/60 text-lime hover:bg-lime hover:text-ink',
  ghost: 'text-ink hover:bg-ink/5',
}

const sizes = {
  sm: 'px-4 py-2 text-fluid-xs',
  md: 'px-6 py-3 text-fluid-xs',
  lg: 'px-8 py-4 text-fluid-sm',
}

export function Button({ children, variant = 'lime', size = 'md', to, href, className, icon: Icon, ...props }) {
  const classes = cn(
    'group inline-flex items-center justify-center gap-2 rounded-full font-display uppercase tracking-[0.14em]',
    'transition-all duration-500 ease-brand will-change-transform hover:-translate-y-0.5 active:translate-y-0',
    'disabled:pointer-events-none disabled:opacity-50',
    variants[variant], sizes[size], className
  )

  const inner = (
    <>
      {children}
      {Icon && (
        <Icon className="h-4 w-4 transition-transform duration-500 ease-brand group-hover:translate-x-0.5" aria-hidden="true" />
      )}
    </>
  )

  if (href) {
    const external = href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')
    return (
      <a href={href} className={classes} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...props}>
        {inner}
      </a>
    )
  }
  if (to) return <Link to={to} className={classes} {...props}>{inner}</Link>
  return <button type="button" className={classes} {...props}>{inner}</button>
}

/* ============================================================================
   SECTION
   `tone` replaces v1's boolean `dark`. A boolean forced every dark section to
   be the same colour, and overriding it with a bg- class meant two
   same-specificity classes fighting — with CSS source order, not JSX order,
   picking the winner. An enum can't collide with itself.
   ========================================================================== */
const tones = {
  paper: 'bg-paper text-ink',
  paperAlt: 'bg-paper-100 text-ink',
  paperDeep: 'bg-paper-200 text-ink',
  ink: 'on-dark bg-ink-900 text-paper-100',
  forest: 'on-dark bg-forest-800 text-paper-100',
  forestDeep: 'on-dark bg-forest-950 text-paper-100',
  lime: 'bg-lime text-ink',
}

export function Section({ children, className, tone = 'paper', id, as: Tag = 'section', ...props }) {
  return (
    <Tag id={id} className={cn('relative py-section', tones[tone], className)} {...props}>
      {children}
    </Tag>
  )
}

/* ============================================================================
   REVEAL
   ========================================================================== */
export function Reveal({ children, className, delay = 0, as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag className={className} variants={fadeUp} initial="hidden" whileInView="show" viewport={viewport} transition={{ delay }}>
      {children}
    </MotionTag>
  )
}

export function RevealGroup({ children, className, gap = 0.08, delay = 0, as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag className={className} variants={stagger(gap, delay)} initial="hidden" whileInView="show" viewport={viewport}>
      {children}
    </MotionTag>
  )
}

export function RevealItem({ children, className, as = 'div' }) {
  const MotionTag = motion[as] || motion.div
  return <MotionTag className={className} variants={fadeUp}>{children}</MotionTag>
}

/* ============================================================================
   SPLIT HEADING
   v1 wrapped each word in an overflow-hidden span and slid it up from behind
   the mask. It looked good — until the animation was mid-flight or hadn't
   fired, at which point words were sliced in half. That's exactly what showed
   in the screenshots ("NUTRITION", "OUR WORD FOR IT" cut through the middle),
   and it would also hit anyone whose JS is slow or blocked.

   Now: fade + a short rise, no mask. The worst possible state is "not quite
   faded in yet" rather than "chopped in half". Robustness beats the flourish.
   ========================================================================== */
export function SplitHeading({ text, className, as: Tag = 'h2', delay = 0 }) {
  const MotionTag = motion[Tag] || motion.h2
  const words = text.split(' ')

  return (
    <MotionTag
      aria-label={text}
      className={cn('display-tight', className)}
      variants={stagger(0.055, delay)}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
    >
      {words.map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={wordReveal} className="inline-block" aria-hidden="true">
          {word}
          {i < words.length - 1 && '\u00A0'}
        </motion.span>
      ))}
    </MotionTag>
  )
}

/* ============================================================================
   SECTION HEADING
   ========================================================================== */
export function SectionHeading({ eyebrow, title, lede, align = 'left', className, titleAs = 'h2', size = 'default' }) {
  return (
    <div className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', align === 'right' && 'ml-auto text-right', className)}>
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-4 flex items-center gap-3">
            <span className="inline-block h-px w-8 bg-current opacity-50" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      )}
      <SplitHeading as={titleAs} text={title} className={size === 'lg' ? 'text-fluid-3xl' : 'text-fluid-2xl'} />
      {lede && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-prose text-fluid-lg leading-relaxed text-ink/65 [.on-dark_&]:text-paper-100/65">
            {lede}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ============================================================================
   PAGE HERO
   Capped at ~58vh. The final draft's first note: "Reduce the height of the
   hero/cover image on every page. The current image occupies the entire first
   screen, making the page feel heavy."
   ========================================================================== */
export function PageHero({ eyebrow, title, lede, image, imageAlt = '', children }) {
  return (
    <header className="on-dark relative isolate flex min-h-[48vh] items-end overflow-hidden bg-ink-950 pb-14 pt-[calc(var(--header-h)+3.5rem)] md:min-h-[58vh] md:pb-20">
      {image ? (
        <div className="duotone grain absolute inset-0 -z-10">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover opacity-55" loading="eager" fetchPriority="high" width={1920} height={1080} />
          <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink-950 via-ink-950/75 to-ink-950/30" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(130%_130%_at_12%_0%,#275442_0%,#0F2618_42%,#040604_100%)]" aria-hidden="true" />
      )}

      {/* Lime hairline — ties every page header back to the brand. */}
      <div className="absolute inset-x-0 top-[var(--header-h)] h-px bg-gradient-to-r from-lime/50 via-lime/10 to-transparent" aria-hidden="true" />

      <div className="container-x">
        {eyebrow && (
          <Reveal>
            <p className="eyebrow mb-5 flex items-center gap-3">
              <span className="inline-block h-px w-8 bg-lime" aria-hidden="true" />
              {eyebrow}
            </p>
          </Reveal>
        )}
        <SplitHeading as="h1" text={title} className="max-w-4xl text-fluid-3xl text-paper" />
        {lede && (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-prose text-fluid-lg leading-relaxed text-paper-100/70">{lede}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.25}><div className="mt-8">{children}</div></Reveal>}
      </div>
    </header>
  )
}

/* ============================================================================
   TICKER BAND — lime strip of repeating brand lines.
   Cheap, loud, on-brand, and it breaks up the black/white alternation.
   ========================================================================== */
export function TickerBand({ items, tone = 'lime', speed = 'animate-marquee' }) {
  const toneClass = tone === 'lime' ? 'bg-lime text-ink' : 'bg-forest-600 text-paper'
  return (
    <div className={cn('overflow-hidden py-3', toneClass)} aria-hidden="true">
      <div className="flex">
        <div className={cn('flex shrink-0 items-center gap-10 pr-10', speed)}>
          {[...items, ...items, ...items, ...items].map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 font-display text-fluid-xs uppercase tracking-[0.24em]">
              {item}
              <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
