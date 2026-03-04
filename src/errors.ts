export class CredlyrError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly statusCode: number,
    public readonly requestId?: string
  ) {
    super(message);
    this.name = 'CredlyrError';
  }
}

export class AuthenticationError extends CredlyrError {
  constructor(message = 'Invalid API key', requestId?: string) {
    super('authentication_error', message, 401, requestId);
    this.name = 'AuthenticationError';
  }
}

export class RateLimitError extends CredlyrError {
  constructor(public readonly retryAfter: number, requestId?: string) {
    super('rate_limit_exceeded', 'Too many requests', 429, requestId);
    this.name = 'RateLimitError';
  }
}

export class ValidationError extends CredlyrError {
  constructor(message: string, public readonly param?: string, requestId?: string) {
    super('validation_error', message, 400, requestId);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends CredlyrError {
  constructor(resource: string, id: string, requestId?: string) {
    super('not_found', `${resource} '${id}' not found`, 404, requestId);
    this.name = 'NotFoundError';
  }
}

export class ServerError extends CredlyrError {
  constructor(message = 'Internal server error', requestId?: string) {
    super('server_error', message, 500, requestId);
    this.name = 'ServerError';
  }
}

export class WebhookSignatureError extends Error {
  constructor(message = 'Invalid webhook signature') {
    super(message);
    this.name = 'WebhookSignatureError';
  }
}
