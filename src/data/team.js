/* ============================================================================
   TEAM DATA
   One object per member drives BOTH the /team grid card and the individual
   /team/:slug profile page. Add fields here, never in the component.

   ORDER: Arya → Aanchal → Kartik → Moyna → Vishal.

   ---------------------------------------------------------------------------
   POINT OF VIEW — the rule, applied across all five profiles
   ---------------------------------------------------------------------------
   On /team/:slug the MEMBER speaks: first person, always. `philosophy`,
   `keyLearning`, `funFact` and `whisper` are their own words, in their own
   voice. The SITE speaks only in the hero meta line and the closing CTA, and
   never refers to the member in the third person on their own page.

   `blurb` is the exception and is deliberately third person — it renders on
   the /team GRID card, which is site voice, not the member's.

   Two fields exist purely to keep that rule true without hardcoding names in
   the component:
     approachTitle  first-person heading for the approach section. Trainers get
                    "How we'll train together"; Aanchal and Moyna don't train
                    anyone, so they get "work together".
     ctaVerb        'Train' | 'Work' | 'Talk' — drives "Train with Arya" /
                    "Talk to Aanchal". Keeps the CTA an instruction to the
                    visitor rather than narration about the member.

   ---------------------------------------------------------------------------
   CREDENTIALS are objects, not strings: { title, issuer }.
   `issuer` renders as a small badge above the credential — the authenticity
   signal Naveen asked for, WITHOUT scraping trademarked logos off the web.
   Leave `issuer: null` where the awarding body isn't stated. Never guess one.
   ---------------------------------------------------------------------------

   published:false  → card is NOT linked and the member is kept OUT of the
                      sitemap.

   PHOTOS: raw headshots, no Canva template ring. Square, ≥800×800, exported to
   /public/images/team/<slug>.jpeg (WebP later). A member with no `image`
   renders a lime monogram instead of a broken frame.
   ========================================================================== */

