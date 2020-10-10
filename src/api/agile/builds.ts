import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';

export class Builds {
  constructor(private readonly client: Client) { }

  async submitBuilds(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/builds/0.1/bulk',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteBuildsByProperty(parameters?: {
    _updateSequenceNumber?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/builds/0.1/bulkByProperties',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getBuildByKey(parameters: {
    pipelineId: string;
    buildNumber: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteBuildByKey(parameters: {
    pipelineId: string;
    buildNumber: number;
    _updateSequenceNumber?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
