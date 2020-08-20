import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import {
  AttachmentSettings,
  AttachmentMetadata,
  AttachmentArchiveMetadataReadable,
  AttachmentArchiveImpl,
} from '../schemas';
export class IssueAttachments {
  constructor(private readonly client: Sender) {}

  public async getJiraAttachmentSettings(
    callback?: Callback<AttachmentSettings>,
  ): Promise<AttachmentSettings> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/attachment/meta',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAttachmentMetadata(
    params: {
      id: string;
    },
    callback?: Callback<AttachmentMetadata>,
  ): Promise<AttachmentMetadata> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/attachment/${params.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteAttachment(
    params: {
      id: string;
    },
    callback?: Callback<void>,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/attachment/${params.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getAllMetadataForAnExpandedAttachment(
    params: {
      id: string;
    },
    callback?: Callback<AttachmentArchiveMetadataReadable>,
  ): Promise<AttachmentArchiveMetadataReadable> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/attachment/${params.id}/expand/human`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getContentsMetadataForAnExpandedAttachment(
    params: {
      id: string;
    },
    callback?: Callback<AttachmentArchiveImpl>,
  ): Promise<AttachmentArchiveImpl> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/attachment/${params.id}/expand/raw`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async addAttachment(
    params: {
      issueIdOrKey: string;
      [key: string]: any;
    },
    callback?: Callback<any>,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/attachments`,
      method: 'POST',
      data: { ...params, issueIdOrKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }
}
