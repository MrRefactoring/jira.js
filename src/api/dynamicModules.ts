import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import * as Schemas from '../schemas';
export class DynamicModules {
  constructor(private readonly client: Sender) {}

  public async getModules(
    callback?: Callback,
  ): Promise<Schemas.ConnectModules> {
    const request: AxiosRequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async registerModules(
    params: {
      modules: Array<any>;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'POST',
      data: {
        modules: params.modules,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async removeModules(
    params?: {
      moduleKey?: Array<string>;
    },
    callback?: Callback,
  ): Promise<void> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'DELETE',
      params: {
        moduleKey: params.moduleKey && params.moduleKey.join(','),
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
