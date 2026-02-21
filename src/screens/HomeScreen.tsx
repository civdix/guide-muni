import { ScrollView, StyleSheet, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppHeader } from '@/components/AppHeader';
import { GradientBackground } from '@/components/GradientBackground';
import { HeroGraphic } from '@/components/HeroGraphic';
import { HistoryList } from '@/components/HistoryList';
import { QuickActionButton } from '@/components/QuickActionButton';
import { StatusBadge } from '@/components/StatusBadge';
import { theme } from '@/constants/theme';
import type { RootStackParamList } from '@/navigation/AppNavigator';
import { useAppSelector } from '@/store/hooks';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export const HomeScreen = ({ navigation }: Props) => {
  const backendOnline = useAppSelector((state) => state.app.backendOnline);
  const history = useAppSelector((state) => state.app.history);

  return (
    <GradientBackground>
      <ScrollView contentContainerStyle={styles.content}>
        <AppHeader />
        <HeroGraphic />
        <StatusBadge online={backendOnline} />
        <View>
          <QuickActionButton label="🎤 Speak" onPress={() => navigation.navigate('Voice')} />
          <QuickActionButton label="📷 Capture Image" onPress={() => navigation.navigate('Camera')} />
          <QuickActionButton label="📍 Detect Location" onPress={() => navigation.navigate('Location')} />
          <QuickActionButton label="⌨️ Enter Text" onPress={() => navigation.navigate('TextInput')} />
        </View>
        <HistoryList data={history} />
      </ScrollView>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: theme.spacing.md,
    paddingBottom: theme.spacing.xl
  }
});
