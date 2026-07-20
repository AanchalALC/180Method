import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowUpRight, ArrowLeft } from 'lucide-react'

import { Seo } from '@/components/ui/Widgets'
import {
  Button, Section, Reveal, RevealGroup, RevealItem, SectionHeading,
} from '@/components/ui/Primitives'
import { team } from '@/data/team'
import { links } from '@/data/site'

/* ============================================================================
   TEAM MEMBER — /team/:slug
   One data-driven page for every member. Reads from team.js; renders only the
   sections that have data, so a lean profile (Vishal) and a rich one (Arya)
   both look intentional.

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
          fetchPriority="high"
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

function Chips({ items, accent = 'forest' }) {
  const hover =
    accent === 'lime'
      ? 'hover:border-transparent hover:bg-lime hover:text-ink'
      : 'hover:border-transparent hover:bg-forest-600 hover:text-paper'
  return (
    <RevealGroup className="flex flex-wrap gap-2.5" gap={0.04}>
      {items.map((item) => (
        <RevealItem key={item}>
          <span
            className={`inline-block rounded-full border border-ink/15 px-5 py-2.5 font-display text-fluid-xs uppercase tracking-[0.12em] text-ink transition-colors duration-500 ${hover}`}
          >
            {item}
          </span>
        </RevealItem>
      ))}
    </RevealGroup>
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

export default function TeamMember() {
  const { slug } = useParams()
  const member = team.find((m) => m.slug === slug)

  // Unknown slug → back to the grid (belt-and-braces with the 404 route).
  if (!member) return <Navigate to="/team" replace />

  const fname = firstName(member.name)
  const hasProfessional =
    (member.specialisations?.length ?? 0) > 0 || (member.clientGroups?.length ?? 0) > 0

  return (
    <>
      <Seo title={member.seoTitle} description={member.seoDescription} path={`/team/${member.slug}`} />

      {/* HERO — portrait on top, name highlighted, on ink. */}
      <section className="on-dark relative isolate overflow-hidden bg-ink-950 pb-16 pt-[calc(var(--header-h)+3rem)]">
        <div className="absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-forest-600/20 blur-[120px]" aria-hidden="true" />
        <div className="container-x relative">
          <Reveal>
            <Link
              to="/team"
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

      {/* PROFESSIONAL — paper. Specialisations + who they work with. */}
      {hasProfessional && (
        <Section tone="paper">
          <div className="container-x space-y-14">
            {member.specialisations?.length > 0 && (
              <div>
                <SectionHeading eyebrow="Areas of specialisation" title="What I offer" size="lg" />
                <div className="mt-8"><Chips items={member.specialisations} accent="forest" /></div>
              </div>
            )}
            {member.clientGroups?.length > 0 && (
              <div>
                <SectionHeading eyebrow="Who I work with" title="If you have a body, you qualify" />
                <div className="mt-8"><Chips items={member.clientGroups} accent="lime" /></div>
              </div>
            )}
          </div>
        </Section>
      )}

      {/* APPROACH — forestDeep dark anchor. Philosophy + key learning. */}
      {(member.philosophy || member.keyLearning) && (
        <Section tone="forestDeep">
          <div className="container-x">
            <SectionHeading eyebrow="My approach" title={`How ${fname} works`} size="lg" />
            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {member.philosophy && (
                <Reveal className="border-l-2 border-lime pl-6">
                  <p className="eyebrow mb-3 text-lime">Training philosophy</p>
                  <p className="text-fluid-lg leading-relaxed text-paper-100/85">{member.philosophy}</p>
                </Reveal>
              )}
              {member.keyLearning && (
                <Reveal delay={0.1} className="border-l-2 border-lime pl-6">
                  <p className="eyebrow mb-3 text-lime">A key learning</p>
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
                  <RevealItem as="li" key={c} className="flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest-600" aria-hidden="true" />
                    <span className="leading-relaxed text-ink/75">{c}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}

          <div className="lg:col-span-7">
            {member.hobbies?.length > 0 && (
              <>
                <SectionHeading eyebrow="Off the floor" title={`A little more about ${fname}`} />
                <div className="mt-8"><Chips items={member.hobbies} accent="forest" /></div>
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

      {/* CTA — ink. */}
      <Section tone="ink" className="py-section-sm">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="text-fluid-xl leading-tight text-paper">Ready to train with {fname}?</h2>
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