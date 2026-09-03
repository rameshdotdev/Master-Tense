import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Achievement,
  FlashcardItem,
  MistakeRecord,
  PracticeQuestion,
  QuizResult,
  UserStats
} from '../types';
import { TENSES_DATA } from '../data/tensesData';
import confetti from 'canvas-confetti';

interface AppContextType {
  activeRoute: string;
  navigate: (route: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  stats: UserStats;
  achievements: Achievement[];
  addXp: (amount: number, reason?: string) => void;
  markLessonComplete: (tenseId: string) => void;
  toggleFavoriteTense: (tenseId: string) => void;
  recordQuestionAnswer: (
    question: PracticeQuestion,
    userAnswer: string,
    isCorrect: boolean
  ) => void;
  resolveMistake: (mistakeId: string) => void;
  recordQuizResult: (result: QuizResult) => void;
  rateFlashcard: (cardId: string, rating: 'easy' | 'review' | 'difficult') => void;
  completeDailyChallenge: () => void;
  resetAllData: () => void;
  triggerConfetti: () => void;
}

const STORAGE_KEY = 'english_tenses_app_data_v1';
const THEME_KEY = 'english_tenses_theme';

const DEFAULT_STATS: UserStats = {
  xp: 120,
  level: 1,
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalAnswered: 8,
  totalCorrect: 7,
  completedLessons: ['present-simple'],
  favoritedTenses: ['present-simple', 'past-simple'],
  mistakes: [],
  quizHistory: [],
  dailyChallengeCompletedDate: '',
  flashcardRatings: {}
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation: sync with window.location.hash
  const [activeRoute, setActiveRoute] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    return hash || '/';
  });

  const navigate = (route: string) => {
    window.location.hash = route;
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      setActiveRoute(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Theme: Sophisticated Dark default
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) {
      return saved === 'dark';
    }
    return true;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      document.documentElement.style.colorScheme = 'dark';
      document.body.classList.add('dark');
      document.body.classList.remove('light');
      localStorage.setItem(THEME_KEY, 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      document.documentElement.style.colorScheme = 'light';
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      localStorage.setItem(THEME_KEY, 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Search modal state
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut Cmd/Ctrl + K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Stats
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        return { ...DEFAULT_STATS, ...JSON.parse(raw) };
      }
    } catch {
      // fallback
    }
    return DEFAULT_STATS;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  }, [stats]);

  // Streak verification on load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (stats.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      setStats((prev) => {
        let newStreak = prev.streakDays;
        if (prev.lastActiveDate === yesterday) {
          // Maintained streak!
          newStreak = prev.streakDays + 1;
        } else if (prev.lastActiveDate !== today) {
          // Broken streak, reset to 1
          newStreak = 1;
        }
        return {
          ...prev,
          lastActiveDate: today,
          streakDays: newStreak
        };
      });
    }
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const addXp = (amount: number) => {
    setStats((prev) => {
      const newXp = prev.xp + amount;
      const newLevel = Math.max(1, Math.floor(newXp / 150) + 1);
      if (newLevel > prev.level) {
        triggerConfetti();
      }
      return {
        ...prev,
        xp: newXp,
        level: newLevel
      };
    });
  };

  const markLessonComplete = (tenseId: string) => {
    setStats((prev) => {
      if (prev.completedLessons.includes(tenseId)) return prev;
      const completed = [...prev.completedLessons, tenseId];
      triggerConfetti();
      return {
        ...prev,
        completedLessons: completed,
        xp: prev.xp + 50
      };
    });
  };

  const toggleFavoriteTense = (tenseId: string) => {
    setStats((prev) => {
      const exists = prev.favoritedTenses.includes(tenseId);
      return {
        ...prev,
        favoritedTenses: exists
          ? prev.favoritedTenses.filter((id) => id !== tenseId)
          : [...prev.favoritedTenses, tenseId]
      };
    });
  };

  const recordQuestionAnswer = (
    question: PracticeQuestion,
    userAnswer: string,
    isCorrect: boolean
  ) => {
    setStats((prev) => {
      const newTotal = prev.totalAnswered + 1;
      const newCorrect = prev.totalCorrect + (isCorrect ? 1 : 0);
      const earnedXp = isCorrect ? 15 : 5;
      const newXp = prev.xp + earnedXp;
      const newLevel = Math.max(1, Math.floor(newXp / 150) + 1);

      let updatedMistakes = [...prev.mistakes];
      if (!isCorrect) {
        // Add to mistakes notebook if not already recorded unresolved
        const tenseData = TENSES_DATA.find((t) => t.id === question.tenseId);
        const existingIdx = updatedMistakes.findIndex(
          (m) => m.questionId === question.id && !m.resolved
        );
        if (existingIdx === -1) {
          const newMistake: MistakeRecord = {
            id: 'mst-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            questionId: question.id,
            tenseId: question.tenseId,
            tenseName: tenseData ? tenseData.name : question.tenseId,
            prompt: question.prompt,
            userAnswer,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
            date: new Date().toISOString().split('T')[0],
            resolved: false
          };
          updatedMistakes = [newMistake, ...updatedMistakes];
        }
      }

      return {
        ...prev,
        totalAnswered: newTotal,
        totalCorrect: newCorrect,
        xp: newXp,
        level: newLevel,
        mistakes: updatedMistakes
      };
    });
  };

  const resolveMistake = (mistakeId: string) => {
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + 25,
      mistakes: prev.mistakes.map((m) =>
        m.id === mistakeId ? { ...m, resolved: true } : m
      )
    }));
    triggerConfetti();
  };

  const recordQuizResult = (result: QuizResult) => {
    setStats((prev) => {
      const earnedXp = result.score * 20 + 30;
      const newXp = prev.xp + earnedXp;
      const newLevel = Math.max(1, Math.floor(newXp / 150) + 1);

      // Collect mistakes from failed quiz questions
      const newMistakes: MistakeRecord[] = [];
      result.records.forEach((rec) => {
        if (!rec.isCorrect) {
          const tense = TENSES_DATA.find((t) => t.id === rec.question.tenseId);
          newMistakes.push({
            id: 'mst-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6),
            questionId: rec.question.id,
            tenseId: rec.question.tenseId,
            tenseName: tense ? tense.name : rec.question.tenseId,
            prompt: rec.question.prompt,
            userAnswer: rec.userAnswer,
            correctAnswer: rec.question.correctAnswer,
            explanation: rec.question.explanation,
            date: new Date().toISOString().split('T')[0],
            resolved: false
          });
        }
      });

      if (result.percentage === 100) {
        triggerConfetti();
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        totalAnswered: prev.totalAnswered + result.totalQuestions,
        totalCorrect: prev.totalCorrect + result.score,
        quizHistory: [result, ...prev.quizHistory],
        mistakes: [...newMistakes, ...prev.mistakes]
      };
    });
  };

  const rateFlashcard = (cardId: string, rating: 'easy' | 'review' | 'difficult') => {
    setStats((prev) => ({
      ...prev,
      xp: prev.xp + (rating === 'easy' ? 10 : 5),
      flashcardRatings: {
        ...prev.flashcardRatings,
        [cardId]: rating
      }
    }));
  };

  const completeDailyChallenge = () => {
    const today = new Date().toISOString().split('T')[0];
    setStats((prev) => {
      if (prev.dailyChallengeCompletedDate === today) return prev;
      triggerConfetti();
      return {
        ...prev,
        xp: prev.xp + 100,
        dailyChallengeCompletedDate: today
      };
    });
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEY);
    setStats(DEFAULT_STATS);
  };

  // Compute Achievements dynamically based on stats
  const achievements: Achievement[] = [
    {
      id: 'ach-first-lesson',
      title: 'Tense Beginner',
      description: 'Complete your first tense lesson',
      icon: 'Award',
      unlocked: stats.completedLessons.length >= 1,
      progress: Math.min(stats.completedLessons.length, 1),
      maxProgress: 1
    },
    {
      id: 'ach-grammar-master',
      title: 'Grammar Master',
      description: 'Complete all 12 tense lessons',
      icon: 'BookOpenCheck',
      unlocked: stats.completedLessons.length >= 12,
      progress: stats.completedLessons.length,
      maxProgress: 12
    },
    {
      id: 'ach-streak-7',
      title: '7-Day Streak',
      description: 'Study for 7 consecutive days',
      icon: 'Flame',
      unlocked: stats.streakDays >= 7,
      progress: Math.min(stats.streakDays, 7),
      maxProgress: 7
    },
    {
      id: 'ach-perfect-quiz',
      title: 'Perfect Score',
      description: 'Score 100% on any full quiz',
      icon: 'Target',
      unlocked: stats.quizHistory.some((q) => q.percentage === 100),
      progress: stats.quizHistory.some((q) => q.percentage === 100) ? 1 : 0,
      maxProgress: 1
    },
    {
      id: 'ach-questions-50',
      title: 'Practice Devotee',
      description: 'Answer 50 grammar questions',
      icon: 'CheckCircle2',
      unlocked: stats.totalAnswered >= 50,
      progress: Math.min(stats.totalAnswered, 50),
      maxProgress: 50
    },
    {
      id: 'ach-mistake-fixer',
      title: 'Mistake Master',
      description: 'Resolve 5 mistakes in your notebook',
      icon: 'BrainCircuit',
      unlocked: stats.mistakes.filter((m) => m.resolved).length >= 5,
      progress: Math.min(stats.mistakes.filter((m) => m.resolved).length, 5),
      maxProgress: 5
    }
  ];

  return (
    <AppContext.Provider
      value={{
        activeRoute,
        navigate,
        isDark,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        stats,
        achievements,
        addXp,
        markLessonComplete,
        toggleFavoriteTense,
        recordQuestionAnswer,
        resolveMistake,
        recordQuizResult,
        rateFlashcard,
        completeDailyChallenge,
        resetAllData,
        triggerConfetti
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
