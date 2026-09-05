import React, { useState } from 'react';
import {
  BookOpen,
  CheckSquare,
  HelpCircle,
  Layers,
  MoreHorizontal,
  GitCompare,
  Table,
  BookMarked,
  BarChart3,
  Flame,
  User,
  Search,
  X,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface MobileBottomNavProps {
  onOpenDaily: () => void;
  onOpenProfile: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  onOpenDaily,
  onOpenProfile
}) => {
  const {
    activeRoute,
    navigate,
    setIsSearchOpen,
    isDark,
    toggleTheme,
    stats,
    user
  } = useApp();

  const [isMoreOpen, setIsMoreOpen] = useState(false);

  const unresolvedMistakes = stats.mistakes.filter((m) => !m.resolved).length;

  const isLearnActive =
    activeRoute === '/learn' || activeRoute.startsWith('/learn/') || activeRoute === '/';
  const isPracticeActive = activeRoute === '/practice';
  const isQuizActive = activeRoute === '/quiz';
  const isCardsActive = activeRoute === '/flashcards';
  const isMoreActive =
    ['/compare', '/cheatsheet', '/mistakes', '/progress'].includes(activeRoute) ||
    isMoreOpen;

  const handleNav = (route: string) => {
    navigate(route);
    setIsMoreOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav
        id="mobile-bottom-nav"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#0D0D0D]/95 backdrop-blur-lg border-t border-zinc-800 lg:hidden px-2 pt-1 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-2xl transition-all"
        aria-label="Mobile Navigation"
      >
        <div className="grid grid-cols-5 items-center justify-around">
          {/* 1. Learn */}
          <button
            id="mobile-nav-learn"
            onClick={() => handleNav('/learn')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors relative ${
              isLearnActive
                ? 'text-emerald-400 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <BookOpen className="w-5 h-5" />
            <span className="text-[10px] font-mono tracking-tight">Learn</span>
            {isLearnActive && (
              <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

          {/* 2. Practice */}
          <button
            id="mobile-nav-practice"
            onClick={() => handleNav('/practice')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors relative ${
              isPracticeActive
                ? 'text-emerald-400 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="text-[10px] font-mono tracking-tight">Practice</span>
            {isPracticeActive && (
              <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

          {/* 3. Quiz */}
          <button
            id="mobile-nav-quiz"
            onClick={() => handleNav('/quiz')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors relative ${
              isQuizActive
                ? 'text-emerald-400 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <HelpCircle className="w-5 h-5" />
            <span className="text-[10px] font-mono tracking-tight">Quizzes</span>
            {isQuizActive && (
              <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

          {/* 4. Flashcards */}
          <button
            id="mobile-nav-flashcards"
            onClick={() => handleNav('/flashcards')}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors relative ${
              isCardsActive
                ? 'text-emerald-400 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Layers className="w-5 h-5" />
            <span className="text-[10px] font-mono tracking-tight">Cards</span>
            {isCardsActive && (
              <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>

          {/* 5. More (Sheet Drawer) */}
          <button
            id="mobile-nav-more"
            onClick={() => setIsMoreOpen((prev) => !prev)}
            className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors relative ${
              isMoreActive
                ? 'text-emerald-400 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <div className="relative">
              <MoreHorizontal className="w-5 h-5" />
              {unresolvedMistakes > 0 && (
                <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </div>
            <span className="text-[10px] font-mono tracking-tight">More</span>
            {isMoreActive && (
              <span className="absolute bottom-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>
        </div>
      </nav>

      {/* "More" Bottom Sheet Overlay */}
      {isMoreOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsMoreOpen(false)}
          />

          {/* Drawer Sheet */}
          <div className="fixed bottom-0 left-0 right-0 bg-[#0D0D0D] border-t border-zinc-800 rounded-t-3xl shadow-2xl p-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-4 animate-in slide-in-from-bottom duration-250 z-10 max-h-[85vh] overflow-y-auto">
            {/* Sheet Handle & Header */}
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <h3 className="text-base font-serif italic text-white">
                  Study Tools &amp; Settings
                </h3>
              </div>
              <button
                onClick={() => setIsMoreOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Actions Row */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  onOpenDaily();
                }}
                className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3 text-left hover:border-orange-500/50 transition-colors"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-950/40 border border-orange-500/30 text-orange-400 flex items-center justify-center shrink-0">
                  <Flame className="w-4 h-4 fill-orange-400" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Daily Quest</span>
                  <span className="text-[10px] font-mono text-orange-400">{stats.streakDays}d Streak</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  onOpenProfile();
                }}
                className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center gap-3 text-left hover:border-emerald-500/50 transition-colors"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-xl object-cover border border-emerald-500/30 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    {user ? (user.displayName || 'Account') : 'My Profile'}
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {user ? 'Google Active' : `Lv.${stats.level} (${stats.xp} XP)`}
                  </span>
                </div>
              </button>
            </div>

            {/* Navigation Options List */}
            <div className="space-y-1 pt-1">
              <button
                onClick={() => handleNav('/compare')}
                className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono font-semibold transition-colors ${
                  activeRoute === '/compare'
                    ? 'bg-zinc-800 text-emerald-400 border-l-2 border-emerald-500'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GitCompare className="w-4 h-4 text-emerald-400" />
                  <span>Compare Tenses (Side-by-Side)</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-normal">5 Presets</span>
              </button>

              <button
                onClick={() => handleNav('/cheatsheet')}
                className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono font-semibold transition-colors ${
                  activeRoute === '/cheatsheet'
                    ? 'bg-zinc-800 text-emerald-400 border-l-2 border-emerald-500'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Table className="w-4 h-4 text-emerald-400" />
                  <span>Master Cheat Sheet &amp; Formulas</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-normal">12 Tenses</span>
              </button>

              <button
                onClick={() => handleNav('/mistakes')}
                className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono font-semibold transition-colors ${
                  activeRoute === '/mistakes'
                    ? 'bg-zinc-800 text-emerald-400 border-l-2 border-emerald-500'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BookMarked className="w-4 h-4 text-rose-400" />
                  <span>Mistakes Notebook</span>
                </div>
                {unresolvedMistakes > 0 ? (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px]">
                    {unresolvedMistakes} to retry
                  </span>
                ) : (
                  <span className="text-[10px] text-emerald-400 font-normal">All clear!</span>
                )}
              </button>

              <button
                onClick={() => handleNav('/progress')}
                className={`w-full min-h-[48px] flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-mono font-semibold transition-colors ${
                  activeRoute === '/progress'
                    ? 'bg-zinc-800 text-emerald-400 border-l-2 border-emerald-500'
                    : 'text-zinc-300 hover:bg-zinc-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <BarChart3 className="w-4 h-4 text-emerald-400" />
                  <span>Progress &amp; Mastery Analytics</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-normal">
                  {stats.completedLessons.length}/12 Done
                </span>
              </button>
            </div>

            {/* Bottom utilities: Search & Theme */}
            <div className="pt-2 border-t border-zinc-800 flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setIsMoreOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex-1 min-h-[44px] flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:bg-zinc-800"
              >
                <Search className="w-4 h-4 text-zinc-400" />
                <span>Search Grammar</span>
              </button>

              <button
                onClick={toggleTheme}
                className="min-h-[44px] px-3.5 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 hover:bg-zinc-800 flex items-center gap-2"
                title="Toggle Theme"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-zinc-400" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
