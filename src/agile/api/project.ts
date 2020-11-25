import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
export class Project {
    constructor(private client: Client) { }
    async getFeaturesForProject<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async getFeaturesForProject<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async getFeaturesForProject<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/agile/1.0/project/${parameters.projectIdOrKey}/features`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}