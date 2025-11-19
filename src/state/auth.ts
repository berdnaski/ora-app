import { create } from 'zustand';
import { tokenStorage } from '../lib/storage';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (a: string, r: string) => Promise<void>;
  setAccessToken: (a: string | null) => Promise<void>;
  hydrate: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  refreshToken: null,
  async setTokens(a, r) {
    await tokenStorage.setTokens(a, r);
    set({ accessToken: a, refreshToken: r });
  },
  async setAccessToken(a) {
    await tokenStorage.setAccessToken(a);
    set({ accessToken: a });
  },
  async hydrate() {
    await tokenStorage.hydrate();
    const { accessToken, refreshToken } = tokenStorage.getTokens();
    set({ accessToken, refreshToken });
  },
  async logout() {
    await tokenStorage.clear();
    set({ accessToken: null, refreshToken: null });
  },
}));