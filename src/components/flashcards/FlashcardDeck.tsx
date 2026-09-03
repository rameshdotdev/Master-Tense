import React, { useState, useMemo } from 'react';
import { FLASHCARDS_DATA } from '../../data/flashcardsData';
import { TENSES_DATA } from '../../data/tensesData';
import { useApp } from '../../context/AppContext';
import {
  Layers,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shuffle
} from 'lucide-react';

export const FlashcardDeck: React.FC = () => {
  const { stats, rateFlashcard } = useApp();

  const [selectedTense, setSelectedTense] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Filter flashcards
  const filteredCards = useMemo(() => {
    if (selectedTense === 'all') return FLASHCARDS_DATA;
    return FLASHCARDS_DATA.filter((c) => c.tenseId === selectedTense);
  }, [selectedTense]);

  const currentCard = filteredCards[currentIndex] || filteredCards[0];
  const userRating = currentCard ? stats.flashcardRatings[currentCard.id] : undefined;

  // Linked rich tense data
  const currentTense = useMemo(() => {
    if (!currentCard) return undefined;
    return TENSES_DATA.find((t) => t.id === currentCard.tenseId);
  }, [currentCard]);

  const handleNext = () => {
    setIsFlipped(false);
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(filteredCards.length - 1);
    }
  };

  const handleRate = (rating: 'easy' | 'review' | 'difficult') => {
    if (!currentCard) return;
    rateFlashcard(currentCard.id, rating);
    handleNext();
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * Math.max(1, filteredCards.length)));
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === 'Space') {
      e.preventDefault();
      setIsFlipped((prev) => !prev);
    } else if (e.code === 'ArrowRight') {
      handleNext();
    } else if (e.code === 'ArrowLeft') {
      handlePrev();
    }
  };

  return (
    <div
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 focus:outline-none"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">
              Active Recall Flashcards
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
            Tense Flashcards
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Test yourself with flip cards: inspect the front example, predict the grammar rules, then flip.
          </p>
        </div>

        {/* Filter by Tense */}
        <div className="flex items-center gap-2">
          <select
            value={selectedTense}
            onChange={(e) => {
              setSelectedTense(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className="text-xs font-mono font-semibold px-3 py-2 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 focus:outline-none focus:border-zinc-700 shadow-sm"
          >
            <option value="all">All 12 Tenses</option>
            {TENSES_DATA.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleShuffle}
            className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800 shadow-sm"
            title="Shuffle Deck"
          >
            <Shuffle className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Card Progress Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-zinc-500 px-1">
        <span>
          Card <strong className="text-zinc-200">{currentIndex + 1}</strong> of{' '}
          {filteredCards.length}
        </span>
        <span className="hidden sm:inline">Press [Space] to flip, [◀ / ▶] to navigate</span>
      </div>

      {/* Main Flashcard with Flip Animation */}
      {currentCard && (
        <div className="w-full min-h-[380px] sm:min-h-[420px]">
          <div
            onClick={() => setIsFlipped((prev) => !prev)}
            className={`relative w-full h-full min-h-[380px] sm:min-h-[420px] rounded-3xl border border-zinc-800 p-5 sm:p-8 cursor-pointer transition-all duration-300 shadow-md hover:border-zinc-700 bg-[#0D0D0D] flex flex-col justify-between select-none active:scale-[0.99] ${
              isFlipped ? 'ring-1 ring-emerald-500/40' : ''
            }`}
          >
            {/* Front of Card */}
            {!isFlipped ? (
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400">
                      Tense Flashcard • Front
                    </span>
                    {userRating && (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded capitalize ${
                          userRating === 'easy'
                            ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                            : userRating === 'review'
                            ? 'bg-amber-950/40 text-amber-300 border border-amber-500/30'
                            : 'bg-rose-950/40 text-rose-400 border border-rose-500/30'
                        }`}
                      >
                        Status: {userRating}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 sm:mt-8 text-center space-y-3 sm:space-y-4">
                    <h2 className="text-2xl sm:text-3xl font-serif italic text-white">
                      {currentCard.tenseName}
                    </h2>
                    <p className="text-sm sm:text-base font-serif italic text-zinc-300 max-w-md mx-auto leading-relaxed">
                      &ldquo;{currentCard.sentence}&rdquo;
                    </p>
                    {currentCard.signalWordUsed && (
                      <span className="inline-block text-[11px] font-mono font-semibold text-emerald-400 bg-zinc-900 border border-zinc-800 px-2.5 py-1 rounded-lg">
                        Signal: {currentCard.signalWordUsed}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-5 border-t border-zinc-800 text-center">
                  <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 bg-zinc-900 border border-zinc-800 px-3.5 py-2 rounded-full">
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Tap card to flip</span>
                  </div>
                </div>
              </div>
            ) : (
              /* Back of Card */
              <div className="flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400">
                      Key Takeaways • Back
                    </span>
                    <span className="text-xs font-serif italic text-white">
                      {currentCard.tenseName}
                    </span>
                  </div>

                  {/* Formula Breakdown */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-zinc-900/80 border border-zinc-800 mb-2.5 space-y-1">
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-zinc-500 block">
                      Sentence Formula:
                    </span>
                    <p className="text-xs font-mono font-bold text-emerald-400 break-words">
                      (+) {currentTense ? currentTense.formula.affirmative : currentCard.formula}
                    </p>
                    {currentTense && (
                      <p className="text-xs font-mono text-rose-400 break-words">
                        (-) {currentTense.formula.negative}
                      </p>
                    )}
                  </div>

                  {/* Core Usage & Rule */}
                  <div className="text-xs text-zinc-300 leading-relaxed mb-2">
                    <strong className="text-white font-serif italic">Usage: </strong>
                    {currentCard.usage}
                  </div>
                  <div className="text-xs text-zinc-400 leading-relaxed mb-2">
                    <strong className="text-white font-serif italic">Why: </strong>
                    {currentCard.explanation}
                  </div>

                  {/* Signal Words */}
                  {currentTense && currentTense.signalWords.length > 0 && (
                    <div className="mb-2">
                      <span className="text-[10px] uppercase font-mono font-bold text-zinc-500 block mb-1">
                        Signal Words:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {currentTense.signalWords.slice(0, 5).map((w, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-mono"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Common Mistake */}
                  {currentTense && currentTense.commonMistakes[0] && (
                    <div className="p-2 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs text-zinc-300">
                      <strong className="text-rose-400 font-mono">Pitfall: </strong>
                      Avoid &ldquo;{currentTense.commonMistakes[0].incorrect}&rdquo; ➔ Use &ldquo;{currentTense.commonMistakes[0].correct}&rdquo;
                    </div>
                  )}
                </div>

                <div className="pt-2 border-t border-zinc-800 text-center">
                  <span className="text-[10px] font-mono text-zinc-500">
                    Rate recall below to advance deck:
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card Navigation & Rating Controls (Optimized for Mobile) */}
      <div className="space-y-3 pt-2">
        {/* Navigation Row: Prev / Flip / Next */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={handlePrev}
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold text-zinc-300 hover:bg-zinc-800 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Prev</span>
          </button>

          <button
            onClick={() => setIsFlipped((prev) => !prev)}
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-800 border border-zinc-700 text-xs font-mono font-bold text-emerald-400 hover:bg-zinc-700 shadow-sm"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>{isFlipped ? 'Show Front' : 'Flip Card'}</span>
          </button>

          <button
            onClick={handleNext}
            className="min-h-[44px] flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono font-bold text-zinc-300 hover:bg-zinc-800 shadow-sm"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Rating Buttons: Difficult / Review / Easy */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => handleRate('difficult')}
            className="min-h-[44px] px-2 py-2.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 font-mono text-xs font-bold hover:bg-rose-900/60 active:scale-[0.98] transition-all text-center"
          >
            Difficult
          </button>
          <button
            onClick={() => handleRate('review')}
            className="min-h-[44px] px-2 py-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold hover:bg-amber-900/60 active:scale-[0.98] transition-all text-center"
          >
            Review
          </button>
          <button
            onClick={() => handleRate('easy')}
            className="min-h-[44px] px-2 py-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 font-mono text-xs font-bold hover:bg-emerald-900/60 active:scale-[0.98] transition-all text-center"
          >
            Easy (+10 XP)
          </button>
        </div>
      </div>
    </div>
  );
};
