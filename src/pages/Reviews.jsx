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
        path="/reviews/"
      />

      {/* No image for now, by request (Aug 2026) — PageHero's no-image state
          is a designed fallback (dark forest/ink radial gradient), not a
          blank gap, so this reads as intentional rather than broken. Add an
          `image="/images/..."` prop back here once a real header photo for
          this page is chosen. */}
      <PageHero
        eyebrow="Testimonials"
        title="Don’t just take our word for it"
        lede="Straight from people who’ve experienced The 180 Method."
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

      {/* CTA — ink, not forest. Section directly above the Footer's own CTA
          band, which is forest-800 — two identical green bands back to back
          read as one flat slab rather than two distinct moments. Every other
          page ends its pre-footer CTA in ink for the same reason (see
          Team.jsx, TeamMember.jsx, MediaFeatures.jsx); this page was the one
          outlier still on forest. */}
      <Section tone="ink" className="overflow-hidden py-section-sm">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-lime/10 blur-3xl" aria-hidden="true" />
        <div className="container-x relative text-center">
          <SectionHeading
            eyebrow="Your turn"
            title="Trained with us?"
            lede="Reviews are the main reason new people walk through the door. If we earned it, we’d love to hear it."
            align="center"
          />
          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {/* Audit R3 — closed, googleReviewUrl is set in src/data/reviews.js.
                  Kept behind this guard rather than hardcoding the render, so a
                  future empty string hides the button instead of shipping a
                  dead link. */}
              {googleReviewUrl && (
                <Button href={googleReviewUrl} variant="lime" size="lg">
                  Write a review
                </Button>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
