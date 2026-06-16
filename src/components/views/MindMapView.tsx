'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Circle, GitBranch } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';

interface TreeNode {
  id: string;
  label: string;
  sublabel?: string;
  tokenKey: 'mcq' | 'notes' | 'flash' | 'tbs' | 'glossary';
  children?: TreeNode[];
  depth: number;
}

function buildTree(section: string): TreeNode[] {
  const units = cpaDatabase[section as keyof typeof cpaDatabase] || [];
  return units.map((unit) => ({
    id: unit.id,
    label: unit.code,
    sublabel: unit.name,
    tokenKey: 'mcq' as const,
    depth: 0,
    children: unit.modules.map((mod) => ({
      id: mod.id,
      label: mod.shortName,
      sublabel: mod.name,
      tokenKey: 'notes' as const,
      depth: 1,
      children: [
        { id: `${mod.id}-mcq`, label: 'MCQs', sublabel: `${mod.metrics.mcqCompleted}/${mod.metrics.mcqTotal} done`, tokenKey: 'mcq' as const, depth: 2 },
        { id: `${mod.id}-flash`, label: 'Flashcards', sublabel: `${mod.metrics.flashcardMastery}% mastery`, tokenKey: 'flash' as const, depth: 2 },
        { id: `${mod.id}-tbs`, label: 'TBS', sublabel: `${mod.metrics.tbsCompleted}/${mod.metrics.tbsTotal} done`, tokenKey: 'tbs' as const, depth: 2 },
      ],
    })),
  }));
}

