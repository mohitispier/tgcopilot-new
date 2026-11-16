import { notFound } from 'next/navigation';
import { areas, type AppArea } from '@/data/app-nav';
import { EmptyState, PageTitle } from './blocks';

export function ModulePlaceholder({ areaKey, slug }: { areaKey: AppArea['key']; slug: string[] }) {
  const area = areas[areaKey];
  const item = area.nav.find((n) => n.slug === slug.join('/'));
  if (!item) notFound();
  return (
    <>
      <PageTitle title={item.label} description={item.description} />
      <EmptyState icon={item.icon} title={`${item.label} is coming in the next build phase`} text="The layout and navigation are ready. This module will be connected to the backend and live data next." cta={{ label: 'Back to overview', href: area.base }} />
    </>
  );
}

export function areaParams(areaKey: AppArea['key']) {
  return areas[areaKey].nav.filter((n) => n.slug).map((n) => ({ slug: n.slug.split('/') }));
}
