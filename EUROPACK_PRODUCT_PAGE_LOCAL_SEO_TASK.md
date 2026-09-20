# TASK: Local-SEO Rebuild of the 5 Target Product Pages

**Repo:** `~/Desktop/Europack` · **Branch to create:** `seo/product-page-local-relevance`
**Scope:** `client/` only. Do not touch `server/`.
**Prerequisite:** the `seo/remove-doorway-pages` branch must be merged first.
**Researched and verified against the live codebase and live competitor SERPs on 20 September 2026.**

---

## 1. WHAT THIS TASK IS, AND WHAT IT IS NOT

**Target terms:** wooden pallets · seaworthy packing · wooden boxes/crates · shrink wrapping · corrugated boxes
**Target geography:** Mumbai, Navi Mumbai, Thane, MMR suburbs, Vadodara / Gujarat GIDC belt

**Set expectations honestly before starting:** on-page work is necessary but not sufficient. For searches like "wooden pallet manufacturer near me", Google's local pack is driven mostly by **Google Business Profile** signals (proximity, reviews, category, activity) and B2B directory presence (IndiaMART, JustDial, TradeIndia). No amount of page editing wins the map pack on its own. What this task *does* win is the **organic blue-link results** beneath the pack, and it makes every other signal work harder. Do not promise or expect a #1 position from this change alone, and note that the site is still recovering from algorithmic suppression — expect movement over 2–4 months, not days.

---

## 2. THE COMPETITIVE BENCHMARK — WHY THEY OUTRANK US TODAY

I analysed the page currently ranking for "wooden pallets manufacturer Mumbai": `nationalwooden.in/mumbai.html`.

| Metric | National Wooden | Europack `/wooden-pallets` |
|---|---|---|
| Word count | **851** | **3,496** |
| "Mumbai" in H1 | yes | **no** |
| Location in H2/H3 headings | **~20 of 28 headings** | **0 of 14** |
| Named local areas | 19 (Andheri, BKC, SEEPZ, Vikhroli, MIDC…) | vague only |
| LocalBusiness schema | **yes** | **no** |
| Product schema | — | **no** |
| FAQPage schema | — | **no** |
| Indicative pricing | **yes** (₹550/piece) | no |
| MOQ stated | **yes** (50 pieces) | in FAQ only, not crawlable |
| Delivery times by zone | **yes** | no |
| Local testimonials | **yes** (3, with area attribution) | no |

**The lesson is not "write more."** Europack's pages are already 4× longer and the content quality is genuinely good — real specs, real certifications, real FAQs. The competitor wins on **specificity and structure**, not volume:

1. Every heading answers "where" as well as "what".
2. Real place names appear in operational context ("pharma companies in Vikhroli and Andheri", "export houses near JNPT"), not as a list.
3. Commercially decisive facts (price from, MOQ, delivery window, payment terms) are visible on the page, not hidden in an accordion.
4. Schema tells Google explicitly that this is a local business selling a product.

Europack has the substance and is missing the signals. That is what this task fixes.

---

## 3. CURRENT STATE — VERIFIED, ALL 5 PAGES

| Page | Title | Len | H1 | Words | Schema | Loc. mentions |
|---|---|---|---|---|---|---|
| `/wooden-pallets` | Wooden Pallets Manufacturer in Mumbai & Vadodara \| ISPM-15 Pallets | 66 | Wooden Pallets Manufacturer | 3,496 | none | 37 |
| `/seaworthy-packing` | Seaworthy Packing in Mumbai & Vadodara \| Export Packaging Solutions | 67 | Seaworthy Packing & Packaging Solutions | 3,651 | none | 49 |
| `/wooden-crates` | Wooden Crates Manufacturer in Mumbai \| Wooden Boxes \| Europack | 62 | **Wooden CratesOpen-Slat Protection** ⚠ | 5,583 | none | 43 |
| `/shrink-wrapping` | Shrink Wrapping Manufacturer in Mumbai \| Special Services \| Europack | 68 | **Shrink WrappingHeavy-Duty Heat Shrink** ⚠ | 5,743 | none | 41 |
| `/corrugated-boxes` | Corrugated Boxes Manufacturer in Mumbai & Vadodara \| Industrial Cartons | 71 | Corrugated Boxes Manufacturer | 3,040 | none | 24 |

