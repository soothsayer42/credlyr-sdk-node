"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliciesResource = void 0;
class PoliciesResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list() {
        const { data } = await this.client.get('/policies');
        return { data: data.policies };
    }
    async create(params) {
        const { data } = await this.client.post('/policies', params);
        return data.policy;
    }
    async retrieve(id) {
        const { data } = await this.client.get(`/policies/${id}`);
        return data.policy;
    }
    async update(id, params) {
        const { data } = await this.client.patch(`/policies/${id}`, params);
        return data.policy;
    }
    async delete(id) {
        const { data } = await this.client.delete(`/policies/${id}`);
        return data;
    }
}
exports.PoliciesResource = PoliciesResource;
//# sourceMappingURL=policies.js.map