import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { productsData } from '@/constants/productsData';
import {
  findProductBySlug,
  generateProductContent,
  getAllProductSlugs,
} from '@/lib/productContentGenerator';
import ProductSubDetailClient from '@/app/(public)/products/[...slug]/ProductSubDetailClient';
import { getProductFlatSlug } from '@/lib/flatSeoRoutes';

export function getCatalogProductPath(categorySlug: string, productSlug: string) {
  return `/${getProductFlatSlug(categorySlug, productSlug)}`;
}

export function getCatalogProductStaticParams() {
  return getAllProductSlugs(productsData);
}

export function getCatalogProductPageData(categorySlug: string, productSlug: string) {
  const result = findProductBySlug(categorySlug, productSlug, productsData);
  if (!result) return null;

  const { product, category, subCategory } = result;
  const content = generateProductContent(product, category);
  const relatedProducts = category.subCategories
    .flatMap((sub) => sub.products)
    .filter((item) => item.id !== product.id)
    .slice(0, 6);

  return { product, category, subCategory, content, relatedProducts };
}

export function buildCatalogProductMetadata(categorySlug: string, productSlug: string): Metadata {
  const data = getCatalogProductPageData(categorySlug, productSlug);
  if (!data) return { title: 'Product Not Found - Europack' };

  const { product, content } = data;
  const canonical = getCatalogProductPath(categorySlug, productSlug);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    keywords: content.keyFeatures.slice(0, 8).join(', '),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      images: [product.img].filter(Boolean),
      type: 'website',
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: content.metaTitle,
      description: content.metaDescription,
    },
    alternates: { canonical },
  };
}

export default function CatalogProductRoutePage({
  categorySlug,
  productSlug,
}: {
  categorySlug: string;
  productSlug: string;
}) {
  const data = getCatalogProductPageData(categorySlug, productSlug);
  if (!data) notFound();

  return (
    <ProductSubDetailClient
      product={data.product}
      category={data.category}
      subCategory={data.subCategory}
      content={data.content}
      relatedProducts={data.relatedProducts}
    />
  );
}
