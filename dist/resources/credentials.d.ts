import type { HttpClient } from '../utils/request.js';
import type { Credential, ListResponse } from '../types.js';
export interface ListCredentialsParams {
    holder_id?: string;
    credential_type?: string;
    status?: 'active' | 'revoked' | 'expired';
    limit?: number;
    offset?: number;
}
export declare class CredentialsResource {
    private client;
    constructor(client: HttpClient);
    list(params?: ListCredentialsParams): Promise<ListResponse<Credential>>;
    retrieve(id: string): Promise<Credential>;
    revoke(id: string, reason?: string): Promise<Credential>;
    getRevocationStatus(id: string): Promise<{
        revoked: boolean;
        revoked_at?: string;
        reason?: string;
    }>;
}
//# sourceMappingURL=credentials.d.ts.map