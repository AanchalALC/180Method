import { useEffect, useRef, useState, useCallback, Children, cloneElement, isValidElement } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, animate } from 'framer-motion'
import { ChevronDown, Star } from 'lucide-react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from '@/lib/useReducedMotion'
import { EASE } from '@/lib/motion'

/* ============================================================================
   COUNTER — counts up once when scrolled into view.
   Uses framer's `animate` on a value and writes to textContent directly, so
   React never re-renders 60 times a second. Reduced motion → the final number
   appears immediately, no ticking.
   ========================================================================== */
export function Counter({ value, suffix = '', duration = 2, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (reduced || !inView) {
      if (reduced) node.textContent = value.toLocaleString('en-IN') + suffix
      return
    }

    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate(latest) {
        node.textContent = Math.round(latest).toLocaleString('en-IN') + suffix
      },
    })
    return () => controls.stop()
  }, [inView, value, suffix, duration, reduced])

  return (
    <span ref={ref} className={className} aria-label={`${value.toLocaleString('en-IN')}${suffix}`}>
      0{suffix}
    </span>
  )
}

/* ============================================================================
   MARQUEE — infinite logo/word strip.
   The track loops seamlessly. Scrollable marquees use repeated sets so
   native horizontal scrolling can wrap in either direction.
   ========================================================================== */
