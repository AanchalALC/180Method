/* ============================================================================
   FAQs
   SOURCE: Naveen's review round, Aug 2026 — all 15 questions AND answers were
   supplied by the client, verbatim. These are not our words and must not be
   paraphrased without going back to him.

   `draft: false` is what lets an answer into the FAQPage JSON-LD (Google rich
   results). Every answer below is client-approved copy, so all 15 are live.

   ⚠️ TWO ANSWERS MAKE FACTUAL CLAIMS the 180 team owns:
     • "Can I book a free trial before enrolling?" — Naveen's wording is hedged
       ("selected programs, subject to availability"), but Arya should confirm.
     • "What are your studio timings…?" — the hours are NOT hardcoded here. They
       are built from `site.hours` so the FAQ, the Contact page and the
       LocalBusiness schema in index.html can never drift apart. Naveen's draft
       said only "6:00 AM to 09:00 PM"; his own hours line elsewhere in the same
       document closes at 3:00 PM on Sundays, so the sentence is assembled from
       the real data rather than reproducing the contradiction.
   If either turns out to be wrong, flip that one item to `draft: true` — it
   keeps rendering on the page but drops out of the schema. A wrong trial term
   in a Google rich result is very hard to retract.

   `links` is optional: renders as inline links under the answer. Used on the
   booking question, where Naveen asked for each platform linked.
   ========================================================================== */

import { links as siteLinks, site } from '@/data/site'

const hoursSentence = site.hours.map((h) => `${h.days}, ${h.time}`).join(' and ')

export const faqGroups = [
  {
    category: 'Training & Programs',
    items: [
      {
        q: 'What makes The 180 Method different from a regular gym?',
        a: 'We combine fitness, nutrition, and mental well-being to help you build sustainable habits—not just achieve short-term results.',
        draft: false,
      },
      {
        q: 'Do I need prior fitness experience to join?',
        a: 'No. Our programs are designed for beginners, experienced individuals, and everyone in between.',
        draft: false,
      },
      {
        q: 'What training programs do you offer?',
        a: 'We offer Personal Training (PT), Buddy Training (BT), Group Training (GT), Nutrition Support, Counselling & Mental Well-being, and community workshops.',
        draft: false,
      },
      {
        q: 'What is the trainer-to-member ratio in Group Training?',
        a: 'Our Group Training follows a 1:5 trainer-to-member ratio for personalised coaching and closer supervision.',
        draft: false,
      },
      {
        q: 'Can beginners or people recovering from injuries join?',
        a: 'Absolutely. Every program is adapted to your fitness level, goals, and physical needs.',
        draft: false,
      },
      {
        q: 'How do I choose between PT, BT, and GT?',
        a: 'Our team will recommend the most suitable program based on your goals, experience, and preferences.',
        draft: false,
      },
      {
        q: 'Do you offer customised fitness plans?',
        a: 'Yes. Every member receives a personalised plan tailored to their goals, lifestyle, and progress.',
        draft: false,
      },
      {
        q: 'Do you offer online training?',
        a: 'Yes. Selected fitness, nutrition, and counselling services are available online.',
        draft: false,
      },
    ],
  },
  {
    category: 'Nutrition & Counselling',
    items: [
      {
        q: 'Is nutrition support included?',
        a: 'Yes. We offer personalised nutrition guidance designed to complement your fitness goals and lifestyle.',
        draft: false,
      },
      {
        q: 'How does counselling integrate with fitness?',
        a: 'Through our partnership with Another Light Counselling (ALC), we integrate mental well-being with physical health through counselling, workshops, and wellness initiatives.',
        draft: false,
      },
      {
        q: 'Can I combine fitness, nutrition, and counselling?',
        a: 'Yes. You can combine any of our services to create a holistic wellness journey tailored to your needs.',
        draft: false,
      },
    ],
  },
  {
    category: 'Booking, Timings & Membership',
    items: [
      {
        q: 'Can I book a free trial before enrolling?',
        a: 'Yes. Complimentary trial sessions are available for selected programs, subject to availability.',
        draft: false,
      },
      {
        q: 'How can I book a consultation or visit the studio?',
        a: 'Simply reach out via WhatsApp, Instagram, or our website to schedule your visit or consultation.',
        // Naveen: "(can link each platform)".
        links: [
          { label: 'WhatsApp', href: siteLinks.whatsapp },
          { label: 'Instagram', href: siteLinks.instagram },
          { label: 'Contact us', href: '/contact' },
        ],
        draft: false,
      },
      {
        q: 'What are your studio timings and membership options?',
        a: `We are open ${hoursSentence}. We offer flexible training slots and a range of membership options. Contact us to find the best fit for your schedule.`,
        draft: false,
      },
      {
        q: 'Is there a minimum commitment period?',
        a: 'No. We offer flexible packages to suit different goals and schedules.',
        draft: false,
      },
    ],
  },
]

/* Flattened, for the FAQPage JSON-LD schema. Answers still marked as drafts are
   excluded — we do not want Google surfacing an unapproved answer as a rich
   result. Set draft:false and the question joins the schema automatically. */
export const faqSchemaItems = faqGroups
  .flatMap((g) => g.items)
  .filter((item) => !item.draft && !item.a.startsWith('TODO'))
