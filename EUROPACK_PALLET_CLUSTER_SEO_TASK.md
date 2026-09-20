# TASK: Pallet Cluster SEO Rebuild — Specs, Comparisons, Pricing & 5-City Coverage

**Repo:** `~/Desktop/Europack` · **Branch to create:** `seo/pallet-cluster-rebuild`
**Scope:** `client/` only. Do not touch `server/`.
**Prerequisites:** `seo/remove-doorway-pages` merged. `seo/product-page-local-relevance` merged or in progress.
**Researched against live Google India SERPs and the live codebase, 20 September 2026.**

---

## PART 0 — READ THIS ENTIRE SECTION BEFORE WRITING ANY CODE

### 0.1 What this task is

Europack manufactures wooden pallets in many sub-types — CP1 through CP9, Euro, four-way, two-way, hardwood, NZ pine, jungle wood, plywood, press-wood, moulded, heavy-equipment skids — and serves **five real regions**: Mumbai/Navi Mumbai, Vadodara, Pune, Jamshedpur and Hosur.

Buyers search in wildly different ways. One searches `wooden pallet manufacturer Mumbai`. Another searches `CP3 pallet size`. Another `4 way vs 2 way pallet`. Another `wooden pallet price India`. Another `pallets for warehouse storage`. Another just `pallet near me`. Today Europack ranks for almost none of these.

This task makes the existing pallet pages competitive across that whole intent spectrum — **without creating new templated pages.**

### 0.2 The hard constraint

This site was algorithmically suppressed for publishing **7,700 auto-generated doorway pages** (`{product}-{intent}-{location}`). Those have been deleted and 301'd on a previous branch. Recovery is in progress and fragile.

**Therefore: this task creates at most 10 new pages, all hand-written, all substantively different from one another.** Any instinct to generate pages programmatically — per city, per product×city, per sub-type×intent — is the exact failure mode being recovered from. If you find yourself writing a loop that emits pages, stop.

### 0.3 What the research actually found

I researched three query clusters across Google India. Summary of what ranks:

**Directories own roughly half of everything.** Across ~82 sampled result slots, 40–45 were IndiaMART, TradeIndia, JustDial, ExportersIndia, Dial4Trade or OLX. Share by intent: second-hand ~80%, seaworthy/shrink ~65%, "near me" ~55%, price ~45%, bulk ~35%, **use-case ~20%**.

**Conclusion: Europack cannot beat the directories everywhere and should not try.** The strategy is to be *listed on* the directories (owner task, §12) while *owning* the clusters where directories are weak:

| Intent cluster | Directory grip | Verdict |
|---|---|---|
| Use-case ("pallets for warehouse storage", "heavy machinery pallet") | ~20% | **Attack — best opening** |
| Spec/dimension ("CP3 pallet size", "euro pallet 1200x800") | low; won by reference pages | **Attack — no Indian competitor** |
| Comparison ("4 way vs 2 way", "pine vs hardwood") | ~0%; won by US blogs | **Attack — zero Indian competition** |
| Price ("wooden pallet price India") | ~45% | **Attack — two guides beat IndiaMART** |
| Bulk/export supply | ~35% | Attack via product pages |
| "Near me" / proximity | ~55% | Partial — GBP matters more |
| Second-hand | ~80% | **Ignore entirely** |

**Spec tables are the single biggest differentiator.** Every page winning a spec/dimension query is built around a dimensions table — CHEP, Cargoson, Cincinnati Pallet, 1001 Pallets, EPAL. Meanwhile *no Indian manufacturer page found in the research carries a real spec table*; they all put specs in bullets or prose. A manufacturer product page carrying a genuine spec table is a hybrid nobody in this market is shipping.

**Comparison queries have zero Indian competition.** `4 way vs 2 way pallet` returns only US manufacturer blogs (iGPS, Conner Industries, PalletOne, Kamps). Conner's winner is ~850 words with no table and two diagrams. `pine vs hardwood pallet` is the same story. For the India-specific jungle wood vs pine question, the only competitor is hemantwoodenpackaging.com with a ~320-word page, no title tag, no table, no FAQ, no schema.

**Published pricing beats directories and almost nobody does it.** Two sites outrank IndiaMART on price queries — benz-packaging.com (a ~3,000-word guide with ₹ price-band tables and FAQ) and plywood-india.com — purely because they publish indicative ranges with disclaimers. Every other manufacturer gates price behind an enquiry form.

**On city pages — what actually ranks is a product page with the city as a modifier**, e.g. `/wooden-pallets-manufacturers-in-pune.html`, not a standalone "we serve Pune" page. Winners are single substantive pages per city, not matrices. Two competitors ranking on thin city grids (Shanti Packwell, a Delhi company templating `/{city}/product/{product}`; Choudhary Wooden Packers with state pages) are using precisely the pattern that penalised Europack — **do not copy them.**

