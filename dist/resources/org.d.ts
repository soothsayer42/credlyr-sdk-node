import type { HttpClient } from '../utils/request.js';
import type { Organization, OrganizationSettings } from '../types.js';
export interface UpdateOrgParams {
    name?: string;
    settings?: Partial<OrganizationSettings>;
}
export declare class OrgResource {
    private client;
    constructor(client: HttpClient);
    retrieve(): Promise<Organization>;
    update(params: UpdateOrgParams): Promise<Organization>;
    getSettings(): Promise<OrganizationSettings>;
    updateSettings(settings: Partial<OrganizationSettings>): Promise<OrganizationSettings>;
    addAllowedIp(ip: string): Promise<{
        allowed_ips: string[];
    }>;
    removeAllowedIp(ip: string): Promise<{
        allowed_ips: string[];
    }>;
}
//# sourceMappingURL=org.d.ts.map