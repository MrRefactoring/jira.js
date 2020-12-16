import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowStatusCategories {
  constructor(private client: Client) { }
  async getStatusCategories<T = any>(callback?: Callback<T>): Promise<void>;
  async getStatusCategories<T = any>(callback?: undefined): Promise<T>;
  async getStatusCategories<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/statuscategory',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback: Callback<T>): Promise<void>;
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback?: undefined): Promise<T>;
  async getStatusCategory<T = Models.StatusCategory>(parameters: Parameters.GetStatusCategory, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/statuscategory/${parameters.idOrKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
