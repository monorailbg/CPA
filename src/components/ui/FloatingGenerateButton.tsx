'use client';

import { Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';

export default function FloatingGenerateButton() {
  const { openGenerateModal } = useAppStore();
  const t = useTheme();

  return (
    <button
      onClick={openGenerateModal}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200"
      style={{
        backgroundColor: t.isDark ? '#22d3ee' : '#0f172a',
        color: t.isDark ? '#020617' : '#ffffff',
        boxShadow: t.isDark
          ? '0 0 30px rgba(34,211,238,0.45), 0 8px 24px rgba(0,0,0,0.4)'
          : '0 8px 24px rgba(15,23,42,0.25)',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = t.isDark
          ? '0 0 40px rgba(34,211,238,0.6), 0 12px 32px rgba(0,0,0,0.5)'
          : '0 12px 32px rgba(15,23,42,0.35)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLButtonElement).style.boxShadow = t.isDark
          ? '0 0 30px rgba(34,211,238,0.45), 0 8px 24px rgba(0,0,0,0.4)'
          : '0 8px 24px rgba(15,23,42,0.25)';
      }}
    >
      <Sparkles
        size={16}
        style={{ filter: t.isDark ? 'drop-shadow(0 0 4px rgba(2,6,23,0.8))' : 'none' }}
      />
      <span>Generate</span>
    </button>
  );
}
