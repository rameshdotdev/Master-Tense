import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini Client Initialization (Lazy)
  let aiClient: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI {
    if (!aiClient) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not set.');
      }
      aiClient = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });
    }
    return aiClient;
  }

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // Explain Grammar Reasoning API using Gemini
  app.post('/api/explain-grammar', async (req, res) => {
    const {
      prompt,
      userAnswer,
      correctAnswer,
      isCorrect,
      tenseName,
      tenseId,
      staticExplanation,
    } = req.body;

    if (!prompt || !correctAnswer) {
      return res.status(400).json({ error: 'Missing required prompt or correctAnswer' });
    }

    // If GEMINI_API_KEY is not configured, supply high-quality fallback
    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        source: 'fallback',
        verdict: isCorrect
          ? `Correct! "${userAnswer}" is the proper grammatical choice.`
          : `The correct answer is "${correctAnswer}", while your answer was "${userAnswer || '(unanswered)'}".`,
        grammaticalReasoning:
          staticExplanation ||
          `This question tests the ${tenseName || tenseId || 'tense'} structure. The correct form "${correctAnswer}" reflects the appropriate grammatical aspect and time reference.`,
        whyUserAnswerWorkedOrFailed: isCorrect
          ? `Your choice fits the timeline and subject-verb agreement required by the sentence.`
          : `"${userAnswer || 'Leaving it blank'}" does not match the temporal markers or verb aspect expected in this context.`,
        signalClues: ['Grammar rule alignment', 'Time marker context'],
        memoryTip:
          'Always identify the timeline trigger words (such as "since", "for", "yesterday", or "by tomorrow") to determine the correct tense.',
      });
    }

    try {
      const ai = getGeminiClient();

      const userPrompt = `You are an expert English grammar educator analyzing a student's answer in an English tenses assessment.

Question Prompt / Sentence: "${prompt}"
Tense Tested: "${tenseName || tenseId || 'English Verb Tense'}"
Student's Chosen Answer: "${userAnswer || '(no answer provided)'}"
Correct Answer: "${correctAnswer}"
Is Student's Answer Correct?: ${isCorrect ? 'YES (CORRECT)' : 'NO (INCORRECT)'}
Baseline Explanation: "${staticExplanation || ''}"

Please provide a deep, pedagogical, encouraging grammatical explanation of:
1. Verdict: A clear, concise summary statement.
2. Grammatical Reasoning: Why "${correctAnswer}" is the precise tense form needed (mention timeline, verb aspect, auxiliary verbs, and temporal reference).
3. Why the Student's Answer Worked or Failed: If correct, explain why their choice fits so well. If incorrect, explain the exact grammatical flaw or misconception behind "${userAnswer}" (e.g., tense clash, wrong auxiliary, continuous vs simple aspect).
4. Signal Clues: List the specific keywords, clues, or time markers in the sentence that give away the answer.
5. Memory Tip: A punchy, easy-to-remember rule of thumb or mnemonic for this specific grammar rule.`;

      const modelsToTry = ['gemini-3.8-flash', 'gemini-3.1-flash-lite'];
      let lastError: any = null;
      let text: string | null = null;

      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents: userPrompt,
            config: {
              systemInstruction:
                'You are an encouraging, expert English grammar tutor. You explain why answers are right or wrong using precise grammatical reasoning, timeline clarity, and practical learner tips without excessive academic jargon.',
              responseMimeType: 'application/json',
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  verdict: {
                    type: Type.STRING,
                    description: 'A 1-sentence verdict on whether the answer was correct and why.',
                  },
                  grammaticalReasoning: {
                    type: Type.STRING,
                    description:
                      'Detailed explanation of the tense rule, aspect, auxiliary verbs, and timeline.',
                  },
                  whyUserAnswerWorkedOrFailed: {
                    type: Type.STRING,
                    description:
                      'Specific breakdown of why the student answer is grammatically sound or why it failed.',
                  },
                  signalClues: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description:
                      'List of signal words, keywords, or time markers that indicate the tense.',
                  },
                  memoryTip: {
                    type: Type.STRING,
                    description: 'A punchy, memorable tip or mnemonic to remember this tense rule.',
                  },
                },
                required: [
                  'verdict',
                  'grammaticalReasoning',
                  'whyUserAnswerWorkedOrFailed',
                  'signalClues',
                  'memoryTip',
                ],
              },
            },
          });

          if (response.text) {
            text = response.text;
            break;
          }
        } catch (mErr) {
          lastError = mErr;
          console.warn(`Model ${modelName} encountered error, trying fallback if available:`, mErr);
        }
      }

      if (!text) {
        throw lastError || new Error('Gemini model returned empty text');
      }

      const parsed = JSON.parse(text);
      return res.json({
        source: 'gemini',
        ...parsed,
      });
    } catch (err: any) {
      console.error('Gemini explanation error:', err);
      return res.json({
        source: 'fallback',
        verdict: isCorrect
          ? `Correct! "${userAnswer}" matches the expected tense structure.`
          : `The correct answer is "${correctAnswer}", while your answer was "${userAnswer || '(unanswered)'}".`,
        grammaticalReasoning:
          staticExplanation ||
          `This sentence uses ${tenseName || tenseId || 'the target tense'}. The correct form "${correctAnswer}" satisfies the auxiliary and participle requirements.`,
        whyUserAnswerWorkedOrFailed: isCorrect
          ? `You selected the right aspect and auxiliary combination for this sentence.`
          : `"${userAnswer}" does not follow the correct tense formula or timeframe for this sentence context.`,
        signalClues: ['Grammatical agreement', 'Tense formula match'],
        memoryTip: `Review the rule for ${tenseName || 'this tense'} to reinforce when to use this verb form.`,
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
