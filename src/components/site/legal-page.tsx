import { notFound } from 'next/navigation';
import { getLegal } from '@/lib/content';
import { Container, Section, HeaderSpacer } from '@/components/ui/layout';
import { Breadcrumbs } from './page-hero';

export function LegalPage({ slug }: { slug: string }) {
  const doc = getLegal(slug);
  if (!doc) notFound();
  return (
    <>
      <section className="border-b border-line bg-mist">
        <HeaderSpacer />
        <Container className="flex max-w-[860px] flex-col gap-5 py-12 sm:py-16">
          <Breadcrumbs items={[{ label: doc.title, href: `/${slug}` }]} />
          <h1 className="text-[36px] font-bold tracking-[-0.03em] sm:text-[48px]">{doc.title}</h1>
          <p className="text-muted">Last updated {new Date(doc.updated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </Container>
      </section>
      <Section tone="white" className="py-12 sm:py-16">
        <Container className="max-w-[860px]">
          <article className="prose max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink-2 prose-li:text-ink-2 prose-a:text-brand prose-blockquote:rounded-xl prose-blockquote:border-l-0 prose-blockquote:bg-warning-soft prose-blockquote:p-4 prose-blockquote:font-normal prose-blockquote:not-italic prose-blockquote:text-warning" dangerouslySetInnerHTML={{ __html: doc.html }} />
        </Container>
      </Section>
    </>
  );
}
