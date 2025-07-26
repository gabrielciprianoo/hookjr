export const speakText = (text: string, onEnd?: () => void) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "es-MX"; // o "en-US" si tu app es en inglés
  utterance.rate = 1.1;
  utterance.pitch = 1.5;
  utterance.volume = 1;

  // Buscar voz amigable (opcional)
  const voices = speechSynthesis.getVoices();
  const preferredVoice = voices.find((v) =>
    v.name.toLowerCase().includes("microsoft") || v.name.toLowerCase().includes("google")
  );
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }

  // Callback al terminar
  utterance.onend = () => {
    console.log("✅ Terminó de hablar");
    if (onEnd) onEnd();
  };

  speechSynthesis.speak(utterance);
};

// Precarga voces si el navegador lo requiere
export const preloadVoices = () => {
  speechSynthesis.onvoiceschanged = () => {
    speechSynthesis.getVoices();
  };
};
