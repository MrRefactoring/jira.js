import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectProperties {
    constructor(private client: Client) { }
    async getProjectPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectProperty<T = Models.EntityProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectProperty<T = Models.EntityProperty>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectProperty<T = Models.EntityProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setProjectProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setProjectProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setProjectProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteProjectProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteProjectProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteProjectProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/project/${parameters.projectIdOrKey}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}