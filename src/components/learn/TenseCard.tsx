import React from 'react';
import { TenseData } from '../../types';
import { useApp } from '../../context/AppContext';
import { CheckCircle, Clock, Sparkles, Star, ArrowRight } from 'lucide-react';

interface TenseCardProps {
  tense: TenseData;
}

export const TenseCard: React.FC<TenseCardProps> = ({ tense }) => {
  const { navigate, stats, toggleFavoriteTense } = useApp();

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
      className={`group relative bg-zinc-900/50 hover:bg-zinc-900/80 rounded-2xl border border-zinc-800 hover:border-emerald-500/50 p-5 shadow-sm transition-all flex flex-col justify-between ${getCategoryColor(
        tense.category
      )} border-l-4`}
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
            <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {tense.category}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {isCompleted && (
              <span className="flex items-center gap-1 text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30">
                <CheckCircle className="w-3 h-3 text-emerald-400" /> Mastered
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavoriteTense(tense.id);
              }}
              className="p-1 text-zinc-500 hover:text-amber-400 transition-colors"
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
        <h3 className="text-xl font-serif italic text-white group-hover:text-emerald-400 transition-colors mb-2">
          {tense.name}
        </h3>
        <p className="text-xs text-zinc-400 line-clamp-3 leading-relaxed mb-4">
          {tense.shortDescription}
        </p>

        {/* Formula Snippet */}
        <div className="bg-zinc-800/80 rounded-xl p-2.5 mb-4 border border-zinc-700">
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 block mb-1">
            Core Formula:
          </span>
          <code className="text-xs font-mono font-semibold text-emerald-400 block truncate">
            {tense.formula.affirmative}
          </code>
        </div>
      </div>

      {/* Progress & Action Bottom */}
      <div className="pt-3 border-t border-zinc-800">
        <div className="flex items-center justify-between text-xs mb-1.5">
          <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Mastery</span>
          <span className="font-mono text-xs font-bold text-zinc-300">{progress}%</span>
        </div>
        <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-3">
          <div
            className="h-full rounded-full transition-all duration-500 bg-emerald-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          onClick={() => navigate(`/learn/${tense.id}`)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-zinc-800 hover:bg-emerald-500 text-zinc-300 hover:text-black hover:font-extrabold text-xs uppercase font-bold tracking-wider border border-zinc-700 hover:border-emerald-500 transition-all shadow-sm"
        >
          <span>{isCompleted ? 'Review Lesson' : progress > 0 ? 'Continue Learning' : 'Learn Now'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
