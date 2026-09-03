import React from 'react';
import { useApp } from '../../context/AppContext';
import { TENSES_DATA } from '../../data/tensesData';
import {
  BarChart3,
  Award,
  Flame,
  Zap,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
  Star
} from 'lucide-react';

export const ProgressDashboard: React.FC = () => {
  const { stats, achievements, navigate } = useApp();

  const masteredCount = stats.completedLessons.length;
  const masteryPercentage = Math.round((masteredCount / 12) * 100);
  const accuracy =
    stats.totalAnswered > 0
      ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
      : 100;

  // Next level calculation
  const currentLevelXp = (stats.level - 1) * 150;
  const nextLevelXp = stats.level * 150;
  const levelProgress = Math.min(
    100,
    Math.round(((stats.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
  );

  // Category progress
  const presentMastered = TENSES_DATA.filter(
    (t) => t.category === 'present' && stats.completedLessons.includes(t.id)
  ).length;
  const pastMastered = TENSES_DATA.filter(
    (t) => t.category === 'past' && stats.completedLessons.includes(t.id)
  ).length;
  const futureMastered = TENSES_DATA.filter(
    (t) => t.category === 'future' && stats.completedLessons.includes(t.id)
  ).length;

  // Calculate weak tenses based on mistakes and quiz history
  const mistakeCounts: Record<string, number> = {};
  stats.mistakes.forEach((m) => {
    mistakeCounts[m.tenseId] = (mistakeCounts[m.tenseId] || 0) + 1;
  });

  const weakTenseIds = Object.entries(mistakeCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([id]) => id)
    .slice(0, 3);

  const weakTenses = TENSES_DATA.filter((t) => weakTenseIds.includes(t.id));

  // Recommended tense to study next
  const uncompletedTenses = TENSES_DATA.filter(
    (t) => !stats.completedLessons.includes(t.id)
  );
  const recommendedTense = weakTenses[0] || uncompletedTenses[0] || TENSES_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">
            Learning Analytics
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
          Progress &amp; Mastery Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1">
          Monitor your grammar milestones, question accuracy, streaks, and recommended study paths.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Level & XP */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Grammar Rank</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif italic text-white">
              Level {stats.level}
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {stats.xp} Total XP ({nextLevelXp - stats.xp} XP to Lv.{stats.level + 1})
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
        </div>

        {/* Daily Streak */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Study Streak</span>
            <div className="w-8 h-8 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif italic text-white">
              {stats.streakDays} Days
            </div>
            <span className="text-xs font-mono text-zinc-400">
              Active daily consistency bonus
            </span>
          </div>
          <div className="text-xs font-mono font-bold text-amber-400">
            🔥 Keep it up!
          </div>
        </div>

        {/* Mastered Tenses */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Tenses Mastered</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif italic text-white">
              {masteredCount} / 12
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {masteryPercentage}% of syllabus completed
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${masteryPercentage}%` }}
            />
          </div>
        </div>

        {/* Total Questions & Accuracy */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Question Accuracy</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-serif italic text-white">
              {accuracy}%
            </div>
            <span className="text-xs font-mono text-zinc-400">
              {stats.totalCorrect} of {stats.totalAnswered} questions correct
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>
      </div>

      {/* Category Progress Breakdown & Smart Recommendation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Breakdown (2 cols) */}
        <div className="lg:col-span-2 bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 shadow-sm space-y-5">
          <h2 className="text-lg font-serif italic text-white">
            Category Mastery Breakdown
          </h2>

          <div className="space-y-4">
            {/* Present */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-zinc-300">
                  Present Tenses (Simple, Continuous, Perfect, Perfect Continuous)
                </span>
                <span className="text-emerald-400">{presentMastered} / 4</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${(presentMastered / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Past */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-zinc-300">
                  Past Tenses (Simple, Continuous, Perfect, Perfect Continuous)
                </span>
                <span className="text-amber-400">{pastMastered} / 4</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${(pastMastered / 4) * 100}%` }}
                />
              </div>
            </div>

            {/* Future */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="text-zinc-300">
                  Future Tenses (Simple, Continuous, Perfect, Perfect Continuous)
                </span>
                <span className="text-teal-400">{futureMastered} / 4</span>
              </div>
              <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-500 rounded-full"
                  style={{ width: `${(futureMastered / 4) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Smart Recommendation Card (1 col) */}
        <div className="bg-[#121212] border border-emerald-500/30 text-white rounded-3xl p-6 shadow-md flex flex-col justify-between space-y-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Recommended Next Lesson</span>
            </div>
            <h3 className="text-xl font-serif italic text-white">{recommendedTense.name}</h3>
            <p className="text-xs text-zinc-400 mt-1 line-clamp-3 leading-relaxed">
              {recommendedTense.shortDescription}
            </p>
          </div>

          <button
            onClick={() => navigate(`/learn/${recommendedTense.id}`)}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs font-mono transition-colors flex items-center justify-center gap-2 shadow"
          >
            <span>Study This Tense Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weak Areas & Mistakes Notebook CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Tenses Alert */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif italic text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-500" />
              <span>Identified Weak Tenses</span>
            </h3>
            <span className="text-xs font-mono text-zinc-500">Based on recent errors</span>
          </div>

          {weakTenses.length === 0 ? (
            <p className="text-xs text-zinc-400 italic font-serif">
              No weak areas detected yet! Keep practicing to uncover concepts needing reinforcement.
            </p>
          ) : (
            <div className="space-y-2.5">
              {weakTenses.map((wt) => (
                <div
                  key={wt.id}
                  onClick={() => navigate(`/learn/${wt.id}`)}
                  className="p-3 rounded-2xl bg-rose-950/20 border border-rose-900/50 flex items-center justify-between cursor-pointer hover:border-rose-700 transition-colors"
                >
                  <div>
                    <span className="text-xs font-serif italic text-white block">
                      {wt.name}
                    </span>
                    <span className="text-[11px] font-mono text-rose-400">
                      {mistakeCounts[wt.id]} mistake recorded
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-rose-400" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Mistakes Notebook Box */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-base font-serif italic text-white">
                My Mistakes Notebook
              </h3>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono font-bold text-[10px]">
                {stats.mistakes.filter((m) => !m.resolved).length} Pending
              </span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Every incorrect answer from practice or quizzes is automatically archived in your personal notebook for review and retry.
            </p>
          </div>

          <button
            onClick={() => navigate('/mistakes')}
            className="w-full py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
          >
            <span>Open Mistakes Notebook</span>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
          </button>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-sm">
        <h3 className="text-base font-serif italic text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-amber-400" />
          <span>Badges &amp; Achievements</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className={`p-4 rounded-2xl border transition-all flex items-start gap-3 ${
                ach.unlocked
                  ? 'bg-emerald-950/20 border-emerald-500/30'
                  : 'bg-zinc-900/40 border-zinc-800/80 opacity-60'
              }`}
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                  ach.unlocked
                    ? 'bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 shadow-sm'
                    : 'bg-zinc-800 text-zinc-500'
                }`}
              >
                <Award className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-serif italic text-white">
                    {ach.title}
                  </span>
                  {ach.unlocked && (
                    <span className="text-[10px] font-mono font-bold text-emerald-400">
                      ✓ Unlocked
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-400 leading-snug">
                  {ach.description}
                </p>
                <div className="text-[10px] font-mono text-zinc-500">
                  Progress: {ach.progress} / {ach.maxProgress}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quiz History */}
      {stats.quizHistory.length > 0 && (
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-serif italic text-white">
            Recent Quiz History
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs divide-y divide-zinc-800">
              <thead className="text-zinc-500 font-mono font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-2.5">Date</th>
                  <th className="py-2.5">Category</th>
                  <th className="py-2.5">Score</th>
                  <th className="py-2.5">Percentage</th>
                  <th className="py-2.5">Recommendation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80 text-zinc-300 font-mono">
                {stats.quizHistory.slice(0, 5).map((q) => (
                  <tr key={q.id}>
                    <td className="py-3 text-zinc-400">
                      {q.date}
                    </td>
                    <td className="py-3 capitalize text-zinc-200 font-bold">
                      {q.category}
                    </td>
                    <td className="py-3 font-semibold">
                      {q.score} / {q.totalQuestions}
                    </td>
                    <td className="py-3">
                      <span
                        className={`font-extrabold ${
                          q.percentage >= 80
                            ? 'text-emerald-400'
                            : q.percentage >= 60
                            ? 'text-amber-400'
                            : 'text-rose-400'
                        }`}
                      >
                        {q.percentage}%
                      </span>
                    </td>
                    <td className="py-3 text-zinc-400 line-clamp-1 max-w-xs font-sans">
                      {q.recommendation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
