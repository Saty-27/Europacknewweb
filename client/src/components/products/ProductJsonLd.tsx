import type { PalletSpec } from '@/constants/productsData';
import { specRows } from './SpecTable';

const SITE = 'https://europackindia.com';

export interface JsonLdBreadcrumb {
  name: string;
  path: string;
}

/**
 * Product + FAQPage + BreadcrumbList for a catalog product page.
 *
 * Both the spec rows and the FAQ entries are handed in from exactly the arrays
 * the page renders, so the structured data cannot drift away from what a
 * visitor sees. `specRows` is the same function the visible table uses, which
 * is also why a spec we do not hold never appears here.
 *
 * There is deliberately no `offers` node: Europack quotes per enquiry and the
 * repo holds no prices, so emitting one would mean inventing a price.
 */
export default function ProductJsonLd({
  name,
  description,
  images,
  category,
  path,
  spec,
  faq,
  breadcrumbs,
}: {
  name: string;
  description: string;
  images: string[];
  category: string;
  path: string;
  spec?: PalletSpec;
  faq: { q: string; a: string }[];
  breadcrumbs: JsonLdBreadcrumb[];
}) {
  const url = `${SITE}${path}`;

  const product: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    url,
    category,
    image: images.filter(Boolean).map((src) => (src.startsWith('http') ? src : `${SITE}${src}`)),
    brand: { '@type': 'Brand', name: 'Europack' },
    manufacturer: { '@type': 'Organization', name: 'Europack Industries', url: SITE },
  };

  if (spec) {
    const properties = specRows(spec).map((row) => ({
      '@type': 'PropertyValue',
      name: row.label,
      value: row.value,
    }));
    if (properties.length > 0) product.additionalProperty = properties;
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE}${crumb.path}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </>
  );
}
