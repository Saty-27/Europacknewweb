import FlatSeoRoutePage, { buildFlatSeoMetadata } from '@/components/seo/FlatSeoRoutePage';

export const metadata = buildFlatSeoMetadata('vacuum-packing');

export default function VacuumPackingPage() {
  return <FlatSeoRoutePage slug="vacuum-packing" />;
}
