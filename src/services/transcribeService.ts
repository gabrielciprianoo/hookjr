export const transcribeWithWhisper = async (audio: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append("file", audio, "voice.webm");
  formData.append("model", "whisper-1");

  const response = await fetch("https://api.openai.com/v1/audio/transcriptions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
    },
    body: formData,
  });

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.text;
};
