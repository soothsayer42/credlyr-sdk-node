import type { HttpClient } from '../utils/request.js';
import type { Policy, CreatePolicyParams, ListResponse } from '../types.js';
export declare class PoliciesResource {
    private client;
    constructor(client: HttpClient);
    list(): Promise<ListResponse<Policy>>;
    create(params: CreatePolicyParams): Promise<Policy>;
    retrieve(id: string): Promise<Policy>;
    update(id: string, params: Partial<CreatePolicyParams>): Promise<Policy>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
//# sourceMappingURL=policies.d.ts.map