import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';

export class IssueNavigatorSettings {
  constructor(private readonly client: Client) { }

  async getIssueNavigatorDefaultColumns(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/settings/columns',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setIssueNavigatorDefaultColumns(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/settings/columns',
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }
}
