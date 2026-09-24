import type { Metadata } from 'next';
import Link from 'next/link';
import CityJsonLd from '@/components/seo/city/CityJsonLd';
import {
  CityBreadcrumbs,
  CityCta,
  CityFaq,
  CityFormatTable,
  CityHero,
  CitySection,
} from '@/components/seo/city/CityChrome';

/**
 * /wooden-pallets-manufacturer-in-vadodara
 *
 * The second and last city page. It is written around the chemical and
 * petrochemical cluster in the GIDC belt, which specifies pallets differently
 * from anywhere else we supply — the CP series rather than general-purpose
 * footprints, drum decks and bag decks rather than entry patterns. That is real
 * subject matter, and it is why this page shares no sentences with the Mumbai
 * one.
 *
 * Schema mode is `office`: G.J. Patel Estate on Harni Dena Road is a real
 * address, confirmed against the Google Business Profile listing, so this page
 * emits LocalBusiness with it. It claims a location and nothing more — no
 * manufacturing capacity, stock holding or headcount is stated here, because
 * the repo does not state any.
 */

const PATH = '/wooden-pallets-manufacturer-in-vadodara';
const IMAGE = '/images/products/user_cp1_pallets.webp';

const AREA_SERVED = [
  'Vadodara',
  'Makarpura',
  'Nandesari',
  'Savli',
  'Halol',
  'Padra',
  'Por',
  'Ranoli',
];

const FAQ = [
  {
    q: 'Where in Vadodara is Europack located?',
    a: 'Our Vadodara address is G.J. Patel Estate, Plot No. 44/B, Harni Dena Road, NH 48, Dena, Vadodara, Gujarat 390022. From there we cover the surrounding GIDC belt — Makarpura, Nandesari, Savli, Halol, Padra, Por and Ranoli. The pallet desk is on +91 98200 90775 or sales@europackindia.in, Monday to Saturday, 9:00 AM to 7:00 PM.',
  },
  {
    q: 'Why do Vadodara buyers order CP pallets rather than standard sizes?',
    a: 'The CP series is the chemical industry standard, and the belt around Vadodara is chemical and petrochemical territory. A CP number fixes the footprint and the deck pattern together, so a shipper specifying CP3 or CP8 is specifying how drums sit on it, not just how big it is.',
  },
  {
    q: 'What are the CP pallet sizes?',
    a: 'CP1 is 1000 × 1200 mm, CP2 is 800 × 1200 mm, CP3, CP4, CP8 and CP9 are all 1140 × 1140 mm with different deck constructions, CP5 is 760 × 1140 mm, CP6 is 1200 × 1000 mm and CP7 is 1300 × 1100 mm. The table on this page sets out the construction and timber for each.',
  },
  {
    q: 'Which CP pallet should I use for drums?',
    a: 'CP3 is the container-optimised drum pallet with a stable loading base, and CP8 has a solid perimeter drilled for drum discharge. If the drums are being emptied on the pallet rather than just moved on it, CP8 is usually the one being asked for.',
  },
  {
    q: 'Can you consolidate a bulk order across several GIDC units?',
    a: 'Yes — bulk orders for the GIDC estates can be consolidated so that a single delivery covers a production run rather than arriving piecemeal. Where several units under the same group are ordering separately, saying so at quotation usually changes the freight rather than the pallet.',
  },
  {
    q: 'Are pallets delivered to Vadodara ISPM-15 treated?',
    a: 'They are when the cargo is going for export — heat treatment at 56 °C with the IPPC / ISPM-15 stamp. A great deal of what moves in this belt is domestic inter-plant traffic that does not need the treatment, so it is specified per order rather than applied to everything by default.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Wooden Pallets', path: '/wooden-pallets' },
  { name: 'Vadodara', path: PATH },
];

const TITLE = 'Wooden Pallet Manufacturer in Vadodara | Europack';
const DESCRIPTION =
  "ISPM-15 wooden pallets for Vadodara's GIDC belt — Makarpura, Nandesari, Savli and Halol. CP1 to CP9 chemical-standard pallets, drum decks and custom sizes.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'wooden pallet manufacturer in Vadodara',
    'wooden pallet manufacturers Vadodara',
    'pallet manufacturer Vadodara',
    'wooden pallets Baroda',
    'CP pallets Vadodara',
    'GIDC pallet supplier',
  ],
  alternates: { canonical: `https://europackindia.com${PATH}` },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: `https://europackindia.com${PATH}`,
    images: [IMAGE],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [IMAGE],
  },
};

