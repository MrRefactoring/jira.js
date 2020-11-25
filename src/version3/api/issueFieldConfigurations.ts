import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueFieldConfigurations {
    constructor(private client: Client) { }
    async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters: any, callback?: undefined): Promise<T>;
    async getAllFieldConfigurations<T = Models.PageBeanFieldConfiguration>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/fieldconfiguration",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: any, callback?: undefined): Promise<T>;
    async getFieldConfigurationItems<T = Models.PageBeanFieldConfigurationItem>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/fieldconfiguration/${parameters.id}/fields`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getAllFieldConfigurationSchemes<T = Models.PageBeanFieldConfigurationScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/fieldconfigurationscheme",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters: any, callback?: undefined): Promise<T>;
    async getFieldConfigurationSchemeMappings<T = Models.PageBeanFieldConfigurationIssueTypeItem>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/fieldconfigurationscheme/mapping",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: any, callback?: undefined): Promise<T>;
    async getFieldConfigurationSchemeProjectMapping<T = Models.PageBeanFieldConfigurationSchemeProjects>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/fieldconfigurationscheme/project",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async assignFieldConfigurationSchemeToProject<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async assignFieldConfigurationSchemeToProject<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async assignFieldConfigurationSchemeToProject<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/fieldconfigurationscheme/project",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}