'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Map, 
  ArrowRight, 
  Globe, 
  Box, 
  Shield, 
  Users, 
  ChevronRight, 
  Search, 
  Filter, 
  Database, 
  MapPin, 
  Layers, 
  FolderOpen 
} from 'lucide-react';
import { productsData } from '@/constants/productsData';
import marketplaceData from '@/constants/marketplaceData.json';
import blogIndex from '@/constants/blogIndex.json';

export default function SitemapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [visibleBlogsCount, setVisibleBlogsCount] = useState(100);

  // 1. Core Pages Link Config
  const coreSections = [
    {
      title: "Core Portal",
      icon: <Globe className="text-[#FF6600]" size={20}/>,
      links: [
        { name: "Home - Gateway", href: "/" },
        { name: "About Europack", href: "/about" },
        { name: "Services Overview", href: "/services" },
        { name: "Product Catalog", href: "/products" },
        { name: "Technical Blog", href: "/blog" },
      ]
    },
    {
      title: "Corporate & Details",
      icon: <Users className="text-[#FF6600]" size={20}/>,
      links: [
        { name: "Careers at Europack", href: "/careers" },
        { name: "Contact Engineers", href: "/contact" },
        { name: "Company Facts", href: "/company-facts" },
        { name: "Project Gallery", href: "/gallery" },
      ]
    },
    {
      title: "Resources & Media",
      icon: <FolderOpen className="text-[#FF6600]" size={20}/>,
      links: [
        { name: "Media Resources", href: "/resources" },
        { name: "Case Studies Portal", href: "/case-studies" },
        { name: "Watch Videos", href: "/videos" },
        { name: "Request Quote", href: "/quote" },
      ]
    },
    {
      title: "Legal & Policies",
      icon: <Shield className="text-[#FF6600]" size={20}/>,
      links: [
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Engagement", href: "/terms" },
      ]
    }
  ];

  // 2. Extra Unique Filters from Blog Index
  const uniqueProducts = useMemo(() => {
    const products = new Set<string>();
    blogIndex.forEach((b: any) => {
      if (b.product) products.add(b.product);
    });
    return Array.from(products).sort();
  }, []);

  const uniqueLocations = useMemo(() => {
    const locations = new Set<string>();
    blogIndex.forEach((b: any) => {
      if (b.location) locations.add(b.location);
    });
    return Array.from(locations).sort();
  }, []);

  // 3. Filter Blogs Dynamically
  const filteredBlogs = useMemo(() => {
    return blogIndex.filter((blog: any) => {
      const matchesSearch = searchQuery
        ? blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      const matchesProduct = selectedProduct
        ? blog.product === selectedProduct
        : true;
      const matchesLocation = selectedLocation
        ? blog.location === selectedLocation
        : true;
      return matchesSearch && matchesProduct && matchesLocation;
    });
  }, [searchQuery, selectedProduct, selectedLocation]);

  // Paginated display slice
  const displayedBlogs = useMemo(() => {
    return filteredBlogs.slice(0, visibleBlogsCount);
  }, [filteredBlogs, visibleBlogsCount]);

  const totalBlogsCount = blogIndex.length;

  return (
    <div className="min-h-screen bg-[#0B0F19] pt-32 pb-20 overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6600]/5 rounded-full blur-[150px] -mr-96 -mt-96" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#FF6600]/5 rounded-full blur-[120px] -ml-64 -mb-64" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        
        {/* Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] text-[11px] font-black uppercase tracking-[0.3em] mb-6">
            <Map size={14} /> Comprehensive Index
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Interactive <span className="text-[#FF6600]">Sitemap.</span>
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium mb-4">
            Browse our full taxonomy: dynamic category hubs, products, target locations, and technical export frameworks.
          </p>
          <div className="text-slate-500 font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-4">
            <span>Core Nodes: {coreSections.reduce((acc, s) => acc + s.links.length, 0)}</span>
            <span>•</span>
            <span>Categories: {productsData.length}</span>
            <span>•</span>
            <span>Locations: {marketplaceData.locations.length}</span>
            <span>•</span>
            <span>Blueprints: {totalBlogsCount}</span>
          </div>
        </motion.div>

        {/* 1. Core Sites Navigation Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Layers size={20} className="text-[#FF6600]" /> Core Infrastructure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreSections.map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-[30px] p-6 hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                  {section.icon}
                </div>
                <h3 className="text-lg font-black text-white mb-6 border-b border-white/5 pb-2">{section.title}</h3>
                <ul className="space-y-4">
                  {section.links.map((link, lIdx) => (
                    <li key={lIdx}>
                      <Link 
                        href={link.href} 
                        className="text-slate-400 hover:text-[#FF6600] font-bold text-sm flex items-center gap-2 transition-all hover:translate-x-1"
                      >
                        <ChevronRight size={12} className="text-[#FF6600]" /> {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Product Catalog Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-white mb-8 flex items-center gap-3">
            <Box size={20} className="text-[#FF6600]" /> Product Categories &amp; Variants
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {productsData.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.04 }}
                className="bg-white/5 border border-white/10 rounded-[30px] p-6 hover:bg-white/10 transition-all"
              >
                <Link 
                  href={`/${category.id}`}
                  className="text-lg font-black text-white hover:text-[#FF6600] block mb-4 border-b border-white/5 pb-2 transition-colors"
                >
                  {category.title}
                </Link>
                <ul className="space-y-3">
                  {category.subCategories.flatMap(sub => sub.products).map((product) => (
                    <li key={product.id}>
                      <Link 
                        href={`/${product.id}`} 
                        className="text-slate-400 hover:text-[#FF6600] font-medium text-xs flex items-center gap-2 transition-all hover:translate-x-1"
                      >
                        <ChevronRight size={10} className="text-slate-600" /> {product.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 3. Location and Industry Portals Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Target Locations */}
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
              <MapPin size={18} className="text-[#FF6600]" /> Serviced Locations
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {marketplaceData.locations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/locations/${loc.slug}`}
                  className="text-slate-400 hover:text-[#FF6600] font-bold text-xs flex items-center gap-2 hover:translate-x-1 transition-all"
                >
                  <ChevronRight size={10} className="text-[#FF6600]" /> {loc.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Target Verticals */}
          <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">
            <h2 className="text-xl font-black text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
              <Database size={18} className="text-[#FF6600]" /> Vertical Portals
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {marketplaceData.industries.map((ind) => (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className="text-slate-400 hover:text-[#FF6600] font-bold text-xs flex items-center gap-2 hover:translate-x-1 transition-all"
                >
                  <ChevronRight size={10} className="text-[#FF6600]" /> {ind.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* 4. Technical Blueprint Directory (5360 blogs searchable) */}
        <div className="bg-white/5 border border-white/10 rounded-[40px] p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-6 mb-8">
            <div>
              <h2 className="text-2xl font-black text-white flex items-center gap-3">
                <Database size={22} className="text-[#FF6600]" /> Engineering Blueprints &amp; Technical Blogs
              </h2>
              <p className="text-slate-400 font-bold text-xs mt-1">
                Found {filteredBlogs.length} articles matching filters (out of {totalBlogsCount} total)
              </p>
            </div>
            
            {/* Technical XML link */}
            <Link 
              href="/sitemap.xml" 
              className="text-xs font-bold text-[#FF6600] hover:underline flex items-center gap-1.5"
              target="_blank"
            >
              Raw sitemap.xml <ArrowRight size={12} />
            </Link>
          </div>

          {/* Search Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleBlogsCount(100); // reset visible count
                }}
                className="w-full bg-[#0B0F19]/50 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[#FF6600]/50"
              />
            </div>

            {/* Filter by Product */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <select
                value={selectedProduct}
                onChange={(e) => {
                  setSelectedProduct(e.target.value);
                  setVisibleBlogsCount(100);
                }}
                className="w-full bg-[#0B0F19]/50 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6600]/50 appearance-none"
              >
                <option value="">All Products</option>
                {uniqueProducts.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            {/* Filter by Location */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <select
                value={selectedLocation}
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                  setVisibleBlogsCount(100);
                }}
                className="w-full bg-[#0B0F19]/50 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6600]/50 appearance-none"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

          </div>

          {/* Blogs Grid List */}
          {displayedBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {displayedBlogs.map((blog: any) => (
                <div 
                  key={blog.id} 
                  className="bg-[#0B0F19]/30 border border-white/5 rounded-2xl p-4 hover:border-[#FF6600]/30 hover:bg-[#0B0F19]/50 transition-all group flex flex-col justify-between"
                >
                  <Link 
                    href={`/blog/${blog.slug}`}
                    className="text-white hover:text-[#FF6600] font-black text-sm line-clamp-2 transition-colors mb-3"
                  >
                    {blog.title}
                  </Link>
                  <div className="flex flex-wrap items-center gap-3 mt-auto">
                    {blog.product && (
                      <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-[10px] font-bold text-slate-400">
                        {blog.product}
                      </span>
                    )}
                    {blog.location && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FF6600]/10 text-[10px] font-black text-[#FF6600]">
                        📍 {blog.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-slate-500 font-bold">
              No technical blueprints match the specified filters. Try refining your keywords.
            </div>
          )}

          {/* Paginated controls */}
          {filteredBlogs.length > visibleBlogsCount && (
            <div className="text-center mt-10">
              <button
                onClick={() => setVisibleBlogsCount(prev => prev + 100)}
                className="px-10 py-4 bg-[#FF6600]/10 border border-[#FF6600]/30 hover:bg-[#FF6600] text-white hover:border-transparent rounded-2xl font-black uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-orange-500/10"
              >
                Load More Articles (+100)
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

