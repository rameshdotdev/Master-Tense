import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ALL_PRACTICE_QUESTIONS } from '../../data/practiceQuestions';
import { TENSES_DATA } from '../../data/tensesData';
import { useApp } from '../../context/AppContext';
import { PracticeQuestion, QuizQuestionRecord, QuizResult, TenseCategory } from '../../types';
import {
  HelpCircle,
  Timer,
  CheckCircle2,
  XCircle,
  Award,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertCircle,
  BookOpen,
  ChevronRight
} from 'lucide-react';

export const QuizRunner: React.FC = () => {
  const { recordQuizResult, navigate } = useApp();

  // Quiz Configuration State
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [category, setCategory] = useState<string>('mixed'); // 'present' | 'past' | 'future' | 'mixed'
  const [difficulty, setDifficulty] = useState<string>('mixed'); // 'Beginner' | 'Intermediate' | 'Advanced' | 'mixed'

  // Quiz Execution State
  const [quizState, setQuizState] = useState<'config' | 'active' | 'results'>('config');
  const [activeQuestions, setActiveQuestions] = useState<PracticeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef<any>(null);

  // Completed Result Cache
  const [lastResult, setLastResult] = useState<QuizResult | null>(null);

  // Start Quiz
  const startQuiz = () => {
    let pool = [...ALL_PRACTICE_QUESTIONS];

    if (category !== 'mixed') {
      pool = pool.filter((q) => q.category === category);
    }
    if (difficulty !== 'mixed') {
      pool = pool.filter((q) => q.difficulty === difficulty);
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));

    setActiveQuestions(selected);
    setCurrentIndex(0);
    setUserAnswers({});
    setSelectedOption(null);
    setSecondsElapsed(0);
    setQuizState('active');

    // Start timer
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setSecondsElapsed((prev) => prev + 1);
    }, 1000);
  };

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Answer current question
  const handleSelectAnswer = (ans: string) => {
    setSelectedOption(ans);
  };

  const handleConfirmNext = () => {
    if (!selectedOption) return;

    const currentQ = activeQuestions[currentIndex];
    const newAnswers = { ...userAnswers, [currentQ.id]: selectedOption };
    setUserAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIndex < activeQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Finish Quiz!
      if (timerRef.current) clearInterval(timerRef.current);

      const records: QuizQuestionRecord[] = activeQuestions.map((q) => {
        const uAns = newAnswers[q.id] || '';
        const isCorrect = uAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
        return {
          question: q,
          userAnswer: uAns,
          isCorrect
        };
      });

      const score = records.filter((r) => r.isCorrect).length;
      const total = records.length;
      const percentage = Math.round((score / Math.max(1, total)) * 100);

      // Weak tenses detection
      const wrongByTense: Record<string, number> = {};
      records.forEach((r) => {
        if (!r.isCorrect) {
          wrongByTense[r.question.tenseId] = (wrongByTense[r.question.tenseId] || 0) + 1;
        }
      });

      const sortedWeak = Object.entries(wrongByTense)
        .sort((a, b) => b[1] - a[1])
        .map(([id]) => id);

      // Smart recommendation calculation
      let rec = 'Keep up the daily practice to maintain consistency across all tenses!';
      if (sortedWeak.length > 0) {
        const weakestTense = TENSES_DATA.find((t) => t.id === sortedWeak[0]);
        const weakCount = wrongByTense[sortedWeak[0]];
        rec = `You made ${weakCount} mistake${weakCount > 1 ? 's' : ''} with ${
          weakestTense?.name || 'this tense'
        }. We recommend reviewing the ${weakestTense?.name || ''} lesson before your next quiz.`;
      } else if (percentage === 100) {
        rec = 'Flawless performance! You have achieved complete mastery over this tense set.';
      }

      const res: QuizResult = {
        id: 'quiz-' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        totalQuestions: total,
        score,
        percentage,
        timeSpentSeconds: secondsElapsed,
        category,
        difficulty,
        records,
        weakTenses: sortedWeak,
        recommendation: rec
      };

      setLastResult(res);
      recordQuizResult(res);
      setQuizState('results');
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // 1. CONFIG VIEW
  if (quizState === 'config') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Grammar Assessment Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
            English Tenses Quiz
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
            Choose your question count, target tense category, and difficulty level. Receive a detailed score report with weak area diagnostics.
          </p>
        </div>

        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Question Count */}
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-2.5">
              Number of Questions:
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[10, 20, 30].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border ${
                    questionCount === count
                      ? 'bg-emerald-500 text-black border-emerald-500 uppercase tracking-wider shadow-md scale-[1.02]'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 font-mono'
                  }`}
                >
                  {count} Questions
                </button>
              ))}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-2.5">
              Tense Category:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'mixed', label: 'Mixed Tenses' },
                { id: 'present', label: 'Present' },
                { id: 'past', label: 'Past' },
                { id: 'future', label: 'Future' }
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`py-2.5 rounded-xl font-bold text-xs transition-all border ${
                    category === cat.id
                      ? 'bg-emerald-500 text-black border-emerald-500 uppercase tracking-wider shadow'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 font-mono'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Difficulty */}
          <div>
            <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block mb-2.5">
              Difficulty:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'mixed', label: 'All Levels' },
                { id: 'Beginner', label: 'Beginner' },
                { id: 'Intermediate', label: 'Intermediate' },
                { id: 'Advanced', label: 'Advanced' }
              ].map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setDifficulty(diff.id)}
                  className={`py-2.5 rounded-xl font-bold text-xs transition-all border ${
                    difficulty === diff.id
                      ? 'bg-emerald-500 text-black border-emerald-500 uppercase tracking-wider shadow'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 font-mono'
                  }`}
                >
                  {diff.label}
                </button>
              ))}
            </div>
          </div>

          {/* Start Quiz Action */}
          <button
            onClick={startQuiz}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <span>Start Tense Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 2. ACTIVE QUIZ VIEW
  if (quizState === 'active') {
    const currentQ = activeQuestions[currentIndex];
    const progressPercent = Math.round(((currentIndex + 1) / activeQuestions.length) * 100);

    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Quiz Progress & Timer Header */}
        <div className="bg-[#0D0D0D] rounded-2xl border border-zinc-800 p-4 shadow-sm flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
              Question {currentIndex + 1} of {activeQuestions.length}
            </span>
            <div className="w-36 sm:w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold">
            <Timer className="w-4 h-4 text-emerald-400" />
            <span>{formatTime(secondsElapsed)}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
              {currentQ.type.replace(/-/g, ' ')}
            </span>
            <span className="text-[10px] font-mono font-semibold text-zinc-500">
              {currentQ.category} tense
            </span>
          </div>

          <h2 className="text-lg sm:text-xl font-serif italic text-white leading-snug">
            {currentQ.prompt}
          </h2>

          {/* Render Options */}
          {currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSelectAnswer(opt)}
                  className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${
                    selectedOption === opt
                      ? 'bg-emerald-950/30 border-emerald-500/80 text-emerald-300 shadow-sm'
                      : 'bg-zinc-900/60 border-zinc-800 text-zinc-300 hover:border-zinc-700'
                  }`}
                >
                  <span>{opt}</span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      selectedOption === opt
                        ? 'border-emerald-500 bg-emerald-500 text-black'
                        : 'border-zinc-700'
                    }`}
                  >
                    {selectedOption === opt && <span className="w-2 h-2 rounded-full bg-black" />}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Rearrange in quiz mode */}
          {currentQ.type === 'rearrange-words' && currentQ.scrambledWords && (
            <div className="space-y-3">
              <p className="text-xs font-mono text-zinc-500">
                Choose the correct arrangement for:
              </p>
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl font-mono text-xs text-zinc-300">
                {currentQ.scrambledWords.join(' / ')}
              </div>
              <div className="space-y-2">
                {[
                  currentQ.correctAnswer,
                  currentQ.scrambledWords.slice().reverse().join(' '),
                  currentQ.scrambledWords.join(' ')
                ]
                  .sort()
                  .map((cand, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => handleSelectAnswer(cand)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all ${
                        selectedOption === cand
                          ? 'bg-emerald-950/30 border-emerald-500 text-emerald-300'
                          : 'bg-zinc-900/60 border-zinc-800 text-zinc-300'
                      }`}
                    >
                      {cand}
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* Confirm & Next button */}
          <button
            disabled={!selectedOption}
            onClick={handleConfirmNext}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2"
          >
            <span>
              {currentIndex < activeQuestions.length - 1 ? 'Next Question' : 'Submit & View Results'}
            </span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // 3. RESULTS VIEW
  if (quizState === 'results' && lastResult) {
    const isPassing = lastResult.percentage >= 70;

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Score Header Card */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-sm text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 mb-2">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-zinc-500">
              Quiz Completed
            </span>
            <h1 className="text-4xl font-serif italic text-white mt-1">
              Your Score: {lastResult.percentage}%
            </h1>
            <p className="text-sm font-serif italic text-zinc-300 mt-1">
              {isPassing ? 'Great job! Excellent command of English tenses.' : 'Good effort! Review the weak areas below to level up.'}
            </p>
          </div>

          {/* Stat Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-800 max-w-2xl mx-auto">
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300">
              <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 block">Correct</span>
              <span className="text-lg font-mono font-extrabold">{lastResult.score}</span>
            </div>
            <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-500/30 text-rose-300">
              <span className="text-[10px] uppercase font-mono font-bold text-rose-400 block">Incorrect</span>
              <span className="text-lg font-mono font-extrabold">
                {lastResult.totalQuestions - lastResult.score}
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-zinc-200">
              <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 block">Time Taken</span>
              <span className="text-lg font-mono font-extrabold">{formatTime(lastResult.timeSpentSeconds)}</span>
            </div>
            <div className="p-3 rounded-2xl bg-teal-950/40 border border-teal-500/30 text-teal-300">
              <span className="text-[10px] uppercase font-mono font-bold text-teal-400 block">XP Earned</span>
              <span className="text-lg font-mono font-extrabold">+{lastResult.score * 20 + 30}</span>
            </div>
          </div>

          {/* Smart Recommendation */}
          <div className="p-4 rounded-2xl bg-[#121212] border border-zinc-800 text-left flex items-start gap-3 max-w-2xl mx-auto">
            <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-mono font-bold text-emerald-400 block uppercase tracking-wider">
                Smart Study Recommendation:
              </span>
              <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                {lastResult.recommendation}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setQuizState('config')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs transition-colors shadow"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Another Quiz</span>
            </button>
            <button
              onClick={() => navigate('/mistakes')}
              className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs hover:bg-zinc-800 transition-colors"
            >
              Review in Mistake Notebook
            </button>
          </div>
        </div>

        {/* Detailed Question Review Breakdown */}
        <div className="space-y-4">
          <h3 className="text-lg font-serif italic text-white">
            Detailed Question Breakdown
          </h3>

          <div className="space-y-3">
            {lastResult.records.map((rec, rIdx) => (
              <div
                key={rIdx}
                className={`p-4 rounded-2xl border transition-all ${
                  rec.isCorrect
                    ? 'bg-[#0D0D0D] border-zinc-800'
                    : 'bg-rose-950/20 border-rose-900/50'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    {rec.isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                    <span className="text-xs font-semibold text-zinc-200">
                      Q{rIdx + 1}: {rec.question.prompt}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                    {rec.question.tenseId}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-2">
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-500 block">Your Answer:</span>
                    <span
                      className={`font-semibold ${
                        rec.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {rec.userAnswer || '(No answer)'}
                    </span>
                  </div>
                  <div className="p-2 rounded-xl bg-zinc-900 border border-zinc-800/80">
                    <span className="text-[10px] font-mono text-zinc-500 block">Correct Answer:</span>
                    <span className="font-semibold text-zinc-200">
                      {rec.question.correctAnswer}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  <strong className="text-zinc-300">Why? </strong> {rec.question.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return null;
};
