/**
 * Generates `src/constants/doorwaySlugs.ts`.
 *
 * Context: the site used to ship 7,700 programmatic "doorway" blog URLs built from
 * {5 products} x {locations} x {10 intent templates}. They are being removed and
 * 301-redirected to the five real product pages. This script captures the exact,
 * frozen list of those slugs so the redirects can be exact rather than regex-based.
 *
 * The two data sources it reads (`src/constants/blogIndex.json` and
 * `src/constants/generatedBlogIndex.ts`) were deleted in the same change that
 * introduced this script, so the doorway half can no longer be regenerated — the
 * generated file is the record. The real-article half (REAL_ARTICLE_SLUGS) is read
 * from `src/data/mockBlogs*.ts` and can be regenerated any time those change:
 *
 *   node scripts/generate-doorway-slugs.mjs
 *
 * Without the deleted sources the script regenerates REAL_ARTICLE_SLUGS only and
 * preserves the existing doorway lists.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(root, 'src/constants/doorwaySlugs.ts');

/** Doorway slug prefix (the seoData product id) -> the product page it redirects to. */
const TARGETS = {
  'wooden-pallets': '/wooden-pallets',
  'seaworthy-packing': '/seaworthy-packing',
  'wooden-boxes': '/wooden-crates',
  'corrugated-boxes': '/corrugated-boxes',
  'shrink-wrapping': '/shrink-wrapping',
};

