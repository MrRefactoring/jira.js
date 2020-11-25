import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueSecurityLevel {
    constructor(private client: Client) { }
    async getIssueSecurityLevelMembers<T = Models.PageBeanIssueSecurityLevelMember>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueSecurityLevelMembers<T = Models.PageBeanIssueSecurityLevelMember>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueSecurityLevelMembers<T = Models.PageBeanIssueSecurityLevelMember>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuesecurityschemes/${parameters.issueSecuritySchemeId}/members`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueSecurityLevel<T = Models.SecurityLevel>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueSecurityLevel<T = Models.SecurityLevel>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueSecurityLevel<T = Models.SecurityLevel>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/securitylevel/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}