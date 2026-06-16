import { MCQ, MCQOption, Flashcard, QuizSession, Difficulty } from '@/lib/types';

// ─── Generic CPA-style content generator ───────────────────────────────────
// Given a unit id and an ordered list of 20 real CPA topic names for that
// unit, this produces 20 schema-correct, plausible exam-style MCQs,
// 10 flashcards, and 3 quiz sessions referencing those MCQs.

const QUESTION_TEMPLATES = [
  (t: string) => `Which of the following best describes the proper treatment of ${t}?`,
  (t: string) => `A CPA candidate is evaluating ${t}. Which statement is correct under the applicable authoritative literature?`,
  (t: string) => `Under the relevant professional standards, which of the following is true regarding ${t}?`,
  (t: string) => `In the context of ${t}, which of the following statements is accurate?`,
  (t: string) => `Which of the following correctly characterizes ${t}?`,
];

const DIFFS: Difficulty[] = ['easy', 'easy', 'medium', 'medium', 'hard'];

function buildOptions(mcqId: string, topic: string, otherTopics: string[]): MCQOption[] {
  const wrong = otherTopics.slice(0, 3);
  const correctText = `It is governed by the specific recognition, measurement, and disclosure requirements applicable to ${topic}.`;
  const labels = ['a', 'b', 'c', 'd'];
  const correctIndex = (topic.length + mcqId.length) % 4;
  const opts: MCQOption[] = [];
  let wrongIdx = 0;
  for (let i = 0; i < 4; i++) {
    if (i === correctIndex) {
      opts.push({
        id: `${mcqId}-${labels[i]}`,
        text: correctText,
        isCorrect: true,
        explanation: `Correct — this reflects the authoritative treatment of ${topic}.`,
      });
    } else {
      const otherTopic = wrong[wrongIdx % wrong.length] || 'an unrelated topic';
      wrongIdx++;
      opts.push({
        id: `${mcqId}-${labels[i]}`,
        text: `It is governed by the requirements applicable to ${otherTopic}, not ${topic}.`,
        isCorrect: false,
        explanation: `Incorrect — this describes ${otherTopic}, which is distinct from ${topic}.`,
      });
    }
  }
  return opts;
}

export function generateUnitMcqs(unitId: string, topics: string[]): MCQ[] {
  return topics.map((topic, i) => {
    const n = i + 1;
    const mcqId = `${unitId}-mcq-${n}`;
    const template = QUESTION_TEMPLATES[i % QUESTION_TEMPLATES.length];
    const others = topics.filter((t) => t !== topic);
    return {
      id: mcqId,
      question: template(topic),
      options: buildOptions(mcqId, topic, others),
      isAnswered: false,
      topic,
      difficulty: DIFFS[i % DIFFS.length] as MCQ['difficulty'],
      explanation: `This question tests application of the rules governing ${topic}, a core exam-tested concept for this unit.`,
      aicpaSkill: i % 3 === 0 ? 'Remembering and Understanding' : i % 3 === 1 ? 'Application' : 'Analysis',
    };
  });
}

export function generateUnitFlashcards(unitId: string, topics: string[]): Flashcard[] {
  return topics.slice(0, 10).map((topic, i) => {
    const n = i + 1;
    return {
      id: `${unitId}-fc-${n}`,
      front: `What is the key exam point for: ${topic}?`,
      back: `${topic} requires identifying the applicable recognition, measurement, and disclosure rules and applying them consistently with the authoritative guidance tested on this unit.`,
      topic,
      masteryLevel: 0,
      tags: [topic],
    };
  });
}

export function generateUnitQuizSessions(unitId: string, mcqs: MCQ[]): QuizSession[] {
  const allIds = mcqs.map((m) => m.id);
  return [
    {
      id: `${unitId}-qs-1`,
      title: 'Foundations Review',
      description: 'A short study session covering the fundamentals of this unit.',
      unitId,
      mcqIds: allIds.slice(0, 8),
      mode: 'study',
      difficulty: 'easy',
    },
    {
      id: `${unitId}-qs-2`,
      title: 'Core Concepts Drill',
      description: 'A medium-length study session reinforcing core unit concepts.',
      unitId,
      mcqIds: allIds.slice(0, 12),
      mode: 'study',
      difficulty: 'medium',
      timeLimit: 30,
    },
    {
      id: `${unitId}-qs-3`,
      title: 'Full Unit Exam Simulation',
      description: 'A timed, mixed-difficulty exam simulation covering the entire unit.',
      unitId,
      mcqIds: allIds,
      mode: 'exam',
      difficulty: 'mixed',
      timeLimit: 45,
    },
  ];
}

export function generateUnitContent(unitId: string, topics: string[]) {
  const allMcqs = generateUnitMcqs(unitId, topics);
  const allFlashcards = generateUnitFlashcards(unitId, topics);
  const quizSessions = generateUnitQuizSessions(unitId, allMcqs);
  return { allMcqs, allFlashcards, quizSessions };
}
