import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('euro-pallets');

export default function EuroPalletsPage() {
  return <FlatSeoRoutePage slug="euro-pallets" />;
}
