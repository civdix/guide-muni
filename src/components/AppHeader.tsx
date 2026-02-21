import { StyleSheet, Text, View } from 'react-native';
import { APP_CONSTANTS, UI_TEXT } from '@/constants/appConstants';
import { theme } from '@/constants/theme';
import { BrandMark } from './BrandMark';

export const AppHeader = () => (
  <View style={styles.container}>
    <BrandMark size={54} />
    <View>
      <Text style={styles.title}>{APP_CONSTANTS.appName}</Text>
      <Text style={styles.subtitle}>{UI_TEXT.homeTagline}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    gap: theme.spacing.md
  },
  title: {
    color: theme.colors.text,
    fontWeight: '800',
    fontSize: theme.typography.title
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.caption
  }
});
