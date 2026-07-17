# Image manifest

Every image in `/public/images` is currently a labelled placeholder at the correct dimensions, rendered in the brand's forest/lime so the mockup reads honestly. **Replace the file, keep the filename** — nothing in the code changes.

## Before you drop anything in

1. **Resize to the target dimensions below.** Don't upload a 4000px original and let the browser shrink it — that's what makes the current site 6 MB a page.
2. **Convert to WebP** and keep heroes under ~300 KB:
   ```bash
   # one file
   cwebp -q 78 hero-original.jpg -o hero.webp
   # or the whole folder
   for f in *.jpg; do cwebp -q 78 "$f" -o "${f%.jpg}.webp"; done
   ```
   If you switch the extension to `.webp`, update the path in the matching `src/data/*.js` file.
3. **No text baked into images.** All headline text is real HTML — that's deliberate.
4. Squarespace-style stock and AI-generated images are explicitly out per the final draft. Real studio photography only.

---

## Hero images — 1920 × 1080

| File | Shot needed |
|---|---|
| `home/hero.jpg` | Wide-angle studio. **The single most important image on the site** — it's the LCP element and the first impression. |
| `about/hero.jpg` | The space or the community. Warmer than the home hero. |
| `services/hero.jpg` | Training in progress, wide. |
| `team/hero.jpg` | Studio interior — replaces the logo-as-background the live site uses. |
| `og-default.jpg` | Social share card. Logo + studio. Gets cropped to 1.91:1 — keep the subject centred. |

## Home page — 1200 × 900

| File | Shot needed |
|---|---|
| `home/pillar-fitness.jpg` | Arya training a client. |
| `home/pillar-psychology.jpg` | Counselling room — counsellor front-on, client's back to camera. |
| `home/pillar-nutrition.jpg` | Dr. Moyna consulting a client. |
| `home/step-assessment.jpg` | Step 1 — assessment / intake conversation. |
| `home/step-blueprint.jpg` | Step 2 — planning, whiteboard, programme. |
| `home/step-training.jpg` | Step 3 — coached training, form correction. |
| `home/step-tracking.jpg` | Step 4 — measurement / review. |
| `home/step-community.jpg` | Step 5 — group session, community energy. |

## Counselling — 1200 × 1500 (4:5 portrait)

| File | Shot needed |
|---|---|
| `home/counselling-room.jpg` | The counselling room. Calm, warm, no faces needed. |

## About — 1200 × 1500 (4:5 portrait)

| File | Shot needed |
|---|---|
| `about/vision.jpg` | Members training. Energy. |
| `about/mission.jpg` | Coach + client, one-to-one. Connection. |

## Services — 1200 × 900

| File | Shot needed |
|---|---|
| `services/personal-training.jpg` | Arya training a client, form correction, strength work. |
| `services/buddy-training.jpg` | Two or three members training with one trainer. |
| `services/group-training.jpg` | Active GT session, full house, wide shot. |
| `services/nutrition.jpg` | Dr. Moyna consulting / meal planning discussion. |
| `services/counselling.jpg` | Counselling room or listening circle. |

## Team portraits — 800 × 1000 (4:5)

**Consistent framing, consistent background, consistent editing.** Five portraits that look like a set, not five photos from five different phones. Face centred.

| File | Person |
|---|---|
| `team/arya-talwalkar.jpg` | Arya Talwalkar — Co-founder & Head Trainer |
| `team/aanchal-narang.jpg` | Aanchal Narang — Co-founder & Head Therapist |
| `team/kartik.jpg` | Kartik — Fitness Coach |
| `team/moyna-vakil.jpg` | Dr. Moyna Vakil — Nutritionist, Dietician & Lifestyle Coach |
| `team/vishal-hunari.jpg` | Vishal Hunari — Fitness Coach |

## Press logos — 400 × 200, transparent PNG

Trim each to a **uniform optical height** — logos at ragged sizes are what makes a press strip look amateur. The dark-background strip on `/media-features` inverts them via CSS, so supply dark logos on transparent, not white.

`press/hindustan-times.png` · `press/livemint24.png` · `press/the-asian-talks.png` · `press/forbes-story.png` · `press/the-asian-age.png` · `press/mumbai-times.png` · `press/daily-pioneer.png` · `press/tycoon-world.png`

## Logo & favicon

| File | Notes |
|---|---|
| `images/logo-lime.svg` | **Placeholder.** Needs the real logo exported as **SVG**. The live site only has a 581×430 PNG, which will look soft on retina. Ask whoever made the brand doc for the vector. |
| `images/logo-ink.svg` | Same logo, near-black fill, for light backgrounds. |
| `favicon.png` | Placeholder. 512×512 minimum from the real mark. |

---

## A straight note on photography

The current site runs on WhatsApp exports — `WhatsApp-Image-2026-02-03-at-09.04.15.jpeg`, roughly 683×1024, compressed by WhatsApp and then again by WordPress.

**Those files cannot carry a 1920×1080 hero.** No amount of code fixes that. The layout has grain overlays and dark gradients that will hide a multitude of sins, but the ceiling on how good this site looks is set by the photography, not the CSS.

If a proper studio shoot isn't happening before launch, say so and I'll re-cut the hero and pillar sections to use tighter crops and typographic panels instead of big photography — a different design that works honestly with the assets that exist, rather than a good design starved of the images it needs.
