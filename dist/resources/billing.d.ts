import type { HttpClient } from '../utils/request.js';
import type { UsageRecord, Invoice, Subscription, ListResponse } from '../types.js';
export interface UsageParams {
    meter?: 'verifications' | 'issuances' | 'status_checks';
    period?: string;
}
export declare class BillingResource {
    private client;
    constructor(client: HttpClient);
    getUsage(params?: UsageParams): Promise<ListResponse<UsageRecord>>;
    getSubscription(): Promise<Subscription>;
    listInvoices(params?: {
        limit?: number;
        offset?: number;
    }): Promise<ListResponse<Invoice>>;
    createPortalSession(returnUrl?: string): Promise<{
        url: string;
    }>;
}
//# sourceMappingURL=billing.d.ts.map