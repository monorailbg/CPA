'use client';

import { useState } from 'react';
import { Network, ZoomIn, ZoomOut, RefreshCw, Info } from 'lucide-react';
import { useAppStore } from '@/store/appStore';

interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  bg: string;
  border: string;
  size: 'sm' | 'md' | 'lg';
  section?: string;
}

interface GraphEdge {
  id: string;
  from: string;
  to: string;
  label: string;
  dashed?: boolean;
}

const FAR_NODES: GraphNode[] = [
  { id: 'bs', label: 'Balance Sheet', x: 400, y: 200, color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', size: 'lg' },
  { id: 'is', label: 'Income Statement', x: 200, y: 100, color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', size: 'lg' },
  { id: 'cfs', label: 'Cash Flow Statement', x: 600, y: 100, color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', size: 'lg' },
  { id: 'se', label: "Stmt of Stockholders' Equity", x: 400, y: 380, color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', size: 'md' },
  { id: 'rev', label: 'Revenue (ASC 606)', x: 80, y: 200, color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', size: 'md' },
  { id: 'cogs', label: 'COGS & Inventory', x: 180, y: 300, color: '#b45309', bg: '#fffbeb', border: '#fde68a', size: 'md' },
  { id: 'ppe', label: 'PP&E & Depreciation', x: 550, y: 320, color: '#b45309', bg: '#fffbeb', border: '#fde68a', size: 'md' },
  { id: 'lease', label: 'Leases (ASC 842)', x: 700, y: 280, color: '#4338ca', bg: '#eef2ff', border: '#c7d2fe', size: 'sm' },
  { id: 'tax', label: 'Income Taxes (ASC 740)', x: 300, y: 460, color: '#4338ca', bg: '#eef2ff', border: '#c7d2fe', size: 'sm' },
  { id: 'invest', label: 'Investments (ASC 320)', x: 100, y: 400, color: '#6b21a8', bg: '#faf5ff', border: '#e9d5ff', size: 'sm' },
  { id: 'fv', label: 'Fair Value (ASC 820)', x: 650, y: 420, color: '#6b21a8', bg: '#faf5ff', border: '#e9d5ff', size: 'sm' },
  { id: 'oci', label: 'OCI / AOCI', x: 280, y: 160, color: '#0e7490', bg: '#ecfeff', border: '#a5f3fc', size: 'sm' },
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
  { id: 'audit-risk', label: 'Audit Risk', x: 400, y: 200, color: '#6b21a8', bg: '#faf5ff', border: '#e9d5ff', size: 'lg' },
  { id: 'ir', label: 'Inherent Risk', x: 200, y: 100, color: '#4338ca', bg: '#eef2ff', border: '#c7d2fe', size: 'md' },
  { id: 'cr', label: 'Control Risk', x: 400, y: 80, color: '#4338ca', bg: '#eef2ff', border: '#c7d2fe', size: 'md' },
  { id: 'dr', label: 'Detection Risk', x: 600, y: 100, color: '#4338ca', bg: '#eef2ff', border: '#c7d2fe', size: 'md' },
  { id: 'mat', label: 'Materiality', x: 200, y: 320, color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe', size: 'md' },
  { id: 'proc', label: 'Audit Procedures', x: 600, y: 300, color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0', size: 'md' },
  { id: 'opinion', label: 'Audit Opinion', x: 400, y: 380, color: '#b45309', bg: '#fffbeb', border: '#fde68a', size: 'lg' },
  { id: 'ic', label: 'Internal Controls', x: 650, y: 200, color: '#0e7490', bg: '#ecfeff', border: '#a5f3fc', size: 'sm' },
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

export default function GraphView() {
  const { activeSection } = useAppStore();
  const [scale, setScale] = useState(1);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);

  const nodes = activeSection === 'AUD' ? AUD_NODES : FAR_NODES;
  const edges = activeSection === 'AUD' ? AUD_EDGES : FAR_EDGES;

  const getNodeById = (id: string) => nodes.find((n) => n.id === id);

  const getSizeProps = (size: GraphNode['size']) => {
    switch (size) {
      case 'lg': return { w: 140, h: 48, fontSize: 12, fontWeight: 700 };
      case 'md': return { w: 130, h: 42, fontSize: 11, fontWeight: 600 };
      case 'sm': return { w: 120, h: 38, fontSize: 10, fontWeight: 500 };
    }
  };

  const svgWidth = 800;
  const svgHeight = 520;

  return (
    <div className="p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-slate-900">
            <Network size={16} className="text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Knowledge Dependency Graph</h1>
            <p className="text-sm text-slate-400">
              {activeSection} · Concept relationship mapping
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(Math.min(scale + 0.1, 2))}
            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => setScale(Math.max(scale - 0.1, 0.5))}
            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => { setScale(1); setSelectedNode(null); }}
            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition-colors"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      {/* Graph container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-auto" style={{ maxHeight: '540px' }}>
          <svg
            width={svgWidth}
            height={svgHeight}
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full"
            style={{ minWidth: '600px' }}
          >
            <defs>
              <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#94a3b8" />
              </marker>
              <marker id="arrowhead-dashed" markerWidth="8" markerHeight="6" refX="6" refY="3" orient="auto">
                <polygon points="0 0, 8 3, 0 6" fill="#cbd5e1" />
              </marker>
            </defs>

            {/* Grid background */}
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Edges */}
            {edges.map((edge) => {
              const fromNode = getNodeById(edge.from);
              const toNode = getNodeById(edge.to);
              if (!fromNode || !toNode) return null;

              const fromProps = getSizeProps(fromNode.size);
              const toProps = getSizeProps(toNode.size);

              const x1 = fromNode.x + fromProps.w / 2;
              const y1 = fromNode.y + fromProps.h / 2;
              const x2 = toNode.x + toProps.w / 2;
              const y2 = toNode.y + toProps.h / 2;

              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              const isHighlighted = selectedNode && (selectedNode.id === edge.from || selectedNode.id === edge.to);

              return (
                <g key={edge.id}>
                  <line
                    x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke={isHighlighted ? '#0f172a' : edge.dashed ? '#e2e8f0' : '#cbd5e1'}
                    strokeWidth={isHighlighted ? 2 : 1}
                    strokeDasharray={edge.dashed ? '4,3' : undefined}
                    markerEnd={`url(#arrowhead${edge.dashed ? '-dashed' : ''})`}
                    className="transition-all duration-200"
                  />
                  {isHighlighted && (
                    <text
                      x={midX} y={midY - 4}
                      textAnchor="middle"
                      fontSize="9"
                      fill="#64748b"
                      fontWeight="500"
                    >
                      {edge.label}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Nodes */}
            {nodes.map((node) => {
              const props = getSizeProps(node.size);
              const isSelected = selectedNode?.id === node.id;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  onClick={() => setSelectedNode(isSelected ? null : node)}
                  className="cursor-pointer"
                >
                  <rect
                    width={props.w}
                    height={props.h}
                    rx={8}
                    fill={isSelected ? '#0f172a' : node.bg}
                    stroke={isSelected ? '#0f172a' : node.border}
                    strokeWidth={isSelected ? 0 : 1.5}
                    className="transition-all duration-200 drop-shadow-sm"
                  />
                  <text
                    x={props.w / 2}
                    y={props.h / 2 + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={props.fontSize}
                    fontWeight={props.fontWeight}
                    fill={isSelected ? '#ffffff' : node.color}
                    className="select-none"
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
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)] flex items-start gap-3">
          <div
            className="p-2 rounded-lg flex-shrink-0"
            style={{ backgroundColor: selectedNode.bg, border: `1px solid ${selectedNode.border}` }}
          >
            <Info size={14} style={{ color: selectedNode.color }} />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-800">{selectedNode.label}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Connected to: {' '}
              {edges
                .filter((e) => e.from === selectedNode.id || e.to === selectedNode.id)
                .map((e) => {
                  const otherId = e.from === selectedNode.id ? e.to : e.from;
                  const other = getNodeById(otherId);
                  return other?.label;
                })
                .filter(Boolean)
                .join(', ')
              }
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
        <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Legend</h3>
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-slate-400" />
            <span className="text-xs text-slate-500">Direct dependency</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 border-t border-dashed border-slate-400" />
            <span className="text-xs text-slate-500">Indirect relationship</span>
          </div>
          {[
            { label: 'Financial Statements', bg: '#eff6ff', border: '#bfdbfe', color: '#1d4ed8' },
            { label: 'Accounts / Transactions', bg: '#fffbeb', border: '#fde68a', color: '#b45309' },
            { label: 'Standards / Rules', bg: '#eef2ff', border: '#c7d2fe', color: '#4338ca' },
            { label: 'Concepts', bg: '#faf5ff', border: '#e9d5ff', color: '#6b21a8' },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs"
              style={{ backgroundColor: item.bg, borderColor: item.border, color: item.color }}
            >
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: item.color }} />
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
