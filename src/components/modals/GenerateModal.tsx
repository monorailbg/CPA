'use client';

import { X, Sparkles, Zap, Clock, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { GenerateContentType, StudyMode, Difficulty } from '@/lib/types';
import { cpaDatabase } from '@/data/cpaDatabase';

const CONTENT_TYPES: { id: GenerateContentType; label: string; desc: string; bg: string; border: string; color: string }[] = [
  { id: 'mcq', label: 'MCQs', desc: 'Multiple-choice questions', bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' },
  { id: 'flashcards', label: 'Flashcards', desc: 'Spaced repetition cards', bg: '#eef2ff', border: '#c7d2fe', color: '#4338ca' },
  { id: 'tbs', label: 'Simulations', desc: 'Task-based simulations', bg: '#fffbeb', border: '#fde68a', color: '#b45309' },
  { id: 'notes', label: 'Notes', desc: 'Visual concept summaries', bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d' },
  { id: 'glossary', label: 'Glossary', desc: 'IRC & AICPA definitions', bg: '#faf5ff', border: '#e9d5ff', color: '#6b21a8' },
];

const DIFFICULTIES: { id: Difficulty; label: string; desc: string }[] = [
  { id: 'easy', label: 'Easy', desc: 'Foundation concepts' },
  { id: 'medium', label: 'Medium', desc: 'Core exam level' },
  { id: 'hard', label: 'Hard', desc: 'Advanced applications' },
  { id: 'adaptive', label: 'Adaptive', desc: 'AI-selected for you' },
];

export default function GenerateModal() {
  const {
    showGenerateModal,
    closeGenerateModal,
    generateConfig,
    toggleContentType,
    setMode,
    setDifficulty,
    setQuestionCount,
    toggleFocusBlindSpots,
    toggleTimedSession,
    setTimeLimit,
    activeSection,
  } = useAppStore();

  const units = cpaDatabase[activeSection] || [];

  if (!showGenerateModal) return null;

  const handleGenerate = () => {
    // Trigger AI generation (placeholder for real API call)
    closeGenerateModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
        onClick={closeGenerateModal}
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] overflow-hidden"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-slate-900">
              <Sparkles size={14} className="text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">AI Generation Panel</h2>
              <p className="text-xs text-slate-400">Configure your study session</p>
            </div>
          </div>
          <button
            onClick={closeGenerateModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={15} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Content type selection */}
          <section>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Content Type
            </label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CONTENT_TYPES.map((type) => {
                const isActive = generateConfig.contentTypes.includes(type.id);
                return (
                  <button
                    key={type.id}
                    onClick={() => toggleContentType(type.id)}
                    className="flex flex-col items-start p-3 rounded-xl border text-left transition-all duration-150"
                    style={{
                      backgroundColor: isActive ? type.bg : '#ffffff',
                      borderColor: isActive ? type.border : '#e2e8f0',
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ color: isActive ? type.color : '#64748b' }}
                    >
                      {type.label}
                    </span>
                    <span
                      className="text-xs mt-0.5 leading-tight"
                      style={{ color: isActive ? type.color : '#94a3b8', opacity: 0.8 }}
                    >
                      {type.desc}
                    </span>
                    {isActive && (
                      <div
                        className="w-1.5 h-1.5 rounded-full mt-2"
                        style={{ backgroundColor: type.color }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Mode — Study vs Exam */}
          <section>
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Mode
            </label>
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
              {(['study', 'exam'] as StudyMode[]).map((mode) => {
                const isActive = generateConfig.mode === mode;
                return (
                  <button
                    key={mode}
                    onClick={() => setMode(mode)}
                    className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150"
                    style={
                      isActive
                        ? {
                            backgroundColor: '#ffffff',
                            border: '2px solid #0f172a',
                            color: '#0f172a',
                          }
                        : {
                            backgroundColor: 'transparent',
                            border: '2px solid transparent',
                            color: '#94a3b8',
                          }
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
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Difficulty
            </label>
            <div className="grid grid-cols-4 gap-1.5">
              {DIFFICULTIES.map((diff) => {
                const isActive = generateConfig.difficulty === diff.id;
                return (
                  <button
                    key={diff.id}
                    onClick={() => setDifficulty(diff.id)}
                    className="py-2.5 px-2 rounded-xl border text-center transition-all duration-150"
                    style={
                      isActive
                        ? {
                            backgroundColor: '#0f172a',
                            borderColor: '#0f172a',
                            color: '#ffffff',
                          }
                        : {
                            backgroundColor: '#ffffff',
                            borderColor: '#e2e8f0',
                            color: '#64748b',
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
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Questions per Session
                </label>
                <span className="text-sm font-bold text-slate-900">{generateConfig.questionCount}</span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                value={generateConfig.questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #0f172a ${((generateConfig.questionCount - 5) / 95) * 100}%, #e2e8f0 ${((generateConfig.questionCount - 5) / 95) * 100}%)`,
                  accentColor: '#2563eb',
                }}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>5</span>
                <span>100</span>
              </div>
            </section>
          )}

          {/* Toggles */}
          <section className="space-y-3">
            <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Session Options
            </label>

            {/* Focus Blind Spots */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <AlertTriangle size={13} className="text-amber-500" />
                <div>
                  <p className="text-xs font-medium text-slate-700">Focus on Blind Spots</p>
                  <p className="text-xs text-slate-400">Prioritize weak areas</p>
                </div>
              </div>
              <button
                onClick={toggleFocusBlindSpots}
                className="relative w-10 h-5.5 rounded-full transition-colors duration-200 flex-shrink-0"
                style={{
                  backgroundColor: generateConfig.focusBlindSpots ? '#0f172a' : '#e2e8f0',
                  height: '22px',
                  width: '40px',
                }}
              >
                <div
                  className="absolute top-0.5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    width: '18px',
                    height: '18px',
                    transform: generateConfig.focusBlindSpots ? 'translateX(20px)' : 'translateX(2px)',
                  }}
                />
              </button>
            </div>

            {/* Timed session */}
            <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <Clock size={13} className="text-blue-500" />
                <div>
                  <p className="text-xs font-medium text-slate-700">Timed Session</p>
                  <p className="text-xs text-slate-400">Simulate exam conditions</p>
                </div>
              </div>
              <button
                onClick={toggleTimedSession}
                className="relative rounded-full transition-colors duration-200 flex-shrink-0"
                style={{
                  backgroundColor: generateConfig.timedSession ? '#0f172a' : '#e2e8f0',
                  height: '22px',
                  width: '40px',
                }}
              >
                <div
                  className="absolute top-0.5 rounded-full bg-white shadow-sm transition-transform duration-200"
                  style={{
                    width: '18px',
                    height: '18px',
                    transform: generateConfig.timedSession ? 'translateX(20px)' : 'translateX(2px)',
                  }}
                />
              </button>
            </div>

            {/* Time limit slider (only when timed is on) */}
            {generateConfig.timedSession && (
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-blue-700">Time Limit</span>
                  <span className="text-xs font-bold text-blue-900">{generateConfig.timeLimit} min</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={240}
                  step={5}
                  value={generateConfig.timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #2563eb ${((generateConfig.timeLimit - 5) / 235) * 100}%, #bfdbfe ${((generateConfig.timeLimit - 5) / 235) * 100}%)`,
                    accentColor: '#2563eb',
                  }}
                />
              </div>
            )}
          </section>

          {/* Section context */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-slate-900 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-white">{activeSection[0]}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-700">Generating for: {activeSection}</p>
              <p className="text-xs text-slate-400">{units.length} units · {units.reduce((a, u) => a + u.modules.length, 0)} modules available</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex gap-3">
          <button
            onClick={closeGenerateModal}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleGenerate}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors flex items-center justify-center gap-2 hover:opacity-90"
            style={{ backgroundColor: '#0f172a' }}
          >
            <Zap size={14} />
            Generate {generateConfig.questionCount} {generateConfig.contentTypes[0] === 'mcq' ? 'MCQs' : generateConfig.contentTypes[0]}
          </button>
        </div>
      </div>
    </div>
  );
}
