import type { HttpClient } from '../utils/request.js';
import type { Issuer, IssuerKey, ListResponse } from '../types.js';

export class IssuersResource {
  constructor(private client: HttpClient) {}

  async list(): Promise<ListResponse<Issuer>> {
    const { data } = await this.client.get<{ issuers: Issuer[] }>('/trust/issuers');
    return { data: data.issuers };
  }

  async create(params: { name: string; domain?: string; allowed_credential_types?: string[]; assurance_level?: string }): Promise<Issuer> {
    const { data } = await this.client.post<{ issuer: Issuer }>('/trust/issuers', params);
    return data.issuer;
  }

  async retrieve(id: string): Promise<Issuer> {
    const { data } = await this.client.get<{ issuer: Issuer }>(`/trust/issuers/${id}`);
    return data.issuer;
  }

  async update(id: string, params: Partial<{ name: string; domain: string; active: boolean }>): Promise<Issuer> {
    const { data } = await this.client.patch<{ issuer: Issuer }>(`/trust/issuers/${id}`, params);
    return data.issuer;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const { data } = await this.client.delete<{ deleted: boolean }>(`/trust/issuers/${id}`);
    return data;
  }

  async listKeys(issuerId: string): Promise<ListResponse<IssuerKey>> {
    const { data } = await this.client.get<{ keys: IssuerKey[] }>(`/trust/issuers/${issuerId}/keys`);
    return { data: data.keys };
  }

  async addKey(issuerId: string, params: { jwks_uri?: string; public_key_jwk?: Record<string, unknown> }): Promise<IssuerKey> {
    const { data } = await this.client.post<{ key: IssuerKey }>(`/trust/issuers/${issuerId}/keys`, params);
    return data.key;
  }

  async deleteKey(issuerId: string, keyId: string): Promise<{ deleted: boolean }> {
    const { data } = await this.client.delete<{ deleted: boolean }>(`/trust/issuers/${issuerId}/keys/${keyId}`);
    return data;
  }
}
