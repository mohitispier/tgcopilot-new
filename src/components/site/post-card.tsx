import Link from 'next/link';
import { ArrowUpRight, Search } from 'lucide-react';
import type { PostMeta } from '@/lib/content';
import { postTypeLabel } from '@/lib/content';
import { cn } from '@/lib/utils';

const bgs = {
  blue: 'from-[#2aabee] via-[#1e8fd6] to-[#1673c4]',
  navy: 'from-[#3a5bd9] via-[#2d47b8] to-[#5b4ce0]',
  sky: 'from-[#e3f3fc] via-[#d9ecfa] to-[#efecff]',
};

/** Generated cover artwork, varied per article so the blog never looks like repeated placeholders. */
export function PostCover({ cover, slug = '', className }: { cover: PostMeta['cover']; slug?: string; className?: string }) {
  const light = cover === 'sky';
  const variant = /-vs-/.test(slug) ? 0 : /check/.test(slug) ? 1 : /160|writing/.test(slug) ? 2 : /budget/.test(slug) ? 3 : [...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % 4;
  const fg = light ? 'bg-white' : 'bg-white/95';
  return (
    <span aria-hidden="true" className={cn('relative block overflow-hidden bg-gradient-to-br', bgs[cover], className)}>
      <span className={cn('absolute inset-0 opacity-30', light ? 'bg-dots' : '[background-image:radial-gradient(rgb(255_255_255/0.35)_1px,transparent_1px)] [background-size:18px_18px]')} />
      <span className={cn('absolute -right-10 -top-12 h-44 w-44 rounded-full border-[22px]', light ? 'border-brand/10' : 'border-white/15')} />
      {variant === 0 && (
        <>
          <span className={cn('absolute left-[8%] top-[20%] w-[44%] rounded-2xl rounded-bl-md p-3 shadow-lg', fg)}>
            <span className="block text-[10px] font-bold text-brand">Sponsored</span>
            <span className="mt-1 block h-1.5 w-11/12 rounded-full bg-[#d6e2ee]" /><span className="mt-1 block h-1.5 w-2/3 rounded-full bg-[#d6e2ee]" />
          </span>
          <span className="absolute left-[46%] top-[42%] flex h-10 w-10 items-center justify-center rounded-full bg-violet font-display text-xs font-bold text-white shadow-lg ring-4 ring-white/40">VS</span>
          <span className={cn('absolute right-[8%] top-[50%] w-[40%] rounded-2xl rounded-br-md p-3 shadow-lg', fg)}>
            <span className="block h-10 rounded-lg bg-gradient-to-br from-tg to-brand" />
            <span className="mt-1.5 block h-1.5 w-3/4 rounded-full bg-[#d6e2ee]" />
          </span>
        </>
      )}
      {variant === 1 && (
        <>
          <span className="absolute left-[10%] top-[18%] flex w-[52%] flex-col gap-1.5">
            {[1, 0, 1].map((ok, i) => (
              <span key={i} className={cn('flex items-center gap-2 rounded-lg px-2.5 py-2 shadow-md', fg)}>
                <span className="h-4 w-4 rounded-full bg-[#cfe3f3]" /><span className="h-1.5 flex-1 rounded-full bg-[#d6e2ee]" />
                <span className={cn('h-3.5 w-3.5 rounded-full', ok ? 'bg-mint' : 'bg-red-400')} />
              </span>
            ))}
          </span>
          <span className="absolute bottom-[12%] right-[12%] flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-white bg-tg/90 text-white shadow-xl"><Search className="h-8 w-8" /></span>
        </>
      )}
      {variant === 2 && (
        <>
          <span className={cn('absolute left-[10%] right-[10%] top-[22%] rounded-2xl p-4 shadow-lg', fg)}>
            <span className="flex items-center justify-between"><span className="h-2 w-24 rounded-full bg-brand" /><span className="font-display text-sm font-bold text-brand">160</span></span>
            <span className="mt-2 block h-1.5 w-5/6 rounded-full bg-[#d6e2ee]" /><span className="mt-1 block h-1.5 w-1/2 rounded-full bg-[#d6e2ee]" />
          </span>
          <span className="absolute bottom-[14%] left-[10%] flex gap-1.5">
            {['Benefit', 'Urgency', 'Question'].map((t) => <span key={t} className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-brand shadow">{t}</span>)}
          </span>
        </>
      )}
      {variant === 3 && (
        <>
          <span className="absolute left-[12%] top-1/2 h-24 w-24 -translate-y-1/2 rounded-full shadow-xl" style={{ background: 'conic-gradient(#ffffff 0 45%, #6e56f7 45% 72%, #22c3ee 72% 100%)' }}>
            <span className="absolute inset-[22%] rounded-full bg-tg" />
          </span>
          <span className="absolute right-[10%] top-[24%] flex h-[52%] w-[42%] items-end gap-1.5 rounded-2xl bg-white/95 p-3 shadow-lg">
            {[40, 60, 52, 78, 70, 92].map((h, i) => <span key={i} className="flex-1 rounded-t bg-gradient-to-t from-brand to-tg" style={{ height: `${h}%` }} />)}
          </span>
        </>
      )}
    </span>
  );
}

export function PostCard({ post, featured = false }: { post: PostMeta; featured?: boolean }) {
  return (
    <article className={cn('group relative flex overflow-hidden rounded-[28px] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-float)]', featured ? 'flex-col lg:h-full' : 'flex-col')}>
      <span className="relative block overflow-hidden">
        <PostCover cover={post.cover} slug={post.slug} className={cn('transition-transform duration-500 group-hover:scale-[1.04]', featured ? 'h-56 lg:h-72' : 'h-48')} />
      </span>
      <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
        <p className="flex items-center gap-3 text-sm"><span className="rounded-full bg-tg-soft px-2.5 py-0.5 font-semibold text-brand">{postTypeLabel[post.type]}</span><span className="text-muted">{post.readingMinutes} min read</span></p>
        <h3 className={cn('font-bold leading-snug', featured ? 'text-[24px] sm:text-[28px]' : 'text-xl')}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">{post.title}</Link>
        </h3>
        <p className="text-[15px] text-muted">{post.excerpt}</p>
        <p className="mt-auto flex items-center justify-between pt-3 text-sm text-muted">
          {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          <span className="flex items-center gap-1 font-semibold text-brand">Read article<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" /></span>
        </p>
      </div>
    </article>
  );
}
