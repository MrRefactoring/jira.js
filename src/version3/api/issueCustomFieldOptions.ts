import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueCustomFieldOptions {
    constructor(private client: Client) { }
    async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: any, callback: Callback<T>): Promise<void>;
    async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: any, callback?: undefined): Promise<T>;
    async getOptionsForField<T = Models.PageBeanCustomFieldOptionDetails>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/customField/${parameters.fieldId}/option`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createCustomFieldOptions<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createCustomFieldOptions<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createCustomFieldOptions<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/customField/${parameters.fieldId}/option`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateCustomFieldOptions<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateCustomFieldOptions<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateCustomFieldOptions<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/customField/${parameters.fieldId}/option`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: any, callback: Callback<T>): Promise<void>;
    async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: any, callback?: undefined): Promise<T>;
    async getCustomFieldOption<T = Models.CustomFieldOption>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/customFieldOption/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: any, callback: Callback<T>): Promise<void>;
    async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: any, callback?: undefined): Promise<T>;
    async getOptionsForContext<T = Models.PageBeanCustomFieldContextOption>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createCustomFieldOption<T = Models.CustomFieldContextOptionsList>(parameters: any, callback: Callback<T>): Promise<void>;
    async createCustomFieldOption<T = Models.CustomFieldContextOptionsList>(parameters: any, callback?: undefined): Promise<T>;
    async createCustomFieldOption<T = Models.CustomFieldContextOptionsList>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async reorderCustomFieldOptions<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async reorderCustomFieldOptions<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async reorderCustomFieldOptions<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option/move`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteCustomFieldOption<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteCustomFieldOption<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteCustomFieldOption<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/field/${parameters.fieldId}/context/${parameters.contextId}/option/${parameters.optionId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}