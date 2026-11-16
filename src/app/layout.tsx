import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import '@fontsource-variable/figtree';
import '@fontsource-variable/bricolage-grotesque';
import './globals.css';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'TG Copilot | Telegram Ads Agency & Advertising Platform', template: '%s | TG Copilot' },
  description: site.description,
  applicationName: 'TG Copilot',
  keywords: ['Telegram ads', 'Telegram advertising agency', 'Telegram Ads management', 'Telegram channel promotion', 'Telegram channel marketplace', 'buy Telegram ads'],
  openGraph: { type: 'website', siteName: 'TG Copilot', url: site.url, title: 'TG Copilot | Telegram Ads Agency & Advertising Platform', description: site.description, locale: 'en_US' },
  twitter: { card: 'summary_large_image', title: 'TG Copilot', description: site.description },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.name,
  url: site.url,
  logo: `${site.url}/favicon.svg`,
  email: site.email,
  description: site.description,
  sameAs: Object.values(site.social).filter(Boolean),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:shadow-lg">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
        {site.gtmId && (
          <Script id="gtm" strategy="afterInteractive">{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${site.gtmId}');`}</Script>
        )}
      </body>
    </html>
  );
}
