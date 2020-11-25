import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueLinks {
    constructor(private client: Client) { }
    async linkIssues<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async linkIssues<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async linkIssues<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issueLink",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueLink<T = Models.IssueLink>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueLink<T = Models.IssueLink>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueLink<T = Models.IssueLink>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issueLink/${parameters.linkId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteIssueLink<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteIssueLink<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteIssueLink<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issueLink/${parameters.linkId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}