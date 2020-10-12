import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';

export class Issue {
  constructor(private readonly client: Client) { }

  async rankIssues(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/agile/1.0/issue/rank',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssue(parameters: {
    issueIdOrKey: string;
    fields?: string[];
    expand?: string;
    updateHistory?: boolean;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/issue/${parameters.issueIdOrKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getIssueEstimationForBoard(parameters: {
    issueIdOrKey: string;
    boardId?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async estimateIssueForBoard(parameters: {
    issueIdOrKey: string;
    boardId?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/issue/${parameters.issueIdOrKey}/estimation`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
