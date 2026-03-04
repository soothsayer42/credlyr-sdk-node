"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WebhooksResource = void 0;
const webhook_js_1 = require("../utils/webhook.js");
class WebhooksResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list(params) {
        const query = params?.project_id ? `?project_id=${params.project_id}` : '';
        const { data } = await this.client.get(`/webhooks${query}`);
        return { data: data.webhooks };
    }
    async create(params) {
        const { data } = await this.client.post('/webhooks', params);
        return data.webhook;
    }
    async update(id, params) {
        const { data } = await this.client.patch(`/webhooks/${id}`, params);
        return data.webhook;
    }
    async delete(id) {
        const { data } = await this.client.delete(`/webhooks/${id}`);
        return data;
    }
    async rotateSecret(id) {
        const { data } = await this.client.post(`/webhooks/${id}/rotate`);
        return data;
    }
    verifySignature(payload, signature, secret, tolerance) {
        return (0, webhook_js_1.verifyWebhookSignature)(payload, signature, secret, tolerance);
    }
    generateTestSignature(payload, secret, timestamp) {
        return (0, webhook_js_1.generateTestSignature)(payload, secret, timestamp);
    }
}
exports.WebhooksResource = WebhooksResource;
//# sourceMappingURL=webhooks.js.map