**Two different orderings matter here — do not confuse them.**

*SEO opportunity* (how easy each SERP is to win):
- **Hosur** — thinnest SERP found. Almost pure directory, plus one local sawmill site and one out-of-town Wix *blog post* holding position. Easiest win.
- **Jamshedpur** — directory-dominated. The only credible local site (Aarisha Packaging, Adityapur) does **corrugated only, no pallets or crates**. Open field.
- **Navi Mumbai** — directory-heavy (TradeIndia ×3, IndiaMART, ExportersIndia) with weak real-manufacturer competition; only atozjantapackaging.in is a substantive local site. Note that Skylar Impex runs a *locality*-level page (`/wooden-pallets-manufacturer-in-taloja/`), so estate-level targeting works in this market.
- **Vadodara** — moderate; mostly timber merchants and IndiaMART microsites.
- **Pune** — genuinely contested. Eight-plus established local manufacturer sites with real Chakan/PCMC content, and directories are *losing* to them. Hardest; expect slow progress.

*Business priority* (the owner's stated order, which governs build sequence):
**Mumbai → Vadodara → Navi Mumbai → Pune → Jamshedpur → Hosur.**

These two orderings disagree, and that is fine. Build in **business-priority order** (§13) because those are the markets that actually convert. But set expectations accordingly: Mumbai, Vadodara and Pune are the hardest SERPs of the six, so the first pages shipped will take the longest to rank, while Hosur and Jamshedpur — built last — may rank fastest. Do not read early flat results on Mumbai as the approach failing.

### 0.4 Current state — verified in the codebase

All 12 pallet sub-type pages audited render 5,700–5,950 words with an identical 17-H2 skeleton.

**Good news, verified:** only **16%** of substantive sentences are shared between `/cp1-pallets`, `/cp3-pallets`, `/euro-pallets` and `/hardwood-pallet`. The prose is genuinely differentiated. These are **not** doorway pages and must not be deleted.

**The real problems:**

1. **The spec table exists but is broken.** Every page has exactly one `<table>`. On `/cp1-pallets` its rows are:
   ```
   Construction          | Chemical Industry Standard
   Surface Finish        | Peripheral Deck
   Structural Standard   | Safe for Bagged Goods
   Entry Type            | ISPM-15 Compliant
   Compliance            | ISPM-15 / IPPC
   ```
   The labels and values are **mismatched** — "Entry Type" is not "ISPM-15 Compliant", "Surface Finish" is not "Peripheral Deck". Generic feature bullets have been pushed into a table against the wrong labels. Worst of all: **there are no dimensions and no load capacity** — the two facts every pallet buyer searches for. This is the highest-value fix in the document.

2. **H1 concatenation bug on every page.** Product name and tagline are joined with no separator: `CP1 Pallet1000 x 1200 mm`, `Euro Pallets800 x 1200 mm Standard`, `Four Way PalletsUni-directional Entry`, `Jungle WoodHardwood Density`, `Wooden CratesOpen-Slat Protection`, `Shrink WrappingHeavy-Duty Heat Shrink`. This affects all ~128 flat product routes.

   Note also: `/four-way-pallet` H1 reads **"Four Way Pallets — Uni-directional Entry"**, which is factually wrong. Four-way entry is *multi*-directional by definition; uni-directional describes two-way. **Fix the copy, not just the spacing.**

3. **Title tags truncate.** Pattern is `{Product} Manufacturer in Mumbai | Wooden Pallets | Europack` — 62–71 chars, cutting off mid-word in results. The middle segment ("Wooden Pallets", "Plywood / Wood Material", "Molded Pallets") is category boilerplate consuming characters that should carry the dimension or the buying term.

4. **No Product, FAQPage, BreadcrumbList or LocalBusiness schema** anywhere. Only a site-wide `WebSite` + `Organization` `@graph`.

5. **FAQ answers are not server-rendered.** `components/shared/TechFAQ.tsx:107` and `components/blog/BlogFAQ.tsx:60` use `{open === i && (...)}`, so only the default-open first answer reaches the HTML. (If the `seo/product-page-local-relevance` branch has already fixed this, skip — verify first.)

6. **Actual prose volume is low relative to word count.** 5,800 words but only ~19 sentences over 45 characters. The bulk is card grids, labels and repeated chrome. The pages look long to a word counter and thin to a reader.

---

## PART 1 — WORKSTREAM A: FIX THE SPEC TABLES (do this first)

**This is the highest-value work in the document.** It is the one thing no Indian competitor does, and it directly targets the spec/dimension queries where there is no local competition.

### 1.1 The table schema

Every pallet sub-type page gets a real technical specifications table with these rows, in this order:

| Row label | Example value | Notes |
|---|---|---|
| Dimensions (L × W) | 1200 × 1000 mm | **Mandatory.** Also give inches in parentheses. |
| Height | 144 mm | |
| Entry type | 4-way / 2-way | Must be factually correct |
| Construction | Block / Stringer / Perimeter base | |
| Deck boards (top / bottom) | 7 / 5 | |
| Timber | NZ Pine / Hardwood / Jungle wood | |
| Static load capacity | up to 3,000 kg | Already stated elsewhere on site |
| Dynamic load capacity | up to 1,500 kg | Already stated elsewhere on site |
| Racking load capacity | — | Omit if unknown |
| Unladen weight | — | Omit if unknown |
| Moisture content | ≤ 20% | Site already claims "low moisture content" |
| Treatment | ISPM-15 heat treated (56°C core, 30 min) | |
| Marking | IPPC stamp, country/treatment/facility code | |
| Standard / certification | ISPM-15, ISO 9001:2015 | |
| Typical applications | Chemical drums, bagged goods | |

### 1.2 Where the values come from — CRITICAL

**Source every value from data already in the repo or already published on the site.** Dimensions for several types are already in the H1 strings (CP1 1000 × 1200, CP3 1140 × 1140, CP9 1140 × 1140, Euro 800 × 1200). Load capacities (3,000 kg static / 1,500 kg dynamic) already appear in `/wooden-pallets` body copy.

**Where a value is not already known: leave the row out and list it in your final report for the owner to supply.**

Do **not** fill gaps from general knowledge of pallet standards. A published spec is a commercial commitment — if Europack's CP4 deck-board count differs from the ISO norm and the page says otherwise, that is a real business problem, not an SEO one. An incomplete honest table outranks a complete invented one, and is the only acceptable option here.

### 1.3 Implementation

- Build one reusable `components/products/SpecTable.tsx` taking a typed spec object; do not hand-write 12 tables.
- Define the spec data per product in the existing product data structure, so specs live with the product, not in the component.
- Render as a real semantic `<table>` with `<caption>`, `<th scope="row">` — not a styled `<div>` grid. Google parses tables; it does not reliably parse div grids.
- Rows with no value must be **omitted entirely**, never rendered as "N/A", "—", "Contact us" or "Varies".
- Must be readable at 375px width — allow horizontal scroll on the table wrapper rather than shrinking text below 14px.

### 1.4 Acceptance

For every pallet sub-type page: `curl -s localhost:3000/cp1-pallets | grep -i "1200"` returns the dimension, and the table contains at minimum Dimensions, Entry type, Timber, Static load, Treatment — or a report line explaining precisely which are missing and why.

---

## PART 2 — WORKSTREAM B: FIX THE H1 BUG SITE-WIDE

Affects all ~128 flat product routes.

1. Find the component joining product name + tagline into one `<h1>`.
2. Separate them: `<h1>{name}</h1>` followed by `<p class="tagline">{tagline}</p>`.
3. Where the tagline is a dimension (`1000 x 1200 mm`), fold it into the H1 properly with an em-dash: `<h1>CP1 Pallet — 1000 × 1200 mm</h1>`. Dimensions in the H1 is exactly what the winning reference pages do (Cincinnati Pallet: `Euro Pallet (EUR / EPAL 1200 × 800 mm)`).
4. Use the proper multiplication sign `×` (U+00D7), not the letter `x`.
5. **Fix the factual error** on `/four-way-pallet`: "Uni-directional Entry" → "Four-Way Entry". Audit the other taglines for similar errors and report anything you change.
6. Verify exactly one `<h1>` per page afterwards.

---

## PART 3 — WORKSTREAM C: REWRITE TITLE TAGS

Drop the category boilerplate middle segment. Target ≤ 60 characters.

**Pattern for sub-type pages:** `{Type} ({key dimension}) — Size, Specs & Load | Europack`

| Page | Current (truncating) | New |
|---|---|---|
| `/cp1-pallets` | CP1 Pallet Manufacturer in Mumbai \| Wooden Pallets \| Europack | `CP1 Pallet (1000×1200mm) — Size, Specs & Load \| Europack` |
| `/cp3-pallets` | CP3 Pallet Manufacturer in Mumbai \| Wooden Pallets \| Europack | `CP3 Pallet (1140×1140mm) — Size, Specs & Load \| Europack` |
| `/euro-pallets` | Euro Pallets Manufacturer in Mumbai \| Wooden Pallets \| Europac… | `Euro Pallet (1200×800mm) — EPAL Size & Specs \| Europack` |
| `/four-way-pallet` | Four Way Pallets Manufacturer in Mumbai \| Wooden Pallets \| Eur… | `Four-Way Entry Pallets — Sizes & Load Capacity \| Europack` |
| `/two-way-pallet` | Two Way Pallets Manufacturer in Mumbai \| Wooden Pallets \| Euro… | `Two-Way Entry Pallets — Sizes & Load Capacity \| Europack` |
| `/hardwood-pallet` | Hardwood Pallets Manufacturer in Mumbai \| Wooden Pallets \| Eur… | `Hardwood Pallets — Strength, Sizes & Uses \| Europack` |
| `/nz-pine` | New Zealand Pine Manufacturer in Mumbai \| Plywood / Wood Mater… | `NZ Pine Pallets — Export Grade Softwood \| Europack` |
| `/jungle-wood` | Jungle Wood Manufacturer in Mumbai \| Plywood / Wood Material \|… | `Jungle Wood Pallets — Density, Load & Cost \| Europack` |
| `/plywood-pallet` | Plywood Pallets Manufacturer in Mumbai \| Wooden Pallets \| Euro… | `Plywood Pallets — Splinter-Free, Export Grade \| Europack` |
| `/heavy-equipment-skid` | Heavy Equipment Transport Skid Manufacturer in Mumbai \| Wooden… | `Heavy Equipment Skids — Machinery Transport \| Europack` |
| `/press-wood-pallet` | Press Wood Pallet Manufacturer in Mumbai \| Molded Pallets \| Eu… | `Press Wood Pallets — Nestable, Export Ready \| Europack` |

Apply the same de-boilerplating logic to the remaining sub-type pages (`/cp2`–`/cp8`, `/molded-pallets`, `/hydraulic-molded-pallet`, `/two-way-paper-pallet`, `/honeycomb-paper-pallet`, `/disposable-paper-pallet`, and the plastic/metal pallet pages). List every title you change in your report.

**Meta descriptions:** rewrite to 150–160 chars, leading with the dimension and load capacity, ending with a reason to click. No keyword stuffing, no ✓ symbols.

---

## PART 4 — WORKSTREAM D: SCHEMA

### 4.1 Product schema — every pallet sub-type page

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "CP1 Pallet",
  "description": "ISPM-15 certified CP1 chemical pallet, 1000 × 1200 mm, manufactured in Mumbai and Vadodara.",
  "category": "Wooden Pallets",
  "brand": { "@type": "Brand", "name": "Europack" },
  "manufacturer": { "@id": "https://europackindia.com/#organization" },
  "areaServed": [
    { "@type": "City", "name": "Mumbai" },
    { "@type": "City", "name": "Navi Mumbai" },
    { "@type": "City", "name": "Vadodara" },
    { "@type": "City", "name": "Pune" },
    { "@type": "City", "name": "Jamshedpur" },
    { "@type": "City", "name": "Hosur" }
  ],
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Dimensions", "value": "1000 × 1200 mm" },
    { "@type": "PropertyValue", "name": "Entry Type", "value": "4-way" },
    { "@type": "PropertyValue", "name": "Static Load Capacity", "value": "3000 kg" },
    { "@type": "PropertyValue", "name": "Treatment", "value": "ISPM-15 heat treated" }
  ]
}
```

**Generate `additionalProperty` from the same spec object that renders the table** (§1.3), so the two can never drift. No `offers` block unless a real price is published on that page.

### 4.2 FAQPage schema

Generate from the same array that renders the visible FAQs. Every Q&A in the schema must be visible in the HTML — which is why the accordion fix (§0.4 item 5) is a prerequisite.

### 4.3 BreadcrumbList

`Home → Products → Wooden Pallets → {Sub-type}`.

### 4.4 LocalBusiness — once, site-wide, in the root layout

Use the real NAP already on the site:

```json
{
  "@type": "LocalBusiness",
  "@id": "https://europackindia.com/#localbusiness",
  "name": "Europack",
  "url": "https://europackindia.com",
  "telephone": "+91-98337-76290",
  "email": "sales@europackindia.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "101, ML Spaces, Railway Station Rd, Navpada, Kamala Nagar",
    "addressLocality": "Vile Parle West, Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400056",
    "addressCountry": "IN"
  },
  "areaServed": [
    { "@type": "City", "name": "Mumbai" },
    { "@type": "City", "name": "Navi Mumbai" },
    { "@type": "City", "name": "Thane" },
    { "@type": "City", "name": "Vadodara" },
    { "@type": "City", "name": "Pune" },
    { "@type": "City", "name": "Jamshedpur" },
    { "@type": "City", "name": "Hosur" }
  ]
}
```

**The NAP must match Google Business Profile, IndiaMART and JustDial character for character.** If you find a mismatch anywhere in the repo, stop and flag it rather than guessing.

---

## PART 5 — WORKSTREAM E: THE CP PALLET HUB PAGE (new page 1 of 9)

**The single clearest gap the research found.** Nobody — Indian or European — publishes a proper consolidated CP1–CP9 reference. Foresco ranks with ~650 words and no table. epalpalletindia.com ranks with bullets.

**URL:** `/cp-pallets`
**Title:** `CP Pallets CP1–CP9 — Sizes, Specs & Chemical Use | Europack`
**H1:** `CP Pallets — CP1 to CP9 Chemical Pallet Standards`

**Structure:**

1. **What a CP pallet is** — the chemical industry pallet pool, who governs the standard, why chemical shippers use them. ~200 words.
2. **The CP1–CP9 comparison table** — the centrepiece. Nine rows:

   | Type | Dimensions (mm) | Entry | Construction | Typical use |
   |---|---|---|---|---|

   Populate from the nine existing `/cp1-pallets`…`/cp9-pallets` pages. **Every row's "Type" cell links to that sub-type page.** Any cell you cannot source: omit the column entirely rather than guessing — do not mix real and assumed values in one table.
3. **How to choose** — decision guidance: drums vs bags vs IBCs, single-trip vs pooled, racking considerations. ~300 words.
4. **ISPM-15 and CP pallets** — link to the ISPM-15 content.
5. **FAQ** — 6–8 questions with FAQPage schema.
6. **CTA** to `/contact`.

Target 1,200–1,800 words. Must link down to all nine sub-type pages; each sub-type page links back up to the hub.

---

## PART 6 — WORKSTREAM F: TWO COMPARISON PAGES (new pages 2–3)

Both SERPs have **zero Indian competition** and thin incumbents.

### 6.1 `/four-way-vs-two-way-pallets`

- **Title:** `Four-Way vs Two-Way Pallets — Which to Choose | Europack`
- **H1:** `Four-Way vs Two-Way Pallets: What's the Difference?`
- Incumbents (Conner Industries, iGPS) win with ~850 words and entry-point diagrams, **no table**.
- **Beat them with:** the same clarity *plus* a decision table (forklift access, pallet-jack compatibility, racking, cost band, typical use, export suitability) *plus* two original labelled SVG diagrams showing entry points. Diagrams must be drawn as inline SVG — do not use stock images.
- 1,000–1,400 words. Links to `/four-way-pallet` and `/two-way-pallet`.

