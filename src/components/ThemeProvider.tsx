'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/appStore';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const isDarkMode = useAppStore((s) => s.isDarkMode);

  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    if (isDarkMode) {
      html.classList.add('dark');
      body.style.backgroundColor = '#020617';
    } else {
      html.classList.remove('dark');
      body.style.backgroundColor = '#fdfbf7';
    }
  }, [isDarkMode]);

  return <>{children}</>;
}
