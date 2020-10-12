import { AxiosRequestConfig } from 'axios';
import { Client } from '../../clients/client';
import { Callback } from '../../callback';
import { PropertyKeys as PropertyKeysResponse, EntityProperty as EntityPropertyResponse } from '../../models/v2';

export class UserProperties {
  constructor(private readonly client: Client) { }

  async getUserPropertyKeys(parameters?: {
    accountId?: string;
    userKey?: string;
    username?: string;
  }, callback?: Callback<PropertyKeysResponse>): Promise<PropertyKeysResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/properties',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getUserProperty(parameters: {
    accountId?: string;
    userKey?: string;
    username?: string;
    propertyKey: string;
  }, callback?: Callback<EntityPropertyResponse>): Promise<EntityPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setUserProperty(parameters: {
    accountId?: string;
    userKey?: string;
    username?: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteUserProperty(parameters: {
    accountId?: string;
    userKey?: string;
    username?: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
