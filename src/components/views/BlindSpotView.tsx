'use client';

import { AlertTriangle, Target, TrendingDown, Brain, Zap } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { BlindSpot } from '@/lib/types';

type SeverityLevel = 'critical' | 'high' | 'medium';

interface SeverityConfig {
  bg: string;
  border: string;
  text: string;
  badge: string;
  stripe: string;
}

function getSeverityConfig(gap: number, isDark: boolean): { level: SeverityLevel; config: SeverityConfig } {
  if (gap >= 30) return {
    level: 'critical',
    config: isDark
      ? { bg: 'rgba(248,113,113,0.06)', border: '#f87171', text: '#f87171', badge: 'Critical Gap', stripe: '#f87171' }
      : { bg: '#fef2f2', border: '#fecaca', text: '#dc2626', badge: 'Critical Gap', stripe: '#dc2626' },
  };
  if (gap >= 20) return {
    level: 'high',
    config: isDark
      ? { bg: 'rgba(251,191,36,0.06)', border: '#fbbf24', text: '#fbbf24', badge: 'High Gap', stripe: '#fbbf24' }
      : { bg: '#fffbeb', border: '#fde68a', text: '#d97706', badge: 'High Gap', stripe: '#d97706' },
  };
  return {
    level: 'medium',
    config: isDark
      ? { bg: 'rgba(96,165,250,0.06)', border: '#60a5fa', text: '#60a5fa', badge: 'Moderate Gap', stripe: '#60a5fa' }
      : { bg: '#eff6ff', border: '#bfdbfe', text: '#2563eb', badge: 'Moderate Gap', stripe: '#2563eb' },
  };
}

