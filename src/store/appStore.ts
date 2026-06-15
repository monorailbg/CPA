import { create } from 'zustand';
import { AppState, CPASection, WorkspaceTab, GenerateConfig, StudyMode, Difficulty } from '@/lib/types';
import { initialSectionProgress } from '@/data/cpaDatabase';

const defaultGenerateConfig: GenerateConfig = {
  contentTypes: ['mcq'],
  mode: 'study',
  difficulty: 'adaptive',
  questionCount: 20,
  selectedUnit: undefined,
  selectedModule: undefined,
  focusBlindSpots: false,
  timedSession: false,
  timeLimit: 45,
};

interface AppActions {
  setActiveSection: (section: CPASection) => void;
  setActiveTab: (tab: WorkspaceTab) => void;
  setActiveUnit: (unitId: string | undefined) => void;
  setActiveModule: (moduleId: string | undefined) => void;
  openGenerateModal: () => void;
  closeGenerateModal: () => void;
  toggleContentType: (type: GenerateConfig['contentTypes'][number]) => void;
  setMode: (mode: StudyMode) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  setQuestionCount: (count: number) => void;
  toggleFocusBlindSpots: () => void;
  toggleTimedSession: () => void;
  setTimeLimit: (limit: number) => void;
  toggleDarkMode: () => void;
  updateProgress: (section: CPASection, progress: Partial<AppState['sectionProgress'][CPASection]>) => void;
}

export const useAppStore = create<AppState & AppActions>((set) => ({
  activeSection: 'FAR',
  activeTab: 'dashboard',
  activeUnit: 'far-f1',
  activeModule: 'far-f1-m1',
  showGenerateModal: false,
  generateConfig: defaultGenerateConfig,
  isDarkMode: false,
  studySessions: [],
  sectionProgress: initialSectionProgress,

  setActiveSection: (section) =>
    set((state) => ({
      activeSection: section,
      activeUnit: undefined,
      activeModule: undefined,
    })),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setActiveUnit: (unitId) => set({ activeUnit: unitId, activeModule: undefined }),

  setActiveModule: (moduleId) => set({ activeModule: moduleId }),

  openGenerateModal: () => set({ showGenerateModal: true }),

  closeGenerateModal: () => set({ showGenerateModal: false }),

  toggleContentType: (type) =>
    set((state) => {
      const current = state.generateConfig.contentTypes;
      const next = current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type];
      return {
        generateConfig: {
          ...state.generateConfig,
          contentTypes: next.length === 0 ? [type] : next,
        },
      };
    }),

  setMode: (mode) =>
    set((state) => ({
      generateConfig: { ...state.generateConfig, mode },
    })),

  setDifficulty: (difficulty) =>
    set((state) => ({
      generateConfig: { ...state.generateConfig, difficulty },
    })),

  setQuestionCount: (count) =>
    set((state) => ({
      generateConfig: { ...state.generateConfig, questionCount: count },
    })),

  toggleFocusBlindSpots: () =>
    set((state) => ({
      generateConfig: {
        ...state.generateConfig,
        focusBlindSpots: !state.generateConfig.focusBlindSpots,
      },
    })),

  toggleTimedSession: () =>
    set((state) => ({
      generateConfig: {
        ...state.generateConfig,
        timedSession: !state.generateConfig.timedSession,
      },
    })),

  setTimeLimit: (limit) =>
    set((state) => ({
      generateConfig: { ...state.generateConfig, timeLimit: limit },
    })),

  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),

  updateProgress: (section, progress) =>
    set((state) => ({
      sectionProgress: {
        ...state.sectionProgress,
        [section]: { ...state.sectionProgress[section], ...progress },
      },
    })),
}));