**Schema note:** every page carries exactly one `application/ld+json` block — a site-wide `@graph` with `WebSite` + `Organization`. There is **no `Product`, no `FAQPage`, no `LocalBusiness`, no `BreadcrumbList`** on any page.

**Confirmed bugs:**
- `/wooden-crates` and `/shrink-wrapping` H1s are two strings concatenated with no separator. Rendering bug.
- FAQ answers are **not server-rendered.** `components/shared/TechFAQ.tsx:107` and `components/blog/BlogFAQ.tsx:60` both use `{open === i && (...)}`, so only the default-open first answer reaches the HTML. The other ~9 answers per page are invisible to crawlers. Same for `FAQSection.tsx` — check it.
- The phrase `"in Mumbai, Vadodara and across India"` is repeated **6+ times verbatim** on `/wooden-pallets` alone. Repetitive boilerplate, low value.

---

## 4. GLOBAL CHANGES — APPLY TO ALL 5 PAGES

### 4.1 Fix the FAQ accordion so answers are crawlable (**highest value, lowest effort**)

Currently `{open === i && <answer/>}` removes closed answers from the DOM entirely.

Change every FAQ accordion (`components/shared/TechFAQ.tsx`, `components/blog/BlogFAQ.tsx`, `components/layout/FAQSection.tsx`, and any other accordion using this pattern) so that **all answers are always present in the DOM** and only visually collapsed.

Implementation: keep the existing open/close UX and animation, but render the answer unconditionally and control visibility with CSS (e.g. `max-height`/`opacity` transition, or `hidden` attribute toggling) rather than conditional mounting. Add `aria-expanded` on the button and `aria-hidden` on the collapsed panel so accessibility semantics stay correct.

**Acceptance:** `curl -s localhost:3000/wooden-pallets | grep -c "minimum order"` returns ≥1, and the text of every FAQ answer is findable in the raw HTML.

This single fix unlocks ~10 substantive Q&A blocks per page that Google currently cannot read, and is a prerequisite for FAQPage schema to be valid.

### 4.2 Add Product schema to each of the 5 pages

Add a second `ld+json` block per page. Use the real NAP already on the site:

```
Europack
101, ML Spaces, Railway Station Rd, Navpada, Kamala Nagar,
Vile Parle West, Mumbai, Maharashtra 400056, IN
Phone: +91 98337 76290
Email: sales@europackindia.com
```

Template (swap the product fields per page — values in §5):

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Wooden Pallets",
  "description": "ISPM-15 certified heat-treated wooden pallets for export and warehousing, manufactured in Mumbai and Vadodara.",
  "category": "Industrial Packaging",
  "brand": { "@type": "Brand", "name": "Europack" },
  "areaServed": [
    { "@type": "City", "name": "Mumbai" },
    { "@type": "City", "name": "Navi Mumbai" },
    { "@type": "City", "name": "Thane" },
    { "@type": "City", "name": "Bhiwandi" },
    { "@type": "City", "name": "Vadodara" }
  ],
  "manufacturer": { "@id": "https://europackindia.com/#organization" },
  "additionalProperty": [
    { "@type": "PropertyValue", "name": "Certification", "value": "ISPM-15 / IPPC marked" },
    { "@type": "PropertyValue", "name": "Static Load Capacity", "value": "Up to 3000 kg" },
    { "@type": "PropertyValue", "name": "Dynamic Load Capacity", "value": "Up to 1500 kg" }
  ]
}
```

**Do not add `offers` with a fabricated price.** If no real price is published on the page, omit `offers` entirely — inventing one risks a structured-data manual action.

### 4.3 Add FAQPage schema to each of the 5 pages

Generate it **from the same data array that renders the visible FAQs** — never hand-duplicate, or the two drift apart and the markup becomes non-compliant.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is ISPM-15 certification and why is it mandatory?",
      "acceptedAnswer": { "@type": "Answer", "text": "<the exact visible answer text>" }
    }
  ]
}
```

Rule: every Q&A in the schema must be visible on the page (this is why §4.1 comes first).

### 4.4 Add LocalBusiness schema once, site-wide

