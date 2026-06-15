'use client';

import { TrendingUp, Flame, Clock, Target, BookOpen, CheckSquare, Brain, BarChart3, ChevronRight, AlertTriangle } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Unit } from '@/lib/types';

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-0.5">{sub}</p>}
        </div>
        <div className={`p-2.5 rounded-xl`} style={{ backgroundColor: color + '18' }}>
          <Icon size={18} style={{ color }} />
        </div>
      </div>
    </div>
  );
}

function UnitProgressCard({ unit }: { unit: Unit }) {
  const { setActiveUnit, setActiveTab } = useAppStore();
  const totalMCQ = unit.modules.reduce((a, m) => a + m.metrics.mcqTotal, 0);
  const doneMCQ = unit.modules.reduce((a, m) => a + m.metrics.mcqCompleted, 0);
  const totalTBS = unit.modules.reduce((a, m) => a + m.metrics.tbsTotal, 0);
  const doneTBS = unit.modules.reduce((a, m) => a + m.metrics.tbsCompleted, 0);
  const avgFlash = unit.modules.length > 0
    ? Math.round(unit.modules.reduce((a, m) => a + m.metrics.flashcardMastery, 0) / unit.modules.length)
    : 0;

  const blindSpotCount = unit.modules.reduce((a, m) => a + m.blindSpots.length, 0);

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_12px_-2px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
      onClick={() => { setActiveUnit(unit.id); setActiveTab('quiz'); }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">{unit.code}</span>
            {unit.isActive && (
              <span className="text-xs font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">Active</span>
            )}
          </div>
          <h3 className="text-sm font-semibold text-slate-800 mt-1.5 leading-tight line-clamp-2">{unit.name}</h3>
        </div>
        <ChevronRight size={15} className="text-slate-300 flex-shrink-0 mt-1" />
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-400">Overall Progress</span>
          <span className="text-xs font-bold text-slate-700">{unit.totalProgress}%</span>
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${unit.totalProgress}%`,
              background: unit.totalProgress >= 75
                ? '#10b981'
                : unit.totalProgress >= 40
                ? '#2563eb'
                : '#94a3b8',
            }}
          />
        </div>
      </div>

      {/* Metric Chips */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <p className="text-xs font-bold" style={{ color: '#1d4ed8' }}>{doneMCQ}/{totalMCQ}</p>
          <p className="text-xs mt-0.5" style={{ color: '#3b82f6' }}>MCQs</p>
        </div>
        <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a' }}>
          <p className="text-xs font-bold" style={{ color: '#b45309' }}>{doneTBS}/{totalTBS}</p>
          <p className="text-xs mt-0.5" style={{ color: '#d97706' }}>TBS</p>
        </div>
        <div className="rounded-xl p-2.5 text-center" style={{ backgroundColor: '#eef2ff', border: '1px solid #c7d2fe' }}>
          <p className="text-xs font-bold" style={{ color: '#4338ca' }}>{avgFlash}%</p>
          <p className="text-xs mt-0.5" style={{ color: '#6366f1' }}>Cards</p>
        </div>
      </div>

      {/* Blind Spot Warning */}
      {blindSpotCount > 0 && (
        <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-1.5">
          <AlertTriangle size={11} />
          <span>{blindSpotCount} blind spot{blindSpotCount > 1 ? 's' : ''} detected</span>
        </div>
      )}

      {unit.lastStudied && (
        <p className="text-xs text-slate-300 mt-3">Last studied: {unit.lastStudied}</p>
      )}
    </div>
  );
}

export default function DashboardView() {
  const { activeSection, sectionProgress } = useAppStore();
  const units = cpaDatabase[activeSection] || [];
  const progress = sectionProgress[activeSection];

  const totalMCQDone = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqCompleted, 0), 0);
  const totalMCQ = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqTotal, 0), 0);
  const totalTBSDone = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.tbsCompleted, 0), 0);
  const totalTBS = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.tbsTotal, 0), 0);
  const avgFlash = units.length > 0
    ? Math.round(units.reduce((a, u) =>
        a + u.modules.reduce((b, m) => b + m.metrics.flashcardMastery, 0) / Math.max(u.modules.length, 1), 0
      ) / units.length)
    : 0;

  const totalBlindSpots = units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.blindSpots.length, 0), 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900">
          {activeSection} — Study Dashboard
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          {progress.totalUnits} units · {progress.estimatedHoursRemaining}h remaining · {progress.totalStudyHours}h logged
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={TrendingUp}
          label="Overall Progress"
          value={`${progress.overallProgress}%`}
          sub={`${progress.totalStudyHours}h studied`}
          color="#2563eb"
        />
        <StatCard
          icon={Flame}
          label="Study Streak"
          value={`${progress.studyStreak}d`}
          sub="consecutive days"
          color="#f59e0b"
        />
        <StatCard
          icon={CheckSquare}
          label="MCQs Done"
          value={totalMCQDone}
          sub={`of ${totalMCQ} total`}
          color="#0ea5e9"
        />
        <StatCard
          icon={Brain}
          label="Flashcard Mastery"
          value={`${avgFlash}%`}
          sub="average across units"
          color="#8b5cf6"
        />
      </div>

      {/* Second row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={Target}
          label="TBS Completed"
          value={totalTBSDone}
          sub={`of ${totalTBS} simulations`}
          color="#10b981"
        />
        <StatCard
          icon={AlertTriangle}
          label="Blind Spots"
          value={totalBlindSpots}
          sub="need attention"
          color="#f97316"
        />
        <StatCard
          icon={Clock}
          label="Est. Remaining"
          value={`${progress.estimatedHoursRemaining}h`}
          sub="to exam readiness"
          color="#6366f1"
        />
        <StatCard
          icon={BarChart3}
          label="Accuracy Rate"
          value={totalMCQDone > 0 ? `${Math.round((units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqCorrect, 0), 0) / totalMCQDone) * 100)}%` : 'N/A'}
          sub="MCQ accuracy"
          color="#14b8a6"
        />
      </div>

      {/* Section Progress Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-slate-800">Unit Completion Overview</h2>
          <span className="text-xs text-slate-400">{units.filter(u => u.totalProgress >= 80).length} of {units.length} units &gt;80%</span>
        </div>
        <div className="space-y-3">
          {units.map((unit) => (
            <div key={unit.id} className="flex items-center gap-3">
              <span className="text-xs font-bold text-slate-600 w-8 flex-shrink-0">{unit.code}</span>
              <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${unit.totalProgress}%`,
                    background: unit.totalProgress >= 75
                      ? '#10b981'
                      : unit.totalProgress >= 40
                      ? '#2563eb'
                      : '#94a3b8',
                  }}
                />
              </div>
              <span className="text-xs text-slate-400 w-8 text-right">{unit.totalProgress}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Unit Cards Grid */}
      <div>
        <h2 className="text-sm font-semibold text-slate-800 mb-3">Study Units</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {units.map((unit) => (
            <UnitProgressCard key={unit.id} unit={unit} />
          ))}
        </div>
      </div>
    </div>
  );
}
