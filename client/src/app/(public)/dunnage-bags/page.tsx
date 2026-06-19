import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('dunnage-bags');

export default function DunnageBagsPage() {
  return <FlatSeoRoutePage slug="dunnage-bags" />;
}
