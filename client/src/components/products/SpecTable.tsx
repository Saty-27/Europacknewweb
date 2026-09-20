import type { PalletSpec } from '@/constants/productsData';

/**
 * The row order a pallet buyer reads down: size first, then how it is built,
 * then what it carries, then how it is treated and marked. A row whose value
 * we do not hold is dropped entirely — an empty row or a "Varies" is worse
 * than no row, both for the buyer and for anything parsing the table.
 */
const SPEC_ROWS: { key: keyof PalletSpec; label: string }[] = [
  { key: 'dimensions', label: 'Dimensions (L × W)' },
  { key: 'height', label: 'Height' },
  { key: 'entryType', label: 'Entry type' },
  { key: 'construction', label: 'Construction' },
  { key: 'deckBoards', label: 'Deck boards (top / bottom)' },
  { key: 'timber', label: 'Timber' },
  { key: 'staticLoad', label: 'Static load' },
  { key: 'dynamicLoad', label: 'Dynamic load' },
  { key: 'rackingLoad', label: 'Racking load' },
  { key: 'unladenWeight', label: 'Unladen weight' },
  { key: 'moistureContent', label: 'Moisture content' },
  { key: 'treatment', label: 'Treatment' },
  { key: 'marking', label: 'Marking' },
  { key: 'standard', label: 'Standard / certification' },
  { key: 'applications', label: 'Typical applications' },
];

export function specRows(spec: PalletSpec) {
  return SPEC_ROWS.flatMap(({ key, label }) => {
    const value = spec[key];
    return value ? [{ label, value }] : [];
  });
}

export default function SpecTable({
  spec,
  productName,
}: {
  spec: PalletSpec;
  productName: string;
}) {
  const rows = specRows(spec);
  if (rows.length === 0) return null;

  return (
    // Narrow screens scroll the table rather than pushing the page sideways.
    <div className="overflow-x-auto rounded-2xl border border-slate-100 shadow-sm">
      <table className="w-full min-w-[420px] border-collapse">
        <caption className="sr-only">
          {productName} — dimensions, load and treatment specification
        </caption>
        <thead>
          <tr className="bg-slate-900 text-white">
            <th
              scope="col"
              className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-widest w-[46%]"
            >
              Specification
            </th>
            <th
              scope="col"
              className="text-left px-5 py-3.5 text-[10px] font-black uppercase tracking-widest"
            >
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-slate-50 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
            >
              <th
                scope="row"
                className="text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest text-[#FF6600] align-top"
              >
                {row.label}
              </th>
              <td className="px-5 py-3 text-xs font-bold text-slate-700">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
