import { Link, Navigate } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'

import { Seo } from '@/components/ui/Widgets'
import {
  Button, Section, Reveal, RevealGroup, RevealItem, SectionHeading, TagRow,
} from '@/components/ui/Primitives'
import { team } from '@/data/team'
import { links } from '@/data/site'

/* ============================================================================
   TEAM MEMBER — per-member top-level legacy URL
   Not /team/:slug — each member is routed at its own live WordPress URL
   (team.js `path`), registered as a top-level <Route> in App.jsx, which
   passes `slug` in as a prop. One data-driven page for every member. Reads
   from team.js; renders only the sections that have data, so a lean profile
   (Kartik) and a rich one (Arya) both look intentional.

   ---------------------------------------------------------------------------
   POINT OF VIEW (Naveen's note — the first/third person clash)
   ---------------------------------------------------------------------------
   THE MEMBER SPEAKS on this page. Every heading over their own content is
   first person: "Your goals, my support", "How we'll train together",
   "A little more about me". The SITE speaks in exactly two places — the hero
   meta line (role · pronouns) and the closing CTA — and even there it never
   narrates the member in third person. "How Arya works" and "A little more
   about Arya" are gone; the CTA is now an instruction to the visitor
   ("Train with Arya"), not narration about him.

   The approach heading and the CTA verb come from team.js, so Aanchal and
   Moyna get "work / talk" instead of "train" without a single name being
   hardcoded here.

   ---------------------------------------------------------------------------
   TAGS (Naveen's note — "the title colour and the tag colours all blend in")
   ---------------------------------------------------------------------------
   The old local <Chips> component painted every pill the same flat outline in
   ink, directly under an ink heading. It is replaced by the shared <TagRow>,
   which cycles four brand combinations. The three rows deliberately start on
   different colours (see the `cycle` props below) so two rows on the same page
   never open with the same pill.

   • Name: surname rendered in `lime` — the palette's loud accent — over `ink`.
   • Photo: raw, no `.duotone`. No image → lime monogram (initials).
   • Motion: fade + short rise via Reveal only (transform/opacity, GPU-safe;
     no masks that could slice text — the sliced-headline bug rule).
   • Section rhythm: ink → forest → paper → forestDeep → paperAlt → ink.
     No two same-tone sections touch.
   • One <h1> (the name), real text, unique <Seo> per member.
   ========================================================================== */

function firstName(name) {
  return name.replace(/^Dr\.\s+/i, '').trim().split(/\s+/)[0]
}

function initials(name) {
  const parts = name.replace(/^Dr\.\s+/i, '').trim().split(/\s+/)
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1][0] : ''
  return (first + last).toUpperCase()
}

/* Credentials may be { title, issuer } or a plain string (older data).
   Normalising here means neither shape can break the page. */
function normaliseCredential(c) {
  return typeof c === 'string' ? { title: c, issuer: null } : c
}

/* Surname in lime. Single-word names go fully lime. */
function MemberName({ name }) {
  const parts = name.trim().split(/\s+/)
  const last = parts.pop()
  const lead = parts.join(' ')
  return (
    <h1 className="font-display text-fluid-4xl uppercase leading-[0.95] tracking-tight text-paper [text-shadow:0_2px_28px_rgba(11,13,11,0.55)]">
      {lead && <span>{lead} </span>}
      <span className="text-lime">{last}</span>
    </h1>
  )
}

