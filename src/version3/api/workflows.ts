import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Workflows {
    constructor(private client: Client) { }
    async getAllWorkflows<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllWorkflows<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllWorkflows<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/workflow",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflowsPaginated<T = Models.PageBeanWorkflow>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/workflow/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}