function TreeNodeComponent({ node }: { node: TreeNode }) {
  const t = useTheme();
  const [expanded, setExpanded] = useState(node.depth < 1);
  const hasChildren = node.children && node.children.length > 0;
  const token = t[node.tokenKey];

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer select-none"
        style={{ marginLeft: node.depth > 0 ? 0 : 0 }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-150"
          style={{
            backgroundColor: token.bg,
            borderColor: token.border,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = t.isDark ? `0 0 10px ${token.border}40` : '0 2px 6px rgba(0,0,0,0.06)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
          }}
        >
          {hasChildren ? (
            expanded
              ? <ChevronDown size={12} style={{ color: token.text }} />
              : <ChevronRight size={12} style={{ color: token.text }} />
          ) : (
            <Circle size={7} style={{ color: token.text }} fill={token.text} />
          )}
          <span className="text-xs font-bold" style={{ color: token.text, textShadow: t.isDark ? `0 0 6px ${token.text}60` : 'none' }}>
            {node.label}
          </span>
          {node.sublabel && (
            <span className="text-xs font-normal" style={{ color: token.text, opacity: 0.65 }}>
              — {node.sublabel.length > 38 ? node.sublabel.slice(0, 38) + '…' : node.sublabel}
            </span>
          )}
        </div>
      </div>

      {hasChildren && expanded && (
        <div
          className="mt-1.5 space-y-1.5 ml-3 pl-3"
          style={{ borderLeft: `1px solid ${t.isDark ? '#334155' : t.cardBorder}` }}
        >
          {node.children!.map((child) => (
            <TreeNodeComponent key={child.id} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MindMapView() {
  const { activeSection } = useAppStore();
  const t = useTheme();
  const tree = buildTree(activeSection);

  const sectionLabels: Record<string, string> = {
    FAR: 'Financial Accounting & Reporting',
    AUD: 'Auditing & Attestation',
    REG: 'Regulation',
    BAR: 'Business Analysis & Reporting',
    TCP: 'Tax Compliance & Planning',
    ISC: 'Information Systems & Controls',
  };

  const legendItems: { label: string; tokenKey: 'mcq' | 'notes' | 'flash' | 'tbs' | 'glossary' }[] = [
    { label: 'Units', tokenKey: 'mcq' },
    { label: 'Modules', tokenKey: 'notes' },
    { label: 'MCQs', tokenKey: 'mcq' },
    { label: 'Flashcards', tokenKey: 'flash' },
    { label: 'TBS', tokenKey: 'tbs' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="p-2.5 rounded-xl"
          style={{
            backgroundColor: t.isDark ? '#1e293b' : t.navActiveBg,
            border: t.isDark ? '1px solid #334155' : 'none',
            boxShadow: t.isDark ? '0 0 12px rgba(34,211,238,0.12)' : 'none',
          }}
        >
          <GitBranch size={16} style={{ color: t.isDark ? '#22d3ee' : t.navActiveText }} />
        </div>
        <div>
          <h1 className="text-lg font-bold" style={{ color: t.textPrimary }}>Mind Map — {activeSection}</h1>
          <p className="text-xs" style={{ color: t.textTertiary }}>{sectionLabels[activeSection]}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-2">
        {legendItems.map((item) => {
          const token = t[item.tokenKey];
          return (
            <div
              key={item.label}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium"
              style={{ backgroundColor: token.bg, borderColor: token.border, color: token.text }}
            >
              <Circle size={6} fill={token.text} style={{ color: token.text }} />
              {item.label}
            </div>
          );
        })}
      </div>

      {/* Tree */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      >
        {/* Root node */}
        <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: `1px solid ${t.divider}` }}>
          <div
            className="px-4 py-2.5 rounded-xl"
            style={{
              backgroundColor: t.isDark ? '#1e293b' : t.navActiveBg,
              border: t.isDark ? '1px solid #334155' : 'none',
              boxShadow: t.isDark ? '0 0 15px rgba(34,211,238,0.08)' : 'none',
            }}
          >
            <span className="text-sm font-bold" style={{ color: t.isDark ? '#22d3ee' : t.navActiveText }}>{activeSection}</span>
            <span className="text-xs ml-2" style={{ color: t.isDark ? '#475569' : 'rgba(255,255,255,0.5)' }}>CPA Section</span>
          </div>
          <span className="text-xs" style={{ color: t.textTertiary }}>
            {tree.length} units · {tree.reduce((a, n) => a + (n.children?.length || 0), 0)} modules
          </span>
        </div>

        <div className="space-y-3 pl-2">
          {tree.map((node) => (
            <TreeNodeComponent key={node.id} node={node} />
          ))}
        </div>
      </div>

      {/* Concept dependencies */}
      <div
        className="rounded-2xl p-6"
        style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      >
        <h2 className="text-sm font-semibold mb-4" style={{ color: t.textPrimary }}>Key Concept Dependencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { from: 'Balance Sheet', to: 'Cash Flow Statement', type: 'feeds into' },
            { from: 'Revenue Recognition', to: 'Income Statement', type: 'impacts' },
            { from: 'Audit Risk Model', to: 'Evidence Procedures', type: 'drives' },
            { from: 'Tax Basis', to: 'Deferred Tax', type: 'creates' },
            { from: 'FAR Income Statements', to: 'REG Tax Classifications', type: 'cross-references' },
          ].map((rel, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-3 rounded-xl"
              style={{ backgroundColor: t.isDark ? '#0f172a' : t.muted, border: `1px solid ${t.isDark ? '#1e293b' : t.mutedBorder}` }}
            >
              <span className="text-xs font-medium" style={{ color: t.textSecondary }}>{rel.from}</span>
              <div className="flex items-center gap-1 flex-1 justify-center" style={{ color: t.textTertiary }}>
                <div className="flex-1 h-px" style={{ backgroundColor: t.isDark ? '#334155' : t.cardBorder }} />
                <span className="text-xs px-1" style={{ color: t.textTertiary }}>{rel.type}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: t.isDark ? '#334155' : t.cardBorder }} />
                <ChevronRight size={10} style={{ color: t.textTertiary }} />
              </div>
              <span className="text-xs font-medium" style={{ color: t.textSecondary }}>{rel.to}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
