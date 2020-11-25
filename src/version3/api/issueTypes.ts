import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueTypes {
    constructor(private client: Client) { }
    async getIssueAllTypes<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueAllTypes<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueAllTypes<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/issuetype",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createIssueType<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createIssueType<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createIssueType<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/issuetype",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueType<T = Models.IssueTypeDetails>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueType<T = Models.IssueTypeDetails>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueType<T = Models.IssueTypeDetails>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issuetype/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateIssueType<T = Models.IssueTypeDetails>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateIssueType<T = Models.IssueTypeDetails>(parameters: any, callback?: undefined): Promise<T>;
    async updateIssueType<T = Models.IssueTypeDetails>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issuetype/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteIssueType<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteIssueType<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteIssueType<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issuetype/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAlternativeIssueTypes<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAlternativeIssueTypes<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAlternativeIssueTypes<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issuetype/${parameters.id}/alternatives`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createIssueTypeAvatar<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createIssueTypeAvatar<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createIssueTypeAvatar<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issuetype/${parameters.id}/avatar2`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}