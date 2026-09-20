# TASK: Fix Keyword Cannibalisation Across the 22 Pallet Pages

**Repo:** `~/Desktop/Europack` · **Branch:** `seo/pallet-keyword-targeting`
**Scope:** `client/` only. No new URLs. No `server/` changes.
**Verified against the live codebase and live Google India SERPs, 20 September 2026.**

---

## PART 0 — THE DIAGNOSIS

### 0.1 The problem, stated plainly

All 22 pallet pages resolve (200 OK) and all 22 carry effectively the same title tag:

```
CP1 Pallet Manufacturer in Mumbai | Wooden Pallets | Europack
CP2 Pallet Manufacturer in Mumbai | Wooden Pallets | Europack
CP3 Pallet Manufacturer in Mumbai | Wooden Pallets | Europack
Euro Pallets Manufacturer in Mumbai | Wooden Pallets | Europack
Two Way Pallets Manufacturer in Mumbai | Wooden Pallets | Europack
… 22 variations on one phrase
```

Every one of them is aimed at **"pallet manufacturer in Mumbai."** They are not competing with National Wooden or Hemant Packers for that phrase — they are competing with *each other*. Google sees 22 near-identical intent signals from one domain and has no basis to pick one, so it ranks none.

This is keyword cannibalisation. It is the single biggest reason these pages are invisible, and it is entirely fixable without writing a new page.

### 0.2 What must change

Each page targets **one distinct query cluster** that no other page on the domain targets. `/wooden-pallets` is the only page that should target the broad "wooden pallet manufacturer" head term. Every sub-type page targets its own specific term and supports the hub rather than fighting it.

### 0.3 Honest expectation setting — read this before promising anything

The goal as stated is "all these pages on page 1 of Google." That is not achievable as an absolute, and nobody should be told otherwise. Specifically:

- **Roughly half of all page-one slots for Indian B2B pallet queries belong to directories** — IndiaMART, JustDial, TradeIndia, ExportersIndia. Measured across ~82 sampled result slots: second-hand intent ~80% directory, "near me" ~55%, price ~45%, use-case ~20%. Those slots are not winnable by a manufacturer site; the correct response is to *also be listed* on those directories (owner task, Part 5).
- **This domain is under active algorithmic suppression** from the 7,700 doorway pages. Until that clears — 4–8 weeks from the 301s going live — ranking gains will be muted regardless of page quality.
- **Some clusters are genuinely winnable and currently uncontested by any Indian site.** Spec/dimension queries and comparison queries have no Indian competitor at all. Those are where these pages can realistically reach page one.

A realistic target: **8–12 of the 22 pages ranking page one for their own specific term within 3–6 months**, not 22 pages ranking for everything.

---

## PART 1 — THE KEYWORD-TO-URL MAP

This is the core deliverable. One primary target per page, no overlaps.

| # | URL | Primary target query | Intent | New title (≤60 chars) |
|---|---|---|---|---|
| 1 | `/wooden-pallets` | wooden pallet manufacturer | **HUB — the only page targeting the head term** | `Wooden Pallet Manufacturer in Mumbai & Vadodara` |
| 2 | `/euro-pallets` | euro pallet 1200x800 / EPAL size | Spec | `Euro Pallet (1200×800mm) — EPAL Size & Specs` |
| 3 | `/two-way-pallet` | two way pallet / 2-way entry pallet | Spec | `Two-Way Entry Pallets — Sizes & Load Capacity` |
| 4 | `/four-way-pallet` | four way pallet / 4-way entry pallet | Spec | `Four-Way Entry Pallets — Sizes & Load Capacity` |
| 5 | `/hardwood-pallet` | hardwood pallet / heavy duty wooden pallet | Material | `Hardwood Pallets — Heavy Duty, High Load` |
| 6 | `/cp1-pallets` | CP1 pallet size / CP1 dimensions | Spec | `CP1 Pallet (1000×1200mm) — Size & Specs` |
| 7 | `/cp2-pallets` | CP2 pallet size | Spec | `CP2 Pallet (800×1200mm) — Size & Specs` |
| 8 | `/cp3-pallets` | CP3 pallet size / CP3 dimensions | Spec | `CP3 Pallet (1140×1140mm) — Size & Specs` |
| 9 | `/cp4-pallets` | CP4 pallet size | Spec | `CP4 Pallet — Size, Specs & Chemical Use` |
| 10 | `/cp5-pallets` | CP5 pallet size | Spec | `CP5 Pallet (760×1140mm) — Size & Specs` |
| 11 | `/cp6-pallets` | CP6 pallet size | Spec | `CP6 Pallet (1200×1000mm) — Size & Specs` |
| 12 | `/cp7-pallets` | CP7 pallet size | Spec | `CP7 Pallet (1300×1100mm) — Size & Specs` |
| 13 | `/cp8-pallets` | CP8 pallet size | Spec | `CP8 Pallet (1140×1140mm) — Size & Specs` |
| 14 | `/cp9-pallets` | CP9 pallet size | Spec | `CP9 Pallet (1140×1140mm) — Size & Specs` |
| 15 | `/plywood-pallet` | plywood pallet / splinter free pallet | Material | `Plywood Pallets — Splinter-Free, Export Grade` |
| 16 | `/nz-pine` | pine wood pallet / softwood export pallet | Material | `NZ Pine Pallets — Export Grade Softwood` |
| 17 | `/jungle-wood` | jungle wood pallet | Material | `Jungle Wood Pallets — Density & Load Capacity` |
| 18 | `/press-wood-pallet` | press wood pallet / nestable pallet | Type | `Press Wood Pallets — Nestable & Export Ready` |
| 19 | `/molded-pallets` | moulded pallet / moulded wood pallet | Type | `Moulded Pallets — Nestable, One-Piece Design` |
| 20 | `/reusable-collar` | pallet collar / collar pallet box | Accessory | `Pallet Collars — Reusable Collar Boxes` |
| 21 | `/collapsible-reusable` | collapsible pallet box / foldable pallet | Type | `Collapsible Pallet Boxes — Foldable & Reusable` |
| 22 | `/metal-pallets` | metal pallet / steel pallet | Material | `Metal Pallets — Steel & Galvanised, Rackable` |

