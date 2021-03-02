import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Labels {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](#pagination) list of labels. */
  async getAllLabels<T = Models.PageBeanString>(parameters: Parameters.GetAllLabels | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of labels. */
  async getAllLabels<T = Models.PageBeanString>(parameters?: Parameters.GetAllLabels, callback?: never): Promise<T>;
  async getAllLabels<T = Models.PageBeanString>(parameters?: Parameters.GetAllLabels, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/3/label',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getAllLabels' });
  }
}
