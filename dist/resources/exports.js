"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExportsResource = void 0;
class ExportsResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list(params) {
        const query = new URLSearchParams();
        if (params?.limit)
            query.set('limit', params.limit.toString());
        if (params?.offset)
            query.set('offset', params.offset.toString());
        const queryString = query.toString() ? `?${query.toString()}` : '';
        const { data } = await this.client.get(`/v1/exports${queryString}`);
        return { data: data.exports, total: data.total };
    }
    async create(params) {
        const { data } = await this.client.post('/v1/exports', params);
        return data.export;
    }
    async retrieve(id) {
        const { data } = await this.client.get(`/v1/exports/${id}`);
        return data.export;
    }
    async getDownloadUrl(id) {
        const { data } = await this.client.get(`/v1/exports/${id}/download`);
        return data;
    }
}
exports.ExportsResource = ExportsResource;
//# sourceMappingURL=exports.js.map