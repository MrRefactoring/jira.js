import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { TaskProgressBeanObject as TaskProgressBeanObjectResponse } from '../../models/v2';

export class Tasks {
  constructor(private readonly client: Client) { }

  async getTask(parameters: {
    taskId: string;
  }, callback?: Callback<TaskProgressBeanObjectResponse>): Promise<TaskProgressBeanObjectResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/task/${parameters.taskId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async cancelTask(parameters: {
    taskId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/task/${parameters.taskId}/cancel`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
