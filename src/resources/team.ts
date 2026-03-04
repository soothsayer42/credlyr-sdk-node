import type { HttpClient } from '../utils/request.js';
import type { TeamMember, ListResponse } from '../types.js';

export interface InviteTeamMemberParams {
  email: string;
  role: 'admin' | 'developer' | 'viewer';
  name?: string;
}

export interface UpdateTeamMemberParams {
  role?: 'admin' | 'developer' | 'viewer';
}

export class TeamResource {
  constructor(private client: HttpClient) {}

  async list(): Promise<ListResponse<TeamMember>> {
    const { data } = await this.client.get<{ members: TeamMember[] }>('/v1/team');
    return { data: data.members };
  }

  async invite(params: InviteTeamMemberParams): Promise<TeamMember> {
    const { data } = await this.client.post<{ member: TeamMember }>('/v1/team', params);
    return data.member;
  }

  async retrieve(userId: string): Promise<TeamMember> {
    const { data } = await this.client.get<{ member: TeamMember }>(`/v1/team/${userId}`);
    return data.member;
  }

  async update(userId: string, params: UpdateTeamMemberParams): Promise<TeamMember> {
    const { data } = await this.client.patch<{ member: TeamMember }>(`/v1/team/${userId}`, params);
    return data.member;
  }

  async remove(userId: string): Promise<{ deleted: boolean }> {
    const { data } = await this.client.delete<{ deleted: boolean }>(`/v1/team/${userId}`);
    return data;
  }
}
