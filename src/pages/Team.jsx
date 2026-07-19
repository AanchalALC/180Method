import { ArrowUpRight } from 'lucide-react'
import { Seo } from '@/components/ui/Widgets'
import {
  Button,
  Section,
  Reveal,
  RevealGroup,
  RevealItem,
  SectionHeading,
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

   IMAGES: shown RAW — no `.duotone`, no colour layer over the photography,
   matching Home / About / Services. `.grain` (film texture only, not colour)
   is kept. The card's bottom gradient is NOT a colour layer — it's the scrim
   the white name/role text sits on, so it stays.
   ========================================================================== */

/* ---------------------------------------------------------------------------
   HERO — bespoke, replaces <PageHero> so the photo shows in its REAL colours.
   Mirrors ServicesHero exactly (PageHero lays a heavier colour wash across the
   whole photo; this does not).

     • Dark `ink` base (bg-ink-950).
     • Image is RAW / full-colour — `.grain` film texture only, NO `.duotone`,
       NO wash over the whole photo.
     • Scrims are CORNER-ONLY: both gradients fade to transparent, so they only
       darken the bottom-left where the eyebrow / H1 / lede sit. The rest of the
       photo stays clean and in colour.
         - want MORE photo visible → lower the /80 and /65 stops
         - text hard to read on a bright shot → raise them
     • Headline is REAL HTML <h1> (never baked into the image) — one H1, SEO-safe.
     • Hero image is eager + fetchPriority="high" — it's the LCP element.

   HEIGHT: min-h-[72svh] — matches ServicesHero. The lede here is short, so 72
   sits better than About's taller 84. Nudge to taste.
--------------------------------------------------------------------------- */
function TeamHero() {
  return (
    <section className="on-dark relative isolate flex min-h-[72svh] items-end overflow-hidden bg-ink-950 pb-16 pt-[calc(var(--header-h)+2.5rem)]">
      <div className="absolute inset-0 -z-10">
        {/* Raw photo — `.grain` texture only, no `.duotone`, no colour wash. */}
        <div className="grain absolute inset-0">
          <img
            src="/images/team/hero.jpeg"
            alt=""                                 /* decorative — the H1 carries the meaning */
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
            loading="eager"
            fetchPriority="high"
          />
        </div>

        {/* CORNER-ONLY SCRIMS — both fade to transparent, so they only darken the
            bottom-left where the text sits. The rest of the photo stays clean and
            in full colour. Lower the /80 and /65 stops to show more photo. */}
        <div className="absolute inset-0 z-[3] bg-gradient-to-t from-ink-950/80 via-ink-950/20 to-transparent" />
        <div className="absolute inset-0 z-[3] bg-gradient-to-r from-ink-950/65 via-ink-950/5 to-transparent" />
      </div>

      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-5 flex items-center gap-3">
            <span className="inline-block h-px w-10 bg-lime" aria-hidden="true" />
            Our team
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="max-w-5xl font-display text-fluid-3xl uppercase leading-[0.95] tracking-tight text-paper [text-shadow:0_2px_28px_rgba(11,13,11,0.65)]">
            Meet the trainers
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mt-6 max-w-3xl text-fluid-lg leading-relaxed text-paper-100/75 [text-shadow:0_1px_18px_rgba(11,13,11,0.75)]">
            The people you will actually be working with — on the floor, at the
            table, and in the room.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function TeamCard({ member }) {
  return (
    <RevealItem className="group">
      {/* Raw photo — no `.duotone`, shows true colours. `.grain` is film texture
          only. The bottom gradient below is a legibility scrim for the name/role
          text, NOT a colour layer, so it stays. */}
      <div className="grain relative aspect-[4/5] overflow-hidden rounded-4xl bg-paper-200">
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

      <TeamHero />

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