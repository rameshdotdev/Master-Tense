import React, { useState } from 'react';
import { Sparkles, Loader2, ChevronDown, ChevronUp, Lightbulb, Tag, CheckCircle2, XCircle, RefreshCw, AlertCircle } from 'lucide-react';
import { GrammarExplanationResponse } from '../../types';

interface HelpMeUnderstandProps {
  prompt: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  tenseId: string;
  tenseName?: string;
  staticExplanation?: string;
  className?: string;
}

export const HelpMeUnderstand: React.FC<HelpMeUnderstandProps> = ({
  prompt,
  userAnswer,
  correctAnswer,
  isCorrect,
  tenseId,
  tenseName,
  staticExplanation,
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<GrammarExplanationResponse | null>(null);

  const fetchExplanation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/explain-grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          userAnswer,
          correctAnswer,
          isCorrect,
          tenseId,
          tenseName,
          staticExplanation,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const result: GrammarExplanationResponse = await res.json();
      setData(result);
    } catch (err: any) {
      console.error('Error fetching grammar explanation:', err);
      setError('Unable to retrieve AI explanation at this moment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      setIsOpen(true);
      if (!data) {
        fetchExplanation();
      }
    } else {
      setIsOpen(false);
    }
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    fetchExplanation();
  };

  return (
    <div className={`mt-3 ${className}`}>
      {/* Action Button */}
      <button
        type="button"
        id={`help-understand-${tenseId}-${encodeURIComponent(correctAnswer).slice(0, 12)}`}
        onClick={handleToggle}
        disabled={isLoading}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shadow-sm ${
          isOpen
            ? 'bg-purple-950/40 border border-purple-500/40 text-purple-300'
            : 'bg-gradient-to-r from-purple-950/30 to-indigo-950/30 hover:from-purple-950/50 hover:to-indigo-950/50 border border-purple-500/30 hover:border-purple-400 text-purple-200'
        }`}
      >
        {isLoading ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin text-purple-400 shrink-0" />
        ) : (
          <Sparkles className="w-3.5 h-3.5 text-purple-400 shrink-0" />
        )}
        <span>{isLoading ? 'Gemini is analyzing...' : 'Help me understand'}</span>
        {isOpen ? (
          <ChevronUp className="w-3 h-3 text-purple-400 shrink-0" />
        ) : (
          <ChevronDown className="w-3 h-3 text-purple-400 shrink-0" />
        )}
      </button>

      {/* Expanded Explanation Card */}
      {isOpen && (
        <div className="mt-3 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#14121E] to-[#0D0B14] border border-purple-500/30 shadow-lg space-y-4 animate-in fade-in duration-200">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b border-purple-500/20 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white tracking-wide flex items-center gap-2">
                  <span>Grammatical Reasoning</span>
                  <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-300">
                    Gemini AI
                  </span>
                </h4>
                <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                  Target: {tenseName || tenseId.replace(/-/g, ' ')}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleRefresh}
                disabled={isLoading}
                title="Regenerate explanation"
                className="p-1.5 rounded-lg border border-purple-500/20 text-purple-400 hover:text-purple-200 hover:bg-purple-950/40 transition-colors"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading && !data && (
            <div className="space-y-3 py-2">
              <div className="flex items-center gap-2 text-xs text-purple-300 font-mono">
                <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                <span>Evaluating grammatical aspect, time signals, and syntax...</span>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-purple-950/40 rounded-full w-3/4 animate-pulse" />
                <div className="h-3 bg-purple-950/40 rounded-full w-full animate-pulse" />
                <div className="h-3 bg-purple-950/40 rounded-full w-5/6 animate-pulse" />
              </div>
            </div>
          )}

          {/* Error View */}
          {error && !isLoading && (
            <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-2.5 text-xs text-rose-300">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{error}</p>
                <button
                  onClick={fetchExplanation}
                  className="mt-1.5 text-xs text-rose-200 underline hover:text-white"
                >
                  Retry analysis
                </button>
              </div>
            </div>
          )}

          {/* Render Explanation Content */}
          {data && (
            <div className="space-y-4 text-xs">
              {/* Verdict Banner */}
              <div
                className={`p-3 rounded-xl border flex items-start gap-2.5 ${
                  isCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/30 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/30 text-rose-200'
                }`}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold text-[11px] uppercase tracking-wider block font-mono">
                    {isCorrect ? 'Correct Grammatical Selection' : 'Incorrect Choice Identified'}
                  </span>
                  <p className="mt-0.5 text-zinc-300 leading-relaxed">{data.verdict}</p>
                </div>
              </div>

              {/* Deep Grammatical Reasoning */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-purple-300 block">
                  Grammar &amp; Timeline Breakdown:
                </span>
                <p className="text-zinc-300 leading-relaxed whitespace-pre-line text-xs sm:text-[13px]">
                  {data.grammaticalReasoning}
                </p>
              </div>

              {/* Why User Answer Worked or Failed */}
              <div className="p-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                  {isCorrect ? 'Why your choice is accurate:' : 'Why your chosen answer failed:'}
                </span>
                <p className="text-zinc-200 leading-relaxed">
                  {data.whyUserAnswerWorkedOrFailed}
                </p>
              </div>

              {/* Signal Clues in Sentence */}
              {data.signalClues && data.signalClues.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    Context &amp; Time Clues in the Sentence:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {data.signalClues.map((clue, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-500/20 text-purple-300 text-[11px] font-mono"
                      >
                        <Tag className="w-3 h-3 text-purple-400" />
                        <span>{clue}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Memory Tip */}
              {data.memoryTip && (
                <div className="p-3.5 rounded-xl bg-amber-950/25 border border-amber-500/30 flex items-start gap-2.5 text-amber-200">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-amber-400 block">
                      Memory Rule of Thumb
                    </span>
                    <p className="mt-0.5 text-zinc-300 text-xs leading-relaxed">
                      {data.memoryTip}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
