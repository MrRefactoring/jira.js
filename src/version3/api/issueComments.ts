import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueComments {
    constructor(private client: Client) { }
    async getCommentsByIds<T = Models.PageBeanComment>(parameters: any, callback: Callback<T>): Promise<void>;
    async getCommentsByIds<T = Models.PageBeanComment>(parameters: any, callback?: undefined): Promise<T>;
    async getCommentsByIds<T = Models.PageBeanComment>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/comment/list",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getComments<T = Models.PageOfComments>(parameters: any, callback: Callback<T>): Promise<void>;
    async getComments<T = Models.PageOfComments>(parameters: any, callback?: undefined): Promise<T>;
    async getComments<T = Models.PageOfComments>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addComment<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addComment<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addComment<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getComment<T = Models.Comment>(parameters: any, callback: Callback<T>): Promise<void>;
    async getComment<T = Models.Comment>(parameters: any, callback?: undefined): Promise<T>;
    async getComment<T = Models.Comment>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateComment<T = Models.Comment>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateComment<T = Models.Comment>(parameters: any, callback?: undefined): Promise<T>;
    async updateComment<T = Models.Comment>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteComment<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteComment<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteComment<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/comment/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}