import { FlatList, StyleSheet, Text, View } from 'react-native';
import { UI_TEXT } from '@/constants/appConstants';
import { theme } from '@/constants/theme';
import type { ResponseHistoryItem } from '@/types/history';

type HistoryListProps = {
  data: ResponseHistoryItem[];
};

export const HistoryList = ({ data }: HistoryListProps) => (
  <View style={styles.wrapper}>
    <Text style={styles.heading}>Recent responses</Text>
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.itemTitle}>
            {item.source.toUpperCase()} · {item.inputSummary}
          </Text>
          <Text style={styles.itemText} numberOfLines={2}>
            {item.responseText}
          </Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.empty}>{UI_TEXT.emptyHistory}</Text>}
      scrollEnabled={false}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginTop: theme.spacing.lg
  },
  heading: {
    fontSize: theme.typography.subtitle,
    color: theme.colors.text,
    fontWeight: '700',
    marginBottom: theme.spacing.sm
  },
  item: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.md,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm
  },
  itemTitle: {
    color: theme.colors.muted,
    fontSize: theme.typography.caption,
    marginBottom: 4
  },
  itemText: {
    color: theme.colors.text
  },
  empty: {
    color: theme.colors.muted
  }
});
