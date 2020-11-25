import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class FilterSharing {
    constructor(private client: Client) { }
    async getDefaultShareScope<T = Models.DefaultShareScope>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDefaultShareScope<T = Models.DefaultShareScope>(parameters: any, callback?: undefined): Promise<T>;
    async getDefaultShareScope<T = Models.DefaultShareScope>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/filter/defaultShareScope",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setDefaultShareScope<T = Models.DefaultShareScope>(parameters: any, callback: Callback<T>): Promise<void>;
    async setDefaultShareScope<T = Models.DefaultShareScope>(parameters: any, callback?: undefined): Promise<T>;
    async setDefaultShareScope<T = Models.DefaultShareScope>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/filter/defaultShareScope",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getSharePermissions<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getSharePermissions<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getSharePermissions<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/permission`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addSharePermission<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addSharePermission<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addSharePermission<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/permission`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getSharePermission<T = Models.SharePermission>(parameters: any, callback: Callback<T>): Promise<void>;
    async getSharePermission<T = Models.SharePermission>(parameters: any, callback?: undefined): Promise<T>;
    async getSharePermission<T = Models.SharePermission>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/permission/${parameters.permissionId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteSharePermission<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteSharePermission<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteSharePermission<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/filter/${parameters.id}/permission/${parameters.permissionId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}