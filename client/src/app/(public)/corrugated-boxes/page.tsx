import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('corrugated-boxes');

export default function CorrugatedBoxesPage() {
  return <FlatSeoRoutePage slug="corrugated-boxes" />;
}
