import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class ProjectKeyAndNameValidation {
  constructor(private readonly client: Sender) {}

  public async validateProjectKey(
    params?: {
      key?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectvalidate/key',
      method: 'GET',
      params: {
        key: params?.key,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getValidProjectKey(
    params?: {
      key?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectvalidate/validProjectKey',
      method: 'GET',
      params: {
        key: params?.key,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getValidProjectName(
    params: {
      name: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectvalidate/validProjectName',
      method: 'GET',
      params: {
        name: params?.name,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
