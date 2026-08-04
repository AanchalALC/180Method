import { useState } from 'react'
import { Phone, Mail, Clock, MapPin, Instagram, Linkedin, ArrowUpRight, Check, AlertCircle } from 'lucide-react'
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
import { cn } from '@/lib/cn'

/* ============================================================================
   CONTACT
   Audit items fixed here:
   Ct1  demo address "Street name, 22135 Copenhagen, Denmark" → site.address.
        Shows Bandra West / Mumbai / Maharashtra only — no street line or
        pincode exist yet, so none renders, rather than a literal "TODO".
   Ct2  "8:00 AM – 17:00 PM" → one consistent format, from site.hours
   Ct3  no enquiry form → the form below
   Ct4  no map → embed slot, switched on by site.address.mapEmbedUrl
   Ct5  "Send us a mesage" typo → spelled correctly

   THE FORM AND THE "NO BACKEND" RULE
   ----------------------------------
   Web3Forms takes a POST and emails it on. No server, no database, no cost —
   which is the whole reason this site is static. Set VITE_WEB3FORMS_KEY in
   .env (see .env.example) to switch it on. Until a key exists the form is
   hidden rather than broken, and WhatsApp carries the page — which is exactly
   what the live site does today, so nothing is lost in the meantime.
   ========================================================================== */

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

// Accepts optional leading + then 10-15 digits, ignoring spaces/dashes/parens
// as typed (e.g. "+91 97021 31149" or "(91) 97021-31149").
const PHONE_REGEX = /^\+?[0-9]{10,15}$/
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateField(name, value) {
  if (name === 'phone') {
    const cleaned = value.replace(/[\s\-()]/g, '')
    return PHONE_REGEX.test(cleaned) ? '' : 'Enter a valid phone number (10–15 digits, optional country code).'
  }
  if (name === 'email') {
    return EMAIL_REGEX.test(value.trim()) ? '' : 'Enter a valid email address.'
  }
  return ''
}

