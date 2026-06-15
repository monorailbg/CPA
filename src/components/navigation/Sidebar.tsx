'use client';

import { ChevronRight, CheckCircle2, Circle, Clock } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Unit } from '@/lib/types';

function ProgressRing({ value, size = 32 }: { value: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="rotate-[-90deg]">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#e2e8f0" strokeWidth={3} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="#0f172a"
        strokeWidth={3}
        fill="none"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-500"
      />
    </svg>
  );
}

export default function Sidebar() {
  const { activeSection, activeUnit, activeModule, setActiveUnit, setActiveModule } = useAppStore();
  const units: Unit[] = cpaDatabase[activeSection] || [];

  return (
    <aside className="w-64 flex-shrink-0 border-r border-slate-200 bg-white overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
          {activeSection} Units
        </h2>

        <div className="space-y-1">
          {units.map((unit) => {
            const isUnitActive = activeUnit === unit.id;
            const allMetrics = unit.modules.reduce(
              (acc, m) => ({
                mcqCompleted: acc.mcqCompleted + m.metrics.mcqCompleted,
                mcqTotal: acc.mcqTotal + m.metrics.mcqTotal,
                tbsCompleted: acc.tbsCompleted + m.metrics.tbsCompleted,
                tbsTotal: acc.tbsTotal + m.metrics.tbsTotal,
              }),
              { mcqCompleted: 0, mcqTotal: 0, tbsCompleted: 0, tbsTotal: 0 }
            );

            return (
              <div key={unit.id} className="rounded-xl overflow-hidden">
                {/* Unit Header */}
                <button
                  onClick={() => setActiveUnit(isUnitActive ? undefined : unit.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-all duration-150 rounded-xl ${
                    isUnitActive
                      ? 'bg-slate-900 text-white'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <ProgressRing value={unit.totalProgress} size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-bold ${isUnitActive ? 'text-white' : 'text-slate-900'}`}>
                        {unit.code}
                      </span>
                      <span className={`text-xs ${isUnitActive ? 'text-slate-300' : 'text-slate-400'}`}>
                        {unit.totalProgress}%
                      </span>
                    </div>
                    <p className={`text-xs truncate leading-tight mt-0.5 ${isUnitActive ? 'text-slate-300' : 'text-slate-500'}`}>
                      {unit.name.length > 28 ? unit.name.slice(0, 28) + '…' : unit.name}
                    </p>
                  </div>
                  <ChevronRight
                    size={12}
                    className={`flex-shrink-0 transition-transform duration-200 ${
                      isUnitActive
                        ? 'rotate-90 text-slate-300'
                        : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Module List */}
                {isUnitActive && (
                  <div className="ml-3 mt-1 mb-1 space-y-0.5 border-l border-slate-200 pl-2.5">
                    {unit.modules.map((mod) => {
                      const isModActive = activeModule === mod.id;
                      const pct = mod.metrics.mcqTotal > 0
                        ? Math.round((mod.metrics.mcqCompleted / mod.metrics.mcqTotal) * 100)
                        : 0;
                      return (
                        <button
                          key={mod.id}
                          onClick={() => setActiveModule(isModActive ? undefined : mod.id)}
                          className={`w-full flex items-center gap-2 px-2.5 py-2 text-left rounded-lg transition-all duration-150 ${
                            isModActive
                              ? 'bg-slate-100 text-slate-900'
                              : 'text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          {pct >= 80 ? (
                            <CheckCircle2 size={12} className="text-emerald-500 flex-shrink-0" />
                          ) : (
                            <Circle size={12} className="text-slate-300 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium">{mod.shortName} — {mod.name.split(' ').slice(0, 3).join(' ')}</div>
                            <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
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

        {/* Study Stats Footer */}
        <div className="mt-6 p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={12} className="text-slate-400" />
            <span className="text-xs font-medium text-slate-500">Session Stats</span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Units</span>
              <span className="font-semibold text-slate-700">{units.length}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Modules</span>
              <span className="font-semibold text-slate-700">
                {units.reduce((a, u) => a + u.modules.length, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
