import * as Speech from 'expo-speech';

class TtsService {
  async speak(text: string): Promise<void> {
    if (!text) {
      return;
    }

    await new Promise<void>((resolve) => {
      Speech.speak(text, {
        language: 'en-US',
        pitch: 1,
        rate: 0.96,
        onDone: () => resolve(),
        onStopped: () => resolve(),
        onError: () => resolve()
      });
    });
  }

  stop(): void {
    Speech.stop();
  }
}

export const ttsService = new TtsService();
