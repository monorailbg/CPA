'use client';

import { TrendingUp, Flame, Clock, Target, CheckSquare, Brain, BarChart3, ChevronRight, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Unit } from '@/lib/types';

function StatCard({ icon: Icon, label, value, sub, accentColor }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accentColor: string;
}) {
  const t = useTheme();

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200 cursor-default group"
      style={{
        backgroundColor: t.card,
        border: `1px solid ${t.cardBorder}`,
        boxShadow: t.cardShadow,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.cardHoverShadow;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.borderColor = t.isDark ? accentColor : t.cardBorder;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.cardShadow;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder;
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: t.textTertiary }}>{label}</p>
          <p className="text-2xl font-bold mt-1" style={{ color: t.isDark ? '#ffffff' : '#0f172a' }}>{value}</p>
          {sub && <p className="text-xs mt-0.5" style={{ color: t.textTertiary }}>{sub}</p>}
        </div>
        <div
          className="p-2.5 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: accentColor + (t.isDark ? '15' : '12'),
            border: t.isDark ? `1px solid ${accentColor}40` : 'none',
          }}
        >
          <Icon size={18} style={{ color: accentColor, filter: t.isDark ? `drop-shadow(0 0 4px ${accentColor}80)` : 'none' }} />
        </div>
      </div>
    </div>
  );
}

function UnitProgressCard({ unit }: { unit: Unit }) {
  const { setActiveUnit, setActiveTab } = useAppStore();
  const t = useTheme();

  const totalMCQ = unit.modules.reduce((a, m) => a + m.metrics.mcqTotal, 0);
  const doneMCQ = unit.modules.reduce((a, m) => a + m.metrics.mcqCompleted, 0);
  const totalTBS = unit.modules.reduce((a, m) => a + m.metrics.tbsTotal, 0);
  const doneTBS = unit.modules.reduce((a, m) => a + m.metrics.tbsCompleted, 0);
  const avgFlash = unit.modules.length > 0
    ? Math.round(unit.modules.reduce((a, m) => a + m.metrics.flashcardMastery, 0) / unit.modules.length)
    : 0;
  const blindSpotCount = unit.modules.reduce((a, m) => a + m.blindSpots.length, 0);

  const progressColor = unit.totalProgress >= 75
    ? (t.isDark ? '#34d399' : '#10b981')
    : unit.totalProgress >= 40
    ? (t.isDark ? '#60a5fa' : '#2563eb')
    : (t.isDark ? '#475569' : '#94a3b8');

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200 cursor-pointer"
      style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      onClick={() => { setActiveUnit(unit.id); setActiveTab('quiz'); }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.cardHoverShadow;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.borderColor = t.isDark ? '#60a5fa' : '#94a3b8';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.cardShadow;
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder;
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-md"
              style={{ backgroundColor: t.isDark ? '#0f172a' : '#f1f5f9', color: t.isDark ? '#94a3b8' : '#475569', border: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}` }}
            >
              {unit.code}
            </span>
            {unit.isActive && (
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-md"
                style={{ backgroundColor: t.mcq.bg, color: t.mcq.text, border: `1px solid ${t.mcq.border}` }}
              >
                Active
              </span>
            )}
          </div>
          <h3 className="text-sm font-semibold mt-1.5 leading-tight line-clamp-2" style={{ color: t.textPrimary }}>
            {unit.name}
          </h3>
        </div>
        <ChevronRight size={15} style={{ color: t.textTertiary, flexShrink: 0, marginTop: 4 }} />
      </div>

      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs" style={{ color: t.textTertiary }}>Progress</span>
          <span className="text-xs font-bold" style={{ color: t.isDark ? '#ffffff' : '#0f172a' }}>{unit.totalProgress}%</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: t.isDark ? '#0f172a' : '#f1f5f9' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${unit.totalProgress}%`,
              backgroundColor: progressColor,
              boxShadow: t.isDark && unit.totalProgress > 0 ? `0 0 6px ${progressColor}80` : 'none',
            }}
          />
        </div>
      </div>

      {/* Metric chips */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { value: `${doneMCQ}/${totalMCQ}`, label: 'MCQs', ...t.mcq },
          { value: `${doneTBS}/${totalTBS}`, label: 'TBS', ...t.tbs },
          { value: `${avgFlash}%`, label: 'Cards', ...t.flash },
        ].map((chip) => (
          <div
            key={chip.label}
            className="rounded-xl p-2.5 text-center"
            style={{ backgroundColor: chip.bg, border: `1px solid ${chip.border}` }}
          >
            <p className="text-xs font-bold" style={{ color: chip.text }}>{chip.value}</p>
            <p className="text-xs mt-0.5" style={{ color: chip.text, opacity: 0.75 }}>{chip.label}</p>
          </div>
        ))}
      </div>

      {/* Blind spot warning */}
      {blindSpotCount > 0 && (
        <div
          className="mt-3 flex items-center gap-1.5 text-xs rounded-lg px-2.5 py-1.5"
          style={{ backgroundColor: t.tbs.bg, color: t.tbs.text, border: `1px solid ${t.tbs.border}` }}
        >
          <AlertTriangle size={11} />
          <span>{blindSpotCount} blind spot{blindSpotCount > 1 ? 's' : ''}</span>
        </div>
      )}

      {unit.lastStudied && (
        <p className="text-xs mt-3" style={{ color: t.textTertiary }}>Last: {unit.lastStudied}</p>
      )}
    </div>
  );
}

