import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class ServerInfo {
    constructor(private client: Client) { }
    async getServerInfo<T = Models.ServerInformation>(parameters: any, callback: Callback<T>): Promise<void>;
    async getServerInfo<T = Models.ServerInformation>(parameters: any, callback?: undefined): Promise<T>;
    async getServerInfo<T = Models.ServerInformation>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/serverInfo",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}