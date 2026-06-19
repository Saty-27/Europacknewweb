import baseBlogIndex from './blogIndex.json';
import { seoProducts } from './seoData';

export interface BlogSeoEntry {
  id: string;
  title: string;
  slug: string;
  product: string;
  location: string;
  intent: string;
  priority: 'High' | 'Medium' | 'Low';
}

const vadodaraLocations = [
  'Vadodara',
  'Makarpura',
  'GIDC Makarpura',
  'Makarpura Industrial Estate',
  'Manjusar',
  'Savli GIDC',
  'Savli',
  'Por GIDC',
  'Por',
  'Nandesari GIDC',
  'Nandesari',
  'Ranoli GIDC',
  'Ranoli',
  'Waghodia GIDC',
  'Waghodia',
  'Padra',
  'Padra GIDC',
  'Karjan',
  'Karjan GIDC',
  'Halol',
  'Halol GIDC',
  'Kalol',
  'Dabhoi',
  'Gotri',
  'Alkapuri',
  'Akota',
  'Sayajigunj',
  'Manjalpur',
  'Tarsali',
  'Atladara',
  'Vasna Road',
  'Gorwa',
  'Subhanpura',
  'Chhani',
  'Sama-Savli Road',
  'Ajwa Road',
  'Waghodia Road',
  'Harni',
  'Karelibaug',
  'Fatehgunj',
  'Pratapnagar',
  'Bhayli',
  'Sevasi',
  'Vemali',
  'New VIP Road',
  'Old Padra Road',
  'GIDC Industrial Estate Vadodara',
];

const vadodaraIntents = [
  'Manufacturer',
  'Supplier',
  'Dealer',
  'Export Packaging',
  'Industrial Packaging',
  'Near Me',
  'For Export Cargo',
  'For Heavy Machinery',
  'For Warehouse',
  'Price Guide',
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function locationWithCity(location: string) {
  return location.toLowerCase() === 'vadodara' ? location : `${location} Vadodara`;
}

function buildSlug(productId: string, intent: string, location: string) {
  const loc = slugify(location);
  const cityLoc = slugify(locationWithCity(location));

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
}

function buildTitle(product: string, intent: string, location: string) {
  const cityLocation = locationWithCity(location);

  switch (intent) {
    case 'Manufacturer':
    case 'Supplier':
    case 'Dealer':
    case 'Export Packaging':
    case 'Industrial Packaging':
      return `${product} ${intent} Near ${location} for Industrial Packaging`;
    case 'Near Me':
      return `${product} Near Me in ${location}`;
    case 'For Export Cargo':
    case 'For Heavy Machinery':
    case 'For Warehouse':
      return `${product} ${intent} in ${cityLocation}`;
    case 'Price Guide':
      return `${product} Price Guide in ${location}`;
    default:
      return `${product} ${intent} in ${cityLocation}`;
  }
}

const vadodaraBlogIndex: BlogSeoEntry[] = vadodaraLocations.flatMap((location, locationIndex) =>
  seoProducts.flatMap((product, productIndex) =>
    vadodaraIntents.map((intent, intentIndex) => ({
      id: `EP-VAD-${String((locationIndex * seoProducts.length * vadodaraIntents.length) + (productIndex * vadodaraIntents.length) + intentIndex + 1).padStart(4, '0')}`,
      title: buildTitle(product.name, intent, location),
      slug: buildSlug(product.id, intent, location),
      product: product.name,
      location,
      intent,
      priority: intentIndex < 6 ? 'High' : 'Medium',
    }))
  )
);

const bySlug = new Map<string, BlogSeoEntry>();

for (const entry of baseBlogIndex as BlogSeoEntry[]) {
  bySlug.set(entry.slug, entry);
}

for (const entry of vadodaraBlogIndex) {
  bySlug.set(entry.slug, entry);
}

export const allSeoBlogEntries = Array.from(bySlug.values());

export function getAllSeoBlogEntries() {
  return allSeoBlogEntries;
}

export function findSeoBlogBySlug(slug: string) {
  return bySlug.get(slug) || null;
}

export const vadodaraSeoBlogCount = vadodaraBlogIndex.length;
