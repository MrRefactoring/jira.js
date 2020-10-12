import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { TaskProgressBeanObject as TaskProgressBeanObjectResponse } from '../../models/v3';

export class Tasks {
  constructor(private readonly client: Client) { }

  async getTask(parameters: {
    taskId: string;
  }, callback?: Callback<TaskProgressBeanObjectResponse>): Promise<TaskProgressBeanObjectResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/task/${parameters.taskId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async cancelTask(parameters: {
    taskId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/task/${parameters.taskId}/cancel`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
