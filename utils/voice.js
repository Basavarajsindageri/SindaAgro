// Voice Utility: Web Speech API (TTS & STT) supporting en-IN, kn-IN, hi-IN

export const speakText = (text, lang = 'en') => {
  if (!('speechSynthesis' in window)) {
    console.warn('Text-to-speech not supported in this browser.');
    return false;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);

  // Map app languages to BCP-47 tags
  const langTagMap = {
    en: 'en-IN',
    kn: 'kn-IN',
    hi: 'hi-IN'
  };

  utterance.lang = langTagMap[lang] || 'en-IN';
  utterance.rate = 0.95; // slightly relaxed rate for clarity
  utterance.pitch = 1.0;

  // Try to find matching voice for language
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.toLowerCase().includes(lang.toLowerCase()) || v.lang.startsWith(utterance.lang));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
  return true;
};

export const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
};

export const listenVoiceInput = (lang = 'en', onResult, onError, onEnd) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    if (onError) onError('Speech recognition is not supported in your browser.');
    return null;
  }

  const recognition = new SpeechRecognition();
  const langTagMap = {
    en: 'en-IN',
    kn: 'kn-IN',
    hi: 'hi-IN'
  };

  recognition.lang = langTagMap[lang] || 'en-IN';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    if (onResult) onResult(transcript);
  };

  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.start();
  return recognition;
};
