import { ModulePlaceholder, areaParams } from '@/components/app-shell/module-placeholder';

export const dynamicParams = false;
export function generateStaticParams() {
  return areaParams('owner');
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  return <ModulePlaceholder areaKey="owner" slug={(await params).slug} />;
}
