import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class UserSearch {
    constructor(private client: Client) { }
    async findBulkAssignableUsers<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async findBulkAssignableUsers<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async findBulkAssignableUsers<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/user/assignable/multiProjectSearch",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async findAssignableUsers<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async findAssignableUsers<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async findAssignableUsers<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/user/assignable/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async findUsersWithAllPermissions<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async findUsersWithAllPermissions<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async findUsersWithAllPermissions<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/user/permission/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async findUsersForPicker<T = Models.FoundUsers>(parameters: any, callback: Callback<T>): Promise<void>;
    async findUsersForPicker<T = Models.FoundUsers>(parameters: any, callback?: undefined): Promise<T>;
    async findUsersForPicker<T = Models.FoundUsers>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/user/picker",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async findUsers<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async findUsers<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async findUsers<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/user/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async findUsersByQuery<T = Models.PageBeanUser>(parameters: any, callback: Callback<T>): Promise<void>;
    async findUsersByQuery<T = Models.PageBeanUser>(parameters: any, callback?: undefined): Promise<T>;
    async findUsersByQuery<T = Models.PageBeanUser>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/user/search/query",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async findUserKeysByQuery<T = Models.PageBeanUserKey>(parameters: any, callback: Callback<T>): Promise<void>;
    async findUserKeysByQuery<T = Models.PageBeanUserKey>(parameters: any, callback?: undefined): Promise<T>;
    async findUserKeysByQuery<T = Models.PageBeanUserKey>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/user/search/query/key",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async findUsersWithBrowsePermission<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async findUsersWithBrowsePermission<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async findUsersWithBrowsePermission<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/user/viewissue/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}