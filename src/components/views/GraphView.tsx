'use client';

import { useState } from 'react';
import { Network, ZoomIn, ZoomOut, RefreshCw, Info } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  tokenKey: 'mcq' | 'notes' | 'flash' | 'tbs' | 'glossary';
  size: 'sm' | 'md' | 'lg';
}
interface GraphEdge { id: string; from: string; to: string; label: string; dashed?: boolean }

const FAR_NODES: GraphNode[] = [
  { id: 'bs', label: 'Balance Sheet', x: 400, y: 200, tokenKey: 'mcq', size: 'lg' },
  { id: 'is', label: 'Income Statement', x: 200, y: 100, tokenKey: 'mcq', size: 'lg' },
  { id: 'cfs', label: 'Cash Flow Statement', x: 600, y: 100, tokenKey: 'mcq', size: 'lg' },
  { id: 'se', label: "Stmt of SE", x: 400, y: 380, tokenKey: 'notes', size: 'md' },
  { id: 'rev', label: 'Revenue (ASC 606)', x: 80, y: 200, tokenKey: 'notes', size: 'md' },
  { id: 'cogs', label: 'COGS & Inventory', x: 180, y: 300, tokenKey: 'tbs', size: 'md' },
  { id: 'ppe', label: 'PP&E & Depreciation', x: 550, y: 320, tokenKey: 'tbs', size: 'md' },
  { id: 'lease', label: 'Leases (ASC 842)', x: 700, y: 280, tokenKey: 'flash', size: 'sm' },
  { id: 'tax', label: 'Income Taxes (ASC 740)', x: 300, y: 460, tokenKey: 'flash', size: 'sm' },
  { id: 'invest', label: 'Investments (ASC 320)', x: 100, y: 400, tokenKey: 'glossary', size: 'sm' },
  { id: 'fv', label: 'Fair Value (ASC 820)', x: 650, y: 420, tokenKey: 'glossary', size: 'sm' },
  { id: 'oci', label: 'OCI / AOCI', x: 280, y: 160, tokenKey: 'notes', size: 'sm' },
];
const FAR_EDGES: GraphEdge[] = [
  { id: 'e1', from: 'is', to: 'bs', label: 'Net income → RE' },
  { id: 'e2', from: 'cfs', to: 'bs', label: 'Cash balance' },
  { id: 'e3', from: 'is', to: 'se', label: 'Earnings' },
  { id: 'e4', from: 'se', to: 'bs', label: 'Equity section' },
  { id: 'e5', from: 'rev', to: 'is', label: 'Revenue' },
  { id: 'e6', from: 'cogs', to: 'is', label: 'COGS expense' },
  { id: 'e7', from: 'cogs', to: 'bs', label: 'Inventory asset' },
  { id: 'e8', from: 'ppe', to: 'bs', label: 'Asset value' },
  { id: 'e9', from: 'ppe', to: 'cfs', label: 'CapEx outflow', dashed: true },
  { id: 'e10', from: 'lease', to: 'ppe', label: 'ROU asset', dashed: true },
  { id: 'e11', from: 'lease', to: 'bs', label: 'Lease liability', dashed: true },
  { id: 'e12', from: 'tax', to: 'bs', label: 'DTA/DTL', dashed: true },
  { id: 'e13', from: 'invest', to: 'bs', label: 'Investment assets' },
  { id: 'e14', from: 'fv', to: 'invest', label: 'Measurement', dashed: true },
  { id: 'e15', from: 'oci', to: 'se', label: 'AOCI' },
];

