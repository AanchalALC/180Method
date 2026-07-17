import { ArrowUpRight, Instagram } from 'lucide-react'
import { Seo } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
  PageHero,
} from '@/components/ui/Primitives'
import { site, links } from '@/data/site'

/* ============================================================================
   COUNSELLING
   Copy is unchanged from the live page (it's good and the outline keeps it),
   with one fix: audit C1 — "Send us a mesage in Whatsapp" is misspelled on the
   live site, in two places.
   ========================================================================== */

const points = [
  {
    title: 'Supported, not pushed',
    copy: 'Your body isn’t pushed through psychological concerns; it’s supported through it.',
  },
  {
    title: 'With your mind, not against it',
    copy: 'We don’t train against your mind — we train with it.',
  },
  {
    title: 'Mental health is part of the plan',
    copy: 'Performance grows when mental health is built into the programme from day one.',
  },
]

export default function Counselling() {
  return (
    <>
      <Seo
        title="Counselling & Fitness Together | 180 Method × Another Light"
        description="Through our partnership with Another Light Counselling, every 180 Method package includes a free counselling session. Training that works with your mind, not against it."
        path="/counselling"
      />

      <PageHero
        eyebrow={`In partnership with ${site.partner.name}`}
        title="A more human approach to transformation"
        lede="Whether you’re beginning your fitness journey or returning after a break, this integrated approach helps you move forward with clarity, confidence, and support."
        image="/images/home/counselling-room.jpg"
      />

      <Section tone="paper">
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="What changes"
                title="Because real transformation isn’t just about doing more"
                lede="It’s about understanding yourself better."
              />
              <Reveal delay={0.15}>
                <div className="mt-8 rounded-3xl bg-lime p-7">
                  <p className="font-display text-fluid-base uppercase leading-snug text-ink">
                    Every 180 Method package includes at least one free counselling session with a
                    qualified professional.
                  </p>
                </div>
              </Reveal>
            </div>

            <RevealGroup className="space-y-px overflow-hidden rounded-4xl bg-ink/10 lg:col-span-7" gap={0.08}>
              {points.map((point, i) => (
                <RevealItem key={point.title} className="group bg-paper p-8 transition-colors duration-500 hover:bg-paper-100">
                  <div className="flex gap-6">
                    <span className="font-display text-fluid-sm text-forest-600" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-fluid-lg leading-none">{point.title}</h3>
                      <p className="mt-3 leading-relaxed text-ink/65">{point.copy}</p>
                    </div>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Section>

      <Section tone="ink">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <SectionHeading
              eyebrow="Talk to us"
              title="Get in touch today and let’s work together"
              align="center"
            />
            <Reveal delay={0.1}>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                {/* "message", spelled correctly — audit C1. */}
                <Button href={links.whatsapp} variant="lime" size="lg" icon={ArrowUpRight}>
                  Send us a message on WhatsApp
                </Button>
                <Button href={links.instagram} variant="outlineLight" size="lg" icon={Instagram}>
                  Instagram
                </Button>
              </div>
              <p className="mt-8 text-fluid-sm text-paper-200/50">
                Counselling is delivered by qualified professionals at{' '}
                <a
                  href={site.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline text-lime"
                >
                  {site.partner.name}
                </a>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  )
}
