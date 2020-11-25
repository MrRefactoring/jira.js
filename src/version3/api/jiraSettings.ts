import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class JiraSettings {
    constructor(private client: Client) { }
    async getApplicationProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getApplicationProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getApplicationProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/application-properties",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAdvancedSettings<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAdvancedSettings<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAdvancedSettings<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/application-properties/advanced-settings",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setApplicationProperty<T = Models.ApplicationProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async setApplicationProperty<T = Models.ApplicationProperty>(parameters: any, callback?: undefined): Promise<T>;
    async setApplicationProperty<T = Models.ApplicationProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/application-properties/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getConfiguration<T = Models.Configuration>(parameters: any, callback: Callback<T>): Promise<void>;
    async getConfiguration<T = Models.Configuration>(parameters: any, callback?: undefined): Promise<T>;
    async getConfiguration<T = Models.Configuration>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/configuration",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}