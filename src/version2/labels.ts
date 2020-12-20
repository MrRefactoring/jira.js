import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Labels {
  constructor(private client: Client) { }
  async getAllLabels<T = Models.PageBeanString>(parameters?: Parameters.GetAllLabels, callback?: Callback<T>): Promise<void>;
  async getAllLabels<T = Models.PageBeanString>(parameters?: Parameters.GetAllLabels, callback?: undefined): Promise<T>;
  async getAllLabels<T = Models.PageBeanString>(parameters?: Parameters.GetAllLabels, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/label',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
