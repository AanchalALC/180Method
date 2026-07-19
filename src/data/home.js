/* ============================================================================
   HOME + ABOUT content
   From the 2nd/final draft of the website outline and the Brand doc.
   ========================================================================== */

/* The three pillars. The outline says: remove the "+" between them, make it a
   Venn diagram, and give each an animated line of text on its theme.
   Physical → Mental → Nutrition (note: "Mental" not "Psychological"). */
export const pillars = [
  {
    key: 'physical',
    label: 'Physical',
    heading: 'Fitness',
    copy: 'Smart training tailored to your body and goals.',
    words: ['Regulated', 'Discipline', 'Consistent'],
    image: '/images/home/pillar-fitness.png',
    imageAlt: 'A personal training session on the 180 Method floor',
    href: '/services#personal-training',
  },
  {
    key: 'mental',
    label: 'Mental',
    heading: 'Psychology',
    copy: 'Mental and emotional support to help you stay consistent.',
    words: ['Aware', 'Resilient', 'Grounded'],
    image: '/images/home/pillar-psychology.png',
    imageAlt: 'A counsellor mid-session in the 180 Method counselling room',
    href: '/counselling',
  },
  {
    key: 'nutrition',
    label: 'Nutrition',
    heading: 'Nutrition',
    copy: 'Sustainable eating habits, not crash diets.',
    words: ['Flexible', 'Simple', 'Sustainable'],
    image: '/images/home/pillar-nutrition.png',
    imageAlt: 'Dr. Moyna Vakil in a nutrition consultation',
    href: '/services#nutrition-support',
  },
]

/* The 5-step journey. Copy is final (it exists on the live site and is
   unchanged in the outline). The live site links each card to "#" — a dead
   link (audit H6). Here each step either has a real href or none at all. */
export const journey = [
  {
    n: '01',
    title: 'Getting to Know You',
    copy: 'We begin with a deep understanding of your body, lifestyle, habits, stress levels, injuries, mindset and more.',
    image: '/images/home/step-assessment.png',
  },
  {
    n: '02',
    title: 'Your Personal Blueprint',
    copy: 'A personalised plan is built with experts across training, nutrition, and mental well-being — aligned to your goals and routine.',
    image: '/images/home/step-blueprint.png',
  },
  {
    n: '03',
    title: 'Get Started',
    copy: 'Train in a focused, supportive environment where technique, safety, and confidence come first.',
    image: '/images/home/step-training.png',
  },
  {
    n: '04',
    title: 'Track. Refine. Improve.',
    copy: 'Progress is measured, reviewed, and optimised regularly — ensuring consistent growth without plateaus.',
    image: '/images/home/step-tracking.png',
  },
  {
    n: '05',
    title: 'A Healthier Lifestyle',
    copy: 'Strength, energy, confidence, and will become your lifelong companions.',
    image: '/images/home/step-community.png',
  },
]

/* Sessions conducted.
   The live site shows 0 / 0 (audit H5). The outline supplies real numbers and
   asks for full forms rather than "PT" / "GT".
   TODO(180 team): the outline notes these are current only to Feb 2026 and
   should be updated from March 2026 onward. */
export const stats = [
  { value: 13200, label: 'Personal Training sessions', suffix: '+' },
  { value: 5000, label: 'Group Training sessions', suffix: '+' },
]

export const heroSlides = [
  { src: '/images/home/hero-1.jpeg' }, // wide-angle studio interior
  { src: '/images/home/hero-2.jpeg' }, // Arya coaching a client, mid-session
  { src: '/images/home/hero-3.jpeg' }, // full group-training session, wide
]

/* About → "How this shows up". Replaces "Values we live by" and "What makes us
   different", both of which the final draft asks to remove. */
export const howThisShowsUp = [
  { title: 'Personalised', copy: 'Programs designed for sustainability, not burnout.' },
  { title: 'Considered', copy: 'Training that respects your mental state, not just your physical capacity.' },
  { title: 'Welcoming', copy: 'A space that feels energising and human, with nothing to perform.' },
  { title: 'Measurable', copy: 'Progress you can feel, track, and trust.' },
  { title: 'Supportive', copy: 'Guidance that meets you exactly where you are.' },
]

/* Who We Are — from the Brand doc. */
export const brandValues = ['Fun', 'Inclusive', 'Empowering', 'Hope', 'Dependable', 'Empathetic']

export const vision =
  'We meet you where you are — and design for who you can be. At The 180 Method, we partner with you to achieve your physical, nutritional, and emotional goals through personalised plans. We help you rediscover and reconnect with yourself, guiding you with warmth and expertise toward lasting transformation. Our method equips you to sustain an optimal, balanced lifestyle — strong in body, nourished in mind, and grounded in well-being — for life.'

export const mission =
  'At The 180 Method, our mission is to unite psychology and fitness to transform the way people move, think, and feel. We create an uplifting, energetic space where personalised training meets evidence-based mindset coaching — helping you build strength, dissolve mental blocks, and enjoy the process. Through compassionate guidance, playful programming, and measurable progress, we empower you to sustain a vibrant, resilient lifestyle — strong in body, clear in mind, and confident in self.'

export const aboutIntro =
  'At 180 Method, we believe real change happens when fitness is fun, nutrition is practical, and mental health is supported. We are not about quick fixes or extreme routines. We focus on long-term lifestyle change, guided by experts, backed by science, and delivered in a warm, supportive environment. Whether your goal is fat loss, strength, recovery, confidence, or overall well-being — we meet you where you are and help you turn your life 180 degrees.'
