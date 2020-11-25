import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectPermissionSchemes {
    constructor(private client: Client) { }
    async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectIssueSecurityScheme<T = Models.SecurityScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectKeyOrId}/issuesecuritylevelscheme`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAssignedPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAssignedPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getAssignedPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async assignPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async assignPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback?: undefined): Promise<T>;
    async assignPermissionScheme<T = Models.PermissionScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectKeyOrId}/permissionscheme`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(parameters: any, callback: Callback<T>): Promise<void>;
    async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(parameters: any, callback?: undefined): Promise<T>;
    async getSecurityLevelsForProject<T = Models.ProjectIssueSecurityLevels>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectKeyOrId}/securitylevel`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}