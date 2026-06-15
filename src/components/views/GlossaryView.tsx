'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronRight, Hash } from 'lucide-react';
import { useTheme } from '@/lib/useTheme';
import { glossaryTerms } from '@/data/cpaDatabase';
import { GlossaryTerm } from '@/lib/types';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getSectionToken(section: string, t: ReturnType<typeof useTheme>) {
  const map: Record<string, typeof t.mcq> = {
    FAR: t.mcq,
    AUD: t.glossary,
    REG: t.notes,
    BAR: t.tbs,
    TCP: { bg: t.isDark ? 'rgba(248,113,113,0.1)' : '#fff1f2', border: t.isDark ? '#f87171' : '#fecdd3', text: t.isDark ? '#f87171' : '#be123c' },
    ISC: t.flash,
  };
  return map[section] || t.mcq;
}

export default function GlossaryView() {
  const t = useTheme();
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const filtered = useMemo(() => {
    let terms = [...glossaryTerms];
    if (search) {
      const q = search.toLowerCase();
      terms = terms.filter((t) => t.term.toLowerCase().includes(q) || t.definition.toLowerCase().includes(q) || t.category.toLowerCase().includes(q));
    }
    if (selectedLetter) terms = terms.filter((t) => t.term.toUpperCase().startsWith(selectedLetter));
    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, selectedLetter]);

  const activeColors = selectedTerm ? getSectionToken(selectedTerm.section, t) : null;

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 88px)' }}>
      {/* Left panel */}
      <div
        className="w-72 flex-shrink-0 flex flex-col overflow-hidden"
        style={{ backgroundColor: t.sidebarBg, borderRight: `1px solid ${t.sidebarBorder}` }}
      >
        {/* Search */}
        <div className="p-4" style={{ borderBottom: `1px solid ${t.divider}` }}>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} style={{ color: t.isDark ? '#a78bfa' : '#6b21a8' }} />
            <h2 className="text-sm font-semibold" style={{ color: t.textPrimary }}>IRC & AICPA Dictionary</h2>
          </div>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: t.textTertiary }} />
            <input
              type="text"
              placeholder="Search terms…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelectedLetter(null); }}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg transition-colors"
              style={{ backgroundColor: t.inputBg, border: `1px solid ${t.inputBorder}`, color: t.inputText }}
            />
          </div>
        </div>

        {/* Alphabet filter */}
        <div className="px-4 py-3" style={{ borderBottom: `1px solid ${t.divider}` }}>
          <div className="flex flex-wrap gap-1">
            {ALPHABET.map((letter) => {
              const hasTerms = glossaryTerms.some((term) => term.term.toUpperCase().startsWith(letter));
              const isActive = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => { setSelectedLetter(isActive ? null : letter); setSearch(''); }}
                  disabled={!hasTerms}
                  className="w-6 h-6 rounded text-xs font-medium transition-all duration-100"
                  style={
                    isActive
                      ? { backgroundColor: t.isDark ? '#a78bfa' : '#0f172a', color: t.isDark ? '#020617' : '#ffffff', boxShadow: t.isDark ? '0 0 8px rgba(167,139,250,0.5)' : 'none' }
                      : hasTerms
                      ? { color: t.textSecondary }
                      : { color: t.isDark ? '#1e293b' : '#e2e8f0', cursor: 'not-allowed' }
                  }
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <div className="px-4 py-2" style={{ borderBottom: `1px solid ${t.divider}` }}>
          <span className="text-xs" style={{ color: t.textTertiary }}>{filtered.length} term{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Terms list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <Hash size={20} className="mx-auto mb-2" style={{ color: t.textTertiary }} />
              <p className="text-xs" style={{ color: t.textTertiary }}>No matching terms</p>
            </div>
          ) : (
            filtered.map((term) => {
              const isSelected = selectedTerm?.id === term.id;
              const colors = getSectionToken(term.section, t);
              return (
                <button
                  key={term.id}
                  onClick={() => setSelectedTerm(term)}
                  className="w-full text-left p-3 rounded-xl transition-all duration-150 border"
                  style={{
                    backgroundColor: isSelected ? (t.isDark ? '#1e293b' : '#0f172a') : t.card,
                    borderColor: isSelected ? (t.isDark ? '#334155' : 'transparent') : t.cardBorder,
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: isSelected ? (t.isDark ? '#ffffff' : '#ffffff') : t.textPrimary }}>
                        {term.term}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className="text-xs px-1.5 py-0.5 rounded-md"
                          style={
                            isSelected
                              ? { backgroundColor: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.4)' }
                              : { backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }
                          }
                        >
                          {term.section}
                        </span>
                        <span className="text-xs truncate" style={{ color: isSelected ? (t.isDark ? '#64748b' : 'rgba(255,255,255,0.4)') : t.textTertiary }}>
                          {term.category}
                        </span>
                      </div>
                    </div>
                    <ChevronRight size={12} style={{ color: isSelected ? (t.isDark ? '#64748b' : '#94a3b8') : t.textTertiary }} />
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6" style={{ backgroundColor: t.canvas }}>
        {selectedTerm && activeColors ? (
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs mb-4" style={{ color: t.textTertiary }}>
              <BookOpen size={12} />
              <span>Dictionary</span>
              <ChevronRight size={12} />
              <span>{selectedTerm.section}</span>
              <ChevronRight size={12} />
              <span>{selectedTerm.category}</span>
            </div>

            {/* Term card */}
            <div
              className="rounded-2xl p-6 mb-4"
              style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-2xl font-bold" style={{ color: t.textPrimary }}>{selectedTerm.term}</h1>
                <span
                  className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg"
                  style={{ backgroundColor: activeColors.bg, color: activeColors.text, border: `1px solid ${activeColors.border}`, boxShadow: t.isDark ? `0 0 8px ${activeColors.border}40` : 'none' }}
                >
                  {selectedTerm.section}
                </span>
              </div>

              <span
                className="text-xs font-medium px-2.5 py-1 rounded-lg inline-block mb-4"
                style={{ backgroundColor: t.isDark ? '#0f172a' : '#f8fafc', color: t.textTertiary, border: `1px solid ${t.divider}` }}
              >
                {selectedTerm.category}
              </span>

              <p className="text-sm leading-relaxed" style={{ color: t.textSecondary }}>{selectedTerm.definition}</p>
            </div>

            {/* Related terms */}
            {selectedTerm.relatedTerms.length > 0 && (
              <div
                className="rounded-2xl p-5"
                style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
              >
                <h2 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.textTertiary }}>Related Terms</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedTerm.relatedTerms.map((related) => {
                    const relTerm = glossaryTerms.find((term) => term.term === related);
                    return (
                      <button
                        key={related}
                        onClick={() => relTerm && setSelectedTerm(relTerm)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-all hover:-translate-y-px"
                        style={{
                          backgroundColor: t.glossary.bg,
                          color: t.glossary.text,
                          border: `1px solid ${t.glossary.border}`,
                          boxShadow: t.isDark ? `0 0 6px ${t.glossary.border}30` : 'none',
                        }}
                      >
                        {related}
                        {relTerm && <ChevronRight size={10} className="inline ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
              style={{
                backgroundColor: t.glossary.bg,
                border: `2px solid ${t.glossary.border}`,
                boxShadow: t.isDark ? `0 0 20px ${t.glossary.border}30` : 'none',
              }}
            >
              <BookOpen size={24} style={{ color: t.glossary.text }} />
            </div>
            <h2 className="text-base font-semibold" style={{ color: t.textPrimary }}>IRC & AICPA Glossary</h2>
            <p className="text-sm mt-1 max-w-sm" style={{ color: t.textTertiary }}>
              Select a term to view its definition and related concepts.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
              {['FAR', 'AUD', 'REG', 'BAR'].map((s) => {
                const c = getSectionToken(s, t);
                const count = glossaryTerms.filter((term) => term.section === s).length;
                return (
                  <div
                    key={s}
                    className="rounded-xl p-3 text-center border"
                    style={{ backgroundColor: c.bg, borderColor: c.border, boxShadow: t.isDark ? `0 0 8px ${c.border}20` : 'none' }}
                  >
                    <p className="text-sm font-bold" style={{ color: c.text, textShadow: t.isDark ? `0 0 8px ${c.text}60` : 'none' }}>{s}</p>
                    <p className="text-xs mt-0.5" style={{ color: c.text, opacity: 0.7 }}>{count} terms</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
