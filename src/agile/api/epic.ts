import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class Epic {
    constructor(private client: Client) { }
    async getIssuesWithoutEpic<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssuesWithoutEpic<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getIssuesWithoutEpic<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/agile/1.0/epic/none/issue",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeIssuesFromEpic<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeIssuesFromEpic<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeIssuesFromEpic<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/agile/1.0/epic/none/issue",
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async searchEpics<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async searchEpics<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async searchEpics<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/agile/1.0/epic/search",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getEpic<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getEpic<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getEpic<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/epic/${parameters.epicIdOrKey}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async partiallyUpdateEpic<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async partiallyUpdateEpic<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async partiallyUpdateEpic<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/epic/${parameters.epicIdOrKey}`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getIssuesForEpic<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssuesForEpic<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getIssuesForEpic<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async moveIssuesToEpic<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async moveIssuesToEpic<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async moveIssuesToEpic<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/epic/${parameters.epicIdOrKey}/issue`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async rankEpics<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async rankEpics<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async rankEpics<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/epic/${parameters.epicIdOrKey}/rank`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}