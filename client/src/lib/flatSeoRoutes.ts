import { productsData, type Category, type Product, type SubCategory } from '@/constants/productsData';
import {
  findProductBySlug,
  generateProductContent,
  type GeneratedProductContent,
} from '@/lib/productContentGenerator';

export type FlatSeoRoute =
  | {
      type: 'rich';
      slug: string;
      contentSlug: string;
      title: string;
      metaTitle: string;
      description: string;
      category: string;
      /**
       * productsData category whose products make up this page's "Product Lineup".
       * Stated explicitly because `category` above is display copy that doesn't
       * always match a catalog id — when it didn't, the lineup silently vanished.
       */
      catalogCategoryId: string;
      /**
       * True when this landing page stands for the whole catalog category, so the
       * catalog hub can link the category at it. Seaworthy Packing is the exception:
       * it draws its lineup from Special Services but only covers one of those six
       * services, so linking "Special Services -> View Products" here would mislead.
       */
      representsCategory: boolean;
      image: string;
      features: string[];
    }
  | {
      type: 'catalog';
      slug: string;
      categorySlug: string;
      productSlug: string;
      product: Product;
      category: Category;
      subCategory: SubCategory;
      content: GeneratedProductContent;
      relatedProducts: Product[];
    };

const richRoutes: FlatSeoRoute[] = [
  {
    type: 'rich',
    slug: 'seaworthy-packing',
    contentSlug: 'seaworthy-packing',
    title: 'Seaworthy Packing & Packaging Solutions',
    metaTitle: 'Seaworthy Packing in Mumbai & Vadodara | Export Packaging Solutions',
    description:
      'Seaworthy packing and seaworthy packaging solutions for export cargo, heavy machinery, VCI protection, pinewood boxes, and ocean freight shipments in Mumbai, Vadodara, Makarpura, Nandesari, Savli GIDC and across India.',
    category: 'Export Packaging',
    catalogCategoryId: 'special-services',
    representsCategory: false,
    image: '/images/products/user_seaworthy_laminates.jpg',
    features: [
      'Seaworthy export packing for ocean freight',
      'VCI, desiccant and moisture-barrier protection',
      'ISPM-15 pinewood box and skid options',
      'On-site packing teams for Mumbai and Vadodara',
      'Suitable for machinery, panels and metal components',
    ],
  },
  {
    type: 'rich',
    slug: 'wooden-pallets',
    contentSlug: 'wooden-pallets',
    title: 'Wooden Pallets Manufacturer',
    // The hub, and the only page on the domain that targets the broad
    // "wooden pallet manufacturer" head term. Every sub-type page states its
    // own specific term instead, so they support this page rather than
    // competing with it. Kept under 60 characters so it does not truncate.
    metaTitle: 'Wooden Pallet Manufacturer in Mumbai & Vadodara',
    description:
      'ISPM-15 wooden pallets manufacturer and supplier for export cargo, warehouse storage, four-way pallets, two-way pallets, CP pallets and custom industrial pallets in Mumbai, Vadodara and across India.',
    category: 'Wooden Pallets',
    catalogCategoryId: 'wooden-pallets',
    representsCategory: true,
    image: '/images/products/four-way-pallets.webp',
    features: [
      'ISPM-15 heat-treated export pallets',
      'Two-way and four-way pallet designs',
      'Custom sizes for machinery and warehouse loads',
      'Bulk supply for Mumbai, Vadodara and Gujarat industrial areas',
    ],
  },
  {
    type: 'rich',
    slug: 'corrugated-boxes',
    contentSlug: 'corrugated-boxes',
    title: 'Corrugated Boxes Manufacturer',
    metaTitle: 'Corrugated Boxes Manufacturer in Mumbai & Vadodara | Industrial Cartons',
    description:
      '3-ply to 9-ply corrugated boxes, printed cartons and heavy-duty export cartons for industrial packaging, FMCG, pharma and automotive supply chains.',
    category: 'Corrugated Boxes',
    catalogCategoryId: 'corrugated-cartons',
    representsCategory: true,
    image: '/images/products/corrugatedBoxes.png',
    features: ['3-ply to 9-ply construction', 'Printed and plain cartons', 'Bulk industrial supply', 'Custom sizes and high BCT strength'],
  },
  {
    type: 'rich',
    slug: 'vacuum-packing',
    contentSlug: 'vacuum-packing',
    title: 'Vacuum Packing Services',
    metaTitle: 'Vacuum Packing Services in Mumbai & Vadodara | Export Barrier Packaging',
    description:
      'Industrial vacuum packing, aluminum barrier foil sealing, VCI vacuum packaging and moisture-proof export packing for machinery and electronics.',
    category: 'Vacuum Packing',
    catalogCategoryId: 'vacuum-packaging',
    representsCategory: true,
    image: '/images/products/user_vacuum_packing.png',
    features: ['Hermetic vacuum sealing', 'Aluminum barrier foil', 'VCI and desiccant protection', 'On-site export packing'],
  },
  {
    type: 'rich',
    slug: 'lashing-materials',
    contentSlug: 'lashing-materials',
    title: 'Cargo Lashing Materials',
    metaTitle: 'Cargo Lashing Materials & Container Lashing Services | Europack',
    description:
      'Container lashing, ratchet belts, steel wire rope, chain lashing and cargo securing systems for export shipments and heavy machinery.',
    category: 'Lashing Materials',
    catalogCategoryId: 'lashing-materials',
    representsCategory: true,
    image: '/images/products/user_lashing_materials.jpg',
    features: ['Container lashing', 'Ratchet belts and chain lashing', 'ODC cargo securing', 'Port and factory deployment'],
  },
];

