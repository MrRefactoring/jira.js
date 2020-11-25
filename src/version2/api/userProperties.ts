import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class UserProperties {
    constructor(private client: Client) { }
    async getUserPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback: Callback<T>): Promise<void>;
    async getUserPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: undefined): Promise<T>;
    async getUserPropertyKeys<T = Models.PropertyKeys>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/user/properties",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getUserProperty<T = Models.EntityProperty>(parameters: any, callback: Callback<T>): Promise<void>;
    async getUserProperty<T = Models.EntityProperty>(parameters: any, callback?: undefined): Promise<T>;
    async getUserProperty<T = Models.EntityProperty>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setUserProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setUserProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setUserProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteUserProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteUserProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteUserProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}