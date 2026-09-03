import React, { useState, useEffect } from 'react';
import { PracticeQuestion } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookmarkPlus,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  BookOpen
} from 'lucide-react';

interface InteractiveExerciseProps {
  question: PracticeQuestion;
  onNext?: () => void;
  showNextButton?: boolean;
}

export const InteractiveExercise: React.FC<InteractiveExerciseProps> = ({
  question,
  onNext,
  showNextButton = true
}) => {
  const { recordQuestionAnswer, stats } = useApp();

  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [rearrangedWords, setRearrangedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Initialize or reset when question changes
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setShowHint(false);

    if (question.type === 'rearrange-words' && question.scrambledWords) {
      setRearrangedWords([]);
      // Shuffle scrambled words
      setAvailableWords([...question.scrambledWords]);
    }
  }, [question.id]);

  // Handle word selection in rearrange question
  const handlePickWord = (word: string, index: number) => {
    if (isAnswered) return;
    setRearrangedWords((prev) => [...prev, word]);
    setAvailableWords((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveWord = (word: string, index: number) => {
    if (isAnswered) return;
    setRearrangedWords((prev) => prev.filter((_, i) => i !== index));
    setAvailableWords((prev) => [...prev, word]);
  };

  const handleResetRearrange = () => {
    if (isAnswered || !question.scrambledWords) return;
    setRearrangedWords([]);
    setAvailableWords([...question.scrambledWords]);
  };

  // Submit check
  const handleSubmit = (chosenAnswer: string) => {
    if (isAnswered) return;

    const trimmedUser = chosenAnswer.trim();
    const trimmedCorrect = question.correctAnswer.trim();
    // Normalize punctuation for rearrange
    const cleanUser = trimmedUser.replace(/\s+/g, ' ').toLowerCase();
    const cleanCorrect = trimmedCorrect.replace(/\s+/g, ' ').toLowerCase();

    const correct = cleanUser === cleanCorrect;
    setIsCorrect(correct);
    setIsAnswered(true);
    setSelectedOption(trimmedUser);

    recordQuestionAnswer(question, trimmedUser, correct);
  };

  const handleRearrangeSubmit = () => {
    const constructed = rearrangedWords.join(' ');
    handleSubmit(constructed);
  };

  const isMistakeSaved = stats.mistakes.some(
    (m) => m.questionId === question.id && !m.resolved
  );

  return (
    <div
      id={`exercise-${question.id}`}
      className="bg-[#121212] rounded-2xl border border-zinc-800 p-5 sm:p-6 shadow-sm transition-all"
    >
      {/* Exercise Header */}
      <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300">
            {question.type.replace(/-/g, ' ')}
          </span>
          <span className="text-[10px] font-mono text-zinc-500">
            Difficulty: {question.difficulty}
          </span>
        </div>

        {question.hint && (
          <button
            onClick={() => setShowHint((prev) => !prev)}
            className="flex items-center gap-1 text-xs text-amber-400 hover:underline font-mono"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
            {showHint ? 'Hide Hint' : 'Need a Hint?'}
          </button>
        )}
      </div>

      {showHint && question.hint && (
        <div className="mb-4 p-3 rounded-xl bg-zinc-900/90 border border-amber-500/40 text-xs text-amber-300 flex items-start gap-2 font-mono">
          <Lightbulb className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
          <span>{question.hint}</span>
        </div>
      )}

      {/* Prompt / Question text */}
      <div className="mb-5">
        <p className="text-base sm:text-lg font-serif italic text-white leading-snug">
          {question.prompt}
        </p>
      </div>

      {/* Render Options based on type */}

      {/* 1. REARRANGE WORDS */}
      {question.type === 'rearrange-words' && (
        <div className="space-y-4 mb-5">
          {/* Active Construction Zone */}
          <div className="min-h-[58px] p-3 rounded-xl border-2 border-dashed border-zinc-700 bg-zinc-900/50 flex flex-wrap items-center gap-2">
            {rearrangedWords.length === 0 ? (
              <span className="text-xs text-zinc-500 italic">
                Tap words below in the correct order to construct the sentence...
              </span>
            ) : (
              rearrangedWords.map((word, idx) => (
                <button
                  key={`${word}-${idx}`}
                  disabled={isAnswered}
                  onClick={() => handleRemoveWord(word, idx)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 text-black font-bold text-xs shadow-sm hover:bg-emerald-400 transition-colors"
                  title="Click to remove"
                >
                  {word}
                </button>
              ))
            )}
          </div>

          {/* Available Word Bank */}
          {!isAnswered && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
                  Available Words:
                </span>
                {rearrangedWords.length > 0 && (
                  <button
                    onClick={handleResetRearrange}
                    className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-200"
                  >
                    <RefreshCw className="w-3 h-3" /> Reset
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {availableWords.map((word, idx) => (
                  <button
                    key={`${word}-${idx}`}
                    onClick={() => handlePickWord(word, idx)}
                    className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-medium text-xs border border-zinc-700 transition-colors shadow-sm"
                  >
                    {word}
                  </button>
                ))}
              </div>
            </div>
          )}

          {!isAnswered && (
            <button
              disabled={rearrangedWords.length === 0}
              onClick={handleRearrangeSubmit}
              className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-40 text-black font-bold uppercase tracking-wider text-xs transition-colors shadow"
            >
              Check Order
            </button>
          )}
        </div>
      )}

      {/* 2. MULTIPLE CHOICE / FILL BLANK / CORRECTION / IDENTIFY TENSE / TRANSLATION */}
      {question.type !== 'rearrange-words' && question.options && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-5">
          {question.options.map((opt) => {
            const isSelected = selectedOption === opt;
            let optStyle =
              'bg-zinc-900/60 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-200';

            if (isAnswered) {
              if (opt === question.correctAnswer) {
                optStyle =
                  'bg-emerald-950/40 border-emerald-500 text-emerald-300 font-bold';
              } else if (isSelected && !isCorrect) {
                optStyle =
                  'bg-rose-950/40 border-rose-500 text-rose-300 line-through';
              } else {
                optStyle = 'opacity-40 border-zinc-800';
              }
            }

            return (
              <button
                key={opt}
                disabled={isAnswered}
                onClick={() => handleSubmit(opt)}
                className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between ${optStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && opt === question.correctAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 3. INSTANT FEEDBACK EXPLANATION PANEL */}
      {isAnswered && (
        <div
          className={`p-4 rounded-xl border mb-4 animate-in fade-in duration-200 ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
              : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <div className="flex items-center gap-1.5 font-bold text-sm text-emerald-400">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Correct! +15 XP</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 font-bold text-sm text-rose-400">
                <XCircle className="w-5 h-5 text-rose-400" />
                <span>Not quite. Let&apos;s understand why:</span>
              </div>
            )}
          </div>

          {/* Correct Answer reveal */}
          <div className="mb-2.5 pb-2.5 border-b border-zinc-800">
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-zinc-400 block">
              Correct Answer:
            </span>
            <p className="text-sm font-bold font-mono text-emerald-400 mt-0.5">
              {question.correctAnswer}
            </p>
          </div>

          {/* "Why?" Explanation */}
          <div className="space-y-1.5 text-xs leading-relaxed">
            <p>
              <strong className="font-semibold text-zinc-200">Why? </strong>
              <span className="text-zinc-300">{question.explanation}</span>
            </p>
            <p className="text-zinc-400">
              <strong className="font-semibold text-zinc-300">Tense Rule: </strong>
              {question.tenseRule}
            </p>
          </div>

          {/* If incorrect, note about saved mistakes */}
          {!isCorrect && (
            <div className="mt-3 pt-2 border-t border-rose-900/60 flex items-center justify-between text-[11px] text-rose-400 font-mono">
              <span className="flex items-center gap-1">
                <BookmarkPlus className="w-3.5 h-3.5" />
                Saved to your Mistakes Notebook for review!
              </span>
            </div>
          )}
        </div>
      )}

      {/* Next Question / Continue Action */}
      {isAnswered && showNextButton && onNext && (
        <button
          onClick={onNext}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs transition-colors shadow-sm"
        >
          <span>Next Exercise</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
