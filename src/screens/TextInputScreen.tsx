import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientBackground } from '@/components/GradientBackground';
import { theme } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation/AppNavigator';
import { backendService } from '@/services/backendService';
import { ttsService } from '@/services/ttsService';
import { pushHistory, setLatestResponse, setLoading } from '@/store/appStore';
import { useAppDispatch } from '@/store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'TextInput'>;

export const TextInputScreen = ({ navigation }: Props) => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const submitText = async (): Promise<void> => {
    if (!text.trim()) {
      Alert.alert('Please enter text');
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await backendService.analyzeText(text.trim());
      dispatch(setLatestResponse(response));
      dispatch(
        pushHistory({
          id: Date.now().toString(),
          source: 'text',
          inputSummary: text.slice(0, 20),
          responseText: response.text_response,
          confidence: response.confidence,
          createdAt: new Date().toISOString()
        })
      );
      await ttsService.speak(response.text_response);
      navigation.navigate('Response');
    } catch {
      Alert.alert('Text request failed');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Text</Text>
        <TextInput
          multiline
          numberOfLines={5}
          value={text}
          onChangeText={setText}
          style={styles.input}
          placeholder="Type your question or instruction"
        />
        <Pressable style={styles.primaryButton} onPress={submitText}>
          <Text style={styles.primaryButtonText}>Send to Backend</Text>
        </Pressable>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md },
  title: { fontSize: theme.typography.title, fontWeight: '800', color: theme.colors.text },
  input: {
    marginTop: theme.spacing.md,
    minHeight: 130,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    textAlignVertical: 'top',
    color: theme.colors.text
  },
  primaryButton: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md
  },
  primaryButtonText: { textAlign: 'center', color: theme.colors.card, fontWeight: '700' }
});
