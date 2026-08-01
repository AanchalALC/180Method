/* ============================================================================
   SITE CONFIG — single source of truth
   Change a phone number / email / address HERE and it updates everywhere.
   Nothing in this file should ever be duplicated inside a component.
   ========================================================================== */

export const site = {
  name: '180 Method',
  legalName: 'The 180 Method',
  tagline: 'Mind and Body at Play',
  promise: 'Design who you can be.',
  strapline: 'Strong in body, nourished in mind and grounded in well-being.',
  url: 'https://180method.in',

  // --- Contact -------------------------------------------------------------
  phoneDisplay: '+91 97021 31149',
  phoneRaw: '919702131149', // no +, no spaces — used by wa.me and tel:

  // TODO(180 team): audit item G3 — move to a branded mailbox (team@180method.in)
  // and update this one line. A Gmail on a business site reads as unfinished.
  email: 'team.180method@gmail.com',

  instagram: 'https://www.instagram.com/180.method',
  instagramHandle: '@180.method',

  /* LinkedIn — supplied by Naveen, Aug 2026.
     `company` is the one that belongs in the footer / Contact / schema sameAs.
     `arya` is a PERSONAL profile: it belongs on his own /team/arya page if we
     ever surface it, not in the site-wide footer. Keeping them as separate
     keys so nobody wires the personal one into a global component by accident. */
  linkedin: {
    company: 'https://www.linkedin.com/company/180-method',
    arya: 'https://www.linkedin.com/in/arya-talwalkar-2ba1253b0',
  },

  /* Audit Ct1 — the live WordPress site showed "Street name, 22135
     Copenhagen, Denmark", which was worse than showing nothing. Per Swathi,
     Aug 2026: stop showing the literal word TODO to visitors — render only
     the area that's actually confirmed (Bandra West, Mumbai, Maharashtra)
     rather than inventing a street line or pincode. `line1` and `pincode`
     are deliberately absent, not empty strings, so Contact.jsx, Footer.jsx
     and the LocalBusiness schema in index.html can all just skip them. Add
     them back here the day a real street address is provided — nowhere
     else needs to change. */
  address: {
    line2: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    country: 'India',
    // Paste the Google Maps embed URL here to switch the map on (Contact page).
    mapEmbedUrl: '',
    mapDirectionsUrl: 'https://maps.google.com/?q=180+Method+Bandra+Mumbai',
  },

  /* CONFIRMED by Naveen, Aug 2026 — closes audit item Ct2. The live WordPress
     site's "8:00 AM – 17:00 PM" was wrong in both hours and format.
     ⚠️ index.html carries the same hours in the LocalBusiness JSON-LD. If you
     change them here, change them there too or the schema and the page
     disagree — and Google trusts the schema. */
  hours: [
    { days: 'Monday – Saturday', time: '6:00 AM – 9:00 PM' },
    { days: 'Sunday', time: '6:00 AM – 3:00 PM' },
  ],

  partner: {
    name: 'Another Light Counselling',
    url: 'https://another-light.com',
  },
}

/* ---------------------------------------------------------------------------
   WhatsApp deep links
   One builder, used by every CTA on the site. This is also the fix for audit
   item S2 — the live Nutrition button has a malformed query string ("&?type=").
   Building the URL with URLSearchParams makes that class of bug impossible.
--------------------------------------------------------------------------- */
export function whatsappLink(message = "Hi, I want to learn more about 180 Method.") {
  const params = new URLSearchParams({
    phone: site.phoneRaw,
    text: message,
    type: 'phone_number',
    app_absent: '0',
  })
  return `https://api.whatsapp.com/send/?${params.toString()}`
}

export const links = {
  whatsapp: whatsappLink(),
  tel: `tel:+${site.phoneRaw}`,
  mailto: `mailto:${site.email}`,
  instagram: site.instagram,
  linkedin: site.linkedin.company,
}

/* ---------------------------------------------------------------------------
   NAVIGATION
   Desktop and mobile both render from THIS array. That is the structural fix
   for audit items G7 / G8 / G9 — the two menus physically cannot drift apart
   or fall out of order, because there is only one list.
--------------------------------------------------------------------------- */
export const navigation = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Team', href: '/team' },
  { label: 'Counselling', href: '/counselling' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Media', href: '/media-features' },
  { label: 'Contact', href: '/contact' },
]

/* Legacy WordPress URL → new route.
   Every one of these is currently live and indexed. They are redirected at the
   host (see public/_redirects) AND handled client-side in App.jsx so no
   existing link or Google result ever 404s. */
export const legacyRedirects = [
  { from: '/aboutus', to: '/about' },
  { from: '/contactus', to: '/contact' },
  { from: '/mediafeatures', to: '/media-features' },
  { from: '/faq', to: '/faqs' },
  { from: '/blog', to: '/' }, // Blog is deliberately not built yet — audit N1.
]
