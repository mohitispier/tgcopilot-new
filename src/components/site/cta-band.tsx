import { ClosingCta, type CtaProps } from '@/components/home/closing-cta';

/** Closing call-to-action used at the bottom of inner pages. Same design as the homepage CTA. */
export function CtaBand(props: CtaProps) {
  return <ClosingCta {...props} />;
}
