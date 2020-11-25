import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ScreenTabFields {
    constructor(private client: Client) { }
    async getAllScreenTabFields<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllScreenTabFields<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllScreenTabFields<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addScreenTabField<T = Models.ScreenableField>(parameters: any, callback: Callback<T>): Promise<void>;
    async addScreenTabField<T = Models.ScreenableField>(parameters: any, callback?: undefined): Promise<T>;
    async addScreenTabField<T = Models.ScreenableField>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeScreenTabField<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeScreenTabField<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeScreenTabField<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async moveScreenTabField<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async moveScreenTabField<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async moveScreenTabField<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/move`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}