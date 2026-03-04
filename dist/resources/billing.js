"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillingResource = void 0;
class BillingResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async getUsage(params) {
        const query = new URLSearchParams();
        if (params?.meter)
            query.set('meter', params.meter);
        if (params?.period)
            query.set('period', params.period);
        const queryString = query.toString() ? `?${query.toString()}` : '';
        const { data } = await this.client.get(`/v1/billing/usage${queryString}`);
        return { data: data.usage };
    }
    async getSubscription() {
        const { data } = await this.client.get('/v1/billing/subscription');
        return data.subscription;
    }
    async listInvoices(params) {
        const query = new URLSearchParams();
        if (params?.limit)
            query.set('limit', params.limit.toString());
        if (params?.offset)
            query.set('offset', params.offset.toString());
        const queryString = query.toString() ? `?${query.toString()}` : '';
        const { data } = await this.client.get(`/v1/billing/invoices${queryString}`);
        return { data: data.invoices, total: data.total };
    }
    async createPortalSession(returnUrl) {
        const { data } = await this.client.post('/v1/billing/portal', { return_url: returnUrl });
        return data;
    }
}
exports.BillingResource = BillingResource;
//# sourceMappingURL=billing.js.map