import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import { PageBeanString } from '../schemas';
export class Labels {
  constructor(private readonly client: Sender) {}

  public async getAllLabels(
    params?: {
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback<PageBeanString>,
  ): Promise<PageBeanString> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/label',
      method: 'GET',
      params: {
        startAt: params.startAt,
        maxResults: params.maxResults,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
