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

  // TODO(180 team): audit item Ct1 — the live WordPress site still shows
  // "Street name, 22135 Copenhagen, Denmark". Real address needed before launch.
  address: {
    line1: 'TODO: Studio address line 1',
    line2: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: 'TODO',
    country: 'India',
    // Paste the Google Maps embed URL here to switch the map on (Contact page).
    mapEmbedUrl: '',
    mapDirectionsUrl: 'https://maps.google.com/?q=180+Method+Bandra+Mumbai',
  },

  // TODO(180 team): audit item Ct2 — live site says "8:00 AM – 17:00 PM".
  // Confirm the real hours.
  hours: [
    { days: 'Monday – Saturday', time: '8:00 AM – 5:00 PM' },
    { days: 'Sunday', time: 'Closed' },
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
