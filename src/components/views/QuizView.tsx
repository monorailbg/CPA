'use client';

import { useState, useCallback, useMemo } from 'react';
import { CheckCircle2, XCircle, Terminal, Award, AlertCircle, ChevronRight, Clock, Play, BarChart2, BookOpen } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { MCQ, QuizSession } from '@/lib/types';

// ─── Per-Question Feedback State ───────────────────────────────────────────

interface QuestionFeedback {
  userSelection: string;
  showSuccess: boolean;
  showError: boolean;
}

// ─── Single MCQ Card with strict success/error state separation ────────────

function MCQCard({
  mcq,
  index,
  feedback,
  onAnswer,
}: {
  mcq: MCQ;
  index: number;
  feedback?: QuestionFeedback;
  onAnswer: (questionId: string, optionId: string) => void;
}) {
  const t = useTheme();
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);

  const isLocked = !!feedback;
  const correctOption = mcq.options.find((o) => o.isCorrect);

  const handleSubmit = () => {
    if (!pendingSelection || isLocked) return;
    onAnswer(mcq.id, pendingSelection);
  };

  const getOptionStyle = (optionId: string): React.CSSProperties => {
    // While not yet revealed — show pending selection highlight
    if (!isLocked) {
      const isPending = pendingSelection === optionId;
      return {
        backgroundColor: isPending
          ? t.isDark ? 'rgba(34,211,238,0.1)' : '#0f172a'
          : t.isDark ? '#1e293b' : '#ffffff',
        borderColor: isPending
          ? t.isDark ? '#22d3ee' : '#0f172a'
          : t.isDark ? '#334155' : '#e2e8f0',
        color: isPending
          ? t.isDark ? '#22d3ee' : '#ffffff'
          : t.textSecondary,
        boxShadow: isPending && t.isDark ? '0 0 10px rgba(34,211,238,0.15)' : 'none',
        cursor: 'pointer',
      };
    }

    const { showSuccess, showError, userSelection } = feedback!;

    // ── CORRECT ANSWER: highlight green only when showSuccess is true ──────
    if (showSuccess && optionId === correctOption?.id) {
      return {
        backgroundColor: t.isDark ? 'rgba(52,211,153,0.12)' : '#ecfdf5',
        borderColor: t.isDark ? '#34d399' : '#6ee7b7',
        color: t.isDark ? '#34d399' : '#065f46',
        boxShadow: t.isDark ? '0 0 12px rgba(52,211,153,0.2)' : 'none',
        cursor: 'default',
      };
    }

    // ── WRONG SUBMISSION: red only on the user's wrong pick, showError guard ─
    if (showError && !showSuccess && optionId === userSelection && optionId !== correctOption?.id) {
      return {
        backgroundColor: t.isDark ? 'rgba(248,113,113,0.1)' : '#fef2f2',
        borderColor: t.isDark ? '#f87171' : '#fca5a5',
        color: t.isDark ? '#f87171' : '#991b1b',
        boxShadow: t.isDark ? '0 0 10px rgba(248,113,113,0.15)' : 'none',
        cursor: 'default',
      };
    }

    // ── After wrong answer: also reveal the correct answer in green ─────────
    if (showError && !showSuccess && optionId === correctOption?.id) {
      return {
        backgroundColor: t.isDark ? 'rgba(52,211,153,0.08)' : '#f0fdf4',
        borderColor: t.isDark ? '#34d39960' : '#bbf7d0',
        color: t.isDark ? '#34d399' : '#15803d',
        cursor: 'default',
      };
    }

    // ── Neutral (not involved in the answer) ────────────────────────────────
    return {
      backgroundColor: t.isDark ? '#1e293b' : '#f8fafc',
      borderColor: t.isDark ? '#1e293b' : '#f1f5f9',
      color: t.textTertiary,
      cursor: 'default',
      opacity: 0.6,
    };
  };

  const getOptionIcon = (optionId: string) => {
    if (!feedback) return null;
    const { showSuccess, showError, userSelection } = feedback;

    // showSuccess — ONLY show checkmark on correct answer, NEVER an error icon
    if (showSuccess && optionId === correctOption?.id) {
      return <CheckCircle2 size={15} style={{ color: t.isDark ? '#34d399' : '#059669', flexShrink: 0, filter: t.isDark ? 'drop-shadow(0 0 4px #34d399)' : 'none' }} />;
    }

    // showError — only show X on the wrong pick, never on correct answer
    if (showError && !showSuccess && optionId === userSelection && optionId !== correctOption?.id) {
      return <XCircle size={15} style={{ color: t.isDark ? '#f87171' : '#dc2626', flexShrink: 0 }} />;
    }

    // Correct answer revealed after a wrong pick — checkmark without glow
    if (showError && !showSuccess && optionId === correctOption?.id) {
      return <CheckCircle2 size={15} style={{ color: t.isDark ? '#34d399' : '#059669', flexShrink: 0, opacity: 0.7 }} />;
    }

    return null;
  };

  const difficultyChip = {
    easy: t.isDark ? { bg: 'rgba(52,211,153,0.1)', color: '#34d399', border: '#34d39940' } : { bg: '#f0fdf4', color: '#15803d', border: '#bbf7d0' },
    medium: t.isDark ? { bg: 'rgba(251,191,36,0.1)', color: '#fbbf24', border: '#fbbf2440' } : { bg: '#fffbeb', color: '#b45309', border: '#fde68a' },
    hard: t.isDark ? { bg: 'rgba(248,113,113,0.1)', color: '#f87171', border: '#f8717140' } : { bg: '#fef2f2', color: '#dc2626', border: '#fecaca' },
  }[mcq.difficulty];

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        backgroundColor: t.card,
        border: `1px solid ${feedback?.showSuccess ? (t.isDark ? '#34d39940' : '#bbf7d0') : feedback?.showError ? (t.isDark ? '#f8717140' : '#fecaca') : t.cardBorder}`,
        boxShadow: feedback?.showSuccess
          ? t.isDark ? '0 0 15px rgba(52,211,153,0.12)' : t.cardShadow
          : feedback?.showError
          ? t.isDark ? '0 0 12px rgba(248,113,113,0.1)' : t.cardShadow
          : t.cardShadow,
      }}
    >
      {/* Status stripe */}
      {feedback && (
        <div
          className="h-0.5 w-full transition-all duration-300"
          style={{
            // showSuccess guard — stripe is green ONLY when showSuccess===true
            backgroundColor: feedback.showSuccess
              ? (t.isDark ? '#34d399' : '#10b981')
              : (t.isDark ? '#f87171' : '#ef4444'),
            boxShadow: t.isDark
              ? feedback.showSuccess
                ? '0 0 8px #34d399'
                : '0 0 8px #f87171'
              : 'none',
          }}
        />
      )}

      {/* Header */}
      <div className="px-6 py-4 flex items-start gap-3" style={{ borderBottom: `1px solid ${t.divider}` }}>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{ backgroundColor: t.isDark ? '#0f172a' : '#f1f5f9', color: t.isDark ? '#94a3b8' : '#64748b' }}
        >
          {index + 1}
        </span>
        <div className="flex-1 min-w-0 max-w-full">
          <div className="flex flex-wrap gap-2 mb-2.5">
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-md"
              style={{ backgroundColor: t.tbs.bg, color: t.tbs.text, border: `1px solid ${t.tbs.border}` }}
            >
              MCQ
            </span>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-md"
              style={{ backgroundColor: t.isDark ? '#0f172a' : '#f8fafc', color: t.textTertiary, border: `1px solid ${t.divider}` }}
            >
              {mcq.topic}
            </span>
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-md"
              style={{ backgroundColor: difficultyChip.bg, color: difficultyChip.color, border: `1px solid ${difficultyChip.border}` }}
            >
              {mcq.difficulty}
            </span>
          </div>
          <p className="text-sm font-medium leading-relaxed break-words" style={{ color: t.textPrimary }}>{mcq.question}</p>
        </div>
      </div>

      {/* Options */}
      <div className="px-6 py-4 flex flex-col gap-2.5 w-full max-w-full">
        {mcq.options.map((option) => {
          const style = getOptionStyle(option.id);
          const icon = getOptionIcon(option.id);
          const isPending = !isLocked && pendingSelection === option.id;
          // option.id is `${mcqId}-${letter}` — derive just the trailing letter for the badge.
          const letter = option.id.slice(option.id.lastIndexOf('-') + 1).toUpperCase();

          return (
            <button
              key={option.id}
              onClick={() => !isLocked && setPendingSelection(option.id)}
              disabled={isLocked}
              className="w-full max-w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-150 border"
              style={{ ...style, border: `1px solid ${(style as React.CSSProperties).borderColor}` }}
            >
              <span
                className="flex-shrink-0 w-8 h-8 rounded-lg border flex items-center justify-center text-sm font-bold transition-colors"
                style={{
                  borderColor: isPending ? (t.isDark ? '#22d3ee' : '#ffffff') : t.isDark ? '#334155' : '#d1d5db',
                  color: isPending ? (t.isDark ? '#22d3ee' : '#ffffff') : t.textTertiary,
                }}
              >
                {letter}
              </span>
              <span
                className="text-sm leading-relaxed flex-1 min-w-0"
                style={{ color: (style as React.CSSProperties).color as string, whiteSpace: 'normal', overflowWrap: 'break-word' }}
              >
                {option.text}
              </span>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Explanation — shown only after answer submitted */}
      {feedback && (
        <div
          className="mx-6 mb-4 p-4 rounded-xl"
          style={{ backgroundColor: t.isDark ? '#0f172a' : '#f8fafc', border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}` }}
        >
          <div className="flex items-center gap-2 mb-2">
            {/* Icon strictly tied to success/error state */}
            {feedback.showSuccess && !feedback.showError
              ? <CheckCircle2 size={14} style={{ color: t.isDark ? '#34d399' : '#059669' }} />
              : <AlertCircle size={14} style={{ color: t.isDark ? '#f87171' : '#dc2626' }} />
            }
            <span className="text-xs font-semibold" style={{ color: t.textPrimary }}>
              {/* Label is programmatically unreachable from the opposite state */}
              {feedback.showSuccess && !feedback.showError ? 'Correct!' : 'Incorrect'}
            </span>
            {mcq.aicpaSkill && (
              <span className="text-xs ml-1" style={{ color: t.textTertiary }}>· {mcq.aicpaSkill}</span>
            )}
          </div>
          <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{mcq.explanation}</p>
          {feedback.showError && !feedback.showSuccess && correctOption?.explanation && (
            <p
              className="text-xs mt-2 pt-2 font-medium"
              style={{ color: t.isDark ? '#34d399' : '#065f46', borderTop: `1px solid ${t.divider}` }}
            >
              Why {correctOption.id.slice(correctOption.id.lastIndexOf('-') + 1).toUpperCase()} is correct: {correctOption.explanation}
            </p>
          )}
        </div>
      )}

      {/* Submit button — hidden after answer locked */}
      {!feedback && (
        <div className="px-6 pb-4">
          <button
            onClick={handleSubmit}
            disabled={!pendingSelection}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-150"
            style={{
              backgroundColor: pendingSelection
                ? (t.isDark ? '#22d3ee' : '#0f172a')
                : (t.isDark ? '#1e293b' : '#f1f5f9'),
              color: pendingSelection
                ? (t.isDark ? '#020617' : '#ffffff')
                : t.textTertiary,
              cursor: pendingSelection ? 'pointer' : 'not-allowed',
              boxShadow: pendingSelection && t.isDark ? '0 0 14px rgba(34,211,238,0.35)' : 'none',
            }}
          >
            Check Answer
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Quiz Session Launcher ─────────────────────────────────────────────────

function QuizSessionCard({ session, onStart }: { session: QuizSession; onStart: () => void }) {
  const t = useTheme();
  const modeColor = session.mode === 'exam'
    ? t.tbs
    : session.difficulty === 'easy'
    ? t.notes
    : t.mcq;

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200 cursor-pointer"
      style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      onClick={onStart}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.cardHoverShadow;
        (e.currentTarget as HTMLDivElement).style.borderColor = modeColor.border;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.cardShadow;
        (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder;
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-sm font-semibold" style={{ color: t.textPrimary }}>{session.title}</h3>
          <p className="text-xs mt-0.5" style={{ color: t.textTertiary }}>{session.description}</p>
        </div>
        <button
          className="ml-3 p-2 rounded-xl flex-shrink-0 transition-colors"
          style={{ backgroundColor: modeColor.bg, border: `1px solid ${modeColor.border}`, boxShadow: t.isDark ? `0 0 8px ${modeColor.border}30` : 'none' }}
        >
          <Play size={12} style={{ color: modeColor.text }} />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-md"
          style={{ backgroundColor: modeColor.bg, color: modeColor.text, border: `1px solid ${modeColor.border}` }}
        >
          {session.mode === 'exam' ? 'Exam' : 'Study'}
        </span>
        <span className="text-xs" style={{ color: t.textTertiary }}>{session.mcqIds.length} questions</span>
        {session.timeLimit && (
          <span className="text-xs flex items-center gap-1" style={{ color: t.textTertiary }}>
            <Clock size={10} />
            {session.timeLimit} min
          </span>
        )}
        <span
          className="text-xs px-2 py-0.5 rounded-md capitalize"
          style={{ backgroundColor: t.isDark ? '#0f172a' : '#f8fafc', color: t.textTertiary, border: `1px solid ${t.divider}` }}
        >
          {session.difficulty}
        </span>
      </div>
    </div>
  );
}

// ─── Main Quiz View ────────────────────────────────────────────────────────

export default function QuizView() {
  const { activeSection, activeUnit, activeQuizSession, setActiveQuizSession } = useAppStore();
  const t = useTheme();
  const units = cpaDatabase[activeSection] || [];

  // Resolve active unit
  const currentUnit = useMemo(
    () => (activeUnit ? units.find((u) => u.id === activeUnit) : units[0]),
    [activeUnit, units]
  );

  // Resolve active quiz session
  const currentSession = useMemo(
    () =>
      activeQuizSession && currentUnit
        ? currentUnit.quizSessions.find((s) => s.id === activeQuizSession)
        : null,
    [activeQuizSession, currentUnit]
  );

  // Build MCQ list for active session or all unit MCQs
  const sessionMcqs: MCQ[] = useMemo(() => {
    if (!currentUnit) return [];
    if (currentSession) {
      const idSet = new Set(currentSession.mcqIds);
      return currentUnit.allMcqs.filter((q) => idSet.has(q.id));
    }
    // Default: show all MCQs from the current unit's modules
    return currentUnit.allMcqs;
  }, [currentUnit, currentSession]);

  // ── Feedback state: keyed by question ID ─────────────────────────────────
  const [feedbackMap, setFeedbackMap] = useState<Record<string, QuestionFeedback>>({});

  const handleAnswer = useCallback((questionId: string, userSelection: string) => {
    const mcq = sessionMcqs.find((q) => q.id === questionId);
    if (!mcq) return;

    const correctOptionId = mcq.options.find((o) => o.isCorrect)?.id ?? '';
    const isCorrect = userSelection === correctOptionId;

    setFeedbackMap((prev) => ({
      ...prev,
      [questionId]: {
        userSelection,
        // Strict: showSuccess and showError are mutually exclusive
        showSuccess: isCorrect,
        showError: !isCorrect,
      },
    }));
  }, [sessionMcqs]);

  // ── Score calculation ─────────────────────────────────────────────────────
  const answeredCount = Object.keys(feedbackMap).length;
  const correctCount = Object.values(feedbackMap).filter((f) => f.showSuccess).length;
  const scorePercent = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  const scoreColor = scorePercent >= 75
    ? (t.isDark ? '#34d399' : '#059669')
    : scorePercent >= 50
    ? (t.isDark ? '#fbbf24' : '#d97706')
    : (t.isDark ? '#f87171' : '#dc2626');

  const resetSession = () => {
    setFeedbackMap({});
    setActiveQuizSession(undefined);
  };

  // ── Unit-level view: quiz sessions ───────────────────────────────────────
  const showSessionList = !activeQuizSession && currentUnit;

  if (!currentUnit) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96 text-center">
        <Terminal size={36} style={{ color: t.textTertiary }} className="mb-4" />
        <h2 className="text-base font-semibold" style={{ color: t.textPrimary }}>Select a unit to begin</h2>
        <p className="text-sm mt-1" style={{ color: t.textTertiary }}>Choose a unit from the sidebar to start quizzing.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: t.isDark ? '#1e293b' : '#0f172a', border: t.isDark ? '1px solid #334155' : 'none', boxShadow: t.isDark ? '0 0 12px rgba(34,211,238,0.1)' : 'none' }}
          >
            <Terminal size={16} style={{ color: t.isDark ? '#22d3ee' : '#ffffff' }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: t.textPrimary }}>
              {currentSession ? currentSession.title : `${currentUnit.code} — Quiz Terminal`}
            </h1>
            <p className="text-sm" style={{ color: t.textTertiary }}>
              {currentSession
                ? `${currentSession.mcqIds.length} questions · ${currentSession.mode} mode`
                : `${currentUnit.allMcqs.length} questions · AICPA-style practice`}
            </p>
          </div>
        </div>

        {/* Live score */}
        {answeredCount > 0 && (
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div
                className="text-xl font-bold"
                style={{ color: scoreColor, textShadow: t.isDark ? `0 0 10px ${scoreColor}60` : 'none' }}
              >
                {scorePercent}%
              </div>
              <div className="text-xs" style={{ color: t.textTertiary }}>{correctCount}/{answeredCount} correct</div>
            </div>
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{
                background: `conic-gradient(${scoreColor} ${scorePercent * 3.6}deg, ${t.isDark ? '#1e293b' : '#f1f5f9'} 0deg)`,
                boxShadow: t.isDark ? `0 0 14px ${scoreColor}40` : 'none',
              }}
            >
              <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: t.card }}>
                <Award size={14} style={{ color: t.textTertiary }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Unit selector strip */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
        {units.map((unit) => {
          const isActive = currentUnit.id === unit.id;
          const { setActiveUnit } = useAppStore.getState();
          return (
            <button
              key={unit.id}
              onClick={() => { setActiveUnit(unit.id); setFeedbackMap({}); }}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150"
              style={
                isActive
                  ? { backgroundColor: t.isDark ? '#22d3ee' : '#0f172a', color: t.isDark ? '#020617' : '#ffffff', boxShadow: t.isDark ? '0 0 10px rgba(34,211,238,0.3)' : 'none' }
                  : { backgroundColor: t.card, color: t.textSecondary, border: `1px solid ${t.cardBorder}` }
              }
            >
              {unit.code}
            </button>
          );
        })}
      </div>

      {/* ── Session list view ──────────────────────────────────────────────── */}
      {showSessionList && currentUnit.quizSessions.length > 0 && !activeQuizSession ? (
        <>
          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total MCQs', value: currentUnit.allMcqs.length, c: t.mcq },
              { label: 'Quiz Sessions', value: currentUnit.quizSessions.length, c: t.flash },
              { label: 'Flashcards', value: currentUnit.allFlashcards.length, c: t.glossary },
              { label: 'Completed', value: 0, c: t.notes },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-3 text-center border"
                style={{ backgroundColor: stat.c.bg, borderColor: stat.c.border, boxShadow: t.isDark ? `0 0 6px ${stat.c.border}20` : 'none' }}
              >
                <p className="text-lg font-bold" style={{ color: stat.c.text, textShadow: t.isDark ? `0 0 8px ${stat.c.text}60` : 'none' }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: stat.c.text, opacity: 0.75 }}>{stat.label}</p>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: t.textPrimary }}>
              <BarChart2 size={14} style={{ color: t.isDark ? '#22d3ee' : '#2563eb' }} />
              Quiz Sessions — {currentUnit.code}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentUnit.quizSessions.map((session) => (
                <QuizSessionCard
                  key={session.id}
                  session={session}
                  onStart={() => { setActiveQuizSession(session.id); setFeedbackMap({}); }}
                />
              ))}
            </div>
          </div>

          {/* Start all MCQs shortcut */}
          <div
            className="rounded-2xl p-5 flex items-center gap-4 cursor-pointer transition-all duration-200"
            style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}
            onClick={() => setActiveQuizSession('__all__')}
            onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = t.isDark ? '#22d3ee' : '#94a3b8'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder; }}
          >
            <div
              className="p-3 rounded-xl"
              style={{ backgroundColor: t.isDark ? '#1e293b' : '#f1f5f9', border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}` }}
            >
              <BookOpen size={16} style={{ color: t.isDark ? '#22d3ee' : '#0f172a' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold" style={{ color: t.textPrimary }}>All MCQs — Free Practice</p>
              <p className="text-xs" style={{ color: t.textTertiary }}>Work through all {currentUnit.allMcqs.length} questions in study mode with full feedback</p>
            </div>
            <ChevronRight size={16} style={{ color: t.textTertiary }} />
          </div>
        </>
      ) : null}

      {/* ── Active quiz: MCQ list ───────────────────────────────────────────── */}
      {(activeQuizSession || !currentUnit.quizSessions.length) && sessionMcqs.length > 0 ? (
        <>
          {/* Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium" style={{ color: t.textTertiary }}>
                {answeredCount}/{sessionMcqs.length} answered
              </span>
              {activeQuizSession && (
                <button
                  onClick={resetSession}
                  className="text-xs font-medium transition-colors"
                  style={{ color: t.isDark ? '#f87171' : '#dc2626' }}
                >
                  ← Back to Sessions
                </button>
              )}
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: t.isDark ? '#1e293b' : '#f1f5f9' }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${sessionMcqs.length > 0 ? (answeredCount / sessionMcqs.length) * 100 : 0}%`,
                  backgroundColor: t.isDark ? '#22d3ee' : '#0f172a',
                  boxShadow: t.isDark ? '0 0 6px rgba(34,211,238,0.5)' : 'none',
                }}
              />
            </div>
          </div>

          {/* Score summary banner after completion */}
          {answeredCount === sessionMcqs.length && sessionMcqs.length > 0 && (
            <div
              className="rounded-2xl p-5 flex items-center gap-4"
              style={{
                backgroundColor: scorePercent >= 75
                  ? (t.isDark ? 'rgba(52,211,153,0.08)' : '#ecfdf5')
                  : (t.isDark ? 'rgba(251,191,36,0.08)' : '#fffbeb'),
                border: `1px solid ${scorePercent >= 75 ? (t.isDark ? '#34d39940' : '#6ee7b7') : (t.isDark ? '#fbbf2440' : '#fde68a')}`,
              }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-lg"
                style={{
                  background: `conic-gradient(${scoreColor} ${scorePercent * 3.6}deg, ${t.isDark ? '#1e293b' : '#f1f5f9'} 0deg)`,
                  color: scoreColor,
                  boxShadow: t.isDark ? `0 0 16px ${scoreColor}40` : 'none',
                }}
              >
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ backgroundColor: t.card, color: scoreColor }}>
                  {scorePercent}%
                </div>
              </div>
              <div>
                <p className="text-base font-bold" style={{ color: t.textPrimary }}>
                  {scorePercent >= 75 ? 'Excellent Work!' : scorePercent >= 50 ? 'Good Progress' : 'Keep Studying'}
                </p>
                <p className="text-xs mt-0.5" style={{ color: t.textSecondary }}>
                  {correctCount} correct out of {sessionMcqs.length} · {scorePercent >= 75 ? 'You\'re exam-ready on this topic.' : 'Review the explanations and retry.'}
                </p>
              </div>
              <button
                className="ml-auto px-4 py-2 rounded-xl text-xs font-semibold transition-all"
                onClick={() => setFeedbackMap({})}
                style={{ backgroundColor: t.isDark ? '#1e293b' : '#0f172a', color: t.isDark ? '#22d3ee' : '#ffffff', border: t.isDark ? '1px solid #22d3ee40' : 'none' }}
              >
                Retry
              </button>
            </div>
          )}

          {/* MCQ cards */}
          <div className="space-y-4">
            {sessionMcqs.map((mcq, idx) => (
              <MCQCard
                key={mcq.id}
                mcq={mcq}
                index={idx}
                feedback={feedbackMap[mcq.id]}
                onAnswer={handleAnswer}
              />
            ))}
          </div>
        </>
      ) : null}

      {/* Empty state */}
      {sessionMcqs.length === 0 && !showSessionList && (
        <div
          className="rounded-2xl p-16 text-center"
          style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}
        >
          <Terminal size={36} className="mx-auto mb-4" style={{ color: t.textTertiary }} />
          <h2 className="text-base font-semibold" style={{ color: t.textPrimary }}>No questions in this session</h2>
          <p className="text-sm mt-1" style={{ color: t.textTertiary }}>Use the AI Generate panel to add MCQs.</p>
        </div>
      )}
    </div>
  );
}
