import type { HttpClient } from '../utils/request.js';
import type { Verification, CreateVerificationParams, ListResponse } from '../types.js';

export class VerificationsResource {
  constructor(private client: HttpClient) {}

  async create(params: CreateVerificationParams): Promise<Verification> {
    const { data } = await this.client.post<{ verification: Verification }>('/verifications', params);
    return data.verification;
  }

  async list(params?: { limit?: number; status?: string }): Promise<ListResponse<Verification>> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', String(params.limit));
    if (params?.status) query.set('status', params.status);
    const path = query.toString() ? `/verifications?${query}` : '/verifications';
    const { data } = await this.client.get<{ verifications: Verification[] }>(path);
    return { data: data.verifications };
  }

  async retrieve(id: string): Promise<Verification> {
    const { data } = await this.client.get<{ verification: Verification }>(`/verifications/${id}`);
    return data.verification;
  }

  async getStatus(id: string): Promise<{ id: string; status: string }> {
    const { data } = await this.client.get<{ id: string; status: string }>(`/verifications/${id}/status`, { skipAuth: true });
    return data;
  }

  async cancel(id: string): Promise<{ id: string; status: string }> {
    const { data } = await this.client.post<{ id: string; status: string }>(`/verifications/${id}/cancel`);
    return data;
  }

  async simulatorCallback(id: string, params: { outcome: 'approve' | 'deny'; claims?: Record<string, unknown> }): Promise<Verification> {
    const { data } = await this.client.post<{ verification: Verification }>(`/verifications/${id}/callback`, {
      _simulator: true,
      _simulated_claims: params.claims,
      outcome: params.outcome,
    });
    return data.verification;
  }
}
