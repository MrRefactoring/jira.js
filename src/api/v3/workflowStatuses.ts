import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { StatusDetails as StatusDetailsResponse } from '../../models/v3';

export class WorkflowStatuses {
  constructor(private readonly client: Client) { }

  async getStatuses(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/status',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getStatus(parameters: {
    idOrName: string;
  }, callback?: Callback<StatusDetailsResponse>): Promise<StatusDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/status/${parameters.idOrName}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
