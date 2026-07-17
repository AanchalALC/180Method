/* ============================================================================
   FAQs
   The 12 questions from the final draft of the outline, grouped into the
   categories the requirements doc asks for.

   Answers marked `draft: true` were written from the brand doc and the live
   site copy — they are plausible but NOT approved. The 180 team must review
   every one of them before launch. Anything factual (pricing, trials,
   timings) is deliberately left as a TODO rather than invented.
   ========================================================================== */

export const faqGroups = [
  {
    category: 'Training',
    items: [
      {
        q: 'What makes The 180 Method different from a regular gym?',
        a: 'Most gyms train the body and stop there. We work with the beliefs, habits and emotional patterns that get in the way of consistency — because that is usually what ends a fitness journey, not the training itself. Every package includes counselling, and every plan is built around your starting point rather than a template.',
        draft: true,
      },
      {
        q: 'Do I need prior fitness experience to join?',
        a: 'No. We work with complete beginners, people returning after a long break, and experienced athletes — often in the same week. Your first session is an assessment, not a test. Nothing about our floor requires you to already be fit before you arrive.',
        draft: true,
      },
      {
        q: 'What training programs do you offer?',
        a: 'Personal Training (one-to-one), Buddy Training (with a friend, partner or family member), and Focused Group Training with a 1:5 trainer-to-client ratio. Nutrition support and counselling run alongside all three.',
        draft: true,
      },
      {
        q: 'What is the trainer-to-member ratio in Group Training?',
        a: 'One trainer to a maximum of five clients. That is deliberately small — it keeps the energy of a group session while still letting a coach correct your form and adjust the work to you.',
        draft: true,
      },
      {
        q: 'Can beginners or people recovering from injuries join?',
        a: 'Yes. We routinely work with people reintroducing movement after injury, illness or a long gap. Tell us what is going on at the assessment and the plan is built around it. For anything under active medical care, we will ask you to clear training with your doctor or physiotherapist first.',
        draft: true,
      },
      {
        q: 'How do I choose between Personal, Buddy and Group Training?',
        a: 'Personal Training gives you the most tailored attention. Buddy Training keeps that guidance while sharing the cost and the motivation with someone you like. Group Training is the most affordable and has the best community energy. If you are unsure, message us — we will talk it through rather than sell you the biggest package.',
        draft: true,
      },
    ],
  },
  {
    category: 'Nutrition & Counselling',
    items: [
      {
        q: 'Is nutrition support included with the programs?',
        a: 'TODO(180 team): confirm exactly what is bundled vs. what costs extra. Do not launch this answer until it is accurate — a wrong answer here creates a billing dispute.',
        draft: true,
      },
      {
        q: 'How does counselling integrate with fitness at The 180 Method?',
        a: 'Through our partnership with Another Light Counselling, every 180 Method package includes at least one free session with a qualified professional. It is there to support consistency, stress, confidence and your relationship with food and your body — alongside your training, not instead of clinical care.',
        draft: true,
      },
      {
        q: 'Do you offer customised fitness plans?',
        a: 'Every plan is customised. We start by understanding your body, lifestyle, habits, stress levels, injuries and mindset, then build a blueprint with input from training, nutrition and mental well-being — aligned to your goals and your actual routine.',
        draft: true,
      },
    ],
  },
  {
    category: 'Booking, Pricing & Location',
    items: [
      {
        q: 'Can I book a free trial before enrolling?',
        a: 'TODO(180 team): confirm whether a free trial or paid taster session is offered, and how to book it.',
        draft: true,
      },
      {
        q: 'What are the studio timings and membership options?',
        a: 'TODO(180 team): confirm real opening hours (the old site said "8:00 AM – 17:00 PM") and what membership tiers exist.',
        draft: true,
      },
      {
        q: 'How can I book a consultation or visit the studio?',
        a: 'Message us on WhatsApp and we will find you a slot. You are welcome to come and see the space before committing to anything.',
        draft: true,
      },
    ],
  },
]

/* Flattened, for the FAQPage JSON-LD schema. Answers still marked as drafts
   are excluded from schema — we do not want Google surfacing an unapproved
   answer as a rich result. Once the team signs off, set draft:false and the
   question joins the schema automatically. */
export const faqSchemaItems = faqGroups
  .flatMap((g) => g.items)
  .filter((item) => !item.draft && !item.a.startsWith('TODO'))
