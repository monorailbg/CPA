'use client';

import { useState, useCallback, useEffect } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Star, StarOff, Layers, Zap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Flashcard } from '@/lib/types';

const MASTERY_LABELS = ['Not Started', 'Learning', 'Familiar', 'Confident', 'Strong', 'Mastered'];

function getMasteryColor(level: number, isDark: boolean): string {
  const darkColors = ['#334155', '#fb923c', '#fbbf24', '#60a5fa', '#34d399', '#a78bfa'];
  const lightColors = ['#94a3b8', '#f97316', '#f59e0b', '#3b82f6', '#10b981', '#7c3aed'];
  return isDark ? darkColors[level] : lightColors[level];
}

function FlashcardComponent({ card }: { card: Flashcard }) {
  const [flipped, setFlipped] = useState(false);
  const t = useTheme();
  const mastColor = getMasteryColor(card.masteryLevel, t.isDark);

  return (
    <div
      className="relative w-full cursor-pointer select-none"
      style={{ perspective: '1200px', height: '320px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            backgroundColor: t.card,
            border: `2px solid ${t.isDark ? '#334155' : '#e2e8f0'}`,
            boxShadow: t.isDark ? '0 0 0 1px rgba(255,255,255,0.03)' : t.cardShadow,
          }}
        >
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: t.flash.bg, color: t.flash.text, border: `1px solid ${t.flash.border}` }}
            >
              {card.topic}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full transition-colors"
                  style={{
                    backgroundColor: i < card.masteryLevel ? mastColor : (t.isDark ? '#1e293b' : '#e2e8f0'),
                    boxShadow: i < card.masteryLevel && t.isDark ? `0 0 4px ${mastColor}` : 'none',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-center max-w-md mt-4">
            <p className="text-xs font-medium mb-3 uppercase tracking-widest" style={{ color: t.textTertiary }}>Question</p>
            <p className="text-lg font-semibold leading-relaxed" style={{ color: t.textPrimary }}>{card.front}</p>
          </div>

          <p className="absolute bottom-4 text-xs" style={{ color: t.textTertiary }}>Click to reveal answer</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl p-8 flex flex-col items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: t.isDark ? '#0f172a' : '#0f172a',
            border: t.isDark ? `2px solid #22d3ee40` : `2px solid #334155`,
            boxShadow: t.isDark ? '0 0 30px rgba(34,211,238,0.08)' : 'none',
          }}
        >
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg" style={{ backgroundColor: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
              Answer
            </span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-md"
              style={{ backgroundColor: mastColor + '25', color: mastColor, border: `1px solid ${mastColor}50` }}
            >
              {MASTERY_LABELS[card.masteryLevel]}
            </span>
          </div>

          <div className="text-center max-w-md mt-4">
            <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: '#cbd5e1' }}>{card.back}</p>
          </div>

          <div className="absolute bottom-4 flex flex-wrap gap-1.5 justify-center">
            {card.tags.map((tag) => (
              <span key={tag} className="text-xs px-2 py-0.5 rounded-md" style={{ color: 'rgba(255,255,255,0.3)', backgroundColor: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FlashcardView() {
  const { activeSection, activeUnit } = useAppStore();
  const t = useTheme();
  const units = cpaDatabase[activeSection] || [];
  const selectedUnit = activeUnit ? units.find((u) => u.id === activeUnit) : undefined;
  const allCards: Flashcard[] = selectedUnit
    ? selectedUnit.allFlashcards
    : units.flatMap((u) => u.allFlashcards);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [activeUnit, activeSection]);

  const totalCards = allCards.length;
  const currentCard = allCards[currentIndex];
  const prev = useCallback(() => setCurrentIndex((i) => (i > 0 ? i - 1 : totalCards - 1)), [totalCards]);
  const next = useCallback(() => setCurrentIndex((i) => (i < totalCards - 1 ? i + 1 : 0)), [totalCards]);

  const masteryDist = [0, 1, 2, 3, 4, 5].map((level) => ({
    level,
    count: allCards.filter((c) => c.masteryLevel === level).length,
    label: MASTERY_LABELS[level],
    color: getMasteryColor(level, t.isDark),
  }));

  if (totalCards === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96 text-center">
        <Layers size={32} style={{ color: t.textTertiary }} className="mb-3" />
        <h2 className="text-base font-semibold" style={{ color: t.textPrimary }}>No flashcards yet</h2>
        <p className="text-sm mt-1" style={{ color: t.textTertiary }}>Generate flashcards using the AI panel.</p>
      </div>
    );
  }

  const progressPct = ((currentIndex + 1) / totalCards) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold" style={{ color: t.textPrimary }}>Flashcard Engine</h1>
          <p className="text-sm" style={{ color: t.textTertiary }}>
            {activeSection}{selectedUnit ? ` · ${selectedUnit.code} — ${selectedUnit.name}` : ''} · Spaced Repetition
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: t.textTertiary }}>
            {currentIndex + 1} / {totalCards}
          </span>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: t.flash.bg, color: t.flash.text, border: `1px solid ${t.flash.border}` }}
          >
            {Math.round(progressPct)}%
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: t.isDark ? '#1e293b' : '#f1f5f9' }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progressPct}%`,
            backgroundColor: t.isDark ? '#60a5fa' : '#4338ca',
            boxShadow: t.isDark ? '0 0 8px rgba(96,165,250,0.6)' : 'none',
          }}
        />
      </div>

      {/* Card */}
      {currentCard && <FlashcardComponent card={currentCard} />}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, color: t.textSecondary }}
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="flex items-center gap-2">
          {[
            { icon: StarOff, color: t.textTertiary },
            { icon: Star, color: t.isDark ? '#fbbf24' : '#f59e0b' },
            { icon: RotateCcw, color: t.textTertiary },
          ].map(({ icon: Icon, color }, i) => (
            <button
              key={i}
              className="p-2 rounded-xl transition-colors"
              style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}
            >
              <Icon size={16} style={{ color }} />
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
          style={{
            backgroundColor: t.isDark ? '#1e293b' : '#0f172a',
            color: t.isDark ? '#22d3ee' : '#ffffff',
            border: t.isDark ? '1px solid #22d3ee40' : 'none',
            boxShadow: t.isDark ? '0 0 10px rgba(34,211,238,0.15)' : 'none',
          }}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Mastery distribution */}
      <div
        className="rounded-2xl p-5"
        style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} style={{ color: t.isDark ? '#fbbf24' : '#f59e0b' }} />
          <h2 className="text-sm font-semibold" style={{ color: t.textPrimary }}>Mastery Distribution</h2>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {masteryDist.map(({ level, count, label, color }) => (
            <div key={level} className="text-center">
              <div className="h-16 rounded-lg overflow-hidden flex items-end" style={{ backgroundColor: t.isDark ? '#0f172a' : '#f8fafc' }}>
                <div
                  className="w-full rounded-lg transition-all duration-500"
                  style={{
                    height: `${totalCards > 0 ? (count / totalCards) * 100 : 0}%`,
                    backgroundColor: color,
                    minHeight: count > 0 ? '8px' : '0',
                    boxShadow: t.isDark && count > 0 ? `0 0 8px ${color}60` : 'none',
                  }}
                />
              </div>
              <p className="text-xs font-bold mt-1" style={{ color }}>{count}</p>
              <p className="text-xs leading-tight mt-0.5" style={{ color: t.textTertiary }}>{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Card list */}
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}>
        <div className="p-4" style={{ borderBottom: `1px solid ${t.divider}` }}>
          <h2 className="text-sm font-semibold" style={{ color: t.textPrimary }}>All Cards ({totalCards})</h2>
        </div>
        <div>
          {allCards.map((card, idx) => {
            const mColor = getMasteryColor(card.masteryLevel, t.isDark);
            return (
              <button
                key={card.id}
                onClick={() => setCurrentIndex(idx)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors"
                style={{
                  backgroundColor: idx === currentIndex ? (t.isDark ? '#0f172a' : '#f8fafc') : 'transparent',
                  borderBottom: `1px solid ${t.divider}`,
                }}
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: mColor, boxShadow: t.isDark ? `0 0 4px ${mColor}` : 'none' }} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate" style={{ color: t.textPrimary }}>{card.front}</p>
                  <p className="text-xs" style={{ color: t.textTertiary }}>{card.topic}</p>
                </div>
                <span className="text-xs" style={{ color: t.textTertiary }}>{MASTERY_LABELS[card.masteryLevel]}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
