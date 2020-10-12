import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import {
  AttachmentSettings as AttachmentSettingsResponse, AttachmentMetadata as AttachmentMetadataResponse, AttachmentArchiveMetadataReadable as AttachmentArchiveMetadataReadableResponse, AttachmentArchiveImpl as AttachmentArchiveImplResponse,
} from '../../models/v3';

export class IssueAttachments {
  constructor(private readonly client: Client) { }

  async getAttachmentMeta(parameters?: any, callback?: Callback<AttachmentSettingsResponse>): Promise<AttachmentSettingsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/attachment/meta',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAttachment(parameters: {
    id: string;
  }, callback?: Callback<AttachmentMetadataResponse>): Promise<AttachmentMetadataResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/attachment/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeAttachment(parameters: {
    id: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/attachment/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async expandAttachmentForHumans(parameters: {
    id: string;
  }, callback?: Callback<AttachmentArchiveMetadataReadableResponse>): Promise<AttachmentArchiveMetadataReadableResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/attachment/${parameters.id}/expand/human`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async expandAttachmentForMachines(parameters: {
    id: string;
  }, callback?: Callback<AttachmentArchiveImplResponse>): Promise<AttachmentArchiveImplResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/attachment/${parameters.id}/expand/raw`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addAttachment(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/attachments`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
