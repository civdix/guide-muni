import { useRef, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { GradientBackground } from '@/components/GradientBackground';
import { theme } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation/AppNavigator';
import { backendService } from '@/services/backendService';
import { ttsService } from '@/services/ttsService';
import { pushHistory, setLatestResponse, setLoading } from '@/store/appStore';
import { useAppDispatch } from '@/store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export const CameraScreen = ({ navigation }: Props) => {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [previewUri, setPreviewUri] = useState('');
  const dispatch = useAppDispatch();

  const capture = async (): Promise<void> => {
    if (!cameraRef.current) {
      return;
    }

    const photo = await cameraRef.current.takePictureAsync({ quality: 0.7 });
    if (photo?.uri) {
      setPreviewUri(photo.uri);
    }
  };

  const submit = async (): Promise<void> => {
    if (!previewUri) {
      Alert.alert('Capture an image first');
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await backendService.analyzeImage(previewUri);
      dispatch(setLatestResponse(response));
      dispatch(
        pushHistory({
          id: Date.now().toString(),
          source: 'image',
          inputSummary: 'Camera capture',
          responseText: response.text_response,
          confidence: response.confidence,
          createdAt: new Date().toISOString()
        })
      );
      await ttsService.speak(response.text_response);
      navigation.navigate('Response');
    } catch {
      Alert.alert('Image analysis failed.');
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (!permission?.granted) {
    return (
      <GradientBackground>
        <View style={styles.container}>
          <Text style={styles.title}>Camera access needed</Text>
          <Pressable style={styles.primaryButton} onPress={requestPermission}>
            <Text style={styles.primaryButtonText}>Grant Permission</Text>
          </Pressable>
        </View>
      </GradientBackground>
    );
  }

  return (
    <GradientBackground>
      <View style={styles.container}>
        <CameraView style={styles.camera} ref={cameraRef} />
        {previewUri ? <Image source={{ uri: previewUri }} style={styles.preview} /> : null}
        <Pressable style={styles.primaryButton} onPress={capture}>
          <Text style={styles.primaryButtonText}>Capture</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={submit}>
          <Text style={styles.secondaryButtonText}>Send to Backend</Text>
        </Pressable>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: theme.spacing.md },
  title: { fontSize: theme.typography.subtitle, color: theme.colors.text },
  camera: { height: 300, borderRadius: theme.radius.lg, overflow: 'hidden' },
  preview: { marginTop: theme.spacing.sm, width: '100%', height: 150, borderRadius: theme.radius.md },
  primaryButton: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md
  },
  primaryButtonText: { textAlign: 'center', color: theme.colors.card, fontWeight: '700' },
  secondaryButton: {
    marginTop: theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md
  },
  secondaryButtonText: { textAlign: 'center', color: theme.colors.text, fontWeight: '700' }
});
