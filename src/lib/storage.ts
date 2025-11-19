import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

type Tokens = { accessToken: string | null; refreshToken: string | null };

const ACCESS_KEY = 'ora_access_token';
const REFRESH_KEY = 'ora_refresh_token';

let cache: Tokens = { accessToken: null, refreshToken: null };

const getLocal = (key: string) => {
  try {
    return globalThis.localStorage?.getItem(key) ?? null;
  } catch {
    return null;
  }
};

const setLocal = (key: string, value: string | null) => {
  try {
    if (value == null) globalThis.localStorage?.removeItem(key);
    else globalThis.localStorage?.setItem(key, value);
  } catch {}
};

export const tokenStorage = {
  async hydrate() {
    if (Platform.OS === 'web') {
      cache = {
        accessToken: getLocal(ACCESS_KEY),
        refreshToken: getLocal(REFRESH_KEY),
      };
    } else {
      cache = {
        accessToken: (await SecureStore.getItemAsync(ACCESS_KEY)) || null,
        refreshToken: (await SecureStore.getItemAsync(REFRESH_KEY)) || null,
      };
    }
  },
  getTokens(): Tokens {
    return cache;
  },
  async setTokens(accessToken: string, refreshToken: string) {
    cache = { accessToken, refreshToken };
    if (Platform.OS === 'web') {
      setLocal(ACCESS_KEY, accessToken);
      setLocal(REFRESH_KEY, refreshToken);
    } else {
      await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
      await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);
    }
  },
  async setAccessToken(accessToken: string | null) {
    cache = { ...cache, accessToken };
    if (Platform.OS === 'web') {
      setLocal(ACCESS_KEY, accessToken);
    } else {
      if (accessToken == null) await SecureStore.deleteItemAsync(ACCESS_KEY);
      else await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
    }
  },
  async clear() {
    cache = { accessToken: null, refreshToken: null };
    if (Platform.OS === 'web') {
      setLocal(ACCESS_KEY, null);
      setLocal(REFRESH_KEY, null);
    } else {
      await SecureStore.deleteItemAsync(ACCESS_KEY);
      await SecureStore.deleteItemAsync(REFRESH_KEY);
    }
  },
};