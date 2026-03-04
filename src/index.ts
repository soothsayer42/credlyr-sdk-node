// Main client
export { CredlyrClient, type CredlyrClientConfig } from './client.js';

// Errors
export {
  CredlyrError,
  AuthenticationError,
  RateLimitError,
  NotFoundError,
  ValidationError,
  ServerError,
} from './errors.js';

// Types
export type {
  // Core resources
  Verification,
  VerificationStatus,
  IssuanceSession,
  IssuanceStatus,
  Credential,
  Policy,
  Issuer,
  IssuerKey,
  Project,
  ApiKey,
  Webhook,
  WebhookEvent,
  TeamMember,
  Organization,
  OrganizationSettings,

  // Params
  CreateVerificationParams,
  CreateIssuanceSessionParams,
  CreatePolicyParams,
  CreateProjectParams,
  CreateApiKeyParams,
  CreateWebhookParams,

  // Billing
  UsageRecord,
  Invoice,
  Subscription,
  EvidenceExport,

  // Utilities
  ListResponse,
  PaginationParams,
} from './types.js';

// Webhook utilities
export { verifyWebhookSignature, type WebhookPayload } from './utils/webhook.js';
