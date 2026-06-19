import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('shrink-wrapping');

export default function ShrinkWrappingPage() {
  return <FlatSeoRoutePage slug="shrink-wrapping" />;
}
