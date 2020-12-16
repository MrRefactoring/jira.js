import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Tasks {
  constructor(private client: Client) { }
  async getTask<T = Models.TaskProgressBeanObject>(parameters: Parameters.GetTask, callback: Callback<T>): Promise<void>;
  async getTask<T = Models.TaskProgressBeanObject>(parameters: Parameters.GetTask, callback?: undefined): Promise<T>;
  async getTask<T = Models.TaskProgressBeanObject>(parameters: Parameters.GetTask, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/task/${parameters.taskId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async cancelTask<T = any>(parameters: Parameters.CancelTask, callback: Callback<T>): Promise<void>;
  async cancelTask<T = any>(parameters: Parameters.CancelTask, callback?: undefined): Promise<T>;
  async cancelTask<T = any>(parameters: Parameters.CancelTask, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/task/${parameters.taskId}/cancel`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
