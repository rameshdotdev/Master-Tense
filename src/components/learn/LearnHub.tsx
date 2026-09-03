import React, { useState } from 'react';
import { TenseCard } from './TenseCard';
import {
  TENSES_DATA,
  PRESENT_TENSES,
  PAST_TENSES,
  FUTURE_TENSES
} from '../../data/tensesData';
import { useApp } from '../../context/AppContext';
import { BookOpen, CheckCircle, Sparkles, Filter, Search } from 'lucide-react';
import { TenseCategory } from '../../types';

export const LearnHub: React.FC = () => {
  const { stats } = useApp();
  const [activeTab, setActiveTab] = useState<'all' | TenseCategory>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredTenses = TENSES_DATA.filter((tense) => {
    if (activeTab !== 'all' && tense.category !== activeTab) return false;
    if (filterDifficulty !== 'all' && tense.difficulty !== filterDifficulty) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        tense.name.toLowerCase().includes(q) ||
        tense.shortDescription.toLowerCase().includes(q) ||
        tense.signalWords.some((sw) => sw.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">
              Grammar Curriculum
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
            Learn All 12 English Tenses
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
            Structured explanations, formulas, timeline anchors, and instant 5-question practice sets for every tense in the English language.
          </p>
        </div>

        {/* Mastered Counter */}
        <div className="flex items-center gap-3 bg-[#0D0D0D] p-3 rounded-2xl border border-zinc-800 shadow-sm shrink-0">
          <div className="w-10 h-10 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-extrabold font-mono text-base">
            {stats.completedLessons.length}
          </div>
          <div>
            <span className="text-xs font-serif italic text-zinc-200 block">
              Lessons Mastered
            </span>
            <span className="text-[11px] font-mono text-zinc-500">
              {stats.completedLessons.length} of 12 completed (
              {Math.round((stats.completedLessons.length / 12) * 100)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0D0D0D] p-3 rounded-2xl border border-zinc-800 shadow-sm">
        {/* Category Tabs: All | Present | Past | Future */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {[
            { id: 'all', label: 'All 12 Tenses', count: 12 },
            { id: 'present', label: 'Present Tenses', count: 4 },
            { id: 'past', label: 'Past Tenses', count: 4 },
            { id: 'future', label: 'Future Tenses', count: 4 }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'all' | TenseCategory)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-black uppercase tracking-wider shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 font-mono'
              }`}
            >
              {tab.label}
              <span
                className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  activeTab === tab.id
                    ? 'bg-black/20 text-black'
                    : 'bg-zinc-800 text-zinc-400'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search & Difficulty Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {/* Difficulty Dropdown */}
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="text-xs font-mono font-medium px-2.5 py-1.5 rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 focus:outline-none focus:border-zinc-700"
          >
            <option value="all">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>

          {/* Inline Filter Input */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Filter tenses..."
              className="pl-8 pr-3 py-1.5 text-xs rounded-xl bg-zinc-900 text-zinc-300 border border-zinc-800 focus:outline-none focus:border-zinc-700 w-36 sm:w-44 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Grid of Cards */}
      {filteredTenses.length === 0 ? (
        <div className="p-12 text-center bg-[#0D0D0D] rounded-2xl border border-zinc-800">
          <p className="text-sm font-semibold text-zinc-400">
            No tenses match your current filters.
          </p>
          <button
            onClick={() => {
              setActiveTab('all');
              setFilterDifficulty('all');
              setSearchFilter('');
            }}
            className="mt-3 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTenses.map((tense) => (
            <TenseCard key={tense.id} tense={tense} />
          ))}
        </div>
      )}
    </div>
  );
};
