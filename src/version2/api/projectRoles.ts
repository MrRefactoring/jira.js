import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectRoles {
    constructor(private client: Client) { }
    async getProjectRoles<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectRoles<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectRoles<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/role`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectRole<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectRole<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectRole<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/role/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectRoleDetails<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectRoleDetails<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectRoleDetails<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/roledetails`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllProjectRoles<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllProjectRoles<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllProjectRoles<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/role",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createProjectRole<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async createProjectRole<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async createProjectRole<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/role",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectRoleById<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectRoleById<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectRoleById<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/role/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async partialUpdateProjectRole<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async partialUpdateProjectRole<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async partialUpdateProjectRole<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/role/${parameters.id}`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async fullyUpdateProjectRole<T = Models.ProjectRole>(parameters: any, callback: Callback<T>): Promise<void>;
    async fullyUpdateProjectRole<T = Models.ProjectRole>(parameters: any, callback?: undefined): Promise<T>;
    async fullyUpdateProjectRole<T = Models.ProjectRole>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/role/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteProjectRole<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteProjectRole<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteProjectRole<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/role/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}