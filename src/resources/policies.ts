import type { HttpClient } from '../utils/request.js';
import type { Policy, CreatePolicyParams, ListResponse } from '../types.js';

export class PoliciesResource {
  constructor(private client: HttpClient) {}

  async list(): Promise<ListResponse<Policy>> {
    const { data } = await this.client.get<{ policies: Policy[] }>('/policies');
    return { data: data.policies };
  }

  async create(params: CreatePolicyParams): Promise<Policy> {
    const { data } = await this.client.post<{ policy: Policy }>('/policies', params);
    return data.policy;
  }

  async retrieve(id: string): Promise<Policy> {
    const { data } = await this.client.get<{ policy: Policy }>(`/policies/${id}`);
    return data.policy;
  }

  async update(id: string, params: Partial<CreatePolicyParams>): Promise<Policy> {
    const { data } = await this.client.patch<{ policy: Policy }>(`/policies/${id}`, params);
    return data.policy;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const { data } = await this.client.delete<{ deleted: boolean }>(`/policies/${id}`);
    return data;
  }
}
