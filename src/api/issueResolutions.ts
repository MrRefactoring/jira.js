import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class IssueResolutions {
  constructor(private readonly client: Sender) { }

  public async getResolutions(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/resolution',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getResolution(
    params: {
      id: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/resolution/${params.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
