import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Permissions {
    constructor(private client: Client) { }
    async getMyPermissions<T = Models.Permissions>(parameters: any, callback: Callback<T>): Promise<void>;
    async getMyPermissions<T = Models.Permissions>(parameters: any, callback?: undefined): Promise<T>;
    async getMyPermissions<T = Models.Permissions>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/mypermissions",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllPermissions<T = Models.Permissions>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllPermissions<T = Models.Permissions>(parameters: any, callback?: undefined): Promise<T>;
    async getAllPermissions<T = Models.Permissions>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/permissions",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getBulkPermissions<T = Models.BulkPermissionGrants>(parameters: any, callback: Callback<T>): Promise<void>;
    async getBulkPermissions<T = Models.BulkPermissionGrants>(parameters: any, callback?: undefined): Promise<T>;
    async getBulkPermissions<T = Models.BulkPermissionGrants>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/permissions/check",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getPermittedProjects<T = Models.PermittedProjects>(parameters: any, callback: Callback<T>): Promise<void>;
    async getPermittedProjects<T = Models.PermittedProjects>(parameters: any, callback?: undefined): Promise<T>;
    async getPermittedProjects<T = Models.PermittedProjects>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/permissions/project",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}