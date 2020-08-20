import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { Resolution } from '../schemas';
export class IssueResolutions {
  constructor(private readonly client: Sender) {}

  public async getResolutions(callback?: Callback<any>): Promise<any> {
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
    callback?: Callback<Resolution>,
  ): Promise<Resolution> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/resolution/${params.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
