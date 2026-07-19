import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { navigation, site, links } from '@/data/site'
import { Button } from '@/components/ui/Primitives'
import { cn } from '@/lib/cn'
import { EASE } from '@/lib/motion'

/* ============================================================================
   NAVBAR

   FIX 1 — LEGIBILITY (do not regress)
   -----------------------------------
   v1 was transparent at scroll-top with light text, and only went solid on
   scroll. On any light section it was light text on light background and the
   bar vanished. The bar is now ALWAYS a solid dark surface. Scroll tunes the
   finish (blur, hairline, shadow) and NOTHING else. Readability must never
   depend on scroll position.

   FIX 2 — OVERLAP
   ---------------
   v2's centred <ul> was `absolute left-1/2 -translate-x-1/2` — out of flow, so
   it had zero width in the flex row. With 9 items in `navigation` it grew
   outward and landed on top of the right-hand icons ("Contact" under the
   Instagram glyph). The bar is now three IN-FLOW zones:

       [ logo: shrink-0 ]  [ nav: flex-1 min-w-0 ]  [ actions: shrink-0 ]

   In-flow zones cannot overlap. They can only run out of room — which is what
   the xl breakpoint on the inline nav is for.

   FIX 3 — DESKTOP CLUTTER
   -----------------------
   The Instagram and WhatsApp glyphs are gone from the desktop bar. Logo + 9
   items + 2 glyphs + a CTA does not fit in a 1360px container, and both links
   already live in the Footer and in the mobile drawer. Below `md` (where the
   CTA hides) a single WhatsApp icon-button keeps one action in the bar.

   Both menus still render from the single `navigation` array in
   src/data/site.js — they physically cannot drift apart.

   RESPONSIVE MAP
   --------------
     < 768px        logo · WhatsApp glyph · hamburger
     768 – 1279px   logo · "Workout with us" · hamburger
     >= 1280px      logo · 9-item centred nav · "Workout with us"
     >= 1536px      as above, roomier tracking on the nav items
   Drawer: 1 column on phones, 2 columns from `sm` so all 9 items fit unscrolled.

   LOGO — BLOCKED
   --------------
   TODO(180 team): audit item G2. public/images/logo-lime.svg is still a
   PLACEHOLDER wordmark. The only real assets are a 581x430 PNG and a
   charcoal-on-white JPEG — JPEG has no alpha channel, so it cannot sit on this
   dark bar, and charcoal (#28251A) is the exact warm-brown that got v1
   rejected. Needed from Arya: the original vector, exported as
   logo-lime.svg (#DCE576) and logo-ink.svg (#0B0D0B). Keep those filenames and
   no code here changes. The real lockup is a stacked, near-square mark
   (~1.32:1), not a wide wordmark — hence the 58x44 box below.
   ========================================================================== */

function WhatsAppIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 0 1 6.988 2.896 9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

function Logo({ className }) {
  return (
    <img
      src="/images/logo-lime.png"
      alt=""
      width={74}
      height={56}
      decoding="async"
      className={cn('w-auto', className)}
    />
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>

      <header
        className={cn(
          'on-dark fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-brand',
          scrolled
            ? 'bg-ink-950/95 shadow-[0_1px_0_0_rgba(220,229,118,0.14),0_18px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl'
            : 'bg-ink-950/80 backdrop-blur-md'
        )}
        style={{ height: 'var(--header-h)' }}
      >
        <nav
          aria-label="Primary"
          className="container-x flex h-full items-center gap-3 sm:gap-4"
        >
          <Link
            to="/"
            className="shrink-0 rounded-sm"
            aria-label={`${site.name} — home`}
          >
            <Logo className="h-11 md:h-12 xl:h-14" />
          </Link>

          <ul className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex 2xl:gap-1">
            {navigation.map((item) => (
              <li key={item.href} className="shrink-0">
                <NavLink
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn(
                      'relative block whitespace-nowrap rounded-full px-2.5 py-2 font-display uppercase transition-colors duration-300',
                      'text-[0.62rem] tracking-[0.1em] 2xl:px-3 2xl:text-[0.66rem] 2xl:tracking-[0.13em]',
                      isActive ? 'text-ink' : 'text-paper-100/70 hover:text-lime'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full bg-lime"
                          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                        />
                      )}
                      {item.label}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-auto flex shrink-0 items-center gap-2">
            <a
              href={links.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Message 180 Method on WhatsApp"
              className="grid h-10 w-10 place-items-center rounded-full text-paper-100/70 transition-colors hover:bg-lime hover:text-ink md:hidden"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>

            <Button
              href={links.whatsapp}
              variant="lime"
              size="sm"
              icon={ArrowUpRight}
              className="hidden md:inline-flex"
            >
              Workout with us
            </Button>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-full text-paper transition-colors hover:bg-paper/10 xl:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="on-dark fixed inset-0 z-[60] xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_80%_0%,#0F2618_0%,#040604_60%)]" />

            <motion.div
              className="relative flex h-full flex-col"
              initial={{ y: -12 }}
              animate={{ y: 0 }}
              exit={{ y: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <div
                className="container-x flex shrink-0 items-center justify-between"
                style={{ height: 'var(--header-h)' }}
              >
                <Logo className="h-11 md:h-12" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  autoFocus
                  className="grid h-10 w-10 place-items-center rounded-full text-paper transition-colors hover:bg-paper/10"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <div className="container-x flex-1 overflow-y-auto py-4">
                <ul className="flex flex-col sm:grid sm:grid-cols-2 sm:gap-x-8">
                  {navigation.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + i * 0.03, duration: 0.4, ease: EASE }}
                      className="border-b border-paper/10"
                    >
                      <NavLink
                        to={item.href}
                        end={item.href === '/'}
                        className={({ isActive }) =>
                          cn(
                            'flex items-center justify-between gap-3 py-3.5 font-display text-fluid-lg uppercase tracking-tight transition-colors sm:text-fluid-xl',
                            isActive ? 'text-lime' : 'text-paper hover:text-lime'
                          )
                        }
                      >
                        <span className="truncate">{item.label}</span>
                        <ArrowUpRight className="h-5 w-5 shrink-0 opacity-30" aria-hidden="true" />
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-7 space-y-3">
                  <Button href={links.whatsapp} variant="lime" size="lg" className="w-full">
                    Workout with us
                  </Button>
                  <div className="flex gap-3">
                    <Button href={links.instagram} variant="outlineLight" size="md" className="flex-1">
                      Instagram
                    </Button>
                    <Button href={links.tel} variant="outlineLight" size="md" className="flex-1">
                      Call us
                    </Button>
                  </div>
                </div>

                <p className="mt-7 pb-6 text-fluid-xs text-paper-100/40">
                  {site.phoneDisplay} · {site.email}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}