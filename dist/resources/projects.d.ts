import type { HttpClient } from '../utils/request.js';
import type { Project, CreateProjectParams, ListResponse } from '../types.js';
export declare class ProjectsResource {
    private client;
    constructor(client: HttpClient);
    list(): Promise<ListResponse<Project>>;
    create(params: CreateProjectParams): Promise<Project>;
    retrieve(id: string): Promise<Project>;
    delete(id: string): Promise<{
        deleted: boolean;
    }>;
}
//# sourceMappingURL=projects.d.ts.map