import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class FeatureFlags {
  constructor(private client: Client) { }
  async submitFeatureFlags<T = Models.SubmitFeatureFlags>(parameters?: Parameters.SubmitFeatureFlags, callback?: Callback<T>): Promise<void>;
  async submitFeatureFlags<T = Models.SubmitFeatureFlags>(parameters?: Parameters.SubmitFeatureFlags, callback?: undefined): Promise<T>;
  async submitFeatureFlags<T = Models.SubmitFeatureFlags>(parameters?: Parameters.SubmitFeatureFlags, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/featureflags/0.1/bulk',
      method: 'POST',
      data: {
        properties: parameters?.properties,
        flags: parameters?.flags,
        providerMetadata: parameters?.providerMetadata,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteFeatureFlagsByProperty<T = any>(parameters?: Parameters.DeleteFeatureFlagsByProperty, callback?: Callback<T>): Promise<void>;
  async deleteFeatureFlagsByProperty<T = any>(parameters?: Parameters.DeleteFeatureFlagsByProperty, callback?: undefined): Promise<T>;
  async deleteFeatureFlagsByProperty<T = any>(parameters?: Parameters.DeleteFeatureFlagsByProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/featureflags/0.1/bulkByProperties',
      method: 'DELETE',
      params: {
        _updateSequenceId: parameters?._updateSequenceId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFeatureFlagById<T = Models.GetFeatureFlagById>(parameters: Parameters.GetFeatureFlagById, callback: Callback<T>): Promise<void>;
  async getFeatureFlagById<T = Models.GetFeatureFlagById>(parameters: Parameters.GetFeatureFlagById, callback?: undefined): Promise<T>;
  async getFeatureFlagById<T = Models.GetFeatureFlagById>(parameters: Parameters.GetFeatureFlagById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/featureflags/0.1/flag/${parameters.featureFlagId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteFeatureFlagById<T = any>(parameters: Parameters.DeleteFeatureFlagById, callback: Callback<T>): Promise<void>;
  async deleteFeatureFlagById<T = any>(parameters: Parameters.DeleteFeatureFlagById, callback?: undefined): Promise<T>;
  async deleteFeatureFlagById<T = any>(parameters: Parameters.DeleteFeatureFlagById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/featureflags/0.1/flag/${parameters.featureFlagId}`,
      method: 'DELETE',
      params: {
        _updateSequenceId: parameters._updateSequenceId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
