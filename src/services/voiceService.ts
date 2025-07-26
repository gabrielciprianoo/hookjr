let mediaRecorder: MediaRecorder | null = null;
let stream: MediaStream | null = null;

export const recordAudioControlled = (): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const startRecording = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        const chunks: Blob[] = [];

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);

        mediaRecorder.onstop = () => {
          stream?.getTracks().forEach((track) => track.stop());
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          resolve(audioBlob);
          mediaRecorder = null;
          stream = null;
        };

        mediaRecorder.onerror = (e) => {
          stream?.getTracks().forEach((track) => track.stop());
          reject(e);
        };

        mediaRecorder.start();
      } catch (err) {
        reject(err);
      }
    };

    startRecording();
  });
};

export const stopRecording = () => {
  if (mediaRecorder && mediaRecorder.state !== "inactive") {
    mediaRecorder.stop();
  }
};