export function Marquee({
  children,
  speed = 'normal',
  className,
  pauseOnHover = true,
  scrollable = false,
  'aria-label': ariaLabel,
}) {
  const reduced = usePrefersReducedMotion()
  const items = Children.toArray(children)
  const viewportRef = useRef(null)
  const trackRef = useRef(null)
  const pointerInsideRef = useRef(false)
  const focusWithinRef = useRef(false)

  const wrapScroll = useCallback(() => {
    const viewport = viewportRef.current
    const cycleWidth = trackRef.current?.firstElementChild?.getBoundingClientRect().width
    if (!viewport || !cycleWidth) return

    if (viewport.scrollLeft < cycleWidth) viewport.scrollLeft += cycleWidth
    else if (viewport.scrollLeft >= cycleWidth * 2) viewport.scrollLeft -= cycleWidth
  }, [])

  useEffect(() => {
    if (!scrollable) return

    const viewport = viewportRef.current
    const track = trackRef.current
    const cycleWidth = track?.firstElementChild?.getBoundingClientRect().width
    if (!viewport || !track || !cycleWidth) return

    if (viewport.scrollLeft < cycleWidth || viewport.scrollLeft >= cycleWidth * 2) {
      viewport.scrollLeft = cycleWidth
    }
    if (reduced) return

    let previousTime
    let frame
    const duration = speed === 'slow' ? 70000 : 40000
    const tick = (time) => {
      if (
        previousTime !== undefined &&
        !(pauseOnHover && pointerInsideRef.current) &&
        !focusWithinRef.current
      ) {
        viewport.scrollLeft += ((time - previousTime) * cycleWidth) / duration
      }
      previousTime = time
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [pauseOnHover, reduced, scrollable, speed])

  if (scrollable) {
    return (
      <div
        ref={viewportRef}
        onScroll={wrapScroll}
        onPointerEnter={() => { pointerInsideRef.current = true }}
        onPointerLeave={() => { pointerInsideRef.current = false }}
        onFocus={() => { focusWithinRef.current = true }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) focusWithinRef.current = false
        }}
        className={cn('group relative flex overflow-x-auto overflow-y-hidden mask-fade-x', className)}
        role="region"
        aria-label={ariaLabel}
        tabIndex={0}
      >
        <div ref={trackRef} className="flex w-max min-w-max">
          {[-1, 0, 1].map((copy) => (
            <div
              key={copy}
              className="flex shrink-0 items-center gap-12 pr-12"
              aria-hidden={copy !== 0}
            >
              {items.map((child, i) => (
                <div key={i} className="shrink-0">
                  {copy !== 0 && isValidElement(child) && child.type === 'a'
                    ? cloneElement(child, { tabIndex: -1 })
                    : child}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (reduced) {
    return (
      <div
        className={cn('flex gap-12 overflow-x-auto pb-2', className)}
      >
        {items.map((child, i) => (
          <div key={i} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className={cn('group relative flex overflow-hidden mask-fade-x', className)}
    >
      <div
        className={cn(
          'flex shrink-0 items-center gap-12 pr-12',
          speed === 'slow' ? 'animate-marquee-slow' : 'animate-marquee',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {/* Rendered twice: the second copy is what the first scrolls into. */}
        {[...items, ...items].map((child, i) => (
          <div key={i} className="shrink-0" aria-hidden={i >= items.length}>
            {child}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================================================================
   ACCORDION — used on the FAQ page.
   Proper disclosure pattern: real <button>, aria-expanded, aria-controls, and
   the panel is removed from the a11y tree when closed.
   ========================================================================== */
export function Accordion({ items, idPrefix = 'acc' }) {
  const [open, setOpen] = useState(null)
  const toggle = useCallback((i) => setOpen((cur) => (cur === i ? null : i)), [])

  return (
    <div className="divide-y divide-ink/10 border-y border-ink/10">
      {items.map((item, i) => {
        const isOpen = open === i
        const btnId = `${idPrefix}-btn-${i}`
        const panelId = `${idPrefix}-panel-${i}`

        return (
          <div key={item.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-forest-600"
              >
                <span className="font-display text-fluid-base uppercase leading-snug tracking-tight">
                  {item.q}
                </span>
                <span
                  className={cn(
                    'mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-ink/20 transition-all duration-500 ease-brand',
                    isOpen && 'rotate-180 border-transparent bg-lime'
                  )}
                >
                  <ChevronDown className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            </h3>

            <motion.div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              initial={false}
              animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="overflow-hidden"
              {...(!isOpen && { inert: '' })}
            >
              <div className="max-w-prose pb-7 pr-12">
                <p className="leading-relaxed text-ink/70">{item.a}</p>
                {/* Optional per-answer links (see src/data/faqs.js). Internal
                    routes go through <Link> so they don't reload the app. */}
                {item.links?.length > 0 && (
                  <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                    {item.links.map((link) =>
                      link.href.startsWith('/') ? (
                        <Link
                          key={link.label}
                          to={link.href}
                          className="link-underline font-display text-fluid-xs uppercase tracking-[0.14em] text-forest-700"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-underline font-display text-fluid-xs uppercase tracking-[0.14em] text-forest-700"
                        >
                          {link.label}
                        </a>
                      )
                    )}
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        )
      })}
    </div>
  )
}

/* ============================================================================
   STARS — review rating. One aria-label on the group; the icons are decorative.
   ========================================================================== */
export function Stars({ rating = 5, className }) {
  return (
    <div className={cn('flex gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn('h-3.5 w-3.5', i < rating ? 'fill-lime-600 text-lime-600' : 'text-ink/20')}
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

/* ============================================================================
   SEO — per-page document head.
   A ~40-line hook instead of react-helmet-async: fewer deps, and for a static
   site this is all it has to do. Rewrites title, description, canonical, OG
   tags, and optionally injects JSON-LD.
   ========================================================================== */
function upsertMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
    document.head.appendChild(el)
    return el
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v))
  return el
}

export function Seo({ title, description, path = '/', image, schema }) {
  useEffect(() => {
    const url = `https://180method.in${path}`
    const ogImage = image
      ? new URL(image, url).href
      : 'https://180method.in/images/og-default.jpg'

    document.title = title

    upsertMeta('meta[name="description"]', { name: 'description', content: description })
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title })
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: url })
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: ogImage })
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: ogImage })
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: title })
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description })

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', url)

    let scriptEl
    if (schema) {
      scriptEl = document.createElement('script')
      scriptEl.type = 'application/ld+json'
      scriptEl.textContent = JSON.stringify(schema)
      scriptEl.dataset.pageSchema = 'true'
      document.head.appendChild(scriptEl)
    }

    return () => {
      if (scriptEl) scriptEl.remove()
    }
  }, [title, description, path, image, schema])

  return null
}
