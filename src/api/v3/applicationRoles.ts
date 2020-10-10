import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { ApplicationRole as ApplicationRoleResponse } from '../../models/v3';

export class ApplicationRoles {
  constructor(private readonly client: Client) { }

  async getAllApplicationRoles(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/applicationrole',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getApplicationRole(parameters: {
    key: string;
  }, callback?: Callback<ApplicationRoleResponse>): Promise<ApplicationRoleResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/applicationrole/${parameters.key}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
