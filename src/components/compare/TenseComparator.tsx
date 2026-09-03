import React, { useState } from 'react';
import { TENSES_DATA } from '../../data/tensesData';
import { TimelineVisualizer } from '../common/TimelineVisualizer';
import { InteractiveExercise } from '../practice/InteractiveExercise';
import { GitCompare, Sparkles, CheckCircle2, ArrowRight, Lightbulb, AlertTriangle } from 'lucide-react';
import { PracticeQuestion } from '../../types';

interface ComparisonPreset {
  id: string;
  title: string;
  tenseAId: string;
  tenseBId: string;
  coreDifference: string;
  exampleA: { sentence: string; explanation: string };
  exampleB: { sentence: string; explanation: string };
  confusionPoint: string;
  practiceQuestion: PracticeQuestion;
}

const COMPARISON_PRESETS: ComparisonPreset[] = [
  {
    id: 'present-simple-vs-continuous',
    title: 'Present Simple vs Present Continuous',
    tenseAId: 'present-simple',
    tenseBId: 'present-continuous',
    coreDifference:
      'Present Simple is for habits, facts, and permanent routines. Present Continuous is for temporary actions happening right now around the current moment.',
    exampleA: {
      sentence: 'I live in London and I drink coffee every morning.',
      explanation: 'Permanent residence and recurring daily routine.'
    },
    exampleB: {
      sentence: 'I am living with my brother this week and I am drinking tea right now.',
      explanation: 'Temporary arrangement and action in progress right at this second.'
    },
    confusionPoint:
      'Watch out for stative verbs like "know", "like", "want". We say "I know him", NOT "I am knowing him".',
    practiceQuestion: {
      id: 'comp-q1',
      tenseId: 'present-simple',
      category: 'present',
      type: 'multiple-choice',
      difficulty: 'Beginner',
      prompt: 'Look outside! It _____ right now.',
      options: ['rains', 'is raining', 'has rained', 'rained'],
      correctAnswer: 'is raining',
      explanation:
        'The phrase "Look outside!" and "right now" indicate an action happening at the exact moment of speech, requiring Present Continuous.',
      tenseRule: 'Actions occurring right now use Subject + am/is/are + verb-ing.'
    }
  },
  {
    id: 'past-simple-vs-present-perfect',
    title: 'Past Simple vs Present Perfect',
    tenseAId: 'past-simple',
    tenseBId: 'present-perfect',
    coreDifference:
      'Past Simple refers to a completely finished time period (yesterday, in 2020). Present Perfect connects the past to the present with no specific past time mentioned, or an unfinished time frame (today, this week).',
    exampleA: {
      sentence: 'I lost my keys yesterday, but I found them an hour later.',
      explanation: 'Finished past time (yesterday). The situation is over.'
    },
    exampleB: {
      sentence: 'I have lost my keys! Can you help me look for them?',
      explanation: 'Unspecified time, and the present result is active: I still do not have my keys right now!'
    },
    confusionPoint:
      'NEVER use specific past time words (yesterday, last night, two days ago) with Present Perfect. Say "I saw him yesterday", not "I have seen him yesterday".',
    practiceQuestion: {
      id: 'comp-q2',
      tenseId: 'present-perfect',
      category: 'present',
      type: 'fill-in-blank',
      difficulty: 'Intermediate',
      prompt: 'I _____ to Italy three times in my life.',
      options: ['went', 'have been', 'was going', 'had gone'],
      correctAnswer: 'have been',
      explanation:
        'Talking about life experience without stating a specific date uses Present Perfect.',
      tenseRule: 'Life experiences up to the present moment require Present Perfect.'
    }
  },
  {
    id: 'past-simple-vs-past-continuous',
    title: 'Past Simple vs Past Continuous',
    tenseAId: 'past-simple',
    tenseBId: 'past-continuous',
    coreDifference:
      'Past Continuous sets the ongoing background scene. Past Simple represents the sudden, short action that interrupted it.',
    exampleA: {
      sentence: 'The doorbell rang suddenly.',
      explanation: 'Short, completed interruption in the past.'
    },
    exampleB: {
      sentence: 'I was taking a shower when the doorbell rang.',
      explanation: 'Long ongoing action that was already in progress.'
    },
    confusionPoint:
      'Use "while" or "as" with the Past Continuous (While I was cooking...), and "when" with the Past Simple (when the phone rang).',
    practiceQuestion: {
      id: 'comp-q3',
      tenseId: 'past-continuous',
      category: 'past',
      type: 'multiple-choice',
      difficulty: 'Intermediate',
      prompt: 'While she was reading a novel, the lights suddenly _____ out.',
      options: ['went', 'were going', 'have gone', 'had been going'],
      correctAnswer: 'went',
      explanation:
        'The ongoing action is reading (Past Continuous). The sudden interrupting event is lights going out (Past Simple).',
      tenseRule: 'Short interrupting events in the past take Past Simple (V2).'
    }
  },
  {
    id: 'future-simple-vs-continuous',
    title: 'Future Simple vs Future Continuous',
    tenseAId: 'future-simple',
    tenseBId: 'future-continuous',
    coreDifference:
      'Future Simple states a spontaneous decision or prediction. Future Continuous highlights that an action will already be in progress at a specific moment in the future.',
    exampleA: {
      sentence: 'I will call you tonight at 8 PM.',
      explanation: 'Action starting at that time.'
    },
    exampleB: {
      sentence: 'At 8 PM tonight, I will be having dinner with my parents.',
      explanation: 'Action that started before 8 PM and is actively ongoing at 8 PM.'
    },
    confusionPoint:
      'Future Continuous emphasizes ongoing activity at a specific future anchor ("Tomorrow at this time, I will be flying to Tokyo").',
    practiceQuestion: {
      id: 'comp-q4',
      tenseId: 'future-continuous',
      category: 'future',
      type: 'fill-in-blank',
      difficulty: 'Intermediate',
      prompt: 'Don\'t call between 2 and 4 PM because we _____ an exam.',
      options: ['will take', 'will be taking', 'take', 'took'],
      correctAnswer: 'will be taking',
      explanation:
        'The exam will be actively in progress during the whole time window between 2 and 4 PM.',
      tenseRule: 'Actions in progress at a specific future time use will be + verb-ing.'
    }
  },
  {
    id: 'present-perfect-vs-continuous',
    title: 'Present Perfect vs Present Perfect Continuous',
    tenseAId: 'present-perfect',
    tenseBId: 'present-perfect-continuous',
    coreDifference:
      'Present Perfect focuses on the finished result or quantity ("How many books have you written?"). Present Perfect Continuous focuses on the ongoing duration and physical effort ("How long have you been writing?").',
    exampleA: {
      sentence: 'I have painted three rooms today.',
      explanation: 'Focus is on the finished achievement and quantity.'
    },
    exampleB: {
      sentence: 'My clothes are covered in paint because I have been painting all morning.',
      explanation: 'Focus is on the continuous physical activity and visible side-effect.'
    },
    confusionPoint:
      'Never use Present Perfect Continuous with stative verbs. Say "I have known him for years", NOT "I have been knowing him".',
    practiceQuestion: {
      id: 'comp-q5',
      tenseId: 'present-perfect-continuous',
      category: 'present',
      type: 'multiple-choice',
      difficulty: 'Intermediate',
      prompt: 'He is sweating because he _____ for two hours.',
      options: ['runs', 'has run', 'has been running', 'was running'],
      correctAnswer: 'has been running',
      explanation:
        'The physical visible symptom (sweating) resulted from a continuous ongoing process that just finished or is still continuing.',
      tenseRule: 'Subject + have/has been + verb-ing emphasizes ongoing physical activity.'
    }
  }
];

