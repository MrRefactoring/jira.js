import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class WorkflowSchemeDrafts {
    constructor(private client: Client) { }
    async createWorkflowSchemeDraftFromParent<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createWorkflowSchemeDraftFromParent<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createWorkflowSchemeDraftFromParent<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/createdraft`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async updateWorkflowSchemeDraft<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteWorkflowSchemeDraft<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteWorkflowSchemeDraft<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteWorkflowSchemeDraft<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: any, callback?: undefined): Promise<T>;
    async getDraftDefaultWorkflow<T = Models.DefaultWorkflow>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async updateDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async deleteDraftDefaultWorkflow<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/default`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: any, callback?: undefined): Promise<T>;
    async getWorkflowSchemeDraftIssueType<T = Models.IssueTypeWorkflowMapping>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async setWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async deleteWorkflowSchemeDraftIssueType<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/issuetype/${parameters.issueType}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: any, callback?: undefined): Promise<T>;
    async getDraftWorkflow<T = Models.IssueTypesWorkflowMapping>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: any, callback?: undefined): Promise<T>;
    async updateDraftWorkflowMapping<T = Models.WorkflowScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteDraftWorkflowMapping<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteDraftWorkflowMapping<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteDraftWorkflowMapping<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/workflowscheme/${parameters.id}/draft/workflow`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}