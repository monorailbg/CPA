'use client';

import { X, Sparkles, Zap, Clock, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { GenerateContentType, StudyMode, Difficulty } from '@/lib/types';
import { cpaDatabase } from '@/data/cpaDatabase';

const CONTENT_TYPES: { id: GenerateContentType; label: string; desc: string; tokenKey: 'mcq' | 'flash' | 'tbs' | 'notes' | 'glossary' }[] = [
  { id: 'mcq', label: 'MCQs', desc: 'Multiple-choice questions', tokenKey: 'mcq' },
  { id: 'flashcards', label: 'Flashcards', desc: 'Spaced repetition cards', tokenKey: 'flash' },
  { id: 'tbs', label: 'Simulations', desc: 'Task-based simulations', tokenKey: 'tbs' },
  { id: 'notes', label: 'Notes', desc: 'Visual concept summaries', tokenKey: 'notes' },
  { id: 'glossary', label: 'Glossary', desc: 'IRC & AICPA definitions', tokenKey: 'glossary' },
];

const DIFFICULTIES: { id: Difficulty; label: string; desc: string }[] = [
  { id: 'easy', label: 'Easy', desc: 'Foundation' },
  { id: 'medium', label: 'Medium', desc: 'Core level' },
  { id: 'hard', label: 'Hard', desc: 'Advanced' },
  { id: 'adaptive', label: 'Adaptive', desc: 'AI-selected' },
];

export default function GenerateModal() {
  const {
    showGenerateModal, closeGenerateModal, generateConfig,
    toggleContentType, setMode, setDifficulty, setQuestionCount,
    toggleFocusBlindSpots, toggleTimedSession, setTimeLimit, activeSection,
  } = useAppStore();
  const t = useTheme();
  const units = cpaDatabase[activeSection] || [];

  if (!showGenerateModal) return null;

  const accentColor = t.isDark ? '#22d3ee' : '#0f172a';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 backdrop-blur-sm"
        style={{ backgroundColor: t.isDark ? 'rgba(2,6,23,0.75)' : 'rgba(15,23,42,0.3)' }}
        onClick={closeGenerateModal}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: t.isDark ? '#0f172a' : '#ffffff',
          border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}`,
          boxShadow: t.isDark
            ? '0 0 60px rgba(34,211,238,0.08), 0 20px 60px rgba(0,0,0,0.5)'
            : '0 20px 60px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 py-4"
          style={{ borderBottom: `1px solid ${t.divider}` }}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="p-1.5 rounded-lg"
              style={{
                backgroundColor: t.isDark ? '#1e293b' : '#0f172a',
                border: t.isDark ? '1px solid #334155' : 'none',
                boxShadow: t.isDark ? '0 0 10px rgba(34,211,238,0.2)' : 'none',
              }}
            >
              <Sparkles size={14} style={{ color: t.isDark ? '#22d3ee' : '#ffffff' }} />
            </div>
            <div>
              <h2 className="text-sm font-bold" style={{ color: t.textPrimary }}>AI Generation Panel</h2>
              <p className="text-xs" style={{ color: t.textTertiary }}>Configure your study session</p>
            </div>
          </div>
          <button
            onClick={closeGenerateModal}
            className="p-1.5 rounded-lg transition-colors"
            style={{ color: t.textTertiary, backgroundColor: 'transparent' }}
            onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.isDark ? '#1e293b' : '#f1f5f9'}
            onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'}
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Content type pills */}
          <section>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.textTertiary }}>
              Content Type
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CONTENT_TYPES.map((type) => {
                const isActive = generateConfig.contentTypes.includes(type.id);
                const tok = t[type.tokenKey];
                return (
                  <button
                    key={type.id}
                    onClick={() => toggleContentType(type.id)}
                    className="flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? tok.bg : (t.isDark ? '#1e293b' : '#ffffff'),
                      borderColor: isActive ? tok.border : (t.isDark ? '#334155' : '#e2e8f0'),
                      boxShadow: isActive && t.isDark ? `0 0 10px ${tok.border}30` : 'none',
                    }}
                  >
                    <span className="text-xs font-bold" style={{ color: isActive ? tok.text : t.textSecondary, textShadow: isActive && t.isDark ? `0 0 6px ${tok.text}60` : 'none' }}>
                      {type.label}
                    </span>
                    <span className="text-xs mt-0.5 leading-tight" style={{ color: isActive ? tok.text : t.textTertiary, opacity: 0.75 }}>
                      {type.desc}
                    </span>
                    {isActive && (
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2"
                        style={{ backgroundColor: tok.text, boxShadow: t.isDark ? `0 0 4px ${tok.text}` : 'none' }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Mode toggle */}
          <section>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.textTertiary }}>
              Mode
            </label>
            <div
              className="flex gap-2 p-1 rounded-xl"
              style={{ backgroundColor: t.isDark ? '#1e293b' : '#f1f5f9' }}
            >
              {(['study', 'exam'] as StudyMode[]).map((mode) => {
                const isActive = generateConfig.mode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setMode(mode)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
                    style={
                      isActive
                        ? t.isDark
                          ? { backgroundColor: '#0f172a', color: '#22d3ee', border: '2px solid #22d3ee', boxShadow: '0 0 10px rgba(34,211,238,0.2)' }
                          : { backgroundColor: '#ffffff', color: '#0f172a', border: '2px solid #0f172a' }
                        : { backgroundColor: 'transparent', color: t.textTertiary, border: '2px solid transparent' }
                    }
                  >
                    {mode === 'study' ? 'Study Mode' : 'Exam Simulator'}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Difficulty */}
          <section>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.textTertiary }}>
              Difficulty
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {DIFFICULTIES.map((diff) => {
                const isActive = generateConfig.difficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => setDifficulty(diff.id)}
                    className="py-2.5 px-2 rounded-xl text-center transition-all duration-150"
                    style={
                      isActive
                        ? t.isDark
                          ? { backgroundColor: '#0f172a', color: '#22d3ee', border: '2px solid #22d3ee', boxShadow: '0 0 10px rgba(34,211,238,0.2)' }
                          : { backgroundColor: '#0f172a', color: '#ffffff', border: '2px solid #0f172a' }
                        : {
                            backgroundColor: t.isDark ? '#1e293b' : '#ffffff',
                            color: t.textTertiary,
                            border: `2px solid ${t.isDark ? '#334155' : '#e2e8f0'}`,
                          }
                    }
                  >
                    <span className="text-xs font-semibold block">{diff.label}</span>
                    <span className="text-xs opacity-60 block mt-0.5 leading-tight">{diff.desc}</span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Question count slider */}
          {(generateConfig.contentTypes.includes('mcq') || generateConfig.contentTypes.includes('tbs')) && (
            <section>
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: t.textTertiary }}>
                  Questions per Session
                </label>
                <span
                  className="text-sm font-bold"
                  style={{ color: t.isDark ? '#22d3ee' : '#0f172a', textShadow: t.isDark ? '0 0 6px rgba(34,211,238,0.5)' : 'none' }}
                >
                  {generateConfig.questionCount}
                </span>
              </div>
              <input
                type="range" min={5} max={100} step={5}
                value={generateConfig.questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: t.isDark
                    ? `linear-gradient(to right, #22d3ee ${((generateConfig.questionCount - 5) / 95) * 100}%, #1e293b ${((generateConfig.questionCount - 5) / 95) * 100}%)`
                    : `linear-gradient(to right, #0f172a ${((generateConfig.questionCount - 5) / 95) * 100}%, #e2e8f0 ${((generateConfig.questionCount - 5) / 95) * 100}%)`,
                }}
              />
              <div className="flex justify-between text-xs mt-1" style={{ color: t.textTertiary }}>
                <span>5</span><span>100</span>
              </div>
            </section>
          )}

          {/* Toggles */}
          <section>
            <label className="block text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.textTertiary }}>
              Session Options
            </label>
            <div className="space-y-3">
              {/* Focus blind spots */}
              <div
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ backgroundColor: t.isDark ? '#1e293b' : '#f8fafc', border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}` }}
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={13} style={{ color: t.isDark ? '#fbbf24' : '#f59e0b' }} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: t.textPrimary }}>Focus on Blind Spots</p>
                    <p className="text-xs" style={{ color: t.textTertiary }}>Prioritize weak areas</p>
                  </div>
                </div>
                <button
                  onClick={toggleFocusBlindSpots}
                  className="relative rounded-full transition-colors duration-200 flex-shrink-0"
                  style={{
                    width: '40px', height: '22px',
                    backgroundColor: generateConfig.focusBlindSpots
                      ? (t.isDark ? '#22d3ee' : '#0f172a')
                      : (t.isDark ? '#334155' : '#e2e8f0'),
                    boxShadow: generateConfig.focusBlindSpots && t.isDark ? '0 0 8px rgba(34,211,238,0.5)' : 'none',
                  }}
                >
                  <div
                    className="absolute top-0.5 rounded-full bg-white shadow-sm transition-transform duration-200"
                    style={{ width: '18px', height: '18px', transform: generateConfig.focusBlindSpots ? 'translateX(20px)' : 'translateX(2px)' }}
                  />
                </button>
              </div>

              {/* Timed session */}
              <div
                className="flex items-center justify-between p-3 rounded-xl"
                style={{ backgroundColor: t.isDark ? '#1e293b' : '#f8fafc', border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}` }}
              >
                <div className="flex items-center gap-2">
                  <Clock size={13} style={{ color: t.isDark ? '#60a5fa' : '#3b82f6' }} />
                  <div>
                    <p className="text-xs font-medium" style={{ color: t.textPrimary }}>Timed Session</p>
                    <p className="text-xs" style={{ color: t.textTertiary }}>Simulate exam conditions</p>
                  </div>
                </div>
                <button
                  onClick={toggleTimedSession}
                  className="relative rounded-full transition-colors duration-200 flex-shrink-0"
                  style={{
                    width: '40px', height: '22px',
                    backgroundColor: generateConfig.timedSession
                      ? (t.isDark ? '#22d3ee' : '#0f172a')
                      : (t.isDark ? '#334155' : '#e2e8f0'),
                    boxShadow: generateConfig.timedSession && t.isDark ? '0 0 8px rgba(34,211,238,0.5)' : 'none',
                  }}
                >
                  <div
                    className="absolute top-0.5 rounded-full bg-white shadow-sm transition-transform duration-200"
                    style={{ width: '18px', height: '18px', transform: generateConfig.timedSession ? 'translateX(20px)' : 'translateX(2px)' }}
                  />
                </button>
              </div>

              {/* Time limit slider */}
              {generateConfig.timedSession && (
                <div
                  className="p-3 rounded-xl"
                  style={{
                    backgroundColor: t.isDark ? 'rgba(96,165,250,0.06)' : '#eff6ff',
                    border: `1px solid ${t.isDark ? '#60a5fa40' : '#bfdbfe'}`,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium" style={{ color: t.isDark ? '#60a5fa' : '#1d4ed8' }}>Time Limit</span>
                    <span className="text-xs font-bold" style={{ color: t.isDark ? '#60a5fa' : '#1d4ed8', textShadow: t.isDark ? '0 0 6px rgba(96,165,250,0.5)' : 'none' }}>
                      {generateConfig.timeLimit} min
                    </span>
                  </div>
                  <input
                    type="range" min={5} max={240} step={5}
                    value={generateConfig.timeLimit}
                    onChange={(e) => setTimeLimit(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: t.isDark
                        ? `linear-gradient(to right, #60a5fa ${((generateConfig.timeLimit - 5) / 235) * 100}%, #1e293b ${((generateConfig.timeLimit - 5) / 235) * 100}%)`
                        : `linear-gradient(to right, #2563eb ${((generateConfig.timeLimit - 5) / 235) * 100}%, #bfdbfe ${((generateConfig.timeLimit - 5) / 235) * 100}%)`,
                    }}
                  />
                </div>
              )}
            </div>
          </section>

          {/* Context pill */}
          <div
            className="p-3 rounded-xl flex items-center gap-2"
            style={{ backgroundColor: t.isDark ? '#1e293b' : '#f8fafc', border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}` }}
          >
            <div
              className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: t.isDark ? '#22d3ee20' : '#0f172a', border: t.isDark ? '1px solid #22d3ee40' : 'none' }}
            >
              <span className="text-xs font-bold" style={{ color: t.isDark ? '#22d3ee' : '#ffffff' }}>{activeSection[0]}</span>
            </div>
            <div>
              <p className="text-xs font-medium" style={{ color: t.textPrimary }}>Generating for: {activeSection}</p>
              <p className="text-xs" style={{ color: t.textTertiary }}>
                {units.length} units · {units.reduce((a, u) => a + u.modules.length, 0)} modules
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 pb-6 flex gap-3"
          style={{ borderTop: `1px solid ${t.divider}`, paddingTop: '1.25rem' }}
        >
          <button
            onClick={closeGenerateModal}
            className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-colors"
            style={{ backgroundColor: t.isDark ? '#1e293b' : '#f8fafc', color: t.textSecondary, border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}` }}
          >
            Cancel
          </button>
          <button
            onClick={closeGenerateModal}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
            style={{
              backgroundColor: t.isDark ? '#22d3ee' : '#0f172a',
              color: t.isDark ? '#020617' : '#ffffff',
              boxShadow: t.isDark ? '0 0 20px rgba(34,211,238,0.35)' : 'none',
            }}
          >
            <Zap size={14} />
            Generate {generateConfig.questionCount} {generateConfig.contentTypes[0] === 'mcq' ? 'MCQs' : generateConfig.contentTypes[0]}
          </button>
        </div>
      </div>
    </div>
  );
}