export default function WoodenPalletsVadodaraPage() {
  return (
    <>
      <CityJsonLd
        mode="office"
        office="vadodara"
        path={PATH}
        name="Europack — Wooden Pallet Manufacturer, Vadodara"
        description={DESCRIPTION}
        image={IMAGE}
        areaServed={AREA_SERVED}
        faq={FAQ}
        breadcrumbs={BREADCRUMBS}
      />

      <CityHero
        eyebrow="Vadodara · The GIDC belt"
        h1="Wooden Pallet Manufacturer in Vadodara"
        facts={[
          { label: 'Vadodara address', value: 'G.J. Patel Estate, Harni Dena Road, NH 48, Dena — 390022' },
          { label: 'Estates served', value: 'Makarpura, Nandesari, Savli, Halol, Padra, Por, Ranoli' },
          { label: 'Dominant standard', value: 'CP series — the chemical industry footprints' },
          { label: 'Pallet desk', value: 'Mon–Sat, 9:00 AM – 7:00 PM' },
        ]}
        lead={
          <>
            <p>
              Vadodara specifies pallets differently from anywhere else we supply. In most cities the
              conversation starts with a footprint and an entry pattern. Here it usually starts with a CP
              number, because the belt around Baroda is chemical and petrochemical territory and the CP series
              is that industry&rsquo;s own standard.
            </p>
            <p>
              Our Vadodara address is G.J. Patel Estate, Plot No. 44/B on Harni Dena Road, just off NH 48 at
              Dena — inside the belt it serves rather than a lead time away from it. What follows is the CP
              range with real dimensions, which deck suits drums and which suits bags, and how bulk orders
              across these estates are usually put together.
            </p>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <CityBreadcrumbs trail={BREADCRUMBS} />

        <CitySection id="vadodara-cp" label="The CP series" title="Every CP pallet size, and what each deck is for">
          <div className="max-w-3xl mb-8 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              A CP number is not just a size. It fixes the footprint and the deck construction together, which
              is why a shipper can write &ldquo;CP4&rdquo; on a specification and know the receiving plant will
              understand the smooth deck and the absence of sharp edges without further description.
            </p>
            <p>
              Four of the nine share the same 1140 × 1140 mm footprint and differ only in how the deck is
              built — that is the distinction that most often gets lost when an order is placed by size alone.
            </p>
          </div>

          <CityFormatTable
            caption="CP1 to CP9 chemical-standard pallets — dimensions, deck construction and timber"
            ids={['cp1', 'cp2', 'cp3', 'cp4', 'cp5', 'cp6', 'cp7', 'cp8', 'cp9']}
          />

          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-8">
            The CP series is one of several standards we cut to. Entry patterns, timber grades and
            construction types are set out across the full{' '}
            <Link
              href="/wooden-pallets"
              className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
            >
              wooden pallets
            </Link>{' '}
            range.
          </p>
        </CitySection>

        <CitySection id="vadodara-load" label="Specifying" title="Drums, bags, and what changes the deck">
          <div className="max-w-3xl space-y-8">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">Drummed goods</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A drum concentrates its weight on a small contact area and it does not forgive a deck that
                flexes.{' '}
                <Link
                  href="/cp3-pallets"
                  className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
                >
                  CP3
                </Link>{' '}
                is the container-optimised version with a stable loading base, and{' '}
                <Link
                  href="/cp8-pallets"
                  className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
                >
                  CP8
                </Link>{' '}
                has a solid perimeter drilled for drum discharge — the one to specify if the drum is being
                emptied where it stands rather than carried somewhere else first.
              </p>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">Bagged product</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Bags fail differently: they snag and they tear, so the deck surface matters more than its
                stiffness.{' '}
                <Link
                  href="/cp1-pallets"
                  className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
                >
                  CP1
                </Link>{' '}
                carries a peripheral deck for stacked bagged goods, CP4 adds smooth decking with no sharp
                edges, and CP5 is the small-format answer at 760 × 1140 mm.
              </p>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">
                When a CP number is the wrong answer
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Plenty of traffic in this belt is engineering rather than chemical, and a component that does
                not fit a published footprint should not be forced onto one. A custom size cut to the part is
                normal work, and often cheaper in freight terms than paying for deck area nothing sits on.
              </p>
            </div>
          </div>
        </CitySection>

        <CitySection id="vadodara-estates" label="Coverage" title="The GIDC estates we deliver into">
          <div className="max-w-3xl space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Makarpura, Nandesari, Savli, Halol, Padra, Por and Ranoli. These estates sit far enough apart
              that treating them as one delivery region rather than seven destinations is what keeps the
              landed cost sensible.
            </p>
            <p>
              In practice that means bulk orders for the GIDC estates can be consolidated so that a single
              delivery covers a production run, instead of a series of part-loads arriving against separate
              purchase orders. If several units under the same group are ordering separately, it is worth
              saying so at quotation — the pallets do not change, but the freight does.
            </p>
          </div>
        </CitySection>

        <CitySection id="vadodara-faq" label="Common questions" title="Wooden pallets in Vadodara — FAQ">
          <CityFaq items={FAQ} />
        </CitySection>

        <CityCta
          heading="Send the CP number, or the load if you do not have one"
          body="If the specification already names a CP format we can quote straight from it. If it does not, tell us what sits on the pallet — drums, bags, a machined part — and which estate it is going to, and we will come back with the format and a landed price."
        />

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-12">
          Ordering into Maharashtra instead? Our{' '}
          <Link
            href="/wooden-pallets-manufacturer-in-mumbai"
            className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
          >
            Mumbai pallet page
          </Link>{' '}
          covers the MMR, the Navi Mumbai belt and export stamping timed against a JNPT stuffing date.
        </p>
      </div>
    </>
  );
}
