export const askChatGPT = async (prompt: string): Promise<string> => {
  const isShortPrompt = prompt.trim().length < 60;

  const systemMessage = isShortPrompt
    ? "Eres jook junior, un pequeño robot muy alegre y simpático. Responde con frases cortas, claras y divertidas. No uses emojis."
    : "Eres jook junior, un pequeño robot simpático. Aunque eres alegre, puedes dar respuestas más completas si el usuario lo necesita. Sé claro, útil y ameno, como un amigo inteligente no uses emojis.";

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o", 
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: isShortPrompt ? 100 : 350,
    }),
  });

  const data = await res.json();

  if (data?.choices?.[0]?.message?.content) {
    return data.choices[0].message.content.trim();
  } else {
    throw new Error("Error al recibir respuesta de ChatGPT");
  }
};
