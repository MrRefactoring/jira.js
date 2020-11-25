import { Client } from '../../clients';
import { Callback } from '../../callback';
import { RequestConfig } from '../../requestConfig';

export class Backlog {
  constructor(private client: Client) { }
  async moveIssuesToBacklog<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
  async moveIssuesToBacklog<T = any>(parameters: any, callback?: undefined): Promise<T>;
  async moveIssuesToBacklog<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/agile/1.0/backlog/issue',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async moveIssuesToBacklogForBoard<T = any>(parameters: any, callback: Callback<T>): Promise<void>;
  async moveIssuesToBacklogForBoard<T = any>(parameters: any, callback?: undefined): Promise<T>;
  async moveIssuesToBacklogForBoard<T = any>(parameters: any, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/agile/1.0/backlog/${parameters.boardId}/issue`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
