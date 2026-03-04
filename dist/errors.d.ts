export declare class CredlyrError extends Error {
    readonly code: string;
    readonly statusCode: number;
    readonly requestId?: string | undefined;
    constructor(code: string, message: string, statusCode: number, requestId?: string | undefined);
}
export declare class AuthenticationError extends CredlyrError {
    constructor(message?: string, requestId?: string);
}
export declare class RateLimitError extends CredlyrError {
    readonly retryAfter: number;
    constructor(retryAfter: number, requestId?: string);
}
export declare class ValidationError extends CredlyrError {
    readonly param?: string | undefined;
    constructor(message: string, param?: string | undefined, requestId?: string);
}
export declare class NotFoundError extends CredlyrError {
    constructor(resource: string, id: string, requestId?: string);
}
export declare class ServerError extends CredlyrError {
    constructor(message?: string, requestId?: string);
}
export declare class WebhookSignatureError extends Error {
    constructor(message?: string);
}
//# sourceMappingURL=errors.d.ts.map