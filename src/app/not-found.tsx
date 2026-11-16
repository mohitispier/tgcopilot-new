import Link from 'next/link';
import { SiteHeader } from '@/components/site/header';
import { SiteFooter } from '@/components/site/footer';
import { ButtonLink } from '@/components/ui/button';
import { Container, HeaderSpacer } from '@/components/ui/layout';

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="bg-mist">
        <HeaderSpacer />
        <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-5 py-24 text-center">
          <p className="font-display text-7xl font-bold text-sky-2">404</p>
          <h1 className="text-[34px] font-bold">This page flew away</h1>
          <p className="max-w-md text-muted">The page you’re looking for doesn’t exist or has moved. Try one of these instead.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <ButtonLink href="/">Go to homepage</ButtonLink>
            <ButtonLink href="/services" variant="secondary">Our services</ButtonLink>
          </div>
          <Link href="/contact" className="text-sm font-semibold text-brand hover:underline">Or contact us</Link>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
