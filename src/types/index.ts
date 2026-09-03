export type TenseCategory = 'present' | 'past' | 'future';
export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface TenseFormula {
  affirmative: string;
  negative: string;
  question: string;
  notes?: string;
}

export interface ExampleSentence {
  sentence: string;
  highlight: string;
  meaning?: string;
  context?: string;
}

export interface GrammarRule {
  title: string;
  explanation: string;
  examples: string[];
  exceptions?: string[];
}

export interface CommonMistake {
  incorrect: string;
  correct: string;
  explanation: string;
}

export interface RealLifeDialogue {
  speakerA: string;
  lineA: string;
  speakerB: string;
  lineB: string;
  context: string;
}

export interface TimelineData {
  timePosition: 'past-completed' | 'past-continuous' | 'past-before-past' | 'present-regular' | 'present-now' | 'past-to-present' | 'future-simple' | 'future-continuous' | 'future-before-future';
  description: string;
  visualAnchor: string;
}

export type QuestionType =
  | 'fill-in-blank'
  | 'multiple-choice'
  | 'sentence-correction'
  | 'rearrange-words'
  | 'identify-tense'
  | 'translation';

export interface PracticeQuestion {
  id: string;
  tenseId: string;
  category: TenseCategory;
  difficulty: DifficultyLevel;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  tenseRule: string;
  hint?: string;
  // For rearrange questions
  scrambledWords?: string[];
  // For translation questions
  originalLanguageText?: string;
  // For sentence correction
  sentenceWithMistake?: string;
}

export interface TenseData {
  id: string;
  slug: string;
  name: string;
  category: TenseCategory;
  difficulty: DifficultyLevel;
  shortDescription: string;
  beginnerExplanation: string; // "Explain like I'm a beginner"
  whenToUse: string[];
  whenNotToUse: string[];
  formula: TenseFormula;
  signalWords: string[];
  rules: GrammarRule[];
  spellingRules?: GrammarRule[];
  examples: ExampleSentence[];
  commonMistakes: CommonMistake[];
  realLifeDialogues: RealLifeDialogue[];
  timeline: TimelineData;
  tips: string[];
  speakingPrompt: {
    prompt: string;
    modelAnswer: string;
    tips: string;
  };
  quickExercises: PracticeQuestion[];
}

export interface FlashcardItem {
  id: string;
  tenseId: string;
  tenseName: string;
  category: TenseCategory;
  sentence: string;
  formula: string;
  usage: string;
  explanation: string;
  signalWordUsed?: string;
}

export interface MistakeRecord {
  id: string;
  questionId: string;
  tenseId: string;
  tenseName: string;
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  explanation: string;
  date: string;
  resolved: boolean;
}

export interface QuizQuestionRecord {
  question: PracticeQuestion;
  userAnswer: string;
  isCorrect: boolean;
}

export interface QuizResult {
  id: string;
  date: string;
  totalQuestions: number;
  score: number;
  percentage: number;
  timeSpentSeconds: number;
  category: string;
  difficulty: string;
  records: QuizQuestionRecord[];
  weakTenses: string[];
  recommendation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  progress: number;
  maxProgress: number;
}

export interface UserStats {
  xp: number;
  level: number;
  streakDays: number;
  lastActiveDate: string;
  totalAnswered: number;
  totalCorrect: number;
  completedLessons: string[]; // tense ids
  favoritedTenses: string[];
  mistakes: MistakeRecord[];
  quizHistory: QuizResult[];
  dailyChallengeCompletedDate?: string;
  flashcardRatings: Record<string, 'easy' | 'review' | 'difficult'>; // flashcard id -> rating
}
