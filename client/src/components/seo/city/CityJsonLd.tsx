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
 *  - `office` emits LocalBusiness with a real postalAddress, naming which of
 *    the addresses in OFFICES below it is. Both current city pages use it.
 *  - `serviceArea` emits Service + areaServed with no address at all, for a
 *    place we deliver into but do not sit in. Nothing uses it today; it exists
 *    so the next city page has an honest shape available. A LocalBusiness node
 *    with an address we cannot stand behind is a fabricated location — the
 *    precise thing that gets a local profile suspended.
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

/**
 * Every address Europack actually occupies, written once, in the form the
 * Google Business Profile listing states it. A city page may only claim one of
 * these; it may not pass an address in. The street lines read the way they do
 * because NAP matching is literal — a tidied-up address is a different address
 * as far as local search is concerned.
 */
const OFFICES = {
  mumbai: {
    '@type': 'PostalAddress',
    streetAddress:
      '101, ML Spaces, Railway Station Rd, near Vile Parle, above Bharat Bank, Navpada, Kamala Nagar, Vile Parle West',
    addressLocality: 'Mumbai',
    addressRegion: 'Maharashtra',
    postalCode: '400056',
    addressCountry: 'IN',
  },
  vadodara: {
    '@type': 'PostalAddress',
    streetAddress: 'G.J. Patel Estate, Plot No. 44/B, Harni Dena Road, NH 48, Dena',
    addressLocality: 'Vadodara',
    addressRegion: 'Gujarat',
    postalCode: '390022',
    addressCountry: 'IN',
  },
} as const;

export type OfficeKey = keyof typeof OFFICES;

interface CityJsonLdBase {
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

/**
 * A discriminated union rather than an optional field: `office` without an
 * address, or an address on a page that only serves an area, are both compile
 * errors instead of a judgement call at the call site.
 */
export type CityJsonLdProps =
  | (CityJsonLdBase & { mode: 'office'; office: OfficeKey })
  | (CityJsonLdBase & { mode: 'serviceArea' });

/** The registered office, and the provider on any serviceArea page. */
const HEAD_OFFICE = OFFICES.mumbai;

const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '09:00',
  closes: '19:00',
} as const;

const TELEPHONE = '+91-9820090775';
const EMAIL = 'sales@europackindia.in';

export default function CityJsonLd(props: CityJsonLdProps) {
  const { path, name, description, image, areaServed, faq, breadcrumbs } = props;
  const url = `${SITE}${path}`;
  const places = areaServed.map((place) => ({ '@type': 'City', name: place }));

  const primary =
    props.mode === 'office'
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
          address: OFFICES[props.office],
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
