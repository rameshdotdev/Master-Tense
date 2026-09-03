import React, { useState } from 'react';
import { ALL_PRACTICE_QUESTIONS } from '../../data/practiceQuestions';
import { useApp } from '../../context/AppContext';
import { InteractiveExercise } from '../practice/InteractiveExercise';
import { X, Sparkles, Flame, CheckCircle2, Award } from 'lucide-react';

interface DailyChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DailyChallengeModal: React.FC<DailyChallengeModalProps> = ({
  isOpen,
  onClose
}) => {
  const { stats, completeDailyChallenge } = useApp();

  const today = new Date().toISOString().split('T')[0];
  const isAlreadyCompletedToday = stats.dailyChallengeCompletedDate === today;

  // Use a deterministic set of 3 questions based on date
  const todaySeed = today.split('-').reduce((acc, part) => acc + parseInt(part, 10), 0);
  const challengeQuestions = [
    ALL_PRACTICE_QUESTIONS[todaySeed % ALL_PRACTICE_QUESTIONS.length],
    ALL_PRACTICE_QUESTIONS[(todaySeed + 7) % ALL_PRACTICE_QUESTIONS.length],
    ALL_PRACTICE_QUESTIONS[(todaySeed + 13) % ALL_PRACTICE_QUESTIONS.length]
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedInModal, setCompletedInModal] = useState(isAlreadyCompletedToday);

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentIdx < challengeQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setCompletedInModal(true);
      completeDailyChallenge();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div
        className="w-full max-w-xl bg-[#0D0D0D] rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 flex items-center justify-center">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
            <div>
              <h3 className="text-base font-serif italic text-white">
                Daily Grammar Challenge
              </h3>
              <p className="text-[11px] text-zinc-400 font-mono">
                Complete 3 quick questions to protect your {stats.streakDays}-day streak!
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {completedInModal ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-xl font-serif italic text-white">
                  Today&apos;s Challenge Completed!
                </h4>
                <p className="text-xs text-zinc-400 mt-1 max-w-sm mx-auto">
                  You earned +100 XP and kept your {stats.streakDays}-day learning streak alive. Return tomorrow for new questions!
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs font-mono transition-colors shadow"
              >
                Close &amp; Keep Studying
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-zinc-400 font-mono font-semibold">
                <span>
                  Question {currentIdx + 1} of {challengeQuestions.length}
                </span>
                <span className="text-emerald-400 font-bold">
                  Reward: +100 XP
                </span>
              </div>

              {challengeQuestions[currentIdx] && (
                <InteractiveExercise
                  key={challengeQuestions[currentIdx].id}
                  question={challengeQuestions[currentIdx]}
                  onNext={handleNext}
                  showNextButton={true}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
