import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectCategories {
    constructor(private client: Client) { }
    async getAllProjectCategories<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllProjectCategories<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllProjectCategories<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/projectCategory",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createProjectCategory<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createProjectCategory<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createProjectCategory<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/projectCategory",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectCategoryById<T = Models.ProjectCategory>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectCategoryById<T = Models.ProjectCategory>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectCategoryById<T = Models.ProjectCategory>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/projectCategory/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: any, callback?: undefined): Promise<T>;
    async updateProjectCategory<T = Models.UpdatedProjectCategory>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/projectCategory/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeProjectCategory<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeProjectCategory<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeProjectCategory<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/projectCategory/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}