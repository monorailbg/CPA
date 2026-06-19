'use client';

import { useMemo, useState } from 'react';
import {
  TrendingUp, Target, Clock, Flame, CheckSquare, Brain,
  ChevronRight, ListChecks, Layers, BookOpen, ArrowRight, Circle, CheckCircle2,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme, ThemeTokens } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Module, Unit } from '@/lib/types';

// ─── Micro-sparkline ────────────────────────────────────────────────────────

function Sparkline({ points, color }: { points: number[]; color: string }) {
  const w = 52, h = 18, pad = 2;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const coords = points.map((v, i) => {
    const x = pad + (i / (points.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return `${x},${y}`;
  });
  const last = coords[coords.length - 1].split(',');

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="flex-shrink-0">
      <polyline points={coords.join(' ')} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.7} />
      <circle cx={last[0]} cy={last[1]} r={1.75} fill={color} />
    </svg>
  );
}

// ─── Compact header stat pill ──────────────────────────────────────────────

function StatPill({ icon: Icon, label, value, accentColor, trend }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  accentColor: string;
  trend?: number[];
}) {
  const t = useTheme();
  return (
    <div
      className="flex items-center gap-3 px-4 py-2.5 rounded-2xl spring-transition flex-1 min-w-0"
      style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}
    >
      <div className="p-2 rounded-xl flex-shrink-0" style={{ backgroundColor: accentColor + '14' }}>
        <Icon size={15} style={{ color: accentColor }} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-wider truncate" style={{ color: t.textTertiary }}>{label}</p>
        <p className="text-base font-bold leading-tight" style={{ color: t.textPrimary }}>{value}</p>
      </div>
      {trend && <Sparkline points={trend} color={accentColor} />}
    </div>
  );
}

// ─── Column 1: Section Navigator ───────────────────────────────────────────

function ProgressRing({ value, size = 26 }: { value: number; size?: number }) {
  const t = useTheme();
  const r = (size - 4) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;

  return (
    <svg width={size} height={size} className="rotate-[-90deg] flex-shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} stroke={t.mutedBorder} strokeWidth={2.25} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={t.flash.text} strokeWidth={2.25} fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 0.5s ease' }}
      />
    </svg>
  );
}

