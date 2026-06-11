import { permanentRedirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CategoryProductRedirectPage({
  params,
}: {
  params: Promise<{ filename: string; subfilename: string }>;
}) {
  const { subfilename } = await params;
  permanentRedirect(`/${subfilename}`);
}
