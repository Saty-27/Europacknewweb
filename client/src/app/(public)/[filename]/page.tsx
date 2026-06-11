import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Package } from 'lucide-react';
import { fetchAPI } from '@/lib/api';
import { productsData } from '@/constants/productsData';
import { categorySeoData } from '@/constants/categorySeoData';
import {
  findProductByOnlySlug,
  generateProductContent,
} from '@/lib/productContentGenerator';
import ProductDetailClient from '../products/[...slug]/ProductDetailClient';
import ProductSubDetailClient from '../products/[...slug]/ProductSubDetailClient';
import CategoryDetailClient from './CategoryDetailClient';

// ────────────────────────────────────────────────────
// CMS PRODUCT HELPERS (single-slug: /[filename])
// ────────────────────────────────────────────────────
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

// ────────────────────────────────────────────────────
// STATIC PARAMS: pre-render all catalog products and categories
// ────────────────────────────────────────────────────
export async function generateStaticParams() {
  const productSlugs = productsData.flatMap((cat) =>
    cat.subCategories.flatMap((sub) =>
      sub.products.map((p) => ({
        filename: p.id,
      }))
    )
  );
  const categorySlugs = productsData.map((cat) => ({
    filename: cat.id,
  }));
  return [...productSlugs, ...categorySlugs];
}

// ────────────────────────────────────────────────────
// METADATA
// ────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ filename: string }>;
}): Promise<Metadata> {
  const { filename } = await params;

  // 1. Try finding in catalog products
  const result = findProductByOnlySlug(filename, productsData);
  if (result) {
    const content = generateProductContent(result.product, result.category);
    return {
      title: content.metaTitle,
      description: content.metaDescription,
      keywords: content.keyFeatures.slice(0, 8).join(', '),
      openGraph: {
        title: content.metaTitle,
        description: content.metaDescription,
        images: [result.product.img].filter(Boolean),
        type: 'website',
      },
      twitter: { card: 'summary_large_image', title: content.metaTitle, description: content.metaDescription },
      alternates: { canonical: `/${filename}` },
    };
  }

  // 2. Try finding in catalog categories
  const categoryResult = productsData.find((c) => c.id === filename);
  if (categoryResult) {
    const allProductNames = categoryResult.subCategories.flatMap((s) => s.products.map((p) => p.name)).join(', ');
    const seoArticle = categorySeoData[filename];
    const metaTitle = seoArticle?.metaTitle || `${categoryResult.title} Manufacturers & Suppliers India | Europack`;
    const metaDescription = seoArticle?.metaDescription || `Premium, heavy-duty industrial ${categoryResult.title.toLowerCase()} for global export. ISPM-15 compliant, high load capacity, customizable designs. Get wholesale pricing!`;
    return {
      title: metaTitle,
      description: metaDescription,
      keywords: `${categoryResult.title}, industrial packaging, ${allProductNames}, Europack packaging`,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        images: [categoryResult.img].filter(Boolean),
        type: 'website',
      },
      twitter: { card: 'summary_large_image', title: metaTitle, description: categoryResult.desc },
      alternates: { canonical: `/${filename}` },
    };
  }

  // 3. Try finding in CMS products
  const product = await getCmsProduct(filename);
  if (!product) return { title: 'Product Not Found | Europack' };
  return {
    title: `${product.title} | Industrial Packaging | Europack`,
    description: product.description,
    keywords: product.features?.join(', '),
    openGraph: { title: product.title, description: product.description, images: [product.image].filter(Boolean) },
  };
}

// ────────────────────────────────────────────────────
// PAGE COMPONENT
// ────────────────────────────────────────────────────
export default async function ProductFlatPage({
  params,
}: {
  params: Promise<{ filename: string }>;
}) {
  const { filename } = await params;

  // 1. Try catalog product
  const result = findProductByOnlySlug(filename, productsData);
  if (result) {
    const { product, category: categoryData, subCategory } = result;
    const content = generateProductContent(product, categoryData);
    const relatedProducts = categoryData.subCategories
      .flatMap((sub) => sub.products)
      .filter((p) => p.id !== product.id)
      .slice(0, 6);

    return (
      <ProductSubDetailClient
        product={product}
        category={categoryData}
        subCategory={subCategory}
        content={content}
        relatedProducts={relatedProducts}
      />
    );
  }

  // 2. Try catalog category
  const categoryResult = productsData.find((c) => c.id === filename);
  if (categoryResult) {
    return <CategoryDetailClient category={categoryResult} />;
  }

  // 3. Try CMS product
  const [product, allProducts] = await Promise.all([getCmsProduct(filename), getAllCmsProducts()]);
  if (product) {
    return <ProductDetailClient product={product} allProducts={allProducts} />;
  }

  // Fallback
  return <ProductNotFound />;
}

function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-12 text-center bg-slate-50 m-8 rounded-[60px] pt-36">
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

