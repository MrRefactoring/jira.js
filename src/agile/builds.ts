import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Builds {
  constructor(private client: Client) { }
  async submitBuilds<T = Models.SubmitBuilds>(parameters?: Parameters.SubmitBuilds, callback?: Callback<T>): Promise<void>;
  async submitBuilds<T = Models.SubmitBuilds>(parameters?: Parameters.SubmitBuilds, callback?: undefined): Promise<T>;
  async submitBuilds<T = Models.SubmitBuilds>(parameters?: Parameters.SubmitBuilds, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/builds/0.1/bulk',
      method: 'POST',
      data: {
        properties: parameters?.properties,
        builds: parameters?.builds,
        providerMetadata: parameters?.providerMetadata,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteBuildsByProperty<T = any>(parameters?: Parameters.DeleteBuildsByProperty, callback?: Callback<T>): Promise<void>;
  async deleteBuildsByProperty<T = any>(parameters?: Parameters.DeleteBuildsByProperty, callback?: undefined): Promise<T>;
  async deleteBuildsByProperty<T = any>(parameters?: Parameters.DeleteBuildsByProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/builds/0.1/bulkByProperties',
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters?._updateSequenceNumber,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getBuildByKey<T = Models.GetBuildByKey>(parameters: Parameters.GetBuildByKey, callback: Callback<T>): Promise<void>;
  async getBuildByKey<T = Models.GetBuildByKey>(parameters: Parameters.GetBuildByKey, callback?: undefined): Promise<T>;
  async getBuildByKey<T = Models.GetBuildByKey>(parameters: Parameters.GetBuildByKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteBuildByKey<T = any>(parameters: Parameters.DeleteBuildByKey, callback: Callback<T>): Promise<void>;
  async deleteBuildByKey<T = any>(parameters: Parameters.DeleteBuildByKey, callback?: undefined): Promise<T>;
  async deleteBuildByKey<T = any>(parameters: Parameters.DeleteBuildByKey, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters._updateSequenceNumber,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
