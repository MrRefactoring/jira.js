import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class DevelopmentInformation {
    constructor(private client: Client) { }
    async storeDevelopmentInformation<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async storeDevelopmentInformation<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async storeDevelopmentInformation<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/devinfo/0.10/bulk",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getRepository<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getRepository<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getRepository<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/devinfo/0.10/repository/${parameters.repositoryId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteRepository<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteRepository<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteRepository<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/devinfo/0.10/repository/${parameters.repositoryId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteByProperties<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteByProperties<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteByProperties<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/devinfo/0.10/bulkByProperties",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async existsByProperties<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async existsByProperties<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async existsByProperties<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/devinfo/0.10/existsByProperties",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteEntity<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteEntity<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteEntity<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/devinfo/0.10/repository/${parameters.repositoryId}/${parameters.entityType}/${parameters.entityId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}