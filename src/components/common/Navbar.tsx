import React, { useState, useRef, useEffect } from 'react';
import {
  BookOpen,
  CheckSquare,
  HelpCircle,
  Table,
  ChevronDown,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  Layers,
  GitCompare,
  BookMarked,
  BarChart3
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavbarProps {
  onOpenDaily: () => void;
  onOpenProfile: () => void;
}

interface NavItem {
  label: string;
  route: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Primary core navigation items - clean and minimal
  const primaryNavItems: NavItem[] = [
    { label: 'Learn', route: '/learn', icon: BookOpen },
    { label: 'Practice', route: '/practice', icon: CheckSquare },
    { label: 'Quizzes', route: '/quiz', icon: HelpCircle },
    { label: 'Cheat Sheet', route: '/cheatsheet', icon: Table }
  ];

  // Secondary items cleanly organized under "More"
  const secondaryNavItems: NavItem[] = [
    { label: 'Flashcards', route: '/flashcards', icon: Layers },
    { label: 'Compare Tenses', route: '/compare', icon: GitCompare },
    {
      label: 'Mistakes Notebook',
      route: '/mistakes',
      icon: BookMarked,
      badge: stats.mistakes.filter((m) => !m.resolved).length
    },
    { label: 'Progress & Stats', route: '/progress', icon: BarChart3 }
  ];

  const handleNav = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  };

  const isCurrentActive = (itemRoute: string) => {
    if (itemRoute === '/learn') {
      return activeRoute === '/learn' || activeRoute.startsWith('/learn/');
    }
    return activeRoute === itemRoute;
  };

  const isMoreActive = secondaryNavItems.some((item) => isCurrentActive(item.route));

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b backdrop-blur-md ${
        isDark
          ? 'bg-[#121212]/95 border-zinc-800 text-white'
          : 'bg-white/95 border-slate-200 text-slate-900 shadow-xs'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo - Clean and Minimal */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center text-black font-extrabold shadow-sm group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4 text-black stroke-[2.5]" />
            </div>
            <span
              className={`text-xl font-serif italic tracking-tight transition-colors ${
                isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
              }`}
            >
              Tenses<span className="text-emerald-500 font-bold">Master</span>
            </span>
          </div>

          {/* Desktop Navigation Links - Clean, Uncluttered 4 Core Hubs + Subtle More */}
          <nav className="hidden md:flex items-center gap-1">
            {primaryNavItems.map((item) => {
              const Icon = item.icon;
              const active = isCurrentActive(item.route);
              return (
                <button
                  key={item.route}
                  onClick={() => handleNav(item.route)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? isDark
                        ? 'text-emerald-400 bg-zinc-800/80 font-bold shadow-xs'
                        : 'text-emerald-700 bg-emerald-50 font-bold shadow-xs'
                      : isDark
                        ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      active
                        ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                        : isDark ? 'text-zinc-500' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}

            {/* Subtle "More" Dropdown for Secondary Tools */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setMoreDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isMoreActive
                    ? isDark
                      ? 'text-emerald-400 bg-zinc-800/80'
                      : 'text-emerald-700 bg-emerald-50'
                    : isDark
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
                title="Additional tools & analytics"
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div
                  className={`absolute right-0 mt-2 w-52 rounded-2xl p-1.5 shadow-xl border z-50 animate-in fade-in zoom-in-95 duration-100 ${
                    isDark
                      ? 'bg-[#18181B] border-zinc-800 text-white shadow-black/60'
                      : 'bg-white border-slate-200 text-slate-900 shadow-slate-300/40'
                  }`}
                >
                  {secondaryNavItems.map((subItem) => {
                    const SubIcon = subItem.icon;
                    const subActive = isCurrentActive(subItem.route);
                    return (
                      <button
                        key={subItem.route}
                        onClick={() => handleNav(subItem.route)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                          subActive
                            ? isDark
                              ? 'bg-zinc-800 text-emerald-400 font-semibold'
                              : 'bg-emerald-50 text-emerald-700 font-semibold'
                            : isDark
                              ? 'text-zinc-300 hover:bg-zinc-800/60 hover:text-white'
                              : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <SubIcon
                            className={`w-3.5 h-3.5 ${
                              subActive
                                ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                                : isDark ? 'text-zinc-400' : 'text-slate-500'
                            }`}
                          />
                          <span>{subItem.label}</span>
                        </div>
                        {subItem.badge !== undefined && subItem.badge > 0 && (
                          <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                            {subItem.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls - Clean, Minimal & Functional */}
          <div className="flex items-center gap-2">
            {/* Minimal Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className={`min-h-[36px] min-w-[36px] flex items-center justify-center p-2 text-xs rounded-xl border transition-colors ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700'
                  : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-200 hover:border-slate-300'
              }`}
              title="Search grammar (Cmd/Ctrl + K)"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Functional Theme Toggler Button */}
            <button
              id="navbar-theme-toggle-btn"
              onClick={toggleTheme}
              className={`min-h-[36px] min-w-[36px] flex items-center justify-center p-2 rounded-xl border transition-all duration-200 ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800 hover:border-zinc-700 shadow-xs'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:border-slate-300 shadow-xs'
              }`}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 animate-in spin-in-180 duration-200" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 animate-in spin-in-180 duration-200" />
              )}
            </button>

            {/* Profile Avatar Trigger */}
            <button
              onClick={onOpenProfile}
              className={`w-9 h-9 rounded-xl border text-xs font-bold flex items-center justify-center shadow-xs transition-all ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-emerald-400 hover:border-emerald-500/70 hover:bg-zinc-800'
                  : 'bg-slate-100 border-slate-200 text-emerald-700 hover:border-emerald-500 hover:bg-slate-200'
              }`}
              title={`Level ${stats.level} Profile & Streak`}
              aria-label="User Profile"
            >
              <span className="font-mono">Lv.{stats.level}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className={`md:hidden min-h-[36px] min-w-[36px] flex items-center justify-center p-2 rounded-xl border transition-colors ${
                isDark
                  ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-4 pt-3 pb-5 space-y-1.5 shadow-2xl transition-colors ${
            isDark ? 'bg-[#121212] border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between py-2 border-b border-zinc-800/40 mb-2">
            <span
              className={`text-[10px] uppercase font-mono font-bold tracking-wider ${
                isDark ? 'text-zinc-500' : 'text-slate-400'
              }`}
            >
              Menu
            </span>
            <span className="text-xs font-mono font-semibold text-emerald-500">
              {stats.completedLessons.length} / 12 Mastered
            </span>
          </div>

          {[...primaryNavItems, ...secondaryNavItems].map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.route);
            return (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  active
                    ? isDark
                      ? 'bg-zinc-800 text-emerald-400 font-bold border-l-2 border-emerald-500'
                      : 'bg-emerald-50 text-emerald-700 font-bold border-l-2 border-emerald-500'
                    : isDark
                      ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      active
                        ? isDark ? 'text-emerald-400' : 'text-emerald-600'
                        : isDark ? 'text-zinc-500' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500 text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-zinc-800/40 flex items-center justify-between">
            <button
              onClick={() => {
                onOpenDaily();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-amber-500 py-1"
            >
              Daily Challenge ({stats.streakDays}d streak)
            </button>
            <button
              onClick={() => {
                onOpenProfile();
                setMobileMenuOpen(false);
              }}
              className="text-xs font-semibold text-emerald-500 py-1"
            >
              Profile &amp; Stats
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
