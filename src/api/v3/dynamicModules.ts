import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { ConnectModules as ConnectModulesResponse } from '../../models/v3';

export class DynamicModules {
  constructor(private readonly client: Client) { }

  async getModules(parameters?: any, callback?: Callback<ConnectModulesResponse>): Promise<ConnectModulesResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async registerModules(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async removeModules(parameters?: {
    moduleKey?: string[];
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