Add to the root layout's existing `@graph`, not per page:

```json
{
  "@type": "LocalBusiness",
  "@id": "https://europackindia.com/#localbusiness",
  "name": "Europack",
  "image": "https://europackindia.com/images/logo.png",
  "url": "https://europackindia.com",
  "telephone": "+91-98337-76290",
  "email": "sales@europackindia.com",
  "priceRange": "$$",
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
    { "@type": "City", "name": "Bhiwandi" },
    { "@type": "City", "name": "Vasai-Virar" },
    { "@type": "City", "name": "Vadodara" }
  ],
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "09:30", "closes": "18:30"
  }]
}
```

**The NAP must match Google Business Profile, IndiaMART and JustDial character for character.** Inconsistent NAP across citations actively suppresses local ranking. If you find a mismatch, stop and flag it rather than guessing which version is right.

### 4.5 Add BreadcrumbList schema

`Home → Products → {Product}`. Cheap, and earns breadcrumb display in results.

### 4.6 Fix the two broken H1s

`/wooden-crates` renders `Wooden CratesOpen-Slat Protection`; `/shrink-wrapping` renders `Shrink WrappingHeavy-Duty Heat Shrink`. Find the component joining the product name and tagline into one `<h1>` and separate them — the tagline belongs in a `<p>` or `<span>` sibling, not inside the H1.

Verify exactly one `<h1>` per page afterwards.

### 4.7 Put location into the H1 and into two H2s per page

Currently zero of 14 H2s on `/wooden-pallets` mention a location. This is the single largest structural gap versus the competitor.

- **H1** → append the location phrase (exact strings in §5).
- **Two H2s** per page must carry geography. The new "Areas We Serve" H2 (§4.8) is one. For the second, rewrite an existing H2 rather than adding a new section — e.g. `Why Choose Europack` → `Why Mumbai & Vadodara Exporters Choose Europack`.

Do not push location into every heading — that reads as stuffing. Two or three is right.

### 4.8 Add the "Areas We Serve" section to each page

**One section per product page. Not one page per location.** This is the legitimate way to achieve what the deleted 7,700 doorway pages were trying to do.

Place it after "Why Choose Europack" and before "Related Products". Build it as a reusable component — `components/seo/AreasWeServe.tsx` — taking the product name, the H2 text and the intro sentence as props, so the location paragraphs live in exactly one place.

Exact copy per page is in §5. It must render as **real prose in semantic HTML** (`<h2>`, `<h3>`, `<p>`, `<a>`), not as chips, pills or a bare list — Google needs sentences with context, which is precisely what the competitor has and Europack does not.

### 4.9 Surface the commercial facts that are currently buried

The competitor states price-from, MOQ, delivery window and payment terms in plain view. Europack has MOQ and delivery answers hidden inside a click-only accordion.

Add a compact, scannable block near the top of each page (after the hero) with whatever is **true** — do not invent figures. At minimum, from content already on the site:

- ISPM-15 / IPPC certified · ISO 9001:2015
- Load capacity (pallets: up to 3,000 kg static / 1,500 kg dynamic)
- MOQ — use the real value from the existing FAQ answer
- Delivery: factory gate, warehouse, or direct to port (JNPT, Mundra)

If a figure isn't already stated somewhere authoritative on the site, **leave it out and list it in your report** for the owner to supply. Never fabricate a price, lead time or capacity.

### 4.10 Internal links from the ~54 real articles into these 5 pages

Post-cleanup there are ~54 genuine articles in `src/data/mockBlogs*.ts`. Add contextual links from each article to the product page it relates to, using descriptive anchor text.

- Good: `our ISPM-15 certified wooden pallets`
- Bad: `click here`, `read more`

Two to four links per article, placed naturally in body prose. Do not add a link block at the foot of every article — that's a footprint.

---

## 5. PER-PAGE SPECIFICS

For each page below: set the title, meta description, H1, and the Areas We Serve block.
Keep titles ≤ 60 characters where possible; current ones run 62–71 and some are truncating in results.

### 5.1 `/wooden-pallets`

