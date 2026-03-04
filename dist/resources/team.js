"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamResource = void 0;
class TeamResource {
    client;
    constructor(client) {
        this.client = client;
    }
    async list() {
        const { data } = await this.client.get('/v1/team');
        return { data: data.members };
    }
    async invite(params) {
        const { data } = await this.client.post('/v1/team', params);
        return data.member;
    }
    async retrieve(userId) {
        const { data } = await this.client.get(`/v1/team/${userId}`);
        return data.member;
    }
    async update(userId, params) {
        const { data } = await this.client.patch(`/v1/team/${userId}`, params);
        return data.member;
    }
    async remove(userId) {
        const { data } = await this.client.delete(`/v1/team/${userId}`);
        return data;
    }
}
exports.TeamResource = TeamResource;
//# sourceMappingURL=team.js.map