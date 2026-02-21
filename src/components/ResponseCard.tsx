import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { AnalyzeResponse } from '@/types/api';
import { theme } from '@/constants/theme';

type ResponseCardProps = {
  response: AnalyzeResponse;
  onReplay: () => void;
};

export const ResponseCard = ({ response, onReplay }: ResponseCardProps) => (
  <View style={styles.card}>
    <Text style={styles.title}>AI Insight</Text>
    <Text style={styles.body}>{response.text_response}</Text>
    <Text style={styles.meta}>Confidence: {Math.round((response.confidence ?? 0) * 100)}%</Text>
    <Pressable onPress={onReplay} style={styles.button}>
      <Text style={styles.buttonText}>Replay audio</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md
  },
  title: {
    color: theme.colors.text,
    fontWeight: '800',
    fontSize: theme.typography.subtitle,
    marginBottom: theme.spacing.sm
  },
  body: {
    color: theme.colors.text,
    fontSize: theme.typography.body,
    lineHeight: 22
  },
  meta: {
    marginTop: theme.spacing.sm,
    color: theme.colors.muted
  },
  button: {
    marginTop: theme.spacing.md,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.md,
    paddingVertical: theme.spacing.sm
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colors.card,
    fontWeight: '700'
  }
});
