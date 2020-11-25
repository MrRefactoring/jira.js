import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueWatchers {
    constructor(private client: Client) { }
    async getIssueWatchers<T = Models.Watchers>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueWatchers<T = Models.Watchers>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueWatchers<T = Models.Watchers>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addWatcher<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addWatcher<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addWatcher<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeWatcher<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeWatcher<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeWatcher<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}