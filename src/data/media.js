/* ============================================================================
   MEDIA FEATURES
   Built from Media_features_180.csv.

   IMPORTANT — the sheet has 15 rows but only THREE unique articles. The rest
   are syndicated reprints of the same three pieces across different outlets
   (this is the same duplication problem as the ALC media sheet).

   So each feature below lists its primary outlet, and the reprints are kept in
   `syndicated` so nothing is lost — but the page shows 3 real stories rather
   than 15 rows of the same headline, which is what a reader actually wants.

   The `logo` paths are placeholders. Audit M1: the 180 team still owes an
   outlet logo (transparent PNG, ~400x200) for each of these.
   ========================================================================== */

export const mediaFeatures = [
  {
    id: 'mf1',
    outlet: 'LiveMint 24',
    title:
      'Aanchal Narang and Arya Talwalkar on the Mind–Body Collaboration at 180 Method Studio',
    excerpt:
      'The founders discuss why training the body without addressing the mind leaves most people stuck — and how the studio was built around that gap.',
    url: 'https://livemint24.com/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/',
    date: '', // TODO(180 team): publish date — the sheet's date column is empty
    logo: '/images/press/livemint24.png',
    featured: true,
    syndicated: [
      { outlet: 'Khabar On Demand', url: 'https://khabarondemand.com/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
      { outlet: 'Today Now', url: 'https://todaynow.in/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
      { outlet: 'Tycoon World', url: 'https://tycoonworld.in/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
      { outlet: 'Daily Tribune', url: 'https://dailytribune.in/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
    ],
  },
  {
    id: 'mf2',
    outlet: 'The Asian Talks',
    title:
      'Breaking the Shame Cycle: How Aanchal Narang and Arya Talwalkar Are Redefining Fitness and Therapy Spaces in India',
    excerpt:
      'On building a gym floor where nobody is performing for anybody — and why shame is the thing that most often ends a fitness journey before it starts.',
    url: 'https://theasiantalks.com/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/',
    date: '',
    logo: '/images/press/the-asian-talks.png',
    featured: true,
    syndicated: [
      { outlet: 'Daily Pioneer', url: 'https://dailypioneer.in/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
      { outlet: 'The Asian Age', url: 'https://theasianage.com/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
      { outlet: 'Mumbai Times', url: 'https://mumbaitimes.org/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
      { outlet: 'The Cover Magazine', url: 'https://thecovermagazine.com/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
    ],
  },
  {
    id: 'mf3',
    outlet: 'Forbes Story',
    title:
      'Aanchal Narang and Arya Talwalkar on Why Mental Health and Physical Health Are Equally Important for Senior Citizens',
    excerpt:
      'Why the 180 Method floor is built for every age — and what changes when older clients are trained for capability rather than aesthetics.',
    url: 'https://forbesstory.com/aanchal-narang-and-arya-talwalkar-on-why-mental-health-and-physical-health-are-equally-important-for-senior-citizens/',
    date: '',
    logo: '/images/press/forbes-story.png',
    featured: true,
    syndicated: [
      { outlet: 'Entrepreneur View', url: 'https://entrepreneurview.in/aanchal-narang-and-arya-talwalkar-on-why-mental-health-and-physical-health-are-equally-important-for-senior-citizens/' },
      { outlet: 'Herald Post', url: 'https://heraldpost.in/aanchal-narang-and-arya-talwalkar-on-why-mental-health-and-physical-health-are-equally-important-for-senior-citizens/' },
      { outlet: 'The Bharat Now', url: 'https://thebharatnow.com/aanchal-narang-and-arya-talwalkar-on-why-mental-health-and-physical-health-are-equally-important-for-senior-citizens/' },
      { outlet: 'Dainik Hunt', url: 'http://dhunt.in/14Uf3F' },
    ],
  },
]

/* The "As seen in" logo strip.
   TODO(180 team): audit M1 — supply transparent PNGs (~400x200, uniform
   height) and, where a logo maps to an actual article, add its `url` so the
   logo links out (per the final draft: "every publication logo should
   redirect to the respective article"). Logos without a url render as
   non-clickable, which is honest — better than a dead link. */
// export const pressLogos = [
//   { name: 'Hindustan Times', logo: '/images/press/hindustan-times.png', url: '' },
//   { name: 'LiveMint 24', logo: '/images/press/livemint24.png', url: mediaFeatures[0].url },
//   { name: 'The Asian Talks', logo: '/images/press/the-asian-talks.png', url: mediaFeatures[1].url },
//   { name: 'Forbes Story', logo: '/images/press/forbes-story.png', url: mediaFeatures[2].url },
//   { name: 'The Asian Age', logo: '/images/press/the-asian-age.png', url: '' },
//   { name: 'Mumbai Times', logo: '/images/press/mumbai-times.png', url: '' },
//   { name: 'Daily Pioneer', logo: '/images/press/daily-pioneer.png', url: '' },
//   { name: 'Tycoon World', logo: '/images/press/tycoon-world.png', url: '' },
// ]

// src/data/media.js — each pressLogos entry gets a swappable url.
// Placeholder now (publication homepage or '#'-free stand-in); replace with the real article URL when Naveen sends them.
export const pressLogos = [
  { name: 'Asian Talks',          logo: '/images/press/asiantalks.png',          url: 'https://theasiantalks.com/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
  { name: 'Bharat Now',          logo: '/images/press/bharatnow.png',          url: 'https://thebharatnow.com/aanchal-narang-and-arya-talwalkar-on-why-mental-health-and-physical-health-are-equally-important-for-senior-citizens/' },
  { name: 'Cover Magazine',          logo: '/images/press/covermagazine.png',          url: 'https://thecovermagazine.com/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
  { name: 'Daily Hunt',          logo: '/images/press/dailyhunt.png',          url: 'https://m.dailyhunt.in/news/india/english/tycoon+world-epaper-dh4c6a646b987d48f5b87f17d40865f089/aanchal+narang+and+arya+talwalkar+on+why+mental+health+and+physical+health+are+equally+important+for+senior+citizens-newsid-dh4c6a646b987d48f5b87f17d40865f089_aeefe4a07ae611f1babf263d06c5615b?sm=Y' },
  { name: 'Daily Pioneer',          logo: '/images/press/dailypioneer.png',          url: 'https://dailypioneer.in/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
  { name: 'Daily Tribune',          logo: '/images/press/dailytribune.png',          url: 'https://dailytribune.in/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
  { name: 'ET View',          logo: '/images/press/etview.png',          url: 'https://entrepreneurview.in/aanchal-narang-and-arya-talwalkar-on-why-mental-health-and-physical-health-are-equally-important-for-senior-citizens/' },
  { name: 'Forbes Story',          logo: '/images/press/forbesstory.png',          url: 'https://forbesstory.com/aanchal-narang-and-arya-talwalkar-on-why-mental-health-and-physical-health-are-equally-important-for-senior-citizens/' },
  { name: 'Herald Post',          logo: '/images/press/heraldpost.png',          url: 'https://heraldpost.in/aanchal-narang-and-arya-talwalkar-on-why-mental-health-and-physical-health-are-equally-important-for-senior-citizens/' },
  { name: 'Livemint',          logo: '/images/press/livemint.png',          url: 'https://livemint24.com/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
  { name: 'Mumbai Times',          logo: '/images/press/mumbaitimes.png',          url: 'https://mumbaitimes.org/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
  { name: 'Khabar On Demand',          logo: '/images/press/ondemand.png',          url: 'https://khabarondemand.com/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
  { name: 'The Asian Age',          logo: '/images/press/theasianage.png',          url: 'https://theasianage.com/breaking-the-shame-cycle-how-aanchal-narang-and-arya-talwalkar-are-redefining-fitness-and-therapy-spaces-in-india/' },
  { name: 'Today Now',          logo: '/images/press/todaynow.png',          url: 'https://todaynow.in/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
  { name: 'Tycoon World',          logo: '/images/press/tyoonworld.png',          url: 'https://tycoonworld.in/aanchal-narang-and-arya-talwalkar-on-the-mind-body-collaboration-at-180-method-studio/' },
  // …keep the rest, add a url to each
]