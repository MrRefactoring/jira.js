import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueVotes {
    constructor(private client: Client) { }
    async getVotes<T = Models.Votes>(parameters: any, callback: Callback<T>): Promise<void>;
    async getVotes<T = Models.Votes>(parameters: any, callback?: undefined): Promise<T>;
    async getVotes<T = Models.Votes>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addVote<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addVote<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addVote<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeVote<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeVote<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeVote<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/votes`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}