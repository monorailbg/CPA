import { useAppStore } from '@/store/appStore';

export interface ThemeTokens {
  isDark: boolean;
  // Canvas & structure
  canvas: string;
  card: string;
  cardBorder: string;
  cardShadow: string;
  cardHoverShadow: string;
  cardHoverBorder: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  // Nav
  navBg: string;
  navBorder: string;
  navSubBorder: string;
  navActiveBg: string;
  navActiveText: string;
  navInactiveText: string;
  navInactiveHover: string;
  // Sidebar
  sidebarBg: string;
  sidebarBorder: string;
  sidebarActiveBg: string;
  sidebarActiveText: string;
  sidebarHoverBg: string;
  // Inputs
  inputBg: string;
  inputBorder: string;
  inputText: string;
  inputPlaceholder: string;
  // Surfaces
  surface: string;
  surfaceBorder: string;
  surfaceHover: string;
  divider: string;
  muted: string;
  mutedBorder: string;
  // Badge / chip
  chip: string;
  chipBorder: string;
  chipText: string;
  // Categorical neon tokens
  mcq: { bg: string; border: string; text: string };
  notes: { bg: string; border: string; text: string };
  flash: { bg: string; border: string; text: string };
  tbs: { bg: string; border: string; text: string };
  glossary: { bg: string; border: string; text: string };
}

export function useTheme(): ThemeTokens {
  const isDark = useAppStore((s) => s.isDarkMode);

  if (isDark) {
    return {
      isDark: true,
      canvas: '#020617',
      card: '#1e293b',
      cardBorder: '#334155',
      cardShadow: 'none',
      cardHoverShadow: '0 0 20px rgba(37, 99, 235, 0.18)',
      cardHoverBorder: '#60a5fa',
      textPrimary: '#ffffff',
      textSecondary: '#cbd5e1',
      textTertiary: '#64748b',
      navBg: 'rgba(2, 6, 23, 0.97)',
      navBorder: '#1e293b',
      navSubBorder: '#1e293b',
      navActiveBg: '#ffffff',
      navActiveText: '#0f172a',
      navInactiveText: '#94a3b8',
      navInactiveHover: '#1e293b',
      sidebarBg: '#0f172a',
      sidebarBorder: '#1e293b',
      sidebarActiveBg: '#1e293b',
      sidebarActiveText: '#ffffff',
      sidebarHoverBg: '#1e293b',
      inputBg: '#0f172a',
      inputBorder: '#334155',
      inputText: '#e2e8f0',
      inputPlaceholder: '#475569',
      surface: '#0f172a',
      surfaceBorder: '#1e293b',
      surfaceHover: '#1e293b',
      divider: '#1e293b',
      muted: '#0f172a',
      mutedBorder: '#1e293b',
      chip: '#1e293b',
      chipBorder: '#334155',
      chipText: '#94a3b8',
      mcq: { bg: 'rgba(6,182,212,0.1)', border: '#22d3ee', text: '#22d3ee' },
      notes: { bg: 'rgba(16,185,129,0.1)', border: '#34d399', text: '#34d399' },
      flash: { bg: 'rgba(59,130,246,0.1)', border: '#60a5fa', text: '#60a5fa' },
      tbs: { bg: 'rgba(245,158,11,0.1)', border: '#fbbf24', text: '#fbbf24' },
      glossary: { bg: 'rgba(139,92,246,0.1)', border: '#a78bfa', text: '#a78bfa' },
    };
  }

  return {
    isDark: false,
    canvas: '#faf8f5',
    card: '#ffffff',
    cardBorder: '#eaddcd',
    cardShadow: 'none',
    cardHoverShadow: '0 2px 8px rgba(120, 95, 60, 0.06)',
    cardHoverBorder: '#d9c7ad',
    textPrimary: '#2b2622',
    textSecondary: '#6b6258',
    textTertiary: '#a39a8c',
    navBg: 'rgba(250,248,245,0.95)',
    navBorder: '#eaddcd',
    navSubBorder: '#f1ebe2',
    navActiveBg: '#2b2622',
    navActiveText: '#faf8f5',
    navInactiveText: '#8a8073',
    navInactiveHover: '#f4ecdf',
    sidebarBg: '#ffffff',
    sidebarBorder: '#eaddcd',
    sidebarActiveBg: '#f4ecdf',
    sidebarActiveText: '#2b2622',
    sidebarHoverBg: '#faf6ef',
    inputBg: '#faf8f5',
    inputBorder: '#eaddcd',
    inputText: '#3d362e',
    inputPlaceholder: '#a39a8c',
    surface: '#f4f1ea',
    surfaceBorder: '#eaddcd',
    surfaceHover: '#f4ecdf',
    divider: '#f1ebe2',
    muted: '#f4f1ea',
    mutedBorder: '#eaddcd',
    chip: '#f4ecdf',
    chipBorder: '#eaddcd',
    chipText: '#8a8073',
    mcq: { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
    notes: { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
    flash: { bg: '#eef2ff', border: '#c7d2fe', text: '#4338ca' },
    tbs: { bg: '#fffbeb', border: '#fde68a', text: '#b45309' },
    glossary: { bg: '#faf5ff', border: '#e9d5ff', text: '#6b21a8' },
  };
}
