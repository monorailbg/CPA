import { CPADatabase, Unit, Module, GlossaryTerm, CPASection } from '@/lib/types';
import {
  expandTopics,
  generateModuleObjectives,
  generateModuleNotes,
  generateUnitMcqs,
  generateUnitFlashcards,
  generateUnitQuizSessions,
} from './curriculumGenerator';
import { curriculumOutline, ModuleSeed, UnitSeedSpec } from './moduleSeeds';

// ─── Shared Helpers ────────────────────────────────────────────────────────

const makeMetrics = (mc: number, mt: number, mc_c: number, tb: number, tt: number, fm: number) => ({
  mcqCompleted: mc,
  mcqTotal: mt,
  mcqCorrect: mc_c,
  tbsCompleted: tb,
  tbsTotal: tt,
  flashcardMastery: fm,
  notesRead: fm > 50,
  studyTimeMinutes: Math.round(mc * 2.5 + tb * 8),
});

const MODULE_MCQ_COUNT = 20;

function buildModule(unitId: string, order: number, seed: ModuleSeed): Module {
  const moduleId = `${unitId}-${seed.shortName.toLowerCase()}`;
  const topics = expandTopics(seed.topics, MODULE_MCQ_COUNT);
  const mcqs = generateUnitMcqs(moduleId, topics);
  const flashcards = generateUnitFlashcards(moduleId, topics);
  const objectives = generateModuleObjectives(seed.name, seed.topics);
  const notes = generateModuleNotes(moduleId, seed.name, seed.description, seed.topics, objectives);
  return {
    id: moduleId,
    name: seed.name,
    shortName: seed.shortName,
    description: seed.description,
    order,
    metrics: makeMetrics(0, mcqs.length, 0, 0, 0, 0),
    mcqs,
    tbsItems: [],
    flashcards,
    notes: [notes],
    blindSpots: [],
  };
}

function buildUnit(section: CPASection, order: number, spec: UnitSeedSpec): Unit {
  const unitId = `${section.toLowerCase()}-${spec.code.toLowerCase()}`;
  const modules = spec.modules.map((m, i) => buildModule(unitId, i + 1, m));
  const allMcqs = modules.flatMap((m) => m.mcqs);
  const allFlashcards = modules.flatMap((m) => m.flashcards);
  const quizSessions = generateUnitQuizSessions(unitId, allMcqs);
  return {
    id: unitId,
    code: spec.code,
    name: spec.name,
    description: spec.description,
    order,
    section,
    isActive: order === 1,
    totalProgress: 0,
    lastStudied: undefined,
    modules,
    allMcqs,
    allFlashcards,
    quizSessions,
  };
}

// ─── Glossary Terms ─────────────────────────────────────────────────────────

