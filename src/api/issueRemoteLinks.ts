import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class IssueRemoteLinks {
  constructor(private readonly client: Sender) {}

  public async getRemoteIssueLinks(
    params: {
      issueIdOrKey: string;
      globalId?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/remotelink`,
      method: 'GET',
      params: {
        globalId: params.globalId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createOrUpdateRemoteIssueLink(
    params: {
      issueIdOrKey: string;
      globalId?: string;
      application?: any;
      relationship?: string;
      object?: any;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/remotelink`,
      method: 'POST',
      data: { ...params, issueIdOrKey: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteRemoteIssueLinkByGlobalId(
    params: {
      issueIdOrKey: string;
      globalId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/remotelink`,
      method: 'DELETE',
      params: {
        globalId: params.globalId,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getRemoteIssueLinkById(
    params: {
      issueIdOrKey: string;
      linkId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/remotelink/${params.linkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateRemoteIssueLinkById(
    params: {
      issueIdOrKey: string;
      linkId: string;
      globalId?: string;
      application?: any;
      relationship?: string;
      object?: any;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/remotelink/${params.linkId}`,
      method: 'PUT',
      data: { ...params, issueIdOrKey: undefined, linkId: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteRemoteIssueLinkById(
    params: {
      issueIdOrKey: string;
      linkId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/remotelink/${params.linkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
