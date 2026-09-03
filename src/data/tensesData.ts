import { TenseData } from '../types';

export const TENSES_DATA: TenseData[] = [
  // ==========================================
  // 1. PRESENT SIMPLE
  // ==========================================
  {
    id: 'present-simple',
    slug: 'present-simple',
    name: 'Present Simple',
    category: 'present',
    difficulty: 'Beginner',
    shortDescription: 'Used for habits, daily routines, universal facts, and permanent truths.',
    beginnerExplanation: 'Think of Present Simple as your regular schedule or permanent reality. It describes things you do again and again (like brushing teeth), facts that never change (the sun rises), or general states (I live in London), not what is happening this very second.',
    whenToUse: [
      'Habits and regular routines (e.g., I drink coffee every morning)',
      'Universal truths and scientific facts (e.g., Water boils at 100°C)',
      'Permanent situations and states (e.g., She lives in Madrid)',
      'Official timetables and scheduled itineraries (e.g., The train departs at 6:00 PM)',
      'Giving instructions or directions (e.g., Walk two blocks and turn left)'
    ],
    whenNotToUse: [
      'Actions happening right at this very exact moment (use Present Continuous instead: "I am eating lunch right now", NOT "I eat lunch right now").',
      'Temporary ongoing projects that will end soon.'
    ],
    formula: {
      affirmative: 'Subject + V1 (Base Form / -s / -es) + Object',
      negative: 'Subject + do / does + not + V1 (Base Form) + Object',
      question: 'Do / Does + Subject + V1 (Base Form) + Object?',
      notes: 'Use "does/doesn\'t" for 3rd person singular (He, She, It, singular nouns). For I, You, We, They, use "do/don\'t" with the bare verb.'
    },
    signalWords: [
      'always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day', 'every week', 'on Mondays', 'once a month', 'generally', 'hardly ever'
    ],
    rules: [
      {
        title: 'Third-Person Singular Rule',
        explanation: 'When the subject is He, She, It, or a singular noun, add -s or -es to the base verb in positive sentences.',
        examples: [
          'He plays tennis twice a week.',
          'She watches documentary films on weekends.',
          'The store opens at 9:00 AM.'
        ]
      },
      {
        title: 'Auxiliary "Do/Does" Resets the Verb',
        explanation: 'In negative sentences and questions, the auxiliary "does" carries the 3rd-person marker, so the main verb stays in its bare base form without -s.',
        examples: [
          'She does not (doesn\'t) like iced tea. (NOT: doesn\'t likes)',
          'Does he work at the hospital? (NOT: Does he works?)'
        ]
      }
    ],
    spellingRules: [
      {
        title: 'Verbs ending in -ch, -sh, -s, -x, -z, or -o',
        explanation: 'Add -es instead of just -s.',
        examples: ['watch -> watches', 'wash -> washes', 'pass -> passes', 'box -> boxes', 'go -> goes', 'do -> does']
      },
      {
        title: 'Consonant + -y',
        explanation: 'Change -y to -ies.',
        examples: ['study -> studies', 'fly -> flies', 'try -> tries', 'cry -> cries']
      },
      {
        title: 'Vowel + -y',
        explanation: 'Just add -s.',
        examples: ['play -> plays', 'enjoy -> enjoys', 'stay -> stays']
      }
    ],
    examples: [
      {
        sentence: 'She drinks green tea every morning before work.',
        highlight: 'drinks green tea every morning',
        meaning: 'A recurring daily routine.'
      },
      {
        sentence: 'Light travels faster than sound in a vacuum.',
        highlight: 'travels faster',
        meaning: 'A timeless scientific law.'
      },
      {
        sentence: 'They do not own a car because they prefer cycling.',
        highlight: 'do not own',
        meaning: 'A permanent lifestyle situation.'
      },
      {
        sentence: 'Does your flight leave from Terminal 3 tomorrow morning?',
        highlight: 'Does your flight leave',
        meaning: 'A fixed official timetable.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'He go to school every day by bicycle.',
        correct: 'He goes to school every day by bicycle.',
        explanation: 'For 3rd person singular (He/She/It), the verb requires the -es suffix: "goes".'
      },
      {
        incorrect: 'She doesn\'t likes hot weather.',
        correct: 'She doesn\'t like hot weather.',
        explanation: 'After "does/doesn\'t", always use the base form of the verb without -s.'
      },
      {
        incorrect: 'I am coming from Germany. (to express origin)',
        correct: 'I come from Germany.',
        explanation: 'Your origin is a permanent fact, so use Present Simple.'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Marcus',
        lineA: 'What time do you usually wake up during weekdays?',
        speakerB: 'Aria',
        lineB: 'I wake up at 6:30 AM, drink coffee, and read the news.',
        context: 'Discussing morning habits at the office.'
      }
    ],
    timeline: {
      timePosition: 'present-regular',
      description: 'Repeated across past, present, and future as an ongoing regularity or truth.',
      visualAnchor: 'Recurring cycles across time'
    },
    tips: [
      'Frequency adverbs (always, usually, often) usually go BEFORE the main verb: "She often arrives early."',
      'With the verb "to be", frequency adverbs go AFTER: "He is always polite."'
    ],
    speakingPrompt: {
      prompt: 'Describe your weekend morning routine in 3 complete sentences using Present Simple.',
      modelAnswer: 'On Saturday mornings, I usually sleep until 8:00 AM. Then, I prepare a warm breakfast and take my dog for a walk in the park.',
      tips: 'Ensure all 3rd person or 1st person subjects have proper subject-verb agreement!'
    },
    quickExercises: [
      {
        id: 'ps-q1',
        tenseId: 'present-simple',
        category: 'present',
        difficulty: 'Beginner',
        type: 'fill-in-blank',
        prompt: 'Sophia _____ to the gym three times every week.',
        options: ['go', 'goes', 'going', 'is go'],
        correctAnswer: 'goes',
        explanation: 'Because Sophia is 3rd-person singular (she), the verb "go" takes the "-es" suffix: "goes".',
        tenseRule: 'He/She/It + verb + s/es'
      },
      {
        id: 'ps-q2',
        tenseId: 'present-simple',
        category: 'present',
        difficulty: 'Beginner',
        type: 'sentence-correction',
        prompt: 'Fix the error in this sentence: "David don\'t drink coffee in the afternoon."',
        options: [
          'David doesn\'t drink coffee in the afternoon.',
          'David don\'t drinks coffee in the afternoon.',
          'David isn\'t drink coffee in the afternoon.',
          'David not drink coffee in the afternoon.'
        ],
        correctAnswer: 'David doesn\'t drink coffee in the afternoon.',
        explanation: 'David is singular (he), so we must use "doesn\'t", not "don\'t". The verb "drink" remains base form.',
        tenseRule: 'Subject (singular) + does not + V1'
      },
      {
        id: 'ps-q3',
        tenseId: 'present-simple',
        category: 'present',
        difficulty: 'Beginner',
        type: 'rearrange-words',
        prompt: 'Arrange the words to form a correct Present Simple sentence:',
        scrambledWords: ['always', 'She', 'her', 'keys', 'forgets', 'home', 'at'],
        correctAnswer: 'She always forgets her keys at home',
        explanation: 'Frequency adverb "always" sits between the subject "She" and the singular verb "forgets".',
        tenseRule: 'Subject + Frequency Adverb + V1(s/es) + Object'
      },
      {
        id: 'ps-q4',
        tenseId: 'present-simple',
        category: 'present',
        difficulty: 'Beginner',
        type: 'identify-tense',
        prompt: 'Identify the tense: "The Earth revolves around the Sun."',
        options: ['Present Simple', 'Present Continuous', 'Present Perfect', 'Past Simple'],
        correctAnswer: 'Present Simple',
        explanation: 'This states a universal scientific fact with a base verb + s ("revolves"), which is the Present Simple tense.',
        tenseRule: 'General truths and scientific facts use Present Simple'
      },
      {
        id: 'ps-q5',
        tenseId: 'present-simple',
        category: 'present',
        difficulty: 'Beginner',
        type: 'multiple-choice',
        prompt: 'Which of the following questions is grammatically correct?',
        options: [
          'Where does your brother lives?',
          'Where does your brother live?',
          'Where your brother lives?',
          'Where do your brother live?'
        ],
        correctAnswer: 'Where does your brother live?',
        explanation: 'With singular subject "your brother", use auxiliary "does" and base verb "live" without -s.',
        tenseRule: 'Wh- word + does + Subject + V1 (base form)?'
      }
    ]
  },

  // ==========================================
  // 2. PRESENT CONTINUOUS
  // ==========================================
  {
    id: 'present-continuous',
    slug: 'present-continuous',
    name: 'Present Continuous',
    category: 'present',
    difficulty: 'Beginner',
    shortDescription: 'Used for actions happening right now, temporary trends, or fixed future arrangements.',
    beginnerExplanation: 'Think of Present Continuous as a video camera currently rolling. If you look out your window and see someone walking their dog at this exact instant, that\'s Present Continuous: "They are walking." It also describes things you are doing "these days" (temporary situations) or confirmed plans for tonight.',
    whenToUse: [
      'Actions happening right now, at the moment of speaking (e.g., I am writing an email)',
      'Temporary situations happening around now (e.g., I am staying at a hotel this week)',
      'Changing or developing situations/trends (e.g., The climate is getting warmer)',
      'Definite planned personal arrangements for the near future (e.g., We are meeting Sarah at 7 tonight)',
      'Repeated actions that cause annoyance, with "always" (e.g., He is always losing his keys!)'
    ],
    whenNotToUse: [
      'Do NOT use with stative verbs (verbs of thinking, feeling, senses, and possession like know, believe, love, hate, want, need, belong). Say "I need help", NOT "I am needing help".'
    ],
    formula: {
      affirmative: 'Subject + am / is / are + V-ing (Present Participle) + Object',
      negative: 'Subject + am / is / are + not + V-ing + Object',
      question: 'Am / Is / Are + Subject + V-ing + Object?',
      notes: 'I -> am; He/She/It -> is; You/We/They -> are. The main verb always carries the "-ing" ending.'
    },
    signalWords: [
      'now', 'right now', 'at the moment', 'currently', 'these days', 'at present', 'Look!', 'Listen!', 'tonight', 'this week'
    ],
    rules: [
      {
        title: 'Stative Verbs Exception',
        explanation: 'Verbs describing states, feelings, or mental processes are rarely used in continuous tenses.',
        examples: [
          'Correct: "I understand the concept." (Incorrect: "I am understanding...")',
          'Correct: "She wants a cup of tea." (Incorrect: "She is wanting...")'
        ]
      },
      {
        title: 'Spelling Rules for -ing',
        explanation: '1. Verbs ending in silent -e: drop the -e (write -> writing, make -> making). 2. Short one-syllable verbs ending in consonant-vowel-consonant (CVC): double the final consonant (run -> running, sit -> sitting, swim -> swimming). 3. Verbs ending in -ie: change -ie to -y (lie -> lying, die -> dying).',
        examples: ['make -> making', 'run -> running', 'tie -> tying']
      }
    ],
    examples: [
      {
        sentence: 'Look! The children are playing in the garden.',
        highlight: 'are playing',
        meaning: 'Happening right now in front of our eyes.'
      },
      {
        sentence: 'She is learning Python programming this semester.',
        highlight: 'is learning',
        meaning: 'A temporary ongoing activity around the present time.'
      },
      {
        sentence: 'We are flying to Tokyo next Tuesday morning.',
        highlight: 'are flying',
        meaning: 'A definite confirmed future arrangement.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I am knowing the answer to this question.',
        correct: 'I know the answer to this question.',
        explanation: '"Know" is a stative verb representing mental state, so it cannot be used in continuous forms.'
      },
      {
        incorrect: 'She is study in the library right now.',
        correct: 'She is studying in the library right now.',
        explanation: 'Present Continuous requires both the auxiliary "is" AND the -ing suffix on the verb: "studying".'
      },
      {
        incorrect: 'They playing football outside.',
        correct: 'They are playing football outside.',
        explanation: 'Do not omit the auxiliary verb "are".'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Liam',
        lineA: 'Hey, can you talk right now or are you busy?',
        speakerB: 'Emma',
        lineB: 'I\'m cooking dinner at the moment. Can I call you back in 15 minutes?',
        context: 'A quick phone call during evening chores.'
      }
    ],
    timeline: {
      timePosition: 'present-now',
      description: 'An action in progress right at the center of the NOW line, or active in the current temporary window.',
      visualAnchor: 'Active continuous wave across NOW'
    },
    tips: [
      'If you see exclamation cues like "Look!" or "Listen!", it is almost always followed by Present Continuous because it draws attention to something happening right now.'
    ],
    speakingPrompt: {
      prompt: 'Look around the room or imagine your desk right now. Say two things that are currently happening.',
      modelAnswer: 'My laptop fan is spinning softly, and a cool breeze is blowing through the open window.',
      tips: 'Use "am/is/are + verb-ing".'
    },
    quickExercises: [
      {
        id: 'pc-q1',
        tenseId: 'present-continuous',
        category: 'present',
        difficulty: 'Beginner',
        type: 'fill-in-blank',
        prompt: 'Listen! Someone _____ on our front door.',
        options: ['knocks', 'is knocking', 'are knocking', 'knocked'],
        correctAnswer: 'is knocking',
        explanation: '"Listen!" signals an action occurring right at this moment. "Someone" is singular, so we use "is knocking".',
        tenseRule: 'Singular subject + is + V-ing'
      },
      {
        id: 'pc-q2',
        tenseId: 'present-continuous',
        category: 'present',
        difficulty: 'Beginner',
        type: 'sentence-correction',
        prompt: 'Find the correct sentence: "I am having two brothers and a sister."',
        options: [
          'I have two brothers and a sister.',
          'I am have two brothers and a sister.',
          'I am having had two brothers.',
          'I has two brothers and a sister.'
        ],
        correctAnswer: 'I have two brothers and a sister.',
        explanation: 'When "have" means possession or family relationship, it is a stative verb and cannot be continuous.',
        tenseRule: 'Stative verbs do not use continuous form'
      },
      {
        id: 'pc-q3',
        tenseId: 'present-continuous',
        category: 'present',
        difficulty: 'Beginner',
        type: 'rearrange-words',
        prompt: 'Assemble the words into a correct Present Continuous question:',
        scrambledWords: ['working', 'Why', 'you', 'are', 'tonight', 'late'],
        correctAnswer: 'Why are you working late tonight',
        explanation: 'Question structure: Wh- word (Why) + auxiliary (are) + subject (you) + verb-ing (working) + rest.',
        tenseRule: 'Wh- + be + Subject + V-ing?'
      },
      {
        id: 'pc-q4',
        tenseId: 'present-continuous',
        category: 'present',
        difficulty: 'Beginner',
        type: 'multiple-choice',
        prompt: 'Which spelling of the continuous verb form is correct?',
        options: ['makeing', 'runing', 'beginning', 'studing'],
        correctAnswer: 'beginning',
        explanation: '"begin" has stress on the second syllable ending in consonant-vowel-consonant, so "n" is doubled: "beginning". "making", "running", "studying" are the correct forms of the others.',
        tenseRule: 'CVC syllable stress doubling rule'
      },
      {
        id: 'pc-q5',
        tenseId: 'present-continuous',
        category: 'present',
        difficulty: 'Beginner',
        type: 'identify-tense',
        prompt: 'Identify the tense: "The company is expanding its operations in Asia this year."',
        options: ['Present Continuous', 'Present Simple', 'Future Simple', 'Past Continuous'],
        correctAnswer: 'Present Continuous',
        explanation: '"is expanding" uses is + verb-ing to describe an ongoing trend/development this year.',
        tenseRule: 'Subject + is/are + V-ing for ongoing trends'
      }
    ]
  },

  // ==========================================
  // 3. PRESENT PERFECT
  // ==========================================
  {
    id: 'present-perfect',
    slug: 'present-perfect',
    name: 'Present Perfect',
    category: 'present',
    difficulty: 'Intermediate',
    shortDescription: 'Connects the past with the present: past actions with current results, life experiences, or unfinished time.',
    beginnerExplanation: 'Think of Present Perfect as a bridge between the past and right now. The action happened earlier, but the result or importance is felt RIGHT NOW. For example: "I have lost my key" means I lost it in the past, and I STILL don\'t have it now. Or "I have visited France" means in my life up to today, that experience is inside me.',
    whenToUse: [
      'Life experiences without mentioning a specific time (e.g., Have you ever seen a shooting star?)',
      'Past actions with visible or significant results in the present (e.g., She has broken her arm - so it is in a cast now)',
      'Unfinished time periods like today, this week, this year (e.g., I have had three cups of coffee today)',
      'Actions that started in the past and continue into the present, with "since" and "for" (e.g., I have lived here for 5 years)'
    ],
    whenNotToUse: [
      'NEVER use Present Perfect with specific finished past time expressions like "yesterday", "in 2015", "three days ago", or "when I was a child". For specific finished times, you MUST use Past Simple!'
    ],
    formula: {
      affirmative: 'Subject + have / has + V3 (Past Participle) + Object',
      negative: 'Subject + have / has + not + V3 (Past Participle) + Object',
      question: 'Have / Has + Subject + V3 (Past Participle) + Object?',
      notes: 'Has / Hasn\'t for He/She/It. Have / Haven\'t for I/You/We/They. V3 is the past participle (e.g., go -> went -> gone; see -> saw -> seen; work -> worked -> worked).'
    },
    signalWords: [
      'already', 'yet', 'just', 'ever', 'never', 'since', 'for', 'recently', 'lately', 'so far', 'up to now'
    ],
    rules: [
      {
        title: 'Since vs. For',
        explanation: '"Since" marks the specific starting point in time (since 2010, since 8 AM, since Monday). "For" marks the duration or amount of time (for 10 years, for 3 hours, for two weeks).',
        examples: [
          'She has worked here since January. (Starting point)',
          'She has worked here for 8 months. (Duration)'
        ]
      },
      {
        title: 'Already, Just, and Yet',
        explanation: '"Already" and "just" go between have/has and V3 in positive sentences. "Yet" goes at the very end of negative sentences and questions.',
        examples: [
          'I have already eaten lunch.',
          'They have just arrived.',
          'Has the mail carrier come yet?',
          'No, the mail hasn\'t arrived yet.'
        ]
      }
    ],
    examples: [
      {
        sentence: 'I have lost my passport, so I cannot board the airplane.',
        highlight: 'have lost',
        meaning: 'Happened in the past, but the crisis/result is right now.'
      },
      {
        sentence: 'He has lived in Canada since he was seven years old.',
        highlight: 'has lived ... since',
        meaning: 'Started in childhood, still living there today.'
      },
      {
        sentence: 'Have you ever traveled to South America?',
        highlight: 'Have you ever traveled',
        meaning: 'In your whole lifetime up until this second.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I have seen that movie yesterday.',
        correct: 'I saw that movie yesterday.',
        explanation: 'Because "yesterday" is a finished, specific time in the past, you must use Past Simple ("saw"), not Present Perfect.'
      },
      {
        incorrect: 'She has already finished her work yet.',
        correct: 'She has already finished her work.',
        explanation: 'Do not combine "already" and "yet". "Already" is for positive statements; "yet" is for negatives and questions.'
      },
      {
        incorrect: 'I know him for five years.',
        correct: 'I have known him for five years.',
        explanation: 'An ongoing state connecting past to present requires Present Perfect with "for", not Present Simple.'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Oliver',
        lineA: 'Would you like some pizza? We just ordered two pies.',
        speakerB: 'Maya',
        lineB: 'Thanks, but I have already eaten dinner!',
        context: 'Declining food offer politely.'
      }
    ],
    timeline: {
      timePosition: 'past-to-present',
      description: 'An action rooted in the past whose impact or bridge extends directly to NOW.',
      visualAnchor: 'Bridge linking Past into NOW'
    },
    tips: [
      '"Been to" vs "Gone to": "She has been to Paris" means she visited and came back. "She has gone to Paris" means she is still in Paris right now!'
    ],
    speakingPrompt: {
      prompt: 'Mention two interesting things you have done in your life, and one thing you haven\'t done yet.',
      modelAnswer: 'I have scuba dived in coral reefs, and I have run a half-marathon. However, I haven\'t visited Japan yet.',
      tips: 'Use "have + past participle (V3)".'
    },
    quickExercises: [
      {
        id: 'pp-q1',
        tenseId: 'present-perfect',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'fill-in-blank',
        prompt: 'Lucas _____ his glasses, so he cannot read the menu.',
        options: ['has lost', 'have lost', 'lost yesterday', 'is losing'],
        correctAnswer: 'has lost',
        explanation: 'Lucas is singular ("has"). The action happened recently and has an active present result (he can\'t read now).',
        tenseRule: 'Subject (singular) + has + V3'
      },
      {
        id: 'pp-q2',
        tenseId: 'present-perfect',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'multiple-choice',
        prompt: 'Choose the correct word: "We have lived in this apartment _____ three years."',
        options: ['since', 'for', 'during', 'from'],
        correctAnswer: 'for',
        explanation: '"Three years" is a duration/period of time, so we use "for". "Since" is only for a specific starting point (e.g., since 2021).',
        tenseRule: 'Use "for" with periods of time, "since" with starting points'
      },
      {
        id: 'pp-q3',
        tenseId: 'present-perfect',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'sentence-correction',
        prompt: 'Correct this sentence: "Did you finished your homework yet?"',
        options: [
          'Have you finished your homework yet?',
          'Do you finished your homework yet?',
          'Are you finished your homework yet?',
          'Did you finish your homework yet already?'
        ],
        correctAnswer: 'Have you finished your homework yet?',
        explanation: '"Yet" in questions calls for Present Perfect: "Have you + V3 ... yet?".',
        tenseRule: 'Have/Has + Subject + V3 + yet?'
      },
      {
        id: 'pp-q4',
        tenseId: 'present-perfect',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'rearrange-words',
        prompt: 'Rearrange into a correct Present Perfect sentence:',
        scrambledWords: ['never', 'eaten', 'I', 'have', 'sushi', 'raw', 'before'],
        correctAnswer: 'I have never eaten raw sushi before',
        explanation: 'Word order: Subject (I) + have + adverb (never) + V3 (eaten) + object (raw sushi) + before.',
        tenseRule: 'Subject + have/has + never + V3'
      },
      {
        id: 'pp-q5',
        tenseId: 'present-perfect',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'identify-tense',
        prompt: 'What tense is used here? "Scientists have discovered water ice under the Martian surface."',
        options: ['Present Perfect', 'Past Simple', 'Past Perfect', 'Present Continuous'],
        correctAnswer: 'Present Perfect',
        explanation: 'It uses "have discovered" (have + V3) to announce breaking scientific news of present relevance.',
        tenseRule: 'Have/Has + Past Participle (V3)'
      }
    ]
  },

  // ==========================================
  // 4. PRESENT PERFECT CONTINUOUS
  // ==========================================
  {
    id: 'present-perfect-continuous',
    slug: 'present-perfect-continuous',
    name: 'Present Perfect Continuous',
    category: 'present',
    difficulty: 'Intermediate',
    shortDescription: 'Emphasizes the duration of an ongoing action that started in the past and is still happening or just stopped with visible evidence.',
    beginnerExplanation: 'Think of this as answering the question: "What have you been sweating over?!" It emphasizes the DURATION or PROCESS rather than just the final finished result. If you see wet pavement, you say: "It has been raining." If your eyes are tired: "I have been staring at screens all day."',
    whenToUse: [
      'Actions that started in the past and continue into the present, emphasizing the duration (e.g., She has been studying for five hours)',
      'Actions that recently stopped and have clear physical evidence right now (e.g., You\'re out of breath! Have you been running?)',
      'Temporary ongoing habits (e.g., I\'ve been going to sleep very late recently)'
    ],
    whenNotToUse: [
      'Do not use to state the completed number of items produced (Say "I have written 4 essays", NOT "I have been writing 4 essays").',
      'Do not use with stative verbs (Say "I have known him", NOT "I have been knowing him").'
    ],
    formula: {
      affirmative: 'Subject + have / has + been + V-ing + Object',
      negative: 'Subject + have / has + not + been + V-ing + Object',
      question: 'Have / Has + Subject + been + V-ing + Object?',
      notes: 'Subject + have/has + been + verb-ing. Emphasizes how long or the ongoing activity.'
    },
    signalWords: [
      'for', 'since', 'all day', 'all week', 'lately', 'recently', 'How long...?', 'these days'
    ],
    rules: [
      {
        title: 'Present Perfect vs. Present Perfect Continuous',
        explanation: 'Present Perfect focuses on the RESULT / COMPLETION ("I have painted the wall - look, it is green!"). Present Perfect Continuous focuses on the ACTIVITY / DURATION ("I have been painting the wall - that is why my hands have paint on them!").',
        examples: [
          'Result: He has read 50 pages of the book.',
          'Activity: He has been reading the book all afternoon.'
        ]
      }
    ],
    examples: [
      {
        sentence: 'It has been raining steadily since early morning.',
        highlight: 'has been raining',
        meaning: 'Began hours ago and drops are still falling right now.'
      },
      {
        sentence: 'Her eyes are red because she has been chopping onions.',
        highlight: 'has been chopping',
        meaning: 'The activity just ended and the physical effect is visible.'
      },
      {
        sentence: 'How long have you been waiting here for the bus?',
        highlight: 'have you been waiting',
        meaning: 'Asking about the ongoing duration.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I have been knowing Sarah for ten years.',
        correct: 'I have known Sarah for ten years.',
        explanation: '"Know" is stative and cannot take continuous form even when measuring duration.'
      },
      {
        incorrect: 'She has been writing three emails this morning.',
        correct: 'She has written three emails this morning.',
        explanation: 'When counting completed items ("three emails"), use Present Perfect simple, not continuous.'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Chef Gordon',
        lineA: 'Why is the kitchen counters covered in flour?',
        speakerB: 'Sous Chef Mia',
        lineB: 'I have been baking sourdough loaves all morning!',
        context: 'Explaining a messy workstation.'
      }
    ],
    timeline: {
      timePosition: 'past-to-present',
      description: 'A continuous energetic wave originating in the past that stretches continuously right into NOW.',
      visualAnchor: 'Wavy progress band from past touching NOW'
    },
    tips: [
      'Questions starting with "How long have you been...?" are almost always Present Perfect Continuous when asking about ongoing hobbies, jobs, or residence.'
    ],
    speakingPrompt: {
      prompt: 'Answer this question: "What have you been learning or practicing recently?"',
      modelAnswer: 'I have been practicing conversational English every evening for the past month.',
      tips: 'Use "have been + verb-ing".'
    },
    quickExercises: [
      {
        id: 'ppc-q1',
        tenseId: 'present-perfect-continuous',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'fill-in-blank',
        prompt: 'They are exhausted because they _____ football for two hours.',
        options: ['have been playing', 'has been playing', 'are played', 'had played'],
        correctAnswer: 'have been playing',
        explanation: '"They" takes "have been playing" to explain why they are currently exhausted (ongoing recent effort).',
        tenseRule: 'Subject (plural) + have + been + V-ing'
      },
      {
        id: 'ppc-q2',
        tenseId: 'present-perfect-continuous',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'multiple-choice',
        prompt: 'Which sentence correctly emphasizes how long someone has been reading?',
        options: [
          'She has read since 2 PM.',
          'She has been reading since 2 PM.',
          'She is reading since 2 PM.',
          'She was reading since 2 PM.'
        ],
        correctAnswer: 'She has been reading since 2 PM.',
        explanation: 'To express continuous action from a past starting point with "since", use Present Perfect Continuous.',
        tenseRule: 'Subject + has been + V-ing + since + time'
      },
      {
        id: 'ppc-q3',
        tenseId: 'present-perfect-continuous',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'identify-tense',
        prompt: 'What tense is: "We have been living in this neighborhood for a decade"?',
        options: ['Present Perfect Continuous', 'Present Perfect', 'Past Continuous', 'Past Perfect Continuous'],
        correctAnswer: 'Present Perfect Continuous',
        explanation: '"have been living" combines have + been + V-ing for an ongoing duration.',
        tenseRule: 'Have/has + been + V-ing'
      },
      {
        id: 'ppc-q4',
        tenseId: 'present-perfect-continuous',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'sentence-correction',
        prompt: 'Fix the error: "How long are you waiting here for me?"',
        options: [
          'How long have you been waiting here for me?',
          'How long do you wait here for me?',
          'How long were you wait here for me?',
          'How long have you wait here for me?'
        ],
        correctAnswer: 'How long have you been waiting here for me?',
        explanation: 'When asking about the ongoing duration of an action still happening, use "How long have you been + V-ing?".',
        tenseRule: 'How long + have/has + Subject + been + V-ing?'
      },
      {
        id: 'ppc-q5',
        tenseId: 'present-perfect-continuous',
        category: 'present',
        difficulty: 'Intermediate',
        type: 'rearrange-words',
        prompt: 'Reorder the words to make a correct sentence:',
        scrambledWords: ['all', 'day', 'He', 'has', 'studying', 'been', 'for', 'his', 'exams'],
        correctAnswer: 'He has been studying for his exams all day',
        explanation: 'Subject (He) + has been + V-ing (studying) + object (for his exams) + duration (all day).',
        tenseRule: 'Subject + has been + V-ing + duration'
      }
    ]
  },

  // ==========================================
  // 5. PAST SIMPLE
  // ==========================================
  {
    id: 'past-simple',
    slug: 'past-simple',
    name: 'Past Simple',
    category: 'past',
    difficulty: 'Beginner',
    shortDescription: 'Used for completed actions that happened at a specific, finished time in the past.',
    beginnerExplanation: 'Think of Past Simple as a stamp on a calendar in the past. The door is closed, the time is over, and the action is 100% finished. Whether it was yesterday, last year, or 1000 years ago: "Julius Caesar invaded Britain in 55 BC", "I ate pancakes this morning."',
    whenToUse: [
      'Actions completed in the past at a specific stated or implied time (e.g., I bought a new car yesterday)',
      'A series of consecutive completed past actions in a story (e.g., He entered the room, took off his coat, and sat down)',
      'Past habits or states that are no longer true (e.g., When I was a teenager, I practiced the guitar every day)'
    ],
    whenNotToUse: [
      'Do not use when the time period is still ongoing and connected to now (e.g., "this week", "today" if still current, or "since").'
    ],
    formula: {
      affirmative: 'Subject + V2 (Past Form) + Object',
      negative: 'Subject + did not (didn\'t) + V1 (Base Form) + Object',
      question: 'Did + Subject + V1 (Base Form) + Object?',
      notes: 'Regular verbs add -ed (play -> played). Irregular verbs change completely (go -> went, buy -> bought). In negatives and questions, "did" takes the past form, so the main verb resets to V1.'
    },
    signalWords: [
      'yesterday', 'last night', 'last week', 'last year', 'ago (two days ago)', 'in 1999', 'when I was young', 'the other day', 'in July'
    ],
    rules: [
      {
        title: 'Regular vs. Irregular Verbs',
        explanation: 'Regular verbs add -ed (watched, worked, cleaned). Irregular verbs do not follow rules and must be memorized (eat -> ate, write -> wrote, see -> saw, drink -> drank).',
        examples: [
          'Regular: They visited the museum yesterday.',
          'Irregular: We saw a great movie last night.'
        ]
      },
      {
        title: 'Did / Didn\'t Resets the Verb to V1',
        explanation: 'Just like "does" in present simple, "did" carries the past marker. Never double the past tense!',
        examples: [
          'Correct: She didn\'t go to school. (NOT: didn\'t went)',
          'Correct: Did you see that? (NOT: Did you saw that?)'
        ]
      }
    ],
    spellingRules: [
      {
        title: 'Regular Verb -ed Rules',
        explanation: '1. Ending in -e: just add -d (like -> liked). 2. Consonant + y: change -y to -ied (study -> studied). 3. Vowel + y: keep -y and add -ed (play -> played). 4. One-syllable CVC: double the final consonant (stop -> stopped, plan -> planned).',
        examples: ['stop -> stopped', 'study -> studied', 'live -> lived']
      }
    ],
    examples: [
      {
        sentence: 'Marco graduated from university two years ago.',
        highlight: 'graduated ... two years ago',
        meaning: 'Completed action at a finished time.'
      },
      {
        sentence: 'She didn\'t understand the instructions until the teacher explained them.',
        highlight: 'didn\'t understand ... explained',
        meaning: 'Negative past with V1, followed by positive past with V2.'
      },
      {
        sentence: 'Did you lock the front door before leaving the house?',
        highlight: 'Did you lock',
        meaning: 'Question about a completed past action.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I didn\'t knew about the meeting.',
        correct: 'I didn\'t know about the meeting.',
        explanation: 'After "didn\'t", the verb must revert to its base form: "know".'
      },
      {
        incorrect: 'Did you saw him yesterday?',
        correct: 'Did you see him yesterday?',
        explanation: '"Did" already indicates the past, so use base verb "see".'
      },
      {
        incorrect: 'He comed to my party last Saturday.',
        correct: 'He came to my party last Saturday.',
        explanation: '"Come" is irregular; its past simple form is "came", not "comed".'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Lucas',
        lineA: 'Where did you buy that vintage jacket?',
        speakerB: 'Elena',
        lineB: 'I found it at a small thrift store in Berlin last autumn!',
        context: 'Admiring a colleague\'s clothing.'
      }
    ],
    timeline: {
      timePosition: 'past-completed',
      description: 'A solid, closed milestone on the past axis, entirely severed from the NOW point.',
      visualAnchor: 'Closed point in the past'
    },
    tips: [
      'Whenever you see the word "ago" (e.g., 5 minutes ago, 10 years ago), it ALWAYS demands Past Simple.'
    ],
    speakingPrompt: {
      prompt: 'Describe three things you did yesterday from morning to evening.',
      modelAnswer: 'Yesterday, I woke up at 7 AM, cooked an omelet, and worked on my design project until 5 PM.',
      tips: 'Use V2 forms: woke, cooked, worked.'
    },
    quickExercises: [
      {
        id: 'ps-past-q1',
        tenseId: 'past-simple',
        category: 'past',
        difficulty: 'Beginner',
        type: 'fill-in-blank',
        prompt: 'We _____ to a wonderful Italian restaurant last night.',
        options: ['went', 'goed', 'go', 'have gone'],
        correctAnswer: 'went',
        explanation: '"Last night" indicates finished past time. The past tense of irregular verb "go" is "went".',
        tenseRule: 'Irregular verb V2 for finished past'
      },
      {
        id: 'ps-past-q2',
        tenseId: 'past-simple',
        category: 'past',
        difficulty: 'Beginner',
        type: 'sentence-correction',
        prompt: 'Identify the corrected sentence: "Why did you called him so late?"',
        options: [
          'Why did you call him so late?',
          'Why do you called him so late?',
          'Why you did call him so late?',
          'Why did you was call him so late?'
        ],
        correctAnswer: 'Why did you call him so late?',
        explanation: 'In questions with "did", the verb must be in its base form: "call".',
        tenseRule: 'Did + Subject + V1 (base form)?'
      },
      {
        id: 'ps-past-q3',
        tenseId: 'past-simple',
        category: 'past',
        difficulty: 'Beginner',
        type: 'rearrange-words',
        prompt: 'Arrange into a correct Past Simple sentence:',
        scrambledWords: ['yesterday', 'She', 'not', 'did', 'attend', 'the', 'lecture'],
        correctAnswer: 'She did not attend the lecture yesterday',
        explanation: 'Subject (She) + did not + V1 (attend) + object (the lecture) + time (yesterday).',
        tenseRule: 'Subject + did not + V1'
      },
      {
        id: 'ps-past-q4',
        tenseId: 'past-simple',
        category: 'past',
        difficulty: 'Beginner',
        type: 'multiple-choice',
        prompt: 'Which pair of irregular past simple verbs is correct?',
        options: [
          'buy -> bought, fly -> flew',
          'buy -> buyed, fly -> flied',
          'buy -> bought, fly -> flown',
          'buy -> bot, fly -> flew'
        ],
        correctAnswer: 'buy -> bought, fly -> flew',
        explanation: '"bought" and "flew" are the correct V2 past forms. ("flown" is V3 past participle).',
        tenseRule: 'Irregular verb V2 forms'
      },
      {
        id: 'ps-past-q5',
        tenseId: 'past-simple',
        category: 'past',
        difficulty: 'Beginner',
        type: 'identify-tense',
        prompt: 'What tense is: "Thomas Edison invented the phonograph in 1877"?',
        options: ['Past Simple', 'Past Continuous', 'Past Perfect', 'Present Perfect'],
        correctAnswer: 'Past Simple',
        explanation: 'It states a historical event with a completed past year ("in 1877") using regular verb V2 "invented".',
        tenseRule: 'Completed historical event with specific date'
      }
    ]
  },

  // ==========================================
  // 6. PAST CONTINUOUS
  // ==========================================
  {
    id: 'past-continuous',
    slug: 'past-continuous',
    name: 'Past Continuous',
    category: 'past',
    difficulty: 'Intermediate',
    shortDescription: 'Used for actions that were in progress at a specific moment in the past, often interrupted by another action.',
    beginnerExplanation: 'Think of Past Continuous as a movie paused in the middle of a past scene. At 8:00 PM yesterday, you were in the middle of eating dinner ("I was eating dinner"). It is also the classic "interrupted action" tense: "I was taking a shower when the doorbell rang!"',
    whenToUse: [
      'An action in progress at a specific time in the past (e.g., At 10:00 PM last night, I was reading in bed)',
      'An interrupted past action (e.g., I was walking to work when it started to pour)',
      'Two actions happening simultaneously in the past (e.g., While Mom was cooking, Dad was setting the table)',
      'Setting the scene or atmosphere in a story (e.g., The sun was shining and the birds were singing)'
    ],
    whenNotToUse: [
      'Do not use for short, sudden past events that took only a split second (like drop, smash, hear) — use Past Simple instead.'
    ],
    formula: {
      affirmative: 'Subject + was / were + V-ing + Object',
      negative: 'Subject + was / were + not + V-ing + Object',
      question: 'Was / Were + Subject + V-ing + Object?',
      notes: 'I / He / She / It -> was. You / We / They -> were. The main verb takes -ing.'
    },
    signalWords: [
      'while', 'as', 'when', 'at that time', 'at 8 o\'clock yesterday', 'all evening yesterday', 'during that hour'
    ],
    rules: [
      {
        title: 'While vs. When in Interrupted Actions',
        explanation: 'We usually use "while" or "as" with the longer background continuous action (Past Continuous), and "when" with the short interrupting event (Past Simple).',
        examples: [
          'While I was sleeping, the storm knocked over a tree.',
          'I was sleeping when the storm knocked over a tree.'
        ]
      }
    ],
    examples: [
      {
        sentence: 'The detective noticed that the suspect was sweating nervously during the interview.',
        highlight: 'was sweating',
        meaning: 'Action in progress over that past interval.'
      },
      {
        sentence: 'What were you doing at 3:00 PM yesterday when the alarm went off?',
        highlight: 'were you doing ... went off',
        meaning: 'Continuous background action interrupted by the alarm.'
      },
      {
        sentence: 'While they were driving through the mountains, it began to snow heavily.',
        highlight: 'were driving',
        meaning: 'Background action in progress.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'When I was arriving home, my brother played video games.',
        correct: 'When I arrived home, my brother was playing video games.',
        explanation: 'Arriving is a sudden completed action (Past Simple), while playing video games was the ongoing background activity (Past Continuous).'
      },
      {
        incorrect: 'They was watching television all evening.',
        correct: 'They were watching television all evening.',
        explanation: '"They" requires the plural auxiliary "were", not "was".'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Officer Miller',
        lineA: 'Where were you at approximately 9:15 PM last night?',
        speakerB: 'Witness Chen',
        lineB: 'I was washing the dishes in the kitchen while my husband was reading in the living room.',
        context: 'A witness providing an alibi.'
      }
    ],
    timeline: {
      timePosition: 'past-continuous',
      description: 'An extended wave of action unfolding in the past, often intersecting with a single sudden event.',
      visualAnchor: 'Ongoing segment in the past intersected by a point'
    },
    tips: [
      'Remember the classic formula: Longer action = Past Continuous (was/were + -ing). Shorter interrupting action = Past Simple (V2).'
    ],
    speakingPrompt: {
      prompt: 'Imagine an unexpected phone call yesterday. What were you doing when the phone rang?',
      modelAnswer: 'I was just preparing my lunch in the kitchen when my manager called me.',
      tips: 'Use "I was + verb-ing when [past simple event]".'
    },
    quickExercises: [
      {
        id: 'pc-past-q1',
        tenseId: 'past-continuous',
        category: 'past',
        difficulty: 'Intermediate',
        type: 'fill-in-blank',
        prompt: 'While Sarah _____ to work, her tire went flat on the highway.',
        options: ['was driving', 'drove', 'is driving', 'were driving'],
        correctAnswer: 'was driving',
        explanation: 'Sarah is singular ("was"). "While" introduces the longer ongoing background activity ("was driving").',
        tenseRule: 'While + Subject + was/were + V-ing'
      },
      {
        id: 'pc-past-q2',
        tenseId: 'past-continuous',
        category: 'past',
        difficulty: 'Intermediate',
        type: 'multiple-choice',
        prompt: 'Which sentence correctly depicts two parallel continuous past actions?',
        options: [
          'While Ava was playing the piano, Leo was sketching in his notebook.',
          'While Ava played the piano, Leo sketches in his notebook.',
          'Ava was playing the piano when Leo sketches.',
          'Ava played the piano while Leo was sketch.'
        ],
        correctAnswer: 'While Ava was playing the piano, Leo was sketching in his notebook.',
        explanation: 'Two ongoing simultaneous past actions both take the Past Continuous with "was/were + -ing".',
        tenseRule: 'Simultaneous actions: was/were V-ing + was/were V-ing'
      },
      {
        id: 'pc-past-q3',
        tenseId: 'past-continuous',
        category: 'past',
        difficulty: 'Intermediate',
        type: 'sentence-correction',
        prompt: 'Correct the error: "We was sleeping when the earthquake struck."',
        options: [
          'We were sleeping when the earthquake struck.',
          'We are sleeping when the earthquake struck.',
          'We slept while the earthquake was striking.',
          'We were sleep when the earthquake struck.'
        ],
        correctAnswer: 'We were sleeping when the earthquake struck.',
        explanation: 'The pronoun "we" takes the plural past auxiliary "were", not "was".',
        tenseRule: 'We/You/They + were + V-ing'
      },
      {
        id: 'pc-past-q4',
        tenseId: 'past-continuous',
        category: 'past',
        difficulty: 'Intermediate',
        type: 'identify-tense',
        prompt: 'Identify the tense: "The rain was pattering against the roof all night."',
        options: ['Past Continuous', 'Past Simple', 'Past Perfect Continuous', 'Present Continuous'],
        correctAnswer: 'Past Continuous',
        explanation: '"was pattering" is was + V-ing showing continuous activity in the past.',
        tenseRule: 'Was/were + V-ing'
      },
      {
        id: 'pc-past-q5',
        tenseId: 'past-continuous',
        category: 'past',
        difficulty: 'Intermediate',
        type: 'rearrange-words',
        prompt: 'Form a question in the Past Continuous:',
        scrambledWords: ['you', 'Were', 'listening', 'when', 'spoke', 'she', '?'],
        correctAnswer: 'Were you listening when she spoke ?',
        explanation: 'Were + subject (you) + V-ing (listening) + clause (when she spoke).',
        tenseRule: 'Were + Subject + V-ing?'
      }
    ]
  },

  // ==========================================
  // 7. PAST PERFECT
  // ==========================================
  {
    id: 'past-perfect',
    slug: 'past-perfect',
    name: 'Past Perfect',
    category: 'past',
    difficulty: 'Advanced',
    shortDescription: 'Used for an action that happened before another past action or before a specific past point in time.',
    beginnerExplanation: 'Think of Past Perfect as the "Past of the Past" or a flashback in a movie. If you are already telling a story set in the past, and you need to look even FURTHER back to something that happened earlier, that is Past Perfect: "When I arrived at the station, the train had already left."',
    whenToUse: [
      'Clarifying which of two past actions occurred first (The earlier action = Past Perfect; The later action = Past Simple)',
      'Stating condition or regret in the Third Conditional (e.g., If I had studied harder, I would have passed the exam)',
      'Reported speech when shifting from Present Perfect or Past Simple (e.g., She said she had lost her ring)'
    ],
    whenNotToUse: [
      'Do not use Past Perfect if the chronological order of events is obvious with words like "before" or "after" unless you need to emphasize completion, and never use it if there is only a single isolated past event.'
    ],
    formula: {
      affirmative: 'Subject + had + V3 (Past Participle) + Object',
      negative: 'Subject + had not (hadn\'t) + V3 (Past Participle) + Object',
      question: 'Had + Subject + V3 (Past Participle) + Object?',
      notes: '"Had" is used with ALL subjects (I, You, He, She, It, We, They). Followed by the past participle (V3).'
    },
    signalWords: [
      'by the time', 'already', 'before', 'after', 'until that day', 'never before', 'just', 'as soon as'
    ],
    rules: [
      {
        title: 'The "Two Past Actions" Principle',
        explanation: 'Action 1 (happened first): Past Perfect (had + V3). Action 2 (happened second): Past Simple (V2).',
        examples: [
          '1st: Train left at 2:50 PM. 2nd: I arrived at 3:00 PM. -> "When I arrived, the train had left."'
        ]
      }
    ],
    examples: [
      {
        sentence: 'By the time the firefighters arrived, the neighbors had already put out the fire.',
        highlight: 'had already put out',
        meaning: 'Putting out the fire happened first; firefighters arrived second.'
      },
      {
        sentence: 'She was nervous on the airplane because she had never flown before.',
        highlight: 'had never flown before',
        meaning: 'Prior life experience up to that past flight.'
      },
      {
        sentence: 'He hadn\'t finished his report when his supervisor called for the meeting.',
        highlight: 'hadn\'t finished ... called',
        meaning: 'Incomplete state prior to supervisor\'s call.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'When I arrived at the cinema, the film already started.',
        correct: 'When I arrived at the cinema, the film had already started.',
        explanation: 'Because the movie started prior to the arrival in the past, use "had started".'
      },
      {
        incorrect: 'I had visited London last year.',
        correct: 'I visited London last year.',
        explanation: 'If there is only one simple completed action in the past with a time marker, use Past Simple, not Past Perfect.'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Noah',
        lineA: 'Did you get tickets for the concert last night?',
        speakerB: 'Chloe',
        lineB: 'No, unfortunately! By the time I logged into the website, all seats had sold out.',
        context: 'Explaining missed opportunity.'
      }
    ],
    timeline: {
      timePosition: 'past-before-past',
      description: 'Positioned furthest to the left: an event completed before another past event occurred.',
      visualAnchor: 'Action positioned before another past marker'
    },
    tips: [
      'Whenever a sentence begins with "By the time [Past Simple]...", the accompanying clause will almost certainly require the Past Perfect ("...had + V3").'
    ],
    speakingPrompt: {
      prompt: 'Share a story about arriving somewhere too late or realizing you had forgotten something.',
      modelAnswer: 'When I arrived at the airport check-in desk, I realized that I had left my passport on the kitchen table.',
      tips: 'Contrast "realized" (Past Simple) with "had left" (Past Perfect).'
    },
    quickExercises: [
      {
        id: 'pp-past-q1',
        tenseId: 'past-perfect',
        category: 'past',
        difficulty: 'Advanced',
        type: 'fill-in-blank',
        prompt: 'By the time we got to the stadium, the match _____.',
        options: ['had already begun', 'has already begun', 'already began', 'was already begun'],
        correctAnswer: 'had already begun',
        explanation: 'The match began before the past arrival ("got"), so we use the Past Perfect: "had already begun".',
        tenseRule: 'By the time + Past Simple, Past Perfect (had + V3)'
      },
      {
        id: 'pp-past-q2',
        tenseId: 'past-perfect',
        category: 'past',
        difficulty: 'Advanced',
        type: 'sentence-correction',
        prompt: 'Fix the error: "She told me that she has already seen that exhibition."',
        options: [
          'She told me that she had already seen that exhibition.',
          'She told me that she already saw that exhibition.',
          'She told me that she has saw that exhibition.',
          'She tell me that she had seen that exhibition.'
        ],
        correctAnswer: 'She told me that she had already seen that exhibition.',
        explanation: 'In reported speech anchored in past tense ("told"), the present perfect shifts back to past perfect: "had seen".',
        tenseRule: 'Backshift in past reported speech'
      },
      {
        id: 'pp-past-q3',
        tenseId: 'past-perfect',
        category: 'past',
        difficulty: 'Advanced',
        type: 'multiple-choice',
        prompt: 'Which event happened FIRST in this sentence? "After Carlos had cleaned the apartment, he invited his friends over."',
        options: [
          'Carlos cleaned the apartment',
          'Carlos invited his friends over',
          'Both happened at the exact same second',
          'Cannot be determined'
        ],
        correctAnswer: 'Carlos cleaned the apartment',
        explanation: 'The Past Perfect ("had cleaned") designates the earlier of the two past events.',
        tenseRule: 'Past Perfect denotes the earlier past action'
      },
      {
        id: 'pp-past-q4',
        tenseId: 'past-perfect',
        category: 'past',
        difficulty: 'Advanced',
        type: 'rearrange-words',
        prompt: 'Form a sentence in the Past Perfect:',
        scrambledWords: ['had', 'never', 'He', 'such', 'beauty', 'seen', 'before'],
        correctAnswer: 'He had never seen such beauty before',
        explanation: 'Subject (He) + had + adverb (never) + V3 (seen) + object + before.',
        tenseRule: 'Subject + had + never + V3'
      },
      {
        id: 'pp-past-q5',
        tenseId: 'past-perfect',
        category: 'past',
        difficulty: 'Advanced',
        type: 'identify-tense',
        prompt: 'What tense is: "They hadn\'t received our confirmation email prior to the conference"?',
        options: ['Past Perfect', 'Past Simple', 'Present Perfect', 'Past Perfect Continuous'],
        correctAnswer: 'Past Perfect',
        explanation: '"hadn\'t received" is had not + V3 (past participle).',
        tenseRule: 'Had + not + V3'
      }
    ]
  },

  // ==========================================
  // 8. PAST PERFECT CONTINUOUS
  // ==========================================
  {
    id: 'past-perfect-continuous',
    slug: 'past-perfect-continuous',
    name: 'Past Perfect Continuous',
    category: 'past',
    difficulty: 'Advanced',
    shortDescription: 'Emphasizes the continuous duration of an action that was ongoing up until another past moment.',
    beginnerExplanation: 'Think of this as the past version of "I have been sweating over this." You are back in time, and you look at an action that had been rolling continuously for hours before another past event interrupted or concluded it: "Her feet hurt because she had been standing for 8 hours."',
    whenToUse: [
      'Emphasizing how long an action had been in progress before another past event (e.g., We had been driving for six hours before we reached the hotel)',
      'Explaining the past cause of a past condition or result (e.g., The roads were icy and dangerous because it had been snowing all morning)'
    ],
    whenNotToUse: [
      'Do not use with stative verbs (Say "He had owned the house for 20 years", NOT "had been owning").',
      'Do not use if you are simply stating the number of times an action was completed.'
    ],
    formula: {
      affirmative: 'Subject + had + been + V-ing + Object',
      negative: 'Subject + had not (hadn\'t) + been + V-ing + Object',
      question: 'Had + Subject + been + V-ing + Object?',
      notes: '"Had been + verb-ing" for all grammatical persons.'
    },
    signalWords: [
      'for hours', 'since morning', 'all night', 'before', 'by the time', 'how long had...'
    ],
    rules: [
      {
        title: 'Past Perfect Continuous vs. Past Continuous',
        explanation: 'Past Continuous simply states what was happening at a past moment ("At 3 PM, he was driving"). Past Perfect Continuous specifies the ongoing DURATION prior to that moment ("At 3 PM, he had been driving for five hours").',
        examples: [
          'Past Continuous: He was running when it rained.',
          'Past Perfect Continuous: He had been running for an hour before it rained.'
        ]
      }
    ],
    examples: [
      {
        sentence: 'The athletes were exhausted because they had been training in the heat for four hours.',
        highlight: 'had been training',
        meaning: 'Ongoing duration that explained their past exhaustion.'
      },
      {
        sentence: 'She had been working as an architect at that firm for ten years before she decided to start her own practice.',
        highlight: 'had been working ... before she decided',
        meaning: 'Continuous career duration preceding her resignation.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I had been knowing him for ten years before we got married.',
        correct: 'I had known him for ten years before we got married.',
        explanation: '"Know" is a stative verb and does not take the continuous form even in past perfect duration.'
      },
      {
        incorrect: 'He was tired because he has been working all night.',
        correct: 'He was tired because he had been working all night.',
        explanation: 'The result "was tired" is in the past, so the preceding cause must be in Past Perfect Continuous ("had been working"), not present.'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Doctor',
        lineA: 'How long had you been experiencing these headaches before you came to the clinic?',
        speakerB: 'Patient',
        lineB: 'I had been having them on and off for nearly three weeks.',
        context: 'Medical consultation reviewing past symptom history.'
      }
    ],
    timeline: {
      timePosition: 'past-before-past',
      description: 'An extended ongoing wave in the deep past leading directly up to another past checkpoint.',
      visualAnchor: 'Continuous ribbon ending at a past event'
    },
    tips: [
      'Look for the pairing of a past state/emotion ("was exhausted", "were furious") + "because" + "had been V-ing".'
    ],
    speakingPrompt: {
      prompt: 'Describe something you had been doing for a long time before an important milestone occurred.',
      modelAnswer: 'I had been studying German for three years before I finally visited Berlin for the first time.',
      tips: 'Use "had been + verb-ing + for [duration] before [past simple event]".'
    },
    quickExercises: [
      {
        id: 'ppc-past-q1',
        tenseId: 'past-perfect-continuous',
        category: 'past',
        difficulty: 'Advanced',
        type: 'fill-in-blank',
        prompt: 'The musician\'s fingers were sore because he _____ the guitar all afternoon.',
        options: ['had been playing', 'has been playing', 'was played', 'had played two songs'],
        correctAnswer: 'had been playing',
        explanation: 'Past result ("were sore") caused by the prior continuous duration ("had been playing").',
        tenseRule: 'Had been + V-ing for past continuous cause'
      },
      {
        id: 'ppc-past-q2',
        tenseId: 'past-perfect-continuous',
        category: 'past',
        difficulty: 'Advanced',
        type: 'multiple-choice',
        prompt: 'Choose the correct question form:',
        options: [
          'How long had they been waiting before the doors opened?',
          'How long have they been waiting before the doors opened?',
          'How long did they had been waiting?',
          'How long were they been waiting?'
        ],
        correctAnswer: 'How long had they been waiting before the doors opened?',
        explanation: 'Past anchor ("opened") requires Past Perfect Continuous question: "How long had they been waiting?".',
        tenseRule: 'How long + had + Subject + been + V-ing?'
      },
      {
        id: 'ppc-past-q3',
        tenseId: 'past-perfect-continuous',
        category: 'past',
        difficulty: 'Advanced',
        type: 'sentence-correction',
        prompt: 'Correct the error: "They had been wait for the train for an hour before it arrived."',
        options: [
          'They had been waiting for the train for an hour before it arrived.',
          'They had waited for the train for an hour before it arrive.',
          'They were been waiting for the train.',
          'They has been waiting for the train.'
        ],
        correctAnswer: 'They had been waiting for the train for an hour before it arrived.',
        explanation: 'The verb must be in participle form ("waiting") after "had been".',
        tenseRule: 'Had been + V-ing'
      },
      {
        id: 'ppc-past-q4',
        tenseId: 'past-perfect-continuous',
        category: 'past',
        difficulty: 'Advanced',
        type: 'identify-tense',
        prompt: 'Identify the tense: "The ground was soaking wet because it had been raining throughout the night."',
        options: ['Past Perfect Continuous', 'Past Continuous', 'Past Simple', 'Present Perfect Continuous'],
        correctAnswer: 'Past Perfect Continuous',
        explanation: '"had been raining" uses had + been + V-ing describing continuous duration prior to the past observation.',
        tenseRule: 'Had been + V-ing'
      },
      {
        id: 'ppc-past-q5',
        tenseId: 'past-perfect-continuous',
        category: 'past',
        difficulty: 'Advanced',
        type: 'rearrange-words',
        prompt: 'Arrange into a correct sentence:',
        scrambledWords: ['for', 'had', 'been', 'She', 'hours', 'crying', 'before', 'she', 'smiled'],
        correctAnswer: 'She had been crying for hours before she smiled',
        explanation: 'Subject (She) + had been crying + duration (for hours) + before clause (before she smiled).',
        tenseRule: 'Subject + had been + V-ing + duration + before clause'
      }
    ]
  },

  // ==========================================
  // 9. FUTURE SIMPLE
  // ==========================================
  {
    id: 'future-simple',
    slug: 'future-simple',
    name: 'Future Simple',
    category: 'future',
    difficulty: 'Beginner',
    shortDescription: 'Used for spontaneous decisions, predictions without present evidence, promises, and offers.',
    beginnerExplanation: 'Think of Future Simple ("will") as a spark of the moment or a telescope into tomorrow. When you decide something right on the spot ("I\'m thirsty — I will grab a glass of water"), make a promise ("I will always support you"), or guess what will happen in the year 2050 ("Cars will fly"), use Future Simple.',
    whenToUse: [
      'Spontaneous decisions made at the moment of speaking (e.g., The phone is ringing — I\'ll answer it!)',
      'Predictions based on personal opinion, belief, or guesswork (e.g., I think it will rain tomorrow)',
      'Promises, offers, requests, and threats (e.g., I will help you carry those heavy grocery bags)',
      'Unavoidable future facts (e.g., The sun will rise at 6:12 AM tomorrow)'
    ],
    whenNotToUse: [
      'Do NOT use "will" for plans or intentions that were already arranged or decided before speaking (use "be going to" or Present Continuous instead: "I am going to visit my dentist tomorrow").'
    ],
    formula: {
      affirmative: 'Subject + will + V1 (Base Form) + Object',
      negative: 'Subject + will not (won\'t) + V1 (Base Form) + Object',
      question: 'Will + Subject + V1 (Base Form) + Object?',
      notes: 'Contractions: I\'ll, you\'ll, he\'ll, she\'ll, it\'ll, we\'ll, they\'ll. Negative contraction: won\'t.'
    },
    signalWords: [
      'tomorrow', 'next week', 'soon', 'in the future', 'in 2030', 'probably', 'I think', 'I believe', 'I promise', 'someday'
    ],
    rules: [
      {
        title: 'Will vs. Be Going To',
        explanation: '"Will" is for spontaneous decisions made right now, or predictions based on opinion. "Be going to" is for intentions decided beforehand, or predictions with visible present evidence (e.g., "Look at those dark clouds! It is going to rain").',
        examples: [
          'Spontaneous: "I\'ll take the blue shirt." (Decided now)',
          'Pre-planned: "I am going to buy a new laptop this weekend." (Decided earlier)'
        ]
      }
    ],
    examples: [
      {
        sentence: 'Don\'t worry about the dishes; I will wash them for you.',
        highlight: 'will wash',
        meaning: 'A helpful spontaneous offer made right now.'
      },
      {
        sentence: 'In my opinion, renewable energy will power most cities by 2040.',
        highlight: 'will power',
        meaning: 'A prediction based on belief/opinion.'
      },
      {
        sentence: 'I promise I won\'t tell anyone your secret.',
        highlight: 'won\'t tell',
        meaning: 'A firm promise for the future.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'I will going to the supermarket now. (already decided plan)',
        correct: 'I am going to the supermarket.',
        explanation: 'Do not combine "will" with "going to". Use "will + base verb" or "be going to + base verb".'
      },
      {
        incorrect: 'She will comes to the party.',
        correct: 'She will come to the party.',
        explanation: 'Modal verb "will" is always followed by the bare base form of the verb (V1) without -s.'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Customer',
        lineA: 'The bill is $45. Do you accept credit cards?',
        speakerB: 'Cashier',
        lineB: 'Yes, we do. I will print your receipt in just a second.',
        context: 'At a cafe counter.'
      }
    ],
    timeline: {
      timePosition: 'future-simple',
      description: 'A distinct future point or anticipated certainty ahead on the timeline.',
      visualAnchor: 'Point positioned in the future'
    },
    tips: [
      'Words like "I think", "probably", "I doubt", and "I bet" strongly correlate with "will".'
    ],
    speakingPrompt: {
      prompt: 'Make two predictions about how technology will change everyday life in twenty years.',
      modelAnswer: 'In twenty years, autonomous electric vehicles will replace human-driven cars, and AI tutors will teach personalized school subjects.',
      tips: 'Use "will + base verb".'
    },
    quickExercises: [
      {
        id: 'fs-q1',
        tenseId: 'future-simple',
        category: 'future',
        difficulty: 'Beginner',
        type: 'fill-in-blank',
        prompt: '"Someone is knocking on the front door!" — "Don\'t get up, I _____ it."',
        options: ['will answer', 'am answering', 'answered', 'will answered'],
        correctAnswer: 'will answer',
        explanation: 'Spontaneous decision made right at the moment of speaking requires Future Simple with "will".',
        tenseRule: 'Spontaneous decision: will + V1'
      },
      {
        id: 'fs-q2',
        tenseId: 'future-simple',
        category: 'future',
        difficulty: 'Beginner',
        type: 'sentence-correction',
        prompt: 'Correct the error: "He will helps you if you ask him politely."',
        options: [
          'He will help you if you ask him politely.',
          'He will helping you if you ask him politely.',
          'He will helped you if you ask him politely.',
          'He helps will you if you ask him politely.'
        ],
        correctAnswer: 'He will help you if you ask him politely.',
        explanation: 'After "will", the verb always stays in bare base form: "help", never "helps".',
        tenseRule: 'Will + bare base verb (V1)'
      },
      {
        id: 'fs-q3',
        tenseId: 'future-simple',
        category: 'future',
        difficulty: 'Beginner',
        type: 'multiple-choice',
        prompt: 'What is the standard negative contraction of "will not"?',
        options: ['won\'t', 'willn\'t', 'wont', 'wouldn\'t'],
        correctAnswer: 'won\'t',
        explanation: '"will not" contracts irregularly to "won\'t".',
        tenseRule: 'will + not = won\'t'
      },
      {
        id: 'fs-q4',
        tenseId: 'future-simple',
        category: 'future',
        difficulty: 'Beginner',
        type: 'identify-tense',
        prompt: 'Identify the tense: "We will never forget your kindness."',
        options: ['Future Simple', 'Present Simple', 'Future Continuous', 'Past Simple'],
        correctAnswer: 'Future Simple',
        explanation: '"will never forget" uses will + base verb to make a heartfelt future declaration.',
        tenseRule: 'Will + V1'
      },
      {
        id: 'fs-q5',
        tenseId: 'future-simple',
        category: 'future',
        difficulty: 'Beginner',
        type: 'rearrange-words',
        prompt: 'Form a Future Simple question:',
        scrambledWords: ['tomorrow', 'Will', 'join', 'us', 'dinner', 'you', 'for', '?'],
        correctAnswer: 'Will you join us for dinner tomorrow ?',
        explanation: 'Will + subject (you) + base verb (join) + object (us) + for dinner tomorrow.',
        tenseRule: 'Will + Subject + V1?'
      }
    ]
  },

  // ==========================================
  // 10. FUTURE CONTINUOUS
  // ==========================================
  {
    id: 'future-continuous',
    slug: 'future-continuous',
    name: 'Future Continuous',
    category: 'future',
    difficulty: 'Intermediate',
    shortDescription: 'Used for an action that will be in progress at a specific time in the future.',
    beginnerExplanation: 'Think of Future Continuous as setting an imaginary future alarm clock and seeing what will be happening at that precise second. "Tomorrow at 3:00 PM, do not call me because I will be taking my final exam." The exam starts before 3 and finishes after 3 — at 3:00 PM, it is in progress!',
    whenToUse: [
      'Actions that will be in progress at a specific moment in the future (e.g., This time tomorrow, I will be flying over the Atlantic Ocean)',
      'Polite questions about someone\'s future plans (e.g., Will you be using the printer this morning?)',
      'Routine, expected future events that happen as a natural course of things (e.g., I will be seeing David at the office tomorrow anyway)'
    ],
    whenNotToUse: [
      'Do not use with stative verbs (Say "I will understand soon", NOT "I will be understanding").'
    ],
    formula: {
      affirmative: 'Subject + will be + V-ing + Object',
      negative: 'Subject + will not be (won\'t be) + V-ing + Object',
      question: 'Will + Subject + be + V-ing + Object?',
      notes: '"Will be + verb-ing" for all grammatical persons.'
    },
    signalWords: [
      'at this time tomorrow', 'at 8 PM tomorrow', 'this time next week', 'in five years', 'during that time', 'all day tomorrow'
    ],
    rules: [
      {
        title: 'Future Simple vs. Future Continuous',
        explanation: 'Future Simple states a completed event or decision ("I will start my shift at 9 AM"). Future Continuous highlights the action being underway at that future point ("At 10 AM, I will be working on the report").',
        examples: [
          'Simple: I will arrive in Rome at 6 PM.',
          'Continuous: At 7 PM, I will be enjoying dinner in Rome.'
        ]
      }
    ],
    examples: [
      {
        sentence: 'This time next Friday, we will be relaxing on the beach in Bali.',
        highlight: 'will be relaxing',
        meaning: 'Action in full progress at that future milestone.'
      },
      {
        sentence: 'Please don\'t phone between 1:00 and 2:00 PM; the baby will be sleeping.',
        highlight: 'will be sleeping',
        meaning: 'Ongoing activity during that future window.'
      },
      {
        sentence: 'Will you be driving to the supermarket today, or should I walk?',
        highlight: 'Will you be driving',
        meaning: 'Polite inquiry regarding routine plans.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'This time tomorrow I will sleeping.',
        correct: 'This time tomorrow I will be sleeping.',
        explanation: 'Do not forget the auxiliary "be". The formula is "will be + V-ing".'
      },
      {
        incorrect: 'At 8 PM tonight she will be eat dinner.',
        correct: 'At 8 PM tonight she will be eating dinner.',
        explanation: 'The main verb must take the "-ing" suffix.'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Maya',
        lineA: 'Can we schedule our team project sync for tomorrow at 2 PM?',
        speakerB: 'Alex',
        lineB: 'I\'ll be attending a webinar at 2 PM. How about 4 PM instead?',
        context: 'Workplace calendar conflict.'
      }
    ],
    timeline: {
      timePosition: 'future-continuous',
      description: 'A continuous active band in the future crossing through a specific designated time marker.',
      visualAnchor: 'Ongoing segment in the future crossing a point'
    },
    tips: [
      'Phrases starting with "This time tomorrow..." or "This time next year..." are textbook triggers for Future Continuous.'
    ],
    speakingPrompt: {
      prompt: 'What will you be doing this time tomorrow?',
      modelAnswer: 'This time tomorrow, I will be sitting at my desk, sipping tea and reviewing grammar concepts.',
      tips: 'Use "will be + verb-ing".'
    },
    quickExercises: [
      {
        id: 'fc-q1',
        tenseId: 'future-continuous',
        category: 'future',
        difficulty: 'Intermediate',
        type: 'fill-in-blank',
        prompt: 'Do not call me at 7 AM tomorrow; I _____ asleep.',
        options: ['will still be', 'will still', 'am still', 'will have been'],
        correctAnswer: 'will still be',
        explanation: 'Action in progress at 7 AM tomorrow requires Future Continuous: "will still be [sleeping/asleep]".',
        tenseRule: 'Will be + V-ing / adjective'
      },
      {
        id: 'fc-q2',
        tenseId: 'future-continuous',
        category: 'future',
        difficulty: 'Intermediate',
        type: 'multiple-choice',
        prompt: 'Which sentence is in the Future Continuous tense?',
        options: [
          'She will be preparing dinner when guests arrive.',
          'She will prepare dinner tomorrow.',
          'She has prepared dinner already.',
          'She was preparing dinner when I called.'
        ],
        correctAnswer: 'She will be preparing dinner when guests arrive.',
        explanation: '"will be preparing" is will + be + V-ing, denoting future action in progress.',
        tenseRule: 'Subject + will be + V-ing'
      },
      {
        id: 'fc-q3',
        tenseId: 'future-continuous',
        category: 'future',
        difficulty: 'Intermediate',
        type: 'sentence-correction',
        prompt: 'Fix the error: "This time next week, we will sunbathing on the coast."',
        options: [
          'This time next week, we will be sunbathing on the coast.',
          'This time next week, we will sunbathed on the coast.',
          'This time next week, we are sunbathe on the coast.',
          'This time next week, we will to sunbathe on the coast.'
        ],
        correctAnswer: 'This time next week, we will be sunbathing on the coast.',
        explanation: 'Must include "be": "will be sunbathing".',
        tenseRule: 'Will + be + V-ing'
      },
      {
        id: 'fc-q4',
        tenseId: 'future-continuous',
        category: 'future',
        difficulty: 'Intermediate',
        type: 'rearrange-words',
        prompt: 'Rearrange to make a Future Continuous statement:',
        scrambledWords: ['working', 'They', 'will', 'be', 'late', 'tonight', 'at', 'the', 'lab'],
        correctAnswer: 'They will be working late tonight at the lab',
        explanation: 'Subject (They) + will be + V-ing (working) + late tonight at the lab.',
        tenseRule: 'Subject + will be + V-ing + adverbials'
      },
      {
        id: 'fc-q5',
        tenseId: 'future-continuous',
        category: 'future',
        difficulty: 'Intermediate',
        type: 'identify-tense',
        prompt: 'What tense is: "Will you be utilizing the conference room after 3 PM?"',
        options: ['Future Continuous', 'Future Simple', 'Present Continuous', 'Future Perfect'],
        correctAnswer: 'Future Continuous',
        explanation: 'Form: Will + you + be + utilizing (V-ing).',
        tenseRule: 'Will + Subject + be + V-ing?'
      }
    ]
  },

  // ==========================================
  // 11. FUTURE PERFECT
  // ==========================================
  {
    id: 'future-perfect',
    slug: 'future-perfect',
    name: 'Future Perfect',
    category: 'future',
    difficulty: 'Advanced',
    shortDescription: 'Used for an action that will be completed before a specific deadline or another event in the future.',
    beginnerExplanation: 'Think of Future Perfect as standing on a future deadline and looking backwards at a finished accomplishment. "By 2030, I will have graduated university." The graduation will happen before 2030 arrives. It is the ultimate "deadline" tense.',
    whenToUse: [
      'Actions that will be finished before a specific deadline in the future (e.g., By 5:00 PM, I will have submitted my assignment)',
      'Estimating or predicting what will have happened by a future milestone (e.g., By next month, they will have constructed the bridge)'
    ],
    whenNotToUse: [
      'Do not use if there is no deadline or reference point in the future (just use Future Simple).'
    ],
    formula: {
      affirmative: 'Subject + will have + V3 (Past Participle) + Object',
      negative: 'Subject + will not have (won\'t have) + V3 (Past Participle) + Object',
      question: 'Will + Subject + have + V3 (Past Participle) + Object?',
      notes: '"Will have + V3" for all subjects. Notice it is always "have", never "has", even for he/she/it (because "will" is a modal verb).'
    },
    signalWords: [
      'by [time/date]', 'by the time', 'by then', 'by tomorrow', 'by the end of this year', 'in two weeks\' time', 'before'
    ],
    rules: [
      {
        title: 'The "By" Rule',
        explanation: '"By" means "at or before". When accompanied by a future time ("by tomorrow", "by Friday", "by 2035"), it almost universally triggers the Future Perfect tense.',
        examples: [
          'By 10 PM tonight, the movie will have finished.',
          'By next year, she will have written her third novel.'
        ]
      },
      {
        title: 'Always "Have", Never "Has"',
        explanation: 'Because "will" is a modal auxiliary verb, the following auxiliary verb must remain in its bare base form: "have".',
        examples: [
          'Correct: He will have completed the project. (NOT: will has completed)'
        ]
      }
    ],
    examples: [
      {
        sentence: 'By the time you wake up tomorrow morning, our flight will have landed in London.',
        highlight: 'will have landed',
        meaning: 'Landing will be completed prior to your awakening.'
      },
      {
        sentence: 'In two months, Dr. Foster will have worked at the clinic for twenty-five years.',
        highlight: 'will have worked',
        meaning: 'Reaching a milestone deadline in the future.'
      },
      {
        sentence: 'Will you have finished the audit by the Friday deadline?',
        highlight: 'Will you have finished',
        meaning: 'Question about completing an action before a deadline.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'By next year, he will has saved ten thousand dollars.',
        correct: 'By next year, he will have saved ten thousand dollars.',
        explanation: 'Never use "has" after modal "will". Always use "will have + V3".'
      },
      {
        incorrect: 'By the time she arrives, we will eat dinner. (meaning already finished)',
        correct: 'By the time she arrives, we will have eaten dinner.',
        explanation: 'If the dinner is completed before her arrival, use Future Perfect ("will have eaten").'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Project Lead',
        lineA: 'Can we deliver the final client prototype by Thursday afternoon?',
        speakerB: 'Lead Developer',
        lineB: 'Yes, our engineering team will have fixed all critical bugs by then.',
        context: 'Sprint deadline agreement.'
      }
    ],
    timeline: {
      timePosition: 'future-before-future',
      description: 'An action that completes inside the future prior to a designated future deadline line.',
      visualAnchor: 'Completed mark before future deadline'
    },
    tips: [
      'The magic formula: "By + future time = will have + V3". Memorize this connection!'
    ],
    speakingPrompt: {
      prompt: 'What is one major goal you will have accomplished by the end of this year?',
      modelAnswer: 'By the end of this year, I will have mastered all 12 English tenses and expanded my vocabulary significantly.',
      tips: 'Use "By [future date], I will have + V3".'
    },
    quickExercises: [
      {
        id: 'fp-q1',
        tenseId: 'future-perfect',
        category: 'future',
        difficulty: 'Advanced',
        type: 'fill-in-blank',
        prompt: 'By 2030, scientists _____ effective cures for several rare conditions.',
        options: ['will have discovered', 'will has discovered', 'will discover', 'will be discovering'],
        correctAnswer: 'will have discovered',
        explanation: '"By 2030" indicates completion before a future year. Formula: will have + V3 ("will have discovered").',
        tenseRule: 'By + future year -> will have + V3'
      },
      {
        id: 'fp-q2',
        tenseId: 'future-perfect',
        category: 'future',
        difficulty: 'Advanced',
        type: 'sentence-correction',
        prompt: 'Find the correction: "She will has finished her degree by next summer."',
        options: [
          'She will have finished her degree by next summer.',
          'She will finish her degree by next summer.',
          'She will having finished her degree by next summer.',
          'She has will finished her degree by next summer.'
        ],
        correctAnswer: 'She will have finished her degree by next summer.',
        explanation: 'Always use "will have", never "will has".',
        tenseRule: 'Modal "will" requires base form "have"'
      },
      {
        id: 'fp-q3',
        tenseId: 'future-perfect',
        category: 'future',
        difficulty: 'Advanced',
        type: 'multiple-choice',
        prompt: 'Which sentence correctly implies completion before a future event?',
        options: [
          'By the time the guests arrive, we will have prepared the banquet.',
          'When guests will arrive, we prepare the banquet.',
          'By the time the guests arrive, we will prepare the banquet.',
          'Guests arrive by the time we will have prepare.'
        ],
        correctAnswer: 'By the time the guests arrive, we will have prepared the banquet.',
        explanation: '"will have prepared" indicates that the banquet preparation is 100% finished before the guests arrive.',
        tenseRule: 'By the time + Present Simple, Future Perfect'
      },
      {
        id: 'fp-q4',
        tenseId: 'future-perfect',
        category: 'future',
        difficulty: 'Advanced',
        type: 'identify-tense',
        prompt: 'Identify the tense: "The courier won\'t have delivered the package before noon."',
        options: ['Future Perfect', 'Future Simple', 'Present Perfect', 'Past Perfect'],
        correctAnswer: 'Future Perfect',
        explanation: '"won\'t have delivered" is will not + have + V3 (past participle).',
        tenseRule: 'Won\'t have + V3'
      },
      {
        id: 'fp-q5',
        tenseId: 'future-perfect',
        category: 'future',
        difficulty: 'Advanced',
        type: 'rearrange-words',
        prompt: 'Form a Future Perfect sentence:',
        scrambledWords: ['written', 'will', 'have', 'his', 'He', 'memoir', 'by', 'December'],
        correctAnswer: 'He will have written his memoir by December',
        explanation: 'Subject (He) + will have + V3 (written) + object (his memoir) + deadline (by December).',
        tenseRule: 'Subject + will have + V3 + by [time]'
      }
    ]
  },

  // ==========================================
  // 12. FUTURE PERFECT CONTINUOUS
  // ==========================================
  {
    id: 'future-perfect-continuous',
    slug: 'future-perfect-continuous',
    name: 'Future Perfect Continuous',
    category: 'future',
    difficulty: 'Advanced',
    shortDescription: 'Emphasizes the continuous ongoing duration of an action up to a specific point or milestone in the future.',
    beginnerExplanation: 'Think of this as standing at a milestone in the future and measuring how LONG you will have been sweating over something up to that exact day. "Next month, I will have been working at this company for 10 years!" It focuses on the continuous endurance and duration up to that future milestone.',
    whenToUse: [
      'Emphasizing how long an ongoing action will have continued up until a future milestone (e.g., In November, they will have been living in Spain for two decades)',
      'Describing the future cause of a future continuous state (e.g., When she crosses the finish line, she will be exhausted because she will have been running for four hours)'
    ],
    whenNotToUse: [
      'Do not use with stative verbs (Say "Next year, I will have known her for 5 years", NOT "will have been knowing").',
      'Do not use if the duration or time period is not emphasized.'
    ],
    formula: {
      affirmative: 'Subject + will have been + V-ing + Object',
      negative: 'Subject + will not have been (won\'t have been) + V-ing + Object',
      question: 'Will + Subject + have been + V-ing + Object?',
      notes: '"Will have been + verb-ing" for all subjects.'
    },
    signalWords: [
      'for [duration] by [future time]', 'by next year', 'by tomorrow', 'by the time', 'how long will you have been...'
    ],
    rules: [
      {
        title: 'Future Perfect vs. Future Perfect Continuous',
        explanation: 'Future Perfect focuses on the finished result or quantity ("By 5 PM, I will have written 10 pages"). Future Perfect Continuous focuses on the continuous passage of time ("By 5 PM, I will have been writing for six straight hours").',
        examples: [
          'Result: She will have published 3 books by 2030.',
          'Duration: She will have been writing novels for 15 years by 2030.'
        ]
      }
    ],
    examples: [
      {
        sentence: 'By the time she retires next March, Professor Davies will have been teaching physics for forty years.',
        highlight: 'will have been teaching',
        meaning: 'Emphasizing the 40-year duration up to her future retirement.'
      },
      {
        sentence: 'At midnight, the pilots will have been flying non-stop for sixteen hours.',
        highlight: 'will have been flying',
        meaning: 'Measuring the continuous duration of flight up to midnight.'
      }
    ],
    commonMistakes: [
      {
        incorrect: 'By next year, I will have been knowing him for a decade.',
        correct: 'By next year, I will have known him for a decade.',
        explanation: '"Know" is stative, so use Future Perfect ("will have known"), not continuous.'
      },
      {
        incorrect: 'She will has been studying for three hours by noon.',
        correct: 'She will have been studying for three hours by noon.',
        explanation: 'Always use "will have been", never "will has been".'
      }
    ],
    realLifeDialogues: [
      {
        speakerA: 'Marathon Announcer',
        lineA: 'Here comes the race leader approaching Mile 24!',
        speakerB: 'Co-Host',
        lineB: 'In just a few minutes, he will have been running at a sub-5-minute pace for over two hours!',
        context: 'Sports broadcasting commentary.'
      }
    ],
    timeline: {
      timePosition: 'future-before-future',
      description: 'An extended ongoing wave running across the future that reaches and measures against a future milestone.',
      visualAnchor: 'Continuous wave culminating at a future milestone'
    },
    tips: [
      'Look for the combination: "By [future date] + for [duration of time]" = Future Perfect Continuous ("will have been + V-ing").'
    ],
    speakingPrompt: {
      prompt: 'Think ahead 5 years from now. What is something you will have been doing for several years by then?',
      modelAnswer: 'Five years from now, I will have been working in software engineering for nearly seven years.',
      tips: 'Use "will have been + verb-ing + for [years]".'
    },
    quickExercises: [
      {
        id: 'fpc-q1',
        tenseId: 'future-perfect-continuous',
        category: 'future',
        difficulty: 'Advanced',
        type: 'fill-in-blank',
        prompt: 'By the time the timer rings at 6:00, the stew _____ simmering for four hours.',
        options: ['will have been', 'will has been', 'is having been', 'will be been'],
        correctAnswer: 'will have been',
        explanation: '"will have been simmering" correctly pairs the future milestone with the four-hour duration.',
        tenseRule: 'Will have been + V-ing'
      },
      {
        id: 'fpc-q2',
        tenseId: 'future-perfect-continuous',
        category: 'future',
        difficulty: 'Advanced',
        type: 'sentence-correction',
        prompt: 'Identify the correction: "In June, we will has been living in Tokyo for five years."',
        options: [
          'In June, we will have been living in Tokyo for five years.',
          'In June, we will be living in Tokyo for five years.',
          'In June, we will have lived in Tokyo for five years only.',
          'In June, we will been living in Tokyo for five years.'
        ],
        correctAnswer: 'In June, we will have been living in Tokyo for five years.',
        explanation: 'Change "will has" to "will have been living".',
        tenseRule: 'Will + have been + V-ing'
      },
      {
        id: 'fpc-q3',
        tenseId: 'future-perfect-continuous',
        category: 'future',
        difficulty: 'Advanced',
        type: 'multiple-choice',
        prompt: 'Which sentence correctly emphasizes duration up to a future milestone?',
        options: [
          'By 9 PM, the actors will have been rehearsing for seven straight hours.',
          'By 9 PM, the actors will rehearse seven straight hours.',
          'By 9 PM, the actors were rehearsing for seven hours.',
          'By 9 PM, the actors will be rehearse for seven straight hours.'
        ],
        correctAnswer: 'By 9 PM, the actors will have been rehearsing for seven straight hours.',
        explanation: 'Will have been rehearsing emphasizes continuous duration up to 9 PM.',
        tenseRule: 'Will have been + V-ing for future duration'
      },
      {
        id: 'fpc-q4',
        tenseId: 'future-perfect-continuous',
        category: 'future',
        difficulty: 'Advanced',
        type: 'identify-tense',
        prompt: 'Identify the tense: "By 2028, will they have been researching quantum computing for a decade?"',
        options: ['Future Perfect Continuous', 'Future Perfect', 'Future Continuous', 'Past Perfect Continuous'],
        correctAnswer: 'Future Perfect Continuous',
        explanation: 'Form: Will + they + have been + researching (V-ing).',
        tenseRule: 'Will + Subject + have been + V-ing?'
      },
      {
        id: 'fpc-q5',
        tenseId: 'future-perfect-continuous',
        category: 'future',
        difficulty: 'Advanced',
        type: 'rearrange-words',
        prompt: 'Assemble into a correct sentence:',
        scrambledWords: ['been', 'have', 'will', 'She', 'driving', 'hours', 'by', 'sunset', 'for', 'six'],
        correctAnswer: 'She will have been driving for six hours by sunset',
        explanation: 'Subject (She) + will have been + V-ing (driving) + duration (for six hours) + milestone (by sunset).',
        tenseRule: 'Subject + will have been + V-ing + duration + by [milestone]'
      }
    ]
  }
];

// Helper maps & getters
export const TENSES_BY_ID = new Map(TENSES_DATA.map((t) => [t.id, t]));
export const TENSES_BY_SLUG = new Map(TENSES_DATA.map((t) => [t.slug, t]));

export const PRESENT_TENSES = TENSES_DATA.filter((t) => t.category === 'present');
export const PAST_TENSES = TENSES_DATA.filter((t) => t.category === 'past');
export const FUTURE_TENSES = TENSES_DATA.filter((t) => t.category === 'future');
