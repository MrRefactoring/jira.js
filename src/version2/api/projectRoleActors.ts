import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectRoleActors {
    constructor(private client: Client) { }
    async addActorUsers<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async addActorUsers<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async addActorUsers<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setActors<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async setActors<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async setActors<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteActor<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteActor<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteActor<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectRoleActorsForRole<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/role/${parameters.id}/actors`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async addProjectRoleActorsToRole<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/role/${parameters.id}/actors`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async deleteProjectRoleActorsFromRole<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/role/${parameters.id}/actors`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}