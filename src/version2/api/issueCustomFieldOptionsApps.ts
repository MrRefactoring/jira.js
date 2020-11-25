import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueCustomFieldOptionsApps {
    constructor(private client: Client) { }
    async getAllIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback?: undefined): Promise<T>;
    async getAllIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldKey}/option`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback: Callback<T>): Promise<void>;
    async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback?: undefined): Promise<T>;
    async createIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldKey}/option`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getSelectableIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback: Callback<T>): Promise<void>;
    async getSelectableIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback?: undefined): Promise<T>;
    async getSelectableIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldKey}/option/suggestions/edit`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getVisibleIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback: Callback<T>): Promise<void>;
    async getVisibleIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback?: undefined): Promise<T>;
    async getVisibleIssueFieldOptions<T = Models.PageBeanIssueFieldOption>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldKey}/option/suggestions/search`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback?: undefined): Promise<T>;
    async updateIssueFieldOption<T = Models.IssueFieldOption>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteIssueFieldOption<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteIssueFieldOption<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteIssueFieldOption<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async replaceIssueFieldOption<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async replaceIssueFieldOption<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async replaceIssueFieldOption<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/field/${parameters.fieldKey}/option/${parameters.optionId}/issue`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}