- **Title:** `Wooden Pallets Manufacturer in Mumbai & Vadodara | ISPM-15` *(keep — good, trim the tail)*
- **H1:** `Wooden Pallets Manufacturer in Mumbai & Vadodara`
- **Areas H2:** `Wooden Pallets Supplied Across Mumbai, Thane, Navi Mumbai & Vadodara`
- **Product schema name:** `Wooden Pallets`

### 5.2 `/seaworthy-packing`

- **Title:** `Seaworthy Packing Mumbai & Vadodara | Export Crating` — **change required.** Remove "Special Services" branding filler where it appears.
- **H1:** `Seaworthy Packing & Export Crating in Mumbai & Vadodara`
- **Areas H2:** `Seaworthy Packing & Export Crating Across Mumbai, Thane, Navi Mumbai & Vadodara`
- **Product schema name:** `Seaworthy Export Packing`

### 5.3 `/wooden-crates`

- **Title:** `Wooden Crates & Boxes Manufacturer Mumbai & Vadodara` — **add Vadodara** (currently missing).
- **H1:** `Wooden Crates & Export Boxes Manufacturer in Mumbai & Vadodara` — **also fix the concatenation bug (§4.6).**
- **Areas H2:** `Wooden Crates & Export Boxes Supplied Across Mumbai, Thane, Navi Mumbai & Vadodara`
- **Product schema name:** `Wooden Crates and Export Boxes`

### 5.4 `/shrink-wrapping`

- **Title:** `Shrink Wrapping Services in Mumbai & Vadodara | Europack` — **change required.** Drop "Special Services", add Vadodara.
- **H1:** `Industrial Shrink Wrapping Services in Mumbai & Vadodara` — **also fix the concatenation bug (§4.6).**
- **Areas H2:** `Industrial Shrink Wrapping in Mumbai, Thane, Navi Mumbai & Vadodara`
- **Product schema name:** `Industrial Shrink Wrapping`

### 5.5 `/corrugated-boxes`

- **Title:** `Corrugated Boxes Manufacturer Mumbai & Vadodara` *(trim from 71 chars)*
- **H1:** `Corrugated Boxes Manufacturer in Mumbai & Vadodara`
- **Areas H2:** `Corrugated Box Manufacturing & Supply Across Mumbai, Thane, Navi Mumbai & Vadodara`
- **Product schema name:** `Corrugated Boxes`

### 5.6 The Areas We Serve body — shared across all 5

Same service area for the whole business, so the location paragraphs are identical across pages. **Only the H2 and the opening sentence change per product.** This is deliberate and safe: it is one section on five canonical pages, not five hundred pages.

Opening sentence pattern — swap the product noun:

> Europack manufactures and delivers **{product}** directly to factories, warehouses and port yards across the Mumbai Metropolitan Region and Gujarat's Vadodara industrial belt.

Then, identically on all five:

**H3: Mumbai & Mumbai Metropolitan Region**

> Our head office is in Vile Parle West, and we supply across South Mumbai (Fort, Colaba, Churchgate), the Western Line corridor (Andheri, Andheri MIDC, Bandra, BKC, Goregaon, Malad, Borivali), the Central Line corridor (Dadar, Kurla, Ghatkopar, Vikhroli, Bhandup, Mulund) and the Harbour Line (Chembur, Vashi, Panvel). We regularly serve exporters and manufacturers in Thane and Wagle Estate, the Bhiwandi warehousing belt, Navi Mumbai's industrial estates — Taloja MIDC, TTC Industrial Area, Rabale, Mahape — and the Vasai-Virar corridor.

**H3: Vadodara & the Gujarat GIDC Belt**

> We supply Vadodara city and the surrounding GIDC industrial estates — Makarpura, Nandesari, Savli, Halol, Padra, Por and Ranoli — serving chemical, pharmaceutical and engineering manufacturers across the region.

**H3: Port & Export Delivery**

> For export consignments we deliver directly to port, including JNPT / Nhava Sheva, Mumbai Port and Mundra, as well as to factory gate or warehouse. For bulk or recurring supply contracts in any of these areas, [talk to our sales team](/contact).

**Add one sentence of genuine product-specific local context per page** — this is what makes the five sections meaningfully different rather than boilerplate. Draw it from content already on the site; if there isn't a true one, omit it and flag it. Examples of the *shape*:
- pallets → which industries in which areas take ISPM-15 export pallets
- seaworthy → the ports served and typical cargo
- corrugated → the sectors buying 3-ply vs 5-ply

