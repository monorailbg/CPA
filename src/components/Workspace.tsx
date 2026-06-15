'use client';

import { useTheme } from '@/lib/useTheme';
import { useAppStore } from '@/store/appStore';
import Navbar from '@/components/navigation/Navbar';
import Sidebar from '@/components/navigation/Sidebar';
import FloatingGenerateButton from '@/components/ui/FloatingGenerateButton';
import GenerateModal from '@/components/modals/GenerateModal';
import DashboardView from '@/components/views/DashboardView';
import MindMapView from '@/components/views/MindMapView';
import FlashcardView from '@/components/views/FlashcardView';
import NotesView from '@/components/views/NotesView';
import QuizView from '@/components/views/QuizView';
import GlossaryView from '@/components/views/GlossaryView';
import GraphView from '@/components/views/GraphView';
import BlindSpotView from '@/components/views/BlindSpotView';

const FULL_WIDTH_TABS = ['notes', 'glossary'] as const;

export default function Workspace() {
  const { activeTab } = useAppStore();
  const t = useTheme();
  const isFullWidth = FULL_WIDTH_TABS.includes(activeTab as typeof FULL_WIDTH_TABS[number]);

  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':  return <DashboardView />;
      case 'mindmap':    return <MindMapView />;
      case 'flashcards': return <FlashcardView />;
      case 'notes':      return <NotesView />;
      case 'quiz':       return <QuizView />;
      case 'glossary':   return <GlossaryView />;
      case 'graph':      return <GraphView />;
      case 'blindspot':  return <BlindSpotView />;
      default:           return <DashboardView />;
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ backgroundColor: t.canvas, transition: 'background-color 0.2s ease' }}
    >
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {!isFullWidth && <Sidebar />}
        <main
          className="flex-1 overflow-y-auto"
          style={{ minHeight: 'calc(100vh - 88px)', backgroundColor: t.canvas }}
        >
          {renderView()}
        </main>
      </div>
      <FloatingGenerateButton />
      <GenerateModal />
    </div>
  );
}
