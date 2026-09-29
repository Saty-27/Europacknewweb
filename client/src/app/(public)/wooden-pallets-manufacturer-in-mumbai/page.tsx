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
 * /wooden-pallets-manufacturer-in-mumbai
 *
 * One of exactly two city pages on the site, and the only one written around a
 * place of business: the head office in Vile Parle West. Everything specific to
 * Mumbai here — the MMR delivery geography, the JNPT stamping timeline, the
 * no-entry window problem — is a fact about supplying this city that does not
 * appear on /wooden-pallets and could not be produced by swapping a token in a
 * template. That is the line between this page and the 7,700 doorway pages the
 * site deleted.
 *
 * Head term discipline: this page targets "wooden pallet manufacturer in
 * Mumbai". The unqualified head term stays with /wooden-pallets, which this
 * page links up to with the site's one repeated anchor.
 */

const PATH = '/wooden-pallets-manufacturer-in-mumbai';
const IMAGE = '/images/products/four-way-pallets.webp';

const AREA_SERVED = [
  'Mumbai',
  'Navi Mumbai',
  'Thane',
  'Bhiwandi',
  'Vasai-Virar',
  'Panvel',
];

const FAQ = [
  {
    q: 'Where in Mumbai is Europack based?',
    a: 'Our head office is at 101, ML Spaces, Railway Station Rd, near Vile Parle, above Bharat Bank, Navpada, Kamala Nagar, Vile Parle West, Mumbai, Maharashtra 400056. The pallet desk is reachable on +91 98200 90775 or sales@europackindia.in, Monday to Saturday, 9:00 AM to 7:00 PM.',
  },
  {
    q: 'Which areas of Mumbai and the MMR do you deliver wooden pallets to?',
    a: 'Andheri and Andheri MIDC, BKC and SEEPZ, Goregaon, Malad, Borivali, Dadar, Kurla, Ghatkopar, Vikhroli, Bhandup and Mulund, and northwards into Thane, Wagle Estate, Bhiwandi and Vasai-Virar. Across the creek we cover Taloja MIDC, the TTC Industrial Area, Rabale, Mahape, Vashi, Turbhe, Belapur and Panvel.',
  },
  {
    q: 'Are your Mumbai pallets ISPM-15 certified for export?',
    a: 'Yes. Export pallets are heat-treated at 56 °C and carry the IPPC / ISPM-15 stamp, which is what customs and the phytosanitary inspection look for. Pallets going into domestic warehouse or racking use do not need the treatment, and we will not quote it onto an order that does not require it.',
  },
  {
    q: 'Can you deliver pallets in time for a container stuffing at JNPT?',
    a: 'That is the normal case in the Navi Mumbai belt. Exporters need pallets stamped and ready for inspection before the container is stuffed, so we schedule against the shipping bill rather than the order date, and deliver direct for export via JNPT / Nhava Sheva.',
  },
  {
    q: 'Our Mumbai site has a narrow approach and a restricted delivery window. Is that a problem?',
    a: 'It is the most common constraint in the city and it is worth telling us before we quote. We schedule pallet drops around the load and the window rather than around our own route, which is usually the difference between a delivery that lands and one that is turned away at the gate.',
  },
  {
    q: 'What sizes of wooden pallet do you make in Mumbai?',
    a: 'The published footprints — the 1200 × 800 mm Euro pallet and the CP series — plus fully custom sizes cut to a load. Entry pattern, timber grade and deck layout are all specified separately, so a custom size is not a special order so much as the normal one.',
  },
];

const BREADCRUMBS = [
  { name: 'Home', path: '/' },
  { name: 'Wooden Pallets', path: '/wooden-pallets' },
  { name: 'Mumbai', path: PATH },
];

const TITLE = 'Wooden Pallet Manufacturer in Mumbai | Europack';
const DESCRIPTION =
  'ISPM-15 wooden pallets across Mumbai and the MMR from our Vile Parle West office — Euro, four-way, two-way and custom sizes, stamped for export via JNPT.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    'wooden pallet manufacturer in Mumbai',
    'wooden pallet manufacturers Mumbai',
    'pallet manufacturer Mumbai',
    'wooden pallets Mumbai',
    'ISPM-15 pallets Mumbai',
    'export pallets JNPT',
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

