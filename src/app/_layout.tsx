import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

if (typeof window !== 'undefined') {
  require('../styles/global.css');
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Clash Display': require('../assets/fonts/ClashDisplay-Regular.otf'),
    'Clash Display Light': require('../assets/fonts/ClashDisplay-Light.otf'),
    'Clash Display Medium': require('../assets/fonts/ClashDisplay-Medium.otf'),
    'Clash Display Semibold': require('../assets/fonts/ClashDisplay-Semibold.otf'),
    'Clash Display Bold': require('../assets/fonts/ClashDisplay-Bold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}