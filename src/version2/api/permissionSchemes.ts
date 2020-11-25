import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class PermissionSchemes {
    constructor(private client: Client) { }
    async getAllPermissionSchemes<T = Models.PermissionSchemes>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllPermissionSchemes<T = Models.PermissionSchemes>(parameters: any, callback?: undefined): Promise<T>;
    async getAllPermissionSchemes<T = Models.PermissionSchemes>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/permissionscheme",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createPermissionScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createPermissionScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createPermissionScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/permissionscheme",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updatePermissionScheme<T = Models.PermissionScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async updatePermissionScheme<T = Models.PermissionScheme>(parameters: any, callback?: undefined): Promise<T>;
    async updatePermissionScheme<T = Models.PermissionScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deletePermissionScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deletePermissionScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deletePermissionScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getPermissionSchemeGrants<T = Models.PermissionGrants>(parameters: any, callback: Callback<T>): Promise<void>;
    async getPermissionSchemeGrants<T = Models.PermissionGrants>(parameters: any, callback?: undefined): Promise<T>;
    async getPermissionSchemeGrants<T = Models.PermissionGrants>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createPermissionGrant<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createPermissionGrant<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createPermissionGrant<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getPermissionSchemeGrant<T = Models.PermissionGrant>(parameters: any, callback: Callback<T>): Promise<void>;
    async getPermissionSchemeGrant<T = Models.PermissionGrant>(parameters: any, callback?: undefined): Promise<T>;
    async getPermissionSchemeGrant<T = Models.PermissionGrant>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deletePermissionSchemeEntity<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deletePermissionSchemeEntity<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deletePermissionSchemeEntity<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}