import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { Resolution as ResolutionResponse } from '../../models/v3';

export class IssueResolutions {
  constructor(private readonly client: Client) { }

  async getResolutions(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/resolution',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getResolution(parameters: {
    id: string;
  }, callback?: Callback<ResolutionResponse>): Promise<ResolutionResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/resolution/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
