import { StyleSheet, Text, View } from 'react-native';
import { UI_TEXT } from '@/constants/appConstants';
import { palette, theme } from '@/constants/theme';
import { BrandMark } from './BrandMark';

export const HeroGraphic = () => (
  <View style={styles.card}>
    <View style={styles.decorTopRight} />
    <View style={styles.decorBottomLeft} />
    <BrandMark size={64} />
    <Text style={styles.title}>Guide Muni</Text>
    <Text style={styles.subtitle}>{UI_TEXT.homeTagline}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: palette.pink200
  },
  decorTopRight: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    top: -48,
    right: -40,
    backgroundColor: palette.pink100
  },
  decorBottomLeft: {
    position: 'absolute',
    width: 90,
    height: 90,
    borderRadius: 45,
    bottom: -30,
    left: -28,
    backgroundColor: palette.pink200
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.subtitle,
    fontWeight: '800',
    marginTop: theme.spacing.sm
  },
  subtitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.caption,
    marginTop: 2
  }
});
