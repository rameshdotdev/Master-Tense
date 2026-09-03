import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  User,
  Zap,
  Flame,
  Award,
  BookOpen,
  RotateCcw,
  CheckCircle2,
  Trash2
} from 'lucide-react';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { stats, achievements, resetAllData } = useApp();

  if (!isOpen) return null;

  const currentLevelXp = (stats.level - 1) * 150;
  const nextLevelXp = stats.level * 150;
  const levelProgress = Math.min(
    100,
    Math.round(((stats.xp - currentLevelXp) / (nextLevelXp - currentLevelXp)) * 100)
  );

  const getRankName = (lvl: number) => {
    if (lvl >= 10) return 'Tense Master';
    if (lvl >= 7) return 'Grammar Scholar';
    if (lvl >= 4) return 'Tense Explorer';
    if (lvl >= 2) return 'Grammar Apprentice';
    return 'Tense Beginner';
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress, XP, and streak?')) {
      resetAllData();
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#0D0D0D] rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden flex flex-col max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-zinc-800 flex items-center justify-between sticky top-0 bg-[#0D0D0D] z-10">
          <h3 className="text-base font-serif italic text-white">
            Student Profile
          </h3>
          <button
            onClick={onClose}
            className="min-h-[38px] min-w-[38px] flex items-center justify-center p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Details */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Avatar & Rank */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-serif italic text-2xl flex items-center justify-center shadow-md">
              U
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-lg font-serif italic text-white">
                  English Learner
                </h4>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
                  Lv.{stats.level}
                </span>
              </div>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                Rank: <span className="text-emerald-400 font-bold">{getRankName(stats.level)}</span>
              </p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1.5 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="text-zinc-400">Level {stats.level} Progress</span>
              <span className="text-emerald-400">{stats.xp} / {nextLevelXp} XP</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
            <span className="text-[10px] text-zinc-500 block pt-1 font-mono">
              Earn XP by completing lessons, answering practice questions, and taking quizzes!
            </span>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-amber-950/20 border border-amber-900/50">
              <Flame className="w-4 h-4 text-amber-400 fill-amber-400 mx-auto mb-1" />
              <span className="text-sm font-serif italic text-white block">
                {stats.streakDays} Days
              </span>
              <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold">Streak</span>
            </div>

            <div className="p-3 rounded-2xl bg-emerald-950/20 border border-emerald-900/50">
              <BookOpen className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
              <span className="text-sm font-serif italic text-white block">
                {stats.completedLessons.length} / 12
              </span>
              <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold">Lessons</span>
            </div>

            <div className="p-3 rounded-2xl bg-teal-950/20 border border-teal-900/50">
              <CheckCircle2 className="w-4 h-4 text-teal-400 mx-auto mb-1" />
              <span className="text-sm font-serif italic text-white block">
                {stats.totalAnswered > 0
                  ? Math.round((stats.totalCorrect / stats.totalAnswered) * 100)
                  : 100}
                %
              </span>
              <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold">Accuracy</span>
            </div>
          </div>

          {/* Reset Action */}
          <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
            <span className="text-xs text-zinc-500 font-mono">Want to start over?</span>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-400 hover:text-rose-300 hover:underline transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
