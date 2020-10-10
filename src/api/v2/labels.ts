import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { PageBeanString as PageBeanStringResponse } from '../../models/v2';

export class Labels {
  constructor(private readonly client: Client) { }

  async getAllLabels(parameters?: {
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageBeanStringResponse>): Promise<PageBeanStringResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/label',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
