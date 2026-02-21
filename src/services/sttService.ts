import Voice from '@react-native-voice/voice';

export type SttResult = {
  text: string;
};

class SttService {
  private transcript = '';

  constructor() {
    Voice.onSpeechResults = (event) => {
      this.transcript = event.value?.[0] ?? '';
    };
  }

  async start(locale = 'en-US'): Promise<void> {
    this.transcript = '';
    await Voice.start(locale);
  }

  async stop(): Promise<SttResult> {
    await Voice.stop();
    return { text: this.transcript };
  }

  async destroy(): Promise<void> {
    await Voice.destroy();
  }
}

export const sttService = new SttService();
