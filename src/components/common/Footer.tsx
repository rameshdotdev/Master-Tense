import React from 'react';
import { BookOpen, Award, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  return (
    <footer className="w-full bg-[#0D0D0D] text-zinc-400 border-t border-zinc-800 text-xs py-10 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2 text-white font-extrabold text-base">
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-black shadow-sm">
                <BookOpen className="w-4 h-4 text-black stroke-[2.5]" />
              </div>
              <span className="font-serif italic text-lg text-white">Tenses<span className="text-emerald-500">Master</span></span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed">
              An interactive grammar platform crafted to help learners understand, practice, and master all 12 English tenses through real usage, formula breakdowns, and interactive feedback.
            </p>
          </div>

          {/* Present Tenses */}
          <div>
            <h5 className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-3">
              Present Tenses
            </h5>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => navigate('/learn/present-simple')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Present Simple
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn/present-continuous')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Present Continuous
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn/present-perfect')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Present Perfect
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn/present-perfect-continuous')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Present Perfect Continuous
                </button>
              </li>
            </ul>
          </div>

          {/* Past Tenses */}
          <div>
            <h5 className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-3">
              Past Tenses
            </h5>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => navigate('/learn/past-simple')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Past Simple
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn/past-continuous')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Past Continuous
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn/past-perfect')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Past Perfect
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/learn/past-perfect-continuous')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Past Perfect Continuous
                </button>
              </li>
            </ul>
          </div>

          {/* Future Tenses & Tools */}
          <div>
            <h5 className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-3">
              Future & Tools
            </h5>
            <ul className="space-y-1.5">
              <li>
                <button
                  onClick={() => navigate('/learn/future-simple')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Future Simple
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/cheatsheet')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Master 12 Tenses Cheat Sheet
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/compare')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Tense Comparison Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/flashcards')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Flashcard Learning Mode
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/quiz')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Comprehensive Quizzes
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <p>© {new Date().getFullYear()} TensesMaster. Designed for English learners worldwide.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> 100% Free Educational Platform
            </span>
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-amber-500" /> 12 Full Tense Modules
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
