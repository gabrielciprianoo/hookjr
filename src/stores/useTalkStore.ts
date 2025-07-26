import { create } from "zustand";
import { recordAudioControlled, stopRecording } from "../services/voiceService";
import { transcribeWithWhisper } from "../services/transcribeService";
import { askChatGPT as fetchResponse } from "../services/chatService";
import { speakText } from "../services/textToSpeechService";
import { sanitizeForSpeech } from "../utils";

type TalkStore = {
  isListening: boolean;
  isThinking: boolean;
  isSpeaking: boolean;
  transcript: string;
  response: string;

  startListening: () => Promise<void>;
  stopListening: () => void;
  transcribeAudio: (audio: Blob) => Promise<void>;
  askChatGPT: (prompt: string) => Promise<void>;
  speakResponse: (text: string) => void;

  reset: () => void;
};

export const useTalkStore = create<TalkStore>((set, get) => ({
  isListening: false,
  isThinking: false,
  isSpeaking: false,
  transcript: "",
  response: "",

  // Fase 1: Grabación
  startListening: async () => {
    console.log("🎙️ Iniciando grabación...");
    set({ isListening: true, transcript: "", response: "" });

    try {
      const audioBlob = await recordAudioControlled();
      set({ isListening: false });
      console.log("📤 Audio capturado, enviando a Whisper...");

      await get().transcribeAudio(audioBlob);
    } catch (err) {
      console.error("❌ Error en grabación:", err);
      set({ isListening: false });
    }
  },

  stopListening: () => {
    console.log("⏹️ Deteniendo grabación manualmente...");
    stopRecording();
    set({ isListening: false });
  },

  // Fase 2: Transcripción (Whisper)
  transcribeAudio: async (audio: Blob) => {
  try {
    console.log("📝 Enviando audio a Whisper...");
    const text = await transcribeWithWhisper(audio);
    console.log("✅ Transcripción:", text);
    set({ transcript: text });

    // 👉 Aquí se lanza la siguiente fase automáticamente
    await get().askChatGPT(text);
  } catch (err) {
    console.error("❌ Error al transcribir:", err);
  }
},

  // Fase 3: Preguntar a ChatGPT
  askChatGPT: async (prompt: string) => {
  console.log("🤖 Enviando a ChatGPT:", prompt);
  set({ isThinking: true });

  try {
    const answer = await fetchResponse(prompt);
    console.log("✅ Respuesta:", answer);
    set({ response: answer });
    get().speakResponse(answer);
  } catch (err) {
    console.error("❌ Error en ChatGPT:", err);
    set({ response: "Lo siento, no entendí bien." });
  } finally {
    set({ isThinking: false });
  }
},

  // Fase 4: Respuesta hablada
  speakResponse: (text: string) => {
  console.log("🗣️ Leyendo en voz alta:", text);
  const cleanedText = sanitizeForSpeech(text);
  set({ isSpeaking: true });
  speakText(cleanedText); 
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
