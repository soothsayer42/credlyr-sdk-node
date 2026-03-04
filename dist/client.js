"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredlyrClient = void 0;
const request_js_1 = require("./utils/request.js");
const verifications_js_1 = require("./resources/verifications.js");
const issuance_js_1 = require("./resources/issuance.js");
const credentials_js_1 = require("./resources/credentials.js");
const policies_js_1 = require("./resources/policies.js");
const issuers_js_1 = require("./resources/issuers.js");
const projects_js_1 = require("./resources/projects.js");
const apiKeys_js_1 = require("./resources/apiKeys.js");
const webhooks_js_1 = require("./resources/webhooks.js");
const team_js_1 = require("./resources/team.js");
const billing_js_1 = require("./resources/billing.js");
const exports_js_1 = require("./resources/exports.js");
const org_js_1 = require("./resources/org.js");
class CredlyrClient {
    httpClient;
    /** Verification sessions - verify credentials from holders */
    verifications;
    /** Issuance sessions - issue credentials to holders */
    issuance;
    /** Credentials - manage issued credentials */
    credentials;
    /** Policies - verification and issuance policies */
    policies;
    /** Issuers - trusted credential issuers */
    issuers;
    /** Projects - separate environments within your org */
    projects;
    /** API Keys - manage programmatic access */
    apiKeys;
    /** Webhooks - receive event notifications */
    webhooks;
    /** Team - manage team members */
    team;
    /** Billing - usage and subscription management */
    billing;
    /** Exports - evidence bundle exports */
    exports;
    /** Org - organization settings */
    org;
    constructor(config) {
        if (!config.apiKey) {
            throw new Error('Credlyr API key is required');
        }
        const httpConfig = {
            apiKey: config.apiKey,
            baseUrl: config.baseUrl || 'https://api.credlyr.com',
            timeout: config.timeout || 30000,
            maxRetries: config.maxRetries ?? 2,
        };
        this.httpClient = (0, request_js_1.createHttpClient)(httpConfig);
        this.verifications = new verifications_js_1.VerificationsResource(this.httpClient);
        this.issuance = new issuance_js_1.IssuanceResource(this.httpClient);
        this.credentials = new credentials_js_1.CredentialsResource(this.httpClient);
        this.policies = new policies_js_1.PoliciesResource(this.httpClient);
        this.issuers = new issuers_js_1.IssuersResource(this.httpClient);
        this.projects = new projects_js_1.ProjectsResource(this.httpClient);
        this.apiKeys = new apiKeys_js_1.ApiKeysResource(this.httpClient);
        this.webhooks = new webhooks_js_1.WebhooksResource(this.httpClient);
        this.team = new team_js_1.TeamResource(this.httpClient);
        this.billing = new billing_js_1.BillingResource(this.httpClient);
        this.exports = new exports_js_1.ExportsResource(this.httpClient);
        this.org = new org_js_1.OrgResource(this.httpClient);
    }
}
exports.CredlyrClient = CredlyrClient;
//# sourceMappingURL=client.js.map