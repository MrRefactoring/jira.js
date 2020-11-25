import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectKeyAndNameValidation {
    constructor(private client: Client) { }
    async validateProjectKey<T = Models.ErrorCollection>(parameters: any, callback: Callback<T>): Promise<void>;
    async validateProjectKey<T = Models.ErrorCollection>(parameters: any, callback?: undefined): Promise<T>;
    async validateProjectKey<T = Models.ErrorCollection>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/projectvalidate/key",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getValidProjectKey<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getValidProjectKey<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getValidProjectKey<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/projectvalidate/validProjectKey",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getValidProjectName<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getValidProjectName<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getValidProjectName<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/projectvalidate/validProjectName",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}