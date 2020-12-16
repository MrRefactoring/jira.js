import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ApplicationRoles {
  constructor(private client: Client) { }
  async getAllApplicationRoles<T = any>(callback?: Callback<T>): Promise<void>;
  async getAllApplicationRoles<T = any>(callback?: undefined): Promise<T>;
  async getAllApplicationRoles<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/applicationrole',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getApplicationRole<T = Models.ApplicationRole>(parameters: Parameters.GetApplicationRole, callback: Callback<T>): Promise<void>;
  async getApplicationRole<T = Models.ApplicationRole>(parameters: Parameters.GetApplicationRole, callback?: undefined): Promise<T>;
  async getApplicationRole<T = Models.ApplicationRole>(parameters: Parameters.GetApplicationRole, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/applicationrole/${parameters.key}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
