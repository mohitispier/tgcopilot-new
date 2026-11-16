import type { MetadataRoute } from 'next';
import { site } from '@/data/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/dashboard', '/owner', '/admin', '/login', '/register', '/forgot-password'] }],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
