import React, { useState, useMemo } from 'react';
import { Search, X, BookOpen, ArrowRight, Lightbulb, AlertTriangle, Key } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { TENSES_DATA } from '../../data/tensesData';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigate } = useApp();
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
        className="w-full max-w-2xl bg-[#0D0D0D] rounded-3xl shadow-2xl border border-zinc-800 overflow-hidden flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tense names, rules, signal words..."
            className="w-full bg-transparent text-white placeholder-zinc-500 focus:outline-none text-base sm:text-sm font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="min-h-[36px] min-w-[36px] flex items-center justify-center p-1.5 text-zinc-400 hover:text-white mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="min-h-[36px] px-2.5 py-1 text-xs font-mono font-bold rounded-xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-3.5 sm:p-4 bg-zinc-900/50 border-b border-zinc-800">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['since', 'already', 'habit', 'yesterday', 'by the time', 'tomorrow', 'continuous', 'third-person'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="min-h-[32px] px-3 py-1 text-xs font-mono rounded-xl bg-zinc-800/80 text-zinc-300 border border-zinc-700 hover:border-emerald-500 hover:text-emerald-400 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="overflow-y-auto p-2 sm:p-3 flex-1 divide-y divide-zinc-800/60">
          {query && searchResults.length === 0 && (
            <div className="p-8 text-center text-zinc-400">
              <p className="text-sm font-serif italic text-white">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-zinc-500 mt-1 font-mono">
                Try searching for keywords like &ldquo;since&rdquo;, &ldquo;routine&rdquo;, &ldquo;past simple&rdquo;, or &ldquo;finished action&rdquo;.
              </p>
            </div>
          )}

          {searchResults.map((res, index) => (
            <div
              key={`${res.tenseId}-${res.matchType}-${index}`}
              onClick={() => handleSelect(res.tenseId)}
              className="p-3 sm:p-3.5 rounded-2xl hover:bg-zinc-800/50 active:bg-zinc-800/80 cursor-pointer transition-colors flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {res.tenseName}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-mono font-semibold uppercase px-2 py-0.5 rounded-full bg-zinc-900 text-zinc-300 border border-zinc-800">
                    {getMatchIcon(res.matchType)}
                    {res.matchType}
                  </span>
                  <span className="text-[10px] font-mono capitalize text-zinc-500">
                    • {res.category}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {res.snippet}
                </p>
              </div>

              <div className="p-2 rounded-xl text-zinc-500 group-hover:text-emerald-400 group-hover:bg-zinc-800 transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-zinc-900/60 border-t border-zinc-800 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
          <span className="hidden sm:inline">Tip: Press ESC anytime to close search</span>
          <span className="sm:hidden">Tap anywhere outside to close</span>
          <span>{searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'}</span>
        </div>
      </div>
    </div>
  );
};
