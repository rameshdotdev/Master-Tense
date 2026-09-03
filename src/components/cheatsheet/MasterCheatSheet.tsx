import React, { useState } from 'react';
import { TENSES_DATA } from '../../data/tensesData';
import { useApp } from '../../context/AppContext';
import { Table, Search, Printer, ArrowRight, BookOpen, Download } from 'lucide-react';
import { TenseCategory } from '../../types';

export const MasterCheatSheet: React.FC = () => {
  const { navigate } = useApp();
  const [activeCategory, setActiveCategory] = useState<'all' | TenseCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTenses = TENSES_DATA.filter((tense) => {
    if (activeCategory !== 'all' && tense.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        tense.name.toLowerCase().includes(q) ||
        tense.formula.affirmative.toLowerCase().includes(q) ||
        tense.signalWords.some((w) => w.toLowerCase().includes(q)) ||
        tense.whenToUse.some((u) => u.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">
              Quick Reference
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
            Master 12 Tenses Cheat Sheet
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            A comprehensive side-by-side reference of all 12 English tenses, formulas, signal words, and usage rules.
          </p>
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 text-xs font-mono font-bold transition-all shadow-sm"
        >
          <Printer className="w-4 h-4 text-emerald-400" />
          <span>Print / Save as PDF</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0D0D0D] p-3 rounded-2xl border border-zinc-800 shadow-sm print:hidden">
        {/* Category Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All 12 Tenses' },
            { id: 'present', label: 'Present' },
            { id: 'past', label: 'Past' },
            { id: 'future', label: 'Future' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                activeCategory === cat.id
                  ? 'bg-emerald-500 text-black border-emerald-500 uppercase tracking-wider shadow-sm'
                  : 'text-zinc-400 border-transparent hover:bg-zinc-800 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rules, formulas, keywords..."
            className="w-full pl-8 pr-3 py-1.5 text-xs font-mono rounded-xl bg-zinc-900 text-zinc-200 placeholder-zinc-500 border border-zinc-800 focus:outline-none focus:border-zinc-700"
          />
        </div>
      </div>

      {/* Master Table Container */}
      <div className="bg-[#0D0D0D] rounded-2xl border border-zinc-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-zinc-800">
            <thead className="bg-[#121212] font-mono font-bold uppercase tracking-wider text-[10px] text-zinc-400">
              <tr>
                <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                  Tense &amp; Category
                </th>
                <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                  Formula (+) &amp; (-)
                </th>
                <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                  Core Example
                </th>
                <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                  Key Signal Words
                </th>
                <th scope="col" className="px-4 py-3.5 whitespace-nowrap">
                  When to Use
                </th>
                <th scope="col" className="px-4 py-3.5 text-right print:hidden">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/80 text-zinc-300">
              {filteredTenses.map((tense) => (
                <tr
                  key={tense.id}
                  className="hover:bg-zinc-900/40 transition-colors"
                >
                  {/* Tense Name & Category */}
                  <td className="px-4 py-4 align-top whitespace-nowrap">
                    <div className="font-serif italic text-white text-base">
                      {tense.name}
                    </div>
                    <span className="text-[10px] uppercase font-mono font-semibold text-emerald-400">
                      {tense.category} • {tense.difficulty}
                    </span>
                  </td>

                  {/* Formula (+) & (-) */}
                  <td className="px-4 py-4 align-top max-w-xs font-mono">
                    <div className="text-emerald-400 font-semibold mb-1">
                      (+) {tense.formula.affirmative}
                    </div>
                    <div className="text-rose-400 text-[11px]">
                      (-) {tense.formula.negative}
                    </div>
                  </td>

                  {/* Core Example */}
                  <td className="px-4 py-4 align-top max-w-xs">
                    <p className="font-serif italic text-zinc-200">
                      &ldquo;{tense.examples[0]?.sentence || ''}&rdquo;
                    </p>
                    <span className="text-[11px] font-mono text-zinc-500 block mt-1">
                      Form: {tense.examples[0]?.highlight}
                    </span>
                  </td>

                  {/* Key Signal Words */}
                  <td className="px-4 py-4 align-top max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {tense.signalWords.slice(0, 4).map((sw, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-mono"
                        >
                          {sw}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* When to Use */}
                  <td className="px-4 py-4 align-top max-w-xs">
                    <p className="text-zinc-400 line-clamp-2">
                      {tense.whenToUse[0]}
                    </p>
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4 align-top text-right whitespace-nowrap print:hidden">
                    <button
                      onClick={() => navigate(`/learn/${tense.id}`)}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 hover:text-emerald-300"
                    >
                      <span>Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
