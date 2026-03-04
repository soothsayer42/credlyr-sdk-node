import type { HttpClient } from '../utils/request.js';
import type { ApiKey, CreateApiKeyParams, ListResponse } from '../types.js';

export class ApiKeysResource {
  constructor(private client: HttpClient) {}

  async list(params?: { project_id?: string }): Promise<ListResponse<ApiKey>> {
    const query = params?.project_id ? `?project_id=${params.project_id}` : '';
    const { data } = await this.client.get<{ api_keys: ApiKey[] }>(`/api_keys${query}`);
    return { data: data.api_keys };
  }

  async create(params: CreateApiKeyParams): Promise<ApiKey> {
    const { data } = await this.client.post<{ api_key: ApiKey }>('/api_keys', params);
    return data.api_key;
  }

  async revoke(id: string): Promise<{ revoked: boolean }> {
    const { data } = await this.client.delete<{ revoked: boolean }>(`/api_keys/${id}`);
    return data;
  }
}
