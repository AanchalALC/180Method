# How to publish a blog post on 180method.in

This is the only thing you need: the Sanity Studio, at **https://the180method.sanity.studio**.
No code, no GitHub.

## 1. Log in

Go to the Studio URL and sign in with the email Swathi invited you with. You'll land on a
list of **Posts**, newest first.

## 2. Create a post

Click **Post** in the "+" / Create menu. You'll see these fields, top to bottom:

| Field | What to put in it |
|---|---|
| **Title** | The headline, as it should read on the page. |
| **Slug** | Click "Generate" to build it from the title, then check it reads cleanly — this becomes the web address (`180method.in/blog/this-part/`). Avoid changing it after the post is live; that changes the URL. |
| **SEO Title** | What shows in the browser tab and as the blue link in Google. **Hard limit: 60 characters.** The Studio will show a validation error and block publishing if you go over — that's intentional, not a bug. Google truncates anything longer, so a shorter, punchier version of the title usually works best here. |
| **SEO Description** | The grey summary line under the title in Google search results. **Must be 140–160 characters** — not a suggestion, the Studio enforces it. Shorter gets padded with random page text by Google; longer gets cut off mid-sentence. Write one sentence that would make someone click. |
| **Excerpt** | The short summary shown on the blog card (the tile on the `/blog/` page). Max 200 characters. Can reuse a line from the article, doesn't have to match the SEO description. |
| **Hero image** | Click to upload. This shows both at the top of the post and (cropped) on its card. Landscape photos work better than portrait. Drag the crop box (hotspot) to keep the important part of the photo visible when it gets cropped for the card. |
| **Hero image → Alternative text** | Required. One sentence describing the photo for screen readers and Google Images. Not decorative — write what's actually in the shot. |
| **Body** | The article itself. Use the toolbar for headings (H2/H3 — don't use H1, that's reserved for the title), bold, italic, bullet/numbered lists, and quotes. |
| **Category** | Pick one: Fitness, Nutrition, Mental Health, or Lifestyle. |
| **Author** | Defaults to "180 Method" — change it if a specific person should be credited. |
| **Published at** | Defaults to now. Set it to a future date/time to schedule a post — it won't appear on the live site until that moment passes. |

## 3. Adding a link inside the body

Select the words you want to link, click the link icon in the toolbar, paste the URL. There's
a toggle for **"Open in a new tab"** — leave it on for links to other websites (that's the
default), turn it off only for a link elsewhere on 180method.in.

## 4. Publish

Click **Publish** (not just the auto-saved draft state — a post has to be explicitly
published to go live). Two things happen:

1. Sanity notifies our hosting (Vercel) that something changed.
2. The site rebuilds and redeploys automatically.

**This takes about 90 seconds.** Refresh `180method.in/blog/` after that and the post will
be there, with its own page, correct search-preview text, and a card on the blog index.

## 5. Editing or unpublishing

Open the post, make changes, click Publish again — same ~90 second wait. To take a post
down, click the "..." menu → **Unpublish** (this keeps it in Sanity, just removes it from the
live site) — Sanity keeps full history, so nothing is ever really lost, even if you delete a
document outright.

## Why the character limits are strict

They're not house style — they're what Google actually does with the text. A title over 60
characters gets truncated with "…" in search results. A description outside 140–160 either
gets cut off or Google ignores it and writes its own summary from the page instead. The
Studio blocking publish outside those ranges is the guardrail that keeps every post looking
right in search results without anyone having to remember the numbers.
