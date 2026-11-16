import type { MetadataRoute } from 'next';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { getAllPosts } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ['', '/services', '/ad-engine', '/marketplace', '/discovery', '/chrome-extension', '/pricing', '/resources', '/blog', '/case-studies', '/help', '/docs/api', '/about', '/contact', '/privacy', '/terms', '/refund-policy', '/cookie-policy'];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency: 'weekly' as const, priority: p === '' ? 1 : p === '/services' ? 0.9 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })),
    ...getAllPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: 'monthly' as const, priority: 0.6 })),
  ];
}
