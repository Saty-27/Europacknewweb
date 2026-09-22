/**
 * The site's internal link graph, written down in one place.
 *
 * Why this exists: until now the only links into the ~120 product pages came
 * from the /products catalog grid and from the 7,700 doorway pages that were
 * deleted. With those gone, the sub-type pages were close to orphaned. This
 * file re-expresses the hierarchy the catalog already has — hub down to
 * sub-type, sub-type back up to hub, sub-type across to the formats a buyer
 * would genuinely compare it with.
 *
 * Two rules are encoded deliberately:
 *
 *  1. Every href here points at a URL that already exists. Nothing in this file
 *     may create a route. The site is recovering from a doorway-page penalty and
 *     a new location- or variant-shaped URL is the exact failure mode.
 *  2. The up-link anchor to /wooden-pallets is the literal phrase "wooden
 *     pallets" on every pallet sub-type. That is the one intentionally repeated
 *     anchor on the site: it tells Google which page owns the head term. Every
 *     other anchor — hub down-links, cross-links, the sentences around the
 *     up-link — is written once and varies.
 */

export interface HubLink {
  /** An existing route. Never invent one. */
  href: string;
  /** Visible anchor text. Unique across this file. */
  anchor: string;
  /** Short clause placed after the anchor, so the link sits in a sentence. */
  detail: string;
}

export interface HubGroup {
  heading: string;
  lead: string;
  links: HubLink[];
}

export interface CategoryHub {
  label: string;
  title: string;
  intro: string;
  groups: HubGroup[];
}

// ──────────────────────────────────────────────────────────────
// HUBS — a landing page linking down into its own sub-types
// ──────────────────────────────────────────────────────────────

const woodenPalletsHub: CategoryHub = {
  label: 'The full range',
  title: 'Every pallet format we build',
  intro:
    'Buyers arrive at this page from four different directions: a standard to comply with, an entry pattern the forklift fleet needs, a timber grade the load demands, or a construction type that has to fold, nest or come back empty. Each format below has its own page with its own dimensions and load figures.',
  groups: [
    {
      heading: 'By standard',
      lead:
        'Where the pallet has to match a published footprint — EPAL for general European trade, the CP series for chemical and petrochemical shippers.',
      links: [
        { href: '/euro-pallets', anchor: 'Euro pallet, 1200 × 800 mm', detail: 'the EPAL footprint, four-way entry' },
        { href: '/cp1-pallets', anchor: 'CP1, 1000 × 1200 mm', detail: 'peripheral deck for bagged chemical goods' },
        { href: '/cp2-pallets', anchor: 'CP2, 800 × 1200 mm', detail: 'the Euro-sized variant of the CP series' },
        { href: '/cp3-pallets', anchor: 'CP3, 1140 × 1140 mm', detail: 'container-optimised, built for drums' },
        { href: '/cp4-pallets', anchor: 'CP4 with its smooth deck', detail: 'no sharp edges, for bagged goods' },
        { href: '/cp5-pallets', anchor: 'CP5, 760 × 1140 mm', detail: 'the small-format bag pallet' },
        { href: '/cp6-pallets', anchor: 'the double-deck CP6', detail: '1200 × 1000 mm, for high stack loading' },
        { href: '/cp7-pallets', anchor: 'CP7, 1300 × 1100 mm', detail: 'the extra-wide base for oversized bags' },
        { href: '/cp8-pallets', anchor: 'CP8, drilled for drum discharge', detail: 'solid perimeter, 1140 × 1140 mm' },
        { href: '/cp9-pallets', anchor: 'CP9 with a full peripheral base', detail: '1140 × 1140 mm, stacked export loads' },
      ],
    },
    {
      heading: 'By entry pattern',
      lead:
        'How the forklift or pallet truck gets underneath. This is usually decided by the warehouse, not by the cargo.',
      links: [
        { href: '/two-way-pallet', anchor: 'two-way entry', detail: 'forks from two opposite sides, high static support for racking' },
        { href: '/four-way-pallet', anchor: 'four-way entry', detail: 'forks from any side, faster to handle in high-turnover bays' },
      ],
    },
    {
      heading: 'By material',
      lead:
        'The timber or metal the deck and stringers are cut from, which sets the load rating, the weight and whether the pallet needs ISPM-15 treatment at all.',
      links: [
        { href: '/hardwood-pallet', anchor: 'hardwood', detail: 'dense jungle timber, screw-nail fastened, for machinery loads' },
        { href: '/nz-pine', anchor: 'New Zealand pine', detail: 'export-grade softwood, the timber behind most standard sizes' },
        { href: '/jungle-wood', anchor: 'jungle wood', detail: 'high-density Indian hardwood for heavy domestic movements' },
        { href: '/plywood-pallet', anchor: 'plywood decks', detail: 'splinter-free and ISPM-15 exempt, used for pharma cargo' },
        { href: '/galvanized-pallet', anchor: 'galvanised steel', detail: 'rust-proof, for environments where timber will not last' },
      ],
    },
    {
      heading: 'By construction type',
      lead:
        'Formats that behave differently in the return leg: they nest, they fold flat, or they turn into a box.',
      links: [
        { href: '/molded-pallets', anchor: 'moulded pallets', detail: 'one-piece pressed fibre, nestable, no nails' },
        { href: '/press-wood-pallet', anchor: 'press wood', detail: 'engineered and nestable, formed rather than sawn' },
        { href: '/collapsible-reusable', anchor: 'collapsible pallet boxes', detail: 'fold flat for the empty return leg' },
        { href: '/reusable-collar', anchor: 'pallet collars', detail: 'hinged sides that turn a flat pallet into a box' },
      ],
    },
  ],
};

