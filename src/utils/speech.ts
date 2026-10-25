/**
 * Audio synthesis utility for German pronunciation.
 * Combines reliable browser SpeechSynthesis (with strict de-DE voice detection)
 * and high-fidelity native German server-side TTS fallback so words are never
 * mispronounced with an English accent.
 */

const audioCache = new Map<string, string>();
let isFetchingVoices = false;

function getAllVoicesAsync(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const currentVoices = window.speechSynthesis.getVoices();
    if (currentVoices && currentVoices.length > 0) {
      resolve(currentVoices);
      return;
    }

    // Wait for voiceschanged event if initially empty
    let timer: any = null;
    const handleVoices = () => {
      clearTimeout(timer);
      const loaded = window.speechSynthesis.getVoices();
      resolve(loaded);
    };

    window.speechSynthesis.onvoiceschanged = handleVoices;
    timer = setTimeout(() => {
      resolve(window.speechSynthesis.getVoices() || []);
    }, 400);
  });
}

async function findGermanVoice(): Promise<SpeechSynthesisVoice | null> {
  const voices = await getAllVoicesAsync();
  if (!voices || voices.length === 0) return null;

  // Filter for genuine German voices
  const germanVoices = voices.filter((v) => {
    const lang = (v.lang || '').toLowerCase();
    const name = (v.name || '').toLowerCase();
    return (
      lang.startsWith('de') ||
      lang.includes('de-de') ||
      lang.includes('de_de') ||
      lang.includes('de-at') ||
      lang.includes('de-ch') ||
      name.includes('deutsch') ||
      name.includes('german') ||
      name.includes('marlene') ||
      name.includes('vicki') ||
      name.includes('hans') ||
      name.includes('stefan') ||
      name.includes('katja') ||
      name.includes('hedda')
    );
  });

  if (germanVoices.length === 0) return null;

  // Prefer Google, Natural or de-DE voices
  return (
    germanVoices.find((v) => v.name.includes('Google') || v.name.includes('Natural')) ||
    germanVoices.find((v) => v.lang.toLowerCase() === 'de-de') ||
    germanVoices[0]
  );
}

async function playAudioUrl(url: string, rate: number): Promise<void> {
  return new Promise((resolve) => {
    try {
      const audio = new Audio(url);
      audio.playbackRate = Math.max(0.5, Math.min(rate, 1.5));
      audio.onended = () => resolve();
      audio.onerror = () => resolve();
      audio.play().catch(() => resolve());
    } catch {
      resolve();
    }
  });
}

export async function playGermanSpeech(text: string, rate: number = 1.0): Promise<void> {
  if (typeof window === 'undefined') return;

  const cleanText = text
    .replace(/[\(\)\[\]\{\}\*\_]/g, '')
    .replace(/^(\d+\.\s*)/, '')
    .trim();

  if (!cleanText) return;

  // Check in-memory audio cache
  const cachedBase64 = audioCache.get(cleanText);
  if (cachedBase64) {
    await playAudioUrl(`data:audio/wav;base64,${cachedBase64}`, rate);
    return;
  }

  // Check if browser has a native German voice installed
  const germanVoice = await findGermanVoice();

  if (germanVoice && 'speechSynthesis' in window) {
    return new Promise((resolve) => {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.voice = germanVoice;
        utterance.lang = germanVoice.lang || 'de-DE';
        utterance.rate = Math.max(0.5, Math.min(rate, 1.5));
        utterance.pitch = 1.0;

        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();

        window.speechSynthesis.speak(utterance);
      } catch {
        resolve();
      }
    });
  }

  // If browser has NO German voice installed, fallback to Server-Side Gemini Native German TTS
  try {
    const res = await fetch('/api/gemini/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        audioCache.set(cleanText, data.audioBase64);
        await playAudioUrl(`data:audio/wav;base64,${data.audioBase64}`, rate);
        return;
      }
    }
  } catch (err) {
    console.warn('Server TTS unavailable, falling back to Web Speech with de-DE tag:', err);
  }

  // Fallback if network or server unavailable: force de-DE language tag
  if ('speechSynthesis' in window) {
    return new Promise((resolve) => {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'de-DE';
        utterance.rate = Math.max(0.5, Math.min(rate, 1.5));
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      } catch {
        resolve();
      }
    });
  }
}
