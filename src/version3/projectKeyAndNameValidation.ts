import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectKeyAndNameValidation {
  constructor(private client: Client) { }
  async validateProjectKey<T = Models.ErrorCollection>(parameters?: Parameters.ValidateProjectKey, callback?: Callback<T>): Promise<void>;
  async validateProjectKey<T = Models.ErrorCollection>(parameters?: Parameters.ValidateProjectKey, callback?: undefined): Promise<T>;
  async validateProjectKey<T = Models.ErrorCollection>(parameters?: Parameters.ValidateProjectKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/projectvalidate/key',
      method: 'GET',
      params: {
        key: parameters?.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getValidProjectKey<T = any>(parameters?: Parameters.GetValidProjectKey, callback?: Callback<T>): Promise<void>;
  async getValidProjectKey<T = any>(parameters?: Parameters.GetValidProjectKey, callback?: undefined): Promise<T>;
  async getValidProjectKey<T = any>(parameters?: Parameters.GetValidProjectKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/projectvalidate/validProjectKey',
      method: 'GET',
      params: {
        key: parameters?.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getValidProjectName<T = any>(parameters: Parameters.GetValidProjectName, callback: Callback<T>): Promise<void>;
  async getValidProjectName<T = any>(parameters: Parameters.GetValidProjectName, callback?: undefined): Promise<T>;
  async getValidProjectName<T = any>(parameters: Parameters.GetValidProjectName, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/projectvalidate/validProjectName',
      method: 'GET',
      params: {
        name: parameters.name,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
