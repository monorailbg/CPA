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
      canvas: '#09090b',
      card: '#1c1c1e',
      cardBorder: '#2c2c2e',
      cardShadow: 'none',
      cardHoverShadow: 'none',
      cardHoverBorder: '#3a3a3c',
      textPrimary: '#f5f5f7',
      textSecondary: '#c7c7cc',
      textTertiary: '#8e8e93',
      navBg: 'rgba(9,9,11,0.97)',
      navBorder: '#2c2c2e',
      navSubBorder: '#2c2c2e',
      navActiveBg: '#f5f5f7',
      navActiveText: '#1c1c1e',
      navInactiveText: '#8e8e93',
      navInactiveHover: '#2c2c2e',
      sidebarBg: '#121214',
      sidebarBorder: '#2c2c2e',
      sidebarActiveBg: '#2c2c2e',
      sidebarActiveText: '#f5f5f7',
      sidebarHoverBg: '#1c1c1e',
      inputBg: '#121214',
      inputBorder: '#2c2c2e',
      inputText: '#e5e5e5',
      inputPlaceholder: '#636366',
      surface: '#121214',
      surfaceBorder: '#2c2c2e',
      surfaceHover: '#2c2c2e',
      divider: '#2c2c2e',
      muted: '#121214',
      mutedBorder: '#2c2c2e',
      chip: '#2c2c2e',
      chipBorder: '#3a3a3c',
      chipText: '#c7c7cc',
      mcq: { bg: 'rgba(125,154,168,0.12)', border: '#5d7a8a', text: '#9cc0d1' },
      notes: { bg: 'rgba(127,168,132,0.12)', border: '#5a7a5e', text: '#a3d1ab' },
      flash: { bg: 'rgba(130,138,176,0.12)', border: '#5d637f', text: '#a7afd9' },
      tbs: { bg: 'rgba(189,160,110,0.12)', border: '#8a754f', text: '#d9bd8a' },
      glossary: { bg: 'rgba(168,130,184,0.12)', border: '#7a5d85', text: '#d1a7dd' },
    };
  }

  return {
    isDark: false,
    canvas: '#f4f4f2',
    card: '#ffffff',
    cardBorder: '#e5e5e0',
    cardShadow: 'none',
    cardHoverShadow: 'none',
    cardHoverBorder: '#d4d4ce',
    textPrimary: '#1c1c1e',
    textSecondary: '#6b6b68',
    textTertiary: '#9a9a95',
    navBg: 'rgba(244,244,242,0.95)',
    navBorder: '#e5e5e0',
    navSubBorder: '#ececea',
    navActiveBg: '#1c1c1e',
    navActiveText: '#f4f4f2',
    navInactiveText: '#8a8a85',
    navInactiveHover: '#ececea',
    sidebarBg: '#ffffff',
    sidebarBorder: '#e5e5e0',
    sidebarActiveBg: '#ececea',
    sidebarActiveText: '#1c1c1e',
    sidebarHoverBg: '#f4f4f2',
    inputBg: '#f4f4f2',
    inputBorder: '#e5e5e0',
    inputText: '#1c1c1e',
    inputPlaceholder: '#9a9a95',
    surface: '#f4f4f2',
    surfaceBorder: '#e5e5e0',
    surfaceHover: '#ececea',
    divider: '#ececea',
    muted: '#f4f4f2',
    mutedBorder: '#e5e5e0',
    chip: '#ececea',
    chipBorder: '#e5e5e0',
    chipText: '#6b6b68',
    mcq: { bg: '#eef2f5', border: '#c9d6dd', text: '#44697d' },
    notes: { bg: '#eef3ee', border: '#c9dcc9', text: '#4f7a55' },
    flash: { bg: '#eef0f5', border: '#c9cfe0', text: '#51618c' },
    tbs: { bg: '#f5f0e8', border: '#ddd0bb', text: '#8a6a3f' },
    glossary: { bg: '#f2eef5', border: '#d9c9e0', text: '#7a5188' },
  };
}
