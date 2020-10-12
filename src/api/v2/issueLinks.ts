import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { IssueLink as IssueLinkResponse } from '../../models/v2';

export class IssueLinks {
  constructor(private readonly client: Client) { }

  async linkIssues(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/issueLink',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueLink(parameters: {
    linkId: string;
  }, callback?: Callback<IssueLinkResponse>): Promise<IssueLinkResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLink/${parameters.linkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteIssueLink(parameters: {
    linkId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issueLink/${parameters.linkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
