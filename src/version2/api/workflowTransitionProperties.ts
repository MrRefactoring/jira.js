import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class WorkflowTransitionProperties {
    constructor(private client: Client) { }
    async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflowTransitionProperties<T = Models.WorkflowTransitionProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: any, callback?: undefined): Promise<T>;
    async createWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: any, callback?: undefined): Promise<T>;
    async updateWorkflowTransitionProperty<T = Models.WorkflowTransitionProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteWorkflowTransitionProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteWorkflowTransitionProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteWorkflowTransitionProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflow/transitions/${parameters.transitionId}/properties`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}