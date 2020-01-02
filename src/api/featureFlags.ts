import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class FeatureFlags {
  constructor(private readonly client: Sender) { }

  public async submitFeatureFlagData(
    params: {
      Authorization?: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/featureflags/0.1/bulk',
      method: 'POST',
      headers: {
        Authorization: params.Authorization,
      },
      data: { ...params }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteFeatureFlagsByProperty(
    params: {
      Authorization?: string;
      _updateSequenceId?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/featureflags/0.1/bulkByProperties',
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization,
      },
      params: {
        _updateSequenceId: params._updateSequenceId
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getAFeatureFlagById(
    params: {
      Authorization?: string;
      featureFlagId: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/featureflags/0.1/flag/${params.featureFlagId}`,
      method: 'GET',
      headers: {
        Authorization: params.Authorization,
      },
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteAFeatureFlagById(
    params: {
      Authorization?: string;
      featureFlagId: string;
      _updateSequenceId?: number;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/featureflags/0.1/flag/${params.featureFlagId}`,
      method: 'DELETE',
      headers: {
        Authorization: params.Authorization,
      },
      params: {
        _updateSequenceId: params._updateSequenceId
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
