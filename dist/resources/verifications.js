"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerificationsResource = void 0;
class VerificationsResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async create(params) {
        const { data } = await this.client.post('/verifications', params);
        return data.verification;
    }
    async list(params) {
        const query = new URLSearchParams();
        if (params?.limit)
            query.set('limit', String(params.limit));
        if (params?.status)
            query.set('status', params.status);
        const path = query.toString() ? `/verifications?${query}` : '/verifications';
        const { data } = await this.client.get(path);
        return { data: data.verifications };
    }
    async retrieve(id) {
        const { data } = await this.client.get(`/verifications/${id}`);
        return data.verification;
    }
    async getStatus(id) {
        const { data } = await this.client.get(`/verifications/${id}/status`, { skipAuth: true });
        return data;
    }
    async cancel(id) {
        const { data } = await this.client.post(`/verifications/${id}/cancel`);
        return data;
    }
    async simulatorCallback(id, params) {
        const { data } = await this.client.post(`/verifications/${id}/callback`, {
            _simulator: true,
            _simulated_claims: params.claims,
            outcome: params.outcome,
        });
        return data.verification;
    }
}
exports.VerificationsResource = VerificationsResource;
//# sourceMappingURL=verifications.js.map