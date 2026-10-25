import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
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

export async function handleGeminiChat(body: {
  message: string;
  history?: Array<{ role: 'user' | 'model'; text: string }>;
  language?: 'darija' | 'ar' | 'en';
}): Promise<{ reply: string }> {
  const { message, history = [], language = 'darija' } = body;
  const ai = getAiClient();

  const langInstructions = {
    darija: 'Respond primarily in Moroccan Darija (using Arabic script, optionally with franco terms) mixed with German phrases, humor, and Moroccan cultural references (Bouchaib, Jens, atay, moqaddem, BVG, Lidl, etc.).',
    ar: 'Respond primarily in Modern Standard Arabic (العربية الفصحى) mixed with German explanations and cultural humor.',
    en: 'Respond in clear English mixed with German explanations, false-friends comparisons (Denglisch), and relatable humor.',
  }[language] || 'Respond in Moroccan Darija and German.';

  const systemInstruction = `You are "Ostaz Bouchaib-Hans" (أستاذ بوشعيب-هانس), the legendary Moroccan-German language tutor in Berlin.
You are warm, funny, culturally sharp, and an expert German teacher (A1 to B2).
Your goal is to help Moroccan learners master German without fear.
Tone: Hilarious, supportive, authentic, engaging.
Language rule: ${langInstructions}
Always highlight German vocabulary and grammar endings clearly in **bold**.
Whenever explaining German nouns, specify their gender (der / die / das / Plural).
If the user speaks broken German, praise their courage, gently point out the mistake, and give the correct sentence with pronunciation tips.
Keep answers concise (under 180 words) and actionable, with bullet points if helpful.`;

  if (!ai) {
    // Elegant fallback if GEMINI_API_KEY is not configured yet
    const fallbacks: Record<string, string> = {
      darija: `أهلاً بك أ سيدي! أنا أستاذ بوشعيب-هانس. شفت السؤال ديالك: "${message}". 
في الألمانية، السر هو تفرّق بين **der (مذكر)**، **die (مؤنث)**، و **das (محايد)**. 
وما تنساش: فاش تكون غادي فـ برلين ويسولك الكونترولور ديال BVG على **das Ticket**، تجبدو بالزربة! 
باش نهضرو لايڤ بالذكاء الاصطناعي، تأكد بلي **GEMINI_API_KEY** محطوط فـ الإعدادات.`,
      ar: `مرحباً بك! أنا أستاذ بوشعيب-هانس. اطلعت على سؤالك: "${message}". 
في اللغة الألمانية تذكر دائماً تصريف الأفعال: **ich gehe**, **du gehst**, **er/sie geht**.
لتفعيل الردود الذكية المباشرة عبر الذكاء الاصطناعي، يرجى تفعيل مفتاح **GEMINI_API_KEY** في الإعدادات.`,
      en: `Welcome! I am Ostaz Bouchaib-Hans. Regarding your question: "${message}". 
In German, remember: the verb always lands in position 2 in a main clause, but subordinate connectors like **weil** kick it to the very end! 
To unlock live interactive AI generation, ensure your **GEMINI_API_KEY** is configured in Secrets.`,
    };
    return { reply: fallbacks[language] || fallbacks.darija };
  }

  try {
    const formattedContents = [
      ...history.map((h) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const reply = response.text || 'عذراً، لم أستطع توليد الجواب حالياً. عاود جرّب!';
    return { reply };
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return {
      reply: `مرحباً! وقع واحد العطب تقني بسيط فـ الاتصال: ${err?.message || 'Error'}. أستاذ بوشعيب كينصحك ترتاح وتشرب كاس د أتاي وتعاود تسولني!`,
    };
  }
}

export async function handleGeminiTts(body: {
  text: string;
}): Promise<{ audioBase64?: string; error?: string }> {
  const { text } = body;
  const ai = getAiClient();
  if (!ai || !text) {
    return { error: 'TTS not available without API key or text' };
  }

  try {
    const cleanText = text.replace(/[\(\)\[\]\{\}\*\_]/g, '').trim();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `Sprich diesen deutschen Satz mit klarer, akzentfreier deutscher Aussprache: "${cleanText}"`,
              speechMetadata: {
                style: 'Clear, authentic native German speaker with natural articulation',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const audioBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (audioBase64) {
      return { audioBase64 };
    }
    return { error: 'No audio part returned' };
  } catch (err: any) {
    console.error('TTS Generation error:', err);
    return { error: err.message || 'TTS Error' };
  }
}
