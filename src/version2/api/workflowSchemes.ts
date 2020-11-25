import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class WorkflowSchemes {
    constructor(private client: Client) { }
    async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getAllWorkflowSchemes<T = Models.PageBeanWorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/workflowscheme",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createWorkflowScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createWorkflowScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createWorkflowScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/workflowscheme",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getWorkflowScheme<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflowScheme<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflowScheme<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateWorkflowScheme<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateWorkflowScheme<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async updateWorkflowScheme<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteWorkflowScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteWorkflowScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteWorkflowScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: any, callback?: undefined): Promise<T>;
    async getDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async updateDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async deleteDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/default`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflowSchemeIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async setWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async deleteWorkflowSchemeIssueType<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/issuetype/${parameters.issueType}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateWorkflowMapping<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateWorkflowMapping<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async updateWorkflowMapping<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteWorkflowMapping<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteWorkflowMapping<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteWorkflowMapping<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/workflow`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}