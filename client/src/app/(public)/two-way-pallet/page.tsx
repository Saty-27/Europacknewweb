import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('two-way-pallet');

export default function TwoWayPalletPage() {
  return <FlatSeoRoutePage slug="two-way-pallet" />;
}
