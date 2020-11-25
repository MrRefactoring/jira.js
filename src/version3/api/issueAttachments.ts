import { Client } from "../../clients/client";
import { Callback } from "../../callback";
import { RequestConfig } from "../../requestConfig";
import * as Models from "../models";
export class IssueAttachments {
    constructor(private client: Client) { }
    async getAttachmentMeta<T = Models.AttachmentSettings>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAttachmentMeta<T = Models.AttachmentSettings>(parameters: any, callback?: undefined): Promise<T>;
    async getAttachmentMeta<T = Models.AttachmentSettings>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: "/rest/api/3/attachment/meta",
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async getAttachment<T = Models.AttachmentMetadata>(parameters: any, callback: Callback<T>): Promise<void>;
    async getAttachment<T = Models.AttachmentMetadata>(parameters: any, callback?: undefined): Promise<T>;
    async getAttachment<T = Models.AttachmentMetadata>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/attachment/${parameters.id}`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async removeAttachment<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async removeAttachment<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async removeAttachment<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/attachment/${parameters.id}`,
            method: "PUT"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(parameters: any, callback: Callback<T>): Promise<void>;
    async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(parameters: any, callback?: undefined): Promise<T>;
    async expandAttachmentForHumans<T = Models.AttachmentArchiveMetadataReadable>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/attachment/${parameters.id}/expand/human`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(parameters: any, callback: Callback<T>): Promise<void>;
    async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(parameters: any, callback?: undefined): Promise<T>;
    async expandAttachmentForMachines<T = Models.AttachmentArchiveImpl>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/attachment/${parameters.id}/expand/raw`,
            method: "GET"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
    async addAttachment<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
    async addAttachment<T = any>(parameters: any, callback?: undefined): Promise<T>;
    async addAttachment<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
        const config = ({
            url: `/rest/api/3/issue/${parameters.issueIdOrKey}/attachments`,
            method: "POST"
        } as RequestConfig);
        return this.client.sendRequest(config, callback);
    }
}