import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/api'
import { productsData } from '@/constants/productsData'
import { getAllProductSlugs } from '@/lib/productContentGenerator'
import { getFlatSeoRoutes } from '@/lib/flatSeoRoutes'
import { getAllSeoBlogEntries } from '@/constants/generatedBlogIndex'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://europackindia.com' // Should be your production URL
  const redirectedSitemapPaths = new Set([
    '/products/wooden-pallets',
    '/products/special-services/seaworthy-packing',
    '/products/wooden-pallets/four-way-pallet',
    '/products/pallet-systems/wooden-pallets',
    '/products/pallet-systems/cp1-pallets',
    '/products/pallet-systems/cp2-pallets',
    '/products/pallet-systems/metal-pallets',
    '/products/pallet-systems/plastic-pallets',
    '/products/pallet-systems/paper-pallets',
    '/products/wooden-boxes-crates/wooden-crates',
    '/products/wooden-boxes-crates/heavy-equipment-boxes',
    '/products/wooden-boxes-crates/plywood-boxes',
    '/products/wooden-boxes-crates/ispm-15-certified-boxes',
    '/products/protective-materials/vci-paper',
    '/products/protective-materials/vci-film',
    '/products/protective-materials/silica-gel',
    '/products/protective-materials/aluminum-foil',
    '/products/protective-materials/rust-preventive-spray',
    '/products/vacuum-wrapping/vacuum-packaging',
    '/products/vacuum-wrapping/shrink-wrapping',
    '/products/vacuum-wrapping/stretch-wrapping',
    '/products/corrugated-cargo-securing/corrugated-boxes',
    '/products/corrugated-cargo-securing/dunnage-bags',
    '/products/corrugated-cargo-securing/ratchet-belts',
    '/products/corrugated-cargo-securing/container-lashing',
  ])

  const isRedirectedUrl = (url: string) => {
    try {
      return redirectedSitemapPaths.has(new URL(url).pathname)
    } catch {
      return false
    }
  }

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/products',
    '/blog',
    '/careers',
    '/contact',
    '/gallery',
    '/industries',
    '/company-facts'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Static catalog products
  const catalogProductRoutes = getAllProductSlugs(productsData).map(({ category, productSlug }) => ({
    url: `${baseUrl}/products/${category}/${productSlug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const flatSeoRoutes = getFlatSeoRoutes().map((route) => ({
    url: `${baseUrl}/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route.slug === 'seaworthy-packing' ? 0.95 : 0.9,
  }));

  const seoBlogRoutes = getAllSeoBlogEntries().map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: blog.priority === 'High' ? 0.65 : 0.55,
  }));

  // Dynamic products (from CMS backend if any)
  let productRoutes: any[] = []
  try {
    const productsRes = await fetchAPI('/products')
    if (productsRes.success) {
      productRoutes = productsRes.data.map((p: any) => ({
        url: `${baseUrl}/products/${p.slug}`,
        lastModified: new Date(p.updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch products', e)
  }

  // Dynamic blogs
  let blogRoutes: any[] = []
  try {
    const blogsRes = await fetchAPI('/blogs?status=published')
    if (blogsRes.success) {
      blogRoutes = blogsRes.blogs.map((b: any) => ({
        url: `${baseUrl}/blog/${b.slug}`,
        lastModified: new Date(b.updatedAt || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
      }))
    }
  } catch (e) {
    console.error('Sitemap: Failed to fetch blogs', e)
  }

  const routes = [
    ...staticRoutes, 
    ...flatSeoRoutes,
    ...catalogProductRoutes,
    ...seoBlogRoutes,
    ...productRoutes, 
    ...blogRoutes
  ]

  return Array.from(new Map(routes.map((route) => [route.url, route])).values())
    .filter((route) => !isRedirectedUrl(route.url))
}
