import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { MobileBottomNav } from './components/common/MobileBottomNav';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './components/home/HomePage';
import { LearnHub } from './components/learn/LearnHub';
import { TenseDetailPage } from './components/learn/TenseDetailPage';
import { PracticeHub } from './components/practice/PracticeHub';
import { QuizRunner } from './components/quiz/QuizRunner';
import { FlashcardDeck } from './components/flashcards/FlashcardDeck';
import { TenseComparator } from './components/compare/TenseComparator';
import { MasterCheatSheet } from './components/cheatsheet/MasterCheatSheet';
import { MistakesNotebook } from './components/dashboard/MistakesNotebook';
import { ProgressDashboard } from './components/dashboard/ProgressDashboard';
import { DailyChallengeModal } from './components/daily/DailyChallengeModal';
import { UserProfileModal } from './components/profile/UserProfileModal';
import { TENSES_DATA } from './data/tensesData';

const MainContent: React.FC = () => {
  const { activeRoute, navigate, isDark } = useApp();

  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Render view based on route
  const renderRouteView = () => {
    // 1. Tense Detail route: /learn/:id
    if (activeRoute.startsWith('/learn/')) {
      const tenseId = activeRoute.replace('/learn/', '');
      const matchedTense = TENSES_DATA.find((t) => t.id === tenseId || t.slug === tenseId);
      if (matchedTense) {
        return <TenseDetailPage tense={matchedTense} />;
      }
      // fallback to LearnHub if tenseId not found
      return <LearnHub />;
    }

    // 2. Main routes
    switch (activeRoute) {
      case '/':
        return <HomePage onOpenDaily={() => setIsDailyOpen(true)} />;
      case '/learn':
        return <LearnHub />;
      case '/practice':
        return <PracticeHub />;
      case '/quiz':
        return <QuizRunner />;
      case '/flashcards':
        return <FlashcardDeck />;
      case '/compare':
        return <TenseComparator />;
      case '/cheatsheet':
        return <MasterCheatSheet />;
      case '/mistakes':
        return <MistakesNotebook />;
      case '/progress':
        return <ProgressDashboard />;
      default:
        return <HomePage onOpenDaily={() => setIsDailyOpen(true)} />;
    }
  };

  return (
    <div className={`min-h-screen flex flex-col selection:bg-emerald-500 selection:text-black transition-colors duration-200 ${
      isDark ? 'bg-[#0A0A0A] text-[#E5E5E5]' : 'bg-[#F8FAFC] text-[#0F172A]'
    }`}>
      {/* Navbar */}
      <Navbar
        onOpenDaily={() => setIsDailyOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area with safe padding for mobile bottom bar */}
      <main className="flex-1 pb-20 lg:pb-0">
        {renderRouteView()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Persistent Mobile Bottom Bar */}
      <MobileBottomNav
        onOpenDaily={() => setIsDailyOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Global Modals */}
      <SearchModal />
      <DailyChallengeModal
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
      />
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
