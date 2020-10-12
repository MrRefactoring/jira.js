import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { RemoteIssueLink as RemoteIssueLinkResponse, RemoteIssueLinkIdentifies as RemoteIssueLinkIdentifiesResponse } from '../../models/v3';

export class IssueRemoteLinks {
  constructor(private readonly client: Client) { }

  async getRemoteIssueLinks(parameters: {
    issueIdOrKey: string;
    globalId?: string;
  }, callback?: Callback<RemoteIssueLinkResponse>): Promise<RemoteIssueLinkResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createOrUpdateRemoteIssueLink(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<RemoteIssueLinkIdentifiesResponse>): Promise<RemoteIssueLinkIdentifiesResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteRemoteIssueLinkByGlobalId(parameters: {
    issueIdOrKey: string;
    globalId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getRemoteIssueLinkById(parameters: {
    issueIdOrKey: string;
    linkId: string;
  }, callback?: Callback<RemoteIssueLinkResponse>): Promise<RemoteIssueLinkResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateRemoteIssueLink(parameters: {
    issueIdOrKey: string;
    linkId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteRemoteIssueLinkById(parameters: {
    issueIdOrKey: string;
    linkId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/remotelink/${parameters.linkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
