'use client';

import { ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Unit } from '@/lib/types';

function ProgressRing({ value, size = 28, isDark }: { value: number; size?: number; isDark: boolean }) {
  const r = (size - 5) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  const trackColor = isDark ? '#1e293b' : '#e2e8f0';
  const fillColor = isDark ? '#22d3ee' : '#0f172a';

  return (
    <svg width={size} height={size} className="rotate-[-90deg] flex-shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} stroke={trackColor} strokeWidth={2.5} fill="none" />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        stroke={fillColor} strokeWidth={2.5} fill="none"
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{
          transition: 'stroke-dashoffset 0.5s ease',
          filter: isDark && value > 0 ? 'drop-shadow(0 0 3px rgba(34,211,238,0.6))' : 'none',
        }}
      />
    </svg>
  );
}

export default function Sidebar() {
  const { activeSection, activeUnit, activeModule, setActiveUnit, setActiveModule } = useAppStore();
  const t = useTheme();
  const units: Unit[] = cpaDatabase[activeSection] || [];

  return (
    <aside
      className="w-64 flex-shrink-0 overflow-y-auto"
      style={{ backgroundColor: t.sidebarBg, borderRight: `1px solid ${t.sidebarBorder}` }}
    >
      <div className="p-4">
        <h2
          className="text-xs font-semibold uppercase tracking-widest mb-3"
          style={{ color: t.isDark ? '#475569' : '#94a3b8' }}
        >
          {activeSection} Units
        </h2>

        <div className="space-y-1">
          {units.map((unit) => {
            const isUnitActive = activeUnit === unit.id;

            return (
              <div key={unit.id} className="rounded-xl overflow-hidden">
                {/* Unit header */}
                <button
                  onClick={() => setActiveUnit(isUnitActive ? undefined : unit.id)}
                  className="relative w-full flex items-center gap-2.5 px-3 py-2.5 text-left spring-transition rounded-xl overflow-hidden"
                  style={{
                    backgroundColor: isUnitActive ? t.sidebarActiveBg : 'transparent',
                    border: isUnitActive && t.isDark ? '1px solid #334155' : '1px solid transparent',
                  }}
                  onMouseEnter={(e) => {
                    if (!isUnitActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.sidebarHoverBg;
                  }}
                  onMouseLeave={(e) => {
                    if (!isUnitActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  }}
                >
                  {isUnitActive && !t.isDark && (
                    <span className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: t.flash.text }} />
                  )}
                  <ProgressRing value={unit.totalProgress} isDark={t.isDark} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="text-xs font-bold"
                        style={{ color: isUnitActive ? (t.isDark ? '#22d3ee' : t.sidebarActiveText) : t.textPrimary }}
                      >
                        {unit.code}
                      </span>
                      <span className="text-xs" style={{ color: t.textTertiary }}>
                        {unit.totalProgress}%
                      </span>
                    </div>
                    <p
                      className="text-xs truncate leading-tight mt-0.5"
                      style={{ color: isUnitActive ? t.sidebarActiveText : t.textSecondary }}
                    >
                      {unit.name.length > 28 ? unit.name.slice(0, 28) + '…' : unit.name}
                    </p>
                  </div>
                  <ChevronRight
                    size={12}
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{
                      transform: isUnitActive ? 'rotate(90deg)' : 'rotate(0deg)',
                      color: t.textTertiary,
                    }}
                  />
                </button>

                {/* Module list */}
                {isUnitActive && (
                  <div
                    className="ml-3 mt-1 mb-1 space-y-0.5 pl-2.5"
                    style={{ borderLeft: `1px solid ${t.isDark ? '#334155' : '#e2e8f0'}` }}
                  >
                    {unit.modules.map((mod) => {
                      const isModActive = activeModule === mod.id;
                      const pct = mod.metrics.mcqTotal > 0
                        ? Math.round((mod.metrics.mcqCompleted / mod.metrics.mcqTotal) * 100)
                        : 0;

                      return (
                        <button
                          key={mod.id}
                          onClick={() => setActiveModule(isModActive ? undefined : mod.id)}
                          className="relative w-full flex items-center gap-2 px-2.5 py-2 text-left rounded-lg spring-transition overflow-hidden"
                          style={{
                            backgroundColor: isModActive ? t.sidebarActiveBg : 'transparent',
                          }}
                          onMouseEnter={(e) => {
                            if (!isModActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = t.sidebarHoverBg;
                          }}
                          onMouseLeave={(e) => {
                            if (!isModActive) (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                          }}
                        >
                          {isModActive && !t.isDark && (
                            <span className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: t.flash.text }} />
                          )}
                          {pct >= 80 ? (
                            <CheckCircle2 size={12} style={{ color: t.isDark ? '#34d399' : '#10b981', flexShrink: 0 }} />
                          ) : (
                            <Circle size={12} style={{ color: t.isDark ? '#334155' : '#cbd5e1', flexShrink: 0 }} />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium" style={{ color: t.textSecondary }}>
                              {mod.shortName} — {mod.name.split(' ').slice(0, 3).join(' ')}
                            </div>
                            <div className="text-xs flex items-center gap-2 mt-0.5" style={{ color: t.textTertiary }}>
                              <span>{mod.metrics.mcqCompleted}/{mod.metrics.mcqTotal} MCQ</span>
                              <span>·</span>
                              <span>{mod.metrics.flashcardMastery}% FC</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Session stats */}
        <div
          className="mt-6 p-3 rounded-xl"
          style={{ backgroundColor: t.isDark ? '#0f172a' : t.surface, border: `1px solid ${t.isDark ? '#1e293b' : t.surfaceBorder}` }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Clock size={12} style={{ color: t.textTertiary }} />
            <span className="text-xs font-medium" style={{ color: t.textTertiary }}>Session Stats</span>
          </div>
          <div className="space-y-1">
            {[
              { label: 'Units', value: units.length },
              { label: 'Modules', value: units.reduce((a, u) => a + u.modules.length, 0) },
            ].map((stat) => (
              <div key={stat.label} className="flex justify-between text-xs">
                <span style={{ color: t.textTertiary }}>{stat.label}</span>
                <span className="font-semibold" style={{ color: t.isDark ? '#22d3ee' : t.textPrimary }}>{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
