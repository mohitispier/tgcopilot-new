import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, BookOpen, Code2, GraduationCap, LifeBuoy, Newspaper, Trophy } from 'lucide-react';
import { getAllPosts } from '@/lib/content';
import { PostCard } from '@/components/site/post-card';
import { Container, Section, SectionHeader } from '@/components/ui/layout';
import { PageHero } from '@/components/site/page-hero';
import { CtaBand } from '@/components/site/cta-band';

export const metadata: Metadata = {
  title: 'Resources: Telegram Advertising Knowledge Hub',
  description: 'Guides, tutorials, case studies, industry updates and help articles about advertising on Telegram.',
  alternates: { canonical: '/resources' },
};

const hubs = [
  { icon: Newspaper, title: 'Blog', text: 'Articles on Telegram advertising strategy.', href: '/blog' },
  { icon: GraduationCap, title: 'Guides & tutorials', text: 'Step-by-step how-tos for every format.', href: '/blog?type=guide' },
  { icon: Trophy, title: 'Case studies', text: 'How real campaigns performed.', href: '/case-studies' },
  { icon: BookOpen, title: 'Industry updates', text: 'Changes to Telegram Ads and policies.', href: '/blog?type=update' },
  { icon: LifeBuoy, title: 'Help center', text: 'Answers about our services and platform.', href: '/help' },
  { icon: Code2, title: 'API documentation', text: 'For partners and developers.', href: '/docs/api' },
];

export default function ResourcesPage() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <>
      <PageHero crumbs={[{ label: 'Resources', href: '/resources' }]} kicker="Knowledge hub" title="Everything we know about Telegram advertising" description="Practical guides, tutorials and updates from the campaigns we run every week." />
      <Section tone="white">
        <Container className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {hubs.map((h) => (
            <Link key={h.title} href={h.href} className="group flex items-start gap-4 rounded-[26px] border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-[var(--shadow-float)]">
              <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl bg-gradient-to-br from-tg to-violet text-white shadow-md transition-transform group-hover:scale-105 group-hover:-rotate-3"><h.icon className="h-6 w-6" aria-hidden="true" /></span>
              <span className="flex flex-col gap-1">
                <span className="flex items-center gap-1.5 font-display text-lg font-bold text-ink">{h.title}<ArrowRight className="h-4 w-4 text-brand opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true" /></span>
                <span className="text-[15px] text-muted">{h.text}</span>
              </span>
            </Link>
          ))}
        </Container>
      </Section>
      <Section tone="mist">
        <Container className="flex flex-col gap-10">
          <SectionHeader title="Latest articles" action={<Link href="/blog" className="font-semibold text-brand hover:underline">View all</Link>} />
          <div className="grid gap-5 md:grid-cols-3">{posts.map((p) => <PostCard key={p.slug} post={p} />)}</div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
