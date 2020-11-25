import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueTypeScreenSchemes {
    constructor(private client: Client) { }
    async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescreenscheme",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createIssueTypeScreenScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createIssueTypeScreenScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createIssueTypeScreenScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescreenscheme",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescreenscheme/mapping",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescreenscheme/project",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async assignIssueTypeScreenSchemeToProject<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async assignIssueTypeScreenSchemeToProject<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async assignIssueTypeScreenSchemeToProject<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issuetypescreenscheme/project",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateIssueTypeScreenScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateIssueTypeScreenScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateIssueTypeScreenScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteIssueTypeScreenScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteIssueTypeScreenScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteIssueTypeScreenScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async appendMappingsForIssueTypeScreenScheme<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async appendMappingsForIssueTypeScreenScheme<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async appendMappingsForIssueTypeScreenScheme<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}