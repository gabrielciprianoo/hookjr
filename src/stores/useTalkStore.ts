
import { create } from "zustand";

type TalkStore = {
  isListening: boolean;
  isThinking: boolean;
  isSpeaking: boolean;
  transcript: string;
  response: string;

  startListening: () => void;
  stopListening: () => void;
  transcribeAudio: (audio: Blob) => Promise<void>;
  askChatGPT: (prompt: string) => Promise<void>;
  speakResponse: (text: string) => void;

  reset: () => void;
};

export const useTalkStore = create<TalkStore>((set) => ({
  isListening: false,
  isThinking: false,
  isSpeaking: false,
  transcript: "",
  response: "",

  // Fase 1: Grabación
  startListening: () => {
    console.log("🎙️ Iniciando grabación...");
    set({ isListening: true });
    // lógica después
  },

  stopListening: () => {
    console.log("⏹️ Deteniendo grabación...");
    set({ isListening: false });
    // lógica después
  },

  // Fase 2: Transcripción (Whisper)
  transcribeAudio: async (audio: Blob) => {
    console.log("📝 Enviando audio a transcripción...");
    // lógica después
  },

  // Fase 3: Preguntar a ChatGPT
  askChatGPT: async (prompt: string) => {
    console.log("🤖 Enviando a ChatGPT:", prompt);
    set({ isThinking: true });
    // lógica después
    set({ isThinking: false });
  },

  // Fase 4: Respuesta hablada
  speakResponse: (text: string) => {
    console.log("🗣️ Leyendo en voz alta:", text);
    set({ isSpeaking: true });
    // lógica después
    set({ isSpeaking: false });
  },

  // Reset del flujo
  reset: () => {
    console.log("🔄 Reiniciando flujo");
    set({
      isListening: false,
      isThinking: false,
      isSpeaking: false,
      transcript: "",
      response: "",
    });
  },
}));
