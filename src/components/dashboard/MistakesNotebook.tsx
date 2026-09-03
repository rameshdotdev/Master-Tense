import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_PRACTICE_QUESTIONS } from '../../data/practiceQuestions';
import { InteractiveExercise } from '../practice/InteractiveExercise';
import {
  BookMarked,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Lightbulb
} from 'lucide-react';
import { MistakeRecord } from '../../types';

export const MistakesNotebook: React.FC = () => {
  const { stats, resolveMistake, navigate } = useApp();

  const [activeRetryId, setActiveRetryId] = useState<string | null>(null);

  const unresolvedMistakes = stats.mistakes.filter((m) => !m.resolved);
  const resolvedMistakes = stats.mistakes.filter((m) => m.resolved);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-rose-400">
              Targeted Error Correction
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
            My Mistakes Notebook
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Review past mistakes from practice and quizzes, study the grammar explanations, and re-solve questions to earn bonus XP.
          </p>
        </div>

        {/* Counter Pill */}
        <div className="flex items-center gap-2 bg-[#0D0D0D] p-2 rounded-2xl border border-zinc-800 shadow-sm shrink-0">
          <div className="px-3 py-1 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-center font-mono">
            <span className="text-[9px] uppercase font-bold text-zinc-400 block">To Review</span>
            <span className="text-sm font-extrabold">{unresolvedMistakes.length}</span>
          </div>
          <div className="px-3 py-1 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-center font-mono">
            <span className="text-[9px] uppercase font-bold text-zinc-400 block">Resolved</span>
            <span className="text-sm font-extrabold">{resolvedMistakes.length}</span>
          </div>
        </div>
      </div>

      {/* Main Mistakes List */}
      {unresolvedMistakes.length === 0 ? (
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-10 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-serif italic text-white">
              No Unresolved Mistakes!
            </h3>
            <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
              Your mistake notebook is completely clear. Keep practicing to discover new challenges or test yourself with a quiz!
            </p>
          </div>
          <button
            onClick={() => navigate('/practice')}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs font-mono transition-colors shadow"
          >
            Start Practice Session
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {unresolvedMistakes.map((mistake) => {
            const originalQuestion = ALL_PRACTICE_QUESTIONS.find(
              (q) => q.id === mistake.questionId
            );

            const isRetrying = activeRetryId === mistake.id;

            return (
              <div
                key={mistake.id}
                className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 shadow-sm space-y-4 transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300">
                      {mistake.tenseName}
                    </span>
                    <h3 className="text-base font-serif italic text-white mt-2">
                      {mistake.prompt}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500 shrink-0">{mistake.date}</span>
                </div>

                {/* Incorrect vs Correct */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-rose-950/20 border border-rose-900/50">
                    <span className="text-[10px] uppercase font-mono font-bold text-rose-400 block mb-1">
                      Your Past Answer:
                    </span>
                    <span className="line-through font-semibold text-rose-300 font-mono">
                      {mistake.userAnswer || '(Empty)'}
                    </span>
                  </div>

                  <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-900/50">
                    <span className="text-[10px] uppercase font-mono font-bold text-emerald-400 block mb-1">
                      Correct Grammar Form:
                    </span>
                    <span className="font-semibold text-emerald-300 font-mono">
                      {mistake.correctAnswer}
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 space-y-1">
                  <strong className="text-zinc-200 font-serif italic">Explanation: </strong>
                  <span>{mistake.explanation}</span>
                </div>

                {/* Interactive Retry Mode */}
                {isRetrying && originalQuestion && (
                  <div className="pt-3 border-t border-zinc-800">
                    <InteractiveExercise
                      question={originalQuestion}
                      showNextButton={false}
                    />
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => navigate(`/learn/${mistake.tenseId}`)}
                    className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
                  >
                    <span>Review {mistake.tenseName} Lesson</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {originalQuestion && !isRetrying && (
                      <button
                        onClick={() => setActiveRetryId(mistake.id)}
                        className="px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 text-xs font-mono font-bold transition-colors"
                      >
                        Retry Now
                      </button>
                    )}
                    <button
                      onClick={() => resolveMistake(mistake.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-mono font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Resolved (+25 XP)</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Resolved History accordion/section */}
      {resolvedMistakes.length > 0 && (
        <div className="pt-6 border-t border-zinc-800 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
            Resolved Mistakes ({resolvedMistakes.length})
          </h3>
          <div className="space-y-2">
            {resolvedMistakes.slice(0, 5).map((rm) => (
              <div
                key={rm.id}
                className="p-3.5 rounded-2xl bg-[#0D0D0D] border border-zinc-800 flex items-center justify-between text-xs opacity-80"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="font-semibold text-zinc-200">
                    {rm.prompt}
                  </span>
                </div>
                <span className="font-mono text-emerald-400 font-bold">
                  {rm.correctAnswer}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
