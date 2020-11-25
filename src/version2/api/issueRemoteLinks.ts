import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueRemoteLinks {
    constructor(private client: Client) { }
    async getRemoteIssueLinks<T = Models.RemoteIssueLink>(parameters: any, callback: Callback<T>): Promise<void>;
    async getRemoteIssueLinks<T = Models.RemoteIssueLink>(parameters: any, callback?: undefined): Promise<T>;
    async getRemoteIssueLinks<T = Models.RemoteIssueLink>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(parameters: any, callback: Callback<T>): Promise<void>;
    async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(parameters: any, callback?: undefined): Promise<T>;
    async createOrUpdateRemoteIssueLink<T = Models.RemoteIssueLinkIdentifies>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteRemoteIssueLinkByGlobalId<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteRemoteIssueLinkByGlobalId<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteRemoteIssueLinkByGlobalId<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(parameters: any, callback: Callback<T>): Promise<void>;
    async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(parameters: any, callback?: undefined): Promise<T>;
    async getRemoteIssueLinkById<T = Models.RemoteIssueLink>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateRemoteIssueLink<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateRemoteIssueLink<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateRemoteIssueLink<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteRemoteIssueLinkById<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteRemoteIssueLinkById<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteRemoteIssueLinkById<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}