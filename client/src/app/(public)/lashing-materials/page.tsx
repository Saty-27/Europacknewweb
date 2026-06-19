import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('lashing-materials');

export default function LashingMaterialsPage() {
  return <FlatSeoRoutePage slug="lashing-materials" />;
}
