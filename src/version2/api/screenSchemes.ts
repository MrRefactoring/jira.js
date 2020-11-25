import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ScreenSchemes {
    constructor(private client: Client) { }
    async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/screenscheme",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createScreenScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createScreenScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createScreenScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/screenscheme",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateScreenScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateScreenScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateScreenScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteScreenScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteScreenScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteScreenScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}