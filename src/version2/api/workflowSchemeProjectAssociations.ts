import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class WorkflowSchemeProjectAssociations {
    constructor(private client: Client) { }
    async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflowSchemeProjectAssociations<T = Models.ContainerOfWorkflowSchemeAssociations>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/workflowscheme/project",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async associateSchemeWithProject<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async associateSchemeWithProject<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async associateSchemeWithProject<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/workflowscheme/project",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}