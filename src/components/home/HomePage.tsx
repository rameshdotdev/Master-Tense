import React from 'react';
import { useApp } from '../../context/AppContext';
import { TenseCard } from '../learn/TenseCard';
import {
  PRESENT_TENSES,
  PAST_TENSES,
  FUTURE_TENSES
} from '../../data/tensesData';
import {
  BookOpen,
  HelpCircle,
  Table,
  Flame,
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Layers,
  GitCompare,
  TrendingUp
} from 'lucide-react';

interface HomePageProps {
  onOpenDaily: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenDaily }) => {
  const { navigate, stats } = useApp();

  const masteredCount = stats.completedLessons.length;
  const isDailyDone =
    stats.dailyChallengeCompletedDate === new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-12 pb-12">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 bg-gradient-to-b from-[#121212] via-[#0A0A0A] to-[#0A0A0A] border-b border-zinc-800/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-emerald-400 text-[10px] uppercase font-bold tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Interactive English Grammar Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif italic text-white tracking-tight leading-tight">
            Master All 12 English Tenses{' '}
            <span className="text-emerald-500 not-italic font-sans font-extrabold tracking-tight">
              With Precision
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Clear structural formulas, timeline visualizers, real-life usage contexts, and interactive retention exercises.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 w-full max-w-md sm:max-w-none mx-auto">
            <button
              onClick={() => navigate('/learn')}
              className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 stroke-[2.5]" />
              <span>Start Learning</span>
            </button>

            <button
              onClick={() => navigate('/quiz')}
              className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-emerald-500 text-zinc-200 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <HelpCircle className="w-4 h-4 text-emerald-400" />
              <span>Take a Quick Test</span>
            </button>

            <button
              onClick={() => navigate('/cheatsheet')}
              className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
            >
              <Table className="w-4 h-4 text-zinc-400" />
              <span>Tense Cheat Sheet</span>
            </button>
          </div>

          {/* Quick Learning Stats Banner */}
          <div className="pt-6 max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Daily Streak */}
            <div
              onClick={onOpenDaily}
              className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-orange-500/40 shadow-sm flex items-center gap-3 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-orange-400 flex items-center justify-center shrink-0">
                <Flame className="w-5 h-5 fill-orange-400" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">
                  {stats.streakDays} Day Streak
                </span>
                <span className="text-[11px] text-orange-400 font-medium">
                  {isDailyDone ? 'Daily Challenge Complete ✓' : 'Daily Challenge Ready 🔥'}
                </span>
              </div>
            </div>

            {/* Mastered Counter */}
            <div
              onClick={() => navigate('/progress')}
              className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 shadow-sm flex items-center gap-3 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">
                  {masteredCount} / 12 Mastered
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">
                  {Math.round((masteredCount / 12) * 100)}% Curriculum Completed
                </span>
              </div>
            </div>

            {/* Interactive Flashcards / Compare shortcut */}
            <div
              onClick={() => navigate('/compare')}
              className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 hover:border-emerald-500/40 shadow-sm flex items-center gap-3 cursor-pointer transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center justify-center shrink-0">
                <GitCompare className="w-5 h-5" />
              </div>
              <div className="text-left">
                <span className="text-xs font-bold text-white block">
                  Compare Tenses
                </span>
                <span className="text-[11px] text-zinc-400 font-medium">
                  Side-by-side contrast tool
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 12 TENSES ORGANIZED BY CATEGORY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Present Tenses Category */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              <h2 className="text-2xl font-serif italic text-white tracking-tight">
                Present Tenses
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                4 Tenses
              </span>
            </div>
            <button
              onClick={() => navigate('/learn')}
              className="text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PRESENT_TENSES.map((tense) => (
              <TenseCard key={tense.id} tense={tense} />
            ))}
          </div>
        </section>

        {/* Past Tenses Category */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm shadow-amber-500/50" />
              <h2 className="text-2xl font-serif italic text-white tracking-tight">
                Past Tenses
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                4 Tenses
              </span>
            </div>
            <button
              onClick={() => navigate('/learn')}
              className="text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PAST_TENSES.map((tense) => (
              <TenseCard key={tense.id} tense={tense} />
            ))}
          </div>
        </section>

        {/* Future Tenses Category */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-sm shadow-teal-500/50" />
              <h2 className="text-2xl font-serif italic text-white tracking-tight">
                Future Tenses
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                4 Tenses
              </span>
            </div>
            <button
              onClick={() => navigate('/learn')}
              className="text-xs font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FUTURE_TENSES.map((tense) => (
              <TenseCard key={tense.id} tense={tense} />
            ))}
          </div>
        </section>

        {/* Learning Tools Quick Grid */}
        <section className="bg-zinc-900/40 rounded-3xl border border-zinc-800 p-6 sm:p-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <h3 className="text-xl font-serif italic text-white">
              Reinforce & Retain Your Knowledge
            </h3>
            <p className="text-xs text-zinc-400">
              Go beyond reading rules with our interactive retention toolset.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div
              onClick={() => navigate('/practice')}
              className="bg-[#121212] p-4 rounded-2xl border border-zinc-800 hover:border-emerald-500/50 shadow-sm cursor-pointer transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-zinc-200 group-hover:text-emerald-400 transition-colors">
                Interactive Practice
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                6 question types including sentence correction and word rearranging.
              </p>
            </div>

            <div
              onClick={() => navigate('/flashcards')}
              className="bg-[#121212] p-4 rounded-2xl border border-zinc-800 hover:border-emerald-500/50 shadow-sm cursor-pointer transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center justify-center mb-3">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-zinc-200 group-hover:text-emerald-400 transition-colors">
                3D Flashcards
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Flip cards to test recall of formulas, signal words, and rules.
              </p>
            </div>

            <div
              onClick={() => navigate('/compare')}
              className="bg-[#121212] p-4 rounded-2xl border border-zinc-800 hover:border-emerald-500/50 shadow-sm cursor-pointer transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 text-emerald-400 flex items-center justify-center mb-3">
                <GitCompare className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-zinc-200 group-hover:text-emerald-400 transition-colors">
                Tense Comparison
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Side-by-side breakdowns of confusing pairs like Past Simple vs Present Perfect.
              </p>
            </div>

            <div
              onClick={() => navigate('/mistakes')}
              className="bg-[#121212] p-4 rounded-2xl border border-zinc-800 hover:border-emerald-500/50 shadow-sm cursor-pointer transition-colors group"
            >
              <div className="w-9 h-9 rounded-xl bg-zinc-800 border border-zinc-700 text-orange-400 flex items-center justify-center mb-3">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-sm text-zinc-200 group-hover:text-orange-400 transition-colors">
                Mistakes Notebook
              </h4>
              <p className="text-xs text-zinc-400 mt-1">
                Personalized archive of past errors to retry and resolve for bonus XP.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
