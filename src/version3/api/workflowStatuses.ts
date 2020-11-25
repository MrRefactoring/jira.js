import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class WorkflowStatuses {
    constructor(private client: Client) { }
    async getStatuses<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getStatuses<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getStatuses<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/status",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getStatus<T = Models.StatusDetails>(parameters: any, callback: Callback<T>): Promise<void>;
    async getStatus<T = Models.StatusDetails>(parameters: any, callback?: undefined): Promise<T>;
    async getStatus<T = Models.StatusDetails>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/status/${parameters.idOrName}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}