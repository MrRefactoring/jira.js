import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueWatchers {
  constructor(private client: Client) { }
  async getIssueWatchers<T = Models.Watchers>(parameters: Parameters.GetIssueWatchers, callback: Callback<T>): Promise<void>;
  async getIssueWatchers<T = Models.Watchers>(parameters: Parameters.GetIssueWatchers, callback?: undefined): Promise<T>;
  async getIssueWatchers<T = Models.Watchers>(parameters: Parameters.GetIssueWatchers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addWatcher<T = void>(parameters: Parameters.AddWatcher, callback: Callback<T>): Promise<void>;
  async addWatcher<T = void>(parameters: Parameters.AddWatcher, callback?: undefined): Promise<T>;
  async addWatcher<T = void>(parameters: Parameters.AddWatcher, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeWatcher<T = void>(parameters: Parameters.RemoveWatcher, callback: Callback<T>): Promise<void>;
  async removeWatcher<T = void>(parameters: Parameters.RemoveWatcher, callback?: undefined): Promise<T>;
  async removeWatcher<T = void>(parameters: Parameters.RemoveWatcher, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issue/${parameters.issueIdOrKey}/watchers`,
      method: 'DELETE',
      params: {
        username: parameters.username,
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
