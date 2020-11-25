import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueCustomFieldContexts {
    constructor(private client: Client) { }
    async createCustomFieldContext<T = Models.CustomFieldContext>(parameters: any, callback: Callback<T>): Promise<void>;
    async createCustomFieldContext<T = Models.CustomFieldContext>(parameters: any, callback?: undefined): Promise<T>;
    async createCustomFieldContext<T = Models.CustomFieldContext>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldId}/context`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateCustomFieldContext<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateCustomFieldContext<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateCustomFieldContext<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteCustomFieldContext<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteCustomFieldContext<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteCustomFieldContext<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addIssueTypesToContext<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addIssueTypesToContext<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addIssueTypesToContext<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/issuetype`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async assignProjectsToCustomFieldContext<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async assignProjectsToCustomFieldContext<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async assignProjectsToCustomFieldContext<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldId}/context/${parameters.contextId}/project`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}