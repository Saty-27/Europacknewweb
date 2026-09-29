import Link from 'next/link';
import { productsData } from '@/constants/productsData';
import { findProductBySlug } from '@/lib/productContentGenerator';
import { getProductFlatSlug } from '@/lib/flatSeoRoutes';

/**
 * Presentational shell for the two city pages.
 *
 * Deliberately chrome only — headings, spacing, the orange rule, the FAQ
 * disclosure. Every word on a city page is authored in that page's own file.
 * The site is recovering from a doorway-page penalty, and the thing that made
 * those pages doorways was one template with a city name substituted into it.
 * Sharing a <section> wrapper is not that; sharing sentences would be.
 */

export function CityHero({
  eyebrow,
  h1,
  lead,
  facts,
}: {
  eyebrow: string;
  h1: string;
  lead: React.ReactNode;
  facts: { label: string; value: string }[];
}) {
  return (
    <section className="bg-[#0B0F19] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-[#FF6600]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 relative z-10">
        <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-[0.3em] mb-6">{eyebrow}</p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.05] max-w-4xl">
          {h1}
        </h1>
        <div className="text-base text-slate-300 leading-relaxed max-w-3xl mt-8 space-y-4">{lead}</div>

        <dl className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 rounded-2xl overflow-hidden mt-12 border border-white/10">
          {facts.map((fact) => (
            <div key={fact.label} className="bg-[#0B0F19] p-6">
              <dt className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{fact.label}</dt>
              <dd className="text-sm font-bold text-white leading-snug">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CitySection({
  label,
  title,
  id,
  children,
}: {
  label: string;
  title: string;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-20" aria-labelledby={id}>
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-12 bg-[#FF6600] shrink-0" />
        <div>
          <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">{label}</p>
          <h2 id={id} className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">
            {title}
          </h2>
        </div>
      </div>
      {children}
    </section>
  );
}

/**
 * <details> rather than a React accordion: every answer is in the served HTML
 * whether or not it is open, which is the same rule the product-page FAQ
 * follows, and it needs no client bundle to do it.
 */
export function CityFaq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3 max-w-4xl">
      {items.map((item) => (
        <details
          key={item.q}
          className="group bg-slate-50 rounded-2xl border border-slate-100 hover:border-orange-100 transition-colors [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
            <h3 className="font-black text-slate-900 text-sm pr-4 m-0">{item.q}</h3>
            <span
              aria-hidden="true"
              className="text-[#FF6600] shrink-0 text-lg font-black leading-none transition-transform duration-300 group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
            {item.a}
          </div>
        </details>
      ))}
    </div>
  );
}

export function CityCta({ heading, body }: { heading: string; body: string }) {
  return (
    <section className="bg-slate-900 rounded-[32px] p-10 lg:p-14 text-white mb-4">
      <h2 className="text-2xl lg:text-3xl font-black tracking-tighter mb-4 max-w-2xl">{heading}</h2>
      <p className="text-sm text-slate-300 leading-relaxed max-w-2xl mb-8">{body}</p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/contact"
          className="bg-[#FF6600] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:bg-[#e65c00] transition-colors no-underline"
        >
          Talk to the pallet desk
        </Link>
        <Link
          href="/quote"
          className="border-2 border-white/20 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] hover:border-white/50 transition-colors no-underline"
        >
          Request a quote
        </Link>
      </div>
    </section>
  );
}

/** A breadcrumb trail that matches the BreadcrumbList emitted alongside it. */
export function CityBreadcrumbs({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-12">
      <ol className="flex flex-wrap items-center gap-2 list-none p-0 m-0 text-[11px] font-bold text-slate-500">
        {trail.map((crumb, i) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true" className="text-slate-300">/</span>}
            {i === trail.length - 1 ? (
              <span aria-current="page" className="text-slate-900">{crumb.name}</span>
            ) : (
              <Link href={crumb.path} className="hover:text-[#FF6600] transition-colors no-underline">
                {crumb.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * A comparison table of pallet formats, read straight out of productsData via
 * the same slug function the routes use. The formats a page lists are chosen
 * per city — that is the page's own editorial judgement — but the dimensions,
 * timber and standard shown for each come from the catalog, so this table can
 * never claim a size the product page contradicts.
 */
export function CityFormatTable({
  ids,
  caption,
}: {
  ids: string[];
  caption: string;
}) {
  const rows = ids.flatMap((id) => {
    const found = findProductBySlug('wooden-pallets', id, productsData);
    if (!found) return [];
    const { product } = found;
    return [
      {
        id,
        name: product.name,
        href: `/${getProductFlatSlug('wooden-pallets', id)}`,
        dimensions: product.spec?.dimensions ?? '—',
        build: product.spec?.entryType ?? product.spec?.construction ?? '—',
        timber: product.spec?.timber ?? '—',
        use: product.spec?.applications ?? product.subTitle,
      },
    ];
  });

  if (rows.length === 0) return null;

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
      <table className="w-full min-w-[720px] border-collapse">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="bg-slate-900 text-white">
            <th scope="col" className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-widest">Format</th>
            <th scope="col" className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-widest">Dimensions</th>
            <th scope="col" className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-widest">Build</th>
            <th scope="col" className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-widest">Timber</th>
            <th scope="col" className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-widest">Typical load</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.id} className={i % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'}>
              <th scope="row" className="text-left px-5 py-4 text-sm font-black text-slate-900 align-top">
                <Link
                  href={row.href}
                  className="underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
                >
                  {row.name}
                </Link>
              </th>
              <td className="px-5 py-4 text-sm text-slate-600 align-top whitespace-nowrap">{row.dimensions}</td>
              <td className="px-5 py-4 text-sm text-slate-600 align-top">{row.build}</td>
              <td className="px-5 py-4 text-sm text-slate-600 align-top">{row.timber}</td>
              <td className="px-5 py-4 text-sm text-slate-600 align-top">{row.use}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