### 1.1 The rules this map encodes

1. **Only `/wooden-pallets` carries the broad head term.** No sub-type page may target "wooden pallet manufacturer" as its primary.
2. **"Manufacturer in Mumbai" comes out of 21 of the 22 titles.** It goes in the H2 and body copy instead, where it still signals locality without making every page a duplicate intent signal.
3. **Dimensions go into the title where known** — this is what the winning reference pages do (Cincinnati Pallet: `Euro Pallet (EUR / EPAL 1200 × 800 mm)`), and it is the differentiator no Indian competitor uses.
4. **"| Wooden Pallets | Europack" boilerplate is removed.** It consumed 25+ characters on every page and caused the truncation currently visible in results.
5. **Every title ≤60 characters.** Current titles run 62–71 and truncate.

### 1.2 Where the dimensions come from

Every dimension in the table above was read from that page's own `subTitle` in `productsData.ts`. None came from general knowledge of the CP standard — a published dimension is a commercial commitment, and the repo is the only source treated as authoritative here.

**Correction (20 Sep 2026):** an earlier revision of this section claimed CP2, CP4, CP5, CP6, CP7 and CP8 had no dimension recorded in the repo. That was wrong — all six carry one. They are now in the titles, in the same form as CP1 and CP3:

| Page | Repo `subTitle` | Title |
|---|---|---|
| `/cp2-pallets` | `800 × 1200 mm` | `CP2 Pallet (800×1200mm) — Size & Specs` |
| `/cp5-pallets` | `760 × 1140 mm` | `CP5 Pallet (760×1140mm) — Size & Specs` |
| `/cp6-pallets` | `1200 × 1000 mm (Double)` | `CP6 Pallet (1200×1000mm) — Size & Specs` |
| `/cp7-pallets` | `1300 × 1100 mm` | `CP7 Pallet (1300×1100mm) — Size & Specs` |
| `/cp8-pallets` | `1140 × 1140 mm (Drilled)` | `CP8 Pallet (1140×1140mm) — Size & Specs` |

Adding the dimension also replaces the trailing `— Size, Specs & Chemical Use`, which all six shared and which therefore distinguished none of them.

**`/cp4-pallets` is deliberately unchanged and still reads `CP4 Pallet — Size, Specs & Chemical Use`.** Its repo `subTitle` is `1140 × 1140 mm (Peripheral)`, which conflicts with the CP standard's 1100 × 1300 mm for CP4. The owner is confirming which is correct. Do not publish either figure until that comes back; then apply it in the same form as the five above.

**Open item — CP3, CP8 and CP9 all record 1140 × 1140 mm.** Their titles stay distinct on the CP number, but three pages now publish the same dimension, so the dimension alone no longer separates them in a SERP. Each page's own differentiator — container-optimised, drilled for drum discharge, full peripheral base — carries that load in the H1 and spec table instead. Worth confirming with the owner that all three genuinely share the footprint.

---

## PART 2 — WHAT ELSE EACH PAGE NEEDS

Retitling alone stops the cannibalisation but does not win the query. Each page also needs:

### 2.1 A real spec table (highest value)

Every page winning a pallet spec query in Google is built around a dimensions table — CHEP, Cargoson, Cincinnati Pallet, EPAL, 1001 Pallets. **No Indian manufacturer page found in research carries one.** They use bullets or prose.

The existing table on these pages is broken. On `/cp1-pallets` its rows read:

```
Entry Type      | ISPM-15 Compliant      ← not an entry type
Surface Finish  | Peripheral Deck        ← not a finish
Construction    | Chemical Ind. Standard ← not a construction
```

Labels and values are mismatched, and there are **no dimensions and no load capacity** — the two facts every pallet buyer searches for.

Required rows (omit any with no source, never write "N/A" or "Varies"):

Dimensions (L × W) · Height · Entry type · Construction · Deck boards top/bottom · Timber · Static load · Dynamic load · Racking load · Unladen weight · Moisture content · Treatment · Marking · Standard/certification · Typical applications

