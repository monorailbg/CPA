'use client';

import { Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

export default function FloatingGenerateButton() {
  const { openGenerateModal } = useAppStore();

  return (
    <button
      onClick={openGenerateModal}
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-5 py-3 rounded-2xl text-white text-sm font-semibold shadow-[0_8px_24px_rgba(15,23,42,0.25)] hover:shadow-[0_12px_32px_rgba(15,23,42,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
      style={{ backgroundColor: '#0f172a' }}
    >
      <Sparkles size={16} />
      <span>Generate</span>
    </button>
  );
}
