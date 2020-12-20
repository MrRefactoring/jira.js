import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Deployments {
  constructor(private client: Client) { }
  async submitDeployments<T = any>(parameters?: Parameters.SubmitDeployments, callback?: Callback<T>): Promise<void>;
  async submitDeployments<T = any>(parameters?: Parameters.SubmitDeployments, callback?: undefined): Promise<T>;
  async submitDeployments<T = any>(parameters?: Parameters.SubmitDeployments, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/deployments/0.1/bulk',
      method: 'POST',
      data: {
        properties: parameters?.properties,
        deployments: parameters?.deployments,
        providerMetadata: parameters?.providerMetadata,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteDeploymentsByProperty<T = any>(parameters?: Parameters.DeleteDeploymentsByProperty, callback?: Callback<T>): Promise<void>;
  async deleteDeploymentsByProperty<T = any>(parameters?: Parameters.DeleteDeploymentsByProperty, callback?: undefined): Promise<T>;
  async deleteDeploymentsByProperty<T = any>(parameters?: Parameters.DeleteDeploymentsByProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/deployments/0.1/bulkByProperties',
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters?._updateSequenceNumber,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDeploymentByKey<T = any>(parameters: Parameters.GetDeploymentByKey, callback: Callback<T>): Promise<void>;
  async getDeploymentByKey<T = any>(parameters: Parameters.GetDeploymentByKey, callback?: undefined): Promise<T>;
  async getDeploymentByKey<T = any>(parameters: Parameters.GetDeploymentByKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteDeploymentByKey<T = any>(parameters: Parameters.DeleteDeploymentByKey, callback: Callback<T>): Promise<void>;
  async deleteDeploymentByKey<T = any>(parameters: Parameters.DeleteDeploymentByKey, callback?: undefined): Promise<T>;
  async deleteDeploymentByKey<T = any>(parameters: Parameters.DeleteDeploymentByKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters._updateSequenceNumber,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDeploymentGatingStatusByKey<T = any>(parameters: Parameters.GetDeploymentGatingStatusByKey, callback: Callback<T>): Promise<void>;
  async getDeploymentGatingStatusByKey<T = any>(parameters: Parameters.GetDeploymentGatingStatusByKey, callback?: undefined): Promise<T>;
  async getDeploymentGatingStatusByKey<T = any>(parameters: Parameters.GetDeploymentGatingStatusByKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}/gating-status`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
