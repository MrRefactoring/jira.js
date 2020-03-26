import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class JiraSettings {
  constructor(private readonly client: Sender) { }

  public async getApplicationProperty(
    params?: {
      key?: string;
      permissionLevel?: string;
      keyFilter?: string;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/application-properties',
      method: 'GET',
      params: {
        key: params.key,
        permissionLevel: params.permissionLevel,
        keyFilter: params.keyFilter,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAdvancedSettings(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/application-properties/advanced-settings',
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }

  public async setApplicationProperty(
    params: {
      id: string;
      value?: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/application-properties/${params.id}`,
      method: 'PUT',
      data: {
        id: params.id,
        value: params.value,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async getGlobalSettings(callback?: Callback): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/configuration',
      method: 'GET',
    };
    return this.client.sendRequest(request, callback);
  }
}