export default function DashboardView() {
  const { activeSection, sectionProgress } = useAppStore();
  const t = useTheme();
  const units = cpaDatabase[activeSection] || [];
  const progress = sectionProgress[activeSection];

  const totalMCQDone = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqCompleted, 0), 0);
  const totalMCQ = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqTotal, 0), 0);
  const totalTBSDone = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.tbsCompleted, 0), 0);
  const totalTBS = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.tbsTotal, 0), 0);
  const avgFlash = units.length > 0
    ? Math.round(units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.flashcardMastery, 0) / Math.max(u.modules.length, 1), 0) / units.length)
    : 0;
  const totalBlindSpots = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.blindSpots.length, 0), 0);
  const totalCorrect = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqCorrect, 0), 0);
  const accuracy = totalMCQDone > 0 ? `${Math.round((totalCorrect / totalMCQDone) * 100)}%` : 'N/A';

  const statCards = [
    { icon: TrendingUp, label: 'Overall Progress', value: `${progress.overallProgress}%`, sub: `${progress.totalStudyHours}h studied`, color: t.isDark ? '#22d3ee' : '#2563eb' },
    { icon: Flame, label: 'Study Streak', value: `${progress.studyStreak}d`, sub: 'consecutive days', color: t.isDark ? '#fbbf24' : '#f59e0b' },
    { icon: CheckSquare, label: 'MCQs Done', value: totalMCQDone, sub: `of ${totalMCQ} total`, color: t.isDark ? '#22d3ee' : '#0ea5e9' },
    { icon: Brain, label: 'Flashcard Mastery', value: `${avgFlash}%`, sub: 'avg across units', color: t.isDark ? '#a78bfa' : '#8b5cf6' },
    { icon: Target, label: 'TBS Completed', value: totalTBSDone, sub: `of ${totalTBS} simulations`, color: t.isDark ? '#34d399' : '#10b981' },
    { icon: AlertTriangle, label: 'Blind Spots', value: totalBlindSpots, sub: 'need attention', color: t.isDark ? '#fb923c' : '#f97316' },
    { icon: Clock, label: 'Est. Remaining', value: `${progress.estimatedHoursRemaining}h`, sub: 'to exam readiness', color: t.isDark ? '#60a5fa' : '#6366f1' },
    { icon: BarChart3, label: 'Accuracy Rate', value: accuracy, sub: 'MCQ accuracy', color: t.isDark ? '#34d399' : '#14b8a6' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: t.textPrimary }}>
          {activeSection} — Study Dashboard
        </h1>
        <p className="text-sm mt-1" style={{ color: t.textTertiary }}>
          {progress.totalUnits} units · {progress.estimatedHoursRemaining}h remaining · {progress.totalStudyHours}h logged
        </p>
      </div>

      {/* Stat grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card) => (
          <StatCard key={card.label} icon={card.icon} label={card.label} value={card.value} sub={card.sub} accentColor={card.color} />
        ))}
      </div>

      {/* Unit overview bar chart */}
      <div
        className="rounded-2xl p-5"
        style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold" style={{ color: t.textPrimary }}>Unit Completion Overview</h2>
          <span className="text-xs" style={{ color: t.textTertiary }}>
            {units.filter(u => u.totalProgress >= 80).length}/{units.length} units &gt;80%
          </span>
        </div>
        <div className="space-y-3">
          {units.map((unit) => {
            const barColor = unit.totalProgress >= 75
              ? (t.isDark ? '#34d399' : '#10b981')
              : unit.totalProgress >= 40
              ? (t.isDark ? '#60a5fa' : '#2563eb')
              : (t.isDark ? '#334155' : '#94a3b8');

            return (
              <div key={unit.id} className="flex items-center gap-3">
                <span className="text-xs font-bold w-8 flex-shrink-0" style={{ color: t.isDark ? '#94a3b8' : '#64748b' }}>
                  {unit.code}
                </span>
                <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ backgroundColor: t.isDark ? '#0f172a' : '#f1f5f9' }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${unit.totalProgress}%`,
                      backgroundColor: barColor,
                      boxShadow: t.isDark && unit.totalProgress > 0 ? `0 0 6px ${barColor}70` : 'none',
                    }}
                  />
                </div>
                <span className="text-xs w-8 text-right" style={{ color: t.textTertiary }}>{unit.totalProgress}%</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Unit cards grid */}
      <div>
        <h2 className="text-sm font-semibold mb-3" style={{ color: t.textPrimary }}>Study Units</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map((unit) => (
            <UnitProgressCard key={unit.id} unit={unit} />
          ))}
        </div>
      </div>
    </div>
  );
}
