import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';

export class DevelopmentInformation {
  constructor(private readonly client: Client) { }

  async storeDevelopmentInformation(parameters: {
    Authorization: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/devinfo/0.10/bulk',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getRepository(parameters: {
    repositoryId: string;
    Authorization: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/devinfo/0.10/repository/${parameters.repositoryId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteRepository(parameters: {
    repositoryId: string;
    _updateSequenceId?: number;
    Authorization: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/devinfo/0.10/repository/${parameters.repositoryId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteByProperties(parameters: {
    Authorization: string;
    _updateSequenceId?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/devinfo/0.10/bulkByProperties',
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async existsByProperties(parameters: {
    Authorization: string;
    _updateSequenceId?: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/devinfo/0.10/existsByProperties',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteEntity(parameters: {
    repositoryId: string;
    entityType: string;
    entityId: string;
    _updateSequenceId?: number;
    Authorization: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/devinfo/0.10/repository/${parameters.repositoryId}/${parameters.entityType}/${parameters.entityId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
