import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Tasks {
  constructor(private readonly client: Sender) { }

  public async getTask(
    params: {
      taskId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/task/${params.taskId}`,
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async cancelTask(
    params: {
      taskId: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/task/${params.taskId}/cancel`,
      method: 'POST',
    };
    return this.client.sendRequest(request, callback);
  }
}
