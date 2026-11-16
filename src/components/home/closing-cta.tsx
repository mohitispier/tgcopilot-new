import { ArrowRight, Send } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';
import { Reveal } from '@/components/motion/reveal';
import { telegramUrl } from '@/data/site';

function Plane({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 64" className={className} style={style} aria-hidden="true">
      <path d="M58 8 6 28c-2 .8-2 2.9 0 3.6l12 4.2 4.6 14c.6 1.8 2.8 2.3 4.1 1l6.7-6.4 12.6 9.3c1.8 1.3 4.3.3 4.8-1.8l8-38.4C59.3 9.6 58.6 7.7 58 8Z" fill="currentColor" />
    </svg>
  );
}

export interface CtaProps {
  title?: string;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function ClosingCta({
  title = 'Ready to grow your brand on Telegram?',
  text = 'Tell us what you want to promote. We’ll reply within one working day with ideas, a plan and a clear quote.',
  primary = { label: 'Discuss your requirements', href: '/contact' },
  secondary,
}: CtaProps = {}) {
  return (
    <section className="bg-white pb-24 pt-8 sm:pb-28">
      <Container>
        <Reveal variant="scale">
          <div className="relative isolate overflow-hidden rounded-[40px] bg-[linear-gradient(120deg,#1e8fd6_0%,#1673c4_45%,#5b4ce0_100%)] px-7 py-16 text-center text-white shadow-[0_50px_100px_-50px_rgb(22_115_196/0.9)] sm:px-14 sm:py-24">
            <div className="aurora pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
              <span className="-left-20 -top-24 h-[360px] w-[360px] bg-cyan/50" />
              <span className="-right-16 bottom-0 h-[380px] w-[380px] bg-violet/60" />
              <span className="left-1/3 top-1/2 h-[260px] w-[260px] bg-tg/50" />
            </div>
            <svg className="pointer-events-none absolute inset-0 -z-10 h-full w-full opacity-[0.12]" aria-hidden="true">
              <defs><pattern id="cta-grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#fff" strokeWidth="1" /></pattern></defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
            {/* orbit rings + planes */}
            <div className="pointer-events-none absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full border border-white/25" aria-hidden="true" />
            <div className="pointer-events-none absolute -right-10 -top-10 -z-10 h-52 w-52 rounded-full border border-white/20" aria-hidden="true" />
            <Plane className="float-slow absolute right-[12%] top-10 hidden h-14 w-14 rotate-12 text-white/90 drop-shadow-xl sm:block" />
            <Plane className="float-med absolute bottom-12 left-[9%] hidden h-10 w-10 -rotate-12 text-white/70 sm:block" style={{ animationDelay: '1s' }} />
            <Plane className="float-slow absolute left-[22%] top-12 hidden h-6 w-6 rotate-6 text-white/50 lg:block" style={{ animationDelay: '2s' }} />

            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-7">
              <h2 className="text-[34px] font-bold leading-[1.04] tracking-[-0.035em] text-white sm:text-[50px] lg:text-[58px]">{title}</h2>
              <p className="max-w-2xl text-lg text-white/90 sm:text-xl">{text}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <ButtonLink href={primary.href} variant="white" size="lg" className="group">{primary.label}<ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></ButtonLink>
                {secondary ? (
                  <ButtonLink href={secondary.href} size="lg" className="border border-white/40 bg-white/10 shadow-none backdrop-blur hover:bg-white/20">{secondary.label}</ButtonLink>
                ) : (
                  <ButtonLink href={telegramUrl} size="lg" className="border border-white/40 bg-white/10 shadow-none backdrop-blur hover:bg-white/20"><Send className="h-5 w-5" aria-hidden="true" />Message us on Telegram</ButtonLink>
                )}
              </div>
              <p className="text-sm text-white/80">Free consultation. No commitment until you approve the plan.</p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
