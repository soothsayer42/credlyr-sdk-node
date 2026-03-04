"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpClient = void 0;
exports.createHttpClient = createHttpClient;
const errors_js_1 = require("../errors.js");
function createHttpClient(config) {
    return new HttpClient(config);
}
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
function parseRateLimitHeaders(headers) {
    const limit = headers.get('X-RateLimit-Limit');
    const remaining = headers.get('X-RateLimit-Remaining');
    const reset = headers.get('X-RateLimit-Reset');
    if (limit && remaining && reset) {
        return { limit: +limit, remaining: +remaining, reset: +reset };
    }
    return null;
}
class HttpClient {
    config;
    constructor(config) {
        this.config = config;
    }
    async request(method, path, body, options = {}) {
        const url = `${this.config.baseUrl}${path}`;
        const headers = {
            'Content-Type': 'application/json',
            'User-Agent': 'credlyr-node/1.0.0',
        };
        if (!options.skipAuth) {
            headers['Authorization'] = `Bearer ${this.config.apiKey}`;
        }
        if (options.idempotencyKey) {
            headers['Idempotency-Key'] = options.idempotencyKey;
        }
        let lastError = null;
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
                    throw new errors_js_1.RateLimitError(retryAfter, requestId);
                }
                if (response.status >= 500 && attempt < this.config.maxRetries) {
                    await sleep(Math.min(500 * Math.pow(2, attempt), 30000));
                    continue;
                }
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    const err = data.error;
                    switch (response.status) {
                        case 400: throw new errors_js_1.ValidationError(err?.message || 'Bad request', err?.param, requestId);
                        case 401: throw new errors_js_1.AuthenticationError(err?.message, requestId);
                        case 404: throw new errors_js_1.NotFoundError('resource', path, requestId);
                        default: throw new errors_js_1.CredlyrError(err?.code || 'error', err?.message || 'Error', response.status, requestId);
                    }
                }
                return { data: data, rateLimitInfo };
            }
            catch (error) {
                if (error instanceof errors_js_1.CredlyrError)
                    throw error;
                lastError = error;
                if (attempt < this.config.maxRetries) {
                    await sleep(Math.min(500 * Math.pow(2, attempt), 30000));
                    continue;
                }
            }
        }
        throw lastError || new Error('Request failed');
    }
    get(path, options) {
        return this.request('GET', path, undefined, options);
    }
    post(path, body, options) {
        return this.request('POST', path, body, options);
    }
    patch(path, body) {
        return this.request('PATCH', path, body);
    }
    delete(path) {
        return this.request('DELETE', path);
    }
}
exports.HttpClient = HttpClient;
//# sourceMappingURL=request.js.map