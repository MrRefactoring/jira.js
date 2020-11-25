import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Webhooks {
    constructor(private client: Client) { }
    async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters: any, callback?: undefined): Promise<T>;
    async getDynamicWebhooksForApp<T = Models.PageBeanWebhook>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/webhook",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters: any, callback: Callback<T>): Promise<void>;
    async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters: any, callback?: undefined): Promise<T>;
    async registerDynamicWebhooks<T = Models.ContainerForRegisteredWebhooks>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/webhook",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteWebhookById<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteWebhookById<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteWebhookById<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/webhook",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFailedWebhooks<T = Models.FailedWebhooks>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFailedWebhooks<T = Models.FailedWebhooks>(parameters: any, callback?: undefined): Promise<T>;
    async getFailedWebhooks<T = Models.FailedWebhooks>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/webhook/failed",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters: any, callback: Callback<T>): Promise<void>;
    async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters: any, callback?: undefined): Promise<T>;
    async refreshWebhooks<T = Models.WebhooksExpirationDate>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/webhook/refresh",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}