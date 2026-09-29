import Link from 'next/link';
import { getSubTypeLinks } from '@/constants/internalLinks';

/**
 * The link back up to the landing page this product belongs under, plus the
 * formats a buyer would genuinely compare it against.
 *
 * The up-link anchor is deliberately the head term ("wooden pallets" for every
 * pallet sub-type) — that is the signal that tells Google which page owns it.
 * The sentence around it is written per page so the block does not read as a
 * repeated footer.
 */
export default function SubTypeLinks({
  flatSlug,
  categoryId,
}: {
  flatSlug: string;
  categoryId: string;
}) {
  const links = getSubTypeLinks(flatSlug, categoryId);
  if (!links) return null;

  return (
    <section className="mb-16" aria-labelledby="range-position">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-1 w-12 bg-[#FF6600] shrink-0" />
        <div>
          <p className="text-[10px] font-black text-[#FF6600] uppercase tracking-widest mb-1">In context</p>
          <h2 id="range-position" className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tighter">
            {links.heading}
          </h2>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-100 max-w-4xl">
        <p className="text-sm text-slate-600 leading-relaxed">
          {links.parent.lead}{' '}
          <Link
            href={links.parent.href}
            className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
          >
            {links.parent.anchor}
          </Link>
          {links.parent.tail}
        </p>

        {links.siblings.length > 0 && (
          <>
            <p className="text-sm text-slate-600 leading-relaxed mt-6">{links.siblingsLead}</p>
            <ul className="space-y-3 list-none p-0 mt-4 mb-0">
              {links.siblings.map((sibling) => (
                <li key={sibling.href} className="text-sm text-slate-600 leading-relaxed flex gap-3">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#FF6600] shrink-0" aria-hidden="true" />
                  <span>
                    <Link
                      href={sibling.href}
                      className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
                    >
                      {sibling.anchor}
                    </Link>{' '}
                    — {sibling.detail}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
