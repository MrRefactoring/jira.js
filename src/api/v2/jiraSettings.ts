import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { ApplicationProperty as ApplicationPropertyResponse, Configuration as ConfigurationResponse } from '../../models/v2';

export class JiraSettings {
  constructor(private readonly client: Client) { }

  async getApplicationProperty(parameters?: {
    key?: string;
    permissionLevel?: string;
    keyFilter?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/application-properties',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAdvancedSettings(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/application-properties/advanced-settings',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setApplicationProperty(parameters: {
    id: string;
  }, callback?: Callback<ApplicationPropertyResponse>): Promise<ApplicationPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/application-properties/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getConfiguration(parameters?: any, callback?: Callback<ConfigurationResponse>): Promise<ConfigurationResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/configuration',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
