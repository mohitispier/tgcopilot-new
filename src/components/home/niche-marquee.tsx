import { Bot, Building2, Coins, Gamepad2, GraduationCap, Landmark, Newspaper, Rocket, ShoppingBag, Smartphone, Sparkles, Store } from 'lucide-react';

const items = [
  { icon: Coins, label: 'Crypto & Web3' }, { icon: Landmark, label: 'Fintech' }, { icon: ShoppingBag, label: 'E-commerce' },
  { icon: Rocket, label: 'SaaS & startups' }, { icon: GraduationCap, label: 'EdTech' }, { icon: Gamepad2, label: 'Gaming' },
  { icon: Smartphone, label: 'Mobile apps' }, { icon: Bot, label: 'Bots & Mini Apps' }, { icon: Newspaper, label: 'Media & news' },
  { icon: Building2, label: 'B2B services' }, { icon: Store, label: 'Local business' }, { icon: Sparkles, label: 'Creators & communities' },
];

export function NicheMarquee() {
  return (
    <section aria-label="Industries we advertise for" className="relative border-y border-line bg-white py-7">
      <p className="mb-5 text-center text-sm font-semibold text-muted">Telegram campaigns for every kind of business</p>
      <div className="marquee relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <ul className="marquee-track flex w-max gap-4">
          {[...items, ...items].map((it, i) => (
            <li key={i} aria-hidden={i >= items.length} className="flex items-center gap-2.5 rounded-full border border-line bg-mist px-5 py-2.5 text-[15px] font-semibold text-ink-2">
              <it.icon className="h-[18px] w-[18px] text-brand" aria-hidden="true" />{it.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