const AUD_NODES: GraphNode[] = [
  { id: 'audit-risk', label: 'Audit Risk', x: 400, y: 200, tokenKey: 'glossary', size: 'lg' },
  { id: 'ir', label: 'Inherent Risk', x: 200, y: 100, tokenKey: 'flash', size: 'md' },
  { id: 'cr', label: 'Control Risk', x: 400, y: 80, tokenKey: 'flash', size: 'md' },
  { id: 'dr', label: 'Detection Risk', x: 600, y: 100, tokenKey: 'flash', size: 'md' },
  { id: 'mat', label: 'Materiality', x: 200, y: 320, tokenKey: 'mcq', size: 'md' },
  { id: 'proc', label: 'Audit Procedures', x: 600, y: 300, tokenKey: 'notes', size: 'md' },
  { id: 'opinion', label: 'Audit Opinion', x: 400, y: 380, tokenKey: 'tbs', size: 'lg' },
  { id: 'ic', label: 'Internal Controls', x: 650, y: 200, tokenKey: 'mcq', size: 'sm' },
];
const AUD_EDGES: GraphEdge[] = [
  { id: 'ae1', from: 'ir', to: 'audit-risk', label: '×' },
  { id: 'ae2', from: 'cr', to: 'audit-risk', label: '×' },
  { id: 'ae3', from: 'dr', to: 'audit-risk', label: '×' },
  { id: 'ae4', from: 'audit-risk', to: 'proc', label: 'Drives extent' },
  { id: 'ae5', from: 'mat', to: 'audit-risk', label: 'Affects scope' },
  { id: 'ae6', from: 'proc', to: 'opinion', label: 'Supports' },
  { id: 'ae7', from: 'ic', to: 'cr', label: 'Reduces', dashed: true },
  { id: 'ae8', from: 'mat', to: 'opinion', label: 'Informs' },
];

const SIZE_PROPS = {
  lg: { w: 140, h: 46, fontSize: 11, fontWeight: 700 },
  md: { w: 130, h: 40, fontSize: 10, fontWeight: 600 },
  sm: { w: 120, h: 36, fontSize: 10, fontWeight: 500 },
};

