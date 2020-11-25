import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class Deployments {
    constructor(private client: Client) { }
    async submitDeployments<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async submitDeployments<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async submitDeployments<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/deployments/0.1/bulk",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteDeploymentsByProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteDeploymentsByProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteDeploymentsByProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/deployments/0.1/bulkByProperties",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDeploymentByKey<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDeploymentByKey<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getDeploymentByKey<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteDeploymentByKey<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteDeploymentByKey<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteDeploymentByKey<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getDeploymentGatingStatusByKey<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getDeploymentGatingStatusByKey<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getDeploymentGatingStatusByKey<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}/gating-status`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}