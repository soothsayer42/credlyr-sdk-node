import type { HttpClient } from '../utils/request.js';
import type { Verification, CreateVerificationParams, ListResponse } from '../types.js';
export declare class VerificationsResource {
    private client;
    constructor(client: HttpClient);
    create(params: CreateVerificationParams): Promise<Verification>;
    list(params?: {
        limit?: number;
        status?: string;
    }): Promise<ListResponse<Verification>>;
    retrieve(id: string): Promise<Verification>;
    getStatus(id: string): Promise<{
        id: string;
        status: string;
    }>;
    cancel(id: string): Promise<{
        id: string;
        status: string;
    }>;
    simulatorCallback(id: string, params: {
        outcome: 'approve' | 'deny';
        claims?: Record<string, unknown>;
    }): Promise<Verification>;
}
//# sourceMappingURL=verifications.d.ts.map