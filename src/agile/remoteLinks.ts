import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class RemoteLinks {
  constructor(private client: Client) { }
  async submitRemoteLinks<T = any>(parameters?: Parameters.SubmitRemoteLinks, callback?: Callback<T>): Promise<void>;
  async submitRemoteLinks<T = any>(parameters?: Parameters.SubmitRemoteLinks, callback?: undefined): Promise<T>;
  async submitRemoteLinks<T = any>(parameters?: Parameters.SubmitRemoteLinks, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/remotelinks/1.0/bulk',
      method: 'POST',
      data: {
        properties: parameters?.properties,
        remoteLinks: parameters?.remoteLinks,
        providerMetadata: parameters?.providerMetadata,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteRemoteLinksByProperty<T = any>(parameters?: Parameters.DeleteRemoteLinksByProperty, callback?: Callback<T>): Promise<void>;
  async deleteRemoteLinksByProperty<T = any>(parameters?: Parameters.DeleteRemoteLinksByProperty, callback?: undefined): Promise<T>;
  async deleteRemoteLinksByProperty<T = any>(parameters?: Parameters.DeleteRemoteLinksByProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/remotelinks/1.0/bulkByProperties',
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters?._updateSequenceNumber,
        params: parameters?.params,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getRemoteLinkById<T = any>(parameters: Parameters.GetRemoteLinkById, callback: Callback<T>): Promise<void>;
  async getRemoteLinkById<T = any>(parameters: Parameters.GetRemoteLinkById, callback?: undefined): Promise<T>;
  async getRemoteLinkById<T = any>(parameters: Parameters.GetRemoteLinkById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/remotelinks/1.0/remotelink/${parameters.remoteLinkId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteRemoteLinkById<T = any>(parameters: Parameters.DeleteRemoteLinkById, callback: Callback<T>): Promise<void>;
  async deleteRemoteLinkById<T = any>(parameters: Parameters.DeleteRemoteLinkById, callback?: undefined): Promise<T>;
  async deleteRemoteLinkById<T = any>(parameters: Parameters.DeleteRemoteLinkById, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/remotelinks/1.0/remotelink/${parameters.remoteLinkId}`,
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters._updateSequenceNumber,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
