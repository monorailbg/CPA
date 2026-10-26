'use client';

import { useEffect, useState } from 'react';
import { FileText, Search, ChevronRight, BookMarked } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { useTheme } from '@/lib/useTheme';
import { cpaDatabase } from '@/data/cpaDatabase';
import { SECTION_NOTES } from '@/data/sectionNotes';
import { Note } from '@/lib/types';

function MarkdownRenderer({ content }: { content: string }) {
  const t = useTheme();
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let inTable = false;
  let k = 0;
  const key = () => `md-${k++}`;

  const parseInline = (text: string) => {
    text = text.replace(/\*\*(.+?)\*\*/g, `<strong style="color:${t.textPrimary}">$1</strong>`);
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    text = text.replace(/`(.+?)`/g, `<code class="md-code">$1</code>`);
    return text;
  };

  const flushTable = (buffer: string[]) => {
    if (buffer.length < 2) return null;
    const headers = buffer[0].split('|').filter(Boolean).map((h) => h.trim());
    const rows = buffer.slice(2).map((row) => row.split('|').filter(Boolean).map((c) => c.trim()));
    return (
      <div key={key()} className="overflow-x-auto my-4 rounded-xl" style={{ border: `1px solid ${t.cardBorder}` }}>
        <table className="w-full text-xs">
          <thead>
            <tr style={{ backgroundColor: t.isDark ? '#0f172a' : '#f8fafc', borderBottom: `1px solid ${t.cardBorder}` }}>
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left font-semibold" style={{ color: t.textPrimary }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} style={{ borderBottom: `1px solid ${t.divider}` }}>
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2" style={{ color: t.textSecondary }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  lines.forEach((line) => {
    if (line.startsWith('|')) {
      inTable = true; tableBuffer.push(line); return;
    }
    if (inTable) {
      const el = flushTable(tableBuffer); if (el) elements.push(el);
      tableBuffer = []; inTable = false;
    }
    if (line.startsWith('# '))
      elements.push(<h1 key={key()} className="text-xl font-bold mt-6 mb-3" style={{ color: t.textPrimary }}>{line.slice(2)}</h1>);
    else if (line.startsWith('## '))
      elements.push(<h2 key={key()} className="text-base font-bold mt-5 mb-2 pb-1" style={{ color: t.textPrimary, borderBottom: `1px solid ${t.divider}` }}>{line.slice(3)}</h2>);
    else if (line.startsWith('### '))
      elements.push(<h3 key={key()} className="text-sm font-semibold mt-4 mb-1.5" style={{ color: t.textPrimary }}>{line.slice(4)}</h3>);
    else if (line.startsWith('- ') || line.startsWith('* ')) {
      const parsed = parseInline(line.slice(2));
      elements.push(
        <div key={key()} className="flex items-start gap-2 my-1">
          <span className="mt-1 flex-shrink-0" style={{ color: t.isDark ? '#334155' : '#cbd5e1' }}>•</span>
          <span className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
      );
    } else if (line.match(/^\d+\. /)) {
      const parsed = parseInline(line.replace(/^\d+\. /, ''));
      const num = line.match(/^(\d+)/)?.[1];
      elements.push(
        <div key={key()} className="flex items-start gap-2 my-1">
          <span className="text-xs font-bold mt-0.5 w-4 flex-shrink-0" style={{ color: t.textTertiary }}>{num}.</span>
          <span className="text-sm leading-relaxed" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={key()} className="h-2" />);
    } else {
      const parsed = parseInline(line);
      elements.push(<p key={key()} className="text-sm leading-relaxed my-1" style={{ color: t.textSecondary }} dangerouslySetInnerHTML={{ __html: parsed }} />);
    }
  });
  if (inTable) { const el = flushTable(tableBuffer); if (el) elements.push(el); }

  return (
    <>
      <style>{`
        .md-code {
          background: ${t.isDark ? '#0f172a' : '#f1f5f9'};
          border: 1px solid ${t.isDark ? '#334155' : '#e2e8f0'};
          border-radius: 4px;
          padding: 1px 5px;
          font-size: 11px;
          font-family: monospace;
          color: ${t.isDark ? '#22d3ee' : '#334155'};
        }
      `}</style>
      <div>{elements}</div>
    </>
  );
}

