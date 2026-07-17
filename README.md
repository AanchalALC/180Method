# 180 Method — website

React + Vite rebuild of 180method.in. Static site, no backend, no database, no monthly cost.

---

## Run it locally

```bash
npm install
npm run dev
```

Open **http://localhost:5173**. That's the whole setup — there's nothing else to configure to see the site.

```bash
npm run build      # production build → /dist
npm run preview    # serve /dist locally, exactly as the host will
```

Requires Node 18+.

---

## What's built

| Route | Old WordPress URL | Notes |
|---|---|---|
| `/` | `/` | Hero, Venn pillars, 5-step journey, counters, reviews, ALC teaser, press strip |
| `/about` | `/aboutus/` | Vision **before** mission, mirrored layout, "How this shows up" |
| `/services` | `/services/` | Who We Serve, 5 programs, therapist disclaimer |
| `/team` | `/team/` | 5 members — photos and bios still pending |
| `/counselling` | `/counselling/` | ALC partnership |
| `/reviews` | `/reviews/` | 9 testimonials, cleaned up |
| `/faqs` | *didn't exist* | 12 Q&As + FAQ schema |
| `/media-features` | `/mediafeatures/` | Was empty; now 3 real stories |
| `/contact` | `/contactus/` | Details, enquiry form, map slot |
| `404` | *didn't exist* | Branded, routes people back |

**Deliberately not built:** Blog (needs real articles — currently lorem ipsum), Careers, Pricing, Schedule, Privacy/Terms, Events, Instagram feed. Each is its own scoped item. `/blog` is redirected home so the homepage links stop 404-ing.

---

## Where to change things

**You should almost never need to open a component to change content.** Everything lives in `src/data/`:

| Want to change… | Edit |
|---|---|
| Phone, email, address, hours, Instagram, nav menu | `src/data/site.js` |
| Service copy, bullets, WhatsApp messages, Who We Serve | `src/data/services.js` |
| Team names, roles, bios, photos | `src/data/team.js` |
| Testimonials, Google review link | `src/data/reviews.js` |
| Press articles, outlet logos | `src/data/media.js` |
| FAQ questions and answers | `src/data/faqs.js` |
| Hero copy, pillars, 5 steps, session counters, vision/mission | `src/data/home.js` |
| Colours, fonts, spacing | `tailwind.config.js` |

`src/data/site.js` is the important one. The nav is a single array that drives **both** desktop and mobile — which is why the two menus can't drift apart the way they have on the live site.

---

## Structure

```
src/
├── data/           ← all content. Start here.
├── components/
│   ├── layout/     Navbar, Footer, Layout, SmoothScroll, ScrollToTop
│   └── ui/         Primitives.jsx (Button, Section, Reveal, PageHero…)
│                   Widgets.jsx    (Counter, Marquee, Accordion, Stars, Seo)
├── pages/          one file per route
├── lib/            motion variants, reduced-motion hook, cn()
├── App.jsx         routes + legacy redirects
└── index.css       fonts, base layer, brand utilities
```

---

## Images

Every image is a **labelled placeholder** at the correct dimensions. Swap the file, keep the filename, done — no code changes.

Full list with sizes: **`IMAGE-MANIFEST.md`**.

---

## Fonts

Currently rendering on Google Fonts fallbacks (Orbitron ≈ Radio Stars, Jost ≈ Gabriel Sans). To switch to the real brand fonts: see `public/fonts/README.md`.

⚠️ **Gabriel Sans is a commercial font.** A desktop licence is not a webfont licence. Check what was actually purchased before it ships.

---

## Contact form

