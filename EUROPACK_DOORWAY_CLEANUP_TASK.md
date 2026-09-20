# TASK: Remove 7,704 Doorway Pages & Add 301 Redirects

**Repo:** `~/Desktop/Europack` · **Branch to create:** `seo/remove-doorway-pages`
**Scope:** `client/` only. Do not touch `server/`.
**Spec verified against this codebase on 20 September 2026.** All file paths, line numbers, export names and counts below were confirmed live — treat them as accurate, but re-verify before editing since the code may have moved.

---

## 1. BACKGROUND — READ THIS FIRST

This site (europackindia.com) is under **algorithmic quality suppression** from Google. Not a manual penalty — confirmed no manual action in Search Console. The cause is diagnosed and certain:

The sitemap ships **7,833 URLs, of which 7,704 are programmatic doorway pages** built from a fixed formula:

```
{5 products} × {154 locations} × {10 intent templates} = 7,704 near-duplicate URLs
```

Example slugs, all of which currently resolve and render:

```
/blog/wooden-pallets-manufacturer-near-churchgate-for-industrial-packaging
/blog/wooden-pallets-supplier-near-churchgate-for-industrial-packaging
/blog/wooden-pallets-dealer-near-churchgate-for-industrial-packaging
/blog/wooden-pallets-near-me-in-churchgate
/blog/wooden-pallets-price-guide-in-churchgate
... ×7,699 more
```

**Consequences already measured:** 368 total clicks in 3 months, almost all branded ("europack"). Zero product-intent traffic. Competitors with a single 900-word page outrank the entire domain. The 7,704 thin pages are burying ~128 genuine product pages and ~54 genuine articles.

**This task removes them and redirects them.** Nothing else in the SEO recovery plan works until this ships.

---

## 2. CRITICAL — WHAT MUST SURVIVE

There are **three separate blog layers** in this codebase. Two are spam. One is genuine and valuable. Do not confuse them.

### 2.1 KEEP — `client/src/data/mockBlogs*.ts` (~54 real articles)

These are **hand-written, substantial, unique articles** — typically 3,000–4,000 words with real headings, FAQs, and genuine expertise. They are an asset, not spam.

| File | Articles |
|---|---|
| `mockBlogs-pallets-1.ts` | 3 |
| `mockBlogs-pallets-2.ts` | 3 |
| `mockBlogs-pallets-3.ts` | 4 |
| `mockBlogs-pallets-4.ts` | 5 |
| `mockBlogs-corrugated-1.ts` | 5 |
| `mockBlogs-corrugated-2.ts` | 5 |
| `mockBlogs-seaworthy-1.ts` | 5 |
| `mockBlogs-seaworthy-2.ts` | 5 |
| `mockBlogs-crates.ts` | 5 |
| `mockBlogs-shrink.ts` | 5 |
| `mockBlogs-local.ts` | 5 |
| `mockBlogs.ts` | 4 |
| **Total** | **~54** |

Aggregated by `client/src/data/allBlogs.ts` → `getMockBlogBySlug()` / `getAllMockBlogs()`.

**Do not delete, edit, shorten, or "consolidate" any of these.**

One exception: the slug `post=3883` in `mockBlogs.ts` is malformed (a leftover WordPress query string). Leave the article content intact but flag it in your summary — do not rename it without being asked.

### 2.2 KILL — `client/src/constants/blogIndex.json` (5,350 doorway stubs)

Verified: **5,350 entries, 0 of them genuine.** Every single one matches the doorway pattern. Shape:

```json
{
  "id": "EP-BLOG-0001",
  "title": "Wooden Pallets Manufacturer Near Churchgate for Industrial Packaging",
  "slug": "wooden-pallets-manufacturer-near-churchgate-for-industrial-packaging",
  "product": "Wooden Pallets",
  "location": "Churchgate",
  "intent": "Manufacturer",
  "priority": "High"
}
```

These are stubs — no article body exists. Content is synthesised at request time by `seoBlogGenerator.ts`.

### 2.3 KILL — `client/src/constants/generatedBlogIndex.ts` (2,400 generated stubs)

Generates the Vadodara batch at module load:

```
48 vadodaraLocations × 5 seoProducts × 10 vadodaraIntents = 2,400
```

