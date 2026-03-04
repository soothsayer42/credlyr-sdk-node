"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeysResource = void 0;
class ApiKeysResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list(params) {
        const query = params?.project_id ? `?project_id=${params.project_id}` : '';
        const { data } = await this.client.get(`/api_keys${query}`);
        return { data: data.api_keys };
    }
    async create(params) {
        const { data } = await this.client.post('/api_keys', params);
        return data.api_key;
    }
    async revoke(id) {
        const { data } = await this.client.delete(`/api_keys/${id}`);
        return data;
    }
}
exports.ApiKeysResource = ApiKeysResource;
//# sourceMappingURL=apiKeys.js.map