const corrugatedBoxesHub: CategoryHub = {
  label: 'The full range',
  title: 'Carton formats in this range',
  intro:
    'Corrugated cartons split by what the board has to do: carry a brand, carry a load, or protect what is already inside another box.',
  groups: [
    {
      heading: 'By purpose',
      lead: 'Each carton type below has its own page with construction and ply detail.',
      links: [
        { href: '/printed-corrugated', anchor: 'printed corrugated cartons', detail: 'print-finished cartons for retail-facing cargo' },
        { href: '/mono-cartons', anchor: 'mono cartons', detail: 'retail-format cartons' },
        { href: '/9ply-heavy-duty', anchor: 'nine-ply heavy duty boxes', detail: 'export-grade cartons for dense loads' },
        { href: '/jumbo-boxes', anchor: 'jumbo boxes', detail: 'bulk cargo enclosures' },
        { href: '/corrugated-partitions', anchor: 'corrugated partitions', detail: 'internal dividers that stop contact damage' },
      ],
    },
  ],
};

const vacuumPackingHub: CategoryHub = {
  label: 'The full range',
  title: 'Vacuum packing systems',
  intro:
    'Vacuum packing is chosen by barrier specification, not by product. The systems below differ in film construction and in the standard they are built to meet.',
  groups: [
    {
      heading: 'By barrier build',
      lead: 'Each system has its own page covering film layers, sealing method and the cargo it suits.',
      links: [
        { href: '/multilayer-laminated-vci', anchor: 'multilayer VCI laminate with nylon', detail: 'corrosion inhibition inside the vacuum envelope' },
        { href: '/four-layer-film-vacuum', anchor: 'four-layer film sealing', detail: 'the general-purpose export barrier' },
        { href: '/finest-quality-4n-vacuum', anchor: '4N-norms vacuum packing', detail: 'military and industrial specification work' },
        { href: '/odd-shape-vacuum', anchor: 'vacuum packing for sharp-edged components', detail: 'odd shapes and sizes with sharp edges' },
        { href: '/rust-prevention-vacuum', anchor: 'vacuum packing against rust and moisture', detail: 'prevention of rusting, moisture and product deterioration' },
      ],
    },
  ],
};

const lashingMaterialsHub: CategoryHub = {
  label: 'The full range',
  title: 'Cargo securing hardware',
  intro:
    'Lashing is specified by working load limit and by what the anchor point looks like. The four systems below cover most container and flat-rack work.',
  groups: [
    {
      heading: 'By securing system',
      lead: 'Each has its own page with grade, working load and typical application.',
      links: [
        { href: '/ratchet-belt', anchor: 'polyester ratchet belts', detail: 'the standard webbing tie-down' },
        { href: '/wire-rope', anchor: 'steel wire rope', detail: 'heavy-duty lashing for machinery' },
        { href: '/chain-lashing', anchor: 'Grade 80 chain lashing', detail: 'extreme loads and ODC cargo' },
        { href: '/d-shackles', anchor: 'D shackles', detail: 'the load connection between lashing and anchor point' },
      ],
    },
  ],
};

export const categoryHubs: Record<string, CategoryHub> = {
  'wooden-pallets': woodenPalletsHub,
  'corrugated-boxes': corrugatedBoxesHub,
  'vacuum-packing': vacuumPackingHub,
  'lashing-materials': lashingMaterialsHub,
};

export function getCategoryHub(slug: string): CategoryHub | null {
  return categoryHubs[slug] ?? null;
}

