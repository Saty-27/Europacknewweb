import { Category } from '../constants/productsData';

export interface GeneratedProductContent {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  /**
   * The descriptor line that used to live inside the <h1> as a nested <span>.
   * It is returned separately so the page can render it next to the heading
   * without it being concatenated into the h1's extracted text.
   */
  h1Sub: string;
  intro: string;
  overview: string;
  keyFeatures: string[];
  applications: { icon: string; title: string; desc: string }[];
  specs: { key: string; value: string }[];
  technicalDetails: { key: string; value: string }[];
  manufacturingSteps: { step: string; title: string; desc: string }[];
  qualityStandards: { title: string; desc: string }[];
  customizationOptions: string[];
  comparison: { feature: string; thisProduct: string; alternative: string; thisBetter: boolean }[];
  comparisonLabel: string;
  whyEuropack: { title: string; desc: string }[];
  deliveryInfo: { title: string; desc: string }[];
  seoContent: string;
  faq: { q: string; a: string }[];
  /** Only set where a real, attributable outcome exists. Never generated. */
  caseStudy?: { client: string; result: string; detail: string };
  images: string[];
}

// ──────────────────────────────────────────────
// CATEGORY-AWARE DATA BANKS
// ──────────────────────────────────────────────

/**
 * Per category, the ordinary word a buyer uses for the thing. Keeps the copy
 * readable without restating the full product name in every sentence.
 */
const SHORT_NOUNS: Record<string, string> = {
  'wooden-pallets': 'pallet', 'metal-pallets': 'pallet', 'paper-pallets': 'pallet',
  'plastic-pallets': 'pallet', 'molded-pallets': 'pallet', 'wooden-skids': 'skid',
  'wooden-boxes': 'box', 'plywood-boxes': 'box', 'corrugated-cartons': 'carton',
  'packaging-materials': 'material', 'packaging-laminates': 'laminate',
  'plywood-wood-material': 'board', 'packaging-hardware': 'fitting',
  'lashing-materials': 'lashing', 'antirust-treatment': 'treatment',
  'heavy-engineering-packaging': 'packing', 'vacuum-packaging': 'pack',
  'stretch-wrapping': 'wrap', 'dunnage-bag': 'bag', 'special-cases': 'case',
  'special-services': 'service',
};

