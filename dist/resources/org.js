"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrgResource = void 0;
class OrgResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async retrieve() {
        const { data } = await this.client.get('/v1/org');
        return data.org;
    }
    async update(params) {
        const { data } = await this.client.patch('/v1/org', params);
        return data.org;
    }
    async getSettings() {
        const { data } = await this.client.get('/v1/org/settings');
        return data.settings;
    }
    async updateSettings(settings) {
        const { data } = await this.client.patch('/v1/org/settings', settings);
        return data.settings;
    }
    async addAllowedIp(ip) {
        const { data } = await this.client.post('/v1/org/allowed_ips', { ip });
        return data;
    }
    async removeAllowedIp(ip) {
        const { data } = await this.client.delete(`/v1/org/allowed_ips/${encodeURIComponent(ip)}`);
        return data;
    }
}
exports.OrgResource = OrgResource;
//# sourceMappingURL=org.js.map