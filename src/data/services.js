import { whatsappLink } from './site'

/* ============================================================================
   SERVICES
   Copy lifted from the live site + Brand doc, with two fixes applied:
   1. The "End with this: (...)" editor instructions are stripped — they are
      currently visible on the LIVE page (audit S1). The intended line now
      renders as a styled `tagline`.
   2. "Therapy" renamed to "Counselling & Mental Well-being" per the final
      draft of the outline.
   Also per the final draft: section heading is "What We Offer", not
   "Our Programs".
   ========================================================================== */

export const services = [
  {
    slug: 'personal-training',
    title: 'Personal Training',
    intro: 'One-on-one coaching, completely personalised to your goals.',
    points: [
      'Strength & endurance training',
      'Functional & mobility work',
      'Cardio conditioning',
      'Agility',
      'Calisthenics',
      'Body toning',
    ],
    tagline: 'You don’t need to have an ideal body to start your journey. We help you build it.',
    image: '/images/services/personal-training.jpg',
    imageAlt: 'A 180 Method trainer coaching a client through a strength movement',
    cta: whatsappLink(
      'Hi, I want to book Personal Training with 180 Method. Please share the available slots and pricing.'
    ),
  },
  {
    slug: 'buddy-training',
    title: 'Buddy Training',
    intro: 'Train with a friend, partner, or family member.',
    pointsLabel: 'Benefits',
    points: ['More fun', 'Shared motivation', 'Cost-effective', 'Same expert guidance'],
    tagline: 'Cry, laugh and… work out with whoever you want.',
    image: '/images/services/buddy-training.jpg',
    imageAlt: 'Two people training together with a 180 Method coach',
    cta: whatsappLink(
      'Hi, I want to book Buddy Training with 180 Method for two people. Please share slots, pricing, and how to get started.'
    ),
  },
  {
    slug: 'focused-group-training',
    title: 'Focused Group Training',
    intro: 'Small, focused group sessions with a 1:5 trainer-to-client ratio.',
    pointsLabel: 'Perfect for',
    points: [
      'Community energy',
      'Structured full-body and targeted workouts',
      'Affordable expert training',
      'Fun, high-motivation environment',
    ],
    tagline: 'Doesn’t mean you need to fit in — you won’t be judged.',
    image: '/images/services/group-training.jpg',
    imageAlt: 'A full group training session in progress on the 180 Method floor',
    cta: whatsappLink(
      "Hi, I'm interested in Focused Group Training with 180 Method. Please share batch timings, fees, and next start date."
    ),
  },
  {
    slug: 'nutrition-support',
    title: 'Nutrition Support',
    intro: 'We believe nutrition should be simple, flexible, and enjoyable.',
    points: [
      'No extreme diets',
      'No food shaming',
      'Custom guidance based on your lifestyle',
      'Support through disordered eating patterns',
    ],
    note: 'Our nutrition plans focus on building habits you can actually sustain.',
    tagline: 'Cheat meals are not always bad.',
    image: '/images/services/nutrition.jpg',
    imageAlt: 'Dr. Moyna Vakil in a nutrition consultation with a client',
    // NOTE: the live site's version of this link is malformed ("&?type=").
    // whatsappLink() builds it with URLSearchParams so it is always valid.
    cta: whatsappLink(
      "Hi, I'd like Nutrition Support from 180 Method. Can you share the plans, process, and pricing?"
    ),
  },
  {
    slug: 'counselling-mental-wellbeing',
    title: 'Counselling & Mental Well-being',
    intro: 'Fitness doesn’t exist without mental health.',
    lead: 'Every 180 Method package includes at least one free counselling session with a qualified professional.',
    pointsLabel: 'This helps you',
    points: [
      'Build consistency',
      'Work with emotional eating',
      'Manage stress',
      'Improve self-confidence',
      'Address body-image concerns',
      'Find support for mental health concerns',
    ],
    tagline: 'Because a strong mind creates a strong body.',
    image: '/images/services/counselling.jpg',
    imageAlt: 'The counselling room at 180 Method',
    cta: whatsappLink(
      "Hi, I'm interested in Counselling and Mental Wellbeing support through 180 Method. Please share how sessions work, availability, and pricing."
    ),
    /* AUDIT S4 — HIGH RISK, ACTION REQUIRED.
       The live site currently reads "We support you through binging and
       anorexia" and "Address emotional eating". Those are clinical claims on a
       fitness business's website and carry real liability.
       The wording above has been softened, and this disclaimer renders under
       the card. Both still need written sign-off from Aanchal (ALC) before
       this page goes live. Do not remove the disclaimer without that sign-off. */
    disclaimer:
      'Counselling at 180 Method is delivered in partnership with qualified professionals at Another Light Counselling. It is supportive care alongside your training — it is not a substitute for clinical diagnosis or treatment. If you are experiencing an eating disorder or a mental health crisis, please speak to a qualified clinician.',
  },
]

/* Who We Serve — from the Brand doc. Rendered as a chip grid, not a bullet
   list, per the final draft ("needs complete redesign… cleaner layout"). */
export const whoWeServe = [
  { label: 'All ages', detail: 'Kids, adolescents, adults, senior citizens' },
  { label: 'Working professionals', detail: 'Seeking balance' },
  { label: 'Trauma survivors', detail: 'Reintroducing movement' },
  { label: 'Queer & neurodivergent people', detail: 'In a non-performative space' },
  { label: 'Students', detail: 'Building self-discipline' },
  { label: 'Corporates', detail: 'Aiming for holistic wellness' },
  { label: 'Differently abled', detail: 'Adapted, individualised programming' },
]
