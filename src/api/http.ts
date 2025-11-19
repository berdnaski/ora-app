import { API_BASE_URL } from './api';
import { useAuthStore } from '../state/auth';

export type HttpInit = RequestInit & { auth?: boolean };

const baseUrl = API_BASE_URL;

async function refreshAccessToken(): Promise<string | null> {
  const { refreshToken } = useAuthStore.getState();
  if (!refreshToken) return null;
  try {
    const res = await fetch(`${baseUrl}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: refreshToken }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    if (data?.access_token) {
      await useAuthStore.getState().setAccessToken(data.access_token);
      return data.access_token as string;
    }
  } catch {}
  return null;
}

export async function http<T>(path: string, init: HttpInit = {}): Promise<T> {
  const controller = new AbortController();
  const url = path.startsWith('http') ? path : `${baseUrl}${path}`;
  const headers = new Headers(init.headers as HeadersInit);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (init.auth) {
    const { accessToken } = useAuthStore.getState();
    if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  }

  const doFetch = async (): Promise<Response> =>
    fetch(url, { ...init, headers, signal: controller.signal });

  let res = await doFetch();
  if (init.auth && res.status === 401) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      headers.set('Authorization', `Bearer ${newToken}`);
      res = await doFetch();
    }
  }
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  return (await res.text()) as unknown as T;
}