export default function WoodenPalletsMumbaiPage() {
  return (
    <>
      <CityJsonLd
        mode="office"
        office="mumbai"
        path={PATH}
        name="Europack — Wooden Pallet Manufacturer, Mumbai"
        description={DESCRIPTION}
        image={IMAGE}
        areaServed={AREA_SERVED}
        faq={FAQ}
        breadcrumbs={BREADCRUMBS}
      />

      <CityHero
        eyebrow="Mumbai · Vile Parle West"
        h1="Wooden Pallet Manufacturer in Mumbai"
        facts={[
          { label: 'Head office', value: 'Vile Parle West, Mumbai 400056' },
          { label: 'Export treatment', value: 'ISPM-15 heat treatment at 56 °C, IPPC stamped' },
          { label: 'Port corridor', value: 'Direct delivery for export via JNPT / Nhava Sheva' },
          { label: 'Pallet desk', value: 'Mon–Sat, 9:00 AM – 7:00 PM' },
        ]}
        lead={
          <>
            <p>
              Europack has run out of Vile Parle West for years, and most of what we ship from here goes
              a short distance into a city that makes deliveries difficult. Mumbai pallet buyers are rarely
              choosing between suppliers on the pallet itself — they are choosing on whether it arrives inside
              a two-hour window, through a gate a full-size truck cannot reach.
            </p>
            <p>
              This page covers what we supply across the MMR and the Navi Mumbai port belt, how export
              stamping is timed against a JNPT stuffing date, and the formats that actually move here.
            </p>
          </>
        }
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <CityBreadcrumbs trail={BREADCRUMBS} />

        <CitySection
          id="mumbai-formats"
          label="What moves here"
          title="The formats Mumbai orders most"
        >
          <div className="max-w-3xl mb-8 space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Two things drive the specification in this city: whether the pallet is going into a container
              and whether the warehouse racks it. Export cargo pulls towards four-way entry and the Euro
              footprint, because a stuffing crew working to a clock wants forks in from any side. Racked
              warehouse stock pulls the other way, towards two-way entry and hardwood, where the timber left
              in the stringers is doing the work.
            </p>
            <p>
              Dimensions, timber and load figures for each format below come from the same catalog the
              product pages are built from.
            </p>
          </div>

          <CityFormatTable
            caption="Wooden pallet formats most commonly supplied in Mumbai, with dimensions, build and timber"
            ids={['euro-pallets', 'four-way-pallet', 'two-way-pallet', 'hardwood-pallet']}
          />

          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-8">
            These four are the common Mumbai answers, not the full range. The complete set of formats — every
            standard, entry pattern, timber grade and construction type we build — is set out on our{' '}
            <Link
              href="/wooden-pallets"
              className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
            >
              wooden pallets
            </Link>{' '}
            hub page.
          </p>
        </CitySection>

        <CitySection
          id="mumbai-delivery"
          label="Coverage"
          title="Where we deliver across the MMR"
        >
          <div className="max-w-3xl space-y-8">
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">
                The island city and the western suburbs
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                From Vile Parle West we deliver into Andheri and Andheri MIDC, BKC and SEEPZ, Goregaon, Malad
                and Borivali, and down into Dadar. Consignees here are often pharmaceutical, media or
                electronics units on compact plots where the loading bay is shared with everything else the
                building receives that morning.
              </p>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">
                The central suburbs and the northern belt
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kurla, Ghatkopar, Vikhroli, Bhandup and Mulund, then northwards into Thane, Wagle Estate,
                Bhiwandi and Vasai-Virar. Bhiwandi in particular is warehouse country, and the order sizes
                there behave differently from the city — full-truck quantities on a replenishment pattern
                rather than a one-off count.
              </p>
            </div>
            <div>
              <h3 className="text-base font-black text-slate-900 tracking-tight mb-2">
                Navi Mumbai and the JNPT corridor
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Taloja MIDC, the TTC Industrial Area, Rabale, Mahape, Vashi, Turbhe, Belapur and Panvel. This
                belt is where export timing stops being a detail and becomes the whole order, which is the
                next section.
              </p>
            </div>
          </div>
        </CitySection>

        <CitySection
          id="mumbai-export"
          label="Export"
          title="Stamping, and the JNPT stuffing date"
        >
          <div className="max-w-3xl space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              An export pallet has to be heat-treated at 56 °C and carry the IPPC / ISPM-15 stamp before the
              container is stuffed, not before it sails. That distinction is what catches people out: the
              pallet is inside a sealed box by the time anyone thinks about the inspection, and a pallet that
              is not stamped at that moment is a problem that cannot be fixed at the port.
            </p>
            <p>
              So for the Navi Mumbai belt we schedule against the shipping bill rather than the order date,
              and deliver direct for export via JNPT / Nhava Sheva. If you give us the stuffing date rather
              than a required-by date, the plan comes out of that instead of the other way round.
            </p>
            <p>
              Pallets staying in the country do not need any of this. Heat treatment on a domestic racking
              order is cost with nothing attached to it, and we will say so rather than quote it.
            </p>
          </div>
        </CitySection>

        <CitySection
          id="mumbai-access"
          label="The constraint nobody quotes for"
          title="Getting a pallet through a Mumbai gate"
        >
          <div className="max-w-3xl space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Pallets are bulky, low-value-per-cubic-metre freight. That makes the delivered cost far more
              sensitive to access than to distance — a consignee eight kilometres away with a narrow approach
              and a one-hour receiving window can cost more to serve than a plant in Bhiwandi.
            </p>
            <p>
              The variables that actually matter are the ones worth telling us up front: whether a full-size
              truck can reach the bay, whether there is a no-entry window on the approach road, whether the
              stack has to be hand-unloaded, and whether the receiving window is fixed. We schedule pallet
              drops around the load rather than around our route, which is why those questions come before the
              price rather than after it.
            </p>
          </div>
        </CitySection>

        <CitySection id="mumbai-faq" label="Common questions" title="Wooden pallets in Mumbai — FAQ">
          <CityFaq items={FAQ} />
        </CitySection>

        <CityCta
          heading="Tell us where in Mumbai it has to land"
          body="Send the size, the load, the format if you already know it, and the delivery address with its access constraints. If it is an export order, send the stuffing date. We come back with a landed price rather than an ex-works one."
        />

        <p className="text-sm text-slate-600 leading-relaxed max-w-3xl mt-12">
          Supplying somewhere else in the country? We also publish a page for{' '}
          <Link
            href="/wooden-pallets-manufacturer-in-vadodara"
            className="font-bold text-slate-900 underline decoration-orange-200 underline-offset-4 hover:text-[#FF6600] hover:decoration-[#FF6600] transition-colors"
          >
            pallet supply into the Vadodara GIDC belt
          </Link>
          , and the six regions we serve most often are set out on the hub page.
        </p>
      </div>
    </>
  );
}
