// services/textToSpeechService.ts
export const speakText = (text: string): Promise<void> => {
  return new Promise((resolve) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.4;
    utterance.rate = 0.9;
    utterance.volume = 1;
    utterance.lang = "es-MX";

    utterance.onend = () => {
      resolve();
    };

    speechSynthesis.speak(utterance);
  });
};