Uses [Web3Forms](https://web3forms.com) — a POST endpoint that emails submissions on. Free tier: 250/month. No server, which is the point.

```bash
cp .env.example .env
# add your key
VITE_WEB3FORMS_KEY=your-key-here
```

Without a key the form is **hidden**, not broken — the page still works via WhatsApp, exactly as the live site does today.

---

## Deploying

1. Push to GitHub (private repo).
2. Import into **Vercel** or **Cloudflare Pages**. Build command `npm run build`, output directory `dist`. Both auto-detect Vite.
3. Add `VITE_WEB3FORMS_KEY` as an environment variable in the dashboard.
4. **Test on the preview URL. Get client sign-off there.**
5. Only then point DNS at the host (see the migration plan).

**Redirects:** `public/_redirects` covers Netlify/Cloudflare Pages. `vercel.json` at the project root covers Vercel. Both ship, so the repo doesn't care where it lands. The SPA catch-all is the last rule in `_redirects` and must stay last — without it, `/services` reloads into a 404.

Old URLs (`/aboutus`, `/contactus`, `/mediafeatures`) are 301'd at the host **and** handled client-side in `App.jsx`. Belt and braces — these are live and indexed today and must never 404.

---

## Palette — a note on why charcoal is barely used

The brand doc lists five colours. v1 of this build used **Charcoal `#28251A`** as the dominant dark surface — and because it's a *warm brown*-black, every dark section read brown and the whole site felt muddy.

The live WordPress site doesn't do that. It leads with black, forest green and lime, and barely touches charcoal. This build now matches that weighting:

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0B0D0B` | The dark surface. Near-black, cool green undertone. |
| `forest` | `#275442` | Brand green. Mid-tone sections, accents. |
| `lime` | `#DCE576` | Brand lime. The loud accent — CTAs, numbers, rules. |
| `paper` | `#FFFFFF` / `#F6F8F3` | Light sections. Clean white, not warm sand. |
| `aloe` | `#AAB099` | Brand sage. Secondary tint. |
| `charcoal` | `#28251A` | **Brand token, kept, deliberately unused.** |
| `sand` | `#DED9D5` | **Brand token, kept, deliberately unused.** |

Charcoal and sand are still defined in `tailwind.config.js` — they *are* brand colours and removing them would be overstepping. They're just no longer load-bearing. If the brand owner wants them back in play, they're one class away.

**Section rhythm** is driven by the `tone` prop on `<Section>`: `paper` · `paperAlt` · `paperDeep` · `ink` · `forest` · `forestDeep` · `lime`. Pages alternate deliberately — white → black → green → white — so nothing reads as one long slab.

`.duotone` pushes photography toward the green palette. It's the highest-leverage trick available while the source images are WhatsApp exports.

## Accessibility & performance

Built in, not bolted on:

- **The navbar is always a solid dark surface.** v1 was transparent at scroll-top and only went solid on scroll, which meant light text on light sections — it disappeared. Legibility must never depend on scroll position.
- **`prefers-reduced-motion`** is honoured everywhere. Framer respects it globally via `MotionConfig reducedMotion="user"`; Lenis smooth-scroll doesn't initialise at all; the marquee becomes a static scrollable row; counters show their final number without ticking.
- **`:focus-visible`** rings on every interactive element, with a dark-background variant.
- Skip-to-content link, one `<h1>` per page, real `<button>` disclosure pattern on the FAQ accordion, `aria-label` on icon-only buttons, decorative images marked `aria-hidden`.
- **Only `transform` and `opacity` are animated** — GPU-composited. The live site was flagged for a non-composited animation.
- Hero image is `fetchPriority="high"` and never lazy-loaded (it's the LCP element). Everything below the fold is `loading="lazy"` with explicit `width`/`height`.
- **The H1 is real text**, not baked into the hero image. That single change fixes the 12.2s LCP, the invisible-to-Google headline, and mobile reflow at once.

Current bundle: **~127 KB JS gzipped, 7 KB CSS**. The live WordPress site ships ~6 MB per page view.

---

## Known TODOs in the code

Search the repo for `TODO(180 team)`. They're all real blockers, each one traced to an audit item — nothing is invented. The big ones:

- Real studio address (Contact still says "TODO"; live site says Copenhagen)
- Team bios + portraits × 5
- Confirm opening hours
- Google review URL
- Press outlet logos
- **Therapist sign-off on the eating-disorder / mental-health wording** — highest risk item on the site
