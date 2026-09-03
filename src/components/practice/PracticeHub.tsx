import React, { useState, useMemo } from 'react';
import { ALL_PRACTICE_QUESTIONS } from '../../data/practiceQuestions';
import { TENSES_DATA } from '../../data/tensesData';
import { InteractiveExercise } from './InteractiveExercise';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  Filter,
  RefreshCw,
  Sparkles,
  Zap,
  Layers,
  Flame,
  ArrowRight
} from 'lucide-react';
import { QuestionType, TenseCategory, DifficultyLevel } from '../../types';

export const PracticeHub: React.FC = () => {
  const { stats } = useApp();

  const [selectedTense, setSelectedTense] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | TenseCategory>('all');
  const [selectedType, setSelectedType] = useState<'all' | QuestionType>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | DifficultyLevel>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Filter available questions
  const filteredQuestions = useMemo(() => {
    return ALL_PRACTICE_QUESTIONS.filter((q) => {
      if (selectedTense !== 'all' && q.tenseId !== selectedTense) return false;
      if (selectedCategory !== 'all' && q.category !== selectedCategory) return false;
      if (selectedType !== 'all' && q.type !== selectedType) return false;
      if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedTense, selectedCategory, selectedType, selectedDifficulty]);

  // Handle next question
  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Loop back to start
      setCurrentIndex(0);
    }
  };

  const handleShuffle = () => {
    setCurrentIndex(Math.floor(Math.random() * Math.max(1, filteredQuestions.length)));
  };

  const currentQ = filteredQuestions[currentIndex] || filteredQuestions[0];

  const questionTypeLabels: Record<string, string> = {
    all: 'All Types',
    'fill-in-blank': 'Fill in the Blank',
    'multiple-choice': 'Multiple Choice',
    'sentence-correction': 'Sentence Correction',
    'rearrange-words': 'Rearrange Words',
    'identify-tense': 'Identify the Tense',
    translation: 'Translation Practice'
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">
              Interactive Practice
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
            Grammar Workout Lab
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Test yourself on all 6 question formats with immediate feedback, detailed rules, and error recovery.
          </p>
        </div>

        {/* Practice Stats Badge */}
        <div className="flex items-center gap-2 bg-[#0D0D0D] p-2.5 rounded-2xl border border-zinc-800 shadow-sm shrink-0">
          <div className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-200 text-center">
            <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 block">Answered</span>
            <span className="text-sm font-mono font-extrabold">{stats.totalAnswered}</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-center">
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-500/70 block">Accuracy</span>
            <span className="text-sm font-mono font-extrabold">
              {stats.totalAnswered > 0
                ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
                : 100}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-[#0D0D0D] rounded-2xl border border-zinc-800 p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-zinc-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Customize Your Practice Session</span>
          </span>
          <span className="text-xs font-mono text-zinc-500">
            {filteredQuestions.length} Questions Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
          {/* Question Type Filter */}
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value as any);
              setCurrentIndex(0);
            }}
            className="text-xs font-mono px-3 py-2 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 focus:outline-none focus:border-zinc-700"
          >
            {Object.entries(questionTypeLabels).map(([val, label]) => (
              <option key={val} value={val}>
                {label}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value as any);
              setCurrentIndex(0);
            }}
            className="text-xs font-mono px-3 py-2 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 focus:outline-none focus:border-zinc-700"
          >
            <option value="all">All Tense Categories</option>
            <option value="present">Present Tenses</option>
            <option value="past">Past Tenses</option>
            <option value="future">Future Tenses</option>
          </select>

          {/* Specific Tense Filter */}
          <select
            value={selectedTense}
            onChange={(e) => {
              setSelectedTense(e.target.value);
              setCurrentIndex(0);
            }}
            className="text-xs font-mono px-3 py-2 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 focus:outline-none focus:border-zinc-700"
          >
            <option value="all">Any Specific Tense</option>
            {TENSES_DATA.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          {/* Difficulty Filter */}
          <select
            value={selectedDifficulty}
            onChange={(e) => {
              setSelectedDifficulty(e.target.value as any);
              setCurrentIndex(0);
            }}
            className="text-xs font-mono px-3 py-2 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 focus:outline-none focus:border-zinc-700"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Main Question Display */}
      {filteredQuestions.length === 0 ? (
        <div className="p-12 text-center bg-[#0D0D0D] rounded-2xl border border-zinc-800">
          <p className="text-sm font-semibold text-zinc-400">
            No practice questions match this specific combination.
          </p>
          <button
            onClick={() => {
              setSelectedType('all');
              setSelectedCategory('all');
              setSelectedTense('all');
              setSelectedDifficulty('all');
            }}
            className="mt-3 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Question Counter Bar */}
          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
            <span>
              Question <strong className="text-zinc-200">{currentIndex + 1}</strong> of{' '}
              {filteredQuestions.length}
            </span>
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 font-semibold text-emerald-400 hover:text-emerald-300"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Shuffle Question
            </button>
          </div>

          {currentQ && (
            <InteractiveExercise
              key={currentQ.id}
              question={currentQ}
              onNext={handleNext}
              showNextButton={true}
            />
          )}
        </div>
      )}
    </div>
  );
};
