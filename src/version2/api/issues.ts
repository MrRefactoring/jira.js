import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Issues {
    constructor(private client: Client) { }
    async createIssue<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createIssue<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createIssue<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issue",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createIssues<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createIssues<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createIssues<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issue/bulk",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getCreateIssueMeta<T = Models.IssueCreateMetadata>(parameters: any, callback: Callback<T>): Promise<void>;
    async getCreateIssueMeta<T = Models.IssueCreateMetadata>(parameters: any, callback?: undefined): Promise<T>;
    async getCreateIssueMeta<T = Models.IssueCreateMetadata>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issue/createmeta",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssue<T = Models.IssueBean>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssue<T = Models.IssueBean>(parameters: any, callback?: undefined): Promise<T>;
    async getIssue<T = Models.IssueBean>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async editIssue<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async editIssue<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async editIssue<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteIssue<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteIssue<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteIssue<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async assignIssue<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async assignIssue<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async assignIssue<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/assignee`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getChangeLogs<T = Models.PageBeanChangelog>(parameters: any, callback: Callback<T>): Promise<void>;
    async getChangeLogs<T = Models.PageBeanChangelog>(parameters: any, callback?: undefined): Promise<T>;
    async getChangeLogs<T = Models.PageBeanChangelog>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/changelog`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getEditIssueMeta<T = Models.IssueUpdateMetadata>(parameters: any, callback: Callback<T>): Promise<void>;
    async getEditIssueMeta<T = Models.IssueUpdateMetadata>(parameters: any, callback?: undefined): Promise<T>;
    async getEditIssueMeta<T = Models.IssueUpdateMetadata>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/editmeta`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async notify<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async notify<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async notify<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/notify`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getTransitions<T = Models.Transitions>(parameters: any, callback: Callback<T>): Promise<void>;
    async getTransitions<T = Models.Transitions>(parameters: any, callback?: undefined): Promise<T>;
    async getTransitions<T = Models.Transitions>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async doTransition<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async doTransition<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async doTransition<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/transitions`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}