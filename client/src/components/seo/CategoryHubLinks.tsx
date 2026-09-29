import Link from 'next/link';
import { getCategoryHub } from '@/constants/internalLinks';

/**
 * The down-links from a landing page into its sub-types, grouped the way a
 * buyer narrows a choice. Replaces the unlinked chip grid that used to sit here
 * — the chips named the formats but pointed nowhere, so the sub-type pages got
 * no internal links from the one page that should be feeding them.
 *
 * Links come from @/constants/internalLinks and always point at routes that
 * already exist. This component must never construct an href.
 */
export default function CategoryHubLinks({ slug }: { slug: string }) {
  const hub = getCategoryHub(slug);
  if (!hub) return null;

  return (
    <section className="mb-24" aria-labelledby="range-hub">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-12 bg-[#FF6600] shrink-0" />
        <div>
          <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">{hub.label}</p>
          <h2 id="range-hub" className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">
            {hub.title}
          </h2>
        </div>
      </div>

      <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mb-12">{hub.intro}</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
        {hub.groups.map((group) => (
          <div key={group.heading}>
            <h3 className="text-lg font-black text-slate-900 tracking-tight mb-2">{group.heading}</h3>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">{group.lead}</p>
            <ul className="space-y-3 list-none p-0 m-0">
              {group.links.map((link) => (
                <li key={link.href} className="text-sm text-slate-600 leading-relaxed flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FF6600] shrink-0" aria-hidden="true" />
                  <span>
                    <Link
                      href={link.href}
                      className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
                    >
                      {link.anchor}
                    </Link>{' '}
                    — {link.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
