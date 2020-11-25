import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class IssueNavigatorSettings {
    constructor(private client: Client) { }
    async getIssueNavigatorDefaultColumns<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getIssueNavigatorDefaultColumns<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getIssueNavigatorDefaultColumns<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/settings/columns",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async setIssueNavigatorDefaultColumns<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async setIssueNavigatorDefaultColumns<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async setIssueNavigatorDefaultColumns<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/2/settings/columns",
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}