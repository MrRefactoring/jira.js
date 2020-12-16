import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssuePriorities {
  constructor(private client: Client) { }
  async getPriorities<T = any>(callback?: Callback<T>): Promise<void>;
  async getPriorities<T = any>(callback?: undefined): Promise<T>;
  async getPriorities<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/priority',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority, callback: Callback<T>): Promise<void>;
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority, callback?: undefined): Promise<T>;
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/priority/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
