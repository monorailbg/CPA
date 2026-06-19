// ─── CPA Exam Section Types ───────────────────────────────────────────────

export type CPASection = 'FAR' | 'AUD' | 'REG' | 'BAR' | 'TCP' | 'ISC';
export type DisciplineSection = 'BAR' | 'TCP' | 'ISC';

export type ContentType = 'mcq' | 'tbs' | 'flashcard' | 'notes' | 'glossary';

export interface MCQOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation?: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: MCQOption[];
  selectedOption?: string;
  isAnswered: boolean;
  isCorrect?: boolean;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  aicpaSkill?: string;
}

export interface TBSExhibit {
  id: string;
  title: string;
  content: string;
}

export interface TBS {
  id: string;
  title: string;
  scenario: string;
  exhibits: TBSExhibit[];
  questions: Array<{
    id: string;
    text: string;
    answer?: string;
    correctAnswer: string;
  }>;
  topic: string;
  isCompleted: boolean;
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  topic: string;
  masteryLevel: 0 | 1 | 2 | 3 | 4 | 5;
  nextReviewDate?: string;
  tags: string[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  markdownContent?: string;
  tags: string[];
  topic: string;
}

export interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  relatedTerms: string[];
  section: CPASection;
  category: string;
}

export interface BlindSpot {
  topicId: string;
  topicName: string;
  selfConfidence: number;
  actualScore: number;
  gapScore: number;
  attempts: number;
  lastAttempted?: string;
}

// ─── Quiz Session ──────────────────────────────────────────────────────────

export interface QuizSession {
  id: string;
  title: string;
  description: string;
  unitId: string;
  mcqIds: string[];
  timeLimit?: number;
  mode: 'study' | 'exam';
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
  completedAt?: string;
  score?: number;
}

// ─── Module & Unit Structure ───────────────────────────────────────────────

export interface ModuleMetrics {
  mcqCompleted: number;
  mcqTotal: number;
  mcqCorrect: number;
  tbsCompleted: number;
  tbsTotal: number;
  flashcardMastery: number;
  notesRead: boolean;
  studyTimeMinutes: number;
}

export interface Module {
  id: string;
  name: string;
  shortName: string;
  description: string;
  order: number;
  metrics: ModuleMetrics;
  mcqs: MCQ[];
  tbsItems: TBS[];
  flashcards: Flashcard[];
  notes: Note[];
  blindSpots: BlindSpot[];
  conceptTags?: string[];
}

export interface Unit {
  id: string;
  code: string;
  name: string;
  description: string;
  order: number;
  section: CPASection;
  modules: Module[];
  totalProgress: number;
  isActive: boolean;
  lastStudied?: string;
  // Unit-level aggregated content
  allMcqs: MCQ[];
  allFlashcards: Flashcard[];
  quizSessions: QuizSession[];
}

export interface SectionProgress {
  section: CPASection;
  totalUnits: number;
  completedUnits: number;
  overallProgress: number;
  studyStreak: number;
  lastStudied?: string;
  estimatedHoursRemaining: number;
  totalStudyHours: number;
}

export interface CPADatabase {
  FAR: Unit[];
  AUD: Unit[];
  REG: Unit[];
  BAR: Unit[];
  TCP: Unit[];
  ISC: Unit[];
}

// ─── UI State Types ───────────────────────────────────────────────────────

export type WorkspaceTab =
  | 'dashboard'
  | 'mindmap'
  | 'flashcards'
  | 'notes'
  | 'quiz'
  | 'glossary'
  | 'graph'
  | 'blindspot';

export type GenerateContentType = 'mcq' | 'tbs' | 'flashcards' | 'notes' | 'glossary';
export type StudyMode = 'study' | 'exam';
export type Difficulty = 'easy' | 'medium' | 'hard' | 'adaptive';

export interface GenerateConfig {
  contentTypes: GenerateContentType[];
  mode: StudyMode;
  difficulty: Difficulty;
  questionCount: number;
  selectedUnit?: string;
  selectedModule?: string;
  focusBlindSpots: boolean;
  timedSession: boolean;
  timeLimit: number;
}

export interface StudySession {
  id: string;
  startTime: string;
  endTime?: string;
  section: CPASection;
  unitId: string;
  contentType: ContentType;
  questionsAttempted: number;
  questionsCorrect: number;
  timeSpentMinutes: number;
}

export interface AppState {
  activeSection: CPASection;
  activeTab: WorkspaceTab;
  activeUnit?: string;
  activeModule?: string;
  activeQuizSession?: string;
  showGenerateModal: boolean;
  generateConfig: GenerateConfig;
  isDarkMode: boolean;
  studySessions: StudySession[];
  sectionProgress: Record<CPASection, SectionProgress>;
}
