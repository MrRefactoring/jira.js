import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Groups {
    constructor(private client: Client) { }
    async getGroup<T = Models.Group>(parameters: any, callback: Callback<T>): Promise<void>;
    async getGroup<T = Models.Group>(parameters: any, callback?: undefined): Promise<T>;
    async getGroup<T = Models.Group>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/group",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createGroup<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createGroup<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createGroup<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/group",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeGroup<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeGroup<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeGroup<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/group",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters: any, callback: Callback<T>): Promise<void>;
    async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters: any, callback?: undefined): Promise<T>;
    async bulkGetGroups<T = Models.PageBeanGroupDetails>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/group/bulk",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: any, callback: Callback<T>): Promise<void>;
    async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: any, callback?: undefined): Promise<T>;
    async getUsersFromGroup<T = Models.PageBeanUserDetails>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/group/member",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addUserToGroup<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addUserToGroup<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addUserToGroup<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/group/user",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeUserFromGroup<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeUserFromGroup<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeUserFromGroup<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/group/user",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async findGroups<T = Models.FoundGroups>(parameters: any, callback: Callback<T>): Promise<void>;
    async findGroups<T = Models.FoundGroups>(parameters: any, callback?: undefined): Promise<T>;
    async findGroups<T = Models.FoundGroups>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/groups/picker",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}