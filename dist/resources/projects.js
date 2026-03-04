"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectsResource = void 0;
class ProjectsResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list() {
        const { data } = await this.client.get('/projects');
        return { data: data.projects };
    }
    async create(params) {
        const { data } = await this.client.post('/projects', params);
        return data.project;
    }
    async retrieve(id) {
        const { data } = await this.client.get(`/projects/${id}`);
        return data.project;
    }
    async delete(id) {
        const { data } = await this.client.delete(`/projects/${id}`);
        return data;
    }
}
exports.ProjectsResource = ProjectsResource;
//# sourceMappingURL=projects.js.map