// ──────────────────────────────────────────────────────────────
// SUB-TYPE PAGES — the link back up, and the links across
// ──────────────────────────────────────────────────────────────

export interface ParentHub {
  href: string;
  /** For pallet sub-types this is always the literal head term. See file header. */
  anchor: string;
  /** Sentence text before the anchor. Written once per page so the block is not boilerplate. */
  lead: string;
  /** Sentence text after the anchor, including the full stop. */
  tail: string;
}

export interface SubTypeLinks {
  heading: string;
  parent: ParentHub;
  siblingsLead: string;
  siblings: HubLink[];
}

const PALLET_HUB = '/wooden-pallets';
const PALLET_ANCHOR = 'wooden pallets';

type PalletEntry = { lead: string; tail: string; siblingsLead: string; siblings: HubLink[] };

const palletSubTypes: Record<string, PalletEntry> = {
  'euro-pallets': {
    lead: 'The Euro footprint is one of ten published standards we cut to. The rest of the',
    tail: ' range, including the CP series and custom sizes, is set out on the hub page.',
    siblingsLead: 'Specifiers weighing up the 1200 × 800 footprint usually compare it against:',
    siblings: [
      { href: '/cp2-pallets', anchor: 'the CP2 pallet', detail: 'same 800 × 1200 footprint, built to the chemical-industry standard' },
      { href: '/four-way-pallet', anchor: 'four-way entry construction', detail: 'if the deciding factor is forklift access rather than the footprint' },
    ],
  },
  'two-way-pallet': {
    lead: 'Two-way entry is an entry pattern, not a grade — the same deck can be cut from any of the timbers listed on our',
    tail: ' page.',
    siblingsLead: 'This is the decision most buyers get wrong, so compare it directly against:',
    siblings: [
      { href: '/four-way-pallet', anchor: 'four-way entry pallets', detail: 'forks from all four sides, more flexible in the warehouse' },
      { href: '/hardwood-pallet', anchor: 'hardwood construction', detail: 'when the static racking load is the binding constraint' },
    ],
  },
  'four-way-pallet': {
    lead: 'Four-way entry is the most-ordered pattern we make. It is one of several covered on the',
    tail: ' hub, alongside the CP standards and the material grades.',
    siblingsLead: 'Before committing to four-way, it is worth reading:',
    siblings: [
      { href: '/two-way-pallet', anchor: 'the two-way alternative', detail: 'fewer entry points, more timber left in the stringers' },
      { href: '/euro-pallets', anchor: 'the EPAL-standard Euro pallet', detail: 'four-way entry on a published 1200 × 800 footprint' },
    ],
  },
  'hardwood-pallet': {
    lead: 'Hardwood is the heaviest grade in our',
    tail: ' range and the one specified for capital equipment.',
    siblingsLead: 'Where hardwood is more pallet than the load needs, buyers move to:',
    siblings: [
      { href: '/nz-pine', anchor: 'NZ pine', detail: 'lighter and more uniform, and easier to heat-treat consistently' },
      { href: '/jungle-wood', anchor: 'jungle-wood stock', detail: 'the domestic hardwood we cut when import timber is not required' },
    ],
  },
  'cp1-pallets': {
    lead: 'CP1 is the first of the nine chemical-industry formats grouped under',
    tail: ' on our hub page.',
    siblingsLead: 'Within the CP series, the near neighbours are:',
    siblings: [
      { href: '/cp6-pallets', anchor: 'CP6', detail: 'the same footprint turned through ninety degrees, double-decked' },
      { href: '/cp2-pallets', anchor: 'CP2', detail: 'the Euro-sized member of the series' },
    ],
  },
  'cp2-pallets': {
    lead: 'CP2 sits in the CP series, one of four ways of grouping our',
    tail: ' — by standard, by entry, by material or by construction.',
    siblingsLead: 'Its footprint is shared, so compare it with:',
    siblings: [
      { href: '/euro-pallets', anchor: 'the standard Euro pallet', detail: 'the same 800 × 1200 mm, to EPAL rather than CP rules' },
      { href: '/cp1-pallets', anchor: 'CP1', detail: 'the wider 1000 × 1200 mm chemical format' },
    ],
  },
  'cp3-pallets': {
    lead: 'CP3 is container-optimised. The full set of formats, including the other 1140 mm squares, is on our',
    tail: ' page.',
    siblingsLead: 'Three CP formats share the 1140 × 1140 mm footprint, so check the deck detail:',
    siblings: [
      { href: '/cp4-pallets', anchor: 'CP4', detail: 'same square, smooth deck, no sharp edges' },
      { href: '/cp9-pallets', anchor: 'CP9', detail: 'same square, full peripheral base' },
    ],
  },
  'cp4-pallets': {
    lead: 'CP4 is the smooth-deck member of the chemical series. Every format we cut is listed under',
    tail: ' on the hub.',
    siblingsLead: 'Its two direct comparisons are:',
    siblings: [
      { href: '/cp3-pallets', anchor: 'the container-optimised CP3', detail: 'same footprint, decked for drums rather than bags' },
      { href: '/cp5-pallets', anchor: 'CP5', detail: 'the smaller 760 × 1140 mm bag pallet' },
    ],
  },
  'cp5-pallets': {
    lead: 'CP5 is the smallest of the CP formats. The others, and the non-CP sizes, are grouped on our',
    tail: ' page.',
    siblingsLead: 'Bag handling is the common thread, so buyers also look at:',
    siblings: [
      { href: '/cp7-pallets', anchor: 'CP7', detail: 'the extra-wide base at the opposite end of the bag range' },
      { href: '/cp4-pallets', anchor: 'the smooth-decked CP4', detail: 'when bag abrasion is the concern' },
    ],
  },
  'cp6-pallets': {
    lead: 'CP6 is the double-deck format. It appears under the standards grouping on our',
    tail: ' hub, next to the other eight CP sizes.',
    siblingsLead: 'Its closest relatives by footprint and by load behaviour:',
    siblings: [
      { href: '/cp1-pallets', anchor: 'the single-deck CP1', detail: '1000 × 1200 mm, peripheral deck' },
      { href: '/cp7-pallets', anchor: 'the wider CP7', detail: 'when the load overhangs a 1200 mm deck' },
    ],
  },
  'cp7-pallets': {
    lead: 'CP7 carries the widest base in the series. All nine, plus the entry and material options, are on our',
    tail: ' page.',
    siblingsLead: 'If CP7 is wider than the load requires:',
    siblings: [
      { href: '/cp6-pallets', anchor: 'the double-decked CP6', detail: 'more rigidity on a tighter footprint' },
      { href: '/cp5-pallets', anchor: 'the compact CP5', detail: 'for small-format bags' },
    ],
  },
  'cp8-pallets': {
    lead: 'CP8 is drilled for drum discharge — a detail that does not carry across the rest of our',
    tail: ', so specify it explicitly.',
    siblingsLead: 'Drum shippers routinely compare it with:',
    siblings: [
      { href: '/cp3-pallets', anchor: 'CP3 for drummed goods', detail: 'the undrilled container-optimised square' },
      { href: '/cp9-pallets', anchor: 'the CP9 peripheral base', detail: 'for stacked drum loads in transit' },
    ],
  },
  'cp9-pallets': {
    lead: 'CP9 is the export-grade end of the chemical series and one of the formats we group as',
    tail: ' by standard.',
    siblingsLead: 'Its two same-footprint alternatives are:',
    siblings: [
      { href: '/cp8-pallets', anchor: 'the drilled CP8', detail: 'where drums have to discharge in place' },
      { href: '/cp3-pallets', anchor: 'CP3', detail: 'the container-optimised version of the same square' },
    ],
  },
  'plywood-pallet': {
    lead: 'Plywood decks are ISPM-15 exempt by construction, which sets them apart from most of our',
    tail: '.',
    siblingsLead: 'The other exempt formats worth comparing:',
    siblings: [
      { href: '/molded-pallets', anchor: 'moulded fibre pallets', detail: 'also exempt, and nestable' },
      { href: '/press-wood-pallet', anchor: 'press wood pallets', detail: 'engineered fibre, exempt, stacks flat when empty' },
    ],
  },
  'nz-pine': {
    lead: 'New Zealand pine is the timber behind most of the standard sizes in our',
    tail: ' range.',
    siblingsLead: 'The two grades it is usually weighed against:',
    siblings: [
      { href: '/hardwood-pallet', anchor: 'hardwood pallets', detail: 'heavier and stiffer, for machinery-grade loads' },
      { href: '/jungle-wood', anchor: 'jungle wood timber', detail: 'denser, and domestically sourced' },
    ],
  },
  'jungle-wood': {
    lead: 'Jungle wood is one of four timbers we cut for',
    tail: ', and the densest of them.',
    siblingsLead: 'Density is the whole argument here, so read it against:',
    siblings: [
      { href: '/nz-pine', anchor: 'imported NZ pine', detail: 'lighter, more uniform, easier to heat-treat consistently' },
      { href: '/hardwood-pallet', anchor: 'finished hardwood pallets', detail: 'what jungle wood becomes once it is assembled' },
    ],
  },
  'press-wood-pallet': {
    lead: 'Press wood is an engineered format rather than a sawn one, which is why it sits in the construction grouping of our',
    tail: ' hub.',
    siblingsLead: 'Its two near-identical alternatives:',
    siblings: [
      { href: '/molded-pallets', anchor: 'moulded wood pallets', detail: 'the same nesting behaviour, formed in one piece' },
      { href: '/plywood-pallet', anchor: 'plywood pallets', detail: 'flat-decked and also outside ISPM-15 scope' },
    ],
  },
  'molded-pallets': {
    lead: 'Moulded pallets nest, which changes the economics of the return leg. They are grouped by construction on our',
    tail: ' page.',
    siblingsLead: 'The comparisons that matter:',
    siblings: [
      { href: '/press-wood-pallet', anchor: 'pressed wood fibre pallets', detail: 'the closest thing to a moulded pallet we make' },
      { href: '/collapsible-reusable', anchor: 'foldable pallet boxes', detail: 'a different answer to the same empty-return problem' },
    ],
  },
  'collapsible-reusable': {
    lead: 'Collapsible boxes fold rather than nest. Both approaches are listed among our',
    tail: '.',
    siblingsLead: 'For closed-loop logistics, compare it with:',
    siblings: [
      { href: '/reusable-collar', anchor: 'collar pallet boxes', detail: 'a flat pallet plus hinged collars, height added a layer at a time' },
      { href: '/molded-pallets', anchor: 'nestable moulded pallets', detail: 'when the return leg carries pallets but not boxes' },
    ],
  },
  'reusable-collar': {
    lead: 'A collar turns a flat pallet into a box, so it is bought alongside rather than instead of our',
    tail: '.',
    siblingsLead: 'The alternative way to get a collapsible box:',
    siblings: [
      { href: '/collapsible-reusable', anchor: 'one-piece collapsible pallets', detail: 'folds as a unit rather than stacking collars' },
      { href: '/euro-pallets', anchor: '1200 × 800 mm Euro base', detail: 'the footprint collars are most often sized to' },
    ],
  },
  'galvanized-pallet': {
    lead: 'Galvanised steel is the option for washdown areas and permanent indoor loops, where none of our',
    tail: ' would last.',
    siblingsLead: 'Where the environment allows timber, the usual substitutes are:',
    siblings: [
      { href: '/hardwood-pallet', anchor: 'heavy-duty hardwood', detail: 'heavy-duty timber where the environment allows it' },
      { href: '/plywood-pallet', anchor: 'hygienic plywood decks', detail: 'when the driver is cleanliness rather than corrosion' },
    ],
  },
};

