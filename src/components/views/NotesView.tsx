'use client';

import { useState } from 'react';
import { FileText, Search, ChevronRight, BookMarked } from 'lucide-react';
import { useAppStore } from '@/store/appStore';
import { cpaDatabase } from '@/data/cpaDatabase';
import { Note } from '@/lib/types';

function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let tableBuffer: string[] = [];
  let inTable = false;
  let keyCounter = 0;

  const getKey = () => `md-${keyCounter++}`;

  const parseInline = (text: string) => {
    // Bold
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    // Italic
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
    // Code
    text = text.replace(/`(.+?)`/g, '<code class="inline-code">$1</code>');
    return text;
  };

  const flushTable = (buffer: string[]) => {
    if (buffer.length < 2) return null;
    const headers = buffer[0].split('|').filter(Boolean).map((h) => h.trim());
    const rows = buffer.slice(2).map((row) => row.split('|').filter(Boolean).map((c) => c.trim()));

    return (
      <div key={getKey()} className="overflow-x-auto my-4 rounded-xl border border-slate-200">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              {headers.map((h, i) => (
                <th key={i} className="px-4 py-2.5 text-left font-semibold text-slate-700">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-slate-100 hover:bg-slate-50">
                {row.map((cell, ci) => (
                  <td key={ci} className="px-4 py-2 text-slate-600">{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  lines.forEach((line, idx) => {
    if (line.startsWith('|')) {
      inTable = true;
      tableBuffer.push(line);
      return;
    }

    if (inTable) {
      const tableEl = flushTable(tableBuffer);
      if (tableEl) elements.push(tableEl);
      tableBuffer = [];
      inTable = false;
    }

    if (line.startsWith('# ')) {
      elements.push(<h1 key={getKey()} className="text-xl font-bold text-slate-900 mt-6 mb-3">{line.slice(2)}</h1>);
    } else if (line.startsWith('## ')) {
      elements.push(<h2 key={getKey()} className="text-base font-bold text-slate-800 mt-5 mb-2 pb-1 border-b border-slate-100">{line.slice(3)}</h2>);
    } else if (line.startsWith('### ')) {
      elements.push(<h3 key={getKey()} className="text-sm font-semibold text-slate-700 mt-4 mb-1.5">{line.slice(4)}</h3>);
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      const parsed = parseInline(line.slice(2));
      elements.push(
        <div key={getKey()} className="flex items-start gap-2 my-1">
          <span className="text-slate-300 mt-1 flex-shrink-0">•</span>
          <span className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
      );
    } else if (line.match(/^\d+\. /)) {
      const parsed = parseInline(line.replace(/^\d+\. /, ''));
      const num = line.match(/^(\d+)/)?.[1];
      elements.push(
        <div key={getKey()} className="flex items-start gap-2 my-1">
          <span className="text-xs font-bold text-slate-400 mt-0.5 flex-shrink-0 w-4">{num}.</span>
          <span className="text-sm text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: parsed }} />
        </div>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={getKey()} className="h-2" />);
    } else {
      const parsed = parseInline(line);
      elements.push(
        <p key={getKey()} className="text-sm text-slate-600 leading-relaxed my-1" dangerouslySetInnerHTML={{ __html: parsed }} />
      );
    }
  });

  if (inTable) {
    const tableEl = flushTable(tableBuffer);
    if (tableEl) elements.push(tableEl);
  }

  return (
    <div className="prose-custom">
      <style>{`.inline-code { background: #f1f5f9; border: 1px solid #e2e8f0; border-radius: 4px; padding: 1px 5px; font-size: 11px; font-family: monospace; color: #334155; }`}</style>
      {elements}
    </div>
  );
}

export default function NotesView() {
  const { activeSection } = useAppStore();
  const units = cpaDatabase[activeSection] || [];
  const [search, setSearch] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const allNotes: Note[] = units.flatMap((u) => u.modules.flatMap((m) => m.notes));
  const filtered = allNotes.filter(
    (n) =>
      !search ||
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.topic.toLowerCase().includes(search.toLowerCase()) ||
      n.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  if (!selectedNote && filtered.length > 0 && allNotes.length > 0) {
    // auto-select first
  }

  const activeNote = selectedNote || filtered[0] || null;

  return (
    <div className="flex h-full" style={{ minHeight: 'calc(100vh - 120px)' }}>
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 border-r border-slate-200 bg-white overflow-y-auto">
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-sm font-semibold text-slate-800 mb-3">Visual Notes</h2>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search notes…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-slate-300 focus:bg-white transition-colors"
            />
          </div>
        </div>

        <div className="p-2">
          {filtered.length === 0 ? (
            <div className="text-center py-8">
              <FileText size={20} className="text-slate-200 mx-auto mb-2" />
              <p className="text-xs text-slate-400">No notes found</p>
            </div>
          ) : (
            filtered.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note)}
                className={`w-full text-left p-3 rounded-xl transition-colors mb-1 ${
                  activeNote?.id === note.id
                    ? 'bg-slate-900 text-white'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-start gap-2">
                  <BookMarked size={12} className={`mt-0.5 flex-shrink-0 ${activeNote?.id === note.id ? 'text-slate-300' : 'text-slate-400'}`} />
                  <div className="min-w-0">
                    <p className={`text-xs font-medium truncate ${activeNote?.id === note.id ? 'text-white' : 'text-slate-800'}`}>
                      {note.title}
                    </p>
                    <p className={`text-xs truncate mt-0.5 ${activeNote?.id === note.id ? 'text-slate-400' : 'text-slate-400'}`}>
                      {note.topic}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {note.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-1.5 py-0.5 rounded-md ${
                            activeNote?.id === note.id
                              ? 'bg-white/10 text-white/60'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto bg-[#fdfbf7]">
        {activeNote ? (
          <div className="max-w-3xl mx-auto p-8">
            {/* Note header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span>{activeSection}</span>
                <ChevronRight size={12} />
                <span>{activeNote.topic}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900">{activeNote.title}</h1>
              <div className="flex flex-wrap gap-2 mt-3">
                {activeNote.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-lg font-medium"
                    style={{ backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-200 mb-6" />

            {/* Rendered content */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.03)]">
              <MarkdownRenderer content={activeNote.content} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <FileText size={40} className="text-slate-200 mb-4" />
            <h2 className="text-base font-semibold text-slate-600">Select a note to read</h2>
            <p className="text-sm text-slate-400 mt-1">Or generate new notes using the AI panel.</p>
          </div>
        )}
      </div>
    </div>
  );
}
