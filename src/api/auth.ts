import { http } from './http';
import { useAuthStore } from '../state/auth';

export type RegisterInput = { name: string; email: string; password: string };
export type LoginInput = { email: string; password: string };

export type AuthTokens = { access_token: string; refresh_token: string };

export const auth = {
  async register(input: RegisterInput): Promise<AuthTokens & { id: string; name: string; email: string }> {
    const data = await http<AuthTokens & { id: string; name: string; email: string }>(
      '/auth/register',
      {
        method: 'POST',
        body: JSON.stringify(input),
      }
    );
    await useAuthStore.getState().setTokens(data.access_token, data.refresh_token);
    return data;
  },
  async login(input: LoginInput): Promise<AuthTokens> {
    const data = await http<AuthTokens>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });
    await useAuthStore.getState().setTokens(data.access_token, data.refresh_token);
    return data;
  },
  async logout() {
    await useAuthStore.getState().logout();
  },
};