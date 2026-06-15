'use client';

import { useState, useCallback } from 'react';
import { RotateCcw, ChevronLeft, ChevronRight, Star, StarOff, Layers, Zap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Flashcard } from '@/lib/types';

const MASTERY_LABELS = ['Not Started', 'Learning', 'Familiar', 'Confident', 'Strong', 'Mastered'];
const MASTERY_COLORS = ['#94a3b8', '#f97316', '#f59e0b', '#3b82f6', '#10b981', '#7c3aed'];

function FlashcardComponent({ card }: { card: Flashcard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative w-full cursor-pointer"
      style={{ perspective: '1200px', height: '320px' }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 bg-white rounded-2xl border-2 border-slate-200 p-8 flex flex-col items-center justify-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: '#eef2ff', color: '#4338ca', border: '1px solid #c7d2fe' }}
            >
              {card.topic}
            </span>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: i < card.masteryLevel ? MASTERY_COLORS[card.masteryLevel] : '#e2e8f0',
                  }}
                />
              ))}
            </div>
          </div>

          <div className="text-center max-w-md mt-4">
            <p className="text-sm text-slate-400 mb-3 font-medium">QUESTION</p>
            <p className="text-lg font-semibold text-slate-800 leading-relaxed">{card.front}</p>
          </div>

          <p className="absolute bottom-4 text-xs text-slate-300">Click to reveal answer</p>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 bg-slate-900 rounded-2xl border-2 border-slate-700 p-8 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-white/10 text-white/60">
              ANSWER
            </span>
            <span
              className="text-xs font-medium px-2 py-0.5 rounded-md"
              style={{ backgroundColor: MASTERY_COLORS[card.masteryLevel] + '30', color: MASTERY_COLORS[card.masteryLevel] }}
            >
              {MASTERY_LABELS[card.masteryLevel]}
            </span>
          </div>

          <div className="text-center max-w-md mt-4">
            <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{card.back}</p>
          </div>

          <div className="absolute bottom-4 flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span key={tag} className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded-md">
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
  const units = cpaDatabase[activeSection] || [];

  const allCards: Flashcard[] = units.flatMap((u) => u.modules.flatMap((m) => m.flashcards));
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalCards = allCards.length;
  const currentCard = allCards[currentIndex];

  const prev = useCallback(() => setCurrentIndex((i) => (i > 0 ? i - 1 : totalCards - 1)), [totalCards]);
  const next = useCallback(() => setCurrentIndex((i) => (i < totalCards - 1 ? i + 1 : 0)), [totalCards]);

  const masteryDist = [0, 1, 2, 3, 4, 5].map((level) => ({
    level,
    count: allCards.filter((c) => c.masteryLevel === level).length,
    label: MASTERY_LABELS[level],
    color: MASTERY_COLORS[level],
  }));

  if (totalCards === 0) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-96 text-center">
        <Layers size={32} className="text-slate-300 mb-3" />
        <h2 className="text-base font-semibold text-slate-700">No flashcards yet</h2>
        <p className="text-sm text-slate-400 mt-1">Generate flashcards using the AI panel to start studying.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Flashcard Engine</h1>
          <p className="text-sm text-slate-400">{activeSection} · Spaced Repetition Review</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Card {currentIndex + 1} of {totalCards}</span>
          <span
            className="text-xs font-semibold px-3 py-1 rounded-full"
            style={{ backgroundColor: '#eef2ff', color: '#4338ca', border: '1px solid #c7d2fe' }}
          >
            {Math.round(((currentIndex + 1) / totalCards) * 100)}% through deck
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / totalCards) * 100}%`, backgroundColor: '#4338ca' }}
        />
      </div>

      {/* Main card */}
      {currentCard && <FlashcardComponent card={currentCard} />}

      {/* Navigation controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={prev}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ChevronLeft size={16} />
          Previous
        </button>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
            <StarOff size={16} />
          </button>
          <button className="p-2 rounded-xl border border-slate-200 text-amber-400 hover:bg-amber-50 transition-colors">
            <Star size={16} />
          </button>
          <button className="p-2 rounded-xl border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors">
            <RotateCcw size={16} />
          </button>
        </div>

        <button
          onClick={next}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Mastery distribution */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2 mb-4">
          <Zap size={14} className="text-slate-400" />
          <h2 className="text-sm font-semibold text-slate-800">Mastery Distribution</h2>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {masteryDist.map(({ level, count, label, color }) => (
            <div key={level} className="text-center">
              <div className="h-16 bg-slate-100 rounded-lg overflow-hidden flex items-end">
                <div
                  className="w-full rounded-lg transition-all duration-500"
                  style={{
                    height: `${totalCards > 0 ? (count / totalCards) * 100 : 0}%`,
                    backgroundColor: color,
                    minHeight: count > 0 ? '8px' : '0',
                  }}
                />
              </div>
              <p className="text-xs font-bold mt-1" style={{ color }}>{count}</p>
              <p className="text-xs text-slate-400 leading-tight mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* All cards list */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800">All Cards ({totalCards})</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {allCards.map((card, idx) => (
            <button
              key={card.id}
              onClick={() => setCurrentIndex(idx)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-slate-50 ${
                idx === currentIndex ? 'bg-slate-50' : ''
              }`}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: MASTERY_COLORS[card.masteryLevel] }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-700 truncate">{card.front}</p>
                <p className="text-xs text-slate-400">{card.topic}</p>
              </div>
              <span className="text-xs text-slate-300">{MASTERY_LABELS[card.masteryLevel]}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
