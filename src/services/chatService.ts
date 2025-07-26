// services/chatService.ts

export const askChatGPT = async (prompt: string): Promise<string> => {
  const fullPrompt = `Responde como un robot simpático y amistoso llamado Hook JR. Sé breve y divertido. Mensajes cortos, fáciles de entender solo en texto sin emojis.\nUsuario: ${prompt}\nHook JR:`;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "Eres Hook JR, un pequeño robot muy alegre y simpático." },
        { role: "user", content: fullPrompt },
      ],
      temperature: 0.7,
      max_tokens: 80,
    }),
  });

  const data = await res.json();

  if (data?.choices?.[0]?.message?.content) {
    return data.choices[0].message.content.trim();
  } else {
    throw new Error("Error al recibir respuesta de ChatGPT");
  }
};
