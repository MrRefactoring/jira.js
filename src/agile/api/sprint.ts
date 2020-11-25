import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class Sprint {
    constructor(private client: Client) { }
    async createSprint<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async createSprint<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async createSprint<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/agile/1.0/sprint",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getSprint<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getSprint<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getSprint<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async partiallyUpdateSprint<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async partiallyUpdateSprint<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async partiallyUpdateSprint<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async updateSprint<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async updateSprint<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async updateSprint<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteSprint<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteSprint<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteSprint<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssuesForSprint<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssuesForSprint<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getIssuesForSprint<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}/issue`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async moveIssuesToSprintAndRank<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async moveIssuesToSprintAndRank<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async moveIssuesToSprintAndRank<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}/issue`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getPropertiesKeys<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getPropertiesKeys<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getPropertiesKeys<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}/properties`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async deleteProperty<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async deleteProperty<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async deleteProperty<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}/properties/${parameters.propertyKey}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async swapSprint<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async swapSprint<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async swapSprint<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/sprint/${parameters.sprintId}/swap`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}