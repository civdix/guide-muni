import 'react-native-gesture-handler';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import { AppNavigator } from '@/navigation/AppNavigator';
import { useBackendStatus } from '@/hooks/useBackendStatus';
import { useHistoryPersistence } from '@/hooks/useHistoryPersistence';
import { store } from '@/store/appStore';
import { useAppSelector } from '@/store/hooks';
import { theme } from '@/constants/theme';

const Bootstrap = () => {
  useBackendStatus();
  useHistoryPersistence();
  const loading = useAppSelector((state) => state.app.loading);

  return (
    <View style={styles.root}>
      <AppNavigator />
      {loading ? (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : null}
    </View>
  );
};

const App = () => (
  <Provider store={store}>
    <Bootstrap />
  </Provider>
);

const styles = StyleSheet.create({
  root: { flex: 1 },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
