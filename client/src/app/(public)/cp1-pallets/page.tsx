import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('cp1-pallets');

export default function Cp1PalletsPage() {
  return <FlatSeoRoutePage slug="cp1-pallets" />;
}
