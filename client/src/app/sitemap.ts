import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/api'
import marketplaceData from '@/constants/marketplaceData.json'
import { productsData } from '@/constants/productsData'
import blogIndex from '@/constants/blogIndex.json'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://europackindia.com' // Production canonical base URL

  // 1. Static routes
  const staticRoutesList = [
    '',
    '/about',
    '/services',
    '/products',
    '/blog',
    '/careers',
    '/contact',
    '/gallery',
    '/industries',
    '/company-facts',
    '/privacy',
    '/terms',
    '/case-studies',
    '/clients',
    '/resources',
    '/quote',
    '/videos'
  ];

  const staticRoutes = staticRoutesList.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // 2. Catalog Categories (from productsData.ts)
  const catalogCategoryRoutes = productsData.map((cat) => ({
    url: `${baseUrl}/${cat.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 3. Catalog Products (from productsData.ts)
  const catalogProductRoutes = productsData.flatMap((cat) =>
    cat.subCategories.flatMap((sub) =>
      sub.products.map((p) => ({
        url: `${baseUrl}/${p.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      }))
    )
  );

  // 4. Marketplace Products (from marketplaceData.json)
  const marketplaceProductRoutes = marketplaceData.products.map(p => ({
    url: `${baseUrl}/${p.id}`,
    lastModified: new Date(marketplaceData.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // 5. Marketplace Locations
  const locationRoutes = marketplaceData.locations.map(l => ({
    url: `${baseUrl}/locations/${l.slug}`,
    lastModified: new Date(marketplaceData.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 6. Marketplace Industries
  const industryRoutes = marketplaceData.industries.map(i => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date(marketplaceData.lastUpdated),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // 7. Dynamic products (from CMS backend if any)
  let cmsProductRoutes: any[] = []
  try {
    const productsRes = await fetchAPI('/products')
    if (productsRes.success) {
      cmsProductRoutes = productsRes.data.map((p: any) => ({
        url: `${baseUrl}/${p.slug}`,
        lastModified: new Date(p.updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch products', e)
  }

  // 8. Statically Indexed Blogs (from blogIndex.json - ~5,360 items)
  const blogIndexRoutes = blogIndex.map((b: any) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // 9. Dynamic blogs (from CMS backend if any)
  let cmsBlogRoutes: any[] = []
  try {
    const blogsRes = await fetchAPI('/blogs?status=published')
    if (blogsRes.success) {
      cmsBlogRoutes = blogsRes.blogs.map((b: any) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: new Date(b.updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch blogs', e)
  }

  // Combine all route lists
  const allRoutes = [
    ...staticRoutes,
    ...catalogCategoryRoutes,
    ...catalogProductRoutes,
    ...marketplaceProductRoutes,
    ...locationRoutes,
    ...industryRoutes,
    ...cmsProductRoutes,
    ...blogIndexRoutes,
    ...cmsBlogRoutes
  ];

  // Deduplicate routes by case-insensitive URL to avoid duplicate entries in sitemap.xml
  const uniqueRoutesMap = new Map<string, any>();
  for (const route of allRoutes) {
    const canonicalUrl = route.url.trim().toLowerCase();
    if (!uniqueRoutesMap.has(canonicalUrl)) {
      uniqueRoutesMap.set(canonicalUrl, route);
    }
  }

  return Array.from(uniqueRoutesMap.values());
}