### 6.2 `/pallet-wood-types-compared`

- **Title:** `Jungle Wood vs Pine vs Hardwood Pallets — Compared | Europack`
- **H1:** `Which Wood Is Best for Pallets? Jungle Wood, NZ Pine, Hardwood & Plywood Compared`
- The India-specific version of this query is barely contested — only a ~320-word competitor page with no title tag, no table, no schema.
- **Beat it with** a four-column comparison: relative density, load behaviour, cost band (relative, not ₹), ISPM-15 behaviour, moisture/warping, splinter risk, typical use, availability.
- 1,000–1,400 words. Links to `/jungle-wood`, `/nz-pine`, `/hardwood-pallet`, `/plywood-pallet`.

**Both pages:** genuine engineering judgement, not marketing. A comparison that concludes "ours is best in every column" reads as an ad and will not earn links or rankings. Where jungle wood is the better economic choice, say so.

---

## PART 7 — WORKSTREAM G: THE PRICING GUIDE (new page 4)

**Highest-risk, highest-reward page. Read §7.3 before starting.**

Two competitors outrank IndiaMART on price queries purely by publishing indicative bands with disclaimers. Every other manufacturer gates price entirely.

- **URL:** `/wooden-pallet-price-guide`
- **Title:** `Wooden Pallet Price in India — Size-Wise Rates | Europack`
- **H1:** `Wooden Pallet Price in India: What Drives the Cost`

