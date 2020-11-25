import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class AuditRecords {
    constructor(private client: Client) { }
    async getAuditRecords<T = Models.AuditRecords>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAuditRecords<T = Models.AuditRecords>(parameters: any, callback?: undefined): Promise<T>;
    async getAuditRecords<T = Models.AuditRecords>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/auditing/record",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}