import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueTypeSchemes {
    constructor(private client: Client) { }
    async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescheme",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createIssueTypeScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createIssueTypeScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createIssueTypeScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescheme",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescheme/mapping",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescheme/project",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async assignIssueTypeSchemeToProject<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async assignIssueTypeSchemeToProject<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async assignIssueTypeSchemeToProject<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescheme/project",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateIssueTypeScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateIssueTypeScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateIssueTypeScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteIssueTypeScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteIssueTypeScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteIssueTypeScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addIssueTypesToIssueTypeScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addIssueTypesToIssueTypeScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addIssueTypesToIssueTypeScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async reorderIssueTypesInIssueTypeScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async reorderIssueTypesInIssueTypeScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async reorderIssueTypesInIssueTypeScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/move`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeIssueTypeFromIssueTypeScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeIssueTypeFromIssueTypeScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeIssueTypeFromIssueTypeScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/${parameters.issueTypeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}