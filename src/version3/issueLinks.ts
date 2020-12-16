import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueLinks {
  constructor(private client: Client) { }
  async linkIssues<T = any>(callback?: Callback<T>): Promise<void>;
  async linkIssues<T = any>(callback?: undefined): Promise<T>;
  async linkIssues<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/issueLink',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback: Callback<T>): Promise<void>;
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback?: undefined): Promise<T>;
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issueLink/${parameters.linkId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueLink<T = any>(parameters: Parameters.DeleteIssueLink, callback: Callback<T>): Promise<void>;
  async deleteIssueLink<T = any>(parameters: Parameters.DeleteIssueLink, callback?: undefined): Promise<T>;
  async deleteIssueLink<T = any>(parameters: Parameters.DeleteIssueLink, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/issueLink/${parameters.linkId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
