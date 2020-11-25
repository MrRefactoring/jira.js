import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Projects {
    constructor(private client: Client) { }
    async getAllProjects<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllProjects<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllProjects<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/project",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createProject<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createProject<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createProject<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/project",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async searchProjects<T = Models.PageBeanProject>(parameters: any, callback: Callback<T>): Promise<void>;
    async searchProjects<T = Models.PageBeanProject>(parameters: any, callback?: undefined): Promise<T>;
    async searchProjects<T = Models.PageBeanProject>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/project/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProject<T = Models.Project>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProject<T = Models.Project>(parameters: any, callback?: undefined): Promise<T>;
    async getProject<T = Models.Project>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateProject<T = Models.Project>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateProject<T = Models.Project>(parameters: any, callback?: undefined): Promise<T>;
    async updateProject<T = Models.Project>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteProject<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteProject<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteProject<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async archiveProject<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async archiveProject<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async archiveProject<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/archive`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteProjectAsynchronously<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteProjectAsynchronously<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteProjectAsynchronously<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/delete`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async restore<T = Models.Project>(parameters: any, callback: Callback<T>): Promise<void>;
    async restore<T = Models.Project>(parameters: any, callback?: undefined): Promise<T>;
    async restore<T = Models.Project>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/restore`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllStatuses<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllStatuses<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllStatuses<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/statuses`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateProjectType<T = Models.Project>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateProjectType<T = Models.Project>(parameters: any, callback?: undefined): Promise<T>;
    async updateProjectType<T = Models.Project>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectIdOrKey}/type/${parameters.newProjectTypeKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: any, callback: Callback<T>): Promise<void>;
    async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: any, callback?: undefined): Promise<T>;
    async getHierarchy<T = Models.ProjectIssueTypeHierarchy>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectId}/hierarchy`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getNotificationSchemeForProject<T = Models.NotificationScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/project/${parameters.projectKeyOrId}/notificationscheme`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}