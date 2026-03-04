import type { RateLimitInfo } from '../types.js';
import { CredlyrError, AuthenticationError, RateLimitError, ValidationError, NotFoundError, ServerError } from '../errors.js';

export interface HttpClientConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  maxRetries: number;
}

export function createHttpClient(config: HttpClientConfig): HttpClient {
  return new HttpClient(config);
}

export interface ApiResponse<T> {
  data: T;
  rateLimitInfo: RateLimitInfo | null;
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

function parseRateLimitHeaders(headers: Headers): RateLimitInfo | null {
  const limit = headers.get('X-RateLimit-Limit');
  const remaining = headers.get('X-RateLimit-Remaining');
  const reset = headers.get('X-RateLimit-Reset');
  if (limit && remaining && reset) {
    return { limit: +limit, remaining: +remaining, reset: +reset };
  }
  return null;
}

export class HttpClient {
  constructor(private config: HttpClientConfig) {}

  async request<T>(
    method: string,
    path: string,
    body?: unknown,
    options: { skipAuth?: boolean; idempotencyKey?: string } = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.config.baseUrl}${path}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'credlyr-node/1.0.0',
    };

    if (!options.skipAuth) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }
    if (options.idempotencyKey) {
      headers['Idempotency-Key'] = options.idempotencyKey;
    }

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.config.maxRetries; attempt++) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

        const response = await fetch(url, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const requestId = response.headers.get('X-Request-Id') || '';
        const rateLimitInfo = parseRateLimitHeaders(response.headers);

        if (response.status === 429) {
          const retryAfter = +(response.headers.get('Retry-After') || '60');
          if (attempt < this.config.maxRetries) {
            await sleep(retryAfter * 1000);
            continue;
          }
          throw new RateLimitError(retryAfter, requestId);
        }

        if (response.status >= 500 && attempt < this.config.maxRetries) {
          await sleep(Math.min(500 * Math.pow(2, attempt), 30000));
          continue;
        }

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
          const err = (data as { error?: { code?: string; message?: string; param?: string } }).error;
          switch (response.status) {
            case 400: throw new ValidationError(err?.message || 'Bad request', err?.param, requestId);
            case 401: throw new AuthenticationError(err?.message, requestId);
            case 404: throw new NotFoundError('resource', path, requestId);
            default: throw new CredlyrError(err?.code || 'error', err?.message || 'Error', response.status, requestId);
          }
        }

        return { data: data as T, rateLimitInfo };
      } catch (error) {
        if (error instanceof CredlyrError) throw error;
        lastError = error as Error;
        if (attempt < this.config.maxRetries) {
          await sleep(Math.min(500 * Math.pow(2, attempt), 30000));
          continue;
        }
      }
    }

    throw lastError || new Error('Request failed');
  }

  get<T>(path: string, options?: { skipAuth?: boolean }) {
    return this.request<T>('GET', path, undefined, options);
  }

  post<T>(path: string, body?: unknown, options?: { skipAuth?: boolean; idempotencyKey?: string }) {
    return this.request<T>('POST', path, body, options);
  }

  patch<T>(path: string, body?: unknown) {
    return this.request<T>('PATCH', path, body);
  }

  delete<T>(path: string) {
    return this.request<T>('DELETE', path);
  }
}
