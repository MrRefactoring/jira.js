import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class WorkflowStatusCategories {
    constructor(private client: Client) { }
    async getStatusCategories<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getStatusCategories<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getStatusCategories<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/statuscategory",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getStatusCategory<T = Models.StatusCategory>(parameters: any, callback: Callback<T>): Promise<void>;
    async getStatusCategory<T = Models.StatusCategory>(parameters: any, callback?: undefined): Promise<T>;
    async getStatusCategory<T = Models.StatusCategory>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/statuscategory/${parameters.idOrKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}