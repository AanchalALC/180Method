/* ============================================================================
   REVIEWS
   The nine real testimonials from /reviews/, cleaned up per audit R1 + R2:
   - names separated from dates (live site renders "Rituja Ghai2/14/2026")
   - Title Case names
   - one consistent date format (ISO in, "DD Mon YYYY" out — see formatDate)
   - quote marks stripped from the text and applied by the component instead
   ========================================================================== */

export const reviews = [
  {
    id: 'r1',
    name: 'Aara Kapadia',
    date: '2026-01-28',
    rating: 5,
    text: 'Attended class today, was super intense and a full body burn. Looking forward to next class already!',
    featured: true,
  },
  {
    id: 'r2',
    name: 'Rituja Ghai',
    date: '2026-02-14',
    rating: 5,
    text: 'I loved how I was pushed to do better and most importantly the music 🤌🏻🤌🏻, if I lived nearby I would definitely go every day…',
  },
  {
    id: 'r3',
    name: 'Noorain',
    date: '2026-02-14',
    rating: 5,
    text: 'The session was incredibly good, it didn’t feel like it was a group session. The coaches were dope and extremely kind, helpful yet funny. Would highly recommend to anyone and everyone to join in!! 🫶🏻🎀',
    featured: true,
  },
  {
    id: 'r4',
    name: 'Pooja Chandan',
    date: '2026-02-20',
    rating: 5,
    text: 'Amazing best class ever, best place ever.',
  },
  {
    id: 'r5',
    name: 'Venkataraghavan Rajagopalan',
    date: '2026-02-20',
    rating: 5,
    text: 'This place has become a second home for me. I love the vibe, energy, people, the setup — and feel so motivated to come to my sessions. I’ve made sure I bring in more people here as well! 🙃 Lotssss of loveeee! ❤️',
    featured: true,
  },
  {
    id: 'r6',
    name: 'Tanvi Mapno',
    date: '2026-02-12',
    rating: 5,
    text: 'It was a great session. Amazing gym, crazy energy, love it ❤️',
  },
  {
    id: 'r7',
    name: 'Tishika',
    date: '2026-02-15',
    rating: 5,
    text: 'Thank you so much for this amazing session, really enjoyed it. Loved the vibe and energy!! Just a lil too far from where I stay :((',
  },
  {
    id: 'r8',
    name: 'Smilee Suri',
    date: '2026-01-28',
    rating: 5,
    text: 'Love working out at 180 Method.',
  },
  {
    id: 'r9',
    name: 'Tanvi Desai',
    date: '2026-02-20',
    rating: 5,
    text: 'Best coaches, best studio. Every workout is super guided and precise, and is made super fun by all the boys!!! Arya, Kartik and Vishal — you’ll are killing it!!',
  },
]

// TODO(180 team): audit R3 — paste the Google review URL to switch the
// "Leave a review" button on. Until then the button is hidden, not broken.
export const googleReviewUrl = ''

export function formatDate(iso) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
