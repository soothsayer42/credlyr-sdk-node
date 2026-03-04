import type { HttpClient } from '../utils/request.js';
import type { Webhook, CreateWebhookParams, WebhookEvent, ListResponse } from '../types.js';
import { type WebhookPayload } from '../utils/webhook.js';
export declare class WebhooksResource {
    private client;
    constructor(client: HttpClient);
    list(params?: {
        project_id?: string;
    }): Promise<ListResponse<Webhook>>;
    create(params: CreateWebhookParams): Promise<Webhook>;
    update(id: string, params: {
        url?: string;
        events?: WebhookEvent[];
        enabled?: boolean;
    }): Promise<Webhook>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    rotateSecret(id: string): Promise<{
        signing_secret: string;
    }>;
    verifySignature(payload: string, signature: string, secret: string, tolerance?: number): WebhookPayload;
    generateTestSignature(payload: string, secret: string, timestamp?: number): string;
}
//# sourceMappingURL=webhooks.d.ts.map