**Structure:** what determines price (timber, size, load rating, heat treatment, order volume, delivery distance) → indicative price bands by category → why prices vary → when a cheaper pallet costs more → FAQ → CTA for a real quote.

### 7.3 The pricing constraint — non-negotiable

**Do not invent a single number.**

Publish indicative bands **only** where the owner has supplied real figures. If no figures are supplied, build the entire page structure with the price table present but empty, mark it clearly `TODO: owner to supply`, **do not publish the page**, and list it in your report as blocked pending real pricing.

A wrong published price is a commercial liability far exceeding any SEO gain. Competitor numbers found in research are *their* prices and must never be presented as Europack's.

Every band must carry a visible disclaimer: indicative, ex-works, varies by specification and volume, valid as of {month year}, not a quotation.

---

## PART 8 — WORKSTREAM H: SIX CITY PAGES (new pages 5–10)

**This is the part most likely to go wrong. Read §8.1 twice.**

### 8.1 The rules

- **Exactly six pages. One per city. Hand-written. No exceptions.**
- **No generation.** No loop, no array of cities mapped to a template, no shared body with a swapped city name. If two of these five pages could be produced by find-and-replace, both are wrong.
- **Minimum 60% unique body content per page.** The industrial context, client sectors, estates named and logistics reality genuinely differ per city — that is what makes these pages legitimate rather than doorways.
- **Mumbai and Navi Mumbai are the highest-risk pair in this set.** They are adjacent markets and the easiest two pages to accidentally write as near-duplicates. They must be pulled apart deliberately: Mumbai is the head-office/island-city page (Western and Central Line, pharma, BKC/Andheri MIDC, Mumbai Port); Navi Mumbai is the estates-and-port page (Taloja MIDC, TTC Industrial Area, Rabale, Mahape, Vashi, JNPT/Nhava Sheva, chemicals and engineering). Different estates, different sectors, different port. If the two pages read as interchangeable, both are wrong — see verification check 7.
- **Only claim what is true.** If Europack has no facility in Hosur and serves it from elsewhere, the page says so plainly. Fabricated local presence is both a trust problem and a ranking risk.
- If the owner has not confirmed the nature of presence in a city (own plant / partner unit / delivery only), **build the page, leave that section marked TODO, and flag it.** Do not guess.

