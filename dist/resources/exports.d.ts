import type { HttpClient } from '../utils/request.js';
import type { EvidenceExport, ListResponse } from '../types.js';
export interface CreateExportParams {
    verification_ids?: string[];
    date_from?: string;
    date_to?: string;
    format?: 'json' | 'csv' | 'pdf';
}
export declare class ExportsResource {
    private client;
    constructor(client: HttpClient);
    list(params?: {
        limit?: number;
        offset?: number;
    }): Promise<ListResponse<EvidenceExport>>;
    create(params: CreateExportParams): Promise<EvidenceExport>;
    retrieve(id: string): Promise<EvidenceExport>;
    getDownloadUrl(id: string): Promise<{
        url: string;
        expires_at: string;
    }>;
}
//# sourceMappingURL=exports.d.ts.map