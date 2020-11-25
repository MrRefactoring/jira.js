import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectTypes {
    constructor(private client: Client) { }
    async getAllProjectTypes<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllProjectTypes<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllProjectTypes<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/project/type",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllAccessibleProjectTypes<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllAccessibleProjectTypes<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllAccessibleProjectTypes<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/project/type/accessible",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectTypeByKey<T = Models.ProjectType>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectTypeByKey<T = Models.ProjectType>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectTypeByKey<T = Models.ProjectType>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/type/${parameters.projectTypeKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAccessibleProjectTypeByKey<T = Models.ProjectType>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAccessibleProjectTypeByKey<T = Models.ProjectType>(parameters: any, callback?: undefined): Promise<T>;
    async getAccessibleProjectTypeByKey<T = Models.ProjectType>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/type/${parameters.projectTypeKey}/accessible`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}