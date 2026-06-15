'use client';

import { useState, useMemo } from 'react';
import { Search, BookOpen, ChevronRight, Hash } from 'lucide-react';
import { glossaryTerms } from '@/data/cpaDatabase';
import { GlossaryTerm } from '@/lib/types';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const SECTION_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  FAR: { bg: '#eff6ff', border: '#bfdbfe', text: '#1d4ed8' },
  AUD: { bg: '#faf5ff', border: '#e9d5ff', text: '#6b21a8' },
  REG: { bg: '#f0fdf4', border: '#bbf7d0', text: '#15803d' },
  BAR: { bg: '#fffbeb', border: '#fde68a', text: '#b45309' },
  TCP: { bg: '#fff1f2', border: '#fecdd3', text: '#be123c' },
  ISC: { bg: '#ecfeff', border: '#a5f3fc', text: '#0e7490' },
};

function TermCard({ term, isSelected, onClick }: {
  term: GlossaryTerm;
  isSelected: boolean;
  onClick: () => void;
}) {
  const colors = SECTION_COLORS[term.section] || SECTION_COLORS.FAR;

  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-3 rounded-xl transition-all duration-150 border ${
        isSelected
          ? 'bg-slate-900 border-slate-900'
          : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>
            {term.term}
          </p>
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className="text-xs px-1.5 py-0.5 rounded-md"
              style={isSelected ? { backgroundColor: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.7)' } : { backgroundColor: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
            >
              {term.section}
            </span>
            <span className={`text-xs truncate ${isSelected ? 'text-slate-400' : 'text-slate-400'}`}>
              {term.category}
            </span>
          </div>
        </div>
        <ChevronRight size={12} className={isSelected ? 'text-slate-400' : 'text-slate-300'} />
      </div>
    </button>
  );
}

export default function GlossaryView() {
  const [search, setSearch] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);

  const filtered = useMemo(() => {
    let terms = [...glossaryTerms];
    if (search) {
      const q = search.toLowerCase();
      terms = terms.filter(
        (t) =>
          t.term.toLowerCase().includes(q) ||
          t.definition.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    if (selectedLetter) {
      terms = terms.filter((t) => t.term.toUpperCase().startsWith(selectedLetter));
    }
    return terms.sort((a, b) => a.term.localeCompare(b.term));
  }, [search, selectedLetter]);

  const activeLetter = selectedTerm?.term[0].toUpperCase();
  const activeColors = selectedTerm ? SECTION_COLORS[selectedTerm.section] || SECTION_COLORS.FAR : null;

  return (
    <div className="flex h-full" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* Left sidebar */}
      <div className="w-72 flex-shrink-0 border-r border-slate-200 bg-white flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-slate-100">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen size={14} className="text-slate-400" />
            <h2 className="text-sm font-semibold text-slate-800">IRC & AICPA Dictionary</h2>
          </div>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search terms…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setSelectedLetter(null); }}
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* Alphabet filter */}
        <div className="px-4 py-3 border-b border-slate-100">
          <div className="flex flex-wrap gap-1">
            {ALPHABET.map((letter) => {
              const hasTerms = glossaryTerms.some((t) => t.term.toUpperCase().startsWith(letter));
              const isActive = selectedLetter === letter;
              return (
                <button
                  key={letter}
                  onClick={() => {
                    setSelectedLetter(isActive ? null : letter);
                    setSearch('');
                  }}
                  disabled={!hasTerms}
                  className={`w-6 h-6 rounded text-xs font-medium transition-all duration-100 ${
                    isActive
                      ? 'bg-slate-900 text-white'
                      : hasTerms
                      ? 'text-slate-600 hover:bg-slate-100'
                      : 'text-slate-200 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <div className="px-4 py-2 border-b border-slate-100">
          <span className="text-xs text-slate-400">{filtered.length} term{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {/* Terms list */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <Hash size={20} className="text-slate-200 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No matching terms</p>
            </div>
          ) : (
            filtered.map((term) => (
              <TermCard
                key={term.id}
                term={term}
                isSelected={selectedTerm?.id === term.id}
                onClick={() => setSelectedTerm(term)}
              />
            ))
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-[#fdfbf7] p-6">
        {selectedTerm ? (
          <div className="max-w-2xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
              <BookOpen size={12} />
              <span>Dictionary</span>
              <ChevronRight size={12} />
              <span>{selectedTerm.section}</span>
              <ChevronRight size={12} />
              <span>{selectedTerm.category}</span>
            </div>

            {/* Term header */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] mb-4">
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-2xl font-bold text-slate-900">{selectedTerm.term}</h1>
                {activeColors && (
                  <span
                    className="flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{ backgroundColor: activeColors.bg, color: activeColors.text, border: `1px solid ${activeColors.border}` }}
                  >
                    {selectedTerm.section}
                  </span>
                )}
              </div>

              <div
                className="text-xs font-medium px-2.5 py-1 rounded-lg inline-block mb-4"
                style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', color: '#64748b' }}
              >
                {selectedTerm.category}
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">{selectedTerm.definition}</p>
            </div>

            {/* Related terms */}
            {selectedTerm.relatedTerms.length > 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Related Terms</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedTerm.relatedTerms.map((related) => {
                    const relTerm = glossaryTerms.find((t) => t.term === related);
                    return (
                      <button
                        key={related}
                        onClick={() => relTerm && setSelectedTerm(relTerm)}
                        className="text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors hover:-translate-y-px"
                        style={{
                          backgroundColor: '#faf5ff',
                          color: '#6b21a8',
                          border: '1px solid #e9d5ff',
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
              style={{ backgroundColor: '#faf5ff', border: '2px solid #e9d5ff' }}
            >
              <BookOpen size={24} style={{ color: '#6b21a8' }} />
            </div>
            <h2 className="text-base font-semibold text-slate-700">IRC & AICPA Glossary</h2>
            <p className="text-sm text-slate-400 mt-1 max-w-sm">
              Select a term from the dictionary to view its definition and related concepts.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
              {['FAR', 'AUD', 'REG', 'BAR'].map((s) => {
                const c = SECTION_COLORS[s];
                const count = glossaryTerms.filter((t) => t.section === s).length;
                return (
                  <div
                    key={s}
                    className="rounded-xl p-3 text-center border"
                    style={{ backgroundColor: c.bg, borderColor: c.border }}
                  >
                    <p className="text-sm font-bold" style={{ color: c.text }}>{s}</p>
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
