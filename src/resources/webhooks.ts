import type { HttpClient } from '../utils/request.js';
import type { Webhook, CreateWebhookParams, WebhookEvent, ListResponse } from '../types.js';
import { verifyWebhookSignature, generateTestSignature, type WebhookPayload } from '../utils/webhook.js';

export class WebhooksResource {
  constructor(private client: HttpClient) {}

  async list(params?: { project_id?: string }): Promise<ListResponse<Webhook>> {
    const query = params?.project_id ? `?project_id=${params.project_id}` : '';
    const { data } = await this.client.get<{ webhooks: Webhook[] }>(`/webhooks${query}`);
    return { data: data.webhooks };
  }

  async create(params: CreateWebhookParams): Promise<Webhook> {
    const { data } = await this.client.post<{ webhook: Webhook }>('/webhooks', params);
    return data.webhook;
  }

  async update(id: string, params: { url?: string; events?: WebhookEvent[]; enabled?: boolean }): Promise<Webhook> {
    const { data } = await this.client.patch<{ webhook: Webhook }>(`/webhooks/${id}`, params);
    return data.webhook;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const { data } = await this.client.delete<{ deleted: boolean }>(`/webhooks/${id}`);
    return data;
  }

  async rotateSecret(id: string): Promise<{ signing_secret: string }> {
    const { data } = await this.client.post<{ signing_secret: string }>(`/webhooks/${id}/rotate`);
    return data;
  }

  verifySignature(payload: string, signature: string, secret: string, tolerance?: number): WebhookPayload {
    return verifyWebhookSignature(payload, signature, secret, tolerance);
  }

  generateTestSignature(payload: string, secret: string, timestamp?: number): string {
    return generateTestSignature(payload, secret, timestamp);
  }
}
