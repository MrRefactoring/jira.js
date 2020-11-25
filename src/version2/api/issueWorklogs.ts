import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueWorklogs {
    constructor(private client: Client) { }
    async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueWorklog<T = Models.PageOfWorklogs>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addWorklog<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addWorklog<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addWorklog<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getWorklog<T = Models.Worklog>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorklog<T = Models.Worklog>(parameters: any, callback?: undefined): Promise<T>;
    async getWorklog<T = Models.Worklog>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateWorklog<T = Models.Worklog>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateWorklog<T = Models.Worklog>(parameters: any, callback?: undefined): Promise<T>;
    async updateWorklog<T = Models.Worklog>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteWorklog<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteWorklog<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteWorklog<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/worklog/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters: any, callback?: undefined): Promise<T>;
    async getIdsOfWorklogsDeletedSince<T = Models.ChangedWorklogs>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/worklog/deleted",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getWorklogsForIds<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getWorklogsForIds<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getWorklogsForIds<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/worklog/list",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters: any, callback?: undefined): Promise<T>;
    async getIdsOfWorklogsModifiedSince<T = Models.ChangedWorklogs>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/worklog/updated",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}