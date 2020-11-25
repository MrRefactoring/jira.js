import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ProjectVersions {
    constructor(private client: Client) { }
    async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/version`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProjectVersions<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProjectVersions<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getProjectVersions<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/versions`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createVersion<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createVersion<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createVersion<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/version",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getVersion<T = Models.Version>(parameters: any, callback: Callback<T>): Promise<void>;
    async getVersion<T = Models.Version>(parameters: any, callback?: undefined): Promise<T>;
    async getVersion<T = Models.Version>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/version/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateVersion<T = Models.Version>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateVersion<T = Models.Version>(parameters: any, callback?: undefined): Promise<T>;
    async updateVersion<T = Models.Version>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/version/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteVersion<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteVersion<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteVersion<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/version/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async mergeVersions<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async mergeVersions<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async mergeVersions<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async moveVersion<T = Models.Version>(parameters: any, callback: Callback<T>): Promise<void>;
    async moveVersion<T = Models.Version>(parameters: any, callback?: undefined): Promise<T>;
    async moveVersion<T = Models.Version>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/version/${parameters.id}/move`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: any, callback: Callback<T>): Promise<void>;
    async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: any, callback?: undefined): Promise<T>;
    async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/version/${parameters.id}/relatedIssueCounts`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteAndReplaceVersion<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteAndReplaceVersion<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteAndReplaceVersion<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/version/${parameters.id}/removeAndSwap`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: any, callback: Callback<T>): Promise<void>;
    async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: any, callback?: undefined): Promise<T>;
    async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/version/${parameters.id}/unresolvedIssueCount`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}