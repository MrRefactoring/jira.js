import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectEmail {
    constructor(private client: Client) { }
    async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectEmail<T = Models.ProjectEmailAddress>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectId}/email`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateProjectEmail<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateProjectEmail<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateProjectEmail<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectId}/email`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}