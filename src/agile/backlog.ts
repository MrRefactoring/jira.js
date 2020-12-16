import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Backlog {
  constructor(private client: Client) { }
  async moveIssuesToBacklog<T = any>(parameters?: Parameters.MoveIssuesToBacklog, callback?: Callback<T>): Promise<void>;
  async moveIssuesToBacklog<T = any>(parameters?: Parameters.MoveIssuesToBacklog, callback?: undefined): Promise<T>;
  async moveIssuesToBacklog<T = any>(parameters?: Parameters.MoveIssuesToBacklog, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/backlog/issue',
      method: 'POST',
      data: {
        issues: parameters?.issues,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async moveIssuesToBacklogForBoard<T = any>(parameters: Parameters.MoveIssuesToBacklogForBoard, callback: Callback<T>): Promise<void>;
  async moveIssuesToBacklogForBoard<T = any>(parameters: Parameters.MoveIssuesToBacklogForBoard, callback?: undefined): Promise<T>;
  async moveIssuesToBacklogForBoard<T = any>(parameters: Parameters.MoveIssuesToBacklogForBoard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/backlog/${parameters.boardId}/issue`,
      method: 'POST',
      data: {
        issues: parameters.issues,
        rankBeforeIssue: parameters.rankBeforeIssue,
        rankAfterIssue: parameters.rankAfterIssue,
        rankCustomFieldId: parameters.rankCustomFieldId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
