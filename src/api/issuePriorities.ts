import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { Priority } from '../schemas';
export class IssuePriorities {
  constructor(private readonly client: Sender) {}

  public async getPriorities(callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/priority',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getPriority(
    params: {
      id: string;
    },
    callback?: Callback<Priority>,
  ): Promise<Priority> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/priority/${params.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
