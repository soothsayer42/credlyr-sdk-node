# Credlyr Node.js SDK

Official Node.js SDK for the Credlyr API - verifiable credentials infrastructure for identity verification.

## Installation

```bash
npm install @credlyr/sdk
# or
yarn add @credlyr/sdk
# or
pnpm add @credlyr/sdk
```

## Quick Start

```typescript
import { CredlyrClient } from '@credlyr/sdk';

const credlyr = new CredlyrClient({
  apiKey: process.env.CREDLYR_API_KEY!,
});

// Create a verification session
const verification = await credlyr.verifications.create({
  policy_id: 'pol_abc123',
  redirect_uri: 'https://yourapp.com/callback',
});

console.log('Verification URL:', verification.url);
```

## Configuration

```typescript
const credlyr = new CredlyrClient({
  apiKey: 'your-api-key',      // Required
  baseUrl: 'https://api.credlyr.com', // Optional, defaults to production
  timeout: 30000,               // Optional, request timeout in ms
  maxRetries: 2,                // Optional, retry failed requests
});
```

## Resources

### Verifications

Create and manage verification sessions to verify credentials from holders.

```typescript
// Create a verification session
const verification = await credlyr.verifications.create({
  policy_id: 'pol_abc123',
  redirect_uri: 'https://yourapp.com/callback',
  metadata: { user_id: 'user_123' },
});

// Get verification details
const details = await credlyr.verifications.retrieve('ver_xyz789');

// List all verifications
const { data } = await credlyr.verifications.list({ status: 'completed' });

// Get verification result with evidence
const result = await credlyr.verifications.getResult('ver_xyz789');
```

### Issuance

Issue verifiable credentials to holders.

```typescript
// Create an issuance session
const session = await credlyr.issuance.createSession({
  credential_type: 'EmploymentCredential',
  claims: {
    employer: 'Acme Corp',
    position: 'Software Engineer',
    start_date: '2024-01-15',
  },
  redirect_uri: 'https://yourapp.com/issued',
});

// Check session status
const status = await credlyr.issuance.getSession(session.id);
```

### Credentials

Manage issued credentials.

```typescript
// List credentials
const { data } = await credlyr.credentials.list({
  holder_id: 'holder_abc',
  status: 'active',
});

// Revoke a credential
await credlyr.credentials.revoke('cred_123', 'Employment terminated');

// Check revocation status
const status = await credlyr.credentials.getRevocationStatus('cred_123');
```

### Policies

Define verification and issuance policies.

```typescript
// Create a policy
const policy = await credlyr.policies.create({
  name: 'Age Verification',
  credential_types: ['VerifiableId'],
  required_claims: ['birthDate'],
  rules: [
    { claim: 'birthDate', operator: 'age_gte', value: 18 },
  ],
});

// List policies
const { data } = await credlyr.policies.list();

// Update a policy
await credlyr.policies.update('pol_123', { name: 'Updated Policy' });
```

### Issuers (Trust Registry)

Manage trusted credential issuers.

```typescript
// Add a trusted issuer
const issuer = await credlyr.issuers.create({
  name: 'State DMV',
  domain: 'dmv.state.gov',
  allowed_credential_types: ['DriversLicense'],
});

// Add issuer's public key
await credlyr.issuers.addKey(issuer.id, {
  jwks_uri: 'https://dmv.state.gov/.well-known/jwks.json',
});
```

### Webhooks

Receive real-time event notifications.

```typescript
// Create a webhook
const webhook = await credlyr.webhooks.create({
  url: 'https://yourapp.com/webhooks/credlyr',
  events: ['verification.completed', 'credential.issued'],
});

// Rotate webhook secret
const { signing_secret } = await credlyr.webhooks.rotateSecret(webhook.id);
```

### Verifying Webhook Signatures

```typescript
import { verifyWebhookSignature } from '@credlyr/sdk';

// In your webhook handler
app.post('/webhooks/credlyr', (req, res) => {
  const signature = req.headers['x-credlyr-signature'];
  const payload = req.body; // raw request body as string

  try {
    const event = verifyWebhookSignature(
      payload,
      signature,
      process.env.WEBHOOK_SECRET!,
    );

    switch (event.type) {
      case 'verification.completed':
        // Handle completed verification
        break;
      case 'credential.issued':
        // Handle issued credential
        break;
    }

    res.status(200).send('OK');
  } catch (error) {
    console.error('Webhook verification failed:', error);
    res.status(400).send('Invalid signature');
  }
});
```

### Team Management

```typescript
// List team members
const { data } = await credlyr.team.list();

// Invite a new member
await credlyr.team.invite({
  email: 'developer@company.com',
  role: 'developer',
});

// Update member role
await credlyr.team.update('user_123', { role: 'admin' });
```

### Billing & Usage

```typescript
// Get current usage
const { data } = await credlyr.billing.getUsage({
  meter: 'verifications',
  period: '2024-01',
});

// Get subscription details
const subscription = await credlyr.billing.getSubscription();

// Open billing portal
const { url } = await credlyr.billing.createPortalSession();
```

### Projects

```typescript
// Create a project for staging
const project = await credlyr.projects.create({
  name: 'Staging',
  environment: 'test',
});

// List all projects
const { data } = await credlyr.projects.list();
```

### API Keys

```typescript
// Create an API key
const apiKey = await credlyr.apiKeys.create({
  name: 'Production Server',
  project_id: 'proj_123',
  scopes: ['verifications:write', 'credentials:read'],
});

// Save the key - it won't be shown again
console.log('API Key:', apiKey.key);

// Revoke a key
await credlyr.apiKeys.revoke(apiKey.id);
```

## Error Handling

```typescript
import {
  CredlyrError,
  AuthenticationError,
  RateLimitError,
  ValidationError,
  NotFoundError,
} from '@credlyr/sdk';

try {
  await credlyr.verifications.create({ policy_id: 'invalid' });
} catch (error) {
  if (error instanceof AuthenticationError) {
    // Invalid or expired API key
    console.error('Auth failed:', error.message);
  } else if (error instanceof RateLimitError) {
    // Rate limit exceeded
    console.error('Rate limited, retry after:', error.retryAfter);
  } else if (error instanceof ValidationError) {
    // Invalid request parameters
    console.error('Validation error:', error.errors);
  } else if (error instanceof NotFoundError) {
    // Resource not found
    console.error('Not found:', error.message);
  } else if (error instanceof CredlyrError) {
    // Other API error
    console.error('API error:', error.code, error.message);
  }
}
```

## TypeScript

This SDK is written in TypeScript and provides full type definitions.

```typescript
import type {
  Verification,
  VerificationStatus,
  CreateVerificationParams,
  Policy,
} from '@credlyr/sdk';

const params: CreateVerificationParams = {
  policy_id: 'pol_123',
  redirect_uri: 'https://app.com/callback',
};

const verification: Verification = await credlyr.verifications.create(params);
```

## Requirements

- Node.js 18 or later
- ES Modules support

## License

MIT
