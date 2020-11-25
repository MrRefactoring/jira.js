import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Tasks {
    constructor(private client: Client) { }
    async getTask<T = Models.TaskProgressBeanObject>(parameters: any, callback: Callback<T>): Promise<void>;
    async getTask<T = Models.TaskProgressBeanObject>(parameters: any, callback?: undefined): Promise<T>;
    async getTask<T = Models.TaskProgressBeanObject>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/task/${parameters.taskId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async cancelTask<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async cancelTask<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async cancelTask<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/task/${parameters.taskId}/cancel`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}