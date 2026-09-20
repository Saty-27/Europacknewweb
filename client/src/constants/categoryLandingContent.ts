import { categoryLandingPages, type CategoryLanding, type CategoryProcess } from './categoryLandingPages';
import { resolveBlogCards } from './blogCardIndex';

/**
 * Turns each category landing entry into the rich-content shape ProductDetailClient
 * renders, so the 18 category pages use their own written content rather than
 * falling through to the generic 'default' entry — which would have produced 18
 * near-identical pages, the exact footprint this site is recovering from.
 */

// How the work actually gets done differs by category, so the process narrative
// does too. Three real routes, not one shared block stamped on every page.
const processSteps: Record<CategoryProcess, { step: string; title: string; desc: string }[]> = {
  manufactured: [
    { step: '01', title: 'Requirement Analysis', desc: 'Cargo dimensions, weight, transit route and compliance requirements assessed before anything is drawn.' },
    { step: '02', title: 'Design Engineering', desc: 'CAD-based structural design and load calculation against your specific cargo.' },
    { step: '03', title: 'Material Selection', desc: 'Materials chosen for the cargo type, journey duration and destination requirements.' },
    { step: '04', title: 'Manufacturing', desc: 'Precision fabrication at our ISO 9001:2015 certified manufacturing hubs.' },
    { step: '05', title: 'QC & Dispatch', desc: 'Quality inspection, documentation, and delivery to your facility or directly to port.' },
  ],
  supplied: [
    { step: '01', title: 'Application Review', desc: 'We establish what the material has to survive — transit mode, duration, climate and handling.' },
    { step: '02', title: 'Grade Selection', desc: 'The right grade specified for that duty, rather than the nearest stock item.' },
    { step: '03', title: 'Sampling', desc: 'Samples supplied where the specification needs proving on your own product first.' },
    { step: '04', title: 'Supply & Stocking', desc: 'Bulk supply scheduled against your consumption so the line does not run dry.' },
    { step: '05', title: 'Delivery', desc: 'Delivered to factory gate or warehouse across the Mumbai region and Vadodara.' },
  ],
  service: [
    { step: '01', title: 'Site Assessment', desc: 'Our team reviews the cargo, the site access and the handling equipment available.' },
    { step: '02', title: 'Method Statement', desc: 'The packing, securing or stuffing method documented before work begins.' },
    { step: '03', title: 'Team Deployment', desc: 'Certified crew and equipment deployed to your plant, warehouse or the port.' },
    { step: '04', title: 'Execution', desc: 'Work carried out to the agreed standard with a safety protocol audit.' },
    { step: '05', title: 'Certification', desc: 'Documentation and certification issued on completion for customs and insurers.' },
  ],
};

function toRichContent(entry: CategoryLanding) {
  return {
    subtitle: entry.subtitle,
    tagline: entry.tagline,
    overview: entry.overview,
    specs: entry.specs,
    benefits: entry.benefits,
    applications: entry.applications,
    comparison: entry.comparison,
    comparisonLabel: entry.comparisonLabel,
    manufacturingSteps: processSteps[entry.process],
    relatedBlogs: resolveBlogCards(entry.relatedBlogSlugs),
    faq: entry.faq,
    // caseStudy is deliberately omitted — we have no verified client result for
    // these categories and will not invent one.
    images: [entry.image],
    seoContent: entry.seoContent,
  };
}

/** Keyed by the route's contentSlug, which for these pages is the category id. */
export const categoryLandingContent = Object.fromEntries(
  categoryLandingPages.map((entry) => [entry.categoryId, toRichContent(entry)])
);
