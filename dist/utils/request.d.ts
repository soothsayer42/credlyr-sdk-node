import type { RateLimitInfo } from '../types.js';
export interface HttpClientConfig {
    baseUrl: string;
    apiKey: string;
    timeout: number;
    maxRetries: number;
}
export declare function createHttpClient(config: HttpClientConfig): HttpClient;
export interface ApiResponse<T> {
    data: T;
    rateLimitInfo: RateLimitInfo | null;
}
export declare class HttpClient {
    private config;
    constructor(config: HttpClientConfig);
    request<T>(method: string, path: string, body?: unknown, options?: {
        skipAuth?: boolean;
        idempotencyKey?: string;
    }): Promise<ApiResponse<T>>;
    get<T>(path: string, options?: {
        skipAuth?: boolean;
    }): Promise<ApiResponse<T>>;
    post<T>(path: string, body?: unknown, options?: {
        skipAuth?: boolean;
        idempotencyKey?: string;
    }): Promise<ApiResponse<T>>;
    patch<T>(path: string, body?: unknown): Promise<ApiResponse<T>>;
    delete<T>(path: string): Promise<ApiResponse<T>>;
}
//# sourceMappingURL=request.d.ts.map