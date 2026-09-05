import React from 'react';
import { TenseData } from '../../types';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Clock, Sparkles, Star, ArrowRight } from 'lucide-react';

interface TenseCardProps {
  tense: TenseData;
}

export const TenseCard: React.FC<TenseCardProps> = ({ tense }) => {
  const { navigate, stats, toggleFavoriteTense, isDark } = useApp();

  const isCompleted = stats.completedLessons.includes(tense.id);
  const isFavorited = stats.favoritedTenses.includes(tense.id);

  // Compute calculated progress for this specific tense:
  // If completed: 100%. If favorite: at least 30%. Otherwise check quiz/answered questions for this tense
  const relatedQuestions = stats.quizHistory.flatMap((q) => q.records).filter((r) => r.question.tenseId === tense.id);
  const totalAttempted = relatedQuestions.length;
  const totalCorrect = relatedQuestions.filter((r) => r.isCorrect).length;

  let progress = 0;
  if (isCompleted) {
    progress = 100;
  } else if (totalAttempted > 0) {
    progress = Math.min(95, Math.round((totalCorrect / Math.max(1, totalAttempted)) * 80) + 15);
  } else {
    progress = 0;
  }

  const getDifficultyBadge = (diff: string) => {
    if (isDark) {
      switch (diff) {
        case 'Beginner':
          return 'bg-zinc-800 text-emerald-400 border-zinc-700';
        case 'Intermediate':
          return 'bg-zinc-800 text-zinc-300 border-zinc-700';
        case 'Advanced':
          return 'bg-zinc-800 text-purple-400 border-zinc-700';
        default:
          return 'bg-zinc-800 text-zinc-400 border-zinc-700';
      }
    } else {
      switch (diff) {
        case 'Beginner':
          return 'bg-emerald-50 text-emerald-700 border-emerald-200';
        case 'Intermediate':
          return 'bg-slate-100 text-slate-700 border-slate-200';
        case 'Advanced':
          return 'bg-purple-50 text-purple-700 border-purple-200';
        default:
          return 'bg-slate-100 text-slate-600 border-slate-200';
      }
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'present':
        return 'border-l-emerald-500';
      case 'past':
        return 'border-l-amber-500';
      case 'future':
        return 'border-l-teal-500';
      default:
        return 'border-l-emerald-500';
    }
  };

  return (
    <div
      id={`tense-card-${tense.id}`}
      className={`group relative rounded-2xl border p-5 shadow-xs transition-all flex flex-col justify-between ${
        isDark
          ? 'bg-zinc-900/50 hover:bg-zinc-900/80 border-zinc-800 hover:border-emerald-500/50'
          : 'bg-white hover:bg-slate-50/90 border-slate-200 hover:border-emerald-500/60 shadow-xs'
      } ${getCategoryColor(tense.category)} border-l-4`}
    >
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getDifficultyBadge(
                tense.difficulty
              )}`}
            >
              {tense.difficulty}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${
              isDark ? 'text-zinc-500' : 'text-slate-400'
            }`}>
              {tense.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isCompleted && (
              <span className={`flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full border ${
                isDark
                  ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/30'
                  : 'text-emerald-700 bg-emerald-50 border-emerald-200'
              }`}>
                <CheckCircle className="w-3 h-3" /> Mastered
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavoriteTense(tense.id);
              }}
              className={`p-1 transition-colors ${
                isDark ? 'text-zinc-500 hover:text-amber-400' : 'text-slate-400 hover:text-amber-500'
              }`}
              title={isFavorited ? 'Remove from bookmarks' : 'Bookmark this tense'}
            >
              <Star
                className={`w-4 h-4 ${
                  isFavorited ? 'text-amber-400 fill-amber-400' : ''
                }`}
              />
            </button>
          </div>
        </div>

        {/* Title & Short Description */}
        <h3 className={`text-xl font-serif italic transition-colors mb-2 ${
          isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
        }`}>
          {tense.name}
        </h3>
        <p className={`text-xs line-clamp-3 leading-relaxed mb-4 ${
          isDark ? 'text-zinc-400' : 'text-slate-600'
        }`}>
          {tense.shortDescription}
        </p>

        {/* Formula Snippet - CORE FORMULA CONTAINER */}
        <div className={`rounded-xl p-2.5 mb-4 border transition-colors ${
          isDark
            ? 'bg-zinc-800/80 border-zinc-700'
            : 'bg-slate-50 border-slate-200'
        }`}>
          <span className={`text-[10px] font-bold uppercase tracking-widest block mb-1 ${
            isDark ? 'text-zinc-400' : 'text-slate-500'
          }`}>
            Core Formula:
          </span>
          <code className={`text-xs font-mono font-bold block truncate ${
            isDark ? 'text-emerald-400' : 'text-emerald-700'
          }`}>
            {tense.formula.affirmative}
          </code>
        </div>
      </div>

      {/* Progress & Action Bottom */}
      <div className={`pt-3 border-t ${isDark ? 'border-zinc-800' : 'border-slate-100'}`}>
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className={`text-[10px] uppercase tracking-widest font-semibold ${
            isDark ? 'text-zinc-500' : 'text-slate-400'
          }`}>
            Mastery
          </span>
          <span className={`font-mono text-xs font-bold ${
            isDark ? 'text-zinc-300' : 'text-slate-700'
          }`}>
            {progress}%
          </span>
        </div>
        <div className={`w-full h-1.5 rounded-full overflow-hidden mb-3 ${
          isDark ? 'bg-zinc-800' : 'bg-slate-200'
        }`}>
          <div
            className="h-full rounded-full transition-all duration-500 bg-emerald-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={() => navigate(`/learn/${tense.id}`)}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs uppercase font-bold tracking-wider border transition-all shadow-xs ${
            isDark
              ? 'bg-zinc-800 hover:bg-emerald-500 text-zinc-300 hover:text-black border-zinc-700 hover:border-emerald-500'
              : 'bg-slate-100 hover:bg-emerald-600 text-slate-800 hover:text-white border-slate-200 hover:border-emerald-600'
          }`}
        >
          <span>{isCompleted ? 'Review Lesson' : progress > 0 ? 'Continue Learning' : 'Learn Now'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