export default function GraphView() {
  const { activeSection } = useAppStore();
  const t = useTheme();
  const [scale, setScale] = useState(1);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const nodes = activeSection === 'AUD' ? AUD_NODES : FAR_NODES;
  const edges = activeSection === 'AUD' ? AUD_EDGES : FAR_EDGES;
  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  const edgeColor = t.isDark ? '#334155' : '#cbd5e1';
  const edgeDashedColor = t.isDark ? '#1e293b' : '#e2e8f0';

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: t.isDark ? '#1e293b' : '#0f172a', border: t.isDark ? '1px solid #334155' : 'none', boxShadow: t.isDark ? '0 0 12px rgba(34,211,238,0.12)' : 'none' }}
          >
            <Network size={16} style={{ color: t.isDark ? '#22d3ee' : '#ffffff' }} />
          </div>
          <div>
            <h1 className="text-lg font-bold" style={{ color: t.textPrimary }}>Knowledge Dependency Graph</h1>
            <p className="text-sm" style={{ color: t.textTertiary }}>{activeSection} · Concept relationship mapping</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {[
            { icon: ZoomIn, action: () => setScale(Math.min(scale + 0.1, 2)) },
            { icon: ZoomOut, action: () => setScale(Math.max(scale - 0.1, 0.5)) },
            { icon: RefreshCw, action: () => { setScale(1); setSelectedNode(null); } },
          ].map(({ icon: Icon, action }, i) => (
            <button
              key={i}
              onClick={action}
              className="p-2 rounded-lg transition-colors"
              style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, color: t.textTertiary }}
            >
              <Icon size={14} />
            </button>
          ))}
        </div>
      </div>

      {/* Graph */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      >
        <div className="overflow-auto" style={{ maxHeight: '540px' }}>
          <svg width={800} height={520} viewBox="0 0 800 520" className="w-full" style={{ minWidth: '600px' }}>
            <defs>
              <marker id="arr" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={edgeColor} />
              </marker>
              <marker id="arr-d" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill={edgeDashedColor} />
              </marker>
            </defs>

            {/* Grid */}
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke={t.isDark ? '#0f172a' : '#f8fafc'} strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Edges */}
            {edges.map((edge) => {
              const fn = getNodeById(edge.from);
              const tn = getNodeById(edge.to);
              if (!fn || !tn) return null;
              const fp = SIZE_PROPS[fn.size];
              const tp = SIZE_PROPS[tn.size];
              const x1 = fn.x + fp.w / 2, y1 = fn.y + fp.h / 2;
              const x2 = tn.x + tp.w / 2, y2 = tn.y + tp.h / 2;
              const midX = (x1 + x2) / 2, midY = (y1 + y2) / 2;
              const isHl = selectedNode && (selectedNode.id === edge.from || selectedNode.id === edge.to);
              const hlColor = t.isDark ? '#22d3ee' : '#0f172a';

              return (
                <g key={edge.id}>
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={isHl ? hlColor : edge.dashed ? edgeDashedColor : edgeColor}
                    strokeWidth={isHl ? 2 : 1}
                    strokeDasharray={edge.dashed ? '4,3' : undefined}
                    markerEnd={`url(#arr${edge.dashed ? '-d' : ''})`}
                    style={{ filter: isHl && t.isDark ? `drop-shadow(0 0 4px ${hlColor}80)` : 'none' }}
                  />
                  {isHl && (
                    <text x={midX} y={midY - 4} textAnchor="middle" fontSize="9" fill={t.isDark ? '#94a3b8' : '#64748b'} fontWeight="500">
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const props = SIZE_PROPS[node.size];
              const token = t[node.tokenKey];
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(isSelected ? null : node)}
                  className="cursor-pointer"
                >
                  {isSelected && t.isDark && (
                    <rect
                      width={props.w + 4} height={props.h + 4} x={-2} y={-2}
                      rx={10} fill="none"
                      stroke={token.border}
                      strokeWidth="1.5"
                      style={{ filter: `drop-shadow(0 0 6px ${token.border})` }}
                    />
                  )}
                  <rect
                    width={props.w} height={props.h} rx={8}
                    fill={isSelected ? (t.isDark ? '#0f172a' : '#0f172a') : token.bg}
                    stroke={isSelected ? (t.isDark ? token.border : '#0f172a') : token.border}
                    strokeWidth={1.5}
                    style={{ filter: isSelected && t.isDark ? `drop-shadow(0 0 8px ${token.border}60)` : 'none' }}
                  />
                  <text
                    x={props.w / 2} y={props.h / 2 + 1}
                    textAnchor="middle" dominantBaseline="middle"
                    fontSize={props.fontSize} fontWeight={props.fontWeight}
                    fill={isSelected ? (t.isDark ? token.text : '#ffffff') : token.text}
                    className="select-none"
                    style={{ textShadow: t.isDark && isSelected ? `0 0 8px ${token.text}` : 'none' }}
                  >
                    {node.label.length > 16 ? node.label.slice(0, 16) + '…' : node.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Selected node info */}
      {selectedNode && (
        <div
          className="rounded-2xl p-4 flex items-start gap-3"
          style={{ backgroundColor: t.card, border: `1px solid ${t.isDark ? t[selectedNode.tokenKey].border : t.cardBorder}`, boxShadow: t.isDark ? `0 0 15px ${t[selectedNode.tokenKey].border}20` : t.cardShadow }}
        >
          <div
            className="p-2 rounded-lg flex-shrink-0"
            style={{ backgroundColor: t[selectedNode.tokenKey].bg, border: `1px solid ${t[selectedNode.tokenKey].border}` }}
          >
            <Info size={14} style={{ color: t[selectedNode.tokenKey].text }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: t.textPrimary }}>{selectedNode.label}</h3>
            <p className="text-xs mt-0.5" style={{ color: t.textTertiary }}>
              Connected to: {edges.filter((e) => e.from === selectedNode.id || e.to === selectedNode.id).map((e) => {
                const otherId = e.from === selectedNode.id ? e.to : e.from;
                return getNodeById(otherId)?.label;
              }).filter(Boolean).join(', ')}
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div
        className="rounded-2xl p-4"
        style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: t.textTertiary }}>Legend</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5" style={{ backgroundColor: edgeColor }} />
            <span className="text-xs" style={{ color: t.textTertiary }}>Direct dependency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 border-t border-dashed" style={{ borderColor: edgeDashedColor }} />
            <span className="text-xs" style={{ color: t.textTertiary }}>Indirect relationship</span>
          </div>
          {(['mcq', 'tbs', 'flash', 'glossary'] as const).map((key) => {
            const labels = { mcq: 'Financial Statements', tbs: 'Accounts', flash: 'Standards', glossary: 'Concepts' };
            const tok = t[key];
            return (
              <div
                key={key}
                className="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs"
                style={{ backgroundColor: tok.bg, borderColor: tok.border, color: tok.text }}
              >
                <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: tok.text, boxShadow: t.isDark ? `0 0 4px ${tok.text}` : 'none' }} />
                {labels[key]}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
