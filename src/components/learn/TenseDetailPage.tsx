import React, { useState } from 'react';
import { TenseData } from '../../types';
import { useApp } from '../../context/AppContext';
import { TimelineVisualizer } from '../common/TimelineVisualizer';
import { InteractiveExercise } from '../practice/InteractiveExercise';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Sparkles,
  Star,
  ArrowLeft,
  MessageSquare,
  Mic,
  Award,
  Zap,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';

interface TenseDetailPageProps {
  tense: TenseData;
}

export const TenseDetailPage: React.FC<TenseDetailPageProps> = ({ tense }) => {
  const { navigate, stats, markLessonComplete, toggleFavoriteTense } = useApp();

  const isCompleted = stats.completedLessons.includes(tense.id);
  const isFavorited = stats.favoritedTenses.includes(tense.id);

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'Beginner':
        return 'bg-zinc-800 text-emerald-400 border-zinc-700';
      case 'Intermediate':
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
      case 'Advanced':
        return 'bg-zinc-800 text-purple-400 border-zinc-700';
      default:
        return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-emerald-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All 12 Tenses</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavoriteTense(tense.id)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 hover:border-zinc-700 transition-colors"
          >
            <Star
              className={`w-4 h-4 ${
                isFavorited ? 'text-amber-400 fill-amber-400' : 'text-zinc-500'
              }`}
            />
            <span>{isFavorited ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
        </div>
      </div>

      {/* 1. TENSE HEADER */}
      <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${getDifficultyBadge(
                  tense.difficulty
                )}`}
              >
                {tense.difficulty}
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400 bg-zinc-800 border border-zinc-700 px-2.5 py-0.5 rounded">
                {tense.category} Tense
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
              {tense.name}
            </h1>
          </div>

          {/* Progress & Complete Button */}
          <div className="flex items-center gap-3">
            {isCompleted ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-400 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Lesson Mastered</span>
              </div>
            ) : (
              <button
                onClick={() => markLessonComplete(tense.id)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-wider text-xs transition-all shadow-lg shadow-emerald-500/20"
              >
                <Award className="w-4 h-4" />
                <span>Mark as Mastered (+50 XP)</span>
              </button>
            )}
          </div>
        </div>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-3xl mb-6">
          {tense.shortDescription}
        </p>

        {/* 2. "EXPLAIN LIKE I'M A BEGINNER" CARD */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-5 mb-6">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Explain Like I&apos;m a Beginner</span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
            {tense.beginnerExplanation}
          </p>
        </div>

        {/* Visual Timeline component */}
        <TimelineVisualizer timeline={tense.timeline} tenseName={tense.name} />
      </div>

      {/* 3. FORMULA / STRUCTURE SECTION */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-serif italic text-white">
            Formula &amp; Sentence Structures
          </h2>
        </div>
        <p className="text-xs text-zinc-400">
          Master the three core sentence patterns for {tense.name}. Notice how auxiliary verbs and verb forms behave.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Affirmative */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Affirmative (+)
                </span>
                <span className="text-[10px] bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 font-bold px-2 py-0.5 rounded">
                  Positive
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-3">
                Used to make statements of fact or reality.
              </p>
            </div>
            <div className="bg-[#0A0A0A] p-3 rounded-xl border border-zinc-800">
              <code className="text-xs font-mono font-bold text-emerald-400 break-words">
                {tense.formula.affirmative}
              </code>
            </div>
          </div>

          {/* Negative */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                  Negative (-)
                </span>
                <span className="text-[10px] bg-rose-950/50 border border-rose-500/30 text-rose-400 font-bold px-2 py-0.5 rounded">
                  Negation
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-3">
                Used to state what does not or did not happen.
              </p>
            </div>
            <div className="bg-[#0A0A0A] p-3 rounded-xl border border-zinc-800">
              <code className="text-xs font-mono font-bold text-rose-400 break-words">
                {tense.formula.negative}
              </code>
            </div>
          </div>

          {/* Question */}
          <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Question (?)
                </span>
                <span className="text-[10px] bg-teal-950/50 border border-teal-500/30 text-teal-400 font-bold px-2 py-0.5 rounded">
                  Inquiry
                </span>
              </div>
              <p className="text-xs text-zinc-400 mb-3">
                Inverts auxiliary verb and subject.
              </p>
            </div>
            <div className="bg-[#0A0A0A] p-3 rounded-xl border border-zinc-800">
              <code className="text-xs font-mono font-bold text-teal-400 break-words">
                {tense.formula.question}
              </code>
            </div>
          </div>
        </div>

        {tense.formula.notes && (
          <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs text-zinc-400">
            <strong className="font-semibold text-zinc-200">Grammar Note: </strong>
            {tense.formula.notes}
          </div>
        )}
      </section>

      {/* 4. EXAMPLES WITH HIGHLIGHTS */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif italic text-white">
          Real Sentence Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tense.examples.map((ex, idx) => (
            <div
              key={idx}
              className="bg-[#121212] rounded-2xl border border-zinc-800 p-4 space-y-2 hover:border-zinc-700 transition-colors shadow-sm"
            >
              <div className="text-sm font-serif italic text-white leading-snug">
                &ldquo;{ex.sentence}&rdquo;
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-zinc-800/80 border border-zinc-700 px-2 py-0.5 rounded">
                  Key Form: {ex.highlight}
                </span>
              </div>
              {ex.meaning && (
                <p className="text-xs text-zinc-400 italic">
                  Usage Context: {ex.meaning}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 5. USAGES & SIGNAL WORDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Usages */}
        <div className="bg-[#121212] rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-serif italic text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>When to Use It</span>
          </h3>
          <ul className="space-y-2.5 text-xs text-zinc-300">
            {tense.whenToUse.map((usage, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{usage}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Signal Words */}
        <div className="bg-[#121212] rounded-3xl border border-zinc-800 p-6 space-y-4 shadow-sm">
          <h3 className="text-base font-serif italic text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Signal Words &amp; Time Triggers</span>
          </h3>
          <p className="text-xs text-zinc-400">
            When you see these keywords in tests or reading, they strongly suggest using {tense.name}:
          </p>
          <div className="flex flex-wrap gap-2">
            {tense.signalWords.map((word, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-zinc-800 text-amber-300 border border-zinc-700 font-mono text-xs"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 6. GRAMMAR & SPELLING RULES */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif italic text-white flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-emerald-400" />
          <span>Core Grammar &amp; Spelling Rules</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tense.rules.map((rule, idx) => (
            <div
              key={idx}
              className="bg-[#121212] rounded-2xl border border-zinc-800 p-5 space-y-3 shadow-sm"
            >
              <h4 className="text-sm font-bold text-white">
                {rule.title}
              </h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                {rule.explanation}
              </p>
              {rule.examples.length > 0 && (
                <div className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-xl space-y-1">
                  {rule.examples.map((ex, eIdx) => (
                    <p key={eIdx} className="text-xs font-mono text-emerald-400">
                      • {ex}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Spelling Rules if present */}
          {tense.spellingRules &&
            tense.spellingRules.map((sRule, sIdx) => (
              <div
                key={`spell-${sIdx}`}
                className="bg-[#121212] rounded-2xl border border-zinc-800 p-5 space-y-3 shadow-sm"
              >
                <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="text-emerald-400">✍</span>
                  <span>Spelling: {sRule.title}</span>
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {sRule.explanation}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {sRule.examples.map((ex, eIdx) => (
                    <span
                      key={eIdx}
                      className="px-2 py-0.5 rounded bg-zinc-800 text-emerald-400 font-mono text-xs font-semibold border border-zinc-700"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* 7. "WHEN NOT TO USE IT" & COMMON MISTAKES */}
      <section className="space-y-4">
        <h2 className="text-xl font-serif italic text-white flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-400" />
          <span>Common Mistakes &amp; What to Avoid</span>
        </h2>

        {/* When NOT to use alert */}
        {tense.whenNotToUse.length > 0 && (
          <div className="p-4 rounded-2xl bg-zinc-900/80 border border-amber-500/40 text-xs text-zinc-300 space-y-1">
            <strong className="font-bold flex items-center gap-1.5 text-amber-300 text-sm">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              When NOT to use {tense.name}:
            </strong>
            <ul className="list-disc list-inside space-y-1 mt-1 pl-1 text-zinc-400">
              {tense.whenNotToUse.map((pitfall, pIdx) => (
                <li key={pIdx}>{pitfall}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Incorrect vs Correct Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tense.commonMistakes.map((mistake, mIdx) => (
            <div
              key={mIdx}
              className="bg-[#121212] rounded-2xl border border-zinc-800 p-5 space-y-3 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-950/30 text-rose-300 text-xs font-mono border border-rose-900/60">
                  <span className="text-rose-400 font-bold">❌</span>
                  <span className="line-through">{mistake.incorrect}</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-950/30 text-emerald-300 text-xs font-mono font-bold border border-emerald-900/60">
                  <span className="text-emerald-400 font-bold">✅</span>
                  <span>{mistake.correct}</span>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed pt-1">
                <strong className="text-zinc-200">Rule: </strong>
                {mistake.explanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. REAL-LIFE CONVERSATIONAL DIALOGUE */}
      {tense.realLifeDialogues.length > 0 && (
        <section className="bg-zinc-900/40 rounded-3xl border border-zinc-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif italic text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Real-Life Conversational Usage</span>
            </h3>
            <span className="text-xs text-zinc-500 italic">
              {tense.realLifeDialogues[0].context}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 rounded-2xl bg-[#121212] border border-zinc-800">
              <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 font-bold text-xs flex items-center justify-center shrink-0">
                {tense.realLifeDialogues[0].speakerA[0]}
              </div>
              <div>
                <span className="text-[11px] font-bold text-zinc-500 block">
                  {tense.realLifeDialogues[0].speakerA}
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 mt-0.5">
                  &ldquo;{tense.realLifeDialogues[0].lineA}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900/80 border border-zinc-750">
              <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/30">
                {tense.realLifeDialogues[0].speakerB[0]}
              </div>
              <div>
                <span className="text-[11px] font-bold text-emerald-400 block">
                  {tense.realLifeDialogues[0].speakerB}
                </span>
                <p className="text-xs sm:text-sm text-white font-medium mt-0.5">
                  &ldquo;{tense.realLifeDialogues[0].lineB}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 9. SPEAKING / WRITING PRODUCTION PROMPT */}
      <section className="bg-[#121212] rounded-3xl border border-zinc-800 p-6 space-y-4">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
          <Mic className="w-5 h-5 text-emerald-400" />
          <span className="font-serif italic text-white text-lg">Active Speaking / Writing Practice</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 font-semibold">
          {tense.speakingPrompt.prompt}
        </p>

        <div className="bg-zinc-900/80 p-4 rounded-2xl border border-zinc-800 space-y-2">
          <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
            Model Answer:
          </span>
          <p className="text-xs sm:text-sm italic text-zinc-200">
            &ldquo;{tense.speakingPrompt.modelAnswer}&rdquo;
          </p>
          <p className="text-[11px] text-zinc-400 pt-1 border-t border-zinc-800">
            <strong className="text-zinc-300">Tip: </strong>{tense.speakingPrompt.tips}
          </p>
        </div>
      </section>

      {/* 10. QUICK 5-QUESTION LESSON PRACTICE */}
      <section className="space-y-4 pt-6 border-t border-zinc-800">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h2 className="text-xl font-serif italic text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              <span>Quick 5-Question Practice</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-0.5">
              Test your understanding of {tense.name} right now with instant answer explanations.
            </p>
          </div>

          <div className="flex items-center gap-1">
            {tense.quickExercises.map((_, qIdx) => (
              <button
                key={qIdx}
                onClick={() => setActiveExerciseIndex(qIdx)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  activeExerciseIndex === qIdx
                    ? 'bg-emerald-500 text-black font-extrabold shadow-sm'
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                {qIdx + 1}
              </button>
            ))}
          </div>
        </div>

        {tense.quickExercises[activeExerciseIndex] && (
          <InteractiveExercise
            key={tense.quickExercises[activeExerciseIndex].id}
            question={tense.quickExercises[activeExerciseIndex]}
            onNext={() => {
              if (activeExerciseIndex < tense.quickExercises.length - 1) {
                setActiveExerciseIndex((prev) => prev + 1);
              } else {
                markLessonComplete(tense.id);
              }
            }}
            showNextButton={true}
          />
        )}
      </section>

      {/* Bottom Navigation between Tenses */}
      <div className="flex items-center justify-between pt-6 border-t border-zinc-800">
        <button
          onClick={() => navigate('/learn')}
          className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors"
        >
          View All Tenses
        </button>

        <button
          onClick={() => navigate('/practice')}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider transition-colors shadow"
        >
          Go to Practice Hub
        </button>
      </div>
    </div>
  );
};
