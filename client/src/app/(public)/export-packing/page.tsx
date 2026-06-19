import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('export-packing');

export default function ExportPackingPage() {
  return <FlatSeoRoutePage slug="export-packing" />;
}
