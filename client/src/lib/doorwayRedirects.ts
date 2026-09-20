import {
  DOORWAY_REDIRECT_TARGETS,
  DOORWAY_SLUG_SUFFIXES,
  REAL_ARTICLE_SLUGS,
} from '@/constants/doorwaySlugs';

/**
 * The 7,700 programmatic doorway blog URLs this site used to publish
 * ({5 products} x {locations} x {10 intent templates}) are gone. Every one of them
 * 301s to the product page it was standing in for.
 *
 * The lookup is an exact slug set rather than a pattern match: several hand-written
 * articles have slugs that look like the doorway formula (wooden-pallet-manufacturer-mumbai,
 * corrugated-box-manufacturer-mumbai), and a regex would swallow them.
 */

/** Hand-written articles. Checked first — a real article is never redirected. */
const realArticleSlugs = new Set(REAL_ARTICLE_SLUGS);

const doorwayTargets = (() => {
  const map = new Map<string, string>();
  for (const [prefix, suffixes] of Object.entries(DOORWAY_SLUG_SUFFIXES)) {
    const target = DOORWAY_REDIRECT_TARGETS[prefix];
    if (!target) continue;
    for (const suffix of suffixes.trim().split('\n')) {
      const slug = `${prefix}-${suffix}`;
      if (realArticleSlugs.has(slug)) continue;
      map.set(slug, target);
    }
  }
  return map;
})();

/** The product page a retired doorway slug should 301 to, or null if it isn't one. */
export function getDoorwayRedirect(slug: string): string | null {
  if (realArticleSlugs.has(slug)) return null;
  return doorwayTargets.get(slug) ?? null;
}

/** Exported for the sitemap/verification — the number of retired doorway URLs. */
export const doorwayRedirectCount = doorwayTargets.size;
