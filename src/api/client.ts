import { Platform } from 'react-native';

export type ApiConfig = {
  baseUrl: string;
  timeoutMs?: number;
};

const defaultConfig: ApiConfig = {
  baseUrl: (global as any).expo?.manifest?.extra?.apiBaseUrl || '',
  timeoutMs: 15_000,
};

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
  config: ApiConfig = defaultConfig
): Promise<T> {
  const url = `${config.baseUrl}${path}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(init.headers || {}),
  };

  const res = await fetch(url, {
    ...init,
    headers,
    signal: controller.signal,
  });
  clearTimeout(timeout);

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${res.status} ${res.statusText}: ${text}`);
  }
  // Try JSON first, fallback to text
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return (await res.json()) as T;
  }
  return (await res.text()) as unknown as T;
}

export const api = {
  get: <T>(path: string, init: RequestInit = {}) => apiFetch<T>(path, { ...init, method: 'GET' }),
  post: <T>(path: string, body: unknown, init: RequestInit = {}) =>
    apiFetch<T>(path, {
      ...init,
      method: 'POST',
      body: JSON.stringify(body),
    }),
};