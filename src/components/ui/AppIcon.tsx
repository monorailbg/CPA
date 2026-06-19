// CPA Review brand mark — an open "C" ring with a checkmark rising from its
// aperture. Colors: Pine #0F7A6B, Honey #FFC24C, Ink #16221F.
// Source: design handoff "CPA Icon v2.dc.html".

export type AppIconVariant = 'primary' | 'ink' | 'honey' | 'light' | 'mono';

const VARIANTS: Record<AppIconVariant, { bg: string; ring: string; tick: string; bgStroke?: string }> = {
  primary: { bg: '#0F7A6B', ring: '#ffffff', tick: '#FFC24C' },
  ink: { bg: '#16221F', ring: '#ffffff', tick: '#4FD7B6' },
  honey: { bg: '#FFC24C', ring: '#16221F', tick: '#0F7A6B' },
  light: { bg: '#F4F2EB', ring: '#0F7A6B', tick: '#16221F', bgStroke: '#E3E1D7' },
  mono: { bg: '#0F7A6B', ring: '#ffffff', tick: '#ffffff' },
};

interface AppIconProps {
  size?: number;
  variant?: AppIconVariant;
  rounded?: boolean;
  className?: string;
}

export default function AppIcon({ size = 32, variant = 'primary', rounded = true, className }: AppIconProps) {
  const { bg, ring, tick, bgStroke } = VARIANTS[variant];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect width="100" height="100" rx={rounded ? 23 : 0} fill={bg} stroke={bgStroke} strokeWidth={bgStroke ? 1 : 0} />
      <path d="M 73.3 34.2 A 29 29 0 1 0 73.3 65.8" fill="none" stroke={ring} strokeWidth="12" strokeLinecap="round" />
      <path d="M 65 50 L 71 57 L 86 39" fill="none" stroke={tick} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
