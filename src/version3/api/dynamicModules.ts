import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class DynamicModules {
    constructor(private client: Client) { }
    async DynamicModulesResource.getModules_get<T = Models.ConnectModules>(parameters: any, callback: Callback<T>): Promise<void>;
    async DynamicModulesResource.getModules_get<T = Models.ConnectModules>(parameters: any, callback?: undefined): Promise<T>;
    async DynamicModulesResource.getModules_get<T = Models.ConnectModules>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/atlassian-connect/1/app/module/dynamic",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async DynamicModulesResource.registerModules_post<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async DynamicModulesResource.registerModules_post<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async DynamicModulesResource.registerModules_post<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/atlassian-connect/1/app/module/dynamic",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async DynamicModulesResource.removeModules_delete<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async DynamicModulesResource.removeModules_delete<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async DynamicModulesResource.removeModules_delete<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/atlassian-connect/1/app/module/dynamic",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}