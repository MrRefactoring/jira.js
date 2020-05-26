import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class UserProperties {
  constructor(private readonly client: Sender) { }

  public async getUserPropertyKeys(
    params?: {
      accountId?: string;
      userKey?: string;
      username?: string;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/user/properties',
      method: 'GET',
      params: {
        accountId: params.accountId,
        userKey: params.userKey,
        username: params.username
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getUserProperty(
    params: {
      accountId?: string;
      userKey?: string;
      username?: string;
      propertyKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/user/properties/${params.propertyKey}`,
      method: 'GET',
      params: {
        accountId: params.accountId,
        userKey: params.userKey,
        username: params.username
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async setUserProperty(
    params: {
      accountId?: string;
      userKey?: string;
      username?: string;
      propertyKey: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/user/properties/${params.propertyKey}`,
      method: 'PUT',
      params: {
        accountId: params.accountId,
        userKey: params.userKey,
        username: params.username
      },
      data: {
        ...params,
        accountId: undefined,
        userKey: undefined,
        username: undefined,
        propertyKey: undefined
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteUserProperty(
    params: {
      accountId?: string;
      userKey?: string;
      username?: string;
      propertyKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/user/properties/${params.propertyKey}`,
      method: 'DELETE',
      params: {
        accountId: params.accountId,
        userKey: params.userKey,
        username: params.username
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
