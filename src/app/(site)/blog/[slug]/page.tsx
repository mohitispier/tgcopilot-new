import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllPosts, getPost, postTypeLabel } from '@/lib/content';
import { site } from '@/data/site';
import { Container, Section, HeaderSpacer } from '@/components/ui/layout';
import { Breadcrumbs } from '@/components/site/page-hero';
import { PostCard, PostCover } from '@/components/site/post-card';
import { CtaBand } from '@/components/site/cta-band';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.excerpt,
    alternates: { canonical: `/blog/${post.meta.slug}` },
    openGraph: { type: 'article', title: post.meta.title, description: post.meta.excerpt, publishedTime: post.meta.date, authors: [post.meta.author] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const { meta, html, headings } = post;
  const related = getAllPosts().filter((p) => p.slug !== meta.slug).slice(0, 3);
  const ld = {
    '@context': 'https://schema.org', '@type': 'Article', headline: meta.title, description: meta.excerpt,
    datePublished: meta.date, dateModified: meta.updated ?? meta.date, author: { '@type': 'Organization', name: meta.author },
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: `${site.url}/favicon.svg` } },
    mainEntityOfPage: `${site.url}/blog/${meta.slug}`,
  };
  const date = new Date(meta.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <>
      <section className="border-b border-line bg-mist">
        <HeaderSpacer />
        <Container className="flex max-w-[1100px] flex-col gap-6 py-12 sm:py-16"><div className="flex max-w-[780px] flex-col gap-6">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: meta.title, href: `/blog/${meta.slug}` }]} />
          <p className="flex flex-wrap items-center gap-3 text-sm"><span className="rounded-full bg-tg-soft px-3 py-1 font-semibold text-brand">{postTypeLabel[meta.type]}</span><span className="text-muted">{meta.readingMinutes} min read</span><span className="text-muted">{date}</span></p>
          <h1 className="text-[34px] font-bold leading-[1.08] tracking-[-0.03em] sm:text-[48px]">{meta.title}</h1>
          <p className="text-lg text-muted sm:text-xl">{meta.excerpt}</p>
          <p className="text-sm text-ink-2">By <strong>{meta.author}</strong></p>
          </div>
        </Container>
      </section>
      <Section tone="white" className="py-12 sm:py-16">
        <Container className="grid max-w-[1100px] gap-12 lg:grid-cols-[1fr_240px]">
          <article className="prose prose-lg max-w-none prose-headings:font-display prose-headings:tracking-tight prose-headings:text-ink prose-p:text-ink-2 prose-a:font-semibold prose-a:text-brand prose-strong:text-ink prose-li:text-ink-2" dangerouslySetInnerHTML={{ __html: html }} />
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-6">
              {headings.length > 0 && (
                <nav aria-label="On this page" className="rounded-2xl border border-line p-5">
                  <p className="mb-3 text-sm font-bold text-ink">On this page</p>
                  <ul className="flex flex-col gap-2 text-sm">{headings.map((h) => <li key={h.id}><a href={`#${h.id}`} className="text-muted hover:text-brand">{h.text}</a></li>)}</ul>
                </nav>
              )}
              <div className="overflow-hidden rounded-2xl border border-line">
                <PostCover cover="blue" className="h-24" />
                <div className="p-5">
                  <p className="font-display font-bold text-ink">Need help with your campaign?</p>
                  <p className="mt-1 text-sm text-muted">Get a free plan and quote from our team.</p>
                  <Link href="/contact" className="mt-3 inline-block text-sm font-semibold text-brand hover:underline">Book a consultation</Link>
                </div>
              </div>
            </div>
          </aside>
        </Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </Section>
      <Section tone="mist" className="py-16 sm:py-20">
        <Container className="flex flex-col gap-8">
          <h2 className="text-[28px] font-bold">Keep reading</h2>
          <div className="grid gap-5 md:grid-cols-3">{related.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
