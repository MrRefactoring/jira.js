import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';

export class Deployments {
  constructor(private readonly client: Sender) { }

  public async submitDeploymentData(
    params: {
      Authorization?: string;
      properties?: {
        [key: string]: any;
      };
      deployments: Array<{
        deploymentSequenceNumber: number;
        updateSequenceNumber: number;
        issueKeys: Array<string>;
        displayName: string;
        url: string;
        description: string;
        lastUpdated: string;
        label?: string;
        state: 'unknown' | 'pending' | 'in_progress' | 'cancelled' | 'failed' | 'rolled_back' | 'successful';
        pipeline: {
          id: string;
          displayName: string;
          url: string;
        };
        environment: {
          id: string;
          displayName: string;
          type: 'unmapped' | 'development' | 'testing' | 'staging' | 'production';
        };
        schemaVersion?: string;
      }>;
      providerMetadata?: {
        product: string;
      };
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/deployments/0.1/bulk',
      method: 'POST',
      headers: {
        Authorization: params.Authorization,
      },
      data: { ...params, Authorization: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteDeploymentsByProperty(
    params: {
      Authorization?: string;
      _updateSequenceNumber?: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/deployments/0.1/bulkByProperties',
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

  public async getADeploymentByKey(
    params: {
      pipelineId: string;
      environmentId: string;
      deploymentSequenceNumber: number;
      Authorization?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/deployments/0.1/pipelines/${params.pipelineId}/environments/${params.environmentId}/deployments/${params.deploymentSequenceNumber}`,
      method: 'GET',
      headers: {
        Authorization: params.Authorization,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteADeploymentByKey(
    params: {
      pipelineId: string;
      environmentId: string;
      deploymentSequenceNumber: number;
      _updateSequenceNumber?: number;
      Authorization?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/deployments/0.1/pipelines/${params.pipelineId}/environments/${params.environmentId}/deployments/${params.deploymentSequenceNumber}`,
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