Build one reusable `SpecTable.tsx`; put the spec data with the product in `productsData.ts`. Real semantic `<table>` with `<caption>` and `<th scope="row">` — Google parses tables, not styled div grids.

### 2.2 H1 carrying the distinct term

Same principle as the title. `/cp3-pallets` H1 becomes `CP3 Pallet — 1140 × 1140 mm`, not `CP3 Pallet Manufacturer`.

**Note the H1 bug before fixing:** it is not string concatenation. At `ProductSubDetailClient.tsx:127` it is `{product.name}` followed by `<span className="block">{product.subTitle}</span>` *inside* the same `<h1>`. It renders correctly and only the extracted text breaks — which is what Google, screen readers and the SERP snippet consume. Fix by moving the span **outside** the `<h1>`, not by adding a separator.

**Also fix the factual error:** `productsData.ts:36` gives `/four-way-pallet` the subTitle `"Uni-directional Entry"` while its own spec bullet reads `"All-Side Forklift Entry"`. Four-way entry is multi-directional by definition. The page contradicts itself. Audit the other 114 subTitles for the same class of error and list everything you change.

### 2.3 Product + FAQPage + BreadcrumbList schema

None of these pages carry any. Generate `additionalProperty` from the same spec object that renders the table, and FAQPage from the same array that renders the visible FAQs — never hand-duplicate, they will drift.

FAQPage requires the accordion fix first: `TechFAQ.tsx:107` uses `{open === i && (...)}`, so only the default-open first answer is in the DOM. Every Q&A in the schema must be visible on the page.

### 2.4 Internal linking that expresses the hierarchy

- `/wooden-pallets` is the hub. It links down to all 22, grouped: **by standard** (CP series) · **by entry** (two-way, four-way) · **by material** (hardwood, NZ pine, jungle wood, plywood, metal) · **by type** (moulded, press wood, collapsible, collars).
- Every sub-type page links back up to `/wooden-pallets` with anchor text "wooden pallets", reinforcing which page owns the head term.
- Related sub-types cross-link where a buyer would genuinely compare them (two-way ↔ four-way, hardwood ↔ NZ pine).
- Anchor text varies naturally. Identical anchors repeated site-wide are a footprint.

---

## PART 3 — VERIFICATION

1. **No two pages share a primary target.** Print the title of all 22 and confirm each is distinct and ≤60 chars.
2. **`/wooden-pallets` is the only page whose title contains the bare phrase "Wooden Pallet Manufacturer".**
3. **Spec tables** render on all 22 with at minimum Dimensions, Entry type, Timber, Static load, Treatment — or a report line naming exactly what was missing and why.
4. **One `<h1>` per page**, no concatenation in extracted text, `×` not `x`.
5. **`/four-way-pallet`** no longer says "Uni-directional".
6. **Schema** — Product + FAQPage + BreadcrumbList on all 22, zero errors in Google's Rich Results Test.
7. **FAQ answers** all present in `curl` output, not just the first.
8. **No fabricated data** — every dimension and load rating traces to the repo or an owner-supplied value. List every gap.
9. **No new URLs.** Sitemap count unchanged, still zero doorway slugs.
10. **Build** — `npm run build` exit 0, `npx tsc --noEmit` exit 0.
11. **Mobile** — 3 pages at 375px, tables scroll rather than overflow.

---

## PART 4 — WHAT NOT TO DO

- **Do not create new pages.** This task retargets 22 existing ones. No city pages, no CP hub, no comparison pages — those are deferred.
- **Do not invent dimensions, load ratings, deck counts or prices.** Only CP4's dimension is genuinely unresolved; it stays unpublished until the owner confirms it.
- **Do not put "Manufacturer in Mumbai" back into sub-type titles.** That is the cannibalisation being removed.
- **Do not consolidate or delete pages.** One page per real sub-type is the correct architecture and is what ranks.
- **Do not keyword-stuff** the new titles to cover more terms. One target per page is the whole point.
- **Do not touch `server/`.** **Do not push or deploy.**

---

## PART 5 — OWNER TASKS (not developer tasks)

1. **Confirm CP4's dimension.** The repo records 1140 × 1140 mm; the CP standard says 1100 × 1300 mm. One title and one spec table are blocked on this. *(The other five CP dimensions were in the repo all along — an earlier revision of this task wrongly listed them as missing. See §1.2.)*
2. **Confirm that CP3, CP8 and CP9 really do share 1140 × 1140 mm**, as the repo states.
3. **Supply load ratings per pallet type** — static, dynamic, racking.
4. **Get listed on the directories.** IndiaMART, JustDial, TradeIndia and ExportersIndia hold roughly half of page-one slots for these queries and currently outrank europackindia.com. You cannot beat them everywhere; being listed is how you occupy those slots rather than losing them. All products listed individually, photos, kept active, NAP identical to the site.
5. **Google Business Profile** — for "near me" searches this outweighs every page on the site. Claim, verify, set category, add all service areas.
6. **Real product photography** — one clear photo per pallet type, plus the IPPC stamp. Real photos are the cheapest signal that these pages aren't machine-made, which matters more than usual for a site recovering from a doorway-page penalty.