---

## 6. WHAT TO REMOVE

1. **The repeated vague boilerplate.** `"in Mumbai, Vadodara and across India"` appears 6+ times verbatim on `/wooden-pallets` and similarly elsewhere. Keep **one** instance in the intro; replace the rest with either the specific Areas We Serve content or nothing. Repetition of a vague phrase is worth less than one specific mention.
2. **"Special Services"** from the `/shrink-wrapping` and `/seaworthy-packing` title tags — it consumes characters and communicates nothing to a searcher.
3. **Duplicated H1 text inside the H1** (§4.6) — the tagline moves out of the heading.
4. **Any leftover doorway-era UI** — if the blog filter bar, related-links block or nav still references the deleted location-blog structure, remove it.

**Do not remove:** the existing long-form product content, the specs, the certifications, the FAQ questions, the images or the alt text. All of that is good and is doing work.

---

## 7. VERIFICATION

Run the dev server and confirm every item:

```bash
cd client && npm run dev
```

1. **FAQ answers crawlable** — for each of the 5 pages, the text of *every* FAQ answer appears in `curl -s localhost:3000/<page>`. Not just the first.
2. **Schema valid** — each page emits `Product`, `FAQPage` and `BreadcrumbList`; the layout emits `LocalBusiness`. Paste each into Google's Rich Results Test and confirm zero errors. Every FAQPage Q&A must also be visible on the page.
3. **One H1 per page**, containing the location phrase from §5, with no concatenation bug.
4. **Two H2s per page carry geography**, including the Areas We Serve H2.
5. **Areas We Serve renders** on all 5 pages as semantic prose with a working `/contact` link.
6. **Titles** match §5 and are ≤ 60 chars where stated.
7. **No fabricated data** — every number on the page traces to something already true on the site. List anything you left out for the owner to supply.
8. **Build passes** — `npm run build` exit 0, `npx tsc --noEmit` exit 0.
9. **Sitemap still ~186 URLs** with zero doorway slugs (no regression from the previous branch).
10. **Screenshot each of the 5 pages** at mobile width (375px) and confirm the new section doesn't break the layout.

---

## 8. DO NOT DO ANY OF THIS

- **Do not create location pages.** No `/wooden-pallets-mumbai`, no `/mumbai/wooden-pallets`, no city landing pages of any kind. The site is recovering from an algorithmic penalty caused by exactly this. One section per product page is the whole approach.
- **Do not template content by swapping city names** anywhere, in any form.
- **Do not invent prices, MOQs, lead times, load capacities, client names or testimonials.** If a fact isn't already on the site, leave a gap and report it. Fabricated testimonials and fake review markup are a manual-action risk and are not acceptable regardless of what competitors do.
- **Do not add `offers`/price to Product schema** unless a real price is published on the page.
- **Do not keyword-stuff.** Two or three geographic headings per page, not ten.
- **Do not touch `server/`.**
- **Do not push or deploy.** Leave the branch local for review.

---

## 9. AFTER THIS BRANCH — WHAT ACTUALLY MOVES THE NEEDLE NEXT

Code changes alone will not win local search. In rough order of impact, these are **owner tasks, not developer tasks**, and they matter more than anything above for "near me" queries:

1. **Google Business Profile** — verify it's claimed; set category to Packaging Company / Manufacturer; add every service area (Mumbai, Navi Mumbai, Thane, Bhiwandi, Vadodara) explicitly. GBP service areas are the *correct* place for multi-location targeting. Currently 27 reviews at 4.3★ — ask satisfied customers for more, reply to every one, post updates.
2. **IndiaMART / JustDial / TradeIndia** — these currently outrank europackindia.com for the target terms. List all 5 products individually with photos and keep the listings active. NAP identical to the site.
3. **Backlinks** — industry bodies (FIEO, EEPC India), client vendor pages, trade publications.
4. **Brand-confusion check** — `europack.co.in` is a *different company* that ranks for "corrugated boxes manufacturer Mumbai". Worth knowing about; it will dilute brand searches.
