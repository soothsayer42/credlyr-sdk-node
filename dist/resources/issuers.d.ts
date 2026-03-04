import type { HttpClient } from '../utils/request.js';
import type { Issuer, IssuerKey, ListResponse } from '../types.js';
export declare class IssuersResource {
    private client;
    constructor(client: HttpClient);
    list(): Promise<ListResponse<Issuer>>;
    create(params: {
        name: string;
        domain?: string;
        allowed_credential_types?: string[];
        assurance_level?: string;
    }): Promise<Issuer>;
    retrieve(id: string): Promise<Issuer>;
    update(id: string, params: Partial<{
        name: string;
        domain: string;
        active: boolean;
    }>): Promise<Issuer>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
    listKeys(issuerId: string): Promise<ListResponse<IssuerKey>>;
    addKey(issuerId: string, params: {
        jwks_uri?: string;
        public_key_jwk?: Record<string, unknown>;
    }): Promise<IssuerKey>;
    deleteKey(issuerId: string, keyId: string): Promise<{
        deleted: boolean;
    }>;
}
//# sourceMappingURL=issuers.d.ts.map