Then merges with `blogIndex.json` into a `bySlug` Map. Exports:
- `allSeoBlogEntries`
- `getAllSeoBlogEntries()`
- `findSeoBlogBySlug(slug)`
- `vadodaraSeoBlogCount`

**5,350 + 2,400 = 7,750, deduped to 7,704.**

---

## 3. CURRENT CONSUMERS — EVERY PLACE THIS DATA LEAKS OUT

| File | Line | What it does |
|---|---|---|
| `client/src/app/sitemap.ts` | 6 | `import { getAllSeoBlogEntries }` |
| `client/src/app/sitemap.ts` | 73 | builds `seoBlogRoutes` from all 7,704 |
| `client/src/app/sitemap.ts` | 115 | spreads `seoBlogRoutes` into sitemap output |
| `client/src/app/(public)/blog/page.tsx` | 20 | `import { getAllSeoBlogEntries }` |
| `client/src/app/(public)/blog/page.tsx` | 34 | `allPosts` — lists them on the blog index |
| `client/src/lib/seoBlogGenerator.ts` | 1 | `import { findSeoBlogBySlug }` |
| `client/src/lib/seoBlogGenerator.ts` | 118 | `const blog = findSeoBlogBySlug(slug)` — synthesises the page body |
| `client/src/app/(public)/blog/[slug]/page.tsx` | — | `generateMetadata()` + page render call `generateSeoBlogContent(slug)` |

---

## 4. BONUS BUG — FIX THIS TOO

**The ~54 genuine articles are NOT in the sitemap at all.**

`client/src/app/sitemap.ts` includes only:
1. a hardcoded static-routes array
2. flat SEO product routes
3. the 7,704 doorway blogs
4. blogs fetched from the API (`/blogs?status=published`)

It never imports `getAllMockBlogs()`. So Google is being handed 7,704 spam URLs while ~54 real articles go unsubmitted. **Fix this as part of the task.**

---

## 5. IMPLEMENTATION

Work on branch `seo/remove-doorway-pages`. Commit in logical steps, not one giant commit.

### Step 1 — Build the redirect map

Every doorway slug begins with one of five product IDs (from `client/src/constants/seoData.ts`). Map by prefix:

| Slug prefix | 301 target | Verified live |
|---|---|---|
| `wooden-pallets-` | `/wooden-pallets` | yes |
| `seaworthy-packing-` | `/seaworthy-packing` | yes |
| `wooden-boxes-` | `/wooden-crates` | yes |
| `corrugated-boxes-` | `/corrugated-boxes` | yes |
| `shrink-wrapping-` | `/shrink-wrapping` | yes |

All five destinations confirmed to exist in the live route table.

**Create `client/src/lib/doorwayRedirects.ts`:**

- Export `getDoorwayRedirect(slug: string): string | null`
- Match the slug against the doorway patterns below. Return the product's target path, or `null` if it doesn't match.
- Pattern suffixes to recognise (from `buildSlug()` in `generatedBlogIndex.ts`):
  - `-manufacturer-near-{loc}-for-industrial-packaging`
  - `-supplier-near-{loc}-for-industrial-packaging`
  - `-dealer-near-{loc}-for-industrial-packaging`
  - `-export-packaging-near-{loc}-for-industrial-packaging`
  - `-industrial-packaging-near-{loc}-for-industrial-packaging`
  - `-near-me-in-{loc}`
  - `-for-export-cargo-in-{loc}`
  - `-for-heavy-machinery-in-{loc}`
  - `-for-warehouse-in-{loc}`
  - `-price-guide-in-{loc}`

**Critical guard:** the check must run **only after** confirming the slug is NOT in `getMockBlogBySlug()`. Several genuine articles have superficially similar slugs (`wooden-pallet-manufacturer-mumbai`, `corrugated-box-manufacturer-mumbai`, `packaging-services-vile-parle-andheri-bandra`). **Real articles win. Always check the real-article map first.**

Prefer a generated explicit `Set` of the 7,704 known doorway slugs over loose regex — it is exact and cannot catch a real article by accident. Generate it once from the existing data before deleting that data.

### Step 2 — Redirect in middleware

`client/src/middleware.ts` already exists (matcher `/:path*`, currently handles root `.html` verification files).

Add, **before** the existing `.html` block:

```ts
if (pathname.startsWith('/blog/')) {
  const slug = pathname.slice('/blog/'.length);
  const target = getDoorwayRedirect(slug);
  if (target) {
    return NextResponse.redirect(new URL(target, request.url), 301);
  }
}
```

