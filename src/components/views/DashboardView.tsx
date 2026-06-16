'use client';

import { useMemo, useState } from 'react';
import {
  TrendingUp, Target, Clock, ChevronDown, ChevronRight, Flame, Brain,
  CheckSquare, AlertTriangle, ListChecks, Layers, BookOpen, ArrowRight,
} from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme, ThemeTokens } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Module, Unit } from '@/lib/types';

// ─── Focal Stat Card (3 only) ──────────────────────────────────────────────

function FocalStatCard({ icon: Icon, label, value, sub, accentColor, barPct }: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accentColor: string;
  barPct?: number;
}) {
  const t = useTheme();

  return (
    <div
      className="rounded-2xl p-5 transition-all duration-200"
      style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.cardHoverShadow;
        (e.currentTarget as HTMLDivElement).style.borderColor = t.cardHoverBorder;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.cardShadow;
        (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder;
      }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider" style={{ color: t.textTertiary }}>{label}</p>
          <p className="text-3xl font-bold mt-1.5" style={{ color: t.textPrimary }}>{value}</p>
          {sub && <p className="text-xs mt-1" style={{ color: t.textTertiary }}>{sub}</p>}
        </div>
        <div className="p-2.5 rounded-xl" style={{ backgroundColor: accentColor + '14' }}>
          <Icon size={18} style={{ color: accentColor }} />
        </div>
      </div>
      {barPct !== undefined && (
        <div className="h-1.5 rounded-full overflow-hidden mt-4" style={{ backgroundColor: t.muted }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(barPct, 100)}%`, backgroundColor: accentColor }}
          />
        </div>
      )}
    </div>
  );
}

// ─── Minor Stats Drawer ─────────────────────────────────────────────────────

function MinorStatsDrawer({ stats }: { stats: { label: string; value: string | number; icon: React.ElementType }[] }) {
  const t = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: t.textTertiary }}>
          More details
        </span>
        <ChevronDown
          size={15}
          style={{ color: t.textTertiary, transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }}
        />
      </button>
      {open && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-5 pb-5" style={{ borderTop: `1px solid ${t.divider}` }}>
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2 pt-4">
              <s.icon size={14} style={{ color: t.textTertiary }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: t.textPrimary }}>{s.value}</p>
                <p className="text-xs" style={{ color: t.textTertiary }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Master: Unit / Module list ────────────────────────────────────────────

function MasterNav({ units, activeUnit, activeModule, onSelect }: {
  units: Unit[];
  activeUnit?: string;
  activeModule?: string;
  onSelect: (unitId: string, moduleId: string) => void;
}) {
  const t = useTheme();

  return (
    <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}>
      <div className="px-4 py-3.5" style={{ borderBottom: `1px solid ${t.divider}` }}>
        <h2 className="text-sm font-semibold" style={{ color: t.textPrimary }}>Study Units</h2>
      </div>
      <div className="max-h-[520px] overflow-y-auto p-2 space-y-1">
        {units.map((unit) => (
          <div key={unit.id}>
            <p className="text-xs font-bold uppercase tracking-wider px-2.5 pt-2 pb-1" style={{ color: t.textTertiary }}>
              {unit.code} · {unit.name}
            </p>
            {unit.modules.map((mod) => {
              const isActive = activeUnit === unit.id && activeModule === mod.id;
              return (
                <button
                  key={mod.id}
                  onClick={() => onSelect(unit.id, mod.id)}
                  className="relative w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-left transition-colors duration-150"
                  style={{ backgroundColor: isActive ? t.sidebarActiveBg : 'transparent' }}
                  onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.sidebarHoverBg; }}
                  onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent'; }}
                >
                  {isActive && (
                    <span className="absolute left-0 top-2 bottom-2 w-1 rounded-full" style={{ backgroundColor: t.flash.text }} />
                  )}
                  <span className="text-sm font-medium truncate" style={{ color: isActive ? t.sidebarActiveText : t.textSecondary }}>
                    {mod.shortName} — {mod.name}
                  </span>
                  <ChevronRight size={13} style={{ color: t.textTertiary, flexShrink: 0 }} />
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Detail: Quiz / Flashcard / Notes blocks ───────────────────────────────

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
      className="rounded-2xl p-5 flex flex-col justify-between transition-all duration-200"
      style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLDivElement).style.borderColor = theme.border; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLDivElement).style.borderColor = t.cardBorder; }}
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-lg" style={{ backgroundColor: theme.bg }}>
            <Icon size={15} style={{ color: theme.text }} />
          </div>
          <h3 className="text-sm font-semibold" style={{ color: t.textPrimary }}>{title}</h3>
        </div>
        <p className="text-2xl font-bold" style={{ color: theme.text }}>{metric}</p>
        <p className="text-xs mt-0.5" style={{ color: t.textTertiary }}>{metricLabel}</p>
      </div>
      <button
        onClick={onClick}
        className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-xl transition-colors"
        style={{ backgroundColor: theme.bg, color: theme.text, border: `1px solid ${theme.border}` }}
      >
        {ctaLabel}
        <ArrowRight size={12} />
      </button>
    </div>
  );
}

function DetailPanel({ unit, mod }: { unit: Unit; mod: Module }) {
  const t = useTheme();
  const { setActiveTab } = useAppStore();
  const keyTerms = unit.allMcqs.slice(0, 6).map((m) => m.topic);

  return (
    <div className="rounded-2xl p-5" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}>
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: t.textTertiary }}>
          {unit.code} · {mod.shortName}
        </p>
        <h2 className="text-base font-bold mt-0.5" style={{ color: t.textPrimary }}>{mod.name}</h2>
        <p className="text-sm mt-1" style={{ color: t.textSecondary }}>{mod.description}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <ActionBlock
          t={t} theme={t.tbs} icon={ListChecks} title="Quiz"
          metric={mod.metrics.mcqTotal || unit.allMcqs.length}
          metricLabel="target questions"
          ctaLabel="Start Quiz"
          onClick={() => setActiveTab('quiz')}
        />
        <ActionBlock
          t={t} theme={t.flash} icon={Layers} title="Flashcards"
          metric={unit.allFlashcards.length}
          metricLabel="cards in deck"
          ctaLabel="Review Cards"
          onClick={() => setActiveTab('flashcards')}
        />
        <ActionBlock
          t={t} theme={t.notes} icon={BookOpen} title="Notes"
          metric={keyTerms.length}
          metricLabel="key terms mapped"
          ctaLabel="Open Notes"
          onClick={() => setActiveTab('notes')}
        />
      </div>

      {keyTerms.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {keyTerms.map((term) => (
            <span
              key={term}
              className="text-xs px-2.5 py-1 rounded-lg"
              style={{ backgroundColor: t.notes.bg, color: t.notes.text, border: `1px solid ${t.notes.border}` }}
            >
              {term}
            </span>
          ))}
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

  const { totalMCQDone, totalMCQ, totalCorrect, totalTBSDone, totalTBS, avgFlash, totalBlindSpots } = useMemo(() => {
    return {
      totalMCQDone: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqCompleted, 0), 0),
      totalMCQ: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqTotal, 0), 0),
      totalCorrect: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.mcqCorrect, 0), 0),
      totalTBSDone: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.tbsCompleted, 0), 0),
      totalTBS: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.tbsTotal, 0), 0),
      avgFlash: units.length > 0
        ? Math.round(units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.metrics.flashcardMastery, 0) / Math.max(u.modules.length, 1), 0) / units.length)
        : 0,
      totalBlindSpots: units.reduce((a, u) => a + u.modules.reduce((b, m) => b + m.blindSpots.length, 0), 0),
    };
  }, [units]);

  const accuracyPct = totalMCQDone > 0 ? Math.round((totalCorrect / totalMCQDone) * 100) : 0;

  // Resolve active selection, defaulting to the first unit/module so the detail panel is never empty.
  const selectedUnit = units.find((u) => u.id === activeUnit) ?? units[0];
  const selectedModule = selectedUnit?.modules.find((m) => m.id === activeModule) ?? selectedUnit?.modules[0];

  const handleSelect = (unitId: string, moduleId: string) => {
    setActiveUnit(unitId);
    setActiveModule(moduleId);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold" style={{ color: t.textPrimary }}>{activeSection} — Study Dashboard</h1>
        <p className="text-sm mt-1" style={{ color: t.textTertiary }}>{progress.totalUnits} units in this section</p>
      </div>

      {/* 3 Focal stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FocalStatCard
          icon={TrendingUp} label="Overall Progress" value={`${progress.overallProgress}%`}
          sub={`${progress.totalStudyHours}h studied`} accentColor={t.flash.text} barPct={progress.overallProgress}
        />
        <FocalStatCard
          icon={Target} label="Accuracy Tracker" value={totalMCQDone > 0 ? `${accuracyPct}%` : 'N/A'}
          sub={`${totalCorrect}/${totalMCQDone} questions correct`} accentColor={t.notes.text} barPct={accuracyPct}
        />
        <FocalStatCard
          icon={Clock} label="Exam Readiness" value={`${progress.estimatedHoursRemaining}h`}
          sub="estimated hours remaining" accentColor={t.tbs.text}
        />
      </div>

      {/* Minor stats, tucked away */}
      <MinorStatsDrawer
        stats={[
          { label: 'Study streak', value: `${progress.studyStreak}d`, icon: Flame },
          { label: 'MCQs done', value: `${totalMCQDone}/${totalMCQ}`, icon: CheckSquare },
          { label: 'Flashcard mastery', value: `${avgFlash}%`, icon: Brain },
          { label: 'TBS completed', value: `${totalTBSDone}/${totalTBS}`, icon: AlertTriangle },
        ]}
      />

      {/* Master-Detail workspace */}
      <div>
        <h2 className="text-sm font-semibold mb-3" style={{ color: t.textPrimary }}>Module Workspace</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 items-start">
          <MasterNav units={units} activeUnit={selectedUnit?.id} activeModule={selectedModule?.id} onSelect={handleSelect} />
          {selectedUnit && selectedModule ? (
            <DetailPanel unit={selectedUnit} mod={selectedModule} />
          ) : (
            <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}` }}>
              <p className="text-sm" style={{ color: t.textTertiary }}>Select a module to begin.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
