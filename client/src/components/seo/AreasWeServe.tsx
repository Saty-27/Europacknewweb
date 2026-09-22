import Link from 'next/link';

/**
 * "Areas We Serve" — one section on a product page, never a page per location.
 *
 * This is the legitimate version of what the deleted doorway pages were trying
 * to do. It is prose in semantic HTML (h2 / h3 / p) rather than a chip grid,
 * because the sentences around a place name are what carry the relevance.
 *
 * Nothing here claims a facility in any city. Europack's head office is in Vile
 * Parle West, Mumbai; everywhere else is phrased as supply and delivery, which
 * is what it is.
 */

interface Region {
  heading: string;
  body: string;
}

const regions: Region[] = [
  {
    heading: 'Mumbai and the wider MMR',
    body:
      'Our head office is in Vile Parle West. We deliver into Andheri and Andheri MIDC, BKC and SEEPZ, Goregaon, Malad, Borivali, Dadar, Kurla, Ghatkopar, Vikhroli, Bhandup and Mulund, and northwards into Thane, Wagle Estate, Bhiwandi and Vasai-Virar. For city consignees with narrow access or restricted delivery windows, we schedule pallet drops around the load rather than around our route.',
  },
  {
    heading: 'Navi Mumbai and the JNPT corridor',
    body:
      'We supply pallets across Taloja MIDC, the TTC Industrial Area, Rabale, Mahape, Vashi, Turbhe, Belapur and Panvel. Exporters in this belt usually need pallets stamped and ready for inspection before the container is stuffed, so we time deliveries against the shipping bill rather than the order date, and can deliver direct for export via JNPT / Nhava Sheva.',
  },
  {
    heading: 'Vadodara and the Gujarat GIDC belt',
    body:
      'We serve Makarpura, Nandesari, Savli, Halol, Padra, Por and Ranoli. Chemical-industry formats are commonly specified across this belt — the CP series and drum-handling decks rather than general-purpose sizes — and bulk orders for the GIDC estates can be consolidated so that a single delivery covers a production run.',
  },
  {
    heading: 'Pune',
    body:
      'We supply pallets to Chakan MIDC, Talegaon MIDC, Ranjangaon and the Bhosari / Pimpri-Chinchwad belt. This is automotive and engineering territory, and pallets here are often sized to a specific component rather than to a standard footprint.',
  },
  {
    heading: 'Jamshedpur',
    body:
      'For the Adityapur Industrial Area (AIADA) and the engineering units around it, we supply heavy-duty pallets and skids built for dense metal loads. At that distance full-truck quantities are usually the practical unit, so we plan deliveries around them.',
  },
  {
    heading: 'Hosur',
    body:
      'In the south we serve SIPCOT Hosur and the TVS Industrial and Logistics Park. Where a requirement is scheduled against a production line, we can quote against a call-off pattern rather than a single order quantity.',
  },
];

export default function AreasWeServe({
  productName,
  heading,
  intro,
}: {
  productName: string;
  heading: string;
  intro: string;
}) {
  return (
    <section className="mb-24" aria-labelledby="areas-we-serve">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-12 bg-[#FF6600] shrink-0" />
        <div>
          <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">Areas we serve</p>
          <h2 id="areas-we-serve" className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">
            {heading}
          </h2>
        </div>
      </div>

      <div className="max-w-3xl">
        <p className="text-sm text-slate-600 leading-relaxed mb-10">{intro}</p>

        <div className="space-y-8">
          {regions.map((region) => (
            <div key={region.heading}>
              <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">{region.heading}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{region.body}</p>
            </div>
          ))}
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mt-10">
          If your site is not named above, it is still worth asking — we quote {productName.toLowerCase()} for
          industrial estates well beyond these six regions, and the delivered cost usually turns on volume and
          road access rather than distance alone.{' '}
          <Link
            href="/contact"
            className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
          >
            Tell us where you need them delivered
          </Link>{' '}
          and we will come back with a landed price.
        </p>
      </div>
    </section>
  );
}
