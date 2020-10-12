import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { Watchers as WatchersResponse } from '../../models/v3';

export class IssueWatchers {
  constructor(private readonly client: Client) { }

  async getIssueWatchers(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<WatchersResponse>): Promise<WatchersResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async addWatcher(parameters: {
    issueIdOrKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeWatcher(parameters: {
    issueIdOrKey: string;
    username?: string;
    accountId?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
