import React, { useState } from 'react';
import {
  BookOpen,
  CheckSquare,
  HelpCircle,
  Layers,
  GitCompare,
  Table,
  BarChart3,
  Search,
  Moon,
  Sun,
  Flame,
  Zap,
  Menu,
  X,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onOpenDaily: () => void;
  onOpenProfile: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDaily, onOpenProfile }) => {
  const {
    activeRoute,
    navigate,
    isDark,
    toggleTheme,
    setIsSearchOpen,
    stats
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Learn', route: '/learn', icon: BookOpen },
    { label: 'Practice', route: '/practice', icon: CheckSquare },
    { label: 'Quizzes', route: '/quiz', icon: HelpCircle },
    { label: 'Flashcards', route: '/flashcards', icon: Layers },
    { label: 'Compare', route: '/compare', icon: GitCompare },
    { label: 'Cheat Sheet', route: '/cheatsheet', icon: Table },
    {
      label: 'Mistakes',
      route: '/mistakes',
      icon: BookMarked,
      badge: stats.mistakes.filter((m) => !m.resolved).length
    },
    { label: 'Progress', route: '/progress', icon: BarChart3 }
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  const isCurrentActive = (itemRoute: string) => {
    if (itemRoute === '/learn') {
      return activeRoute === '/learn' || activeRoute.startsWith('/learn/');
    }
    return activeRoute === itemRoute;
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#121212]/95 backdrop-blur-md border-b border-zinc-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-black font-extrabold text-sm shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-serif italic tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                  Tenses<span className="text-emerald-500">Master</span>
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  12 Tenses
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 hidden sm:block font-semibold">
                Interactive English Grammar
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isCurrentActive(item.route);
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'text-white bg-zinc-800/90 border-b-2 border-emerald-500 font-bold shadow-sm'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${active ? 'text-emerald-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500/90 text-white">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs text-zinc-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-lg transition-colors"
              title="Search grammar (Cmd/Ctrl + K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline text-zinc-400">Search...</span>
              <kbd className="hidden md:inline-block text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400">
                ⌘K
              </kbd>
            </button>

            {/* Streak Counter */}
            <button
              onClick={onOpenDaily}
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 text-zinc-200 transition-colors"
              title="Daily Challenge & Streak"
            >
              <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-400">{stats.streakDays}d Streak</span>
            </button>

            {/* Level & XP Pill */}
            <button
              onClick={onOpenProfile}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 hover:border-emerald-500/50 text-zinc-300 transition-colors"
              title="View Profile & Stats"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" />
              <span className="text-xs font-bold text-white">Lv.{stats.level}</span>
              <span className="text-[10px] text-zinc-500 font-mono">
                {stats.xp} XP
              </span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 border border-transparent hover:border-zinc-700 transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-zinc-400" />}
            </button>

            {/* User Profile Avatar Icon */}
            <button
              onClick={onOpenProfile}
              className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 text-emerald-400 font-bold text-xs flex items-center justify-center shadow-sm hover:border-emerald-500 transition-all"
              title="User Profile"
            >
              U
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 rounded-lg text-zinc-300 hover:bg-zinc-800"
              aria-label="Open mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-[#121212] px-4 pt-2 pb-4 space-y-1 shadow-2xl">
          <div className="flex items-center justify-between py-2 border-b border-zinc-800/80 mb-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
              Learning Sections
            </span>
            <span className="text-xs font-semibold text-emerald-400">
              {stats.completedLessons.length} / 12 Mastered
            </span>
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.route);
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors ${
                  active
                    ? 'bg-zinc-800 text-white border-l-2 border-emerald-500 font-bold'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${active ? 'text-emerald-400' : 'text-zinc-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenDaily();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-xs font-bold text-orange-400 py-1"
            >
              <Sparkles className="w-4 h-4" />
              Daily Challenge
            </button>
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-emerald-400 py-1"
            >
              My Profile & Stats
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
