import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, type PropsWithChildren } from 'react-native';
import { palette } from '@/constants/theme';

export const GradientBackground = ({ children }: PropsWithChildren) => (
  <LinearGradient colors={[palette.pink100, palette.white]} style={styles.container}>
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
