import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueWatchers {
  constructor(private readonly client: Sender) { }

  public async getIssueWatchers(
    params: {
      issueIdOrKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/watchers`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async addWatcher(
    params: {
      issueIdOrKey: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/watchers`,
      method: 'POST',
      data: { ...params, issueIdOrKey: undefined },
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteWatcher(
    params: {
      issueIdOrKey: string;
      username?: string;
      accountId?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/issue/${params.issueIdOrKey}/watchers`,
      method: 'DELETE',
      params: {
        username: params.username,
        accountId: params.accountId,
      },
    };
    return this.client.sendRequest(request, callback);
  }
}
