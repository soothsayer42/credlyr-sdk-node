"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuanceResource = void 0;
class IssuanceResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async createSession(params) {
        const { data } = await this.client.post('/v1/issuance_sessions', params);
        return data.session;
    }
    async getSession(sessionId) {
        const { data } = await this.client.get(`/v1/issuance_sessions/${sessionId}`);
        return data.session;
    }
    async listSessions(params) {
        const query = new URLSearchParams();
        if (params?.status)
            query.set('status', params.status);
        if (params?.limit)
            query.set('limit', params.limit.toString());
        if (params?.offset)
            query.set('offset', params.offset.toString());
        const queryString = query.toString() ? `?${query.toString()}` : '';
        const { data } = await this.client.get(`/v1/issuance_sessions${queryString}`);
        return { data: data.sessions, total: data.total };
    }
    async cancelSession(sessionId) {
        const { data } = await this.client.post(`/v1/issuance_sessions/${sessionId}/cancel`);
        return data.session;
    }
    async getSessionStatus(handle) {
        const { data } = await this.client.get(`/v1/status/${handle}`);
        return data;
    }
}
exports.IssuanceResource = IssuanceResource;
//# sourceMappingURL=issuance.js.map