import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Backlog {
  constructor(private readonly client: Sender) { }

  public async moveIssuesToBacklog(
    params: {
      issues: Array<string>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/agile/1.0/backlog/issue',
      method: 'POST',
      data: { ...params },
    };
    return this.client.sendRequest(request, callback);
  }

  public async moveIssuesToBacklogForBoard(
    params: {
      boardId: number;
      issues: Array<string>;
      rankBeforeIssue?: string;
      rankAfterIssue?: string;
      rankCustomFieldId?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/agile/1.0/backlog/${params.boardId}/issue`,
      method: 'POST',
      data: { ...params, boardId: undefined },
    };
    return this.client.sendRequest(request, callback);
  }
}