### 8.2 URL and title pattern

Research finding: what ranks is a **product page with the city as modifier**, not a "we serve X" page. So:

Build in this order (business priority):

| # | City | URL | Title |
|---|---|---|---|
| 1 | Mumbai | `/wooden-pallets-mumbai` | `Wooden Pallet Manufacturer in Mumbai — ISPM-15 \| Europack` |
| 2 | Vadodara | `/wooden-pallets-vadodara` | `Wooden Pallet Manufacturer in Vadodara & GIDC \| Europack` |
| 3 | Navi Mumbai | `/wooden-pallets-navi-mumbai` | `Wooden Pallet Manufacturer in Navi Mumbai & Taloja \| Europack` |
| 4 | Pune | `/wooden-pallets-pune` | `Wooden Pallet Manufacturer in Pune & Chakan MIDC \| Europack` |
| 5 | Jamshedpur | `/wooden-pallets-jamshedpur` | `Wooden Pallet Manufacturer in Jamshedpur \| Europack` |
| 6 | Hosur | `/wooden-pallets-hosur` | `Wooden Pallet Manufacturer in Hosur & SIPCOT \| Europack` |

**A note on the apparent contradiction with the doorway cleanup:** the deleted pages were 7,700 machine-generated `{product}×{location}×{intent}` permutations across 154 localities with no unique content. These are six hand-written pages for six regions where the business genuinely operates, each with distinct industrial context. That is the same distinction as between one honest shop sign and seven thousand fly-posters.

