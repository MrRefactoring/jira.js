import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueSearch {
    constructor(private client: Client) { }
    async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters: any, callback?: undefined): Promise<T>;
    async getIssuePickerResource<T = Models.IssuePickerSuggestions>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/issue/picker",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async matchIssues<T = Models.IssueMatches>(parameters: any, callback: Callback<T>): Promise<void>;
    async matchIssues<T = Models.IssueMatches>(parameters: any, callback?: undefined): Promise<T>;
    async matchIssues<T = Models.IssueMatches>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/jql/match",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async searchForIssuesUsingJql<T = Models.SearchResults>(parameters: any, callback: Callback<T>): Promise<void>;
    async searchForIssuesUsingJql<T = Models.SearchResults>(parameters: any, callback?: undefined): Promise<T>;
    async searchForIssuesUsingJql<T = Models.SearchResults>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async searchForIssuesUsingJqlPost<T = Models.SearchResults>(parameters: any, callback: Callback<T>): Promise<void>;
    async searchForIssuesUsingJqlPost<T = Models.SearchResults>(parameters: any, callback?: undefined): Promise<T>;
    async searchForIssuesUsingJqlPost<T = Models.SearchResults>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/search",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}