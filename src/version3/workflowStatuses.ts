import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowStatuses {
  constructor(private client: Client) { }
  async getStatuses<T = any>(callback?: Callback<T>): Promise<void>;
  async getStatuses<T = any>(callback?: undefined): Promise<T>;
  async getStatuses<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/status',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getStatus<T = Models.StatusDetails>(parameters: Parameters.GetStatus, callback: Callback<T>): Promise<void>;
  async getStatus<T = Models.StatusDetails>(parameters: Parameters.GetStatus, callback?: undefined): Promise<T>;
  async getStatus<T = Models.StatusDetails>(parameters: Parameters.GetStatus, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/status/${parameters.idOrName}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
