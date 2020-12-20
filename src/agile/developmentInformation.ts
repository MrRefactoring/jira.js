import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class DevelopmentInformation {
  constructor(private client: Client) { }
  async storeDevelopmentInformation<T = any>(parameters: Parameters.StoreDevelopmentInformation, callback: Callback<T>): Promise<void>;
  async storeDevelopmentInformation<T = any>(parameters: Parameters.StoreDevelopmentInformation, callback?: undefined): Promise<T>;
  async storeDevelopmentInformation<T = any>(parameters: Parameters.StoreDevelopmentInformation, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/devinfo/0.10/bulk',
      method: 'POST',
      headers: {
        Authorization: parameters.Authorization,
      },
      data: {
        repositories: parameters.repositories,
        preventTransitions: parameters.preventTransitions,
        properties: parameters.properties,
        providerMetadata: parameters.providerMetadata,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getRepository<T = any>(parameters: Parameters.GetRepository, callback: Callback<T>): Promise<void>;
  async getRepository<T = any>(parameters: Parameters.GetRepository, callback?: undefined): Promise<T>;
  async getRepository<T = any>(parameters: Parameters.GetRepository, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/devinfo/0.10/repository/${parameters.repositoryId}`,
      method: 'GET',
      headers: {
        Authorization: parameters.Authorization,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteRepository<T = any>(parameters: Parameters.DeleteRepository, callback: Callback<T>): Promise<void>;
  async deleteRepository<T = any>(parameters: Parameters.DeleteRepository, callback?: undefined): Promise<T>;
  async deleteRepository<T = any>(parameters: Parameters.DeleteRepository, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/devinfo/0.10/repository/${parameters.repositoryId}`,
      method: 'DELETE',
      headers: {
        Authorization: parameters.Authorization,
      },
      params: {
        _updateSequenceId: parameters._updateSequenceId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteByProperties<T = any>(parameters: Parameters.DeleteByProperties, callback: Callback<T>): Promise<void>;
  async deleteByProperties<T = any>(parameters: Parameters.DeleteByProperties, callback?: undefined): Promise<T>;
  async deleteByProperties<T = any>(parameters: Parameters.DeleteByProperties, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/devinfo/0.10/bulkByProperties',
      method: 'DELETE',
      headers: {
        Authorization: parameters.Authorization,
      },
      params: {
        _updateSequenceId: parameters._updateSequenceId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async existsByProperties<T = any>(parameters: Parameters.ExistsByProperties, callback: Callback<T>): Promise<void>;
  async existsByProperties<T = any>(parameters: Parameters.ExistsByProperties, callback?: undefined): Promise<T>;
  async existsByProperties<T = any>(parameters: Parameters.ExistsByProperties, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/devinfo/0.10/existsByProperties',
      method: 'GET',
      headers: {
        Authorization: parameters.Authorization,
      },
      params: {
        _updateSequenceId: parameters._updateSequenceId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteEntity<T = any>(parameters: Parameters.DeleteEntity, callback: Callback<T>): Promise<void>;
  async deleteEntity<T = any>(parameters: Parameters.DeleteEntity, callback?: undefined): Promise<T>;
  async deleteEntity<T = any>(parameters: Parameters.DeleteEntity, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/devinfo/0.10/repository/${parameters.repositoryId}/${parameters.entityType}/${parameters.entityId}`,
      method: 'DELETE',
      headers: {
        Authorization: parameters.Authorization,
      },
      params: {
        _updateSequenceId: parameters._updateSequenceId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