**Risk control given the penalty history:** do not ship all six in one deploy. Ship **Mumbai and Vadodara first** (the two the owner cares most about), let them sit for 3–4 weeks, confirm in Search Console that they index cleanly and nothing regresses, then ship Navi Mumbai and Pune, then Jamshedpur and Hosur. Six new location-shaped URLs appearing at once on a site that was just penalised for location pages is an avoidable signal.

### 8.3 Required content per city page

Each page: 900–1,400 words, H1 with city, at least three H2s carrying the city or a named local estate, spec table linked from the pallet cluster, FAQ with schema, LocalBusiness/Product schema, and a real CTA.

**1. Mumbai** — head office at Vile Parle West; lead with that, it is the strongest local trust signal on the site. Western Line (Andheri, Andheri MIDC, SEEPZ, BKC, Goregaon, Malad, Borivali, Vile Parle), Central Line (Dadar, Kurla, Ghatkopar, Vikhroli, Bhandup, Mulund), South Mumbai (Fort, Colaba), Thane and Wagle Estate, Bhiwandi warehousing belt, Vasai-Virar. Sectors: pharmaceuticals (Andheri/Vikhroli corridor), chemicals, engineering, e-commerce warehousing (Bhiwandi). Export via Mumbai Port and Sahar air cargo. **Do not cover Navi Mumbai estates on this page** — they belong to page 3.

**2. Vadodara** — GIDC belt: Makarpura, Nandesari, Savli, Halol, Padra, Por, Ranoli, Manjusar, Waghodia. Sectors: chemicals, pharmaceuticals, engineering, plus the Gujarat speciality-chemical base. This is the natural home for CP-series chemical pallets — link the `/cp-pallets` hub prominently from here. Export via Mundra and Hazira.

**3. Navi Mumbai** — the estates-and-port page, deliberately distinct from Mumbai. Taloja MIDC, TTC Industrial Area, Rabale, Mahape, Ghansoli, Airoli, Vashi, Turbhe, Koparkhairane, Belapur, Kharghar, Panvel. Export via **JNPT / Nhava Sheva** — the single biggest differentiator from the Mumbai page; this is where direct-to-port delivery for container stuffing belongs. Sectors: chemicals and pharma at Taloja, engineering and electronics at TTC/Rabale, and third-party logistics warehousing. Note for context: competitors are already targeting this at estate level (Skylar Impex runs a Taloja-specific page), so naming the estates explicitly is expected here, not optional.

