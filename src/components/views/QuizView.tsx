'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, Terminal, Clock, Award, ChevronRight, AlertCircle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cpaDatabase } from '@/data/cpaDatabase';
import { MCQ } from '@/lib/types';

function MCQCard({ mcq, index, onAnswer }: {
  mcq: MCQ;
  index: number;
  onAnswer: (questionId: string, optionId: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(mcq.selectedOption || null);
  const [revealed, setRevealed] = useState(mcq.isAnswered);

  const handleSelect = (optionId: string) => {
    if (revealed) return;
    setSelected(optionId);
  };

  const handleReveal = () => {
    if (!selected) return;
    setRevealed(true);
    onAnswer(mcq.id, selected);
  };

  const correctOption = mcq.options.find((o) => o.isCorrect);
  const isCorrect = selected === correctOption?.id;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] overflow-hidden">
      {/* Question header */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-start gap-3">
        <span className="flex-shrink-0 w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
          {index + 1}
        </span>
        <div className="flex-1">
          <div className="flex flex-wrap gap-2 mb-2">
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-md"
              style={{ backgroundColor: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe' }}
            >
              MCQ
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-600">
              {mcq.topic}
            </span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-md ${
                mcq.difficulty === 'easy' ? 'bg-green-50 text-green-700' :
                mcq.difficulty === 'medium' ? 'bg-amber-50 text-amber-700' :
                'bg-red-50 text-red-700'
              }`}
            >
              {mcq.difficulty}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-800 leading-relaxed">{mcq.question}</p>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 py-4 space-y-2.5">
        {mcq.options.map((option) => {
          const isSelected = selected === option.id;
          const isCorrectOpt = option.isCorrect;

          let bg = 'bg-white hover:bg-slate-50';
          let border = 'border-slate-200';
          let textColor = 'text-slate-700';
          let icon = null;

          if (revealed) {
            if (isCorrectOpt) {
              bg = 'bg-emerald-50';
              border = 'border-emerald-300';
              textColor = 'text-emerald-800';
              icon = <CheckCircle2 size={15} className="text-emerald-500 flex-shrink-0" />;
            } else if (isSelected && !isCorrectOpt) {
              bg = 'bg-red-50';
              border = 'border-red-300';
              textColor = 'text-red-800';
              icon = <XCircle size={15} className="text-red-500 flex-shrink-0" />;
            }
          } else if (isSelected) {
            bg = 'bg-slate-900';
            border = 'border-slate-900';
            textColor = 'text-white';
          }

          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={revealed}
              className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all duration-150 ${bg} border-${border} ${!revealed ? 'cursor-pointer' : 'cursor-default'}`}
              style={{
                border: `1px solid`,
                borderColor: revealed && isCorrectOpt ? '#6ee7b7' : revealed && isSelected && !isCorrectOpt ? '#fca5a5' : isSelected ? '#0f172a' : '#e2e8f0',
                backgroundColor: revealed && isCorrectOpt ? '#ecfdf5' : revealed && isSelected && !isCorrectOpt ? '#fef2f2' : isSelected && !revealed ? '#0f172a' : undefined,
              }}
            >
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center text-xs font-bold transition-colors ${
                  isSelected && !revealed
                    ? 'border-white text-white'
                    : 'border-slate-300 text-slate-500'
                }`}
              >
                {option.id.toUpperCase()}
              </span>
              <span className={`text-sm leading-relaxed flex-1 ${isSelected && !revealed ? 'text-white' : 'text-slate-700'}`}>
                {option.text}
              </span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {revealed && (
        <div className="mx-6 mb-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle2 size={14} className="text-emerald-500" />
            ) : (
              <AlertCircle size={14} className="text-red-500" />
            )}
            <span className="text-xs font-semibold text-slate-700">
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </span>
            {mcq.aicpaSkill && (
              <span className="text-xs text-slate-400 ml-1">· AICPA Skill: {mcq.aicpaSkill}</span>
            )}
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">{mcq.explanation}</p>
          {selected && !isCorrect && correctOption?.explanation && (
            <p className="text-xs text-emerald-700 mt-2 pt-2 border-t border-slate-200">
              <strong>Why correct:</strong> {correctOption.explanation}
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
            className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-medium disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors"
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

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900">
            <Terminal size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Interactive Quiz Terminal</h1>
            <p className="text-sm text-slate-400">AICPA-style MCQ Practice · {activeSection}</p>
          </div>
        </div>

        {answeredCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xl font-bold text-slate-900">{scorePercent}%</div>
              <div className="text-xs text-slate-400">{correctCount}/{answeredCount} correct</div>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(${scorePercent >= 75 ? '#10b981' : scorePercent >= 50 ? '#f59e0b' : '#ef4444'} ${scorePercent * 3.6}deg, #f1f5f9 0deg)`,
              }}
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <Award size={14} className="text-slate-400" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stats bar */}
      {allMCQs.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: 'Total Questions', value: allMCQs.length, color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe' },
            { label: 'Answered', value: answeredCount, color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
            { label: 'Correct', value: correctCount, color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
            { label: 'Score', value: `${scorePercent}%`, color: '#4338ca', bg: '#eef2ff', border: '#c7d2fe' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center border"
              style={{ backgroundColor: stat.bg, borderColor: stat.border }}
            >
              <p className="text-lg font-bold" style={{ color: stat.color }}>{stat.value}</p>
              <p className="text-xs mt-0.5" style={{ color: stat.color, opacity: 0.7 }}>{stat.label}</p>
            </div>
          ))}
        </div>
      )}

      {/* MCQ List */}
      {allMCQs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-slate-200">
          <Terminal size={36} className="text-slate-200 mb-4" />
          <h2 className="text-base font-semibold text-slate-700">No questions available</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-sm">
            Use the AI Generate panel to create MCQs for {activeSection} units.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {allMCQs.map((mcq, idx) => (
            <MCQCard
              key={mcq.id}
              mcq={mcq}
              index={idx}
              onAnswer={handleAnswer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
