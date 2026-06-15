'use client';

import { AlertTriangle, Target, TrendingDown, Brain, ChevronRight, Zap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cpaDatabase } from '@/data/cpaDatabase';
import { BlindSpot } from '@/lib/types';

function ConfidenceGapBar({ confidence, actual }: { confidence: number; actual: number }) {
  return (
    <div className="space-y-1.5">
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Self-Confidence</span>
          <span className="font-medium text-slate-700">{confidence}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{ width: `${confidence}%`, backgroundColor: '#3b82f6' }}
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs text-slate-500 mb-1">
          <span>Actual MCQ Score</span>
          <span className="font-medium text-slate-700">{actual}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${actual}%`,
              backgroundColor: actual < 50 ? '#ef4444' : actual < 70 ? '#f59e0b' : '#10b981',
            }}
          />
        </div>
      </div>
    </div>
  );
}

function BlindSpotCard({ spot, rank }: { spot: BlindSpot & { unitCode: string }; rank: number }) {
  const gap = spot.selfConfidence - spot.actualScore;
  const severity = gap >= 30 ? 'critical' : gap >= 20 ? 'high' : 'medium';

  const severityConfig = {
    critical: { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', badge: 'Critical Gap', badgeBg: '#fef2f2', badgeBorder: '#fecaca' },
    high: { bg: '#fffbeb', border: '#fde68a', text: '#d97706', badge: 'High Gap', badgeBg: '#fffbeb', badgeBorder: '#fde68a' },
    medium: { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb', badge: 'Moderate Gap', badgeBg: '#eff6ff', badgeBorder: '#bfdbfe' },
  };

  const config = severityConfig[severity];

  return (
    <div
      className="bg-white rounded-2xl border shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.06)] transition-all duration-200 overflow-hidden"
      style={{ borderColor: config.border }}
    >
      {/* Top stripe */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: config.text }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white flex-shrink-0 mt-0.5"
              style={{ backgroundColor: config.text }}
            >
              {rank}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-800 leading-tight">{spot.topicName}</h3>
              <span className="text-xs text-slate-400">{spot.unitCode} · {spot.attempts} attempts</span>
            </div>
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-lg border flex-shrink-0"
            style={{ backgroundColor: config.badgeBg, borderColor: config.badgeBorder, color: config.text }}
          >
            {config.badge}
          </span>
        </div>

        {/* Gap highlight */}
        <div
          className="flex items-center gap-2 p-3 rounded-xl mb-4"
          style={{ backgroundColor: config.bg, border: `1px solid ${config.border}` }}
        >
          <TrendingDown size={14} style={{ color: config.text }} />
          <span className="text-sm font-bold" style={{ color: config.text }}>
            {gap}% Confidence Gap
          </span>
          <span className="text-xs ml-auto" style={{ color: config.text, opacity: 0.7 }}>
            Thought {spot.selfConfidence}%, Scored {spot.actualScore}%
          </span>
        </div>

        {/* Bars */}
        <ConfidenceGapBar confidence={spot.selfConfidence} actual={spot.actualScore} />

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 py-2 px-3 rounded-xl text-xs font-medium border transition-colors hover:bg-slate-50"
            style={{ borderColor: '#e2e8f0', color: '#334155' }}
          >
            Practice MCQs
          </button>
          <button
            className="flex-1 py-2 px-3 rounded-xl text-xs font-medium text-white transition-colors hover:opacity-90"
            style={{ backgroundColor: config.text }}
          >
            Review Notes
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BlindSpotView() {
  const { activeSection, setActiveTab } = useAppStore();
  const units = cpaDatabase[activeSection] || [];

  const allBlindSpots = units.flatMap((u) =>
    u.modules.flatMap((m) =>
      m.blindSpots.map((bs) => ({
        ...bs,
        unitCode: u.code,
      }))
    )
  ).sort((a, b) => b.gapScore - a.gapScore);

  const criticalCount = allBlindSpots.filter((b) => b.gapScore >= 30).length;
  const highCount = allBlindSpots.filter((b) => b.gapScore >= 20 && b.gapScore < 30).length;
  const avgGap = allBlindSpots.length > 0
    ? Math.round(allBlindSpots.reduce((a, b) => a + b.gapScore, 0) / allBlindSpots.length)
    : 0;
  const avgScore = allBlindSpots.length > 0
    ? Math.round(allBlindSpots.reduce((a, b) => a + b.actualScore, 0) / allBlindSpots.length)
    : 0;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-slate-900">
          <Brain size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Blind Spot Detective</h1>
          <p className="text-sm text-slate-400">{activeSection} · AI-detected confidence-performance gaps</p>
        </div>
      </div>

      {allBlindSpots.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-16 text-center shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
          <Target size={36} className="text-slate-200 mx-auto mb-4" />
          <h2 className="text-base font-semibold text-slate-700">No blind spots detected</h2>
          <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
            Complete more MCQs and self-assessment surveys to identify areas where your confidence exceeds your performance.
          </p>
          <button
            onClick={() => setActiveTab('quiz')}
            className="mt-4 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            Start Practicing
          </button>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl border border-red-200 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
              <p className="text-xs font-medium text-red-400 uppercase tracking-wider">Critical Gaps</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{criticalCount}</p>
              <p className="text-xs text-red-400 mt-0.5">≥30% confidence gap</p>
            </div>
            <div className="bg-white rounded-2xl border border-amber-200 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
              <p className="text-xs font-medium text-amber-400 uppercase tracking-wider">High Gaps</p>
              <p className="text-2xl font-bold text-amber-600 mt-1">{highCount}</p>
              <p className="text-xs text-amber-400 mt-0.5">20–29% gap</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Gap</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{avgGap}%</p>
              <p className="text-xs text-slate-400 mt-0.5">across all blind spots</p>
            </div>
            <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
              <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Avg Score</p>
              <p className="text-2xl font-bold text-slate-800 mt-1">{avgScore}%</p>
              <p className="text-xs text-slate-400 mt-0.5">on blind spot topics</p>
            </div>
          </div>

          {/* Alert banner */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">
                {allBlindSpots.length} blind spot{allBlindSpots.length > 1 ? 's' : ''} detected in {activeSection}
              </p>
              <p className="text-xs text-red-600 mt-0.5">
                These topics show a significant gap between your perceived confidence and actual MCQ performance. Prioritize these areas in your study plan.
              </p>
            </div>
          </div>

          {/* Blind spot cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allBlindSpots.map((spot, idx) => (
              <BlindSpotCard key={spot.topicId} spot={spot} rank={idx + 1} />
            ))}
          </div>

          {/* Study recommendations */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} className="text-amber-500" />
              <h2 className="text-sm font-semibold text-slate-800">AI Study Recommendations</h2>
            </div>
            <div className="space-y-2">
              {[
                'Re-read concept notes before attempting more MCQs on your blind spot topics.',
                'Use spaced repetition: revisit these topics in 1, 3, and 7 days.',
                'Practice TBS simulations, which often reveal nuances missed in MCQ practice.',
                'After scoring 80%+ on two consecutive attempts, graduate the topic from blind spots.',
              ].map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