export default function NotesView() {
  const { activeSection, activeUnit, activeModule } = useAppStore();
  const t = useTheme();
  const units = cpaDatabase[activeSection] || [];
  const selectedUnit = activeUnit ? units.find((u) => u.id === activeUnit) : undefined;
  const selectedModule = activeModule ? selectedUnit?.modules.find((m) => m.id === activeModule) : undefined;
  const [search, setSearch] = useState('');
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);

  useEffect(() => {
    setSearch('');
    setActiveNoteId(null);
  }, [activeModule]);

  const sectionNotes = SECTION_NOTES[activeSection] ?? [];
  const allNotes: Note[] = selectedModule
    ? selectedModule.notes
    : selectedUnit
    ? [...sectionNotes, ...selectedUnit.modules.flatMap((m) => m.notes)]
    : [...sectionNotes, ...units.flatMap((u) => u.modules.flatMap((m) => m.notes))];
  const filtered = allNotes.filter(
    (n) =>
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.topic.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some((tg) => tg.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="flex" style={{ minHeight: 'calc(100vh - 88px)' }}>
      {/* Sidebar */}
      <div
        className="w-64 flex-shrink-0 flex flex-col overflow-y-auto"
        style={{ backgroundColor: t.sidebarBg, borderRight: `1px solid ${t.sidebarBorder}` }}
      >
        <div className="p-4" style={{ borderBottom: `1px solid ${t.divider}` }}>
          <h2 className="text-sm font-semibold mb-3" style={{ color: t.textPrimary }}>Visual Notes</h2>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: t.textTertiary }} />
            <input
              type="text"
              placeholder="Search notes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg transition-colors"
              style={{
                backgroundColor: t.inputBg,
                border: `1px solid ${t.inputBorder}`,
                color: t.inputText,
              }}
            />
          </div>
        </div>

        <div className="p-2 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <FileText size={20} className="mx-auto mb-2" style={{ color: t.textTertiary }} />
              <p className="text-xs" style={{ color: t.textTertiary }}>No notes found</p>
            </div>
          ) : (
            filtered.map((note) => {
              const isActive = (activeNoteId ?? filtered[0]?.id) === note.id;
              return (
                <button
                  key={note.id}
                  onClick={() => {
                    setActiveNoteId(note.id);
                    document.getElementById(`note-${note.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="w-full text-left p-3 rounded-xl transition-all duration-150 mb-1"
                  style={{
                    backgroundColor: isActive ? (t.isDark ? '#1e293b' : '#0f172a') : 'transparent',
                    border: isActive ? `1px solid ${t.isDark ? '#334155' : 'transparent'}` : '1px solid transparent',
                  }}
                >
                  <div className="flex items-start gap-2">
                    <BookMarked size={12} className="mt-0.5 flex-shrink-0" style={{ color: isActive ? (t.isDark ? '#22d3ee' : '#94a3b8') : t.textTertiary }} />
                    <div className="min-w-0">
                      <p className="text-xs font-medium truncate" style={{ color: isActive ? (t.isDark ? '#ffffff' : '#ffffff') : t.textPrimary }}>
                        {note.title}
                      </p>
                      <p className="text-xs truncate mt-0.5" style={{ color: isActive ? (t.isDark ? '#94a3b8' : 'rgba(255,255,255,0.5)') : t.textTertiary }}>
                        {note.topic}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {note.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="text-xs px-1.5 py-0.5 rounded-md"
                            style={
                              isActive
                                ? { backgroundColor: t.isDark ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.15)', color: t.isDark ? '#64748b' : 'rgba(255,255,255,0.6)' }
                                : { backgroundColor: t.isDark ? '#1e293b' : '#f1f5f9', color: t.textTertiary }
                            }
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto" style={{ backgroundColor: t.canvas }}>
        {filtered.length > 0 ? (
          <div className="max-w-3xl mx-auto p-8 space-y-10">
            {filtered.map((note) => (
              <div key={note.id} id={`note-${note.id}`}>
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-xs mb-2" style={{ color: t.textTertiary }}>
                    <span>{activeSection}</span>
                    <ChevronRight size={12} />
                    <span>{note.topic}</span>
                  </div>
                  <h1 className="text-2xl font-bold" style={{ color: t.textPrimary }}>{note.title}</h1>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {note.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-1 rounded-lg font-medium"
                        style={{ backgroundColor: t.notes.bg, color: t.notes.text, border: `1px solid ${t.notes.border}` }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div
                  className="rounded-2xl p-6"
                  style={{ backgroundColor: t.card, border: `1px solid ${t.cardBorder}`, boxShadow: t.cardShadow }}
                >
                  <MarkdownRenderer content={note.content} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <FileText size={40} className="mb-4" style={{ color: t.textTertiary }} />
            <h2 className="text-base font-semibold" style={{ color: t.textPrimary }}>No notes found</h2>
            <p className="text-sm mt-1" style={{ color: t.textTertiary }}>Try a different search or select a module.</p>
          </div>
        )}
      </div>
    </div>
  );
}
