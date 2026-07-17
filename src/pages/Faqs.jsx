import { useMemo } from 'react'
import { Seo, Accordion } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  SectionHeading,
  PageHero,
} from '@/components/ui/Primitives'
import { faqGroups, faqSchemaItems } from '@/data/faqs'
import { links } from '@/data/site'

/* ============================================================================
   FAQ  (audit N2 — this page does not exist on the live site at all)
   Questions come from the final draft of the outline.

   The FAQPage JSON-LD is built ONLY from answers the 180 team has approved
   (draft: false). Publishing an unapproved answer as a Google rich result is
   how you end up with a wrong price quoted in the search results.
   ========================================================================== */

export default function Faqs() {
  const schema = useMemo(() => {
    if (faqSchemaItems.length === 0) return null
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqSchemaItems.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    }
  }, [])

  return (
    <>
      <Seo
        title="FAQs | 180 Method"
        description="Common questions about training at 180 Method — programs, the 1:5 group ratio, nutrition, counselling, beginners, injuries, timings and how to book."
        path="/faqs"
        schema={schema}
      />

      <PageHero
        eyebrow="FAQs"
        title="Questions, answered"
        lede="If yours isn’t here, message us — we would rather talk it through than have you guess."
      />

      <Section tone="paperAlt">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
                <SectionHeading eyebrow="Still stuck?" title="Just ask us" />
                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-prose leading-relaxed text-ink/65">
                    We answer WhatsApp ourselves. No bot, no call centre.
                  </p>
                  <div className="mt-6">
                    <Button href={links.whatsapp} variant="ink">
                      Message us
                    </Button>
                  </div>
                </Reveal>
              </div>
            </div>

            <div className="space-y-14 lg:col-span-8">
              {faqGroups.map((group) => (
                <div key={group.category}>
                  <Reveal>
                    <h2 className="eyebrow mb-4">{group.category}</h2>
                  </Reveal>
                  <Reveal delay={0.05}>
                    <Accordion items={group.items} idPrefix={group.category.replace(/\W+/g, '-').toLowerCase()} />
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}
