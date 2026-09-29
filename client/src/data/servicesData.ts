export interface ServiceData {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  img: string;
  icon?: string;
  benefits: string[];
  features: string[];
  applications?: string[];
  faqs?: { question: string; answer: string }[];
  /** Overrides the h1, which otherwise repeats `name` and reads as a label. */
  h1?: string;
  metaTitle?: string;
  metaDescription?: string;
  /** Body sections. Without these a service page renders ~300 words. */
  sections?: { heading: string; body: string }[];
}

export const servicesData: ServiceData[] = [
  {
    slug: 'crate-packing',
    name: 'Crate Packing',
    shortDesc: 'Custom ISPM-15 wooden crates for heavy machinery.',
    longDesc: 'Our structural crating systems are custom-engineered for multi-ton heavy machinery. Using CNC precision and ISPM-15 certified wood, we ensure your cargo survives the most rigorous global logistics routes. We provide tailored solutions ranging from open-slat crates for standard shipments to fully enclosed heavy-duty boxes for delicate engineering components.',
    img: '/images/services/crate_premium.png',
    benefits: [
      'ISPM-15 Compliance for global export without delays.',
      'Custom CNC cut bracing to completely immobilize cargo.',
      'High strength-to-weight ratio for optimal freight costs.',
      'Shock dampening bases for sensitive electronics.'
    ],
    features: [
      'Heavy Duty Hardwood / Pinewood construction',
      'Galvanized steel bolted latches',
      'Internal VCI lining integration',
      'Structural load-bearing skids'
    ]
  },
  {
    slug: 'stretch-wrapping',
    name: 'Stretch Wrapping',
    shortDesc: 'Automated pallet unitisation for load stability.',
    longDesc: 'Stretch wrapping is critical for load unitisation and stability during transit. We provide high-performance LLDPE stretch wrapping services that protect cargo from dust, moisture, and pilferage while ensuring pallet loads remain completely stable under dynamic transport forces.',
    img: '/images/services/grid/stretch_wrapping.png',
    benefits: [
      'Prevents cargo shifting during sudden stops.',
      'Protects against surface abrasions and dust.',
      'Cost-effective load stabilization.',
      'Clear visibility for barcode scanning and inspections.'
    ],
    features: [
      'Multi-layer wrap for high puncture resistance',
      'Machine and manual application',
      'UV-resistant options for outdoor storage',
      'Tension-optimized to prevent product crushing'
    ]
  },
  {
    slug: 'vacuum-packing',
    name: 'Vacuum Packing',
    shortDesc: 'Moisture-proof aluminum barrier foil sealing.',
    longDesc: 'Precision electronics, unpainted metal surfaces, and sensitive machinery require absolute protection from ambient moisture and salt-laden sea air. Our vacuum packing process uses multi-layer aluminum barrier foils, combined with active desiccants, to create a hermetically sealed, zero-moisture micro-environment.',
    img: '/images/products/user_vacuum_packing.png',
    benefits: [
      'Zero corrosion risk during long sea freight.',
      'Protection against mold, mildew, and fungi.',
      'Maintains factory-calibration of sensitive parts.',
      'Long-term storage capability (up to 5 years).'
    ],
    features: [
      'PET/ALU/PE Triplex barrier foil',
      'Integrated desiccant calculation (Silica/Clay)',
      'Vacuum extraction & heat sealing',
      'Humidity indicator cards included'
    ]
  },
  {
    slug: 'anti-rust-treatment',
    name: 'Anti-Rust Treatment',
    shortDesc: 'VCI film and chemical corrosion protection.',
    longDesc: 'Our comprehensive anti-rust treatments protect bare metal components from the harsh realities of global shipping. By utilizing Volatile Corrosion Inhibitor (VCI) technology and barrier coatings, we prevent oxidation at a molecular level without leaving messy grease or oil residues.',
    img: '/images/products/user_anti_rust.png',
    benefits: [
      'Eliminates the need for grease coating and degreasing.',
      'Active molecules reach even recessed cavities.',
      'Ready-to-use parts directly out of packaging.',
      'Safe, eco-friendly, and non-toxic.'
    ],
    features: [
      'VCI Papers and Poly Bags',
      'Rust preventive aerosol sprays',
      'VCI Emitters for large enclosures',
      'Multi-metal protection chemistry'
    ]
  },
  {
    slug: 'container-lashing-stuffing',
    name: 'Container Lashing & Stuffing',
    shortDesc: 'High-tension securing and optimized container loading.',
    longDesc: 'Improper cargo securing is a leading cause of transit damage. Our certified lashing teams perform expert container stuffing, choking, and high-tension lashing to secure Over-Dimensional Cargo (ODC) and standard pallets. We ensure zero cargo shift even under extreme oceanic pitching and rolling.',
    img: '/images/home/ocean_lashing.png',
    benefits: [
      'Zero-shift guarantee during sea and rail transit.',
      'Maximized container space utilization.',
      'Compliance with international CTU Code standards.',
      'Detailed lashing certificates and photographic proof.'
    ],
    features: [
      'Heavy-duty steel wire rope lashing',
      'Grade 80 alloy chain securing',
      'Custom wooden dunnage and choking',
      'Ratchet belts for standard loads'
    ]
  },
  {
    slug: 'shrink-wrapping',
    name: 'Shrink Wrapping',
    shortDesc: 'Heavy-duty thermowrap for weather protection.',
    longDesc: 'For massive structures, boats, and heavy machinery that cannot be boxed, industrial shrink wrapping provides a drum-tight, weather-proof skin. Our heavy-duty LDPE shrink films are heat-shrunk to contour perfectly to the cargo, providing an impenetrable barrier against wind, rain, and UV rays.',
    img: '/images/products/user_shrink_wrapping_process.png',
    benefits: [
      'Complete weatherproofing for open-deck sea freight.',
      'Significantly lighter and cheaper than wooden enclosures.',
      'UV inhibitors prevent sun damage during storage.',
      'Vented options prevent internal condensation.'
    ],
    features: [
      '200+ micron industrial-grade film',
      'Proprietary heat-welding techniques',
      'Zipper access doors for customs inspection',
      'Padded sharp-edge protection'
    ]
  },
  {
    slug: 'fumigation',
    name: 'Fumigation',
    shortDesc: 'ISPM-15 compliant pest eradication for wood packaging.',
    longDesc: 'International phytosanitary regulations strictly mandate that all solid wood packaging be treated to prevent the spread of invasive pests. Our ISPM-15 compliant fumigation and heat treatment services ensure your cargo crosses international borders seamlessly, avoiding costly rejections or delays.',
    img: '/images/products/ispm-15-certified-pinewood-boxes-for-export-cargo-shipping.png',
    benefits: [
      '100% compliance with global ISPM-15 import regulations.',
      'Eradicates all wood-boring insects and larvae.',
      'Official IPPC stamping and certification provided.',
      'Fast turnaround for urgent shipments.'
    ],
    features: [
      'Controlled Heat Treatment (HT) chambers',
      'Methyl Bromide (MB) fumigation where required',
      'Detailed treatment certificates',
      'Pre-export compliance auditing'
    ],
    h1: 'ISPM-15 Heat Treatment & Fumigation Services',
    metaTitle: 'ISPM-15 Heat Treatment & Fumigation in Mumbai | Europack',
    metaDescription:
      'ISPM-15 heat treatment at 56 °C core for 30 minutes in IPPC-registered kilns, MB fumigation where a destination requires it, and the treatment certificate with every consignment.',
    sections: [
      {
        heading: 'What ISPM-15 actually requires',
        body: 'ISPM-15 applies to solid wood packaging — pallets, crates, boxes, skids, dunnage and bracing — moving across international borders. The standard does not care what the packaging looks like; it cares that the wood has been treated so it cannot carry wood-boring insects, and that the treatment is evidenced by a mark a customs inspector can read. Untreated or unmarked wood is refused at the border, and the cost of that is never the packaging: it is the re-export, the demurrage and the delivery date.',
      },
      {
        heading: 'Heat treatment, and why it is the default',
        body: 'Heat treatment brings the core of the timber — not its surface — to 56 °C and holds it there for at least 30 continuous minutes. That is lethal to every wood-boring insect and larva the standard is written for, and it uses no chemicals, so there is nothing to off-gas and nothing a consignee has to handle. We run it in IPPC-registered kilns and stamp each treated piece with our own producer code. It is accepted everywhere ISPM-15 is in force, which is why it is what we run unless a destination specifically asks for something else.',
      },
      {
        heading: 'Methyl bromide, and when it is still asked for',
        body: 'MB fumigation is the chemical alternative the standard allows, and we carry it out where a destination requires it. Fewer do each year — a number of importing countries have moved away from MB on environmental grounds, and a shipment marked MB can be queried where HT would have passed without comment. If your buyer or freight forwarder has specified MB, send us that instruction in writing and we will treat and mark to it. If nobody has specified it, heat treatment is the safer answer.',
      },
      {
        heading: 'Reading the stamp',
        body: 'A compliant mark carries the IPPC wheat symbol, the country code, the registered producer code of the facility that did the treatment, and the treatment code — HT for heat treatment, MB for methyl bromide. That is the whole of it. There is no separate fee-bearing certificate that makes unmarked wood compliant, and a mark applied by anyone other than a registered facility is not compliant regardless of what it says.',
      },
      {
        heading: 'What does not need treating',
        body: 'Plenty of packaging is outside the standard entirely, and treating it is money spent for nothing. Plywood, OSB, particleboard and other manufactured wood are exempt because the manufacturing process already destroys any pest. So are paper, honeycomb board, plastic and metal. If your cargo moves on plywood boxes or plastic pallets, you do not need this service — we will tell you so rather than quote it.',
      },
      {
        heading: 'Paperwork, and when it has to exist',
        body: 'The treatment certificate ships with the consignment, and the timing matters more than people expect: the wood has to be treated and marked before the container is stuffed, not before it sails. Once the box is sealed, a missing stamp cannot be fixed at the port. We work to the stuffing date rather than a required-by date, and deliver direct to JNPT, Mundra, Chennai, Vizag and Kolkata where that is what the schedule needs.',
      },
    ],
    faqs: [
      { question: 'What temperature is ISPM-15 heat treatment?', answer: '56 °C measured at the core of the timber, held for at least 30 continuous minutes. Surface temperature does not count — it is the core reading that the standard and the inspection are concerned with.' },
      { question: 'Is a fumigation certificate the same as a phytosanitary certificate?', answer: 'No, and they are routinely confused. A treatment certificate evidences that the wood packaging was treated to ISPM-15. A phytosanitary certificate is issued for the goods themselves, usually plant products, by the national plant protection organisation. A shipment can need one, both or neither.' },
      { question: 'Do plywood boxes need ISPM-15 treatment?', answer: 'No. Plywood, OSB and other manufactured wood are exempt, because the heat and adhesives used to make them have already destroyed any pest. Paper, plastic and metal packaging are outside the standard too.' },
      { question: 'Should I ask for HT or MB?', answer: 'Heat treatment unless your buyer or freight forwarder has specifically instructed methyl bromide in writing. HT is accepted everywhere the standard applies; MB is accepted in fewer places each year and can invite questions that HT does not.' },
      { question: 'When does the wood need to be treated?', answer: 'Before the container is stuffed. That is the point at which the packaging becomes inaccessible, and an unmarked pallet inside a sealed container is a problem that cannot be solved at the port. Give us the stuffing date and we will work back from it.' },
      { question: 'Do you treat packaging you did not manufacture?', answer: 'Get in touch with what you have and where it is going. What we can do depends on the condition and construction of the wood, so it is a conversation rather than a standard quote.' },
    ]
  },
  {
    slug: 'palletization',
    name: 'Palletization',
    shortDesc: 'Systematic cargo consolidation on specialized pallets.',
    longDesc: 'Efficient palletization is the backbone of modern logistics. We systematically consolidate your cartons, bags, drums, or loose items onto appropriately specified pallets, securing them with strapping, stretch wrap, and edge protectors to create a unified, forklift-ready cargo block.',
    img: '/images/products/Complete-Palletization.webp',
    benefits: [
      'Dramatically speeds up loading and unloading times.',
      'Reduces individual package handling and damage.',
      'Optimizes warehouse storage and container volume.',
      'Enhances overall supply chain efficiency.'
    ],
    features: [
      'Euro, Standard, and Custom pallet sizes',
      'PET and Steel strapping',
      'Corner board protection',
      'Weight distribution optimization'
    ]
  },
  {
    slug: 'on-site-packing',
    name: 'On-Site Packing & Execution',
    shortDesc: 'Mobile deployment teams for factory-side packing.',
    longDesc: 'When machinery is too large, sensitive, or confidential to move unprotected, we bring our packaging facility to you. Our mobile deployment teams execute complete packaging, crating, lashing, and stuffing directly at the customer site, vendor site, or port.',
    img: '/images/products/user_heavy_engineering_packing.jpg',
    benefits: [
      'Eliminates the risk of transporting unprotected cargo.',
      'Reduces logistical handling steps.',
      'Allows direct supervision by your engineering team.',
      'Flexible deployment schedules to match production.'
    ],
    features: [
      'Fully equipped mobile packing units',
      'Trained and insured packing technicians',
      'On-site custom fabrication of bases and crates',
      'Port-side lashing operations'
    ]
  }
];