**4. Pune** — hardest market; eight-plus established local competitors with real Chakan content, and directories are losing to them. Be genuinely specific or don't bother. Chakan MIDC (~5,000 ha, 750+ industries: Volkswagen, Mercedes-Benz, Bajaj Auto, Mahindra, Tata Motors, Stellantis, JCB, Bosch, SKF, Exide), Talegaon MIDC (Hyundai's ex-GM plant), Ranjangaon MIDC (LG, Whirlpool), Bhosari/Pimpri-Chinchwad MIDC. Needs: export pallets for auto components, heavy seaworthy cases for machine tools and JCB-class equipment, VCI for castings and bearings. Do **not** lead with Hinjewadi — it's IT, low packaging demand.

**5. Jamshedpur** — open field; the only credible local site does corrugated only, no pallets or crates. Adityapur Industrial Area (AIADA/JIADA, Seraikela-Kharsawan) — 1,000+ units, ~28,000 direct employees, largely MSME ancillaries. Ecosystem: Tata Steel, Tata Motors (Telco), Tata Cummins, Tayo Rolls, Tata Growth Shop, plus forging/foundry/fabrication ancillaries. Needs: heavy-duty pallets and seaworthy cases for forgings, castings, auto components; VCI for machined steel. Export routed via Kolkata/Haldia and Paradip.

**6. Hosur** — thinnest SERP of all six; a local sawmill site and one out-of-town blog post currently hold it. SIPCOT Hosur Phases I–II (Zuzuvadi, Mookandapalli), TVS Industrial & Logistics Park, HOSTIA MSME base. Anchors: TVS Motor, Ashok Leyland, Titan, Caterpillar, Ather Energy, Tata Electronics, Schaeffler, Kansai Nerolac, Bata. ~40 km from Bengaluru; functions as Bengaluru's manufacturing overflow. Needs: two-way/four-way pallets for two-wheeler and EV component flow, ESD-safe and export-grade crating for electronics, ISPM-15 pallets for Chennai/Ennore port exports.

**Naming third-party companies:** the anchors above are public industrial facts about each region and may be used to describe the *industrial context* — "Chakan MIDC hosts Volkswagen, Bajaj Auto and Tata Motors". They must **never** be presented or implied as Europack customers unless the owner confirms it in writing. Phrase as context, never as a client list, and never use third-party logos.

---

## PART 9 — WORKSTREAM I: INTERNAL LINKING

Currently each sub-type page has ~23 internal links, mostly an undifferentiated product grid. Make the linking purposeful:

1. **Hub and spoke.** `/wooden-pallets` is the hub; every sub-type links up to it; it links down to all sub-types grouped logically (by standard: CP series · by entry: two-way/four-way · by material: hardwood/pine/plywood/press-wood · by application: skids, heavy equipment).
2. **`/cp-pallets` hub** links to all nine CP pages; each links back.
3. **Comparison pages** link to every sub-type they compare; those sub-types link back to the comparison.
4. **City pages** link to `/wooden-pallets` and to the 2–3 sub-types most relevant to that city's industry (Hosur → two-way/four-way and export crating; Jamshedpur → heavy-duty and skids).
5. **The ~54 real articles** in `src/data/mockBlogs*.ts` get 2–4 contextual links each into the relevant product page, with descriptive anchor text (`our ISPM-15 certified wooden pallets`, never `click here`). Placed in body prose, not a footer block.
6. **Anchor text must vary naturally.** Identical anchor text repeated site-wide is a footprint.

---

## PART 10 — WHAT TO REMOVE

1. **The mismatched spec table rows** (§0.4 item 1) — replaced, not patched.
2. **Category boilerplate from title tags** — "| Wooden Pallets |", "| Plywood / Wood Material |", "| Molded Pallets |".
3. **The factually wrong "Uni-directional Entry"** tagline on `/four-way-pallet`, and any similar errors found.
4. **Repeated vague location boilerplate** — "in Mumbai, Vadodara and across India" appears 6+ times verbatim on some pages. Keep one; replace the rest with specifics or nothing.
5. **Any leftover doorway-era UI** referencing deleted location blogs.
6. **Filler rows** — "N/A", "Varies", "Contact us" in any spec table.

**Do not remove:** the existing long-form product prose (verified 84% unique), the FAQ questions, the images or alt text, or any of the ~128 flat product routes. The URL architecture is already correct — one page per real sub-type is exactly what ranks.

---

## PART 11 — VERIFICATION

```bash
cd client && npm run dev
```

