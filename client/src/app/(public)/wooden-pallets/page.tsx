import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('wooden-pallets');

export default function WoodenPalletsPage() {
  return <FlatSeoRoutePage slug="wooden-pallets" />;
}
