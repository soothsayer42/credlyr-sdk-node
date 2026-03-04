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
export declare class TeamResource {
    private client;
    constructor(client: HttpClient);
    list(): Promise<ListResponse<TeamMember>>;
    invite(params: InviteTeamMemberParams): Promise<TeamMember>;
    retrieve(userId: string): Promise<TeamMember>;
    update(userId: string, params: UpdateTeamMemberParams): Promise<TeamMember>;
    remove(userId: string): Promise<{
        deleted: boolean;
    }>;
}
//# sourceMappingURL=team.d.ts.map