const categoryMeta: Record<string, {
  material: string; loadRange: string; treatment: string; certifications: string[];
  industryPrimary: string; comparisonAlt: string; keywords: string[];
}> = {
  'wooden-pallets': {
    material: 'Heat-Treated Pine / Hardwood', loadRange: '500–5,000 kg', treatment: 'ISPM-15 Heat Treatment at 56°C',
    certifications: ['ISPM-15 / IPPC', 'ISO 9001:2015', 'BIS IS:1276'],
    industryPrimary: 'Heavy Engineering & Export', comparisonAlt: 'Plastic Pallet',
    keywords: ['wooden pallets manufacturer Mumbai', 'export pallets India', 'ISPM-15 pallets supplier'],
  },
  'metal-pallets': {
    material: 'Mild Steel / Galvanized / Aluminum', loadRange: '1,000–10,000 kg', treatment: 'Powder Coat / Hot-Dip Galvanizing',
    certifications: ['ISO 9001:2015', 'IS:2062 Steel Grade'],
    industryPrimary: 'Industrial & Automotive', comparisonAlt: 'Wooden Pallet',
    keywords: ['metal pallets manufacturer India', 'steel pallet supplier Mumbai', 'heavy duty metal pallets'],
  },
  'paper-pallets': {
    material: 'Honeycomb Kraft Paper / Recycled Board', loadRange: '', treatment: 'None (ISPM-15 Exempt)',
    certifications: ['ISPM-15 Exempt', 'ISO 9001:2015', 'FSC Certified Paper'],
    industryPrimary: 'FMCG & Air Freight', comparisonAlt: 'Wooden Pallet',
    keywords: ['paper pallets manufacturer India', 'eco pallets supplier', 'lightweight pallets Mumbai'],
  },
  'plastic-pallets': {
    material: 'Virgin / Recycled HDPE / PP', loadRange: '500–3,000 kg', treatment: 'None Required (ISPM-15 Exempt)',
    certifications: ['ISPM-15 Exempt', 'ISO 9001:2015', 'FDA / USDA Compliant (Export)'],
    industryPrimary: 'Pharma & Food Industry', comparisonAlt: 'Wooden Pallet',
    keywords: ['plastic pallets manufacturer Mumbai', 'HDPE pallets supplier India', 'hygienic pallets'],
  },
  'molded-pallets': {
    material: 'Press-Molded Wood Fiber / Composite', loadRange: '300–1,200 kg', treatment: 'ISPM-15 Exempt',
    certifications: ['ISPM-15 Exempt', 'ISO 9001:2015', 'ECO Certified'],
    industryPrimary: 'E-commerce & FMCG', comparisonAlt: 'Wooden Pallet',
    keywords: ['molded pallets India', 'press wood pallets Mumbai', 'eco-neutral pallets supplier'],
  },
  'wooden-skids': {
    material: 'Structural Pine / Hardwood Beam', loadRange: '2,000–20,000 kg', treatment: 'ISPM-15 Heat Treatment',
    certifications: ['ISPM-15', 'ISO 9001:2015', 'ODC Engineering Certified'],
    industryPrimary: 'ODC & Heavy Engineering', comparisonAlt: 'Metal Skid',
    keywords: ['wooden skids manufacturer India', 'ODC skids Mumbai', 'heavy equipment skids supplier'],
  },
  'wooden-boxes': {
    material: 'Solid Pine / Hardwood Sheathing', loadRange: 'Up to 5,000 kg', treatment: 'ISPM-15 Certified',
    certifications: ['ISPM-15', 'ISO 9001:2015'],
    industryPrimary: 'Export & Machinery Transit', comparisonAlt: 'Corrugated Box',
    keywords: ['wooden boxes manufacturer Mumbai', 'export wooden crates India', 'machinery packaging boxes'],
  },
  'plywood-boxes': {
    material: 'Commercial / Marine Grade Plywood', loadRange: 'Up to 3,000 kg', treatment: 'ISPM-15 Exempt (Plywood)',
    certifications: ['ISPM-15 Exempt', 'ISO 9001:2015', 'WBP Glue Certified'],
    industryPrimary: 'Precision & Pharma Export', comparisonAlt: 'Solid Wood Box',
    keywords: ['plywood boxes manufacturer Mumbai', 'nail-less boxes India', 'export plywood packaging'],
  },
  'packaging-materials': {
    material: 'LLDPE / VCI Compounds / Silica Gel', loadRange: 'N/A (Protective Films)', treatment: 'Chemical / Physical Barrier',
    certifications: ['ISO 9001:2015', 'VCI MIL-PRF-3150', 'DMF-Free Certification'],
    industryPrimary: 'Metal & Electronics Protection', comparisonAlt: 'Traditional Oil Coating',
    keywords: ['VCI packaging India', 'anti-rust packaging Mumbai', 'silica gel desiccant supplier'],
  },
  'packaging-laminates': {
    material: 'PET / Aluminum Foil / Kraft / VCI Film', loadRange: 'N/A (Barrier Films)', treatment: 'Multi-Layer Co-extrusion',
    certifications: ['ISO 9001:2015', 'MIL-SPEC Barrier', 'ASTM D1434'],
    industryPrimary: 'Sea Freight & Defense', comparisonAlt: 'Single Layer Poly Film',
    keywords: ['barrier films manufacturer India', 'VCI film supplier Mumbai', 'aluminum foil packaging'],
  },
  'plywood-wood-material': {
    material: 'Marine / Commercial Plywood, Pine, Hardwood', loadRange: 'N/A (Construction Material)', treatment: 'Kiln Dried',
    certifications: ['IS:710 Marine Plywood', 'CARB2 Compliant', 'FSC Certified'],
    industryPrimary: 'Packaging Manufacturing', comparisonAlt: 'MDF Boards',
    keywords: ['marine plywood supplier Mumbai', 'packaging timber India', 'OSB board supplier'],
  },
  'packaging-hardware': {
    material: 'Forged Steel / Alloy / HDPE', loadRange: 'SWL: Up to 10 tons', treatment: 'Zinc Plated / Galvanized',
    certifications: ['ISO 9001:2015', 'DIN / EN Standard', 'BIS Certified'],
    industryPrimary: 'Box & Crate Construction', comparisonAlt: 'Non-Certified Hardware',
    keywords: ['packaging hardware supplier Mumbai', 'industrial fasteners India', 'strapping hardware manufacturer'],
  },
  'lashing-materials': {
    material: 'Polyester Webbing / Alloy Steel / IWRC Wire', loadRange: 'SWL: 500 kg–50 tons', treatment: 'Galvanized / Tensioned',
    certifications: ['ISO 9001:2015', 'EN 12195-2', 'IMO CTU Code'],
    industryPrimary: 'Container & ODC Cargo', comparisonAlt: 'Manila Rope',
    keywords: ['lashing materials supplier India', 'container lashing Mumbai', 'cargo securing systems'],
  },
  'antirust-treatment': {
    material: 'VCI / Chemical Inhibitors / Rust Oil', loadRange: 'N/A (Surface Treatment)', treatment: 'Chemical Barrier',
    certifications: ['ISO 9001:2015', 'VCI MIL-PRF-3150', 'REACH Compliant'],
    industryPrimary: 'Metal Parts & Machinery', comparisonAlt: 'Bare Metal Storage',
    keywords: ['anti-rust treatment India', 'VCI paper supplier Mumbai', 'rust prevention packaging'],
  },
  'heavy-engineering-packaging': {
    material: 'Structural Wood + Steel Frame Hybrid', loadRange: 'Up to 200+ tons', treatment: 'Complete ODC Engineering',
    certifications: ['ISO 9001:2015', 'ISPM-15', 'Bureau Veritas Certified'],
    industryPrimary: 'Power, EPC & Infrastructure', comparisonAlt: 'Standard Export Crate',
    keywords: ['heavy engineering packaging India', 'turbine packaging Mumbai', 'ODC packaging manufacturer'],
  },
  'vacuum-packaging': {
    material: 'Multi-layer VCI + Aluminum + Nylon', loadRange: 'N/A (Protective System)', treatment: 'Vacuum Heat Sealing',
    certifications: ['ISO 9001:2015', 'MIL-PRF-3150', 'ASTM F88'],
    industryPrimary: 'Electronics & Defense', comparisonAlt: 'Standard Poly Bag',
    keywords: ['vacuum packaging India', 'VCI vacuum bags Mumbai', 'ESD vacuum packaging supplier'],
  },
  'stretch-wrapping': {
    material: 'LLDPE Cast / Blown Stretch Film', loadRange: 'Up to 2,000 kg (Unitized)', treatment: 'Pre-Stretch / Machine Grade',
    certifications: ['ISO 9001:2015', 'ASTM D5748'],
    industryPrimary: 'Warehousing & Logistics', comparisonAlt: 'Strapping Only',
    keywords: ['stretch wrapping India', 'pallet wrapping Mumbai', 'stretch film manufacturer'],
  },
  'corrugated-cartons': {
    material: '3 ply to 9 ply Kraft Paper Corrugated', loadRange: 'Up to 250 kg per carton', treatment: 'Wax / Poly Moisture Coat',
    certifications: ['ISO 9001:2015', 'IS:2771', 'ECT / BCT Tested'],
    industryPrimary: 'FMCG, E-Commerce & Pharma', comparisonAlt: 'Wooden Box',
    keywords: ['corrugated boxes manufacturer Mumbai', 'carton box supplier India', 'printed boxes manufacturer'],
  },
  'dunnage-bag': {
    material: 'Kraft Paper / Polywoven Outer, PP Bladder', loadRange: 'Void Fill: Up to 90,000 kg friction', treatment: 'Air Inflation',
    certifications: ['AAR Level 1–5', 'ISO 9001:2015', 'EUMOS 40509'],
    industryPrimary: 'Container & Rail Cargo', comparisonAlt: 'Foam Void Fill',
    keywords: ['dunnage bags supplier India', 'cargo air bags Mumbai', 'void fill packaging'],
  },
  'special-cases': {
    material: 'ABS / HDPE + Birch Plywood', loadRange: 'Up to 50 kg', treatment: 'IP67 Sealed / Foam Lined',
    certifications: ['ISO 9001:2015', 'IP67/IP68', 'MIL-STD-810'],
    industryPrimary: 'Defense, Aerospace & Field Service', comparisonAlt: 'Cardboard Transit Box',
    keywords: ['flight cases manufacturer India', 'instrument cases Mumbai', 'tool cases supplier'],
  },
  'wood-fibre-packaging': {
    material: 'Recycled Wood Fiber / Molded Pulp', loadRange: 'Up to 500 kg', treatment: 'Heat Molded',
    certifications: ['ISO 9001:2015', 'FSC Certified', 'ISPM-15 Exempt'],
    industryPrimary: 'Tubes, Bars & Bundle Export', comparisonAlt: 'Corrugated Tube End',
    keywords: ['wood fibre packaging India', 'molded fiber packaging Mumbai', 'eco packaging manufacturer'],
  },
  'services': {
    material: 'On-Site Service — Materials per Project', loadRange: 'Any Cargo Size', treatment: 'Bureau Veritas Supervised',
    certifications: ['ISO 9001:2015', 'Bureau Veritas', 'IMO CTU Code'],
    industryPrimary: 'EPC, Chemical & Manufacturing', comparisonAlt: 'In-House Packing',
    keywords: ['palletization services Mumbai', 'on-site packing India', 'container stuffing service'],
  },
  'special-services': {
    material: 'UV Film / Steel Strapping / UN Packaging', loadRange: 'Any Size', treatment: 'IMDG / IATA Compliant',
    certifications: ['ISO 9001:2015', 'UN Certification', 'IMDG Compliant'],
    industryPrimary: 'Dangerous Goods & Oversized Projects', comparisonAlt: 'Standard Packing Service',
    keywords: ['dangerous goods packing India', 'shrink wrapping service Mumbai', 'DG packing supplier'],
  },
};

