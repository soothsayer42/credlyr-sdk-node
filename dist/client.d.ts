import { VerificationsResource } from './resources/verifications.js';
import { IssuanceResource } from './resources/issuance.js';
import { CredentialsResource } from './resources/credentials.js';
import { PoliciesResource } from './resources/policies.js';
import { IssuersResource } from './resources/issuers.js';
import { ProjectsResource } from './resources/projects.js';
import { ApiKeysResource } from './resources/apiKeys.js';
import { WebhooksResource } from './resources/webhooks.js';
import { TeamResource } from './resources/team.js';
import { BillingResource } from './resources/billing.js';
import { ExportsResource } from './resources/exports.js';
import { OrgResource } from './resources/org.js';
export interface CredlyrClientConfig {
    apiKey: string;
    baseUrl?: string;
    timeout?: number;
    maxRetries?: number;
}
export declare class CredlyrClient {
    private readonly httpClient;
    /** Verification sessions - verify credentials from holders */
    readonly verifications: VerificationsResource;
    /** Issuance sessions - issue credentials to holders */
    readonly issuance: IssuanceResource;
    /** Credentials - manage issued credentials */
    readonly credentials: CredentialsResource;
    /** Policies - verification and issuance policies */
    readonly policies: PoliciesResource;
    /** Issuers - trusted credential issuers */
    readonly issuers: IssuersResource;
    /** Projects - separate environments within your org */
    readonly projects: ProjectsResource;
    /** API Keys - manage programmatic access */
    readonly apiKeys: ApiKeysResource;
    /** Webhooks - receive event notifications */
    readonly webhooks: WebhooksResource;
    /** Team - manage team members */
    readonly team: TeamResource;
    /** Billing - usage and subscription management */
    readonly billing: BillingResource;
    /** Exports - evidence bundle exports */
    readonly exports: ExportsResource;
    /** Org - organization settings */
    readonly org: OrgResource;
    constructor(config: CredlyrClientConfig);
}
//# sourceMappingURL=client.d.ts.map