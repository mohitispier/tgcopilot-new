import {
  ChartColumn, Compass, Layers, Megaphone, PenLine, Puzzle, Radar, Search, Sparkles, Store, Target, Users,
  type LucideProps,
} from 'lucide-react';
import type { IconName } from '@/data/services';

const map = {
  target: Target, megaphone: Megaphone, users: Users, pen: PenLine, search: Search, layers: Layers,
  chart: ChartColumn, compass: Compass, puzzle: Puzzle, sparkles: Sparkles, store: Store, radar: Radar,
} satisfies Record<IconName, React.ComponentType<LucideProps>>;

export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const C = map[name];
  return <C aria-hidden="true" {...props} />;
}
