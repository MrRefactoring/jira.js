import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Screens {
    constructor(private client: Client) { }
    async getScreensForField<T = Models.PageBeanScreen>(parameters: any, callback: Callback<T>): Promise<void>;
    async getScreensForField<T = Models.PageBeanScreen>(parameters: any, callback?: undefined): Promise<T>;
    async getScreensForField<T = Models.PageBeanScreen>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldId}/screens`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getScreens<T = Models.PageBeanScreen>(parameters: any, callback: Callback<T>): Promise<void>;
    async getScreens<T = Models.PageBeanScreen>(parameters: any, callback?: undefined): Promise<T>;
    async getScreens<T = Models.PageBeanScreen>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/screens",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createScreen<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createScreen<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createScreen<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/screens",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addFieldToDefaultScreen<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addFieldToDefaultScreen<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addFieldToDefaultScreen<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/screens/addToDefault/${parameters.fieldId}`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateScreen<T = Models.Screen>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateScreen<T = Models.Screen>(parameters: any, callback?: undefined): Promise<T>;
    async updateScreen<T = Models.Screen>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/screens/${parameters.screenId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteScreen<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteScreen<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteScreen<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/screens/${parameters.screenId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAvailableScreenFields<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAvailableScreenFields<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAvailableScreenFields<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/screens/${parameters.screenId}/availableFields`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}