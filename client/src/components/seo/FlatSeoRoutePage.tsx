import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getFlatSeoRoute, getFlatSeoRoutes } from '@/lib/flatSeoRoutes';
import ProductDetailClient from '@/app/(public)/products/[...slug]/ProductDetailClient';
import ProductSubDetailClient from '@/app/(public)/products/[...slug]/ProductSubDetailClient';

export function buildFlatSeoMetadata(slug: string): Metadata {
  const route = getFlatSeoRoute(slug);

  if (!route) return { title: 'Page Not Found | Europack' };

  if (route.type === 'rich') {
    const keyword = route.slug.replace(/-/g, ' ');

    return {
      title: route.metaTitle,
      description: route.description,
      keywords: [
        keyword,
        `${keyword} mumbai`,
        `${keyword} vadodara`,
        'industrial packaging',
        'export packaging',
        'Europack India',
      ],
      alternates: { canonical: `https://europackindia.com/${route.slug}` },
      openGraph: {
        title: route.metaTitle,
        description: route.description,
        url: `https://europackindia.com/${route.slug}`,
        images: [route.image],
        type: 'website',
      },
    };
  }

  return {
    title: route.content.metaTitle.replace('| Europack India', '| Europack'),
    description: route.content.metaDescription,
    keywords: route.content.keyFeatures.slice(0, 8).join(', '),
    alternates: { canonical: `https://europackindia.com/${route.slug}` },
    openGraph: {
      title: route.content.metaTitle,
      description: route.content.metaDescription,
      url: `https://europackindia.com/${route.slug}`,
      images: [route.product.img],
      type: 'website',
    },
  };
}

export default function FlatSeoRoutePage({ slug }: { slug: string }) {
  const route = getFlatSeoRoute(slug);

  if (!route) notFound();

  if (route.type === 'rich') {
    const allProducts = getFlatSeoRoutes()
      .filter((item) => item.type === 'rich')
      .map((item) => ({
        _id: item.slug,
        slug: item.contentSlug,
        title: item.title,
        description: item.description,
        image: item.image,
        category: item.category,
        features: item.features,
        active: true,
      }));

    return (
      <ProductDetailClient
        product={{
          _id: route.slug,
          slug: route.contentSlug,
          title: route.title,
          description: route.description,
          image: route.image,
          category: route.category,
          features: route.features,
          active: true,
        }}
        allProducts={allProducts}
      />
    );
  }

  return (
    <ProductSubDetailClient
      product={route.product}
      category={route.category}
      subCategory={route.subCategory}
      content={route.content}
      relatedProducts={route.relatedProducts}
    />
  );
}
