export const speakText = (text: string, onEnd?: () => void) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-MX";
  utterance.pitch = 1.6;  // ✅ tono más agudo
  utterance.rate = 1.15;  // ✅ ritmo más animado
  utterance.volume = 1;

  const voices = speechSynthesis.getVoices();
  const preferredVoice = voices.find((v) =>
    v.name.toLowerCase().includes("sabina") ||
    v.name.toLowerCase().includes("female") ||
    v.name.toLowerCase().includes("google")
  );

  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  utterance.onend = () => {
    if (onEnd) onEnd();
  };

  speechSynthesis.speak(utterance);
};