/** Sub-type pages that belong to a landing page other than /wooden-pallets. */
const categoryParents: Record<string, { href: string; anchor: string; lead: string; tail: string }> = {
  'corrugated-cartons': {
    href: '/corrugated-boxes',
    anchor: 'corrugated boxes',
    lead: 'This carton is one of five formats in our',
    tail: ' range, which covers ply counts from three to nine.',
  },
  'vacuum-packaging': {
    href: '/vacuum-packing',
    anchor: 'vacuum packing services',
    lead: 'This is one of five barrier builds offered under our',
    tail: '.',
  },
  'lashing-materials': {
    href: '/lashing-materials',
    anchor: 'cargo lashing materials',
    lead: 'This item is part of our',
    tail: ' range for container and flat-rack securing.',
  },
};

/**
 * The up-link and cross-links for a sub-type page, or null when the page has no
 * landing page above it. Pallet sub-types win over their catalog category: NZ
 * pine, jungle wood, press wood and galvanised pallets each live in a different
 * catalog category but belong to the pallet hierarchy.
 */
export function getSubTypeLinks(flatSlug: string, categoryId: string): SubTypeLinks | null {
  const pallet = palletSubTypes[flatSlug];
  if (pallet) {
    return {
      heading: 'Where this sits in the range',
      parent: { href: PALLET_HUB, anchor: PALLET_ANCHOR, lead: pallet.lead, tail: pallet.tail },
      siblingsLead: pallet.siblingsLead,
      siblings: pallet.siblings,
    };
  }

  const parent = categoryParents[categoryId];
  if (!parent) return null;

  return {
    heading: 'Where this sits in the range',
    parent,
    siblingsLead: '',
    siblings: [],
  };
}

/** Every pallet sub-type slug the hub is responsible for linking. Used by tests. */
export const palletSubTypeSlugs = Object.keys(palletSubTypes);
