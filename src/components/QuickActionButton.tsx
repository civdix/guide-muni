import { Pressable, StyleSheet, Text } from 'react-native';
import { theme } from '@/constants/theme';

type QuickActionButtonProps = {
  label: string;
  onPress: () => void;
};

export const QuickActionButton = ({ label, onPress }: QuickActionButtonProps) => (
  <Pressable accessibilityRole="button" style={styles.button} onPress={onPress}>
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    minHeight: 56,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.primarySoft,
    marginBottom: theme.spacing.sm
  },
  label: {
    color: theme.colors.text,
    fontWeight: '700',
    fontSize: theme.typography.body
  }
});