export const team = [
  {
    slug: 'arya',
    name: 'Arya Talwalkar',
    role: 'Co-founder & Head Trainer',
    pronouns: 'he/him',
    image: '/images/team/arya-talwalkar.jfif',
    published: true,
    experience: '7 years',
    mode: 'In-person (Bandra) & online',
    sessionLength: '60 min',
    languages: ['English', 'Hindi', 'Marathi'],
    blurb: 'Seven years turning training into a healthier, happier way to live — body and mind.',
    approachTitle: 'How we’ll train together',
    ctaVerb: 'Train',
    specialisations: [
      'Personal Training', 'Group Training', 'Rehab', 'Prehab', 'HIIT',
      'Pilates', 'Nutrition foundation', 'Mobility', 'Flexibility',
      'Fat loss', 'Strength building', 'Muscle building', 'Body re-composition',
    ],
    clientGroups: [
      'Beginners', 'Athletes', 'Senior citizens', 'Children',
      'Injury recovery', 'Anyone looking to uplift their lifestyle',
    ],
    credentials: [
      { title: 'Certified Personal Trainer', issuer: 'ACSM' },
      { title: 'Certified Nutritionist', issuer: 'ACSM' },
      { title: 'Certified Rehab Specialist', issuer: 'REHAB+' },
      { title: 'Core Certified Pilates Instructor', issuer: 'Reebok' },
    ],
    philosophy: 'I train people to live a healthier, happier life — physically, mentally, and in every single way possible.',
    keyLearning: 'You don’t always need to “go hard or go home.” As long as you know when to do either, you’re good.',
    funFact: 'If I wasn’t a personal trainer, I’d have been an actor or a film director.',
    hobbies: ['Dancing', 'Music', 'Cinema', 'Sports', 'Food'],
    whisper: 'The whole reason I started training was to help people get healthier, happier and reach their full potential — which is exactly what 180 Method stands for.',
    seoTitle: 'Arya Talwalkar — Head Trainer | 180 Method',
    seoDescription: 'Meet Arya Talwalkar, co-founder and head trainer at 180 Method, Bandra. Seven years coaching personal training, rehab, Pilates, mobility and strength.',
  },

  {
    /* ------------------------------------------------------------------------
       AANCHAL — HELD FOR WRITTEN SIGN-OFF (§9, highest-risk item).

       ⚠️ THIS IS CURRENTLY published:true AND THE STANDING RULE SAYS IT SHOULD
       NOT BE. Either attach her written approval to the ticket, or set this
       back to false before deploy. I have NOT changed the value — flipping it
       silently either way is the wrong call. Decide, then edit this one line.

       The clinical "concerns" list from her PDF (CSA, self-harm, eating
       disorder, psychosis, perpetrators, etc.) is DELIBERATELY NOT reproduced
       here — it belongs on Another Light Counselling, not a fitness site, and
       needs Aanchal's written approval. This page shows only her qualifications
       and voice, and routes people to ALC for support areas.
       Do NOT add support-area copy without Aanchal's written sign-off.
    ------------------------------------------------------------------------ */
    slug: 'aanchal',
    name: 'Aanchal',
    role: 'Co-founder & Head Therapist',
    pronouns: 'she/they',
    image: '/images/team/aanchal-narang.jpeg',
    published: true,
    experience: null,
    mode: 'Counselling delivered via Another Light Counselling',
    languages: ['English', 'Hindi', 'Urdu'],
    blurb: 'Head Therapist and founder of Another Light Counselling — the mental-health backbone of the 180 Method.',
    approachTitle: 'How we’ll work together',
    ctaVerb: 'Talk',
    specialisations: [],          // intentionally empty — see note above
    clientGroups: [],
    credentials: [
      { title: 'Master’s in Applied (Clinical) Psychology', issuer: 'TISS' },
      { title: 'EMDR Therapy, Levels 1 & 2', issuer: 'EMDR Association India' },
      { title: 'Advanced Trauma Therapy', issuer: 'Janina Fisher · NICABM' },
      { title: 'Complex Trauma, Level 1', issuer: 'ISSTD' },
      { title: 'Trauma-Informed Psychotherapy, REBT & CBT', issuer: null },
    ],
    philosophy: 'Therapy is like a tattoo, or exercise — it can hurt while you’re going through it, and then it’s beautiful.',
    keyLearning: 'It’s not about the symptom; there’s always a cause.',
    funFact: 'I can bark like both a dog and a puppy.',
    hobbies: ['Scuba diving', 'MMA & martial arts', 'Debates', 'Singing', 'Salsa', 'Gaming'],
    whisper: 'Hey there — I know therapy can feel overwhelming. But it’ll be fun, not boring at all.',
    externalProfile: {
      label: 'See how Aanchal can help at Another Light Counselling',
      href: 'https://www.another-light.com',
    },
    seoTitle: 'Aanchal — Head Therapist | 180 Method',
    seoDescription: 'Meet Aanchal, co-founder and head therapist at 180 Method and founder of Another Light Counselling. Trauma-informed, queer-affirming mental-health care.',
  },

  {
    slug: 'kartik',
    name: 'Kartik',
    role: 'Fitness Coach',
    pronouns: 'he/him',
    image: '/images/team/karthik.png',
    published: true,
    experience: '1 year',
    mode: 'In-person (Bandra) & online',
    sessionLength: '60 min',
    languages: ['English', 'Hindi', 'Marathi'],
    blurb: 'Technique first, progress steady — safe, consistent training that lasts.',
    approachTitle: 'How we’ll train together',
    ctaVerb: 'Train',
    specialisations: [
      'Personal Training', 'Group Training', 'Fat loss',
      'Strength building', 'Muscle building', 'Recovery & massage',
    ],
    clientGroups: [
      'Beginners', 'Senior citizens', 'Children',
      'Anyone looking to uplift their lifestyle',
    ],
    // TODO(180 team): Kartik's source line was just "IFSA Certified" — ask him
    // for the full certification name so this reads like the others.
    credentials: [
      { title: 'Certified', issuer: 'IFSA' },
    ],
    philosophy: 'I emphasise correct technique and gradual progression, so you train safely, improve consistently, and build a lifestyle that lasts.',
    keyLearning: 'Watching a client’s confidence grow keeps me learning — and keeps me helping more people improve their health.',
    funFact: 'I was the friend who brought salad in his lunchbox so everyone got enough fibre.',
    hobbies: ['Learning', 'Travelling', 'Music', 'Sports', 'Video games'],
    whisper: 'Together we’ll make training enjoyable, effective and focused on you getting stronger and healthier every day. See you in our sessions.',
    seoTitle: 'Kartik — Fitness Coach | 180 Method',
    seoDescription: 'Meet Kartik, fitness coach at 180 Method in Bandra, Mumbai. Personal and group training focused on technique, strength, fat loss and recovery.',
  },

  {
    slug: 'moyna',
    name: 'Dr. Moyna Vakil',
    role: 'Nutritionist, Dietician & Lifestyle Coach',
    pronouns: 'she/her',
    image: '/images/team/moyna-vakil.jpeg',
    published: true,
    experience: '13 years',
    mode: 'In-person (Bandra) & online',
    languages: ['English', 'Hindi', 'Gujarati', 'Marathi'],
    blurb: 'Thirteen years of nutrition rooted in science, compassion and sustainability.',
    approachTitle: 'How we’ll work together',
    ctaVerb: 'Work',
    specialisations: [
      'Nutrition Coaching', 'Lifestyle Coaching', 'Sustainable Weight Management',
      'Diet Planning', 'Fat Loss Support', 'Muscle Gain Nutrition',
      'Gut Health', 'Digestive Wellness', 'Energy Optimization', 'Meal Structuring',
    ],
    clientGroups: ['Beginners', 'Athletes', 'Women', 'Senior citizens'],
    credentials: [
      { title: 'Diploma in Nutrition & Dietetics — Rank 1', issuer: 'Tulip International' },
      { title: 'B.H.M.S', issuer: 'CMP Medical' },
      { title: 'Associated practitioner, Vile Parle', issuer: 'Advanced Multispecialty Hospital' },
      { title: 'Associated practitioner, Andheri West', issuer: 'Nakshatra Hospital' },
    ],
    // NOTE: the PDF's "philosophy" field was a copy of Arya's template line.
    // Replaced with Dr. Vakil's OWN words (from her whisper) — not invented.
    philosophy: 'My approach is rooted in science, compassion and sustainability — building strength, confidence and long-term wellbeing, not quick fixes.',
    keyLearning: 'Healthier meals make a happier you.',
    funFact: 'I don’t take life too seriously :P',
    hobbies: ['Food', 'Health', 'Fitness', 'Books', 'Travel'],
    whisper: 'If you’re starting your journey, you don’t have to do it alone. Wherever you’re starting from, I’m here to guide you every step of the way.',
    seoTitle: 'Dr. Moyna Vakil — Nutritionist | 180 Method',
    seoDescription: 'Meet Dr. Moyna Vakil, nutritionist and dietician at 180 Method. Thirteen years in nutrition coaching, sustainable weight management and gut health.',
  },

  {
    slug: 'vishal',
    name: 'Vishal Hunari',
    preferred: 'Vee',
    role: 'Fitness Coach',
    pronouns: 'he/him',
    image: '/images/team/vishal-hunari.png',
    published: true,
    experience: '3.5 years',
    mode: 'In-person & online',
    languages: ['English', 'Hindi', 'Marathi'],
    blurb: 'Calm coaching, clear guidance, real results that last — not short fixes.',
    approachTitle: 'How we’ll train together',
    ctaVerb: 'Train',
    specialisations: [
      'Personal Training', 'Functional Strength', 'Mobility', 'Rehab Support',
      'Fat loss', 'Flexibility', 'Endurance', 'Injury prevention', 'Performance',
    ],
    clientGroups: [
      'Beginners', 'Athletes', 'Women', 'Seniors',
      'Injury recovery', 'Lifestyle clients',
    ],
    credentials: [
      { title: 'Advanced Personal Training', issuer: 'GGFI' },
      { title: 'B.Com', issuer: 'Mumbai University' },
      { title: 'Female Fitness Training', issuer: null },
      { title: 'First-aid & CPR', issuer: null },
    ],
    philosophy: 'Fitness isn’t just fat loss or bigger muscles — it’s living your day-to-day pain-free and moving through life with ease.',
    keyLearning: 'Put yourself in the client’s shoes and plan around their goals. Learning flows both ways on a training journey.',
    funFact: 'I train with calm energy, but my workouts still hit hard — I don’t shout reps, I guide them. (I also secretly judge everyone’s squat form.)',
    hobbies: ['Training', 'Music', 'Cooking', 'Reading'],
    whisper: 'I focus on calm coaching, clear guidance and results that last. If you’re ready to stay consistent and build strength the right way, I’m here to guide you.',
    seoTitle: 'Vishal Hunari — Fitness Coach | 180 Method',
    seoDescription: 'Meet Vishal “Vee” Hunari, fitness coach at 180 Method, Bandra. Calm, technique-first coaching for strength, mobility, fat loss and injury recovery.',
  },
]