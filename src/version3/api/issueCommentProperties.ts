import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueCommentProperties {
    constructor(private client: Client) { }
    async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback: Callback<T>): Promise<void>;
    async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: undefined): Promise<T>;
    async getCommentPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/comment/${parameters.commentId}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getCommentProperty<T = Models.EntityProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async getCommentProperty<T = Models.EntityProperty>(parameters: any, callback?: undefined): Promise<T>;
    async getCommentProperty<T = Models.EntityProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setCommentProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setCommentProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setCommentProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteCommentProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteCommentProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteCommentProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/comment/${parameters.commentId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}