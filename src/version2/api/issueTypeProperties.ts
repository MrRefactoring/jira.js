import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueTypeProperties {
    constructor(private client: Client) { }
    async getIssueTypePropertyKeys<T = Models.PropertyKeys>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueTypePropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueTypePropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueTypeProperty<T = Models.EntityProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueTypeProperty<T = Models.EntityProperty>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueTypeProperty<T = Models.EntityProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setIssueTypeProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setIssueTypeProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setIssueTypeProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteIssueTypeProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteIssueTypeProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteIssueTypeProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/issuetype/${parameters.issueTypeId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}