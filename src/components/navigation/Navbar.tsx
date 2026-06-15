'use client';

import { Sun, Moon, BookOpen, GraduationCap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
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

const SECTION_COLORS: Record<CPASection, string> = {
  FAR: '#2563eb',
  AUD: '#7c3aed',
  REG: '#059669',
  BAR: '#d97706',
  TCP: '#dc2626',
  ISC: '#0891b2',
};

export default function Navbar() {
  const { activeTab, setActiveTab, activeSection, setActiveSection, isDarkMode, toggleDarkMode } = useAppStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      {/* Top bar: branding + section switcher + mode toggle */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900">
            <GraduationCap size={16} className="text-white" />
          </div>
          <div>
            <span className="text-sm font-bold text-slate-900 tracking-tight">CPA</span>
            <span className="text-sm font-light text-slate-500 ml-1">Exam Prep</span>
          </div>
        </div>

        {/* Section Switcher */}
        <nav className="flex items-center gap-1">
          {SECTIONS.map((section) => {
            const isActive = activeSection === section;
            return (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all duration-150 ${
                  isActive
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                }`}
                style={isActive ? {} : {}}
              >
                {section}
              </button>
            );
          })}
        </nav>

        {/* Right side: dark mode toggle */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400 font-medium">Powered by AI</span>
          <button
            onClick={toggleDarkMode}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-slate-600 transition-all duration-150"
            style={{
              backgroundColor: 'rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.08)',
            }}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun size={13} /> : <Moon size={13} />}
            <span>{isDarkMode ? 'Light' : 'Dark'}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-0.5 px-6 py-2 overflow-x-auto no-scrollbar">
        {NAV_TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-all duration-150 whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
