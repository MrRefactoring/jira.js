import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectComponents {
    constructor(private client: Client) { }
    async createComponent<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createComponent<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createComponent<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/component",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getComponent<T = Models.Component>(parameters: any, callback: Callback<T>): Promise<void>;
    async getComponent<T = Models.Component>(parameters: any, callback?: undefined): Promise<T>;
    async getComponent<T = Models.Component>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/component/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateComponent<T = Models.Component>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateComponent<T = Models.Component>(parameters: any, callback?: undefined): Promise<T>;
    async updateComponent<T = Models.Component>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/component/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteComponent<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteComponent<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteComponent<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/component/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(parameters: any, callback: Callback<T>): Promise<void>;
    async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(parameters: any, callback?: undefined): Promise<T>;
    async getComponentRelatedIssues<T = Models.ComponentIssuesCount>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/component/${parameters.id}/relatedIssueCounts`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectComponentsPaginated<T = Models.PageBeanComponentWithIssueCount>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/component`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectComponents<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectComponents<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectComponents<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/components`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}