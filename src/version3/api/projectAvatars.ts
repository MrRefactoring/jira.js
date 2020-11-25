import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectAvatars {
    constructor(private client: Client) { }
    async updateProjectAvatar<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateProjectAvatar<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateProjectAvatar<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteProjectAvatar<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteProjectAvatar<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteProjectAvatar<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createProjectAvatar<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createProjectAvatar<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createProjectAvatar<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatar2`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: any, callback?: undefined): Promise<T>;
    async getAllProjectAvatars<T = Models.ProjectAvatars>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/${parameters.projectIdOrKey}/avatars`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}