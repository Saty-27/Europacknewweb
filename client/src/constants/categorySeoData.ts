import { woodenPalletsSeo } from './seo/woodenPallets';
import { metalPalletsSeo } from './seo/metalPallets';
import { paperPalletsSeo } from './seo/paperPallets';
import { plasticPalletsSeo } from './seo/plasticPallets';
import { moldedPalletsSeo } from './seo/moldedPallets';
import { woodenSkidsSeo } from './seo/woodenSkids';
import { woodenBoxesSeo } from './seo/woodenBoxes';
import { plywoodBoxesSeo } from './seo/plywoodBoxes';
import { packagingMaterialsSeo } from './seo/packagingMaterials';
import { packagingLaminatesSeo } from './seo/packagingLaminates';
import { plywoodWoodMaterialSeo } from './seo/plywoodWoodMaterial';
import { packagingHardwareSeo } from './seo/packagingHardware';
import { lashingMaterialsSeo } from './seo/lashingMaterials';
import { antirustTreatmentSeo } from './seo/antirustTreatment';
import { heavyEngineeringPackagingSeo } from './seo/heavyEngineeringPackaging';
import { vacuumPackagingSeo } from './seo/vacuumPackaging';
import { stretchWrappingSeo } from './seo/stretchWrapping';
import { corrugatedCartonsSeo } from './seo/corrugatedCartons';
import { dunnageBagSeo } from './seo/dunnageBag';
import { specialCasesSeo } from './seo/specialCases';
import { woodFibrePackagingSeo } from './seo/woodFibrePackaging';
import { servicesSeo } from './seo/services';
import { specialServicesSeo } from './seo/specialServices';

export interface CategorySeoArticle {
  metaTitle?: string;
  metaDescription?: string;
  heroText?: string;
  heroBullets?: string[];
  productOverview?: string;
  variantsIntro?: string;
  applications?: string[];
  benefits?: string[];
  whyChoose?: string[];
  processApproach?: string;
  localParagraph?: string;
  blogs?: {
    title: string;
    desc: string;
    slug: string;
  }[];
  faqs: { q: string; a: string }[];
  ctaText?: string;

  // Legacy fallback fields for backward compatibility
  title?: string;
  intro?: string;
  sections?: {
    title: string;
    content: string;
    bullets?: string[];
  }[];
}

export const categorySeoData: Record<string, CategorySeoArticle> = {
  "wooden-pallets": woodenPalletsSeo,
  "metal-pallets": metalPalletsSeo,
  "paper-pallets": paperPalletsSeo,
  "plastic-pallets": plasticPalletsSeo,
  "molded-pallets": moldedPalletsSeo,
  "wooden-skids": woodenSkidsSeo,
  "wooden-boxes": woodenBoxesSeo,
  "plywood-boxes": plywoodBoxesSeo,
  "packaging-materials": packagingMaterialsSeo,
  "packaging-laminates": packagingLaminatesSeo,
  "plywood-wood-material": plywoodWoodMaterialSeo,
  "packaging-hardware": packagingHardwareSeo,
  "lashing-materials": lashingMaterialsSeo,
  "antirust-treatment": antirustTreatmentSeo,
  "heavy-engineering-packaging": heavyEngineeringPackagingSeo,
  "vacuum-packaging": vacuumPackagingSeo,
  "stretch-wrapping": stretchWrappingSeo,
  "corrugated-cartons": corrugatedCartonsSeo,
  "dunnage-bag": dunnageBagSeo,
  "special-cases": specialCasesSeo,
  "wood-fibre-packaging": woodFibrePackagingSeo,
  "services": servicesSeo,
  "special-services": specialServicesSeo
};