// --- real articles: hand-written, must never be redirected -------------------
function readRealArticleSlugs() {
  const dir = path.join(root, 'src/data');
  const slugs = new Set();
  for (const file of fs.readdirSync(dir).filter((f) => /^mockBlogs.*\.ts$/.test(f))) {
    const src = fs.readFileSync(path.join(dir, file), 'utf8');
    // createBlog('id', 'slug', ...)
    for (const m of src.matchAll(/createBlog\(\s*'[^']+',\s*'([^']+)'/g)) slugs.add(m[1]);
    // top-level map keys: "  'slug': {"
    for (const m of src.matchAll(/^ {2}'([^']+)':\s*\{/gm)) slugs.add(m[1]);
  }
  return [...slugs].sort();
}

// --- doorway slugs ----------------------------------------------------------
function readDoorwaySlugs() {
  const indexPath = path.join(root, 'src/constants/blogIndex.json');
  const generatedPath = path.join(root, 'src/constants/generatedBlogIndex.ts');
  if (!fs.existsSync(indexPath) || !fs.existsSync(generatedPath)) return null;

  const slugs = new Set(JSON.parse(fs.readFileSync(indexPath, 'utf8')).map((e) => e.slug));

  // Mirror buildSlug()/vadodaraLocations/vadodaraIntents from generatedBlogIndex.ts,
  // parsing the literals out of the source so this cannot drift from it.
  const gen = fs.readFileSync(generatedPath, 'utf8');
  const literals = (name, until) => {
    const block = gen.slice(gen.indexOf(`const ${name} = [`), gen.indexOf(until));
    return [...block.matchAll(/^ {2}'([^']+)',/gm)].map((m) => m[1]);
  };
  const locations = literals('vadodaraLocations', 'const vadodaraIntents');
  const intents = literals('vadodaraIntents', 'function slugify');

  const seoData = fs.readFileSync(path.join(root, 'src/constants/seoData.ts'), 'utf8');
  const productBlock = seoData.slice(
    seoData.indexOf('export const seoProducts'),
    seoData.indexOf('export const searchIntents')
  );
  const productIds = [...productBlock.matchAll(/id:\s*'([^']+)'/g)].map((m) => m[1]);

  const slugify = (v) =>
    v.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  const withCity = (l) => (l.toLowerCase() === 'vadodara' ? l : `${l} Vadodara`);
  const buildSlug = (productId, intent, location) => {
    const loc = slugify(location);
    const cityLoc = slugify(withCity(location));
    switch (intent) {
      case 'Manufacturer':
      case 'Supplier':
      case 'Dealer':
      case 'Export Packaging':
      case 'Industrial Packaging':
        return `${productId}-${slugify(intent)}-near-${loc}-for-industrial-packaging`;
      case 'Near Me':
        return `${productId}-near-me-in-${loc}`;
      case 'For Export Cargo':
      case 'For Heavy Machinery':
      case 'For Warehouse':
        return `${productId}-${slugify(intent)}-in-${cityLoc}`;
      case 'Price Guide':
        return `${productId}-price-guide-in-${loc}`;
      default:
        return `${productId}-${slugify(intent)}-in-${cityLoc}`;
    }
  };

  for (const location of locations)
    for (const productId of productIds)
      for (const intent of intents) slugs.add(buildSlug(productId, intent, location));

  return slugs;
}

/** Reuse the doorway lists already committed to doorwaySlugs.ts. */
function readExistingDoorwaySlugs() {
  const src = fs.readFileSync(OUT, 'utf8');
  const slugs = new Set();
  for (const [prefix] of Object.entries(TARGETS)) {
    const m = src.match(new RegExp(`'${prefix}':\\s*\`\\n([^\`]*)\``));
    if (!m) throw new Error(`doorwaySlugs.ts has no block for '${prefix}'`);
    for (const suffix of m[1].trim().split('\n')) slugs.add(`${prefix}-${suffix}`);
  }
  return slugs;
}

const realArticleSlugs = readRealArticleSlugs();
const doorwaySlugs = readDoorwaySlugs() ?? readExistingDoorwaySlugs();

// Real articles always win: a hand-written article must never be redirected, even
// if its slug happens to collide with the doorway formula.
const realSet = new Set(realArticleSlugs);
const groups = Object.fromEntries(Object.keys(TARGETS).map((p) => [p, []]));
const unmatched = [];
for (const slug of [...doorwaySlugs].sort()) {
  if (realSet.has(slug)) continue;
  const prefix = Object.keys(TARGETS).find((p) => slug.startsWith(`${p}-`));
  if (prefix) groups[prefix].push(slug.slice(prefix.length + 1));
  else unmatched.push(slug);
}
if (unmatched.length) throw new Error(`${unmatched.length} doorway slugs matched no product prefix, e.g. ${unmatched[0]}`);

const total = Object.values(groups).reduce((n, g) => n + g.length, 0);

const out = `// GENERATED FILE — do not edit by hand.
// Run \`node scripts/generate-doorway-slugs.mjs\` to regenerate.
//
// The ${total} doorway blog slugs this site used to publish, grouped by the product
// prefix they redirect to. Slugs are stored with the prefix stripped and joined by
// newlines purely to keep the file (and the middleware bundle) small — the list is
// an exact enumeration, not a pattern, so no genuine article can match by accident.

export const DOORWAY_REDIRECT_TARGETS: Record<string, string> = ${JSON.stringify(TARGETS, null, 2)};

export const DOORWAY_SLUG_SUFFIXES: Record<string, string> = {
${Object.entries(groups)
  .map(([prefix, suffixes]) => `  // ${suffixes.length} slugs -> ${TARGETS[prefix]}\n  '${prefix}': \`\n${suffixes.join('\n')}\`,`)
  .join('\n')}
};

/** Hand-written articles from src/data/mockBlogs*.ts. These are never redirected. */
export const REAL_ARTICLE_SLUGS: string[] = ${JSON.stringify(realArticleSlugs, null, 2)};
`;

fs.writeFileSync(OUT, out);
console.log(`doorway slugs : ${total}`);
console.log(`real articles : ${realArticleSlugs.length}`);
for (const [p, g] of Object.entries(groups)) console.log(`  ${p} -> ${TARGETS[p]} : ${g.length}`);
console.log(`wrote ${path.relative(root, OUT)} (${(out.length / 1024).toFixed(0)} KB)`);
