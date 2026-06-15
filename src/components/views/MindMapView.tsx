'use client';

import { useState } from 'react';
import { ChevronRight, ChevronDown, Circle, GitBranch } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cpaDatabase } from '@/data/cpaDatabase';

interface TreeNode {
  id: string;
  label: string;
  sublabel?: string;
  color: string;
  bg: string;
  border: string;
  children?: TreeNode[];
  depth: number;
}

function buildTree(section: string): TreeNode[] {
  const units = cpaDatabase[section as keyof typeof cpaDatabase] || [];

  return units.map((unit) => ({
    id: unit.id,
    label: unit.code,
    sublabel: unit.name,
    color: '#1d4ed8',
    bg: '#eff6ff',
    border: '#bfdbfe',
    depth: 0,
    children: unit.modules.map((mod) => ({
      id: mod.id,
      label: mod.shortName,
      sublabel: mod.name,
      color: '#15803d',
      bg: '#f0fdf4',
      border: '#bbf7d0',
      depth: 1,
      children: [
        {
          id: `${mod.id}-mcq`,
          label: 'MCQs',
          sublabel: `${mod.metrics.mcqCompleted}/${mod.metrics.mcqTotal} done`,
          color: '#1d4ed8',
          bg: '#eff6ff',
          border: '#bfdbfe',
          depth: 2,
        },
        {
          id: `${mod.id}-flash`,
          label: 'Flashcards',
          sublabel: `${mod.metrics.flashcardMastery}% mastery`,
          color: '#4338ca',
          bg: '#eef2ff',
          border: '#c7d2fe',
          depth: 2,
        },
        {
          id: `${mod.id}-tbs`,
          label: 'TBS',
          sublabel: `${mod.metrics.tbsCompleted}/${mod.metrics.tbsTotal} done`,
          color: '#b45309',
          bg: '#fffbeb',
          border: '#fde68a',
          depth: 2,
        },
      ],
    })),
  }));
}

function TreeNodeComponent({ node, isRoot = false }: { node: TreeNode; isRoot?: boolean }) {
  const [expanded, setExpanded] = useState(node.depth < 1);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-2 cursor-pointer select-none group ${node.depth > 0 ? 'ml-6' : ''}`}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {/* Connector line for children */}
        {node.depth > 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200" style={{ left: '-12px' }} />
        )}

        {/* Node pill */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-150 hover:-translate-y-px"
          style={{ backgroundColor: node.bg, borderColor: node.border }}
        >
          {hasChildren ? (
            expanded
              ? <ChevronDown size={12} style={{ color: node.color }} />
              : <ChevronRight size={12} style={{ color: node.color }} />
          ) : (
            <Circle size={8} style={{ color: node.color }} fill={node.color} />
          )}
          <div>
            <span className="text-xs font-bold" style={{ color: node.color }}>{node.label}</span>
            {node.sublabel && (
              <span className="text-xs ml-1.5 font-normal" style={{ color: node.color, opacity: 0.7 }}>
                — {node.sublabel.length > 40 ? node.sublabel.slice(0, 40) + '…' : node.sublabel}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Children */}
      {hasChildren && expanded && (
        <div className="mt-1.5 space-y-1.5 border-l border-slate-200 ml-3 pl-3">
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
  const tree = buildTree(activeSection);

  const sectionLabels: Record<string, string> = {
    FAR: 'Financial Accounting & Reporting',
    AUD: 'Auditing & Attestation',
    REG: 'Regulation',
    BAR: 'Business Analysis & Reporting',
    TCP: 'Tax Compliance & Planning',
    ISC: 'Information Systems & Controls',
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-slate-900">
          <GitBranch size={16} className="text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900">Mind Map — {activeSection}</h1>
          <p className="text-xs text-slate-400">{sectionLabels[activeSection] || activeSection}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {[
          { label: 'Units', bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' },
          { label: 'Modules', bg: '#f0fdf4', border: '#bbf7d0', color: '#15803d' },
          { label: 'MCQs', bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' },
          { label: 'Flashcards', bg: '#eef2ff', border: '#c7d2fe', color: '#4338ca' },
          { label: 'TBS', bg: '#fffbeb', border: '#fde68a', color: '#b45309' },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium"
            style={{ backgroundColor: item.bg, borderColor: item.border, color: item.color }}
          >
            <Circle size={6} fill={item.color} style={{ color: item.color }} />
            {item.label}
          </div>
        ))}
      </div>

      {/* Tree */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
        {/* Root node */}
        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
          <div className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-sm font-bold text-white">{activeSection}</span>
            <span className="text-xs text-slate-300 ml-2">CPA Section</span>
          </div>
          <span className="text-xs text-slate-400">{tree.length} units · {tree.reduce((a, n) => a + (n.children?.length || 0), 0)} modules</span>
        </div>

        <div className="space-y-3 pl-2">
          {tree.map((node) => (
            <TreeNodeComponent key={node.id} node={node} isRoot />
          ))}
        </div>
      </div>

      {/* Concept Relationships */}
      <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
        <h2 className="text-sm font-semibold text-slate-800 mb-4">Key Concept Dependencies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { from: 'Balance Sheet', to: 'Cash Flow Statement', type: 'feeds into' },
            { from: 'Revenue Recognition', to: 'Income Statement', type: 'impacts' },
            { from: 'Audit Risk Model', to: 'Evidence Procedures', type: 'drives' },
            { from: 'Tax Basis', to: 'Deferred Tax', type: 'creates' },
          ].map((rel, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-xs font-medium text-slate-700">{rel.from}</span>
              <div className="flex items-center gap-1 text-slate-300">
                <div className="w-6 h-px bg-slate-300" />
                <span className="text-xs text-slate-400">{rel.type}</span>
                <div className="w-6 h-px bg-slate-300" />
                <ChevronRight size={10} className="text-slate-400" />
              </div>
              <span className="text-xs font-medium text-slate-700">{rel.to}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
