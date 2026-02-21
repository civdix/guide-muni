import { Audio } from 'expo-av';

class AudioPlaybackService {
  private currentSound: Audio.Sound | null = null;

  async playFromUrl(url: string): Promise<void> {
    await this.stop();
    const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
    this.currentSound = sound;
  }

  async stop(): Promise<void> {
    if (this.currentSound) {
      await this.currentSound.stopAsync();
      await this.currentSound.unloadAsync();
      this.currentSound = null;
    }
  }
}

export const audioPlaybackService = new AudioPlaybackService();
