import { useTalkStore } from "../stores/useTalkStore";

const TalkButton = () => {
  const isListening = useTalkStore((state) => state.isListening);
  const startListening = useTalkStore((state) => state.startListening);
  const stopListening = useTalkStore((state) => state.stopListening);

  const handleClick = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
      <button
        onClick={handleClick}
        className={`px-6 py-3 rounded-full cursor-pointer text-white text-lg font-medium backdrop-blur-md shadow-md transition-all duration-300 ${
          isListening
            ? "bg-red-600 hover:bg-red-700"
            : "bg-white/10 hover:bg-white/20"
        }`}
      >
        {isListening ? "⏹️ Detener" : "🎙️ Hablar con Hook JR"}
      </button>
    </div>
  );
};

export default TalkButton;
