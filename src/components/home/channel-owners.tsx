import { BadgeCheck, CalendarDays, Wallet } from 'lucide-react';
import { ButtonLink } from '@/components/ui/button';
import { Container } from '@/components/ui/layout';

export function ChannelOwners() {
  return (
    <section className="bg-white pb-20 sm:pb-24">
      <Container>
        <div className="grid items-center gap-10 overflow-hidden rounded-[32px] border border-line bg-mist p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-4">
            <p className="text-[15px] font-semibold text-brand">For channel owners</p>
            <h2 className="text-[30px] font-bold leading-tight tracking-[-0.03em] sm:text-[38px]">Own a Telegram channel? Earn from advertisers who fit your audience</h2>
            <p className="text-lg text-muted">List your channel, set your prices and approve every ad before it’s published. We bring the advertisers and handle payments.</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <ButtonLink href="/register?type=channel-owner">List your channel</ButtonLink>
              <ButtonLink href="/help#channel-owners" variant="secondary">How it works for owners</ButtonLink>
            </div>
          </div>
          <ul className="grid gap-3">
            {[
              { icon: BadgeCheck, t: 'Verified listing', d: 'Prove ownership once and get a verified badge.' },
              { icon: CalendarDays, t: 'Your calendar, your rules', d: 'Choose formats, prices and available slots.' },
              { icon: Wallet, t: 'Clear earnings', d: 'See every booking, commission and payout.' },
            ].map((x) => (
              <li key={x.t} className="flex items-start gap-4 rounded-2xl bg-white p-4">
                <span className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-tg-soft text-brand"><x.icon className="h-5 w-5" aria-hidden="true" /></span>
                <span><span className="block font-bold text-ink">{x.t}</span><span className="text-[15px] text-muted">{x.d}</span></span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
