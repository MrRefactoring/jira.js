import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Issue {
  constructor(private readonly client: Sender) { }

  public async rankIssues(
    params: {
      issues: Array<string>;
      rankBeforeIssue?: string;
      rankAfterIssue?: string;
      rankCustomFieldId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/agile/1.0/issue/rank',
      method: 'PUT',
      data: { ...params },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getIssue(
    params: {
      issueIdOrKey: string;
      fields?: Array<string>;
      expand?: string;
      updateHistory?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/issue/${params.issueIdOrKey}`,
      method: 'GET',
      params: {
        fields: params.fields && params.fields.join(','),
        expand: params.expand,
        updateHistory: params.updateHistory,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getIssueEstimationForBoard(
    params: {
      issueIdOrKey: string;
      boardId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/issue/${params.issueIdOrKey}/estimation`,
      method: 'GET',
      params: {
        boardId: params.boardId,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async estimateIssueForBoard(
    params: {
      issueIdOrKey: string;
      boardId?: number;
      value: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/issue/${params.issueIdOrKey}/estimation`,
      method: 'PUT',
      params: {
        boardId: params.boardId,
      },
      data: { ...params, issueIdOrKey: undefined, boardId: undefined },
    };
    return this.client.sendRequest(request, callback);
  }
}
