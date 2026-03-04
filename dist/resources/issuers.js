"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IssuersResource = void 0;
class IssuersResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list() {
        const { data } = await this.client.get('/trust/issuers');
        return { data: data.issuers };
    }
    async create(params) {
        const { data } = await this.client.post('/trust/issuers', params);
        return data.issuer;
    }
    async retrieve(id) {
        const { data } = await this.client.get(`/trust/issuers/${id}`);
        return data.issuer;
    }
    async update(id, params) {
        const { data } = await this.client.patch(`/trust/issuers/${id}`, params);
        return data.issuer;
    }
    async delete(id) {
        const { data } = await this.client.delete(`/trust/issuers/${id}`);
        return data;
    }
    async listKeys(issuerId) {
        const { data } = await this.client.get(`/trust/issuers/${issuerId}/keys`);
        return { data: data.keys };
    }
    async addKey(issuerId, params) {
        const { data } = await this.client.post(`/trust/issuers/${issuerId}/keys`, params);
        return data.key;
    }
    async deleteKey(issuerId, keyId) {
        const { data } = await this.client.delete(`/trust/issuers/${issuerId}/keys/${keyId}`);
        return data;
    }
}
exports.IssuersResource = IssuersResource;
//# sourceMappingURL=issuers.js.map