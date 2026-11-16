import { ArrowRight } from 'lucide-react';
import { Hero } from '@/components/home/hero';
import { NicheMarquee } from '@/components/home/niche-marquee';
import { ServicesShowcase } from '@/components/home/services-showcase';
import { HowItWorks } from '@/components/home/how-it-works';
import { ExtensionSection } from '@/components/home/extension-section';
import { WhyUs } from '@/components/home/why-us';
import { ClosingCta } from '@/components/home/closing-cta';
import Link from 'next/link';
import { PostCard, PostCover } from '@/components/site/post-card';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';
import { Reveal } from '@/components/motion/reveal';
import { getAllPosts, postTypeLabel, type PostMeta } from '@/lib/content';

export default function HomePage() {
  const [featured, ...others] = getAllPosts().slice(0, 3);
  return (
    <>
      <Hero />
      <NicheMarquee />
      <ServicesShowcase />
      <HowItWorks />
      <ExtensionSection />
      <WhyUs />

      <section id="resources" className="relative bg-gradient-to-b from-white to-mist py-24 sm:py-28 lg:py-32">
        <Container className="flex flex-col gap-12">
          <Reveal className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
            <div className="flex max-w-[680px] flex-col gap-4">
              <p className="text-[15px] font-semibold text-brand">Resources</p>
              <h2 className="text-[34px] font-bold leading-[1.04] tracking-[-0.035em] sm:text-[46px] lg:text-[52px]">Guides and insights for <span className="text-gradient">Telegram advertisers</span></h2>
              <p className="text-lg text-muted">Practical tips from the campaigns we run every week, free to read.</p>
            </div>
            <ButtonLink href="/blog" variant="secondary" className="group">All articles<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></ButtonLink>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
            {featured && <Reveal className="lg:row-span-2"><PostCard post={featured} featured /></Reveal>}
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={0.1 * (i + 1)}><PostCardCompact post={p} /></Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ClosingCta />
    </>
  );
}


function PostCardCompact({ post }: { post: PostMeta }) {
  return (
    <article className="group relative grid h-full overflow-hidden rounded-[28px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)] sm:grid-cols-[220px_1fr]">
      <span className="relative block overflow-hidden"><PostCover cover={post.cover} slug={post.slug} className="h-44 transition-transform duration-500 group-hover:scale-[1.04] sm:h-full" /></span>
      <div className="flex flex-col gap-2.5 p-6">
        <p className="flex items-center gap-3 text-sm"><span className="rounded-full bg-tg-soft px-2.5 py-0.5 font-semibold text-brand">{postTypeLabel[post.type]}</span><span className="text-muted">{post.readingMinutes} min read</span></p>
        <h3 className="text-lg font-bold leading-snug"><Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link></h3>
        <p className="line-clamp-2 text-[15px] text-muted">{post.excerpt}</p>
      </div>
    </article>
  );
}
