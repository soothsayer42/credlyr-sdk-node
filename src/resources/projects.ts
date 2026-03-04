import type { HttpClient } from '../utils/request.js';
import type { Project, CreateProjectParams, ListResponse } from '../types.js';

export class ProjectsResource {
  constructor(private client: HttpClient) {}

  async list(): Promise<ListResponse<Project>> {
    const { data } = await this.client.get<{ projects: Project[] }>('/projects');
    return { data: data.projects };
  }

  async create(params: CreateProjectParams): Promise<Project> {
    const { data } = await this.client.post<{ project: Project }>('/projects', params);
    return data.project;
  }

  async retrieve(id: string): Promise<Project> {
    const { data } = await this.client.get<{ project: Project }>(`/projects/${id}`);
    return data.project;
  }

  async delete(id: string): Promise<{ deleted: boolean }> {
    const { data } = await this.client.delete<{ deleted: boolean }>(`/projects/${id}`);
    return data;
  }
}
