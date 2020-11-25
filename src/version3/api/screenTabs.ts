import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ScreenTabs {
    constructor(private client: Client) { }
    async getAllScreenTabs<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllScreenTabs<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllScreenTabs<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addScreenTab<T = Models.ScreenableTab>(parameters: any, callback: Callback<T>): Promise<void>;
    async addScreenTab<T = Models.ScreenableTab>(parameters: any, callback?: undefined): Promise<T>;
    async addScreenTab<T = Models.ScreenableTab>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async renameScreenTab<T = Models.ScreenableTab>(parameters: any, callback: Callback<T>): Promise<void>;
    async renameScreenTab<T = Models.ScreenableTab>(parameters: any, callback?: undefined): Promise<T>;
    async renameScreenTab<T = Models.ScreenableTab>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteScreenTab<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteScreenTab<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteScreenTab<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async moveScreenTab<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async moveScreenTab<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async moveScreenTab<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/move/${parameters.pos}`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}