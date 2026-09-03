import { PracticeQuestion } from '../types';
import { TENSES_DATA } from './tensesData';

// Extract all quick exercises from the 12 tenses
const lessonQuestions: PracticeQuestion[] = TENSES_DATA.flatMap((t) => t.quickExercises);

// Additional standalone questions for Quiz and dedicated Practice section
const additionalQuestions: PracticeQuestion[] = [
  // 1. Rearrange Words
  {
    id: 'pq-rw-1',
    tenseId: 'present-simple',
    category: 'present',
    difficulty: 'Beginner',
    type: 'rearrange-words',
    prompt: 'Rearrange the words to form a correct English sentence:',
    scrambledWords: ['every', 'goes', 'school', 'day', 'She', 'to'],
    correctAnswer: 'She goes to school every day',
    explanation: 'Standard English word order is Subject (She) + Verb with 3rd-person singular -es (goes) + Prepositional phrase (to school) + Time adverbial (every day).',
    tenseRule: 'Subject + V1(s/es) + Object/Adverbial'
  },
  {
    id: 'pq-rw-2',
    tenseId: 'past-simple',
    category: 'past',
    difficulty: 'Beginner',
    type: 'rearrange-words',
    prompt: 'Arrange the words into a correct past tense question:',
    scrambledWords: ['you', 'Did', 'yesterday', 'call', 'doctor', 'the', '?'],
    correctAnswer: 'Did you call the doctor yesterday ?',
    explanation: 'In past questions, auxiliary "Did" starts the question, followed by subject "you" and the base verb "call".',
    tenseRule: 'Did + Subject + V1 + Object?'
  },
  {
    id: 'pq-rw-3',
    tenseId: 'present-continuous',
    category: 'present',
    difficulty: 'Beginner',
    type: 'rearrange-words',
    prompt: 'Arrange into a correct sentence:',
    scrambledWords: ['are', 'They', 'living', 'moment', 'at', 'London', 'in', 'the'],
    correctAnswer: 'They are living in London at the moment',
    explanation: 'Subject (They) + auxiliary (are) + V-ing (living) + in London + time expression (at the moment).',
    tenseRule: 'Subject + are + V-ing + time expression'
  },
  {
    id: 'pq-rw-4',
    tenseId: 'future-simple',
    category: 'future',
    difficulty: 'Beginner',
    type: 'rearrange-words',
    prompt: 'Rearrange to form a polite future promise:',
    scrambledWords: ['email', 'send', 'I', 'will', 'you', 'the', 'soon'],
    correctAnswer: 'I will send you the email soon',
    explanation: 'Subject (I) + will + base verb (send) + indirect object (you) + direct object (the email) + soon.',
    tenseRule: 'Subject + will + V1 + Object'
  },

  // 2. Sentence Correction
  {
    id: 'pq-sc-1',
    tenseId: 'present-simple',
    category: 'present',
    difficulty: 'Beginner',
    type: 'sentence-correction',
    prompt: 'Identify the corrected sentence for: "He don\'t like coffee."',
    options: [
      'He doesn\'t like coffee.',
      'He doesn\'t likes coffee.',
      'He don\'t likes coffee.',
      'He not like coffee.'
    ],
    correctAnswer: 'He doesn\'t like coffee.',
    explanation: '"He" is 3rd-person singular, so use "doesn\'t", followed by the base form "like" without -s.',
    tenseRule: 'He/She/It + doesn\'t + V1'
  },
  {
    id: 'pq-sc-2',
    tenseId: 'past-simple',
    category: 'past',
    difficulty: 'Beginner',
    type: 'sentence-correction',
    prompt: 'Correct this sentence: "We didn\'t went to the beach because of rain."',
    options: [
      'We didn\'t go to the beach because of rain.',
      'We didn\'t gone to the beach because of rain.',
      'We haven\'t went to the beach because of rain.',
      'We didn\'t goes to the beach because of rain.'
    ],
    correctAnswer: 'We didn\'t go to the beach because of rain.',
    explanation: 'Auxiliary "didn\'t" requires the base form of the verb "go", never the past form "went".',
    tenseRule: 'didn\'t + V1 (base form)'
  },
  {
    id: 'pq-sc-3',
    tenseId: 'present-perfect',
    category: 'present',
    difficulty: 'Intermediate',
    type: 'sentence-correction',
    prompt: 'Correct this sentence: "I have seen that magnificent movie three weeks ago."',
    options: [
      'I saw that magnificent movie three weeks ago.',
      'I have saw that magnificent movie three weeks ago.',
      'I am seen that magnificent movie three weeks ago.',
      'I was seen that magnificent movie three weeks ago.'
    ],
    correctAnswer: 'I saw that magnificent movie three weeks ago.',
    explanation: '"Three weeks ago" is a finished, specific past time marker. It requires Past Simple ("saw"), never Present Perfect.',
    tenseRule: 'Finished time expressions (ago, yesterday) demand Past Simple'
  },
  {
    id: 'pq-sc-4',
    tenseId: 'future-perfect',
    category: 'future',
    difficulty: 'Advanced',
    type: 'sentence-correction',
    prompt: 'Correct this error: "By 2030, our company will has launched five satellites."',
    options: [
      'By 2030, our company will have launched five satellites.',
      'By 2030, our company will launched five satellites.',
      'By 2030, our company will be launched five satellites.',
      'By 2030, our company has will launched five satellites.'
    ],
    correctAnswer: 'By 2030, our company will have launched five satellites.',
    explanation: 'Modal verb "will" is always followed by bare auxiliary "have", never "has".',
    tenseRule: 'Subject + will have + V3'
  },

  // 3. Identify the Tense
  {
    id: 'pq-it-1',
    tenseId: 'past-continuous',
    category: 'past',
    difficulty: 'Intermediate',
    type: 'identify-tense',
    prompt: 'What tense is used in this sentence? "At midnight, snowflakes were falling softly outside the window."',
    options: ['Past Continuous', 'Past Simple', 'Past Perfect', 'Present Continuous'],
    correctAnswer: 'Past Continuous',
    explanation: '"were falling" consists of were (past of to be) + V-ing, denoting continuous action in progress in the past.',
    tenseRule: 'was/were + V-ing = Past Continuous'
  },
  {
    id: 'pq-it-2',
    tenseId: 'present-perfect-continuous',
    category: 'present',
    difficulty: 'Intermediate',
    type: 'identify-tense',
    prompt: 'What tense is used here? "How long have you been learning to play the violin?"',
    options: ['Present Perfect Continuous', 'Present Continuous', 'Present Perfect', 'Past Continuous'],
    correctAnswer: 'Present Perfect Continuous',
    explanation: '"have you been learning" combines have + been + V-ing, which is Present Perfect Continuous.',
    tenseRule: 'Have/has + been + V-ing'
  },
  {
    id: 'pq-it-3',
    tenseId: 'future-continuous',
    category: 'future',
    difficulty: 'Intermediate',
    type: 'identify-tense',
    prompt: 'Identify the tense: "This time next month, we will be relaxing in the Swiss Alps."',
    options: ['Future Continuous', 'Future Simple', 'Present Continuous', 'Future Perfect'],
    correctAnswer: 'Future Continuous',
    explanation: '"will be relaxing" consists of will + be + V-ing, showing future action in progress.',
    tenseRule: 'Will be + V-ing'
  },
  {
    id: 'pq-it-4',
    tenseId: 'past-perfect',
    category: 'past',
    difficulty: 'Advanced',
    type: 'identify-tense',
    prompt: 'What tense is: "The passenger realized he had boarded the wrong train"?',
    options: ['Past Perfect', 'Past Simple', 'Present Perfect', 'Past Continuous'],
    correctAnswer: 'Past Perfect',
    explanation: '"had boarded" (had + V3) describes an action that occurred prior to the realization in the past.',
    tenseRule: 'Had + V3 = Past Perfect'
  },

  // 4. Fill in the Blank
  {
    id: 'pq-fb-1',
    tenseId: 'present-simple',
    category: 'present',
    difficulty: 'Beginner',
    type: 'fill-in-blank',
    prompt: 'She _____ to school every day by bus.',
    options: ['go', 'goes', 'going', 'gone'],
    correctAnswer: 'goes',
    explanation: '"She" is 3rd-person singular, so the verb "go" takes -es: "goes".',
    tenseRule: 'He/She/It + V1(-s/-es)'
  },
  {
    id: 'pq-fb-2',
    tenseId: 'present-perfect',
    category: 'present',
    difficulty: 'Intermediate',
    type: 'fill-in-blank',
    prompt: 'I haven\'t received your email _____. Could you please re-send it?',
    options: ['yet', 'already', 'since', 'just'],
    correctAnswer: 'yet',
    explanation: 'In negative Present Perfect sentences meaning "up to the present moment", we use "yet" at the end.',
    tenseRule: 'Negatives with Present Perfect take "yet"'
  },
  {
    id: 'pq-fb-3',
    tenseId: 'past-simple',
    category: 'past',
    difficulty: 'Beginner',
    type: 'fill-in-blank',
    prompt: 'Yesterday, Emily _____ an interesting antique clock at the flea market.',
    options: ['bought', 'buy', 'buys', 'was bought'],
    correctAnswer: 'bought',
    explanation: '"Yesterday" requires Past Simple. The past tense of irregular verb "buy" is "bought".',
    tenseRule: 'Past Simple irregular: buy -> bought'
  },
  {
    id: 'pq-fb-4',
    tenseId: 'future-perfect',
    category: 'future',
    difficulty: 'Advanced',
    type: 'fill-in-blank',
    prompt: 'By the end of this semester, the students _____ their research projects.',
    options: ['will have completed', 'will complete', 'will has completed', 'have completed'],
    correctAnswer: 'will have completed',
    explanation: '"By the end of this semester" indicates a future deadline, requiring Future Perfect ("will have completed").',
    tenseRule: 'By + future deadline -> will have + V3'
  },

  // 5. Multiple Choice (Which sentence is correct?)
  {
    id: 'pq-mc-1',
    tenseId: 'present-continuous',
    category: 'present',
    difficulty: 'Beginner',
    type: 'multiple-choice',
    prompt: 'Which sentence is grammatically correct?',
    options: [
      'The chef is tasting the soup to see if it needs salt.',
      'The chef is taste the soup to see if it needs salt.',
      'The chef taste the soup right now.',
      'The chef is tasted the soup right now.'
    ],
    correctAnswer: 'The chef is tasting the soup to see if it needs salt.',
    explanation: 'When "taste" is an active physical action (tasting with a spoon right now), it takes the continuous form "is tasting".',
    tenseRule: 'Action verbs in progress: is + V-ing'
  },
  {
    id: 'pq-mc-2',
    tenseId: 'past-continuous',
    category: 'past',
    difficulty: 'Intermediate',
    type: 'multiple-choice',
    prompt: 'Which sentence correctly combines a continuous background with an interrupting event?',
    options: [
      'I was cooking dinner when the power suddenly went out.',
      'I cooked dinner while the power was suddenly going out.',
      'I was cooking dinner when the power was going out.',
      'I cooked dinner when the power went out suddenly and slowly.'
    ],
    correctAnswer: 'I was cooking dinner when the power suddenly went out.',
    explanation: 'Past Continuous ("was cooking") for the ongoing activity; Past Simple ("went out") for the sudden interruption.',
    tenseRule: 'Past Continuous (was cooking) + when + Past Simple (went out)'
  },
  {
    id: 'pq-mc-3',
    tenseId: 'future-simple',
    category: 'future',
    difficulty: 'Beginner',
    type: 'multiple-choice',
    prompt: 'Which sentence demonstrates a spontaneous decision made at the moment of speaking?',
    options: [
      'It\'s freezing cold in here. I\'ll close the window.',
      'It\'s freezing cold in here. I close the window every day.',
      'It\'s freezing cold in here. I am closing the window next week.',
      'It\'s freezing cold in here. I closed the window yesterday.'
    ],
    correctAnswer: 'It\'s freezing cold in here. I\'ll close the window.',
    explanation: '"I\'ll close the window" shows an instant spontaneous decision using Future Simple "will".',
    tenseRule: 'Spontaneous decision uses "will + V1"'
  },

  // 6. Translation / Situation Practice
  {
    id: 'pq-tr-1',
    tenseId: 'present-perfect',
    category: 'present',
    difficulty: 'Intermediate',
    type: 'translation',
    prompt: 'Express this meaning in English: "I have lived in this city since 2018 (and I still live here today)."',
    options: [
      'I have lived in this city since 2018.',
      'I lived in this city since 2018.',
      'I am living in this city from 2018.',
      'I live in this city since 2018.'
    ],
    correctAnswer: 'I have lived in this city since 2018.',
    explanation: 'An action starting in the past and continuing into the present with a specific starting point requires Present Perfect + "since": "have lived ... since 2018".',
    tenseRule: 'Present Perfect + since + starting year'
  },
  {
    id: 'pq-tr-2',
    tenseId: 'past-simple',
    category: 'past',
    difficulty: 'Beginner',
    type: 'translation',
    prompt: 'Express this past experience: "We visited our grandparents last Sunday."',
    options: [
      'We visited our grandparents last Sunday.',
      'We have visited our grandparents last Sunday.',
      'We are visiting our grandparents last Sunday.',
      'We visit our grandparents last Sunday.'
    ],
    correctAnswer: 'We visited our grandparents last Sunday.',
    explanation: 'Finished past time ("last Sunday") requires Past Simple ("visited"). Never use Present Perfect with "last Sunday".',
    tenseRule: 'Past Simple with finished past time indicator'
  },
  {
    id: 'pq-tr-3',
    tenseId: 'future-continuous',
    category: 'future',
    difficulty: 'Intermediate',
    type: 'translation',
    prompt: 'Express this future plan in progress: "Tomorrow at 4 PM, I will be flying to Paris."',
    options: [
      'Tomorrow at 4 PM, I will be flying to Paris.',
      'Tomorrow at 4 PM, I will fly to Paris already.',
      'Tomorrow at 4 PM, I flew to Paris.',
      'Tomorrow at 4 PM, I have been flying to Paris.'
    ],
    correctAnswer: 'Tomorrow at 4 PM, I will be flying to Paris.',
    explanation: 'An action actively unfolding at a specific future hour (Tomorrow at 4 PM) requires Future Continuous: "will be flying".',
    tenseRule: 'Future Continuous for action in progress at a specific future time'
  }
];

export const ALL_PRACTICE_QUESTIONS: PracticeQuestion[] = [
  ...lessonQuestions,
  ...additionalQuestions
];
