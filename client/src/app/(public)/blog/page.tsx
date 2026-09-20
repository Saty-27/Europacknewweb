'use client';

import React, { useEffect, useMemo, useState } from 'react';

// Components
import SubPageHero from '@/components/shared/SubPageHero';
import BlogFilters from '@/components/blog/BlogFilters';
import BlogFeatured from '@/components/blog/BlogFeatured';
import BlogTrending from '@/components/blog/BlogTrending';
import BlogStats from '@/components/blog/BlogStats';
import BlogGrid from '@/components/blog/BlogGrid';
import BlogQuickGuides from '@/components/blog/BlogQuickGuides';
import BlogVideos from '@/components/blog/BlogVideos';
import BlogCaseStudies from '@/components/blog/BlogCaseStudies';
import BlogProductLinks from '@/components/blog/BlogProductLinks';
import BlogTrust from '@/components/blog/BlogTrust';
import BlogFAQ from '@/components/blog/BlogFAQ';
import BlogNewsletter from '@/components/blog/BlogNewsletter';
import BlogFinalCTA from '@/components/blog/BlogFinalCTA';
import { getAllMockBlogs } from '@/data/allBlogs';
import { fetchAPI } from '@/lib/api';

const featuredPost = {
  title: 'Wooden Pallet Manufacturer in Mumbai – Types, Prices & Export Guide (2025)',
  excerpt: 'Complete buying guide for wooden pallets in Mumbai. Compare types, prices, ISPM-15 certification, and find the best manufacturer for your industrial needs. Serving Fortune 500 clients since 1993.',
  category: 'Wooden Pallets',
  author: 'Europack',
  date: 'Apr 28, 2025',
  readTime: '12 min read',
  img: '/images/blog/wooden-pallets.png',
  slug: 'wooden-pallet-manufacturer-mumbai'
};

type BlogCard = {
  title: string;
  category: string;
  author: string;
  readTime: string;
  img: string;
  slug: string;
};

const FALLBACK_IMAGE = '/images/blog/mumbai-packaging.png';

// The hand-written articles in src/data. These used to be buried under 7,700
// generated location stubs; they are now the whole index.
const articlePosts: BlogCard[] = getAllMockBlogs().map((blog) => ({
  title: blog.title,
  category: blog.category,
  author: blog.author || 'Europack Technical Team',
  readTime: `${blog.analytics?.readTime || 10} min read`,
  img: blog.heroImage || FALLBACK_IMAGE,
  slug: blog.slug,
}));

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All Blogs');
  const [visibleCount, setVisibleCount] = useState(24);
  const [apiPosts, setApiPosts] = useState<BlogCard[]>([]);

  // Blogs published through the admin CMS, merged in alongside the static articles.
  useEffect(() => {
    let cancelled = false;
    fetchAPI('/blogs?status=published')
      .then((res) => {
        if (cancelled || !res?.success || !Array.isArray(res.blogs)) return;
        setApiPosts(
          res.blogs.map((blog: any) => ({
            title: blog.title,
            category: blog.category || 'Technical',
            author: blog.author || 'Europack Technical Team',
            readTime: `${blog.analytics?.readTime || 10} min read`,
            img: blog.heroImage || FALLBACK_IMAGE,
            slug: blog.slug,
          }))
        );
      })
      .catch(() => {
        /* the static articles are still shown if the CMS is unreachable */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const allPosts = useMemo(() => {
    const bySlug = new Map<string, BlogCard>();
    for (const post of [...articlePosts, ...apiPosts]) bySlug.set(post.slug, post);
    return [...bySlug.values()];
  }, [apiPosts]);

  const categories = useMemo(
    () => ['All Blogs', ...new Set(allPosts.map((p) => p.category))],
    [allPosts]
  );

  const filteredPosts = activeCategory === 'All Blogs'
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  const postsToShow = filteredPosts.slice(0, visibleCount);

  return (
    <main className="bg-white">
      {/* 1. Hero Section */}
      <SubPageHero 
        badge="FAQ"
        title="Technical Insights"
        subtitle="The global authority on industrial packaging compliance, structural lashing engineering, and export safety protocols. Empowering logistics leaders since 1993."
        bgImage="/images/banners/banner_main.png"
      />

      {/* 3. Category Filter Bar (Sticky) */}
      <BlogFilters 
        categories={categories}
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
      />

      {/* 4. Featured Article (Premium) */}
      <BlogFeatured post={featuredPost} />

      {/* 5. Trending Articles Strip */}
      <BlogTrending />

      {/* 6. Industry Insights Dashboard (Stats) */}
      <BlogStats />

      {/* 7. FAQ Grid (Main Articles) */}
      <BlogGrid posts={postsToShow} />

      {/* Pagination Load More */}
      {visibleCount < filteredPosts.length && (
        <div className="flex justify-center pb-20 bg-white">
          <button 
            onClick={() => setVisibleCount(v => v + 24)}
            className="px-10 py-4 bg-[#1A1F2C] text-white rounded-xl font-black text-xs tracking-widest uppercase hover:bg-[#ff6a00] hover:shadow-[0_20px_40px_-10px_rgba(255,106,0,0.4)] transition-all duration-300"
          >
            Load More Articles ({filteredPosts.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {/* 8. Quick Guides Section */}
      <BlogQuickGuides />

      {/* 9. Video Insights */}
      <BlogVideos />

      {/* 14. Trust / Client Proof (Integrated here for trust building before Case Studies) */}
      <BlogTrust />

      {/* 10. Case Studies Section */}
      <BlogCaseStudies />

      {/* 11. Product-Based Articles (Direct Lead Gen) */}
      <BlogProductLinks />

      {/* 15. FAQ (Blog Related) */}
      <BlogFAQ />

      {/* 12. Newsletter (Upgraded) */}
      <BlogNewsletter />

      {/* 17. Final CTA */}
      <BlogFinalCTA />

    </main>
  );
}
