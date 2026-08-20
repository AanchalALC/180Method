# Setting up the Sanity project (one-time, for Swathi)

**Status: done.** The project exists (`projectId: ruxd82na`, dataset `production`), the
Studio is deployed at `https://the180method.sanity.studio`, and all three config files
already have the real values. This doc is kept as a reference for redoing this on another
machine, or if the project ever needs recreating.

All the Studio code already exists in this folder (`180method-studio/`) and the app already
expects it (`src/data/blog.config.js`). What's missing is an actual Sanity project — that
requires a browser login, so it has to be done by a human, not run headlessly.

⚠️ `sanity init` run inside `180method-studio/` scaffolds a **new nested project folder**
using Sanity's own generic template — it does not pick up the custom schema files already
sitting in this directory. If you ever run `sanity init` again, only use it to create the
cloud project and grab the project ID; delete whatever folder it scaffolds locally and keep
using the schema files already here.

⚠️ `sanity@6` requires **React 19** as a peer dependency (`package.json` in this folder is
already pinned to `^19.2.2` — don't "fix" it back to React 18 to match the main app; this
Studio is a fully separate application with its own dependency tree).

## 1. Create the project + log in

```bash
cd 180method-studio
npm install
npx sanity login
```

`sanity login` opens a browser tab to authenticate — sign in with Google or email, whichever
you want to own this project.

```bash
npx sanity init --dataset production --visibility public
```

Choose **"Create new project"**, name it something like `180 Method Blog`. When it asks
about the dataset, it should already default to `production` / public (matches the flags
above). It will ask to attach a config — say **no** if it offers to overwrite
`sanity.config.js`; the file here is already correct, it just needs the real project ID.

This prints a **Project ID** — an 8-character alphanumeric string. Copy it.

## 2. Wire the project ID into three files

Replace `REPLACE_WITH_SANITY_PROJECT_ID` in all three:

- `180method-studio/sanity.config.js`
- `180method-studio/sanity.cli.js`
- `src/data/blog.config.js` (in the main app, not the Studio folder)

All three must have the identical ID.

## 3. Deploy the Studio

```bash
cd 180method-studio
npx sanity deploy
```

It'll ask for a studio hostname (ours is `the180method`, giving `https://the180method.sanity.studio`
— `180method` was rejected, likely because it starts with a digit). This is the URL Sujoy
logs into (see `HOW-TO-PUBLISH-A-BLOG-POST.md`). The first deploy prints an `appId` — that's
already pinned into `sanity.cli.js`'s `deployment` block so future deploys skip this prompt.

## 4. Invite Sujoy

manage.sanity.io → your project → **Members** → invite his email.

⚠️ The free plan only has two roles: **Administrator** and **Viewer**. There's no
"can edit but not delete" role, so Sujoy will be a full Administrator and technically
able to delete any post. Sanity keeps complete revision history on every document, so a
deleted post is always recoverable — but he should know he has that power.

## 5. First real content fetch

Back in the main `180method` repo:

```bash
npm run content
```

This runs `scripts/fetch-content.mjs` against the now-real project. It will fail loudly if
the project ID is wrong or there are zero posts published yet (zero posts is fine — it just
writes an empty array and warns; a bad project ID is a hard error).

Enter Post 1 in the Studio first (see the publishing guide), publish it, then run
`npm run content` again to confirm it comes through, then `npm run build` to do a full
local build and check `dist/blog/` before deploying anything.

## 6. Vercel deploy hook + Sanity webhook (so publishing auto-deploys)

1. **Vercel** → this project → Settings → Git → Deploy Hooks → create one on branch `main`,
   copy the generated URL.
2. **Sanity** → manage.sanity.io → your project → API → Webhooks → **Create webhook**:
   - Trigger on: Create, Update, Delete
   - Filter: `_type == "post"`
   - URL: the Vercel Deploy Hook URL from step 1
   - HTTP method: POST
3. No Vercel environment variables are needed — the Sanity project ID/dataset are plain
   committed config, not secrets (the dataset is public and we only ever read published
   documents).

Once this is wired, publishing in the Studio triggers a rebuild automatically — about
90 seconds from click to live, per the publishing guide.
