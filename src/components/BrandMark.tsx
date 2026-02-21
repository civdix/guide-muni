import { StyleSheet, Text, View } from 'react-native';
import { palette, theme } from '@/constants/theme';

type BrandMarkProps = {
  size?: number;
};

export const BrandMark = ({ size = 56 }: BrandMarkProps) => (
  <View style={[styles.outer, { width: size, height: size, borderRadius: size / 2 }]}>
    <View style={[styles.inner, { borderRadius: size / 2 }]}> 
      <Text style={[styles.text, { fontSize: Math.max(14, size * 0.34) }]}>GM</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  outer: {
    backgroundColor: palette.pink200,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inner: {
    flex: 1,
    width: '100%',
    backgroundColor: palette.pink600,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: theme.colors.card,
    fontWeight: '800'
  }
});
