import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

/**
 * Blog posts and legal pages are plain Markdown files in src/content.
 * To add a post: create src/content/blog/<slug>.md with the frontmatter shown in the existing files.
 */
export type PostType = 'guide' | 'tutorial' | 'article' | 'case-study' | 'update';

export interface PostMeta {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
  type: PostType;
  category: string;
  tags: string[];
  author: string;
  readingMinutes: number;
  cover: 'blue' | 'navy' | 'sky';
  draft?: boolean;
}

const root = path.join(process.cwd(), 'src', 'content');

function readingTime(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

export function getAllPosts(): PostMeta[] {
  const dir = path.join(root, 'blog');
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
      return {
        slug: file.replace(/\.md$/, ''),
        title: data.title,
        excerpt: data.excerpt,
        date: toIsoDate(data.date),
        updated: data.updated ? toIsoDate(data.updated) : undefined,
        type: data.type ?? 'article',
        category: data.category ?? 'Telegram Ads',
        tags: data.tags ?? [],
        author: data.author ?? 'TG Copilot Team',
        readingMinutes: data.readingMinutes ?? readingTime(content),
        cover: data.cover ?? 'blue',
        draft: !!data.draft,
      } satisfies PostMeta;
    })
    .filter((p) => !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string) {
  const file = path.join(root, 'blog', `${slug}.md`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  const { content } = matter(fs.readFileSync(file, 'utf8'));
  const meta = getAllPosts().find((p) => p.slug === slug);
  if (!meta) return null;
  const headings = [...content.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ text: m[1], id: slugifyHeading(m[1]) }));
  const renderer = new marked.Renderer();
  renderer.heading = ({ tokens, depth }) => {
    const text = marked.Parser.parseInline(tokens);
    const plain = tokens.map((t) => ('text' in t ? t.text : '')).join('');
    return `<h${depth} id="${slugifyHeading(plain)}">${text}</h${depth}>`;
  };
  const html = marked.parse(content, { renderer, async: false }) as string;
  return { meta, html, headings };
}

export function getLegal(slug: string) {
  const file = path.join(root, 'legal', `${slug}.md`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  return { title: data.title as string, updated: toIsoDate(data.updated), html: marked.parse(content, { async: false }) as string };
}

function toIsoDate(v: unknown) {
  const d = v instanceof Date ? v : new Date(String(v));
  return isNaN(d.getTime()) ? String(v) : d.toISOString().slice(0, 10);
}

function slugifyHeading(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const postTypeLabel: Record<PostType, string> = {
  guide: 'Guide', tutorial: 'Tutorial', article: 'Article', 'case-study': 'Case study', update: 'Industry update',
};