function Portrait({ member }) {
  const ring =
    'relative aspect-square w-40 overflow-hidden rounded-full ring-2 ring-lime/60 ring-offset-4 ring-offset-ink-950 sm:w-48 lg:w-56'
  if (member.image) {
    return (
      <div className={`grain ${ring}`}>
        <img
          src={member.image}
          alt={`${member.name}, ${member.role} at 180 Method`}
          width={800}
          height={800}
          loading="eager"
          fetchpriority="high"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }
  // No photo yet → lime monogram, so the card reads deliberate, not broken.
  return (
    <div className={`grid place-items-center bg-forest-600 ${ring}`}>
      <span className="font-display text-fluid-3xl uppercase tracking-tight text-lime">
        {initials(member.name)}
      </span>
    </div>
  )
}

function Fact({ label, value }) {
  if (!value) return null
  return (
    <RevealItem>
      <p className="eyebrow mb-1.5 text-lime">{label}</p>
      <p className="font-display text-fluid-base uppercase tracking-tight text-paper">{value}</p>
    </RevealItem>
  )
}

/* ---------------------------------------------------------------------------
   CREDENTIAL — issuer badge + credential title.

   Naveen asked for certification logos pulled from the internet. Not doing
   that: ACSM / Reebok / ISSTD / TISS marks are trademarks with published usage
   rules, they'd arrive at mismatched resolutions, and a commercial site is
   exactly where that gets noticed. The awarding body set in forest + lime
   carries the same authenticity signal, scales perfectly, and is ours to use.
   If the client wants real logos, request the official brand kit from each
   body — that's a separate task with a slow dependency.

   TUNING: drop `bg-forest-600 text-lime` to `bg-lime text-ink` if the column
   reads too dark next to the hobby tags.
--------------------------------------------------------------------------- */
function Credential({ credential }) {
  const { title, issuer } = normaliseCredential(credential)
  return (
    <RevealItem as="li" className="rounded-2xl border border-ink/10 bg-paper p-5">
      {issuer && (
        <span className="mb-3 inline-block rounded-full bg-forest-600 px-3 py-1 font-display text-fluid-xs uppercase tracking-[0.14em] text-lime">
          {issuer}
        </span>
      )}
      <p className="leading-relaxed text-ink/80">{title}</p>
    </RevealItem>
  )
}

export default function TeamMember({ slug }) {
  const member = team.find((m) => m.slug === slug)

  // Unknown slug → back to the grid (belt-and-braces with the 404 route).
  if (!member) return <Navigate to="/team/" replace />

  const fname = firstName(member.name)
  const hasProfessional =
    (member.specialisations?.length ?? 0) > 0 || (member.clientGroups?.length ?? 0) > 0

  // Site voice, second person — never third-person narration about the member.
  const ctaVerb = member.ctaVerb ?? 'Train'
  const ctaHeading = ctaVerb === 'Talk' ? `Talk to ${fname}` : `${ctaVerb} with ${fname}`

  return (
    <>
      <Seo title={member.seoTitle} description={member.seoDescription} path={member.path} />

      {/* HERO — portrait on top, name highlighted, on ink. */}
      <section className="on-dark relative isolate overflow-hidden bg-ink-950 pb-16 pt-[calc(var(--header-h)+3rem)]">
        <div className="absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-forest-600/20 blur-[120px]" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <Link
              to="/team/"
              className="link-underline mb-10 inline-flex items-center gap-1.5 font-display text-fluid-xs uppercase tracking-[0.14em] text-paper-200/60 transition-colors hover:text-lime"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All team
            </Link>
          </Reveal>

          <div className="flex flex-col items-center text-center">
            <Reveal><Portrait member={member} /></Reveal>

            <Reveal delay={0.1} className="mt-8">
              <p className="eyebrow mb-4 flex flex-wrap items-center justify-center gap-3">
                <span className="inline-block h-px w-8 bg-lime" aria-hidden="true" />
                {member.role}
                <span className="text-paper-200/50">· {member.pronouns}</span>
              </p>
            </Reveal>

            <Reveal delay={0.16}><MemberName name={member.name} /></Reveal>

            {member.preferred && (
              <Reveal delay={0.2}>
                <p className="mt-3 font-display text-fluid-sm uppercase tracking-[0.2em] text-lime/80">
                  “{member.preferred}”
                </p>
              </Reveal>
            )}

            {member.blurb && (
              <Reveal delay={0.24}>
                <p className="mt-6 max-w-2xl text-fluid-lg leading-relaxed text-paper-100/75">
                  {member.blurb}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* QUICK FACTS — forest strip. */}
      <Section tone="forest" className="py-section-sm">
        <div className="container-x">
          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
            <Fact label="Experience" value={member.experience} />
            <Fact label="Languages" value={member.languages?.join(', ')} />
            <Fact label="Training" value={member.mode} />
            <Fact label="Session" value={member.sessionLength} />
          </RevealGroup>
        </div>
      </Section>

      {/* PROFESSIONAL — paper. Specialisations + who they work with.
          Headings are first person: the member is speaking. */}
      {hasProfessional && (
        <Section tone="paper">
          <div className="container-x space-y-14">
            {member.specialisations?.length > 0 && (
              <div>
                <SectionHeading eyebrow="Areas of specialisation" title="Your goals, my support" size="lg" />
                <div className="mt-8">
                  <TagRow items={member.specialisations} />
                </div>
              </div>
            )}
            {member.clientGroups?.length > 0 && (
              <div>
                <SectionHeading eyebrow="Who I work with" title="If you have a body, you qualify" />
                {/* Starts on `forest` so this row doesn't open with lime like the one above it. */}
                <div className="mt-8">
                  <TagRow items={member.clientGroups} cycle={['forest', 'aloe', 'lime', 'quiet']} />
                </div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* APPROACH — forestDeep dark anchor. Philosophy + key learning. */}
      {(member.philosophy || member.keyLearning) && (
        <Section tone="forestDeep">
          <div className="container-x">
            <SectionHeading
              eyebrow="My approach"
              title={member.approachTitle ?? 'How we’ll work together'}
              size="lg"
            />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {member.philosophy && (
                <Reveal className="border-l-2 border-lime pl-6">
                  <p className="eyebrow mb-3 text-lime">My philosophy</p>
                  <p className="text-fluid-lg leading-relaxed text-paper-100/85">{member.philosophy}</p>
                </Reveal>
              )}
              {member.keyLearning && (
                <Reveal delay={0.1} className="border-l-2 border-lime pl-6">
                  <p className="eyebrow mb-3 text-lime">What I’ve learned</p>
                  <p className="text-fluid-lg leading-relaxed text-paper-100/85">{member.keyLearning}</p>
                </Reveal>
              )}
            </div>

            {member.externalProfile && (
              <Reveal delay={0.15}>
                <a
                  href={member.externalProfile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline mt-10 inline-flex items-center gap-1.5 font-display text-fluid-xs uppercase tracking-[0.14em] text-lime"
                >
                  {member.externalProfile.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </Reveal>
            )}
          </div>
        </Section>
      )}

      {/* CREDENTIALS + PERSONAL — paperAlt. */}
      <Section tone="paperAlt">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-16">
          {member.credentials?.length > 0 && (
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Qualifications" title="Certified & trained" />
              <RevealGroup as="ul" className="mt-8 space-y-3" gap={0.05}>
                {member.credentials.map((c) => (
                  <Credential key={normaliseCredential(c).title} credential={c} />
                ))}
              </RevealGroup>
            </div>
          )}

          <div className="lg:col-span-7">
            {member.hobbies?.length > 0 && (
              <>
                <SectionHeading eyebrow="Off the floor" title="A little more about me" />
                {/* Starts on `aloe` — third distinct opening colour on the page. */}
                <div className="mt-8">
                  <TagRow items={member.hobbies} cycle={['aloe', 'lime', 'quiet', 'forest']} />
                </div>
              </>
            )}

            {member.funFact && (
              <Reveal delay={0.1}>
                <div className="mt-10 rounded-3xl border border-ink/10 bg-paper p-7">
                  <p className="eyebrow mb-3 text-forest-600">A fun fact</p>
                  <p className="text-fluid-lg leading-relaxed text-ink/75">{member.funFact}</p>
                </div>
              </Reveal>
            )}

            {member.whisper && (
              <Reveal delay={0.15}>
                <div className="mt-4 rounded-3xl bg-lime p-7">
                  <p className="eyebrow mb-3 text-ink/70">A note for you</p>
                  <p className="font-display text-fluid-base uppercase leading-snug tracking-tight text-ink">
                    {member.whisper}
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Section>

      {/* CTA — ink. Site voice, addressed to the visitor. */}
      <Section tone="ink" className="py-section-sm">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-fluid-xl leading-tight text-paper">{ctaHeading}</h2>
            <p className="mx-auto mt-3 max-w-lg leading-relaxed text-paper-200/60">
              Message us on WhatsApp and we’ll get you started — no pressure, no judgement.
            </p>
            <div className="mt-8">
              <Button href={links.whatsapp} variant="lime" size="lg" icon={ArrowUpRight}>
                Book with {fname}
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  )
}