1. **Spec tables** — every pallet sub-type page renders a semantic `<table>` containing at minimum Dimensions, Entry type, Timber, Static load, Treatment. No "N/A"/"Varies" rows. Report lists every value omitted for lack of a source.
2. **H1** — exactly one per page, no concatenation, `×` not `x`, and `/four-way-pallet` no longer says "Uni-directional".
3. **Titles** — all ≤ 60 chars; no category boilerplate. Report lists every title changed.
4. **Schema** — Product + FAQPage + BreadcrumbList per page; LocalBusiness once in layout. Zero errors in Google's Rich Results Test. Every FAQPage Q&A visible in the HTML.
5. **FAQ crawlability** — every answer's text present in `curl` output, not just the first.
6. **New pages** — all render, are linked from the hub, and appear in the sitemap.
7. **Uniqueness gate** — run a similarity check across the six city pages, as a full 6×6 matrix. **Any pair above 40% shared sentences fails**; rewrite before reporting done. Pay particular attention to the **Mumbai ↔ Navi Mumbai** pair, which is the likeliest to fail. Include the matrix in your report.
8. **No fabricated data** — every dimension, load rating, price and client reference traces to something already true in the repo or supplied by the owner. List every gap left open.
9. **Sitemap** — grew by exactly the number of pages actually shipped in this batch, still zero doorway slugs.
10. **Build** — `npm run build` exit 0, `npx tsc --noEmit` exit 0.
11. **Mobile** — screenshot 3 sub-type pages and 2 city pages at 375px; tables scroll rather than overflow.
12. **Internal links** — no orphan among the new pages; every one reachable from `/wooden-pallets` within two clicks.

---

## PART 12 — WHAT NOT TO DO

- **Do not generate pages programmatically.** Ten new pages, written by hand. No city loops, no product×city matrices, no intent templates. This is the failure mode being recovered from.
- **Do not invent specifications, prices, load ratings, MOQs or lead times.** Omit and report.
- **Do not claim facilities, certifications or clients that have not been confirmed.**
- **Do not present third-party companies as Europack customers**, and do not use their logos.
- **Do not publish the pricing page without real owner-supplied figures.**
- **Do not copy competitor thin-page patterns** — Shanti Packwell's `/{city}/product/{product}` grid and Choudhary's state pages currently rank, and are exactly what got this site penalised.
- **Do not keyword-stuff.** Two or three geographic headings per page, not ten.
- **Do not add `offers` to Product schema** without a real published price.
- **Do not delete existing product pages or prose.**
- **Do not touch `server/`.**
- **Do not push or deploy.** Leave the branch local for review.

---

## PART 13 — SEQUENCING

Commit in this order, each independently reviewable:

1. **A** — spec tables (highest value, lowest risk)
2. **B** — H1 fix (site-wide, mechanical)
3. **C** — title tags
4. **D** — schema
5. **E** — CP hub page
6. **F** — two comparison pages
7. **I** — internal linking
8. **H** — city pages, in business-priority order, shipped in three batches, not all at once:
   - **8a — Mumbai + Vadodara.** Ship, then wait 3–4 weeks and confirm clean indexing in Search Console before continuing.
   - **8b — Navi Mumbai + Pune.** Navi Mumbai must pass the Mumbai ↔ Navi Mumbai uniqueness check (§11.7) before it ships.
   - **8c — Jamshedpur + Hosur.**
9. **G** — pricing guide, **only if the owner supplies figures**

Batches 8b and 8c are separate deploys, not separate branches — build all six pages on this branch if you like, but they are released in that order.

If time or budget runs short, **A through D alone are worth shipping** — they fix real defects on 128 existing pages and require no new content.

---

## PART 14 — OWNER TASKS (NOT DEVELOPER TASKS)

Flag these in your report. They matter more than anything above for local search, and no code change substitutes for them.

1. **Google Business Profile** — claim and verify; category Packaging Company / Manufacturer; add all service areas (Mumbai, Navi Mumbai, Thane, Vadodara, Pune, Jamshedpur, Hosur). GBP service areas are the *correct* place for multi-location targeting. Currently 27 reviews at 4.3★ — ask for more, reply to every one, post updates.
2. **Directory listings** — IndiaMART, JustDial, TradeIndia, ExportersIndia hold ~50% of page-one slots and currently outrank europackindia.com. Being listed is not optional; it is where half the market looks. All five products listed individually, with photos, kept active, NAP identical to the site.
3. **Supply real specs** — dimensions, deck counts, load ratings, weights per pallet type. This unblocks the highest-value workstream.
4. **Supply indicative price bands** — unblocks the pricing page, which is a proven directory-beater in this niche.
5. **Confirm presence per city** — own plant, partner unit, or delivery-only, for each of the five regions.
6. **Brand confusion** — `europack.co.in` is a different company ranking for "corrugated boxes manufacturer Mumbai". Worth knowing; it will dilute brand searches and may warrant a trademark conversation.
7. **Real photography** — factory, each pallet type, the ISPM-15 stamp, loading at port. Real photos are the cheapest available signal that these pages are not machine-made, which matters more than usual for a site recovering from a doorway-page penalty.
