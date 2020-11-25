import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class Labels {
    constructor(private client: Client) { }
    async getAllLabels<T = Models.PageBeanString>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAllLabels<T = Models.PageBeanString>(parameters: any, callback?: undefined): Promise<T>;
    async getAllLabels<T = Models.PageBeanString>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/label",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}