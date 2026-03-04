"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsResource = void 0;
class CredentialsResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list(params) {
        const query = new URLSearchParams();
        if (params?.holder_id)
            query.set('holder_id', params.holder_id);
        if (params?.credential_type)
            query.set('credential_type', params.credential_type);
        if (params?.status)
            query.set('status', params.status);
        if (params?.limit)
            query.set('limit', params.limit.toString());
        if (params?.offset)
            query.set('offset', params.offset.toString());
        const queryString = query.toString() ? `?${query.toString()}` : '';
        const { data } = await this.client.get(`/v1/credentials${queryString}`);
        return { data: data.credentials, total: data.total };
    }
    async retrieve(id) {
        const { data } = await this.client.get(`/v1/credentials/${id}`);
        return data.credential;
    }
    async revoke(id, reason) {
        const { data } = await this.client.post(`/v1/credentials/${id}/revoke`, { reason });
        return data.credential;
    }
    async getRevocationStatus(id) {
        const { data } = await this.client.get(`/v1/credentials/${id}/status`);
        return data;
    }
}
exports.CredentialsResource = CredentialsResource;
//# sourceMappingURL=credentials.js.map