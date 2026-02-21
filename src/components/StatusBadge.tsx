import { StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

type StatusBadgeProps = {
  online: boolean;
};

export const StatusBadge = ({ online }: StatusBadgeProps) => (
  <View style={[styles.container, { borderColor: online ? theme.colors.success : theme.colors.danger }]}>
    <View style={[styles.dot, { backgroundColor: online ? theme.colors.success : theme.colors.danger }]} />
    <Text style={styles.text}>{online ? 'Backend connected' : 'Backend offline (using fallback mode)'}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.caption,
    fontWeight: '600'
  }
});
