import { MetadataRoute } from 'next'
import { fetchAPI } from '@/lib/api'
import { productsData } from '@/constants/productsData'
import { getAllProductSlugs } from '@/lib/productContentGenerator'
import { getFlatSeoRoutes } from '@/lib/flatSeoRoutes'
import { getAllMockBlogs } from '@/data/allBlogs'
import { getCatalogProductPath } from '@/components/products/CatalogProductRoutePage'

// Static routes and hand-written articles don't change on a schedule. Stamping
// `new Date()` on every entry on every request told Google the whole site changes
// daily, which wrecks crawl-budget signalling — so they carry a fixed date that is
// bumped when the content actually changes. Only CMS-backed entries, which have a
// real updatedAt, get a live date.
const CONTENT_LAST_MODIFIED = new Date('2026-09-20T00:00:00.000Z')

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
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // The two city pages. There are exactly two, they are hand-written, and they
  // are listed here one by one rather than generated from a list of cities —
  // deliberately, because a city array with a template behind it is how the
  // 7,700 doorway URLs came to exist in the first place. Adding a third means
  // writing a third page, not adding a string.
  const cityRoutes = [
    '/wooden-pallets-manufacturer-in-mumbai',
    '/wooden-pallets-manufacturer-in-vadodara',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  const flatSeoRoutes = getFlatSeoRoutes().map((route) => ({
    url: `${baseUrl}/${route.slug}`,
    lastModified: CONTENT_LAST_MODIFIED,
    changeFrequency: 'weekly' as const,
    priority: route.slug === 'seaworthy-packing' ? 0.95 : 0.9,
  }));

  // The hand-written articles in src/data. They were never submitted before — the
  // sitemap only carried the 7,700 generated doorway stubs that have now been removed.
  //
  // One article ('post=3883', a leftover WordPress query string) has a slug that a
  // path segment can't carry: Next hands the route the percent-encoded form, so the
  // URL 404s. Don't submit a URL we know is dead — the slug needs renaming first.
  const articleRoutes = getAllMockBlogs()
    .filter((blog) => encodeURIComponent(blog.slug) === blog.slug)
    .map((blog) => ({
      url: `${baseUrl}/blog/${blog.slug}`,
      lastModified: CONTENT_LAST_MODIFIED,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  // Dynamic products (from CMS backend if any)
  let productRoutes: any[] = []
  try {
    const productsRes = await fetchAPI('/products')
    if (productsRes.success) {
      productRoutes = productsRes.data.map((p: any) => ({
        url: `${baseUrl}/${p.slug}`,
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
    ...cityRoutes,
    ...flatSeoRoutes,
    ...articleRoutes,
    ...productRoutes, 
    ...blogRoutes
  ]

  return Array.from(new Map(routes.map((route) => [route.url, route])).values())
    .filter((route) => !isRedirectedUrl(route.url))
}
