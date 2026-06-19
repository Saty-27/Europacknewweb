import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('cp2-pallets');

export default function Cp2PalletsPage() {
  return <FlatSeoRoutePage slug="cp2-pallets" />;
}
