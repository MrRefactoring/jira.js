import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';

export class FeatureFlags {
  constructor(private readonly client: Client) { }

  async submitFeatureFlags(parameters?: any, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/featureflags/0.1/bulk',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteFeatureFlagsByProperty(parameters?: {
    _updateSequenceId?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/featureflags/0.1/bulkByProperties',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFeatureFlagById(parameters: {
    featureFlagId: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/featureflags/0.1/flag/${parameters.featureFlagId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteFeatureFlagById(parameters: {
    featureFlagId: string;
    _updateSequenceId?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/featureflags/0.1/flag/${parameters.featureFlagId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
