import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueNotificationSchemes {
    constructor(private client: Client) { }
    async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getNotificationSchemes<T = Models.PageBeanNotificationScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/notificationscheme",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getNotificationScheme<T = Models.NotificationScheme>(parameters: any, callback: Callback<T>): Promise<void>;
    async getNotificationScheme<T = Models.NotificationScheme>(parameters: any, callback?: undefined): Promise<T>;
    async getNotificationScheme<T = Models.NotificationScheme>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/notificationscheme/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}