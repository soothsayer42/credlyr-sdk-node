export interface CredlyrConfig {
  apiKey: string;
  baseUrl?: string;
  timeout?: number;
  maxRetries?: number;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

// Verification types
export type VerificationStatus = 'pending' | 'awaiting_presentation' | 'processing' | 'approved' | 'denied' | 'expired' | 'cancelled';

export interface Verification {
  id: string;
  status: VerificationStatus;
  requested_claims: string[];
  output_claims?: Record<string, unknown>;
  hosted_url: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  completed_at?: string;
  expires_at: string;
}

export interface CreateVerificationParams {
  policy_id?: string;
  requested_claims?: string[];
  return_url?: string;
  metadata?: Record<string, unknown>;
}

// Policy types
export interface Policy {
  id: string;
  name: string;
  description?: string;
  pack_type?: 'exchange' | 'neobank' | 'psp' | 'bnpl';
  rules?: Record<string, unknown>;
  created_at: string;
}

export interface CreatePolicyParams {
  name: string;
  description?: string;
  pack_type?: string;
  rules?: Record<string, unknown>;
}

// Project types
export type ProjectEnvironment = 'sandbox' | 'staging' | 'production';

export interface Project {
  id: string;
  name: string;
  environment: ProjectEnvironment;
  created_at: string;
}

export interface CreateProjectParams {
  name: string;
  environment: ProjectEnvironment;
}

// API Key types
export interface ApiKey {
  id: string;
  name: string;
  key?: string;
  key_prefix: string;
  project_id: string;
  environment: ProjectEnvironment;
  created_at: string;
}

export interface CreateApiKeyParams {
  name: string;
  project_id: string;
}

// Webhook types
export type WebhookEvent = 'verification.completed' | 'verification.expired' | 'issuance.completed' | 'credential.revoked' | '*';

export interface Webhook {
  id: string;
  url: string;
  signing_secret?: string;
  events: WebhookEvent[];
  enabled: boolean;
  project_id: string;
  created_at: string;
}

export interface CreateWebhookParams {
  url: string;
  events: WebhookEvent[];
  project_id: string;
}

// Issuer types
export interface Issuer {
  id: string;
  name: string;
  domain?: string;
  allowed_credential_types: string[];
  assurance_level: 'basic' | 'haip';
  active: boolean;
  created_at: string;
}

export interface IssuerKey {
  id: string;
  issuer_id: string;
  jwks_uri?: string;
  public_key_jwk?: Record<string, unknown>;
  kid?: string;
  algorithm: string;
  active: boolean;
  created_at: string;
}

// Issuance types
export type IssuanceStatus = 'pending' | 'offer_created' | 'completed' | 'expired';

export interface IssuanceSession {
  id: string;
  credential_type: string;
  status: IssuanceStatus;
  claims: Record<string, unknown>;
  hosted_url: string;
  created_at: string;
}

export interface CreateIssuanceParams {
  credential_type: string;
  claims: Record<string, unknown>;
  expires_in?: number;
  metadata?: Record<string, unknown>;
}

// Credential types
export type CredentialStatus = 'valid' | 'suspended' | 'revoked' | 'expired';

export interface Credential {
  id: string;
  handle: string;
  credential_type: string;
  status: CredentialStatus;
  created_at: string;
}

// Team types
export type TeamRole = 'owner' | 'admin' | 'developer' | 'viewer';

export interface TeamMember {
  id: string;
  email: string;
  name?: string;
  role: TeamRole;
  created_at: string;
}

// Billing types
export interface BillingInfo {
  plan: string;
  usage: { verifications: number; issuances: number; status_checks: number };
  limits: { verifications: number; issuances: number; status_checks: number };
  current_period_end: string;
}

// Export types
export interface Export {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  filter: Record<string, unknown>;
  artifact_url?: string;
  created_at: string;
}

// Organization types
export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: string;
  created_at: string;
}

// List response
export interface ListResponse<T> {
  data: T[];
  total?: number;
  has_more?: boolean;
}

export interface PaginationParams {
  limit?: number;
  offset?: number;
}

// Organization settings
export interface OrganizationSettings {
  security?: {
    ip_allowlist_enabled?: boolean;
    request_signing_required?: boolean;
  };
  notifications?: {
    email_alerts?: boolean;
    slack_webhook?: string;
  };
}

// Alias for CreateIssuanceParams
export type CreateIssuanceSessionParams = CreateIssuanceParams;

// Usage and billing types
export interface UsageRecord {
  meter: string;
  count: number;
  period: string;
}

export interface Invoice {
  id: string;
  amount: number;
  currency: string;
  status: 'draft' | 'open' | 'paid' | 'void';
  period_start: string;
  period_end: string;
  invoice_url?: string;
  created_at: string;
}

export interface Subscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'trialing';
  plan: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
}

// Evidence export
export interface EvidenceExport {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  filter: Record<string, unknown>;
  artifact_url?: string;
  created_at: string;
  completed_at?: string;
}
