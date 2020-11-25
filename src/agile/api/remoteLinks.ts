import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class RemoteLinks {
    constructor(private client: Client) { }
    async submitRemoteLinks<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async submitRemoteLinks<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async submitRemoteLinks<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/remotelinks/1.0/bulk",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteRemoteLinksByProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteRemoteLinksByProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteRemoteLinksByProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/remotelinks/1.0/bulkByProperties",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getRemoteLinkById<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getRemoteLinkById<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getRemoteLinkById<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/remotelinks/1.0/remotelink/${parameters.remoteLinkId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteRemoteLinkById<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteRemoteLinkById<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteRemoteLinkById<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/remotelinks/1.0/remotelink/${parameters.remoteLinkId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}