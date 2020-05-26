import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueAttachments {
  constructor(private readonly client: Sender) { }

  public async getJiraAttachmentSettings(callback?: Callback): Promise<any> {
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
    callback?: Callback,
  ): Promise<any> {
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
    callback?: Callback,
  ): Promise<any> {
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
    callback?: Callback,
  ): Promise<any> {
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
    callback?: Callback,
  ): Promise<any> {
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
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/attachments`,
      method: 'POST',
      data: { ...params, issueIdOrKey: undefined },
    };
    return this.client.sendRequest(request, callback);
  }
}
