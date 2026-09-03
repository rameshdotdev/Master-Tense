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
        return <Key className="w-3.5 h-3.5 text-amber-500" />;
      case 'Mistake':
        return <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />;
      case 'Rule':
        return <Lightbulb className="w-3.5 h-3.5 text-indigo-500" />;
      default:
        return <BookOpen className="w-3.5 h-3.5 text-blue-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="relative flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tense names, rules, signal words (e.g. 'since', 'already', 'habit')..."
            className="w-full bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none text-sm font-medium"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2 py-1 text-xs font-semibold rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['since', 'already', 'habit', 'yesterday', 'by the time', 'tomorrow', 'continuous', 'third-person'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-2.5 py-1 text-xs rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="overflow-y-auto p-2 flex-1 divide-y divide-slate-100 dark:divide-slate-800/60">
          {query && searchResults.length === 0 && (
            <div className="p-8 text-center text-slate-500 dark:text-slate-400">
              <p className="text-sm font-semibold">No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-slate-400 mt-1">
                Try searching for keywords like &ldquo;since&rdquo;, &ldquo;routine&rdquo;, &ldquo;past simple&rdquo;, or &ldquo;finished action&rdquo;.
              </p>
            </div>
          )}

          {searchResults.map((res, index) => (
            <div
              key={`${res.tenseId}-${res.matchType}-${index}`}
              onClick={() => handleSelect(res.tenseId)}
              className="p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/80 cursor-pointer transition-colors flex items-start justify-between gap-3 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {res.tenseName}
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {getMatchIcon(res.matchType)}
                    {res.matchType}
                  </span>
                  <span className="text-[10px] font-medium capitalize text-slate-400">
                    • {res.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {res.snippet}
                </p>
              </div>

              <div className="p-2 rounded-lg text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/40 transition-colors shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Tip: Press ESC anytime to close search</span>
          <span>{searchResults.length} {searchResults.length === 1 ? 'match' : 'matches'} found</span>
        </div>
      </div>
    </div>
  );
};
