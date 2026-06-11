'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, ArrowRight, Shield, Zap, Globe, Package, Check, 
  Phone, MessageSquare, Award, ArrowLeft, Star, FileText, Settings, Sparkles, HelpCircle
} from 'lucide-react';
import InquiryModal from '@/components/layout/InquiryModal';
import { categorySeoData, generateCategoryDynamicSeo } from '@/constants/categorySeoData';

interface Product {
  id: string;
  name: string;
  subTitle: string;
  img: string;
  specs: string[];
}

interface SubCategory {
  title: string;
  products: Product[];
}

interface Category {
  id: string;
  title: string;
  img: string;
  iconName: string;
  desc: string;
  subCategories: SubCategory[];
}

export default function CategoryDetailClient({ category }: { category: Category }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load target SEO article or dynamic fallback
  const seoArticle = categorySeoData[category.id] || generateCategoryDynamicSeo(category.id, category.title, category.desc);

  return (
    <main className="bg-[#F8FAFC] min-h-screen text-[#1A1F2C]">
      {/* 1. Cinematic Category Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-[#1A1F2C]">
        <div className="absolute inset-0 z-0">
          <Image 
            src={category.img} 
            alt={category.title} 
            fill
            className="object-cover object-center opacity-30 blur-[1px]"
            priority
            onError={(e: any) => {
              e.target.src = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C] via-[#1A1F2C]/90 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2C] via-transparent to-transparent z-10" />
        </div>

        <div className="container max-w-[90rem] mx-auto px-6 relative z-20">
          <div className="max-w-4xl space-y-6">
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-black uppercase tracking-widest no-underline mb-2"
            >
              <ArrowLeft size={14} /> Back to Catalog
            </Link>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest">
              <Sparkles size={12} /> Industrial Packaging Solutions
            </div>
            {/* Clean Page Title / H1 */}
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase m-0">
              {category.title}
            </h1>
            <p className="text-slate-300 text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
              {category.desc}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-3 px-8 py-4 bg-[#FF6600] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#E65C00] transition-all border-none cursor-pointer"
              >
                Request Wholesale Quote <ArrowRight size={16}/>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Short Product Intro + Bullet Points Section */}
      <section className="bg-white border-b border-slate-100 py-16">
        <div className="container max-w-[90rem] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">Product Overview</h2>
              <p className="text-slate-600 text-lg font-medium leading-relaxed">
                {seoArticle.heroText || category.desc}
              </p>
            </div>
            <div className="lg:col-span-5 bg-[#F8FAFC] border border-slate-100 p-8 rounded-[32px]">
              <h3 className="text-sm font-black uppercase tracking-wider mb-6 text-slate-800">Key Highlights</h3>
              <ul className="space-y-4 pl-0 list-none m-0">
                {(seoArticle.heroBullets || [
                  "Customized sizes available",
                  "Suitable for export and domestic transport",
                  "Heavy-duty industrial use",
                  "Designed for warehouse and forklift handling",
                  "Available for Mumbai and nearby industrial areas"
                ]).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-600 text-sm font-semibold leading-relaxed">
                    <Check size={18} className="text-[#FF6600] shrink-0 mt-0.5" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Product Cards / Variants Section */}
      <section className="bg-slate-50 border-b border-slate-100 py-20">
        <div className="container max-w-[90rem] mx-auto px-6 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">Variants & Specifications</h2>
            <p className="text-slate-500 text-sm font-medium leading-relaxed">
              Explore our standard range of {category.title.toLowerCase()} configurations. We manufacture variants tailored to load distributions, sizes, and handling methods.
            </p>
          </div>

          <div className="space-y-20">
            {category.subCategories.map((sub, sIdx) => (
              <div key={sIdx} className="space-y-8">
                <div className="flex items-center gap-4">
                  <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 whitespace-nowrap">{sub.title}</h3>
                  <div className="h-px bg-slate-200 w-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sub.products.map((p) => (
                    <div 
                      key={p.id}
                      className="group bg-white rounded-[40px] border border-slate-100 p-8 hover:shadow-2xl hover:shadow-orange-500/5 transition-all duration-500 flex flex-col"
                    >
                      <div className="relative h-48 rounded-[30px] overflow-hidden mb-6 bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <Image 
                          src={p.img} 
                          alt={p.name} 
                          fill 
                          className="object-contain p-6 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply opacity-90"
                          onError={(e: any) => {
                            e.target.src = '/images/product_icon_placeholder.png';
                          }}
                        />
                        <div className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest text-slate-300">ID: {p.id.toUpperCase()}</div>
                      </div>

                      <div className="flex-grow flex flex-col">
                        <h4 className="text-xl font-black text-[#1A1F2C] tracking-tight mb-1 group-hover:text-[#FF6600] transition-colors">{p.name}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">{p.subTitle}</p>
                        
                        <div className="space-y-3 mb-8 flex-grow">
                          {p.specs.map((spec, idx) => (
                            <div key={idx} className="flex items-start gap-3 text-[11px] font-bold text-slate-500 leading-tight">
                              <Check size={14} className="text-[#FF6600] shrink-0 mt-0.5" />
                              <span>{spec}</span>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-3 pt-6 border-t border-slate-50">
                          <button 
                            onClick={() => setIsModalOpen(true)}
                            className="w-full py-3.5 rounded-xl bg-[#F8FAFC] border border-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest hover:bg-[#FF6600] hover:text-white hover:border-transparent transition-all duration-300 cursor-pointer"
                          >
                            Request Engineering Quote
                          </button>
                          <Link 
                            href={`/${p.id}`}
                            className="w-full py-3.5 rounded-xl bg-white border border-slate-200 text-slate-400 text-[10px] font-black uppercase tracking-widest hover:border-[#FF6600] hover:text-[#FF6600] transition-all duration-300 flex items-center justify-center gap-2 no-underline"
                          >
                            View Specifications <ChevronRight size={14} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. 600+ Word SEO Section */}
      <section className="bg-white border-b border-slate-100 py-20">
        <div className="container max-w-[4xl] mx-auto px-6">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">Deep-Dive Analysis</h2>
              <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight uppercase">
                {category.title} Engineering & Operational Value
              </h3>
            </div>
            <div className="h-px bg-slate-100 w-24 mx-auto" />
            <div className="text-slate-600 text-sm font-semibold leading-relaxed space-y-6 whitespace-pre-line text-justify">
              {seoArticle.productOverview}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Applications Section */}
      {seoArticle.applications && seoArticle.applications.length > 0 && (
        <section className="bg-slate-50 border-b border-slate-100 py-20">
          <div className="container max-w-[90rem] mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">Applications</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Where This Product is Utilized</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seoArticle.applications.map((app, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-6 rounded-2xl flex items-start gap-4 shadow-sm">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF6600] shrink-0 font-black text-xs">
                    {idx + 1}
                  </div>
                  <div className="text-slate-600 text-xs font-bold leading-relaxed pt-1">
                    {app}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Benefits Section */}
      {seoArticle.benefits && seoArticle.benefits.length > 0 && (
        <section className="bg-white border-b border-slate-100 py-20">
          <div className="container max-w-[90rem] mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">Core Benefits</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Operational Advantages</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seoArticle.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-slate-100 p-6 rounded-2xl flex items-start gap-3">
                  <Check size={18} className="text-[#FF6600] shrink-0 mt-0.5" />
                  <div className="text-slate-600 text-xs font-bold leading-relaxed">
                    {benefit}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. Why Choose Europack */}
      {seoArticle.whyChoose && seoArticle.whyChoose.length > 0 && (
        <section className="bg-slate-50 border-b border-slate-100 py-20">
          <div className="container max-w-[90rem] mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">Partnership Value</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Why Choose Europack</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {seoArticle.whyChoose.map((point, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-8 rounded-[28px] shadow-sm space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2 h-full bg-[#FF6600]" />
                  <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Commitment {idx + 1}</h4>
                  <p className="text-slate-700 text-xs font-bold leading-relaxed m-0">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Process / Quality Approach */}
      {seoArticle.processApproach && (
        <section className="bg-white border-b border-slate-100 py-20">
          <div className="container max-w-[4xl] mx-auto px-6 space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">Engineering Process</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Our Quality Approach</h3>
            </div>
            <div className="bg-[#F8FAFC] border border-slate-100 p-10 rounded-[40px] text-slate-600 text-sm font-semibold leading-relaxed text-center whitespace-pre-line max-w-3xl mx-auto">
              {seoArticle.processApproach}
            </div>
          </div>
        </section>
      )}

      {/* 9. Mumbai Service Area Paragraph */}
      {seoArticle.localParagraph && (
        <section className="bg-slate-900 text-slate-100 py-16">
          <div className="container max-w-4xl mx-auto px-6 text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest">
              <Globe size={12} /> Local Supply Presence
            </div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight m-0">Serving Mumbai Metropolitan Region & Beyond</h3>
            <p className="text-slate-300 text-sm font-semibold leading-relaxed max-w-3xl mx-auto m-0 text-justify">
              {seoArticle.localParagraph}
            </p>
          </div>
        </section>
      )}

      {/* 10. Related Blogs */}
      {seoArticle.blogs && seoArticle.blogs.length > 0 && (
        <section className="bg-white border-b border-slate-100 py-20">
          <div className="container max-w-[90rem] mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">Insights</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Related Packaging Blogs</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {seoArticle.blogs.map((blog, idx) => (
                <div key={idx} className="group bg-slate-50 border border-slate-100 p-8 rounded-[32px] flex flex-col hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 flex items-center justify-center text-[#FF6600] mb-6">
                    <FileText size={22} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-3 group-hover:text-[#FF6600] transition-colors leading-snug">{blog.title}</h4>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed mb-6 flex-grow">{blog.desc}</p>
                  <Link 
                    href={blog.slug}
                    className="inline-flex items-center gap-2 text-[#FF6600] text-xs font-black uppercase tracking-wider no-underline hover:gap-3 transition-all"
                  >
                    Read Blog Article <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 11. Frequently Asked Questions (FAQs) */}
      {seoArticle.faqs && seoArticle.faqs.length > 0 && (
        <section className="bg-slate-50 border-b border-slate-100 py-20">
          <div className="container max-w-[4xl] mx-auto px-6 space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-xs font-black uppercase tracking-[0.4em] text-[#FF6600]">FAQ Help Center</h2>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight uppercase flex items-center justify-center gap-3">
                <HelpCircle className="text-[#FF6600]" size={28} /> Frequently Asked Questions
              </h3>
            </div>
            <div className="space-y-6">
              {seoArticle.faqs.map((faq, idx) => (
                <div key={idx} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm space-y-3">
                  <h4 className="text-slate-800 font-black text-sm uppercase tracking-tight m-0">
                    Q: {faq.q}
                  </h4>
                  <p className="text-slate-500 text-xs font-semibold leading-relaxed m-0 bg-[#F8FAFC] p-5 rounded-2xl border border-slate-100">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12. Final CTA Section */}
      <section className="bg-gradient-to-br from-[#1A1F2C] to-[#2D3748] text-white py-20 text-center">
        <div className="container max-w-4xl mx-auto px-6 space-y-8">
          <div className="w-16 h-16 bg-[#FF6600] rounded-3xl flex items-center justify-center text-white mx-auto">
            <Package size={32} />
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight m-0">Start Your Custom Project</h2>
          <p className="text-slate-300 text-sm font-semibold leading-relaxed max-w-2xl mx-auto m-0">
            {seoArticle.ctaText || `Contact Europack for customized packaging solutions based on your product size, weight, handling method and transit requirement.`}
          </p>
          <div className="flex flex-wrap gap-4 justify-center pt-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-3 px-8 py-4 bg-[#FF6600] text-white border-none rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#E65C00] transition-all cursor-pointer shadow-lg shadow-orange-500/20"
            >
              Get Free Consultation <ArrowRight size={16}/>
            </button>
          </div>
        </div>
      </section>

      {/* Inquiry Form Trigger */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  );
}
