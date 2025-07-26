export const sanitizeForSpeech = (text: string): string => {
  return text
    .replace(/#+\s*/g, "")                    // elimina títulos markdown
    .replace(/\*\*(.*?)\*\*/g, "$1")          // elimina negritas
    .replace(/\*(.*?)\*/g, "$1")              // elimina cursivas
    .replace(/`([^`]+)`/g, "$1")              // elimina código inline
    .replace(/[-*]\s/g, "")                   // elimina bullets
    .replace(/\n+/g, ". ")                    // cambia saltos de línea por pausas
    .replace(/\s{2,}/g, " ")                  // limpia espacios extra
    .trim();
};
