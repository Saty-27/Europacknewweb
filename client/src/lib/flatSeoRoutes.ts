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
    metaTitle: 'Wooden Pallets Manufacturer in Mumbai & Vadodara | ISPM-15 Pallets',
    description:
      'ISPM-15 wooden pallets manufacturer and supplier for export cargo, warehouse storage, four-way pallets, two-way pallets, CP pallets and custom industrial pallets in Mumbai, Vadodara and across India.',
    category: 'Wooden Pallets',
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

function buildCatalogRoute(alias: (typeof catalogAliases)[number]): FlatSeoRoute | null {
  const result = findProductBySlug(alias.categorySlug, alias.productSlug, productsData);
  if (!result) return null;

  const relatedProducts = result.category.subCategories
    .flatMap((sub) => sub.products)
    .filter((product) => product.id !== result.product.id)
    .slice(0, 6);

  return {
    type: 'catalog',
    slug: alias.slug,
    categorySlug: alias.categorySlug,
    productSlug: alias.productSlug,
    product: result.product,
    category: result.category,
    subCategory: result.subCategory,
    content: generateProductContent(result.product, result.category),
    relatedProducts,
  };
}

const catalogRoutes = catalogAliases
  .map(buildCatalogRoute)
  .filter((route): route is FlatSeoRoute => Boolean(route));

const routes = [...richRoutes, ...catalogRoutes];
const routeBySlug = new Map(routes.map((route) => [route.slug, route]));

export function getFlatSeoRoutes() {
  return routes;
}

export function getFlatSeoRoute(slug: string) {
  return routeBySlug.get(slug) || null;
}
