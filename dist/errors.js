"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhookSignatureError = exports.ServerError = exports.NotFoundError = exports.ValidationError = exports.RateLimitError = exports.AuthenticationError = exports.CredlyrError = void 0;
class CredlyrError extends Error {
    code;
    statusCode;
    requestId;
    constructor(code, message, statusCode, requestId) {
        super(message);
        this.code = code;
        this.statusCode = statusCode;
        this.requestId = requestId;
        this.name = 'CredlyrError';
    }
}
exports.CredlyrError = CredlyrError;
class AuthenticationError extends CredlyrError {
    constructor(message = 'Invalid API key', requestId) {
        super('authentication_error', message, 401, requestId);
        this.name = 'AuthenticationError';
    }
}
exports.AuthenticationError = AuthenticationError;
class RateLimitError extends CredlyrError {
    retryAfter;
    constructor(retryAfter, requestId) {
        super('rate_limit_exceeded', 'Too many requests', 429, requestId);
        this.retryAfter = retryAfter;
        this.name = 'RateLimitError';
    }
}
exports.RateLimitError = RateLimitError;
class ValidationError extends CredlyrError {
    param;
    constructor(message, param, requestId) {
        super('validation_error', message, 400, requestId);
        this.param = param;
        this.name = 'ValidationError';
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends CredlyrError {
    constructor(resource, id, requestId) {
        super('not_found', `${resource} '${id}' not found`, 404, requestId);
        this.name = 'NotFoundError';
    }
}
exports.NotFoundError = NotFoundError;
class ServerError extends CredlyrError {
    constructor(message = 'Internal server error', requestId) {
        super('server_error', message, 500, requestId);
        this.name = 'ServerError';
    }
}
exports.ServerError = ServerError;
class WebhookSignatureError extends Error {
    constructor(message = 'Invalid webhook signature') {
        super(message);
        this.name = 'WebhookSignatureError';
    }
}
exports.WebhookSignatureError = WebhookSignatureError;
//# sourceMappingURL=errors.js.map