export function generateCategoryDynamicSeo(categoryId: string, title: string, desc: string): CategorySeoArticle {
  const formattedTitle = title || categoryId.replace(/-/g, ' ');
  
  const heroText = `Europack provides durable and customized ${formattedTitle.toLowerCase()} for factories, warehouses, exporters, logistics companies, and industrial buyers in Mumbai. Our products are designed for safe storage, forklift handling, container movement, and export packaging requirements.`;
  
  const heroBullets = [
    "Customized sizes available",
    "Suitable for export and domestic transport",
    "Heavy-duty industrial use",
    "Designed for warehouse and forklift handling",
    `Available for Mumbai, Navi Mumbai, Thane and nearby areas`
  ];
  
  const productOverview = `Industrial ${formattedTitle.toLowerCase()} are essential for stabilizing cargo and optimizing warehouse operations. At Europack, we design and manufacture high-quality ${formattedTitle.toLowerCase()} tailored to the specific weight and dimensions of your products. In major manufacturing sectors in Mumbai, Pune, Thane, and Gujarat, companies handle heavy machinery, delicate auto parts, chemical goods, and packaging cartons. Ensuring that these goods are secured on standard platforms reduces transport risks and product damage. We offer custom dimensions, high structural durability, and compliant materials designed to satisfy both domestic freight and international ocean shipments. Custom packaging allows procurement teams to maximize cargo container volume and prevent sliding during transit.`;
  
  const applications = [
    "Warehousing and racking storage",
    "Export cargo container stuffing",
    "Automobile components packaging",
    "Engineering goods transport",
    "Heavy machinery securing",
    "Pharmaceutical and chemical logistics",
    "FMCG storage and retail distribution",
    "Domestic truck transport",
    "Port cargo handling",
    "Long-distance material movement"
  ];
  
  const benefits = [
    "Strong load support",
    "Better material handling",
    "Reduces transit damage",
    "Easy forklift movement",
    "Custom size options",
    "Suitable for export packaging",
    "Helps improve warehouse stacking",
    "Cost-effective packaging support",
    "Better cargo safety",
    "Suitable for heavy industrial goods"
  ];
  
  const whyChoose = [
    "Customized industrial packaging solutions",
    "Practical understanding of Mumbai industrial requirements",
    "Support for exporters and manufacturing units",
    "Packaging as per product size and weight",
    "Suitable for domestic and export cargo",
    "Strong focus on durability and usability",
    "Support for bulk and project-based requirements",
    "Professional packaging guidance",
    "Reliable supply for Mumbai, Navi Mumbai, Thane and Pune buyers"
  ];
  
  const processApproach = `Our process starts with a thorough requirement study, analyzing your product size, weight distribution, and handling style. We select the best grade of materials (such as imported pine wood, local jungle hardwood, high-strength polymers, or steel profiles) and propose customized designs. We manufacture using pneumatic tooling and perform structural checks to ensure durability. Finally, we coordinate JIT dispatch and delivery to your factory floor.`;
  
  const localParagraph = `For businesses searching for a ${formattedTitle.toLowerCase()} manufacturer in Mumbai, ${formattedTitle.toLowerCase()} supplier Mumbai, ${formattedTitle.toLowerCase()} near me, or industrial ${formattedTitle.toLowerCase()} in Mumbai, Europack provides packaging support for factories, warehouses, exporters, and logistics companies. Our solutions are also suitable for nearby industrial regions such as Navi Mumbai, Thane, Bhiwandi, Taloja, Panvel, Vasai, Pune, and other parts of Maharashtra.`;
  
  const blogs = [
    {
      title: `How to Choose the Right ${formattedTitle} for Industrial Packaging`,
      desc: `Learn how to select the right material, weight capacity, and sizes to optimize your warehouse storage and reduce shipping costs.`,
      slug: `/blog/choosing-${categoryId}`
    },
    {
      title: `${formattedTitle} vs Alternative Materials: Which Is Better?`,
      desc: `An in-depth comparison of ${formattedTitle.toLowerCase()} materials, analyzing cost, lifespan, and export suitability.`,
      slug: `/blog/${categoryId}-vs-alternatives`
    },
    {
      title: `Why Exporters Need Reliable ${formattedTitle} for Safe Cargo Movement`,
      desc: `Discover how certified, high-strength packaging protects cargo and ensures smooth customs clearance at global ports.`,
      slug: `/blog/safe-cargo-${categoryId}`
    }
  ];

  const faqs = [
    {
      q: `Do you supply ${formattedTitle.toLowerCase()} in Mumbai?`,
      a: `Yes. Europack is a leading manufacturer and supplier of industrial ${formattedTitle.toLowerCase()}, serving factories, warehouses, and exporters across Mumbai, Navi Mumbai, Thane, and Maharashtra.`
    },
    {
      q: `Can Europack provide customized ${formattedTitle.toLowerCase()} for industrial goods?`,
      a: `Yes. We customize ${formattedTitle.toLowerCase()} based on your product size, weight, weight distribution, and handling requirements, ensuring safe transit.`
    },
    {
      q: `Are ${formattedTitle.toLowerCase()} suitable for export packaging?`,
      a: `Yes. Our export ${formattedTitle.toLowerCase()} solutions comply with global customs regulations, ensuring smooth clearance at international ports.`
    },
    {
      q: `What type of ${formattedTitle.toLowerCase()} are best for heavy machinery?`,
      a: `Heavy-duty designs reinforced with thick structural runners and high-density components are best for heavy machinery to support static and dynamic loads.`
    },
    {
      q: `Do you provide ${formattedTitle.toLowerCase()} for warehouses and logistics companies?`,
      a: `Yes. We supply reusable configurations designed for high-bay warehouse racking, automated conveyors, and forklift handling.`
    },
    {
      q: `Can ${formattedTitle.toLowerCase()} be made as per product size and weight?`,
      a: `Yes. Our engineering team designs solutions matching your exact product dimensions, deck spacing, and load-bearing requirements.`
    },
    {
      q: `Do you supply ${formattedTitle.toLowerCase()} in Navi Mumbai, Thane and Pune?`,
      a: `Yes. We operate a distribution network supplying packaging solutions to industrial areas in Navi Mumbai, Thane, Bhiwandi, Pune, and Gujarat.`
    },
    {
      q: `How can I request a quote for ${formattedTitle.toLowerCase()}?`,
      a: `You can contact our sales team using the enquiry form on our website. Share your dimensions, load details, and quantity, and we will provide a custom quote.`
    }
  ];

  const ctaText = `Looking for reliable ${formattedTitle} for your factory, warehouse, export cargo or industrial packaging requirement in Mumbai? Contact Europack for customized packaging solutions based on your product size, weight, handling method and transit requirement.`;

  return {
    metaTitle: `${formattedTitle} Manufacturer in Mumbai | Europack`,
    metaDescription: `Europack supplies customized ${formattedTitle.toLowerCase()} in Mumbai for industrial storage, export packaging, warehouse handling and heavy-duty transit.`,
    heroText,
    heroBullets,
    productOverview,
    applications,
    benefits,
    whyChoose,
    processApproach,
    localParagraph,
    blogs,
    faqs,
    ctaText,
    
    // Legacy mapping for compatibility
    title: `${formattedTitle} Manufacturers & Suppliers India | Europack`,
    intro: heroText,
    sections: [
      {
        title: `Premium Quality ${formattedTitle} for Global Industrial Logistics`,
        content: productOverview,
        bullets: applications
      }
    ]
  };
}
