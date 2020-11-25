import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class Issue {
    constructor(private client: Client) { }
    async rankIssues<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async rankIssues<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async rankIssues<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/agile/1.0/issue/rank",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssue<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssue<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getIssue<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/issue/${parameters.issueIdOrKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueEstimationForBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueEstimationForBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueEstimationForBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async estimateIssueForBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async estimateIssueForBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async estimateIssueForBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}