export const TenseComparator: React.FC = () => {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(COMPARISON_PRESETS[0].id);

  const activePreset =
    COMPARISON_PRESETS.find((p) => p.id === selectedPresetId) || COMPARISON_PRESETS[0];

  const tenseA = TENSES_DATA.find((t) => t.id === activePreset.tenseAId);
  const tenseB = TENSES_DATA.find((t) => t.id === activePreset.tenseBId);

  if (!tenseA || !tenseB) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">
            Side-by-Side Analysis
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight">
          Tense Comparison Tool
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl">
          Dispel confusion between closely related tenses with contrastive examples, side-by-side timelines, and diagnostic practice.
        </p>
      </div>

      {/* Preset Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {COMPARISON_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => setSelectedPresetId(preset.id)}
            className={`px-3.5 py-2 rounded-xl text-xs whitespace-nowrap transition-all border ${
              selectedPresetId === preset.id
                ? 'bg-emerald-500 text-black font-bold uppercase tracking-wider border-emerald-500 shadow-md'
                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:bg-zinc-800 font-mono'
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Core Difference Callout Banner */}
      <div className="p-5 rounded-3xl bg-[#0D0D0D] border border-zinc-800 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-[10px] uppercase font-mono tracking-widest">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Core Distinguishing Factor</span>
        </div>
        <p className="text-xs sm:text-sm text-zinc-300 font-normal leading-relaxed">
          {activePreset.coreDifference}
        </p>
      </div>

      {/* Side-by-Side Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TENSE A COLUMN */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400">
                Option A
              </span>
              <h2 className="text-xl font-serif italic text-white">
                {tenseA.name}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
              {tenseA.difficulty}
            </span>
          </div>

          {/* Formula */}
          <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Formula (+)</span>
            <code className="text-xs font-mono font-bold text-emerald-400 block">
              {tenseA.formula.affirmative}
            </code>
          </div>

          {/* Contrastive Example */}
          <div className="p-4 rounded-2xl bg-[#121212] border border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
              Contrastive Example:
            </span>
            <p className="text-xs sm:text-sm font-serif italic text-white">
              &ldquo;{activePreset.exampleA.sentence}&rdquo;
            </p>
            <p className="text-xs text-zinc-400 italic">
              Meaning: {activePreset.exampleA.explanation}
            </p>
          </div>

          {/* Signal Words */}
          <div>
            <span className="text-[11px] font-mono font-bold text-zinc-500 block mb-1.5">
              Associated Signal Words:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tenseA.signalWords.slice(0, 6).map((sw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-mono"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>

          {/* Mini Timeline */}
          <TimelineVisualizer timeline={tenseA.timeline} tenseName={tenseA.name} />
        </div>

        {/* TENSE B COLUMN */}
        <div className="bg-[#0D0D0D] rounded-3xl border border-zinc-800 p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-teal-400">
                Option B
              </span>
              <h2 className="text-xl font-serif italic text-white">
                {tenseB.name}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300">
              {tenseB.difficulty}
            </span>
          </div>

          {/* Formula */}
          <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-xl space-y-1">
            <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase">Formula (+)</span>
            <code className="text-xs font-mono font-bold text-teal-400 block">
              {tenseB.formula.affirmative}
            </code>
          </div>

          {/* Contrastive Example */}
          <div className="p-4 rounded-2xl bg-[#121212] border border-zinc-800 space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-400">
              Contrastive Example:
            </span>
            <p className="text-xs sm:text-sm font-serif italic text-white">
              &ldquo;{activePreset.exampleB.sentence}&rdquo;
            </p>
            <p className="text-xs text-zinc-400 italic">
              Meaning: {activePreset.exampleB.explanation}
            </p>
          </div>

          {/* Signal Words */}
          <div>
            <span className="text-[11px] font-mono font-bold text-zinc-500 block mb-1.5">
              Associated Signal Words:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {tenseB.signalWords.slice(0, 6).map((sw, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300 text-[11px] font-mono"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>

          {/* Mini Timeline */}
          <TimelineVisualizer timeline={tenseB.timeline} tenseName={tenseB.name} />
        </div>
      </div>

      {/* Confusion Warning Point */}
      <div className="p-5 rounded-2xl bg-zinc-900/80 border border-amber-500/40 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-300 block">
            The #1 Trappy Confusion Point:
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed">
            {activePreset.confusionPoint}
          </p>
        </div>
      </div>

      {/* Diagnostic Interactive Exercise */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <h3 className="text-base font-serif italic text-white">
            Diagnostic Test: Test Yourself On This Contrast
          </h3>
        </div>
        <InteractiveExercise question={activePreset.practiceQuestion} showNextButton={false} />
      </div>
    </div>
  );
};
