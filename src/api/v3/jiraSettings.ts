import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { ApplicationProperty as ApplicationPropertyResponse, Configuration as ConfigurationResponse } from '../../models/v3';

export class JiraSettings {
  constructor(private readonly client: Client) { }

  async getApplicationProperty(parameters?: {
    key?: string;
    permissionLevel?: string;
    keyFilter?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/application-properties',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getAdvancedSettings(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/application-properties/advanced-settings',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setApplicationProperty(parameters: {
    id: string;
  }, callback?: Callback<ApplicationPropertyResponse>): Promise<ApplicationPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/application-properties/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async getConfiguration(parameters?: any, callback?: Callback<ConfigurationResponse>): Promise<ConfigurationResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/configuration',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
