import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { APP_CONSTANTS } from '@/constants/appConstants';
import { CameraScreen } from '@/screens/CameraScreen';
import { HomeScreen } from '@/screens/HomeScreen';
import { LocationScreen } from '@/screens/LocationScreen';
import { ResponseScreen } from '@/screens/ResponseScreen';
import { TextInputScreen } from '@/screens/TextInputScreen';
import { VoiceScreen } from '@/screens/VoiceScreen';

export type RootStackParamList = {
  Home: undefined;
  Voice: undefined;
  Camera: undefined;
  Location: undefined;
  TextInput: undefined;
  Response: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: { fontWeight: '700' },
        headerBackTitleVisible: false
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: APP_CONSTANTS.appName }} />
      <Stack.Screen name="Voice" component={VoiceScreen} options={{ title: 'Voice Input' }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Capture Image' }} />
      <Stack.Screen name="Location" component={LocationScreen} options={{ title: 'Detect Location' }} />
      <Stack.Screen name="TextInput" component={TextInputScreen} options={{ title: 'Enter Text' }} />
      <Stack.Screen name="Response" component={ResponseScreen} options={{ title: 'AI Response' }} />
    </Stack.Navigator>
  </NavigationContainer>
);
