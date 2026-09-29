import React from 'react';
import { servicesData } from '../../../../data/servicesData';
import ServiceDetailClient from './ServiceDetailClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

/**
 * All nine service pages returned 404.
 *
 * `params` is a Promise in Next 16 and this route read `params.slug` off the
 * Promise itself, so the lookup key was always `undefined`, every find() missed
 * and every page fell through to notFound(). The data was fine the whole time —
 * /services/fumigation, /services/palletization and seven others have had real
 * copy sitting behind a 404.
 *
 * They were also absent from the sitemap, so nothing ever pointed a crawler at
 * them to notice. Both are fixed: params is awaited, generateStaticParams
 * prerenders the nine, and sitemap.ts now submits them.
 */
export async function generateStaticParams() {
  return servicesData.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);
  if (!service) return { title: 'Service Not Found | Europack' };

  const title = service.metaTitle ?? `${service.name} Services in Mumbai | Europack`;
  const description = service.metaDescription ?? service.shortDesc;
  return {
    title,
    description,
    alternates: { canonical: `https://europackindia.com/services/${service.slug}` },
    openGraph: {
      title,
      description,
      url: `https://europackindia.com/services/${service.slug}`,
      images: [service.img],
      type: 'website',
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  const SITE = 'https://europackindia.com';
  const url = `${SITE}/services/${service.slug}`;
  // provider points at the site-wide LocalBusiness @id rather than restating the
  // address, so every service resolves to the one business entity.
  const jsonLd: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: service.h1 ?? service.name,
      description: service.metaDescription ?? service.shortDesc,
      serviceType: service.name,
      url,
      provider: { '@id': `${SITE}/#localbusiness` },
      areaServed: ['Mumbai', 'Navi Mumbai', 'Thane', 'Bhiwandi', 'Pune', 'Nashik', 'Vadodara'].map(
        (name) => ({ '@type': 'City', name })
      ),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/services` },
        { '@type': 'ListItem', position: 3, name: service.name, item: url },
      ],
    },
  ];
  if (service.faqs?.length) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return (
    <>
      {jsonLd.map((node, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }} />
      ))}
      <ServiceDetailClient service={service} />
    </>
  );
}
