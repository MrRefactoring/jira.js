import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class Builds {
    constructor(private client: Client) { }
    async submitBuilds<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async submitBuilds<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async submitBuilds<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/builds/0.1/bulk",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteBuildsByProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteBuildsByProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteBuildsByProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/builds/0.1/bulkByProperties",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getBuildByKey<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getBuildByKey<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getBuildByKey<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteBuildByKey<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteBuildByKey<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteBuildByKey<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}