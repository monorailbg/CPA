'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Terminal, Award, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { MCQ } from '@/lib/types';

function MCQCard({ mcq, index, onAnswer }: {
  mcq: MCQ;
  index: number;
  onAnswer: (questionId: string, optionId: string) => void;
}) {
  const t = useTheme();
  const [selected, setSelected] = useState<string | null>(mcq.selectedOption || null);
  const [revealed, setRevealed] = useState(mcq.isAnswered);

  const handleReveal = () => {
    if (!selected) return;
    setRevealed(true);
    onAnswer(mcq.id, selected);
  };

  const correctOption = mcq.options.find((o) => o.isCorrect);
  const isCorrect = selected === correctOption?.id;

  const difficultyStyle = {
    easy: t.isDark ? { bg: 'rgba(52,211,153,0.1)', color: '#34d399', border: '#34d39940' } : { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
    medium: t.isDark ? { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '#fbbf2440' } : { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    hard: t.isDark ? { bg: 'rgba(248,113,113,0.1)', color: '#f87171', border: '#f8717140' } : { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  };
  const diffStyle = difficultyStyle[mcq.difficulty] || difficultyStyle.medium;

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
    >
      {/* Question header */}
      <div className="px-6 py-4 flex items-start gap-3" style={{ borderBottom: `1px solid ${t.divider}` }}>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: t.isDark ? '#0f172a' : '#f1f5f9', color: t.isDark ? '#94a3b8' : '#64748b' }}
        >
          {index + 1}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded-md" style={{ backgroundColor: t.mcq.bg, color: t.mcq.text, border: `1px solid ${t.mcq.border}` }}>
              MCQ
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-md" style={{ backgroundColor: t.isDark ? '#0f172a' : '#f8fafc', color: t.textTertiary, border: `1px solid ${t.divider}` }}>
              {mcq.topic}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-md" style={{ backgroundColor: diffStyle.bg, color: diffStyle.color, border: `1px solid ${diffStyle.border}` }}>
              {mcq.difficulty}
            </span>
          </div>
          <p className="text-sm font-medium leading-relaxed" style={{ color: t.textPrimary }}>{mcq.question}</p>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 py-4 space-y-2.5">
        {mcq.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrectOpt = option.isCorrect;

          let bgColor = t.card;
          let borderColor = t.cardBorder;
          let textColor = t.textSecondary;
          let icon = null;
          let glowStyle = 'none';

          if (revealed) {
            if (isCorrectOpt) {
              bgColor = t.isDark ? 'rgba(52,211,153,0.1)' : '#ecfdf5';
              borderColor = t.isDark ? '#34d399' : '#6ee7b7';
              textColor = t.isDark ? '#34d399' : '#065f46';
              glowStyle = t.isDark ? '0 0 10px rgba(52,211,153,0.2)' : 'none';
              icon = <CheckCircle2 size={15} style={{ color: t.isDark ? '#34d399' : '#059669', flexShrink: 0 }} />;
            } else if (isSelected && !isCorrectOpt) {
              bgColor = t.isDark ? 'rgba(248,113,113,0.1)' : '#fef2f2';
              borderColor = t.isDark ? '#f87171' : '#fca5a5';
              textColor = t.isDark ? '#f87171' : '#991b1b';
              icon = <XCircle size={15} style={{ color: t.isDark ? '#f87171' : '#dc2626', flexShrink: 0 }} />;
            }
          } else if (isSelected) {
            bgColor = t.isDark ? '#22d3ee15' : '#0f172a';
            borderColor = t.isDark ? '#22d3ee' : '#0f172a';
            textColor = t.isDark ? '#22d3ee' : '#ffffff';
            glowStyle = t.isDark ? '0 0 10px rgba(34,211,238,0.2)' : 'none';
          }

          return (
            <button
              key={option.id}
              onClick={() => !revealed && setSelected(option.id)}
              disabled={revealed}
              className="w-full flex items-start gap-3 p-3.5 rounded-xl text-left transition-all duration-150"
              style={{
                backgroundColor: bgColor,
                border: `1px solid ${borderColor}`,
                cursor: revealed ? 'default' : 'pointer',
                boxShadow: glowStyle,
              }}
            >
              <span
                className="flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold transition-colors"
                style={{
                  borderColor: isSelected && !revealed ? (t.isDark ? '#22d3ee' : '#ffffff') : t.isDark ? '#334155' : '#d1d5db',
                  color: isSelected && !revealed ? (t.isDark ? '#22d3ee' : '#ffffff') : t.textTertiary,
                }}
              >
                {option.id.toUpperCase()}
              </span>
              <span className="text-sm leading-relaxed flex-1" style={{ color: textColor }}>
                {option.text}
              </span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div
          className="mx-6 mb-4 p-4 rounded-xl"
          style={{
            backgroundColor: t.isDark ? '#0f172a' : '#f8fafc',
            border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}`,
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect
              ? <CheckCircle2 size={14} style={{ color: t.isDark ? '#34d399' : '#059669' }} />
              : <AlertCircle size={14} style={{ color: t.isDark ? '#f87171' : '#dc2626' }} />
            }
            <span className="text-xs font-semibold" style={{ color: t.textPrimary }}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
            {mcq.aicpaSkill && (
              <span className="text-xs ml-1" style={{ color: t.textTertiary }}>· {mcq.aicpaSkill}</span>
            )}
          </div>
          <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{mcq.explanation}</p>
          {!isCorrect && correctOption?.explanation && (
            <p className="text-xs mt-2 pt-2 font-medium" style={{ color: t.isDark ? '#34d399' : '#065f46', borderTop: `1px solid ${t.divider}` }}>
              Why correct: {correctOption.explanation}
            </p>
          )}
        </div>
      )}

      {/* Action */}
      {!revealed && (
        <div className="px-6 pb-4">
          <button
            onClick={handleReveal}
            disabled={!selected}
            className="px-4 py-2 rounded-xl text-xs font-medium transition-all"
            style={{
              backgroundColor: t.isDark ? (selected ? '#22d3ee' : '#1e293b') : (selected ? '#0f172a' : '#f1f5f9'),
              color: t.isDark ? (selected ? '#020617' : '#475569') : (selected ? '#ffffff' : '#94a3b8'),
              cursor: selected ? 'pointer' : 'not-allowed',
              boxShadow: t.isDark && selected ? '0 0 12px rgba(34,211,238,0.3)' : 'none',
            }}
          >
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
}

export default function QuizView() {
  const { activeSection } = useAppStore();
  const t = useTheme();
  const units = cpaDatabase[activeSection] || [];
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const allMCQs: MCQ[] = units.flatMap((u) => u.modules.flatMap((m) => m.mcqs));

  const handleAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const answeredCount = Object.keys(answers).length;
  const correctCount = Object.entries(answers).filter(([qId, optId]) => {
    const q = allMCQs.find((q) => q.id === qId);
    return q?.options.find((o) => o.id === optId)?.isCorrect;
  }).length;
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const scoreColor = scorePercent >= 75
    ? (t.isDark ? '#34d399' : '#059669')
    : scorePercent >= 50
    ? (t.isDark ? '#fbbf24' : '#d97706')
    : (t.isDark ? '#f87171' : '#dc2626');

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: t.isDark ? '#1e293b' : '#0f172a', border: t.isDark ? '1px solid #334155' : 'none' }}
          >
            <Terminal size={16} style={{ color: t.isDark ? '#22d3ee' : '#ffffff' }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: t.textPrimary }}>Interactive Quiz Terminal</h1>
            <p className="text-sm" style={{ color: t.textTertiary }}>AICPA-style MCQ Practice · {activeSection}</p>
          </div>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xl font-bold" style={{ color: scoreColor, textShadow: t.isDark ? `0 0 10px ${scoreColor}60` : 'none' }}>
                {scorePercent}%
              </div>
              <div className="text-xs" style={{ color: t.textTertiary }}>{correctCount}/{answeredCount} correct</div>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(${scoreColor} ${scorePercent * 3.6}deg, ${t.isDark ? '#1e293b' : '#f1f5f9'} 0deg)`,
                boxShadow: t.isDark ? `0 0 12px ${scoreColor}40` : 'none',
              }}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ backgroundColor: t.card }}
              >
                <Award size={14} style={{ color: t.textTertiary }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      {allMCQs.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total', value: allMCQs.length, c: t.mcq },
            { label: 'Answered', value: answeredCount, c: t.tbs },
            { label: 'Correct', value: correctCount, c: t.notes },
            { label: 'Score', value: `${scorePercent}%`, c: t.flash },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center border"
              style={{ backgroundColor: stat.c.bg, borderColor: stat.c.border }}
            >
              <p
                className="text-lg font-bold"
                style={{ color: stat.c.text, textShadow: t.isDark ? `0 0 8px ${stat.c.text}60` : 'none' }}
              >
                {stat.value}
              </p>
              <p className="text-xs mt-0.5" style={{ color: stat.c.text, opacity: 0.7 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* MCQ list or empty state */}
      {allMCQs.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center rounded-2xl border"
          style={{ backgroundColor: t.card, borderColor: t.cardBorder }}
        >
          <Terminal size={36} style={{ color: t.textTertiary }} className="mb-4" />
          <h2 className="text-base font-semibold" style={{ color: t.textPrimary }}>No questions available</h2>
          <p className="text-sm mt-1 max-w-sm" style={{ color: t.textTertiary }}>
            Use the AI Generate panel to create MCQs for {activeSection}.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {allMCQs.map((mcq, idx) => (
            <MCQCard key={mcq.id} mcq={mcq} index={idx} onAnswer={handleAnswer} />
          ))}
        </div>
      )}
    </div>
  );
}
