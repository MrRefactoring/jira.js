import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { StatusDetails } from '../schemas';
export class WorkflowStatuses {
  constructor(private readonly client: Sender) {}

  public async getAllStatuses(callback?: Callback<any>): Promise<any> {
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
    callback?: Callback<StatusDetails>,
  ): Promise<StatusDetails> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/status/${params.idOrName}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
