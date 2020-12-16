import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class JiraSettings {
  constructor(private client: Client) { }
  async getApplicationProperty<T = any>(parameters?: Parameters.GetApplicationProperty, callback?: Callback<T>): Promise<void>;
  async getApplicationProperty<T = any>(parameters?: Parameters.GetApplicationProperty, callback?: undefined): Promise<T>;
  async getApplicationProperty<T = any>(parameters?: Parameters.GetApplicationProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/application-properties',
      method: 'GET',
      params: {
        key: parameters?.key,
        permissionLevel: parameters?.permissionLevel,
        keyFilter: parameters?.keyFilter,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAdvancedSettings<T = any>(callback?: Callback<T>): Promise<void>;
  async getAdvancedSettings<T = any>(callback?: undefined): Promise<T>;
  async getAdvancedSettings<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/application-properties/advanced-settings',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setApplicationProperty<T = Models.ApplicationProperty>(parameters: Parameters.SetApplicationProperty, callback: Callback<T>): Promise<void>;
  async setApplicationProperty<T = Models.ApplicationProperty>(parameters: Parameters.SetApplicationProperty, callback?: undefined): Promise<T>;
  async setApplicationProperty<T = Models.ApplicationProperty>(parameters: Parameters.SetApplicationProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/application-properties/${parameters.id}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getConfiguration<T = Models.Configuration>(callback?: Callback<T>): Promise<void>;
  async getConfiguration<T = Models.Configuration>(callback?: undefined): Promise<T>;
  async getConfiguration<T = Models.Configuration>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/configuration',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
