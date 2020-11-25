import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueSecuritySchemes {
    constructor(private client: Client) { }
    async getIssueSecuritySchemes<T = Models.SecuritySchemes>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueSecuritySchemes<T = Models.SecuritySchemes>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueSecuritySchemes<T = Models.SecuritySchemes>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/issuesecurityschemes",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueSecurityScheme<T = Models.SecurityScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueSecurityScheme<T = Models.SecurityScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueSecurityScheme<T = Models.SecurityScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issuesecurityschemes/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}