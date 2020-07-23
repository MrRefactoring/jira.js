import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Builds {
  constructor(private readonly client: Sender) { }

  public async submitBuildData(
    params: {
      Authorization?: string;
      properties?: {
        [key: string]: any;
      };
      builds: {
        schemaVersion?: string;
        pipelineId: string;
        buildNumber: number;
        updateSequenceNumber: number;
        displayName: string;
        description?: string;
        label?: string;
        url: string;
        state: 'pending' | 'in_progress' | 'successful' | 'failed' | 'cancelled' | 'unknown';
        lastUpdated: string;
        issueKeys: Array<string>;
        testInfo?: {
          totalNumber: number;
          numberPassed: number;
          numberFailed: number;
          numberSkipped?: number;
        };
        references?: Array<{
          commit?: {
            id: string;
            repositoryUri: string;
          };
          ref?: {
            name: string;
            uri: string;
          };
        }>;
      };
      providerMetadata?: {
        product: string;
      };
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/builds/0.1/bulk',
      method: 'POST',
      headers: {
        Authorization: params.Authorization,
      },
      data: { ...params, Authorization: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteBuildsByProperty(
    params: {
      Authorization?: string;
      _updateSequenceNumber?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/builds/0.1/bulkByProperties',
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization,
      },
      params: {
        _updateSequenceNumber: params._updateSequenceNumber,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getABuildByKey(
    params: {
      Authorization?: string;
      pipelineId: string;
      buildNumber: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/builds/0.1/pipelines/${params.pipelineId}/builds/${params.buildNumber}`,
      headers: {
        Authorization: params.Authorization,
      },
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteABuildByKey(
    params: {
      Authorization?: string;
      pipelineId: string;
      buildNumber: number;
      _updateSequenceNumber?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/builds/0.1/pipelines/${params.pipelineId}/builds/${params.buildNumber}`,
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization,
      },
      params: {
        _updateSequenceNumber: params._updateSequenceNumber,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
