import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueLinks {
  constructor(private client: Client) { }
  async linkIssues<T = any>(parameters?: Parameters.LinkIssues, callback?: Callback<T>): Promise<void>;
  async linkIssues<T = any>(parameters?: Parameters.LinkIssues, callback?: undefined): Promise<T>;
  async linkIssues<T = any>(parameters?: Parameters.LinkIssues, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/issueLink',
      method: 'POST',
      data: {
        type: parameters?.type,
        inwardIssue: parameters?.inwardIssue,
        outwardIssue: parameters?.outwardIssue,
        comment: parameters?.comment,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback: Callback<T>): Promise<void>;
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback?: undefined): Promise<T>;
  async getIssueLink<T = Models.IssueLink>(parameters: Parameters.GetIssueLink, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issueLink/${parameters.linkId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteIssueLink<T = void>(parameters: Parameters.DeleteIssueLink, callback: Callback<T>): Promise<void>;
  async deleteIssueLink<T = void>(parameters: Parameters.DeleteIssueLink, callback?: undefined): Promise<T>;
  async deleteIssueLink<T = void>(parameters: Parameters.DeleteIssueLink, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/issueLink/${parameters.linkId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
