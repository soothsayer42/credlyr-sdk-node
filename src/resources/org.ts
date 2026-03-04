import type { HttpClient } from '../utils/request.js';
import type { Organization, OrganizationSettings } from '../types.js';

export interface UpdateOrgParams {
  name?: string;
  settings?: Partial<OrganizationSettings>;
}

export class OrgResource {
  constructor(private client: HttpClient) {}

  async retrieve(): Promise<Organization> {
    const { data } = await this.client.get<{ org: Organization }>('/v1/org');
    return data.org;
  }

  async update(params: UpdateOrgParams): Promise<Organization> {
    const { data } = await this.client.patch<{ org: Organization }>('/v1/org', params);
    return data.org;
  }

  async getSettings(): Promise<OrganizationSettings> {
    const { data } = await this.client.get<{ settings: OrganizationSettings }>('/v1/org/settings');
    return data.settings;
  }

  async updateSettings(settings: Partial<OrganizationSettings>): Promise<OrganizationSettings> {
    const { data } = await this.client.patch<{ settings: OrganizationSettings }>('/v1/org/settings', settings);
    return data.settings;
  }

  async addAllowedIp(ip: string): Promise<{ allowed_ips: string[] }> {
    const { data } = await this.client.post<{ allowed_ips: string[] }>('/v1/org/allowed_ips', { ip });
    return data;
  }

  async removeAllowedIp(ip: string): Promise<{ allowed_ips: string[] }> {
    const { data } = await this.client.delete<{ allowed_ips: string[] }>(`/v1/org/allowed_ips/${encodeURIComponent(ip)}`);
    return data;
  }
}
