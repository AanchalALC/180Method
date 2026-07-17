import { Link } from 'react-router-dom'
import { Seo } from '@/components/ui/Widgets'
import { Button, Reveal } from '@/components/ui/Primitives'
import { navigation, links } from '@/data/site'

/* Custom 404 (audit B7). The live site dead-ends; this routes people back.
   Noindex is set via the meta tag below. */
export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | 180 Method"
        description="That page doesn’t exist — but these do."
        path="/404"
      />
      <meta name="robots" content="noindex" />

      <section className="on-dark relative flex min-h-screen items-center bg-ink pt-[var(--header-h)]">
        <div
          className="absolute inset-0 bg-[radial-gradient(125%_125%_at_18%_5%,#1E4634_0%,#0F2618_38%,#040604_100%)]"
          aria-hidden="true"
        />
        <div className="container-x relative py-section">
          <Reveal>
            <p className="font-display text-fluid-5xl leading-none text-lime">404</p>
            <h1 className="mt-6 max-w-2xl text-fluid-2xl leading-[0.95] text-paper">
              This one didn’t turn 180. It just turned nowhere.
            </h1>
            <p className="mt-5 max-w-prose leading-relaxed text-paper-200/65">
              The page you’re looking for has moved or never existed. Here’s everything that does.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Button to="/" variant="lime" size="lg">Back to home</Button>
              <Button href={links.whatsapp} variant="outlineLight" size="lg">Message us</Button>
            </div>

            <nav aria-label="Site pages" className="mt-14 border-t border-paper/10 pt-8">
              <ul className="flex flex-wrap gap-x-6 gap-y-3">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="link-underline font-display text-fluid-xs uppercase tracking-[0.16em] text-paper-200/60 hover:text-lime"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Reveal>
        </div>
      </section>
    </>
  )
}
