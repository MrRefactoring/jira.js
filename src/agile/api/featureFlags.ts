import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class FeatureFlags {
    constructor(private client: Client) { }
    async submitFeatureFlags<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async submitFeatureFlags<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async submitFeatureFlags<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/featureflags/0.1/bulk",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteFeatureFlagsByProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteFeatureFlagsByProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteFeatureFlagsByProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/featureflags/0.1/bulkByProperties",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getFeatureFlagById<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFeatureFlagById<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getFeatureFlagById<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/featureflags/0.1/flag/${parameters.featureFlagId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteFeatureFlagById<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteFeatureFlagById<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteFeatureFlagById<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/featureflags/0.1/flag/${parameters.featureFlagId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}