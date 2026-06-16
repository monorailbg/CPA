'use client';

import { Sun, Moon, GraduationCap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { WorkspaceTab, CPASection } from '@/lib/types';

const NAV_TABS: { id: WorkspaceTab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'mindmap', label: 'Mind Map' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'notes', label: 'Notes' },
  { id: 'quiz', label: 'Quiz' },
  { id: 'glossary', label: 'Glossary' },
  { id: 'graph', label: 'Knowledge Graph' },
  { id: 'blindspot', label: 'Blind Spots' },
];

const SECTIONS: CPASection[] = ['FAR', 'AUD', 'REG', 'BAR', 'TCP', 'ISC'];

const SECTION_ACCENT: Record<CPASection, string> = {
  FAR: '#22d3ee',
  AUD: '#a78bfa',
  REG: '#34d399',
  BAR: '#fbbf24',
  TCP: '#f87171',
  ISC: '#60a5fa',
};

export default function Navbar() {
  const { activeTab, setActiveTab, activeSection, setActiveSection, isDarkMode, toggleDarkMode } = useAppStore();
  const t = useTheme();

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md"
      style={{ backgroundColor: t.navBg, borderBottom: `1px solid ${t.navBorder}` }}
    >
      {/* Top row */}
      <div
        className="flex items-center justify-between px-6 py-3"
        style={{ borderBottom: `1px solid ${t.navSubBorder}` }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center w-8 h-8 rounded-lg"
            style={{
              backgroundColor: t.isDark ? '#22d3ee' : '#0f172a',
              boxShadow: t.isDark ? '0 0 12px rgba(34,211,238,0.4)' : 'none',
            }}
          >
            <GraduationCap size={16} style={{ color: t.isDark ? '#020617' : '#ffffff' }} />
          </div>
          <div>
            <span className="text-sm font-bold tracking-tight" style={{ color: t.textPrimary }}>CPA</span>
            <span className="text-sm font-light ml-1" style={{ color: t.textTertiary }}>Exam Prep</span>
          </div>
        </div>

        {/* Section switcher */}
        <nav className="flex items-center gap-1">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section;
            const accent = SECTION_ACCENT[section];
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className="px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-150"
                style={
                  isActive
                    ? t.isDark
                      ? { backgroundColor: accent + '20', color: accent, border: `1px solid ${accent}`, boxShadow: `0 0 8px ${accent}30` }
                      : { backgroundColor: t.navActiveBg, color: t.navActiveText, border: '1px solid transparent' }
                    : {
                        color: t.navInactiveText,
                        border: '1px solid transparent',
                      }
                }
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.navInactiveHover;
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                }}
              >
                {section}
              </button>
            );
          })}
        </nav>

        {/* Mode toggle */}
        <div className="flex items-center gap-3">
          {t.isDark && (
            <span className="text-xs font-medium" style={{ color: '#22d3ee' }}>
              Cyber-Obsidian
            </span>
          )}
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={
              t.isDark
                ? {
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    color: '#94a3b8',
                  }
                : {
                    backgroundColor: 'rgba(0,0,0,0.05)',
                    border: '1px solid rgba(0,0,0,0.08)',
                    color: '#475569',
                  }
            }
          >
            {t.isDark
              ? <Sun size={13} style={{ color: '#fbbf24' }} />
              : <Moon size={13} />
            }
            <span>{t.isDark ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* Tab row */}
      <div className="flex items-center gap-0.5 px-6 py-2 overflow-x-auto no-scrollbar">
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-150 whitespace-nowrap"
              style={
                isActive
                  ? {
                      backgroundColor: t.navActiveBg,
                      color: t.navActiveText,
                      boxShadow: t.isDark ? '0 0 10px rgba(255,255,255,0.08)' : 'none',
                    }
                  : {
                      color: t.navInactiveText,
                    }
              }
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.navInactiveHover;
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
