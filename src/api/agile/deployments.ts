import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';

export class Deployments {
  constructor(private readonly client: Client) { }

  async submitDeployments(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/deployments/0.1/bulk',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteDeploymentsByProperty(parameters?: {
    _updateSequenceNumber?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/deployments/0.1/bulkByProperties',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDeploymentByKey(parameters: {
    pipelineId: string;
    environmentId: string;
    deploymentSequenceNumber: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteDeploymentByKey(parameters: {
    pipelineId: string;
    environmentId: string;
    deploymentSequenceNumber: number;
    _updateSequenceNumber?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDeploymentGatingStatusByKey(parameters: {
    pipelineId: string;
    environmentId: string;
    deploymentSequenceNumber: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}/gating-status`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }
}
