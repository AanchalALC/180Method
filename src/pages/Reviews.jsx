import { Seo, Stars } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
  PageHero,
} from '@/components/ui/Primitives'
import { reviews, formatDate, googleReviewUrl } from '@/data/reviews'
import { links } from '@/data/site'

/* ============================================================================
   REVIEWS
   Audit R1/R2/R3 fixed at the data layer, not with CSS patches:
   - names no longer run into dates ("Rituja Ghai2/14/2026" on the live site)
   - one date format, rendered by formatDate()
   - quote marks applied by this component, not baked into the strings
   - stars per review
   The "Leave a review" button only renders once googleReviewUrl is set in
   src/data/reviews.js — a button to nowhere is worse than no button.

   Masonry via CSS columns: with reviews of wildly different lengths, a grid
   leaves ragged gaps. Columns pack them tight. Reading order still flows
   top-to-bottom within a column, which is fine for testimonials.
   ========================================================================== */

export default function Reviews() {
  const average = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)

  return (
    <>
      <Seo
        title="Client Reviews & Testimonials | 180 Method"
        description="Read what members say about training at 180 Method — group sessions, personal training and the studio itself, in their own words."
        path="/reviews"
      />

      <PageHero
        eyebrow="Testimonials"
        title="Don’t just take our word for it"
        lede="Unedited, apart from tidying up where a name ran into a date."
        image="/images/home/hero.jpg"
      >
        <div className="flex items-center gap-4">
          <Stars rating={5} className="[&_svg]:h-5 [&_svg]:w-5" />
          <p className="font-display text-fluid-sm uppercase tracking-[0.14em] text-paper-100">
            {average} / 5 · {reviews.length} reviews
          </p>
        </div>
      </PageHero>

      <Section tone="paperAlt">
        <div className="container-x">
          <RevealGroup className="columns-1 gap-5 md:columns-2 lg:columns-3" gap={0.06}>
            {reviews.map((review) => (
              <RevealItem
                key={review.id}
                className="mb-5 break-inside-avoid rounded-4xl bg-paper p-7 transition-transform duration-500 ease-brand hover:-translate-y-1"
              >
                <Stars rating={review.rating} />
                <blockquote className="mt-5 leading-relaxed text-ink/80">
                  “{review.text}”
                </blockquote>
                <footer className="mt-6 border-t border-ink/10 pt-4">
                  <p className="font-display text-fluid-xs uppercase tracking-[0.14em]">
                    {review.name}
                  </p>
                  <p className="mt-1 text-fluid-xs text-ink/45">{formatDate(review.date)}</p>
                </footer>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section tone="forest" className="py-section-sm">
        <div className="container-x text-center">
          <SectionHeading
            eyebrow="Your turn"
            title="Trained with us?"
            lede="Reviews are the main reason new people walk through the door. If we earned it, we’d love to hear it."
            align="center"
          />
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {/* TODO(180 team): audit R3 — add googleReviewUrl to switch this on. */}
              {googleReviewUrl && (
                <Button href={googleReviewUrl} variant="lime" size="lg">
                  Leave a Google review
                </Button>
              )}
              <Button href={links.whatsapp} variant="outlineLight" size="lg">
                Book a session
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
