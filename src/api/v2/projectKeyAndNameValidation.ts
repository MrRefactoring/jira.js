import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { ErrorCollection as ErrorCollectionResponse } from '../../models/v2';

export class ProjectKeyAndNameValidation {
  constructor(private readonly client: Client) { }

  async validateProjectKey(parameters?: {
    key?: string;
  }, callback?: Callback<ErrorCollectionResponse>): Promise<ErrorCollectionResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectvalidate/key',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getValidProjectKey(parameters?: {
    key?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectvalidate/validProjectKey',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getValidProjectName(parameters: {
    name: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/projectvalidate/validProjectName',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
