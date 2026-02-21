import { useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientBackground } from '@/components/GradientBackground';
import { theme } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation/AppNavigator';
import { backendService } from '@/services/backendService';
import { ttsService } from '@/services/ttsService';
import { pushHistory, setLatestResponse, setLoading } from '@/store/appStore';
import { useAppDispatch } from '@/store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Location'>;

export const LocationScreen = ({ navigation }: Props) => {
  const [summary, setSummary] = useState('No location fetched yet');
  const dispatch = useAppDispatch();

  const detectAndSend = async (): Promise<void> => {
    dispatch(setLoading(true));
    try {
      const permission = await Location.requestForegroundPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Location permission denied');
        return;
      }

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.BestForNavigation
      });

      const payload = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        altitude: position.coords.altitude,
        accuracy: position.coords.accuracy,
        source: 'fused' as const,
        timestamp: position.timestamp
      };

      setSummary(
        `Lat: ${payload.latitude.toFixed(5)}  Lng: ${payload.longitude.toFixed(5)}\nAccuracy: ${Math.round(
          payload.accuracy ?? 0
        )}m`
      );

      const response = await backendService.analyzeLocation(payload);
      dispatch(setLatestResponse(response));
      dispatch(
        pushHistory({
          id: Date.now().toString(),
          source: 'location',
          inputSummary: `${payload.latitude.toFixed(3)},${payload.longitude.toFixed(3)}`,
          responseText: response.text_response,
          confidence: response.confidence,
          createdAt: new Date().toISOString()
        })
      );

      await ttsService.speak(response.text_response);
      navigation.navigate('Response');
    } catch {
      Alert.alert('Unable to fetch location insight');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <GradientBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Location Module</Text>
        <Text style={styles.summary}>{summary}</Text>
        <Pressable style={styles.primaryButton} onPress={detectAndSend}>
          <Text style={styles.primaryButtonText}>Detect Location & Send</Text>
        </Pressable>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md },
  title: { fontSize: theme.typography.title, fontWeight: '800', color: theme.colors.text },
  summary: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.card,
    padding: theme.spacing.md,
    borderRadius: theme.radius.md,
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