Use **301 (permanent)**, not 302 or 308-by-default. Google must see these as permanent.

Do **not** put these in `next.config.ts` `redirects()` — 7,704 entries there are evaluated per-request and will degrade every page load.

### Step 3 — Stop generating the stubs

- Delete `client/src/constants/blogIndex.json`
- Delete `client/src/constants/generatedBlogIndex.ts`
- Delete `client/src/lib/seoBlogGenerator.ts`

Then remove every import and usage listed in section 3. Specifically:

**`client/src/app/sitemap.ts`**
- remove the `getAllSeoBlogEntries` import
- remove the `seoBlogRoutes` block
- remove `...seoBlogRoutes` from the return
- **add** `getAllMockBlogs()` from `@/data/allBlogs` so the ~54 real articles are submitted

**`client/src/app/(public)/blog/page.tsx`**
- remove the `getAllSeoBlogEntries` import
- source `allPosts` from `getAllMockBlogs()` plus the API blogs instead

**`client/src/app/(public)/blog/[slug]/page.tsx`**
- remove the `generateSeoBlogContent` import and both call sites (in `generateMetadata` and the page body)
- the existing `getMockBlogBySlug()` → API fallback chain stays exactly as-is
- unknown slugs must return a proper **404**, not a "coming soon" placeholder — check what `BlogComingSoonClient` currently does and make sure dead slugs 404

Delete `SeoArticleClient` too if nothing else references it.

### Step 4 — Fix sitemap `lastmod`

`sitemap.ts` currently stamps `new Date()` on every entry on every request, telling Google every page changes daily. This destroys crawl-budget signalling.

- static routes → a fixed, sensible date constant
- real articles → the article's own `publishedAt` / `updatedAt` if available, else a fixed date
- API blogs → the blog's real `updatedAt`

### Step 5 — Verify

Run the dev server and confirm all of the following:

```bash
cd client && npm run dev
```

1. **Sitemap count.** `curl -s localhost:3000/sitemap.xml | grep -c "<loc>"` → expect roughly **180**, not 7,833. Zero doorway slugs.
2. **Real articles present.** Confirm several of the ~54 genuine slugs appear in the sitemap, e.g. `ispm-15-complete-guide`, `3-ply-vs-5-ply-vs-7-ply-corrugated-boxes`, `what-is-seaworthy-packing-export-guide`.
3. **Redirects fire with 301.**
   ```bash
   curl -sI localhost:3000/blog/wooden-pallets-manufacturer-near-churchgate-for-industrial-packaging | head -5
   ```
   Expect `HTTP/1.1 301` and `location: /wooden-pallets`.
   Test at least one slug per product, including a Vadodara one (`...-in-makarpura-vadodara`).
4. **Real articles still 200 and render.** Load `/blog/ispm-15-complete-guide` and `/blog/wooden-pallet-manufacturer-mumbai` in a browser. Full content, no regressions.
5. **Blog index page works** and lists the real articles only.
6. **Build passes.** `npm run build` with zero TypeScript errors.
7. **No dead imports.** `grep -rn "generatedBlogIndex\|seoBlogGenerator\|blogIndex.json" client/src` returns nothing.

### Step 6 — Report

Summarise: files changed, files deleted, sitemap URL count before/after, redirect spot-check results, build status. Flag anything you were unsure about rather than guessing.

---

## 6. DO NOT DO ANY OF THIS

- **Do not delete or edit `client/src/data/mockBlogs*.ts`.** Those are the real articles.
- **Do not** replace the doorway pages with a smaller batch of location pages. No templated location content of any kind. That is the exact mistake being undone.
- **Do not** put 7,704 rules in `next.config.ts`.
- **Do not** use 302/307 redirects.
- **Do not** `noindex` the doorway pages instead of redirecting — Google must be told the URL moved, and the link equity should flow to the product pages.
- **Do not** touch `server/`.
- **Do not** push or deploy. Leave the branch local for review.

---

## 7. NOTE ON THE OLD AUDIT

An earlier audit stated "only 3 genuine blog posts exist." That was inferred from crawling the live sitemap, which never included the mock articles. The codebase actually contains **~54 genuine articles**. The earlier number was wrong; this spec is correct.
