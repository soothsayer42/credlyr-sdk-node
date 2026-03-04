import type { HttpClient } from '../utils/request.js';
import type { IssuanceSession, CreateIssuanceSessionParams, ListResponse } from '../types.js';

export class IssuanceResource {
  constructor(private client: HttpClient) {}

  async createSession(params: CreateIssuanceSessionParams): Promise<IssuanceSession> {
    const { data } = await this.client.post<{ session: IssuanceSession }>('/v1/issuance_sessions', params);
    return data.session;
  }

  async getSession(sessionId: string): Promise<IssuanceSession> {
    const { data } = await this.client.get<{ session: IssuanceSession }>(`/v1/issuance_sessions/${sessionId}`);
    return data.session;
  }

  async listSessions(params?: { status?: string; limit?: number; offset?: number }): Promise<ListResponse<IssuanceSession>> {
    const query = new URLSearchParams();
    if (params?.status) query.set('status', params.status);
    if (params?.limit) query.set('limit', params.limit.toString());
    if (params?.offset) query.set('offset', params.offset.toString());
    const queryString = query.toString() ? `?${query.toString()}` : '';
    const { data } = await this.client.get<{ sessions: IssuanceSession[]; total: number }>(`/v1/issuance_sessions${queryString}`);
    return { data: data.sessions, total: data.total };
  }

  async cancelSession(sessionId: string): Promise<IssuanceSession> {
    const { data } = await this.client.post<{ session: IssuanceSession }>(`/v1/issuance_sessions/${sessionId}/cancel`);
    return data.session;
  }

  async getSessionStatus(handle: string): Promise<{ status: string; expires_at?: string }> {
    const { data } = await this.client.get<{ status: string; expires_at?: string }>(`/v1/status/${handle}`);
    return data;
  }
}
