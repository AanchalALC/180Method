import { ArrowUpRight } from 'lucide-react'
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
import { team } from '@/data/team'
import { links } from '@/data/site'

/* ============================================================================
   TEAM
   Audit T1: the live page has names and roles but NO photos and NO bios, and
   the cards sit on top of the logo as a placeholder.

   Rather than invent bios, any member with `bioPending: true` renders a quiet
   "profile coming soon" state. It looks deliberate instead of broken, and it
   gives the 180 team a visible reason to send the copy. Fill in `bio` +
   `credentials` in src/data/team.js and set bioPending: false — the card
   upgrades itself.
   ========================================================================== */

function TeamCard({ member }) {
  return (
    <RevealItem className="group">
      <div className="duotone grain relative aspect-[4/5] overflow-hidden rounded-4xl bg-paper-200">
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at 180 Method`}
          loading="lazy"
          width={800}
          height={1000}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-brand group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink-950 via-ink-950/25 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 z-[4] p-6">
          <p className="font-display text-fluid-lg uppercase leading-none text-paper">
            {member.name}
          </p>
          <p className="mt-1.5 text-fluid-xs text-lime">
            {member.role}
            <span className="text-paper-200/50"> · {member.pronouns}</span>
          </p>
        </div>
      </div>

      <div className="px-1 pt-5">
        {member.bioPending ? (
          <p className="text-fluid-sm italic leading-relaxed text-ink/35">
            Full profile coming soon.
          </p>
        ) : (
          <>
            <p className="leading-relaxed text-ink/70">{member.bio}</p>
            {member.credentials && (
              <p className="mt-3 font-display text-fluid-xs uppercase tracking-[0.14em] text-ink/45">
                {member.credentials}
              </p>
            )}
          </>
        )}

        {member.link && (
          <a
            href={member.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline mt-4 inline-flex items-center gap-1.5 font-display text-fluid-xs uppercase tracking-[0.14em] text-forest-600"
          >
            {member.link.label}
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        )}
      </div>
    </RevealItem>
  )
}

export default function Team() {
  return (
    <>
      <Seo
        title="Meet the Team — Trainers & Therapists | 180 Method"
        description="Meet the coaches, nutritionist and therapist behind 180 Method — Arya Talwalkar, Aanchal Narang, Kartik, Dr. Moyna Vakil and Vishal Hunari."
        path="/team"
      />

      <PageHero
        eyebrow="Our team"
        title="Meet the trainers"
        lede="The people you will actually be working with — on the floor, at the table, and in the room."
        image="/images/team/hero.jpg"
      />

      <Section tone="paperAlt">
        <div className="container-x">
          <SectionHeading
            eyebrow="Train with the best"
            title="Coaches, a nutritionist, and a therapist"
            lede="Everyone here works to the same method, which is why nothing falls through the gaps between them."
            className="mb-14"
          />

          <RevealGroup className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3" gap={0.09}>
            {team.map((member) => (
              <TeamCard key={member.slug} member={member} />
            ))}
          </RevealGroup>
        </div>
      </Section>

      <Section tone="ink" className="py-section-sm">
        <div className="container-x">
          <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="text-fluid-xl leading-tight text-paper">Not sure who to start with?</h2>
              <p className="mt-2 max-w-lg leading-relaxed text-paper-200/60">
                Message us and we will point you at the right person — not the most expensive one.
              </p>
            </div>
            <Button href={links.whatsapp} variant="lime" icon={ArrowUpRight}>
              Ask us
            </Button>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
