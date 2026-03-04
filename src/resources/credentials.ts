import type { HttpClient } from '../utils/request.js';
import type { Credential, ListResponse } from '../types.js';

export interface ListCredentialsParams {
  holder_id?: string;
  credential_type?: string;
  status?: 'active' | 'revoked' | 'expired';
  limit?: number;
  offset?: number;
}

export class CredentialsResource {
  constructor(private client: HttpClient) {}

  async list(params?: ListCredentialsParams): Promise<ListResponse<Credential>> {
    const query = new URLSearchParams();
    if (params?.holder_id) query.set('holder_id', params.holder_id);
    if (params?.credential_type) query.set('credential_type', params.credential_type);
    if (params?.status) query.set('status', params.status);
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const { data } = await this.client.get<{ credentials: Credential[]; total: number }>(`/v1/credentials${queryString}`);
    return { data: data.credentials, total: data.total };
  }

  async retrieve(id: string): Promise<Credential> {
    const { data } = await this.client.get<{ credential: Credential }>(`/v1/credentials/${id}`);
    return data.credential;
  }

  async revoke(id: string, reason?: string): Promise<Credential> {
    const { data } = await this.client.post<{ credential: Credential }>(`/v1/credentials/${id}/revoke`, { reason });
    return data.credential;
  }

  async getRevocationStatus(id: string): Promise<{ revoked: boolean; revoked_at?: string; reason?: string }> {
    const { data } = await this.client.get<{ revoked: boolean; revoked_at?: string; reason?: string }>(`/v1/credentials/${id}/status`);
    return data;
  }
}
