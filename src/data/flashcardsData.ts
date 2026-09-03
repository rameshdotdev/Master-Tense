import { FlashcardItem } from '../types';

export const FLASHCARDS_DATA: FlashcardItem[] = [
  {
    id: 'fc-1',
    tenseId: 'present-simple',
    tenseName: 'Present Simple',
    category: 'present',
    sentence: 'Water boils at 100 degrees Celsius under normal atmospheric pressure.',
    formula: 'Subject + V1 (-s/-es) + Object',
    usage: 'Universal facts, scientific truths, and laws of nature.',
    explanation: '"boils" is the 3rd person singular present form expressing a permanent physical truth.',
    signalWordUsed: 'under normal pressure'
  },
  {
    id: 'fc-2',
    tenseId: 'present-simple',
    tenseName: 'Present Simple',
    category: 'present',
    sentence: 'My sister always drinks matcha green tea before studying.',
    formula: 'Subject + Frequency Adverb + V1(s/es)',
    usage: 'Habits and regular personal routines.',
    explanation: '"always drinks" pairs the frequency adverb with the singular verb to describe a routine.',
    signalWordUsed: 'always'
  },
  {
    id: 'fc-3',
    tenseId: 'present-continuous',
    tenseName: 'Present Continuous',
    category: 'present',
    sentence: 'Listen carefully! The orchestra is tuning their instruments on stage.',
    formula: 'Subject + am/is/are + V-ing',
    usage: 'Action happening right now at the moment of speaking.',
    explanation: '"Listen!" signals immediate sensory focus on an action happening right now.',
    signalWordUsed: 'Listen!'
  },
  {
    id: 'fc-4',
    tenseId: 'present-continuous',
    tenseName: 'Present Continuous',
    category: 'present',
    sentence: 'He is living with his cousins this month while renovating his flat.',
    formula: 'Subject + is + V-ing',
    usage: 'Temporary ongoing situation.',
    explanation: '"this month" emphasizes that this arrangement is temporary, not his permanent home.',
    signalWordUsed: 'this month'
  },
  {
    id: 'fc-5',
    tenseId: 'present-perfect',
    tenseName: 'Present Perfect',
    category: 'present',
    sentence: 'She has already finished reading all seven Harry Potter books.',
    formula: 'Subject + have/has + V3 (Past Participle)',
    usage: 'Completed action with current relevance / life achievement.',
    explanation: '"already" emphasizes completion earlier than expected with present pride/knowledge.',
    signalWordUsed: 'already'
  },
  {
    id: 'fc-6',
    tenseId: 'present-perfect',
    tenseName: 'Present Perfect',
    category: 'present',
    sentence: 'We have lived in this seaside cottage since 2016.',
    formula: 'Subject + have + V3 + since + starting point',
    usage: 'Action starting in past and continuing to the present.',
    explanation: '"since 2016" marks the past starting year; the residents still live there today.',
    signalWordUsed: 'since'
  },
  {
    id: 'fc-7',
    tenseId: 'present-perfect-continuous',
    tenseName: 'Present Perfect Continuous',
    category: 'present',
    sentence: 'His hands are blistered because he has been chopping firewood for three hours.',
    formula: 'Subject + have/has + been + V-ing',
    usage: 'Recent ongoing physical exertion with visible present evidence.',
    explanation: 'Emphasizes the duration of the labor ("for three hours") explaining his blistered hands.',
    signalWordUsed: 'for three hours'
  },
  {
    id: 'fc-8',
    tenseId: 'past-simple',
    tenseName: 'Past Simple',
    category: 'past',
    sentence: 'Neil Armstrong stepped onto the lunar surface on July 20, 1969.',
    formula: 'Subject + V2 + Object + Past Time Expression',
    usage: 'Completed historical event at a specific, finished calendar moment.',
    explanation: '"stepped" is V2 of regular verb step; the year 1969 is completely finished.',
    signalWordUsed: 'on July 20, 1969'
  },
  {
    id: 'fc-9',
    tenseId: 'past-simple',
    tenseName: 'Past Simple',
    category: 'past',
    sentence: 'Did you remember to send the signed contract yesterday afternoon?',
    formula: 'Did + Subject + V1 (Base Form) + Object?',
    usage: 'Question about a completed past action.',
    explanation: '"Did" acts as past auxiliary, resetting "remember" to its base form V1.',
    signalWordUsed: 'yesterday afternoon'
  },
  {
    id: 'fc-10',
    tenseId: 'past-continuous',
    tenseName: 'Past Continuous',
    category: 'past',
    sentence: 'I was driving across the bridge when a sudden flash of lightning illuminated the sky.',
    formula: 'Subject + was/were + V-ing + when + Subject + V2',
    usage: 'Longer past background action interrupted by a sudden past event.',
    explanation: '"was driving" was in progress; the lightning flash occurred during that window.',
    signalWordUsed: 'when'
  },
  {
    id: 'fc-11',
    tenseId: 'past-perfect',
    tenseName: 'Past Perfect',
    category: 'past',
    sentence: 'When the rescue helicopter arrived, the hikers had already reached shelter.',
    formula: 'Subject + had + V3 + Object',
    usage: 'The "earlier past" action completed before another past event.',
    explanation: 'Reaching shelter happened FIRST; the helicopter\'s arrival happened SECOND.',
    signalWordUsed: 'by the time / when'
  },
  {
    id: 'fc-12',
    tenseId: 'past-perfect-continuous',
    tenseName: 'Past Perfect Continuous',
    category: 'past',
    sentence: 'They had been hiking in the blizzard for six hours before finding the lodge.',
    formula: 'Subject + had + been + V-ing + duration',
    usage: 'Continuous effort in progress leading up to another past landmark.',
    explanation: 'Focuses on the continuous struggle and duration ("for six hours") prior to finding the lodge.',
    signalWordUsed: 'for six hours before'
  },
  {
    id: 'fc-13',
    tenseId: 'future-simple',
    tenseName: 'Future Simple',
    category: 'future',
    sentence: 'Leave the heavy suitcase there; I\'ll carry it upstairs for you.',
    formula: 'Subject + will + V1 (Base Form)',
    usage: 'Spontaneous decision or polite offer made at the moment of speaking.',
    explanation: '"I\'ll carry" is an instant decision without prior planning.',
    signalWordUsed: 'instant offer'
  },
  {
    id: 'fc-14',
    tenseId: 'future-continuous',
    tenseName: 'Future Continuous',
    category: 'future',
    sentence: 'Tomorrow at 10:00 AM, the candidate will be giving her keynote address.',
    formula: 'Subject + will be + V-ing',
    usage: 'Action in full progress at a designated future time.',
    explanation: 'At 10:00 AM, the address will be ongoing, not just starting or finishing.',
    signalWordUsed: 'Tomorrow at 10:00 AM'
  },
  {
    id: 'fc-15',
    tenseId: 'future-perfect',
    tenseName: 'Future Perfect',
    category: 'future',
    sentence: 'By the time the museum opens on Friday, curators will have installed the exhibition.',
    formula: 'Subject + will have + V3',
    usage: 'Action completed before a designated future deadline.',
    explanation: '"By the time..." marks the deadline; "will have installed" will be finished before then.',
    signalWordUsed: 'By the time...'
  },
  {
    id: 'fc-16',
    tenseId: 'future-perfect-continuous',
    tenseName: 'Future Perfect Continuous',
    category: 'future',
    sentence: 'Next month, Dr. Sterling will have been conducting marine research for thirty years.',
    formula: 'Subject + will have been + V-ing + for [duration]',
    usage: 'Measuring ongoing continuous duration up to a future anniversary.',
    explanation: 'Combines the future milestone ("Next month") with the 30-year career duration.',
    signalWordUsed: 'Next month ... for thirty years'
  }
];
