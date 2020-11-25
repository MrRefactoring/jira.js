import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Avatars {
    constructor(private client: Client) { }
    async getAllSystemAvatars<T = Models.SystemAvatars>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllSystemAvatars<T = Models.SystemAvatars>(parameters: any, callback?: undefined): Promise<T>;
    async getAllSystemAvatars<T = Models.SystemAvatars>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/avatar/${parameters.type}/system`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAvatars<T = Models.Avatars>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAvatars<T = Models.Avatars>(parameters: any, callback?: undefined): Promise<T>;
    async getAvatars<T = Models.Avatars>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async storeAvatar<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async storeAvatar<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async storeAvatar<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.entityId}`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteAvatar<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteAvatar<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteAvatar<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/universal_avatar/type/${parameters.type}/owner/${parameters.owningObjectId}/avatar/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}