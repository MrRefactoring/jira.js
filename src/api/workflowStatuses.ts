import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class WorkflowStatuses {
  constructor(private readonly client: Sender) {}

  public async getAllStatuses(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/status',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getStatus(
    params: {
      idOrName: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/status/${params.idOrName}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
