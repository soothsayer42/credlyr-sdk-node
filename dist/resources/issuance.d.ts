import type { HttpClient } from '../utils/request.js';
import type { IssuanceSession, CreateIssuanceSessionParams, ListResponse } from '../types.js';
export declare class IssuanceResource {
    private client;
    constructor(client: HttpClient);
    createSession(params: CreateIssuanceSessionParams): Promise<IssuanceSession>;
    getSession(sessionId: string): Promise<IssuanceSession>;
    listSessions(params?: {
        status?: string;
        limit?: number;
        offset?: number;
    }): Promise<ListResponse<IssuanceSession>>;
    cancelSession(sessionId: string): Promise<IssuanceSession>;
    getSessionStatus(handle: string): Promise<{
        status: string;
        expires_at?: string;
    }>;
}
//# sourceMappingURL=issuance.d.ts.map