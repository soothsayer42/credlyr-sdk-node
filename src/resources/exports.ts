import type { HttpClient } from '../utils/request.js';
import type { EvidenceExport, ListResponse } from '../types.js';

export interface CreateExportParams {
  verification_ids?: string[];
  date_from?: string;
  date_to?: string;
  format?: 'json' | 'csv' | 'pdf';
}

export class ExportsResource {
  constructor(private client: HttpClient) {}

  async list(params?: { limit?: number; offset?: number }): Promise<ListResponse<EvidenceExport>> {
    const query = new URLSearchParams();
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const { data } = await this.client.get<{ exports: EvidenceExport[]; total: number }>(`/v1/exports${queryString}`);
    return { data: data.exports, total: data.total };
  }

  async create(params: CreateExportParams): Promise<EvidenceExport> {
    const { data } = await this.client.post<{ export: EvidenceExport }>('/v1/exports', params);
    return data.export;
  }

  async retrieve(id: string): Promise<EvidenceExport> {
    const { data } = await this.client.get<{ export: EvidenceExport }>(`/v1/exports/${id}`);
    return data.export;
  }

  async getDownloadUrl(id: string): Promise<{ url: string; expires_at: string }> {
    const { data } = await this.client.get<{ url: string; expires_at: string }>(`/v1/exports/${id}/download`);
    return data;
  }
}
