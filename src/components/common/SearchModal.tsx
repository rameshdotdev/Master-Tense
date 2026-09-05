import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, ArrowRight, Lightbulb, AlertTriangle, Key } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TENSES_DATA } from '../../data/tensesData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigate, isDark } = useApp();
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const results: Array<{
      tenseId: string;
      tenseName: string;
      category: string;
      matchType: 'Tense Name' | 'Signal Word' | 'Rule' | 'Mistake' | 'Example' | 'Usage';
      snippet: string;
    }> = [];

    TENSES_DATA.forEach((tense) => {
      // 1. Tense Name / Slug
      if (tense.name.toLowerCase().includes(q) || tense.slug.includes(q)) {
        results.push({
          tenseId: tense.id,
          tenseName: tense.name,
          category: tense.category,
          matchType: 'Tense Name',
          snippet: tense.shortDescription
        });
      }

      // 2. Signal Words
      const matchedSignal = tense.signalWords.find((sw) => sw.toLowerCase().includes(q));
      if (matchedSignal) {
        results.push({
          tenseId: tense.id,
          tenseName: tense.name,
          category: tense.category,
          matchType: 'Signal Word',
          snippet: `Common keyword: "${matchedSignal}" (Signal words: ${tense.signalWords.slice(0, 5).join(', ')}...)`
        });
      }

      // 3. Rules
      tense.rules.forEach((rule) => {
        if (rule.title.toLowerCase().includes(q) || rule.explanation.toLowerCase().includes(q)) {
          results.push({
            tenseId: tense.id,
            tenseName: tense.name,
            category: tense.category,
            matchType: 'Rule',
            snippet: `${rule.title}: ${rule.explanation.slice(0, 110)}...`
          });
        }
      });

      // 4. Common Mistakes
      tense.commonMistakes.forEach((mistake) => {
        if (
          mistake.incorrect.toLowerCase().includes(q) ||
          mistake.correct.toLowerCase().includes(q) ||
          mistake.explanation.toLowerCase().includes(q)
        ) {
          results.push({
            tenseId: tense.id,
            tenseName: tense.name,
            category: tense.category,
            matchType: 'Mistake',
            snippet: `❌ ${mistake.incorrect} ➔ ✅ ${mistake.correct}`
          });
        }
      });

      // 5. Examples
      tense.examples.forEach((ex) => {
        if (ex.sentence.toLowerCase().includes(q)) {
          results.push({
            tenseId: tense.id,
            tenseName: tense.name,
            category: tense.category,
            matchType: 'Example',
            snippet: ex.sentence
          });
        }
      });

      // 6. Usages
      tense.whenToUse.forEach((usage) => {
        if (usage.toLowerCase().includes(q)) {
          results.push({
            tenseId: tense.id,
            tenseName: tense.name,
            category: tense.category,
            matchType: 'Usage',
            snippet: usage
          });
        }
      });
    });

    // Deduplicate by tenseId + matchType
    const unique = new Map<string, typeof results[0]>();
    results.forEach((r) => {
      const key = `${r.tenseId}-${r.matchType}`;
      if (!unique.has(key)) unique.set(key, r);
    });

    return Array.from(unique.values()).slice(0, 12);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelect = (tenseId: string) => {
    setIsSearchOpen(false);
    navigate(`/learn/${tenseId}`);
    setQuery('');
  };

  const getMatchIcon = (type: string) => {
    switch (type) {
      case 'Signal Word':
        return <Key className="w-3.5 h-3.5 text-amber-400" />;
      case 'Mistake':
        return <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />;
      case 'Rule':
        return <Lightbulb className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-teal-400" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-16 px-3 sm:px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl border overflow-hidden flex flex-col max-h-[88vh] transition-colors duration-150 ${
          isDark
            ? 'bg-[#0D0D0D] border-zinc-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div
          className={`relative flex items-center px-4 py-3.5 border-b transition-colors ${
            isDark ? 'border-zinc-800 bg-[#0D0D0D]' : 'border-slate-100 bg-white'
          }`}
        >
          <Search className={`w-5 h-5 mr-3 shrink-0 ${isDark ? 'text-zinc-400' : 'text-slate-400'}`} />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tense names, rules, signal words..."
            className={`w-full bg-transparent focus:outline-none text-base sm:text-sm font-medium ${
              isDark ? 'text-white placeholder-zinc-500' : 'text-slate-900 placeholder-slate-400'
            }`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className={`min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 mr-1 rounded-lg transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className={`min-h-[36px] px-2.5 py-1 text-xs font-mono font-bold rounded-xl transition-colors ${
              isDark
                ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div
            className={`p-3.5 sm:p-4 border-b transition-colors ${
              isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-slate-50 border-slate-100'
            }`}
          >
            <span
              className={`text-[10px] font-mono font-bold uppercase tracking-wider block mb-2 ${
                isDark ? 'text-zinc-500' : 'text-slate-500'
              }`}
            >
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['since', 'already', 'habit', 'yesterday', 'by the time', 'tomorrow', 'continuous', 'third-person'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className={`min-h-[32px] px-3 py-1 text-xs font-mono rounded-xl border transition-all ${
                    isDark
                      ? 'bg-zinc-800/80 text-zinc-300 border-zinc-700 hover:border-emerald-500 hover:text-emerald-400 hover:bg-zinc-800'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 shadow-xs'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div
          className={`overflow-y-auto p-2 sm:p-3 flex-1 divide-y transition-colors ${
            isDark ? 'divide-zinc-800/60' : 'divide-slate-100'
          }`}
        >
          {query && searchResults.length === 0 && (
            <div className={`p-8 text-center ${isDark ? 'text-zinc-400' : 'text-slate-500'}`}>
              <p className={`text-sm font-serif italic ${isDark ? 'text-white' : 'text-slate-900'}`}>
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p className={`text-xs mt-1 font-mono ${isDark ? 'text-zinc-500' : 'text-slate-400'}`}>
                Try searching for keywords like &ldquo;since&rdquo;, &ldquo;routine&rdquo;, &ldquo;past simple&rdquo;, or &ldquo;finished action&rdquo;.
              </p>
            </div>
          )}

          {searchResults.map((res, index) => (
            <div
              key={`${res.tenseId}-${res.matchType}-${index}`}
              onClick={() => handleSelect(res.tenseId)}
              className={`p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-colors flex items-start justify-between gap-3 group ${
                isDark
                  ? 'hover:bg-zinc-800/50 active:bg-zinc-800/80'
                  : 'hover:bg-slate-50 active:bg-slate-100'
              }`}
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`text-sm font-bold transition-colors ${
                      isDark
                        ? 'text-white group-hover:text-emerald-400'
                        : 'text-slate-900 group-hover:text-emerald-600'
                    }`}
                  >
                    {res.tenseName}
                  </span>
                  <span
                    className={`flex items-center gap-1 text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full border ${
                      isDark
                        ? 'bg-zinc-900 text-zinc-300 border-zinc-800'
                        : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}
                  >
                    {getMatchIcon(res.matchType)}
                    {res.matchType}
                  </span>
                  <span
                    className={`text-[10px] font-mono capitalize ${
                      isDark ? 'text-zinc-500' : 'text-slate-400'
                    }`}
                  >
                    • {res.category}
                  </span>
                </div>
                <p
                  className={`text-xs line-clamp-2 leading-relaxed ${
                    isDark ? 'text-zinc-400' : 'text-slate-600'
                  }`}
                >
                  {res.snippet}
                </p>
              </div>

              <div
                className={`p-2 rounded-xl transition-colors shrink-0 ${
                  isDark
                    ? 'text-zinc-500 group-hover:text-emerald-400 group-hover:bg-zinc-800'
                    : 'text-slate-400 group-hover:text-emerald-600 group-hover:bg-slate-100'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div
          className={`p-3 border-t text-[11px] font-mono flex items-center justify-between transition-colors ${
            isDark
              ? 'bg-zinc-900/60 border-zinc-800 text-zinc-500'
              : 'bg-slate-50 border-slate-100 text-slate-500'
          }`}
        >
          <span className="hidden sm:inline">Tip: Press ESC anytime to close search</span>
          <span className="sm:hidden">Tap anywhere outside to close</span>
          <span>{searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}</span>
        </div>
      </div>
    </div>
  );
};
