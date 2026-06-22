import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';
import { getFlatSeoRoutes, getFlatSeoRoute } from '@/lib/flatSeoRoutes';
import ProductDetailClient from '../products/[...slug]/ProductDetailClient';

// CMS product helper
async function getCmsProduct(slug: string) {
  try {
    const res = await fetchAPI(`/products/slug/${slug}`, { next: { revalidate: 0 } });
    return res.success ? res.data : null;
  } catch {
    return null;
  }
}

async function getAllCmsProducts() {
  try {
    const res = await fetchAPI('/products', { next: { revalidate: 0 } });
    return res.success ? res.data : [];
  } catch {
    return [];
  }
}

export async function generateStaticParams() {
  // Generate params for all local flat SEO catalog and rich routes
  return getFlatSeoRoutes().map((route) => ({
    slug: route.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Check if it's a flat SEO route
  const flatRoute = getFlatSeoRoute(slug);
  if (flatRoute) {
    return buildFlatSeoMetadata(slug);
  }

  // Check if it's a CMS product
  const product = await getCmsProduct(slug);
  if (!product) return { title: 'Product Not Found - Europack' };

  return {
    title: `${product.title} - Industrial Packaging - Europack`,
    description: product.description,
    keywords: product.features?.join(', '),
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image].filter(Boolean),
    },
  };
}

export default async function DynamicFlatPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1. Check flat SEO route (covers both rich routes and catalog products)
  const flatRoute = getFlatSeoRoute(slug);
  if (flatRoute) {
    return <FlatSeoRoutePage slug={slug} />;
  }

  // 2. Check CMS product route
  const [product, allProducts] = await Promise.all([getCmsProduct(slug), getAllCmsProducts()]);
  if (product) {
    return <ProductDetailClient product={product} allProducts={allProducts} />;
  }

  // 3. Fallback
  notFound();
}

function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-center bg-slate-50 m-8 rounded-[60px]">
      <div className="w-24 h-24 bg-orange-100 rounded-3xl flex items-center justify-center text-[#FF6600] mx-auto mb-8">
        <Package size={48} />
      </div>
      <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Product Not Found</h2>
      <p className="text-slate-500 max-w-md mx-auto mb-10 font-medium">
        The product you are looking for might have been archived or moved to a different category.
      </p>
      <Link href="/products" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF6600] transition-all no-underline">
        Browse All Products
      </Link>
    </div>
  );
}
