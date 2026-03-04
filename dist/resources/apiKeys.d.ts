import type { HttpClient } from '../utils/request.js';
import type { ApiKey, CreateApiKeyParams, ListResponse } from '../types.js';
export declare class ApiKeysResource {
    private client;
    constructor(client: HttpClient);
    list(params?: {
        project_id?: string;
    }): Promise<ListResponse<ApiKey>>;
    create(params: CreateApiKeyParams): Promise<ApiKey>;
    revoke(id: string): Promise<{
        revoked: boolean;
    }>;
}
//# sourceMappingURL=apiKeys.d.ts.map