function GapBar({ label, value, color, track, isDark }: { label: string; value: number; color: string; track: string; isDark: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1" style={{ color: track }}>
        <span>{label}</span>
        <span className="font-medium" style={{ color: isDark ? '#cbd5e1' : '#475569' }}>{value}%</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: isDark ? '#0f172a' : '#f1ebdd' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${value}%`,
            backgroundColor: color,
            boxShadow: isDark ? `0 0 6px ${color}80` : 'none',
          }}
        />
      </div>
    </div>
  );
}

function BlindSpotCard({ spot, rank }: { spot: BlindSpot & { unitCode: string }; rank: number }) {
  const t = useTheme();
  const gap = spot.selfConfidence - spot.actualScore;
  const { config } = getSeverityConfig(gap, t.isDark);

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ backgroundColor: t.card, border: `1px solid ${config.border}`, boxShadow: t.isDark ? `0 0 12px ${config.border}15` : t.cardShadow }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.isDark ? `0 0 20px ${config.border}30` : '0 6px 12px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.isDark ? `0 0 12px ${config.border}15` : t.cardShadow;
      }}
    >
      {/* Neon top stripe */}
      <div
        className="h-0.5 w-full"
        style={{
          backgroundColor: config.stripe,
          boxShadow: t.isDark ? `0 0 8px ${config.stripe}` : 'none',
        }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-2.5">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
              style={{ backgroundColor: config.text + (t.isDark ? '20' : '15'), color: config.text, border: `1px solid ${config.text}40`, boxShadow: t.isDark ? `0 0 8px ${config.text}40` : 'none' }}
            >
              {rank}
            </div>
            <div>
              <h3 className="text-sm font-semibold leading-tight" style={{ color: t.textPrimary }}>{spot.topicName}</h3>
              <span className="text-xs" style={{ color: t.textTertiary }}>{spot.unitCode} · {spot.attempts} attempts</span>
            </div>
          </div>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-lg flex-shrink-0"
            style={{ backgroundColor: config.bg, color: config.text, border: `1px solid ${config.border}` }}
          >
            {config.badge}
          </span>
        </div>

        {/* Gap badge */}
        <div
          className="flex items-center gap-2 p-3 rounded-xl mb-4"
          style={{ backgroundColor: config.bg, border: `1px solid ${config.border}` }}
        >
          <TrendingDown size={14} style={{ color: config.text }} />
          <span className="text-sm font-bold" style={{ color: config.text, textShadow: t.isDark ? `0 0 8px ${config.text}80` : 'none' }}>
            {gap}% Confidence Gap
          </span>
          <span className="text-xs ml-auto" style={{ color: config.text, opacity: 0.7 }}>
            {spot.selfConfidence}% → {spot.actualScore}%
          </span>
        </div>

        {/* Bars */}
        <div className="space-y-2.5">
          <GapBar label="Self-Confidence" value={spot.selfConfidence} color="#3b82f6" track={t.isDark ? '#94a3b8' : '#64748b'} isDark={t.isDark} />
          <GapBar
            label="Actual MCQ Score"
            value={spot.actualScore}
            color={spot.actualScore < 50 ? (t.isDark ? '#f87171' : '#ef4444') : spot.actualScore < 70 ? (t.isDark ? '#fbbf24' : '#f59e0b') : (t.isDark ? '#34d399' : '#10b981')}
            track={t.isDark ? '#94a3b8' : '#64748b'}
            isDark={t.isDark}
          />
        </div>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 py-2 px-3 rounded-xl text-xs font-medium transition-colors"
            style={{ backgroundColor: t.isDark ? '#0f172a' : t.muted, color: t.textSecondary, border: `1px solid ${t.isDark ? '#334155' : t.mutedBorder}` }}
          >
            Practice MCQs
          </button>
          <button
            className="flex-1 py-2 px-3 rounded-xl text-xs font-medium text-white transition-all hover:opacity-90"
            style={{
              backgroundColor: config.text,
              boxShadow: t.isDark ? `0 0 12px ${config.text}40` : 'none',
              color: t.isDark ? '#020617' : t.card,
            }}
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
  const t = useTheme();
  const units = cpaDatabase[activeSection] || [];

  const allBlindSpots = units
    .flatMap((u) => u.modules.flatMap((m) => m.blindSpots.map((bs) => ({ ...bs, unitCode: u.code }))))
    .sort((a, b) => b.gapScore - a.gapScore);

  const criticalCount = allBlindSpots.filter((b) => b.gapScore >= 30).length;
  const highCount = allBlindSpots.filter((b) => b.gapScore >= 20 && b.gapScore < 30).length;
  const avgGap = allBlindSpots.length > 0 ? Math.round(allBlindSpots.reduce((a, b) => a + b.gapScore, 0) / allBlindSpots.length) : 0;
  const avgScore = allBlindSpots.length > 0 ? Math.round(allBlindSpots.reduce((a, b) => a + b.actualScore, 0) / allBlindSpots.length) : 0;

  const summaryStats = [
    { label: 'Critical Gaps', value: criticalCount, sub: '≥30% gap', color: t.isDark ? '#f87171' : '#dc2626', border: t.isDark ? '#f8717140' : '#fecaca' },
    { label: 'High Gaps', value: highCount, sub: '20–29% gap', color: t.isDark ? '#fbbf24' : '#d97706', border: t.isDark ? '#fbbf2440' : '#fde68a' },
    { label: 'Avg Gap', value: `${avgGap}%`, sub: 'all blind spots', color: t.textPrimary, border: t.cardBorder },
    { label: 'Avg Score', value: `${avgScore}%`, sub: 'on flagged topics', color: t.textPrimary, border: t.cardBorder },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{ backgroundColor: t.isDark ? '#1e293b' : '#fef2f2', border: t.isDark ? '1px solid #334155' : '1px solid #fecaca', boxShadow: t.isDark ? '0 0 12px rgba(248,113,113,0.12)' : 'none' }}
        >
          <Brain size={16} style={{ color: t.isDark ? '#f87171' : '#dc2626' }} />
        </div>
        <div>
          <h1 className="text-lg font-bold" style={{ color: t.textPrimary }}>Blind Spot Detective</h1>
          <p className="text-sm" style={{ color: t.textTertiary }}>{activeSection} · AI-detected confidence-performance gaps</p>
        </div>
      </div>

      {allBlindSpots.length === 0 ? (
        <div
          className="rounded-2xl p-16 text-center"
          style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
        >
          <Target size={36} className="mx-auto mb-4" style={{ color: t.textTertiary }} />
          <h2 className="text-base font-semibold" style={{ color: t.textPrimary }}>No blind spots detected</h2>
          <p className="text-sm mt-1 max-w-sm mx-auto" style={{ color: t.textTertiary }}>
            Complete more MCQs and self-assessments to identify confidence-performance gaps.
          </p>
          <button
            onClick={() => setActiveTab('quiz')}
            className="mt-4 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
            style={{ backgroundColor: t.isDark ? '#1e293b' : t.navActiveBg, color: t.isDark ? '#22d3ee' : t.navActiveText, border: t.isDark ? '1px solid #22d3ee40' : 'none' }}
          >
            Start Practicing
          </button>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4"
                style={{ backgroundColor: t.card, border: `1px solid ${stat.border}`, boxShadow: t.isDark ? `0 0 8px ${stat.border}` : t.cardShadow }}
              >
                <p className="text-xs font-medium uppercase tracking-wider" style={{ color: t.textTertiary }}>{stat.label}</p>
                <p className="text-2xl font-bold mt-1" style={{ color: stat.color, textShadow: t.isDark && stat.color !== t.textPrimary ? `0 0 10px ${stat.color}60` : 'none' }}>
                  {stat.value}
                </p>
                <p className="text-xs mt-0.5" style={{ color: t.textTertiary }}>{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Alert banner */}
          <div
            className="flex items-start gap-3 p-4 rounded-xl"
            style={{
              backgroundColor: t.isDark ? 'rgba(248,113,113,0.08)' : '#fef2f2',
              border: `1px solid ${t.isDark ? '#f8717140' : '#fecaca'}`,
            }}
          >
            <AlertTriangle size={16} style={{ color: t.isDark ? '#f87171' : '#dc2626', flexShrink: 0, marginTop: 2 }} />
            <div>
              <p className="text-sm font-semibold" style={{ color: t.isDark ? '#f87171' : '#991b1b' }}>
                {allBlindSpots.length} blind spot{allBlindSpots.length > 1 ? 's' : ''} detected in {activeSection}
              </p>
              <p className="text-xs mt-0.5" style={{ color: t.isDark ? '#f8717180' : '#b91c1c' }}>
                These topics show a significant gap between perceived confidence and actual MCQ performance. Prioritize these areas.
              </p>
            </div>
          </div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allBlindSpots.map((spot, idx) => (
              <BlindSpotCard key={spot.topicId} spot={spot} rank={idx + 1} />
            ))}
          </div>

          {/* Recommendations */}
          <div
            className="rounded-2xl p-5"
            style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap size={14} style={{ color: t.isDark ? '#fbbf24' : '#f59e0b', filter: t.isDark ? 'drop-shadow(0 0 4px #fbbf24)' : 'none' }} />
              <h2 className="text-sm font-semibold" style={{ color: t.textPrimary }}>AI Study Recommendations</h2>
            </div>
            <div className="space-y-2">
              {[
                'Re-read concept notes before attempting more MCQs on your blind spot topics.',
                'Use spaced repetition: revisit these topics in 1, 3, and 7 days.',
                'Practice TBS simulations — they reveal nuances missed in MCQ practice.',
                'After scoring 80%+ on two consecutive attempts, graduate the topic from blind spots.',
              ].map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <div
                    className="w-5 h-5 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      backgroundColor: t.isDark ? '#1e293b' : t.navActiveBg,
                      color: t.isDark ? '#22d3ee' : t.navActiveText,
                      border: t.isDark ? '1px solid #22d3ee40' : 'none',
                      boxShadow: t.isDark ? '0 0 6px rgba(34,211,238,0.3)' : 'none',
                    }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: t.textSecondary }}>{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
