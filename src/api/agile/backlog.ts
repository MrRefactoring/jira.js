/* eslint-disable lines-between-class-members */

import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';

export class Backlog {
  constructor(private readonly client: Client) { }

  async moveIssuesToBacklog<T>(parameters?: any, callback?: undefined): Promise<T>;
  async moveIssuesToBacklog<T>(parameters?: any, callback: Callback<T>): Promise<void>;
  async moveIssuesToBacklog(parameters?: any, callback?: any): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/agile/1.0/backlog/issue',
      method: 'POST',
    };

    this.client.clientConfig.host;

    return this.client.sendRequest(request, callback);
  }

  async moveIssuesToBacklogForBoard(parameters: {
    boardId: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/agile/1.0/backlog/${parameters.boardId}/issue`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