export const glossaryTerms: GlossaryTerm[] = [
  {
    id: 'gl-1',
    term: 'Accrual Basis Accounting',
    definition: 'An accounting method that recognizes revenues when earned and expenses when incurred, regardless of when cash is received or paid. Required under GAAP for most entities.',
    relatedTerms: ['Cash Basis', 'Revenue Recognition', 'Matching Principle'],
    section: 'FAR',
    category: 'Accounting Concepts',
  },
  {
    id: 'gl-2',
    term: 'Audit Risk',
    definition: 'The risk that the auditor expresses an inappropriate audit opinion when the financial statements are materially misstated. AR = IR × CR × DR.',
    relatedTerms: ['Inherent Risk', 'Control Risk', 'Detection Risk'],
    section: 'AUD',
    category: 'Auditing',
  },
  {
    id: 'gl-3',
    term: 'Basis of Property',
    definition: 'The cost or other value used to calculate gain or loss on disposal, or to compute depreciation. Adjusted basis = Original cost + Improvements - Depreciation taken.',
    relatedTerms: ['Adjusted Basis', 'Capital Gain', 'Like-Kind Exchange'],
    section: 'REG',
    category: 'Taxation',
  },
  {
    id: 'gl-4',
    term: 'Comparability',
    definition: 'An enhancing qualitative characteristic that enables users to identify similarities and differences between two sets of economic phenomena, including consistency in applying accounting policies across periods.',
    relatedTerms: ['Consistency', 'Faithful Representation', 'Qualitative Characteristics'],
    section: 'FAR',
    category: 'Conceptual Framework',
  },
  {
    id: 'gl-5',
    term: 'Depreciation Recapture',
    definition: 'The portion of gain on sale of depreciable property that must be recognized as ordinary income (§1245) or at a maximum 25% rate (§1250 "unrecaptured" gain for real property).',
    relatedTerms: ['§1231 Property', '§1245 Property', '§1250 Property', 'Capital Gains'],
    section: 'REG',
    category: 'Property Taxation',
  },
  {
    id: 'gl-6',
    term: 'Engagement Letter',
    definition: 'A formal written agreement between the auditor and client that documents the terms of the engagement, including the scope of services, fees, and responsibilities of each party.',
    relatedTerms: ['Management Letter', 'Representation Letter', 'Audit Documentation'],
    section: 'AUD',
    category: 'Audit Engagement',
  },
  {
    id: 'gl-7',
    term: 'Fair Value',
    definition: 'The price that would be received to sell an asset or paid to transfer a liability in an orderly transaction between market participants at the measurement date (ASC 820).',
    relatedTerms: ['Level 1 Inputs', 'Level 2 Inputs', 'Level 3 Inputs', 'Exit Price'],
    section: 'FAR',
    category: 'Measurement',
  },
  {
    id: 'gl-8',
    term: 'Goodwill',
    definition: 'An intangible asset representing the excess of acquisition cost over the fair value of identifiable net assets acquired in a business combination. Goodwill is not amortized but tested annually for impairment.',
    relatedTerms: ['Business Combination', 'Impairment', 'Intangible Assets', 'ASC 350'],
    section: 'FAR',
    category: 'Intangibles',
  },
  {
    id: 'gl-9',
    term: 'Independence',
    definition: 'The state of mind that permits an auditor to perform an engagement without being affected by influences that compromise professional judgment. Includes independence in fact and independence in appearance.',
    relatedTerms: ['Objectivity', 'Threats to Independence', 'Safeguards'],
    section: 'AUD',
    category: 'Ethics',
  },
  {
    id: 'gl-10',
    term: 'Inherent Risk',
    definition: 'The susceptibility of an assertion to a material misstatement, assuming no related controls. High inherent risk areas include complex estimates, related-party transactions, and judgment-intensive accounts.',
    relatedTerms: ['Audit Risk', 'Control Risk', 'Detection Risk', 'Risk Assessment'],
    section: 'AUD',
    category: 'Risk Assessment',
  },
];

// ─── Assembled Database ─────────────────────────────────────────────────────

function buildSection(section: CPASection): Unit[] {
  return curriculumOutline[section].map((spec, i) => buildUnit(section, i + 1, spec));
}

export const cpaDatabase: CPADatabase = {
  FAR: buildSection('FAR'),
  AUD: buildSection('AUD'),
  REG: buildSection('REG'),
  BAR: buildSection('BAR'),
  TCP: buildSection('TCP'),
  ISC: buildSection('ISC'),
};

export const initialSectionProgress = {
  FAR: {
    section: 'FAR' as const,
    totalUnits: 6,
    completedUnits: 0,
    overallProgress: 0,
    studyStreak: 0,
    lastStudied: undefined,
    estimatedHoursRemaining: 52,
    totalStudyHours: 0,
  },
  AUD: {
    section: 'AUD' as const,
    totalUnits: 6,
    completedUnits: 0,
    overallProgress: 0,
    studyStreak: 0,
    lastStudied: undefined,
    estimatedHoursRemaining: 68,
    totalStudyHours: 0,
  },
  REG: {
    section: 'REG' as const,
    totalUnits: 6,
    completedUnits: 0,
    overallProgress: 0,
    studyStreak: 0,
    lastStudied: undefined,
    estimatedHoursRemaining: 74,
    totalStudyHours: 0,
  },
  BAR: {
    section: 'BAR' as const,
    totalUnits: 5,
    completedUnits: 0,
    overallProgress: 0,
    studyStreak: 0,
    lastStudied: undefined,
    estimatedHoursRemaining: 30,
    totalStudyHours: 0,
  },
  TCP: {
    section: 'TCP' as const,
    totalUnits: 5,
    completedUnits: 0,
    overallProgress: 0,
    studyStreak: 0,
    lastStudied: undefined,
    estimatedHoursRemaining: 28,
    totalStudyHours: 0,
  },
  ISC: {
    section: 'ISC' as const,
    totalUnits: 4,
    completedUnits: 0,
    overallProgress: 0,
    studyStreak: 0,
    lastStudied: undefined,
    estimatedHoursRemaining: 32,
    totalStudyHours: 0,
  },
};
