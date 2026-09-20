import { notFound } from 'next/navigation';
import { fetchAPI } from '../../../../lib/api';
import { getMockBlogBySlug } from '../../../../data/allBlogs';
import BlogDetailClient from './BlogDetailClient';
import { Metadata } from 'next';

async function getBlog(slug: string) {
  // Priority 1: Check Mock Data for high-fidelity content (50 SEO blogs)
  const mockBlog = getMockBlogBySlug(slug);
  if (mockBlog) return mockBlog;

  try {
    const res = await fetchAPI(`/blogs/${slug}`, { cache: 'no-store' });
    if (res.success) return res.blog;
    return null;
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  const blog = await getBlog(slug);
  if (!blog) return { title: 'Blog Not Found | Europack' };

  return {
    title: blog.seo?.metaTitle || `${blog.title} | Europack Blog`,
    description: blog.seo?.metaDescription || blog.subtitle,
    keywords: blog.seo?.keywords?.join(', '),
    openGraph: {
      title: blog.title,
      description: blog.subtitle,
      images: [blog.heroImage]
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const blog = await getBlog(slug);

  // An unknown slug is a dead URL, not an article awaiting publication. Return a
  // real 404 so Google drops it instead of indexing a placeholder.
  if (!blog) notFound();

  return <BlogDetailClient blog={blog} />;
}