function getMeta(categoryId: string) {
  return categoryMeta[categoryId] || {
    material: 'Industrial Grade Material', loadRange: 'As per specification', treatment: 'Standard Treatment',
    certifications: ['ISO 9001:2015'], industryPrimary: 'Industrial Packaging', comparisonAlt: 'Generic Alternative',
    keywords: ['industrial packaging India', 'packaging manufacturer Mumbai'],
  };
}

// ──────────────────────────────────────────────
// MAIN GENERATOR
// ──────────────────────────────────────────────

export function generateProductContent(
  product: {
    id: string; name: string; subTitle: string; specs: string[]; img: string;
    seoTitle?: string; h1?: string;
  },
  category: Category
): GeneratedProductContent {
  const meta = getMeta(category.id);
  const productName = product.name;
  const categoryName = category.title;
  const subTitle = product.subTitle;

  /**
   * The word the page uses INSTEAD of the product name after first mention.
   *
   * The old template pushed `${productName}` into 23 slots, which on
   * /export-plastic-pallet produced the exact phrase 49 times in 2,186 words —
   * 6.7% density, against a natural 0.5-1.5%. It also read as machine-written,
   * because a singular product name was being substituted into sentences built
   * for plurals ("Export Plastic Pallet are..." appeared seven times).
   *
   * So the name is now stated where a human would state it — heading, opening
   * sentence, a few questions — and everywhere else this noun carries the
   * sentence.
   */
  const shortNoun = SHORT_NOUNS[category.id] ?? 'unit';
  const shortPlural = shortNoun.endsWith('s') ? shortNoun : `${shortNoun}s`;

  // ── META ──
  // A product may claim its own title and H1. That is how the 22 pallet pages
  // stop competing with each other: only /wooden-pallets keeps the broad
  // "wooden pallet manufacturer" phrasing, every sub-type page states its own
  // term. Products without an override keep the generated title.
  const metaTitle = product.seoTitle
    ?? `${productName} Manufacturer in Mumbai | ${categoryName} | Europack India`;
  const metaDescription = `Buy high-quality ${productName} from Europack — India's leading ${categoryName.toLowerCase()} manufacturer in Mumbai. ${subTitle}. ISPM-15 Certified. Get a free quote today.`;
  const h1 = product.h1 ?? `${productName} — ${subTitle}`;
  const h1Sub = subTitle;

  // ── INTRO (300-400 words) ──
  const loadInfoIntro = meta.loadRange ? `, processed under strict quality controls and validated for load ratings of ${meta.loadRange}` : `, and processed under strict quality controls to ensure industrial reliability`;
  const intro = `Europack manufactures ${productName} for export cargo and heavy-duty industrial logistics. Each ${shortNoun} is built from ${meta.material}${loadInfoIntro}, and every unit is dimensionally verified and inspected against its compliance paperwork before it leaves the floor.

Production runs across four sites — Mumbai, Bhiwandi, Vadodara and Jamshedpur — which is what puts the Maharashtra and Gujarat industrial belts, and the JNPT export corridor, within short delivery of a plant rather than a freight quote. Buyers in Pune, Nashik and the wider MMR order from the same lines.

Sizes are not fixed. Tell us the cargo — weight, dimensions, stacking pattern, forklift type and destination — and the ${shortNoun} is specified to it rather than the other way round.`

  // ── OVERVIEW (200 words) ──
  const loadInfoOverview = meta.loadRange ? `Designed for load ratings of ${meta.loadRange}, the` : `The`;
  const overview = `${loadInfoOverview} ${shortNoun} is engineered for ${meta.industryPrimary.toLowerCase()} work, where structural integrity and clean compliance paperwork decide whether a shipment moves. It is built from ${meta.material} and carries ${meta.certifications.slice(0, 2).join(' and ')}.

It combines ${product.specs.slice(0, 3).join(', ')}, which is what keeps the load intact across the whole journey rather than only at the point it was packed.

Before anything is cut, our engineers check the design against forklift entry, crane lifting points, container stacking and the customs documentation the destination will ask for.`

  // ── KEY FEATURES ──
  const keyFeatures = [
    ...product.specs,
    `${meta.certifications[0]} Certified`,
    meta.loadRange ? `Load capacity: ${meta.loadRange}` : null,
    `Material: ${meta.material}`,
    'Custom sizes available on request',
    'Pan-India delivery & port dispatch',
    'ISO 9001:2015 quality assured production',
  ].filter(Boolean) as string[];

  // ── SPECIFICATIONS ──
  const specs = [
    { key: 'Product Name', value: productName },
    { key: 'Category', value: categoryName },
    { key: 'Sub-Type', value: subTitle },
    { key: 'Material', value: meta.material },
    meta.loadRange ? { key: 'Load Capacity', value: meta.loadRange } : null,
    { key: 'Treatment', value: meta.treatment },
    { key: 'Certification', value: meta.certifications.join(', ') },
    { key: 'MOQ', value: 'Contact for category-specific MOQ' },
    { key: 'Lead Time', value: '3–10 working days (standard configurations)' },
    { key: 'Delivery', value: 'Pan-India + Port Delivery' },
    { key: 'Customization', value: 'Available — Dimensions, Treatment, Marking' },
    { key: 'Quality Assurance', value: 'ISO 9001:2015 — 100% Inspection' },
  ].filter(Boolean) as { key: string; value: string }[];

  // ── TECHNICAL DETAILS ──
  // The four rows that used to sit at the top of this table read the product's
  // `specs` bullets positionally — specs[0] as "Construction", specs[1] as
  // "Surface Finish", and so on — so /cp1-pallets claimed an entry type of
  // "ISPM-15 Compliant" and a surface finish of "Peripheral Deck". The bullets
  // are an unordered highlight list, not a fixed schema, so they are no longer
  // labelled. They still render beside this table as "at a glance", and pallet
  // pages carry a real, per-product spec table (see SpecTable / PalletSpec).
  const technicalDetails = [
    { key: 'Material', value: meta.material },
    meta.loadRange ? { key: 'Load Capacity', value: meta.loadRange } : null,
    { key: 'Treatment', value: meta.treatment },
    { key: 'Compliance', value: meta.certifications[0] },
    { key: 'Testing', value: 'Load test, dimensional verification, compliance audit' },
    { key: 'Marking', value: 'IPPC / CE / Custom stencil available' },
    { key: 'Packaging of Finished Goods', value: 'Stackable / Bundled per delivery specs' },
  ].filter(Boolean) as { key: string; value: string }[];

  // ── APPLICATIONS ──
  const appBank: Record<string, { icon: string; title: string; desc: string }[]> = {
    'wooden-pallets': [
      { icon: 'Factory', title: 'Heavy Machinery Export', desc: 'Turbines, CNC machines, and industrial equipment for global ocean freight.' },
      { icon: 'Truck', title: 'Automotive OEM', desc: 'CKD kits and precision component unitization for Tier-1 manufacturers.' },
      { icon: 'Warehouse', title: 'Warehouse Racking', desc: 'Rackable pallet designs compatible with ASRS and conventional racking systems.' },
      { icon: 'HeartPulse', title: 'Pharmaceutical', desc: 'Hygienic, splinter-free surfaces for GMP-compliant pharma distribution.' },
      { icon: 'FlaskConical', title: 'Chemical Industry', desc: 'CP-series and standard pallets for bagged and drummed chemical goods export.' },
      { icon: 'Package', title: 'FMCG & Retail', desc: 'High-volume pallet supply for FMCG unitization and retail distribution centers.' },
    ],
    'metal-pallets': [
      { icon: 'Flame', title: 'Fire-Risk Environments', desc: 'Non-combustible metal pallets for petroleum, chemical, and explosives storage.' },
      { icon: 'Truck', title: 'Automotive Assembly', desc: 'Steel pallets for heavy component assembly lines requiring durability.' },
      { icon: 'Warehouse', title: 'Cold Storage', desc: 'Corrosion-resistant metal pallets for refrigerated warehouses.' },
      { icon: 'FlaskConical', title: 'Chemical Plants', desc: 'Washable, acid-resistant pallets for chemical manufacturing environments.' },
      { icon: 'Factory', title: 'Heavy Engineering', desc: 'Multi-ton load bearing capacity for heavy machinery manufacturing floors.' },
      { icon: 'Globe', title: 'Long-Term Storage', desc: 'Durable, long-lifecycle pallets for asset-intensive logistics operations.' },
    ],
  };

  const defaultApps = [
    { icon: 'Factory', title: meta.industryPrimary, desc: `${productName} is purpose-built for ${meta.industryPrimary.toLowerCase()} applications requiring maximum structural integrity.` },
    { icon: 'Globe', title: 'International Export', desc: `Compliant with ${meta.certifications[0]} for seamless customs clearance in global markets.` },
    { icon: 'Warehouse', title: 'Warehouse & Storage', desc: 'Engineered for efficient storage and space-optimized stacking in modern warehousing.' },
    { icon: 'Truck', title: 'Multimodal Logistics', desc: `Compatible with road, rail, ocean, and air freight for complete supply chain coverage.` },
    { icon: 'HeartPulse', title: 'Pharma & MedTech', desc: 'Hygienic surfaces and controlled specifications for GMP-grade pharmaceutical distribution.' },
    { icon: 'HardHat', title: 'Defense & Aerospace', desc: 'MIL-SPEC grade specifications for sensitive defense and aerospace component packaging.' },
  ];

  const applications = appBank[category.id] || defaultApps;

  // ── MANUFACTURING STEPS ──
  const mfgBank: Record<string, { step: string; title: string; desc: string }[]> = {
    'wooden-pallets': [
      { step: '01', title: 'Timber Selection', desc: 'Certified pine logs graded for grain density, moisture, and structural fitness.' },
      { step: '02', title: 'CNC Precision Cutting', desc: 'Automated saw lines cut boards to ±1mm tolerance with zero warping allowance.' },
      { step: '03', title: 'Assembly & Nailing', desc: 'ISO 8611-compliant nail patterns on precision jig tables for structural repeatability.' },
      { step: '04', title: 'ISPM-15 Heat Treatment', desc: 'Core temperature of 56°C maintained for 30 minutes in IPPC-registered kilns.' },
      { step: '05', title: 'QC, Stamp & Dispatch', desc: 'Load test, dimensional audit, IPPC stamp, and documentation pre-delivery.' },
    ],
    'metal-pallets': [
      { step: '01', title: 'Steel Grade Selection', desc: 'IS:2062 grade mild steel or alloy steel selected per load requirements.' },
      { step: '02', title: 'Plasma Cutting & Forming', desc: 'CNC plasma cutting and press brake forming for precise structural geometry.' },
      { step: '03', title: 'MIG Welding', desc: 'Certified welders apply MIG welding to all structural joints to full penetration spec.' },
      { step: '04', title: 'Surface Treatment', desc: 'Shot blasting followed by hot-dip galvanizing or powder coating for corrosion resistance.' },
      { step: '05', title: 'Load Test & Dispatch', desc: 'Static and dynamic load testing to rated SWL with full documentation and marking.' },
    ],
  };

  const defaultMfg = [
    { step: '01', title: 'Material Inspection', desc: `${meta.material} sourced and inspected for grade, dimensional accuracy, and certification compliance.` },
    { step: '02', title: 'Processing & Forming', desc: 'Precision manufacturing using industry-specific equipment to exact engineering specifications.' },
    { step: '03', title: 'Surface Treatment', desc: `${meta.treatment} applied per specification to ensure longevity and compliance during transit.` },
    { step: '04', title: 'Quality Inspection', desc: 'Multi-stage dimensional, structural, and compliance inspection by trained QC engineers.' },
    { step: '05', title: 'Documentation & Dispatch', desc: 'Full compliance documentation, marking, and coordinated delivery to factory or port.' },
  ];

  const manufacturingSteps = mfgBank[category.id] || defaultMfg;

  // ── QUALITY STANDARDS ──
  const qualityStandards = meta.certifications.map((cert, i) => ({
    title: cert,
    desc: [
      `All ${productName.toLowerCase()} are manufactured and certified under ${cert} standards, ensuring full compliance at every global shipping checkpoint.`,
      `Our ${cert} registration and compliance documentation is provided with every shipment, supporting seamless customs clearance.`,
      `The ${cert} standard ensures our ${productName.toLowerCase()} meet the highest quality benchmark in the international packaging industry.`,
    ][i % 3],
  }));

  qualityStandards.push({
    title: 'ISO 9001:2015 Production',
    desc: 'Our entire manufacturing process operates under ISO 9001:2015 certified quality management — ensuring consistent product quality across every batch.',
  });

  // ── CUSTOMIZATION ──
  const customizationOptions = [
    `Custom dimensions (length × width × height) to match your specific cargo footprint`,
    `Load capacity engineering — from light-duty to heavy ODC multi-ton configurations`,
    `Material upgrades — premium grades, higher density, or specialty composites`,
    `Surface treatment options — special coatings, markings, or compliance stamps`,
    `Custom labeling, stenciling, and barcode marking for inventory tracking`,
    `Color coding options for product differentiation in multi-SKU warehouses`,
    `Special entry configurations (2-way, 4-way, ramp, or crane-ready designs)`,
    `Combined packaging systems — integrated with VCI, desiccant, or stretch wrap`,
  ];

  // ── COMPARISON ──
  const comparisonBase = [
    { feature: 'Cost per Unit', thisProduct: 'Competitive / Optimized', alternative: 'Higher / Variable', thisBetter: true },
    { feature: 'Certification', thisProduct: meta.certifications[0], alternative: 'Often Uncertified', thisBetter: true },
    { feature: 'Custom Sizing', thisProduct: 'Any Dimension', alternative: 'Limited Sizes', thisBetter: true },
    { feature: 'Lead Time', thisProduct: '3–10 Working Days', alternative: '15–30 Days', thisBetter: true },
    { feature: 'Pan-India Delivery', thisProduct: 'Yes — All Major Cities', alternative: 'Selective Coverage', thisBetter: true },
    { feature: 'Technical Support', thisProduct: 'Free Engineering Consultation', alternative: 'None Included', thisBetter: true },
  ];

  // ── WHY EUROPACK ──
  const whyEuropack = [
    { title: '33+ Years of Expertise', desc: 'Three decades of industrial packaging engineering for India\'s most demanding export sectors — from turbines to pharmaceuticals.' },
    { title: '3000+ Active Clients', desc: 'Trusted by Fortune 500 OEMs, EPC contractors, logistics companies, and mid-scale exporters across India and globally.' },
    { title: 'Across Pan India', desc: 'Strategic production facilities ensure fast lead times and seamless pan-India coverage without delays.' },
    { title: '100% Quality Guarantee', desc: 'Every shipment backed by ISO 9001:2015 certified QC processes and full compliance documentation including test reports.' },
  ];

  // ── DELIVERY INFO ──
  const deliveryInfo = [
    { title: 'Bulk Supply Available', desc: 'We handle high-volume orders for manufacturing plants, freight forwarders, and large-scale exporters with competitive volume pricing.' },
    { title: 'Pan-India Factory Delivery', desc: 'Door delivery to your factory or warehouse across all major industrial zones — Mumbai, Pune, Chennai, Jamshedpur, Vadodara, Ahmedabad.' },
    { title: 'Direct Port Dispatch', desc: 'Coordinated delivery to JNPT, Mundra, Chennai, Vizag, and Kolkata ports, working directly with your CHA/freight forwarder.' },
  ];

  // ── CLOSING PROSE ──
  // This block used to run ~700 words and ended with
  // `${meta.keywords.join(' | ')} — Keywords That Reflect Our Expertise`,
  // i.e. the target keyword list printed on the page as visible copy. That is
  // keyword stuffing in the plainest sense Google's spam policy describes, and
  // on a template rendering ~115 pages it is also scaled-content abuse. It is
  // the single likeliest reason these pages rank for "Europack <product>" but
  // not for the product term on its own: the brand query has no competition,
  // the generic one does.
  //
  // What replaces it says only things the repo can stand behind — the four
  // sites are the ones on the company's own card, and no client count, country
  // count, headcount or floor area is asserted here.
  const seoContent = `Europack has manufactured industrial packaging since 1992, and ${shortPlural} of this type are a core line rather than a sideline. The ${shortNoun} is made to ${meta.certifications[0]}, from ${meta.material}.

Where it is made matters more than it sounds. ${shortPlural.charAt(0).toUpperCase() + shortPlural.slice(1)} are bulky, low-value-per-cubic-metre freight, so delivered cost turns on distance and road access far more than on the unit price. Our Bhiwandi site sits inside Mumbai's logistics belt with direct road access to JNPT, which is what makes same-week delivery to a Pune, Nashik or Navi Mumbai plant — or straight to the port for a stuffing date — a routine order rather than an expedite.

The specification is the part worth getting right. ${meta.certifications[0]} compliance is table stakes; the questions that actually change the ${shortNoun} are how the load sits on it, how it is lifted, how high it stacks and what the destination's customs will inspect. Send us the cargo details and we will come back with a specification and a landed price, usually within one business day.`

  // ── FAQ ──
  // Was twelve questions, every one opening with the full product name and most
  // answers repeating it again — roughly twenty of the page's forty-nine
  // occurrences came from this block alone. Now eight, with the name in three
  // of them, which is how a buyer would actually write the question.
  //
  // Lead time is stated once here and matches the specs table. The two used to
  // disagree: the table said 3-10 working days while the FAQ said 3-5 for
  // standard and 7-12 for custom.
  const faq = [
    { q: `What load will ${productName} take?`, a: meta.loadRange
        ? `The standard range is ${meta.loadRange}. Higher ratings are a design question rather than a catalogue one — send us the load and how it sits, and we will tell you what it needs.`
        : `Load rating depends entirely on configuration for this type. Send us the cargo weight and how it is distributed and we will specify against it.` },
    { q: `Is it ${meta.certifications[0]} certified?`, a: `Yes. Compliance documentation — certificates, treatment records and test reports — ships with the consignment, because the paperwork arriving late is what actually holds cargo at a checkpoint.` },
    { q: 'Can I get a custom size?', a: `Yes, and it is the normal case rather than a special order. Give us the cargo dimensions, weight, stacking requirement and transport mode, and the ${shortNoun} is built to those.` },
    { q: 'What is the minimum order?', a: 'It varies by configuration and we would rather quote your actual quantity than publish a number that is wrong for most orders. Tell us what you need and we will confirm.' },
    { q: 'How long does it take?', a: 'Standard configurations run 3–10 working days from order confirmation. A custom design adds to that depending on tooling. Where capacity allows we will take urgent work — say so when you enquire rather than after.' },
    { q: 'Do you deliver to Pune, Nashik or the port?', a: `Yes. We supply across the Mumbai metropolitan region, Pune, Nashik and the Gujarat GIDC belt, and deliver direct to JNPT, Mundra, Chennai, Vizag and Kolkata, working to your CHA's timeline. For an export order, send us the stuffing date rather than a required-by date.` },
    { q: `What is ${productName} made from?`, a: `${meta.material}. Which grade you get depends on the load, how long it is in transit and what the destination requires — it is not a single fixed recipe.` },
    { q: 'Can you help choose the right specification?', a: `Yes, at no cost. Our packaging engineers will go through the cargo, the route and the destination's requirements with you before anything is quoted. Getting this wrong is more expensive than the ${shortNoun}.` },
  ];

  // The generated "case study" is gone. It assigned one of four write-ups by
  // `product.id.charCodeAt(0) % 4`, so the same claim — "saving approximately
  // ₹18 lakhs annually", "damage from 5.8% to under 0.5%", "zero rejections
  // across 25 countries" — appeared on roughly thirty different product pages
  // with the product name swapped. Nothing in the repo supports any of those
  // figures, and they were attributed to unnamed but identifiable-sounding
  // clients. It rendered nowhere, so removing it changes no page.

  // ── IMAGES ──
  const imagePool = [
    '/images/products/user_heavy_engineering_crane.jpg',
    '/images/products/user_pipe_work.png',
    '/images/products/user_wooden_crates.avif',
    '/images/products/user_reusable_collar_pallets.jpg',
    '/images/products/user_vacuum_packing.png',
    '/images/products/user_printed_corrugated.jpg',
    '/images/products/user_export_lashing.png',
    '/images/products/user_seaworthy_laminates.jpg',
    '/images/products/user_ms_frame_packing.jpg',
  ];
  const images = [
    product.img,
    imagePool[product.id.length % imagePool.length],
    imagePool[(product.id.length + 2) % imagePool.length],
    imagePool[(product.id.length + 3) % imagePool.length],
    imagePool[(product.id.length + 5) % imagePool.length],
  ];

  return {
    metaTitle, metaDescription, h1, h1Sub, intro, overview, keyFeatures, applications,
    specs, technicalDetails, manufacturingSteps, qualityStandards, customizationOptions,
    comparison: comparisonBase, comparisonLabel: meta.comparisonAlt, whyEuropack,
    deliveryInfo, seoContent, faq, images,
  };
}

// ──────────────────────────────────────────────
// HELPER: find product by category + slug
// ──────────────────────────────────────────────
export function findProductBySlug(categoryId: string, productId: string, data: Category[]) {
  const category = data.find(c => c.id === categoryId);
  if (!category) return null;
  for (const sub of category.subCategories) {
    const product = sub.products.find(p => p.id === productId);
    if (product) return { product, category, subCategory: sub };
  }
  return null;
}

export function getAllProductSlugs(data: Category[]) {
  const slugs: { category: string; productSlug: string }[] = [];
  for (const cat of data) {
    for (const sub of cat.subCategories) {
      for (const product of sub.products) {
        slugs.push({ category: cat.id, productSlug: product.id });
      }
    }
  }
  return slugs;
}