function EnquiryForm() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [errors, setErrors] = useState({})

  function handleBlur(e) {
    const { name, value } = e.target
    if (name !== 'phone' && name !== 'email') return
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  function handleChange(e) {
    const { name } = e.target
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const fieldErrors = {
      phone: validateField('phone', formData.get('phone') || ''),
      email: validateField('email', formData.get('email') || ''),
    }
    if (fieldErrors.phone || fieldErrors.email) {
      setErrors(fieldErrors)
      return
    }

    setStatus('sending')

    formData.append('access_key', WEB3FORMS_KEY)
    formData.append('subject', 'New enquiry from 180method.in')
    formData.append('from_name', '180 Method Website')

    // Honeypot: bots fill hidden fields, humans don't. Silent success so the
    // bot doesn't learn it was caught.
    if (formData.get('botcheck')) {
      setStatus('success')
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const fieldClass =
    'w-full rounded-2xl border border-ink/15 bg-paper px-5 py-3.5 text-fluid-sm text-ink placeholder:text-ink/35 transition-colors focus:border-forest-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-lime'

  if (status === 'success') {
    return (
      <div className="flex flex-col items-start gap-4 rounded-4xl border border-forest-600/20 bg-forest-600/5 p-8">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-lime">
          <Check className="h-5 w-5 text-ink" aria-hidden="true" />
        </span>
        <div>
          <h3 className="text-fluid-lg leading-none">Message sent</h3>
          <p className="mt-2 leading-relaxed text-ink/65">
            Thanks — we’ll get back to you shortly. If it’s urgent, WhatsApp is faster.
          </p>
        </div>
        <Button href={links.whatsapp} variant="ink" size="sm">
          Message us on WhatsApp
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate={false}>
      {/* Honeypot — hidden from humans, invisible to screen readers, tempting to bots. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-display text-fluid-xs uppercase tracking-[0.14em] text-ink/55">
            Name <span className="text-forest-600">*</span>
          </label>
          <input id="name" name="name" type="text" required autoComplete="name" className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="phone" className="mb-2 block font-display text-fluid-xs uppercase tracking-[0.14em] text-ink/55">
            Phone <span className="text-forest-600">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            pattern="^\+?[0-9\s\-()]{10,17}$"
            aria-invalid={errors.phone ? 'true' : 'false'}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            className={cn(fieldClass, errors.phone && 'border-red-400 focus:border-red-500')}
            placeholder="+91 97021 31149"
          />
          {errors.phone && (
            <p id="phone-error" role="alert" className="mt-1.5 text-fluid-xs text-red-700">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-display text-fluid-xs uppercase tracking-[0.14em] text-ink/55">
          Email <span className="text-forest-600">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'email-error' : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          className={cn(fieldClass, errors.email && 'border-red-400 focus:border-red-500')}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p id="email-error" role="alert" className="mt-1.5 text-fluid-xs text-red-700">
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="interest" className="mb-2 block font-display text-fluid-xs uppercase tracking-[0.14em] text-ink/55">
          I’m interested in
        </label>
        <select id="interest" name="interest" className={cn(fieldClass, 'appearance-none')} defaultValue="">
          <option value="" disabled>Choose one</option>
          <option>Personal Training</option>
          <option>Buddy Training</option>
          <option>Focused Group Training</option>
          <option>Nutrition Support</option>
          <option>Counselling &amp; Mental Well-being</option>
          <option>Not sure yet</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-display text-fluid-xs uppercase tracking-[0.14em] text-ink/55">
          Message
        </label>
        <textarea id="message" name="message" rows={4} className={cn(fieldClass, 'resize-y')} placeholder="Anything we should know before we reply?" />
      </div>

      {status === 'error' && (
        <p role="alert" className="flex items-start gap-2 text-fluid-sm text-red-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Something went wrong sending that. Please try WhatsApp instead, or email us directly.
        </p>
      )}

      <Button type="submit" variant="lime" size="lg" disabled={status === 'sending'} className="w-full sm:w-auto">
        {status === 'sending' ? 'Sending…' : 'Send enquiry'}
      </Button>

      <p className="text-fluid-xs leading-relaxed text-ink/45">
        We use your details only to reply to this enquiry.
        {/* TODO(180 team): audit item — publish a Privacy Policy and link it here
            once a form is collecting personal data. */}
      </p>
    </form>
  )
}

function DetailRow({ icon: Icon, label, children, href }) {
  const content = (
    <div className="flex gap-4">
      <span className="mt-0.5 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper-200 transition-colors duration-500 group-hover:bg-lime">
        <Icon className="h-4 w-4 text-ink" aria-hidden="true" />
      </span>
      <div>
        <p className="font-display text-fluid-xs uppercase tracking-[0.16em] text-ink/45">{label}</p>
        <div className="mt-1 leading-relaxed text-ink/80">{children}</div>
      </div>
    </div>
  )

  if (!href) return <div className="group">{content}</div>

  const external = href.startsWith('http')
  return (
    <a
      href={href}
      className="group block"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {content}
    </a>
  )
}

export default function Contact() {
  return (
    <>
      <Seo
        title="Best Gym in Mumbai | Contact 180 Method"
        description="Reach out to 180 Method, the best gym in Mumbai, and discover personalized fitness programs with integrated wellness support."
        path="/contactus/"
      />

      <PageHero
        eyebrow="Contact us"
        title="Ready when you are"
        lede="Questions, curiosity, or ready to begin? Reach out and we’ll guide you every step of the way."
      >
        <Button href={links.whatsapp} variant="lime" size="lg" icon={ArrowUpRight}>
          Send us a message on WhatsApp
        </Button>
      </PageHero>

      <Section tone="paperAlt">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Details */}
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Or get in touch" title="Come and find us" />

              <RevealGroup className="mt-10 space-y-7" gap={0.07}>
                <RevealItem>
                  <DetailRow icon={Phone} label="Call us" href={links.tel}>
                    {site.phoneDisplay}
                  </DetailRow>
                </RevealItem>

                <RevealItem>
                  <DetailRow icon={Mail} label="Email us" href={links.mailto}>
                    <span className="break-all">{site.email}</span>
                  </DetailRow>
                </RevealItem>

                <RevealItem>
                  <DetailRow icon={Clock} label="Opening hours">
                    {site.hours.map((h) => (
                      <span key={h.days} className="block">
                        <span className="text-ink/50">{h.days}</span> · {h.time}
                      </span>
                    ))}
                  </DetailRow>
                </RevealItem>

                <RevealItem>
                  <DetailRow icon={MapPin} label="Visit us" href={site.address.mapDirectionsUrl}>
                    {site.address.line2}, {site.address.city}
                    <br />
                    {site.address.state}, {site.address.country}
                  </DetailRow>
                </RevealItem>

                <RevealItem>
                  <DetailRow icon={Instagram} label="Instagram" href={links.instagram}>
                    {site.instagramHandle}
                  </DetailRow>
                </RevealItem>

                <RevealItem>
                  <DetailRow icon={Linkedin} label="LinkedIn" href={links.linkedin}>
                    180 Method
                  </DetailRow>
                </RevealItem>
              </RevealGroup>
            </div>

            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal className="rounded-5xl border border-ink/10 bg-paper p-7 sm:p-10">
                <h2 className="text-fluid-xl leading-none">Send an enquiry</h2>
                <p className="mt-3 max-w-prose leading-relaxed text-ink/60">
                  Prefer not to use WhatsApp? Fill this in and we’ll reply by email.
                </p>

                <div className="mt-8">
                  {WEB3FORMS_KEY ? (
                    <EnquiryForm />
                  ) : (
                    /* No key configured yet — say so plainly rather than
                       shipping a form that silently swallows enquiries. */
                    <div className="rounded-3xl border border-dashed border-ink/25 p-7">
                      <p className="font-display text-fluid-sm uppercase tracking-[0.12em] text-ink/70">
                        Form not connected yet
                      </p>
                      <p className="mt-3 leading-relaxed text-ink/55">
                        Add <code className="rounded bg-paper-200 px-1.5 py-0.5 text-fluid-xs">VITE_WEB3FORMS_KEY</code>{' '}
                        to <code className="rounded bg-paper-200 px-1.5 py-0.5 text-fluid-xs">.env</code> to switch this on.
                        See <code className="rounded bg-paper-200 px-1.5 py-0.5 text-fluid-xs">.env.example</code>.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button href={links.whatsapp} variant="ink">WhatsApp us</Button>
                        <Button href={links.mailto} variant="outline">Email us</Button>
                      </div>
                    </div>
                  )}
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </Section>

      {/* Map — renders only once a real embed URL exists (audit Ct4). */}
      {site.address.mapEmbedUrl && (
        <section aria-label="Studio location map" className="h-[420px] w-full bg-paper-200">
          <iframe
            src={site.address.mapEmbedUrl}
            title="180 Method studio location"
            className="h-full w-full border-0 grayscale-[0.35]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </section>
      )}
    </>
  )
}
