import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientBackground } from '@/components/GradientBackground';
import { APP_CONSTANTS, UI_TEXT } from '@/constants/appConstants';
import { theme } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation/AppNavigator';
import { backendService } from '@/services/backendService';
import { sttService } from '@/services/sttService';
import { ttsService } from '@/services/ttsService';
import { pushHistory, setLatestResponse, setLoading } from '@/store/appStore';
import { useAppDispatch } from '@/store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Voice'>;

export const VoiceScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const [transcript, setTranscript] = useState('');
  const [mode, setMode] = useState<'raw' | 'stt'>('stt');

  const startListening = async (): Promise<void> => {
    try {
      await sttService.start(APP_CONSTANTS.defaultLocale);
    } catch {
      Alert.alert('Speech recognition failed to start');
    }
  };

  const stopAndSend = async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      const result = await sttService.stop();
      setTranscript(result.text);
      const response =
        mode === 'raw'
          ? await backendService.analyzeAudio('file://voice-input.m4a', result.text)
          : await backendService.analyzeText(result.text);

      dispatch(setLatestResponse(response));
      dispatch(
        pushHistory({
          id: Date.now().toString(),
          source: 'voice',
          inputSummary: result.text.slice(0, 20) || 'Voice query',
          responseText: response.text_response,
          confidence: response.confidence,
          createdAt: new Date().toISOString()
        })
      );

      await ttsService.speak(response.text_response);
      navigation.navigate('Response');
    } catch {
      Alert.alert('Unable to process voice request. Try again.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Voice Input</Text>
        <Text style={styles.preview}>Transcription preview: {transcript || UI_TEXT.voicePlaceholder}</Text>

        <View style={styles.row}>
          <Pressable style={[styles.chip, mode === 'stt' && styles.chipActive]} onPress={() => setMode('stt')}>
            <Text style={styles.chipText}>Speech ➜ Text</Text>
          </Pressable>
          <Pressable style={[styles.chip, mode === 'raw' && styles.chipActive]} onPress={() => setMode('raw')}>
            <Text style={styles.chipText}>Send raw audio</Text>
          </Pressable>
        </View>

        <Pressable style={styles.primaryButton} onPress={startListening}>
          <Text style={styles.primaryButtonText}>Start Listening</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={stopAndSend}>
          <Text style={styles.secondaryButtonText}>Stop & Send</Text>
        </Pressable>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md },
  title: { fontSize: theme.typography.title, fontWeight: '800', color: theme.colors.text },
  preview: { marginTop: theme.spacing.sm, color: theme.colors.muted },
  row: { flexDirection: 'row', gap: theme.spacing.sm, marginTop: theme.spacing.md },
  chip: { backgroundColor: theme.colors.card, padding: theme.spacing.sm, borderRadius: theme.radius.md },
  chipActive: { borderWidth: 1, borderColor: theme.colors.primary },
  chipText: { fontWeight: '600', color: theme.colors.text },
  primaryButton: {
    marginTop: theme.spacing.lg,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md
  },
  primaryButtonText: { textAlign: 'center', color: theme.colors.card, fontWeight: '800' },
  secondaryButton: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md
  },
  secondaryButtonText: { textAlign: 'center', color: theme.colors.text, fontWeight: '700' }
});
