import { Link } from 'react-router-dom'
import { Instagram, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react'
import { navigation, site, links } from '@/data/site'
import { Button, Reveal, SplitHeading } from '@/components/ui/Primitives'

/* ============================================================================
   FOOTER
   Exactly ONE of these, rendered by Layout, so every page gets it. That
   structurally fixes audit G1–G5: two live footers, drifting emails, "#" mailto
   links, the BD Themes credit, and a hardcoded "© 2025". The year is computed,
   so it can never go stale again.

   The static Instagram grid from the live site is deliberately absent — it was
   cropped WhatsApp JPGs pointing at instagram.com/bdthemes (audit G6 / H4).
   A link is honest; a fake feed is not.
   ========================================================================== */

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="on-dark relative overflow-hidden bg-ink-950 text-paper-100">
      {/* CTA band — forest green, so the footer doesn't read as one black slab. */}
      <div className="relative overflow-hidden bg-forest-800">
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-lime/10 blur-3xl" aria-hidden="true" />
        <div className="container-x relative py-section-sm">
          <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="eyebrow mb-4">Take the first step</p>
              <SplitHeading text="Take the first step. We will do the rest." className="max-w-2xl text-fluid-2xl text-paper" />
            </div>
            <Button href={links.whatsapp} variant="lime" size="lg" icon={ArrowUpRight}>Workout with us</Button>
          </Reveal>
        </div>
      </div>

      <div className="container-x py-section-sm">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src="/images/logo-lime.png" alt={site.name} width={140} height={54} className="h-10 w-auto" />
            <p className="mt-6 max-w-sm leading-relaxed text-paper-100/55">
              At 180 Method, we meet you exactly where you are — physically, mentally, and emotionally —
              and support you forward with intention.
            </p>
            <p className="mt-6 font-display text-fluid-xs uppercase tracking-[0.24em] text-lime">{site.promise}</p>
          </div>

          <nav aria-label="Footer" className="lg:col-span-3">
            <h2 className="eyebrow mb-5">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 lg:grid-cols-1">
              {navigation.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="link-underline text-fluid-sm text-paper-100/60 transition-colors hover:text-lime">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-5">
            <h2 className="eyebrow mb-5">Get in touch</h2>
            <ul className="space-y-4">
              <li>
                <a href={links.tel} className="group flex items-start gap-3 text-paper-100/60 transition-colors hover:text-lime">
                  <Phone className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="link-underline">{site.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a href={links.mailto} className="group flex items-start gap-3 break-all text-paper-100/60 transition-colors hover:text-lime">
                  <Mail className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="link-underline">{site.email}</span>
                </a>
              </li>
              <li>
                <a href={site.address.mapDirectionsUrl} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-paper-100/60 transition-colors hover:text-lime">
                  <MapPin className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{site.address.line1}<br />{site.address.line2}, {site.address.city}</span>
                </a>
              </li>
              <li>
                <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3 text-paper-100/60 transition-colors hover:text-lime">
                  <Instagram className="mt-1 h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="link-underline">{site.instagramHandle}</span>
                </a>
              </li>
            </ul>

            <div className="mt-8 rounded-2xl border border-lime/20 bg-lime/[0.04] p-5">
              <p className="text-fluid-xs leading-relaxed text-paper-100/55">
                Counselling delivered in partnership with{' '}
                <a href={site.partner.url} target="_blank" rel="noopener noreferrer" className="link-underline text-lime">
                  {site.partner.name}
                </a>.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-6 text-fluid-xs text-paper-100/35 sm:flex-row sm:items-center">
          <p>© {year} {site.legalName}. All rights reserved.</p>
          <p className="font-display uppercase tracking-[0.24em] text-lime/50">{site.tagline}</p>
        </div>
      </div>
    </footer>
  )
}
