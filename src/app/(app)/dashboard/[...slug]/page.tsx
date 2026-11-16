import { ModulePlaceholder, areaParams } from '@/components/app-shell/module-placeholder';

export const dynamicParams = false;
export function generateStaticParams() {
  return areaParams('dashboard');
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  return <ModulePlaceholder areaKey="dashboard" slug={(await params).slug} />;
}
