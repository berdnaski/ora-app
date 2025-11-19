import Constants from 'expo-constants';
import { Platform } from 'react-native';

export const getApiBaseUrl = () => {
  const clean = (v: string) => v.replace(/\/$/, '');
  const fromEnv = process.env.EXPO_PUBLIC_API_BASE_URL;
  if (fromEnv) {
    if (Platform.OS !== 'web' && /localhost|127\.0\.0\.1/i.test(fromEnv)) {
    } else {
      return clean(fromEnv);
    }
  }

  const fromExtra = (Constants?.expoConfig as any)?.extra?.apiBaseUrl;
  if (fromExtra) return clean(String(fromExtra));

  const hostUri: string | undefined = (Constants?.expoConfig as any)?.hostUri;
  if (hostUri) {
    const match = hostUri.match(/(\d+\.\d+\.\d+\.\d+)/);
    if (match) return `http://${match[1]}:3000`;
  }

  if (Platform.OS === 'android') return 'http://10.0.2.2:3000';
  return 'http://localhost:3000';
};