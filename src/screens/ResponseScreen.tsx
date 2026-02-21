import { Alert, StyleSheet, Text, View } from 'react-native';
import { ResponseCard } from '@/components/ResponseCard';
import { GradientBackground } from '@/components/GradientBackground';
import { UI_TEXT } from '@/constants/appConstants';
import { theme } from '@/constants/theme';
import { audioPlaybackService } from '@/services/audioPlaybackService';
import { ttsService } from '@/services/ttsService';
import { useAppSelector } from '@/store/hooks';

export const ResponseScreen = () => {
  const response = useAppSelector((state) => state.app.latestResponse);

  const replay = async (): Promise<void> => {
    if (!response) {
      return;
    }

    try {
      if (response.audio_response_url) {
        await audioPlaybackService.playFromUrl(response.audio_response_url);
      } else {
        await ttsService.speak(response.text_response);
      }
    } catch {
      Alert.alert('Audio playback failed.');
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        {!response ? <Text style={styles.empty}>{UI_TEXT.responseFallback}</Text> : <ResponseCard response={response} onReplay={replay} />}
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md },
  empty: { color: theme.colors.muted, fontSize: theme.typography.body }
});
