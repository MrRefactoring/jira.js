import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Myself {
    constructor(private client: Client) { }
    async getPreference<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getPreference<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getPreference<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/mypreferences",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setPreference<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setPreference<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setPreference<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/mypreferences",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removePreference<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removePreference<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removePreference<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/mypreferences",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getLocale<T = Models.Locale>(parameters: any, callback: Callback<T>): Promise<void>;
    async getLocale<T = Models.Locale>(parameters: any, callback?: undefined): Promise<T>;
    async getLocale<T = Models.Locale>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/mypreferences/locale",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setLocale<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setLocale<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setLocale<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/mypreferences/locale",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteLocale<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteLocale<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteLocale<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/mypreferences/locale",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getCurrentUser<T = Models.User>(parameters: any, callback: Callback<T>): Promise<void>;
    async getCurrentUser<T = Models.User>(parameters: any, callback?: undefined): Promise<T>;
    async getCurrentUser<T = Models.User>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/myself",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}