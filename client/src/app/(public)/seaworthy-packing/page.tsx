import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('seaworthy-packing');

export default function SeaworthyPackingPage() {
  return <FlatSeoRoutePage slug="seaworthy-packing" />;
}
