import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueProperties {
    constructor(private client: Client) { }
    async bulkSetIssuesProperties<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async bulkSetIssuesProperties<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async bulkSetIssuesProperties<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/issue/properties",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async bulkSetIssueProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async bulkSetIssueProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async bulkSetIssueProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async bulkDeleteIssueProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async bulkDeleteIssueProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async bulkDeleteIssueProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssuePropertyKeys<T = Models.PropertyKeys>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssuePropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: undefined): Promise<T>;
    async getIssuePropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssueProperty<T = Models.EntityProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueProperty<T = Models.EntityProperty>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueProperty<T = Models.EntityProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setIssueProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setIssueProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setIssueProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteIssueProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteIssueProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteIssueProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}