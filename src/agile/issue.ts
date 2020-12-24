import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Issue {
  constructor(private client: Client) { }
  async rankIssues<T = void>(parameters?: Parameters.RankIssues, callback?: Callback<T>): Promise<void>;
  async rankIssues<T = void>(parameters?: Parameters.RankIssues, callback?: undefined): Promise<T>;
  async rankIssues<T = void>(parameters?: Parameters.RankIssues, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/issue/rank',
      method: 'PUT',
      data: {
        issues: parameters?.issues,
        rankBeforeIssue: parameters?.rankBeforeIssue,
        rankAfterIssue: parameters?.rankAfterIssue,
        rankCustomFieldId: parameters?.rankCustomFieldId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssue<T = any>(parameters: Parameters.GetIssue, callback: Callback<T>): Promise<void>;
  async getIssue<T = any>(parameters: Parameters.GetIssue, callback?: undefined): Promise<T>;
  async getIssue<T = any>(parameters: Parameters.GetIssue, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/issue/${parameters.issueIdOrKey}`,
      method: 'GET',
      params: {
        fields: parameters.fields,
        expand: parameters.expand,
        updateHistory: parameters.updateHistory,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getIssueEstimationForBoard<T = any>(parameters: Parameters.GetIssueEstimationForBoard, callback: Callback<T>): Promise<void>;
  async getIssueEstimationForBoard<T = any>(parameters: Parameters.GetIssueEstimationForBoard, callback?: undefined): Promise<T>;
  async getIssueEstimationForBoard<T = any>(parameters: Parameters.GetIssueEstimationForBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
      method: 'GET',
      params: {
        boardId: parameters.boardId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async estimateIssueForBoard<T = any>(parameters: Parameters.EstimateIssueForBoard, callback: Callback<T>): Promise<void>;
  async estimateIssueForBoard<T = any>(parameters: Parameters.EstimateIssueForBoard, callback?: undefined): Promise<T>;
  async estimateIssueForBoard<T = any>(parameters: Parameters.EstimateIssueForBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
      method: 'PUT',
      params: {
        boardId: parameters.boardId,
      },
      data: {
        value: parameters.value,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
