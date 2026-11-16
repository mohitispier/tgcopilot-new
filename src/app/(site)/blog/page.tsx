import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts, postTypeLabel, type PostType } from '@/lib/content';
import { PostCard } from '@/components/site/post-card';
import { Container, Section } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { NewsletterForm } from '@/components/site/newsletter-form';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Blog: Telegram Advertising Guides and Articles',
  description: 'Learn how to advertise on Telegram: Telegram Ads, channel promotion, copywriting, channel research and budgeting.',
  alternates: { canonical: '/blog' },
};

const types: (PostType | 'all')[] = ['all', 'guide', 'tutorial', 'article', 'case-study', 'update'];

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const active = types.includes(type as PostType) ? (type as PostType) : 'all';
  const all = getAllPosts();
  const posts = active === 'all' ? all : all.filter((p) => p.type === active || (active === 'guide' && p.type === 'tutorial'));
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources' }, { label: 'Blog', href: '/blog' }]} kicker="Blog" title="Telegram advertising, explained" description="Guides and articles written by the team that runs Telegram campaigns every day.">
        <div className="max-w-md"><NewsletterForm /></div>
      </PageHero>
      <Section tone="white" className="pt-12">
        <Container className="flex flex-col gap-10">
          <nav aria-label="Filter articles" className="flex gap-2 overflow-x-auto pb-1">
            {types.map((t) => (
              <Link key={t} href={t === 'all' ? '/blog' : `/blog?type=${t}`} aria-current={active === t ? 'page' : undefined}
                className={cn('flex h-10 flex-none items-center rounded-full border px-4 text-sm font-semibold', active === t ? 'border-brand bg-brand text-white' : 'border-line text-ink-2 hover:border-line-2')}>
                {t === 'all' ? 'All' : postTypeLabel[t]}
              </Link>
            ))}
          </nav>
          {posts.length ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
          ) : (
            <div className="rounded-3xl border border-dashed border-line-2 bg-mist p-12 text-center">
              <p className="font-display text-xl font-bold">No {postTypeLabel[active as PostType]?.toLowerCase()} articles yet</p>
              <p className="mt-2 text-muted">New articles are on the way. <Link href="/blog" className="font-semibold text-brand hover:underline">See all articles</Link></p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
