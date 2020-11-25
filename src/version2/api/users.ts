import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Users {
    constructor(private client: Client) { }
    async getUser<T = Models.User>(parameters: any, callback: Callback<T>): Promise<void>;
    async getUser<T = Models.User>(parameters: any, callback?: undefined): Promise<T>;
    async getUser<T = Models.User>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async createUser<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createUser<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createUser<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeUser<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeUser<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeUser<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async bulkGetUsers<T = Models.PageBeanUser>(parameters: any, callback: Callback<T>): Promise<void>;
    async bulkGetUsers<T = Models.PageBeanUser>(parameters: any, callback?: undefined): Promise<T>;
    async bulkGetUsers<T = Models.PageBeanUser>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/bulk",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async bulkGetUsersMigration<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async bulkGetUsersMigration<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async bulkGetUsersMigration<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/bulk/migration",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getUserDefaultColumns<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getUserDefaultColumns<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getUserDefaultColumns<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/columns",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setUserColumns<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setUserColumns<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setUserColumns<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/columns",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async resetUserColumns<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async resetUserColumns<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async resetUserColumns<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/columns",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: any, callback: Callback<T>): Promise<void>;
    async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: any, callback?: undefined): Promise<T>;
    async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/email",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: any, callback: Callback<T>): Promise<void>;
    async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: any, callback?: undefined): Promise<T>;
    async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/email/bulk",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getUserGroups<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getUserGroups<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getUserGroups<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/groups",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllUsersDefault<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllUsersDefault<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllUsersDefault<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/users",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAllUsers<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllUsers<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getAllUsers<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/users/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}