const catalogAliases = [
  { slug: 'four-way-pallet', categorySlug: 'wooden-pallets', productSlug: 'four-way-pallet' },
  { slug: 'two-way-pallet', categorySlug: 'wooden-pallets', productSlug: 'two-way-pallet' },
  { slug: 'euro-pallets', categorySlug: 'wooden-pallets', productSlug: 'euro-pallets' },
  { slug: 'cp1-pallets', categorySlug: 'wooden-pallets', productSlug: 'cp1' },
  { slug: 'cp2-pallets', categorySlug: 'wooden-pallets', productSlug: 'cp2' },
  { slug: 'dunnage-bags', categorySlug: 'dunnage-bag', productSlug: 'air-dunnage-bags' },
  { slug: 'shrink-wrapping', categorySlug: 'special-services', productSlug: 'shrink-wrapping-service' },
  { slug: 'stretch-wrapping', categorySlug: 'stretch-wrapping', productSlug: 'pallet-wrapping' },
  { slug: 'container-lashing', categorySlug: 'services', productSlug: 'onsite-lashing' },
  { slug: 'export-packing', categorySlug: 'special-services', productSlug: 'export-packing' },
];

export function getProductFlatSlug(categorySlug: string, productSlug: string): string {
  const alias = catalogAliases.find(
    (a) => a.categorySlug === categorySlug && a.productSlug === productSlug
  );
  if (alias) return alias.slug;

  if (productSlug.match(/^cp\d+$/)) {
    return `${productSlug}-pallets`;
  }
  return productSlug;
}

const catalogRoutes: FlatSeoRoute[] = [];

// Dynamically generate routes for all catalog products
for (const category of productsData) {
  for (const sub of category.subCategories) {
    for (const product of sub.products) {
      const slug = getProductFlatSlug(category.id, product.id);
      const relatedProducts = category.subCategories
        .flatMap((s) => s.products)
        .filter((p) => p.id !== product.id)
        .slice(0, 6);

      catalogRoutes.push({
        type: 'catalog',
        slug,
        categorySlug: category.id,
        productSlug: product.id,
        product,
        category,
        subCategory: sub,
        content: generateProductContent(product, category),
        relatedProducts,
      });
    }
  }
}

const routes = [...richRoutes, ...catalogRoutes];

// A catalog product can generate the same flat slug as a rich landing page —
// special-services/seaworthy-packing collides with /seaworthy-packing. The rich
// page is the SEO landing page (and a redirect target), so it wins the slug.
const routeBySlug = new Map<string, FlatSeoRoute>();
for (const route of routes) {
  const existing = routeBySlug.get(route.slug);
  if (existing && existing.type === 'rich' && route.type === 'catalog') continue;
  routeBySlug.set(route.slug, route);
}

export function getFlatSeoRoutes() {
  return routes;
}

export function getFlatSeoRoute(slug: string) {
  return routeBySlug.get(slug) || null;
}

const richRouteByCategoryId = new Map(
  richRoutes.flatMap((route) =>
    route.type === 'rich' && route.representsCategory
      ? [[route.catalogCategoryId, route] as const]
      : []
  )
);

/**
 * The landing page that stands for a productsData category, if there is one — e.g.
 * 'wooden-pallets' -> /wooden-pallets. Most categories have none and return null;
 * they should not be linked anywhere.
 */
export function getCategoryLandingPage(categoryId: string) {
  const route = richRouteByCategoryId.get(categoryId);
  return route ? { href: `/${route.slug}`, title: route.title } : null;
}