function SectionNavigator({ units, activeUnitId, onSelectUnit }: {
  units: Unit[];
  activeUnitId?: string;
  onSelectUnit: (unitId: string) => void;
}) {
  const t = useTheme();

  return (
    <div className="rounded-3xl flex flex-col h-full overflow-hidden" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}>
      <div className="px-4 py-3.5 flex-shrink-0" style={{ borderBottom: `1px solid ${t.divider}` }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider" style={{ color: t.textTertiary }}>Sections</h2>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
        {units.map((unit) => {
          const isActive = activeUnitId === unit.id;
          return (
            <button
              key={unit.id}
              onClick={() => onSelectUnit(unit.id)}
              className="relative w-full flex items-center gap-2 px-2.5 py-2.5 rounded-2xl text-left spring-transition overflow-hidden"
              style={{ backgroundColor: isActive ? t.sidebarActiveBg : 'transparent' }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.sidebarHoverBg; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
            >
              <ProgressRing value={unit.totalProgress} />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold truncate" style={{ color: isActive ? t.sidebarActiveText : t.textPrimary }}>
                  {unit.code}
                </p>
                <p className="text-[11px] truncate" style={{ color: t.textTertiary }}>
                  {unit.totalProgress}%
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Column 2: Content List Matrix ─────────────────────────────────────────

function ContentListMatrix({ unit, activeModuleId, onSelectModule }: {
  unit?: Unit;
  activeModuleId?: string;
  onSelectModule: (moduleId: string) => void;
}) {
  const t = useTheme();

  return (
    <div className="rounded-3xl flex flex-col h-full overflow-hidden" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}>
      <div className="px-4 py-3.5 flex-shrink-0" style={{ borderBottom: `1px solid ${t.divider}` }}>
        <h2 className="text-xs font-semibold uppercase tracking-wider truncate" style={{ color: t.textTertiary }}>
          {unit ? `${unit.code} · Modules` : 'Modules'}
        </h2>
      </div>
      <div className="flex-1 overflow-y-auto no-scrollbar p-2 space-y-1">
        {unit?.modules.map((mod) => {
          const isActive = activeModuleId === mod.id;
          const pct = mod.metrics.mcqTotal > 0 ? Math.round((mod.metrics.mcqCompleted / mod.metrics.mcqTotal) * 100) : 0;
          return (
            <button
              key={mod.id}
              onClick={() => onSelectModule(mod.id)}
              className="relative w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-2xl text-left spring-transition overflow-hidden"
              style={{ backgroundColor: isActive ? t.sidebarActiveBg : 'transparent' }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.sidebarHoverBg; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {pct >= 80 ? (
                  <CheckCircle2 size={14} style={{ color: t.notes.text, flexShrink: 0 }} />
                ) : (
                  <Circle size={14} style={{ color: t.mutedBorder, flexShrink: 0 }} />
                )}
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate" style={{ color: isActive ? t.sidebarActiveText : t.textSecondary }}>
                    {mod.shortName} — {mod.name}
                  </p>
                  <p className="text-[11px] truncate" style={{ color: t.textTertiary }}>
                    {mod.metrics.mcqCompleted}/{mod.metrics.mcqTotal} MCQ · {mod.metrics.flashcardMastery}% FC
                  </p>
                </div>
              </div>
              <ChevronRight size={13} style={{ color: t.textTertiary, flexShrink: 0 }} />
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Column 3: Material Execution Terminal ─────────────────────────────────

function ActionBlock({ t, theme, icon: Icon, title, metric, metricLabel, ctaLabel, onClick }: {
  t: ThemeTokens;
  theme: { bg: string; border: string; text: string };
  icon: React.ElementType;
  title: string;
  metric: string | number;
  metricLabel: string;
  ctaLabel: string;
  onClick: () => void;
}) {
  return (
    <div
      className="rounded-2xl p-4 flex flex-col justify-between spring-transition min-w-0"
      style={{ backgroundColor: theme.bg, border: `1px solid ${t.cardBorder}` }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.borderColor = theme.border;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder;
      }}
    >
      <div>
        <div className="flex items-center gap-2 mb-2.5">
          <div className="p-1.5 rounded-lg" style={{ backgroundColor: t.card }}>
            <Icon size={13} style={{ color: theme.text }} />
          </div>
          <h3 className="text-xs font-semibold truncate" style={{ color: t.textPrimary }}>{title}</h3>
        </div>
        <p className="text-xl font-bold" style={{ color: theme.text }}>{metric}</p>
        <p className="text-[11px] mt-0.5 truncate" style={{ color: t.textTertiary }}>{metricLabel}</p>
      </div>
      <button
        onClick={onClick}
        className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2 rounded-xl spring-transition"
        style={{ backgroundColor: t.card, color: theme.text, border: `1px solid ${theme.border}` }}
      >
        {ctaLabel}
        <ArrowRight size={11} />
      </button>
    </div>
  );
}

function MaterialTerminal({ unit, mod }: { unit?: Unit; mod?: Module }) {
  const t = useTheme();
  const { setActiveTab } = useAppStore();
  const keyTerms = unit?.allMcqs.slice(0, 6).map((m) => m.topic) ?? [];
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);

  if (!unit || !mod) {
    return (
      <div className="rounded-3xl h-full flex items-center justify-center" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}>
        <p className="text-sm" style={{ color: t.textTertiary }}>Select a module to begin.</p>
      </div>
    );
  }

  const noteCount = selectedTerm ? 1 : keyTerms.length;
  const noteLabel = selectedTerm ? 'term in focus' : 'key terms mapped';

  return (
    <div className="rounded-3xl h-full flex flex-col overflow-hidden p-5" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}>
      <div className="mb-4 flex-shrink-0">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: t.textTertiary }}>
          {unit.code} · {mod.shortName}
        </p>
        <h2 className="text-base font-bold mt-0.5 truncate" style={{ color: t.textPrimary }}>{mod.name}</h2>
        <p className="text-sm mt-1 line-clamp-2" style={{ color: t.textSecondary }}>
          {selectedTerm ? `Filtering study materials by “${selectedTerm}”` : mod.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-3 flex-shrink-0">
        <ActionBlock
          t={t} theme={t.tbs} icon={ListChecks} title="Quiz"
          metric={mod.metrics.mcqTotal || unit.allMcqs.length}
          metricLabel="target questions"
          ctaLabel="Start"
          onClick={() => setActiveTab('quiz')}
        />
        <ActionBlock
          t={t} theme={t.flash} icon={Layers} title="Flashcards"
          metric={unit.allFlashcards.length}
          metricLabel="cards in deck"
          ctaLabel="Review"
          onClick={() => setActiveTab('flashcards')}
        />
        <ActionBlock
          t={t} theme={t.notes} icon={BookOpen} title="Notes"
          metric={noteCount}
          metricLabel={noteLabel}
          ctaLabel="Open"
          onClick={() => setActiveTab('notes')}
        />
      </div>

      {keyTerms.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5 overflow-hidden">
          {keyTerms.map((term) => {
            const isSelected = selectedTerm === term;
            return (
              <button
                key={term}
                onClick={() => setSelectedTerm(isSelected ? null : term)}
                className="text-xs px-2.5 py-1 rounded-lg spring-transition"
                style={{
                  backgroundColor: isSelected ? t.notes.text : t.notes.bg,
                  color: isSelected ? t.card : t.notes.text,
                  border: `1px solid ${t.notes.border}`,
                }}
              >
                {term}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Dashboard ─────────────────────────────────────────────────────────

export default function DashboardView() {
  const { activeSection, sectionProgress, activeUnit, activeModule, setActiveUnit, setActiveModule } = useAppStore();
  const t = useTheme();
  const units = cpaDatabase[activeSection] || [];
  const progress = sectionProgress[activeSection];

  const { totalMCQDone, totalMCQ, totalCorrect, avgFlash } = useMemo(() => {
    return {
      totalMCQDone: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqCompleted, 0), 0),
      totalMCQ: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqTotal, 0), 0),
      totalCorrect: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqCorrect, 0), 0),
      avgFlash: units.length > 0
        ? Math.round(units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.flashcardMastery, 0) / Math.max(u.modules.length, 1), 0) / units.length)
        : 0,
    };
  }, [units]);

  const accuracyPct = totalMCQDone > 0 ? Math.round((totalCorrect / totalMCQDone) * 100) : 0;

  const selectedUnit = units.find((u) => u.id === activeUnit) ?? units[0];
  const selectedModule = selectedUnit?.modules.find((m) => m.id === activeModule) ?? selectedUnit?.modules[0];

  const handleSelectUnit = (unitId: string) => {
    setActiveUnit(unitId);
    const unit = units.find((u) => u.id === unitId);
    setActiveModule(unit?.modules[0]?.id);
  };

  const handleSelectModule = (moduleId: string) => {
    setActiveModule(moduleId);
  };

  return (
    <div className="h-full flex flex-col p-4 lg:p-6 gap-4 overflow-hidden">
      {/* Compact header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 flex-shrink-0">
        <div className="flex-shrink-0">
          <h1 className="text-lg font-bold" style={{ color: t.textPrimary }}>{activeSection}</h1>
          <p className="text-xs" style={{ color: t.textTertiary }}>{progress.totalUnits} units · {progress.studyStreak}d streak</p>
        </div>
        <div className="flex gap-3 flex-1 min-w-0">
          <StatPill
            icon={TrendingUp} label="Progress" value={`${progress.overallProgress}%`}
            accentColor={t.flash.text}
            trend={[Math.max(progress.overallProgress - 18, 2), Math.max(progress.overallProgress - 9, 6), progress.overallProgress]}
          />
          <StatPill
            icon={Target} label="Accuracy" value={totalMCQDone > 0 ? `${accuracyPct}%` : 'N/A'}
            accentColor={t.notes.text}
            trend={[Math.max(accuracyPct - 10, 5), Math.max(accuracyPct - 4, 8), accuracyPct]}
          />
          <StatPill
            icon={Clock} label="Remaining" value={`${progress.estimatedHoursRemaining}h`}
            accentColor={t.tbs.text}
          />
          <StatPill icon={Flame} label="Streak" value={`${progress.studyStreak}d`} accentColor={t.glossary.text} />
          <StatPill icon={CheckSquare} label="MCQs" value={`${totalMCQDone}/${totalMCQ}`} accentColor={t.mcq.text} />
          <StatPill icon={Brain} label="Mastery" value={`${avgFlash}%`} accentColor={t.flash.text} />
        </div>
      </div>

      {/* Zero-scroll 3-column panoramic split */}
      <div className="flex-1 min-h-0 grid gap-4" style={{ gridTemplateColumns: '20% 35% 45%' }}>
        <SectionNavigator units={units} activeUnitId={selectedUnit?.id} onSelectUnit={handleSelectUnit} />
        <ContentListMatrix unit={selectedUnit} activeModuleId={selectedModule?.id} onSelectModule={handleSelectModule} />
        <MaterialTerminal unit={selectedUnit} mod={selectedModule} />
      </div>
    </div>
  );
}
