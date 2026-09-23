const SITE = 'https://europackindia.com';
const ORG_ID = `${SITE}/#organization`;

/**
 * Structured data for a city page.
 *
 * The NAP values below are the ones that agree across Header, Footer, the
 * homepage contact block and the contact page, and the phone is the same one
 * already in the Organization node in the root layout. Nothing here is typed
 * in fresh.
 *
 * Two shapes, and the difference is not cosmetic:
 *
 *  - `office` emits LocalBusiness with a real postalAddress. Only Mumbai gets
 *    it, because Vile Parle West is the one address the repo states with a
 *    street, a PIN and three sources agreeing.
 *  - `serviceArea` emits Service + areaServed with no address at all. A city we
 *    deliver into is not a place of business, and a LocalBusiness node with an
 *    address we cannot stand behind is a fabricated location — the precise
 *    thing that gets a local profile suspended.
 *
 * Deliberately absent everywhere: geo coordinates (unverified), aggregateRating
 * and review (no review data in the repo), and offers/priceRange (Europack
 * quotes per enquiry and holds no prices — the same reason ProductJsonLd has no
 * offers node).
 */

export interface CityFaqItem {
  q: string;
  a: string;
}

export interface CityJsonLdProps {
  mode: 'office' | 'serviceArea';
  /** Page path, e.g. /wooden-pallets-manufacturer-in-mumbai */
  path: string;
  /** The business/service name as it should read in results. */
  name: string;
  description: string;
  image: string;
  /** City this page is about, plus the surrounding places it genuinely covers. */
  areaServed: string[];
  faq: CityFaqItem[];
  breadcrumbs: { name: string; path: string }[];
}

const HEAD_OFFICE = {
  '@type': 'PostalAddress',
  streetAddress: '101, M. L. Spaces, Railway Station Road, Vile Parle West',
  addressLocality: 'Mumbai',
  addressRegion: 'Maharashtra',
  postalCode: '400056',
  addressCountry: 'IN',
} as const;

const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '09:00',
  closes: '19:00',
} as const;

const TELEPHONE = '+91-9820090775';
const EMAIL = 'sales@europackindia.in';

export default function CityJsonLd({
  mode,
  path,
  name,
  description,
  image,
  areaServed,
  faq,
  breadcrumbs,
}: CityJsonLdProps) {
  const url = `${SITE}${path}`;
  const places = areaServed.map((place) => ({ '@type': 'City', name: place }));

  const primary =
    mode === 'office'
      ? {
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          '@id': `${url}#business`,
          name,
          description,
          url,
          image: `${SITE}${image}`,
          telephone: TELEPHONE,
          email: EMAIL,
          address: HEAD_OFFICE,
          openingHoursSpecification: [OPENING_HOURS],
          parentOrganization: { '@id': ORG_ID },
          areaServed: places,
        }
      : {
          '@context': 'https://schema.org',
          '@type': 'Service',
          '@id': `${url}#service`,
          name,
          description,
          serviceType: 'Wooden pallet manufacturing and supply',
          url,
          image: `${SITE}${image}`,
          areaServed: places,
          provider: {
            '@type': 'Organization',
            '@id': ORG_ID,
            name: 'Europack',
            url: `${SITE}/`,
            telephone: TELEPHONE,
            email: EMAIL,
            address: HEAD_OFFICE,
          },
        };

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(primary) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }} />
    </>
  );
}
