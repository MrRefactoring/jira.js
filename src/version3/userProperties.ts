import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class UserProperties {
  constructor(private client: Client) { }
  async getUserPropertyKeys<T = Models.PropertyKeys>(parameters?: Parameters.GetUserPropertyKeys, callback?: Callback<T>): Promise<void>;
  async getUserPropertyKeys<T = Models.PropertyKeys>(parameters?: Parameters.GetUserPropertyKeys, callback?: undefined): Promise<T>;
  async getUserPropertyKeys<T = Models.PropertyKeys>(parameters?: Parameters.GetUserPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/user/properties',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
        userKey: parameters?.userKey,
        username: parameters?.username,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getUserProperty<T = Models.EntityProperty>(parameters: Parameters.GetUserProperty, callback: Callback<T>): Promise<void>;
  async getUserProperty<T = Models.EntityProperty>(parameters: Parameters.GetUserProperty, callback?: undefined): Promise<T>;
  async getUserProperty<T = Models.EntityProperty>(parameters: Parameters.GetUserProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
      method: 'GET',
      params: {
        accountId: parameters.accountId,
        userKey: parameters.userKey,
        username: parameters.username,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setUserProperty<T = any>(parameters: Parameters.SetUserProperty, callback: Callback<T>): Promise<void>;
  async setUserProperty<T = any>(parameters: Parameters.SetUserProperty, callback?: undefined): Promise<T>;
  async setUserProperty<T = any>(parameters: Parameters.SetUserProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
      method: 'PUT',
      params: {
        accountId: parameters.accountId,
        userKey: parameters.userKey,
        username: parameters.username,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteUserProperty<T = void>(parameters: Parameters.DeleteUserProperty, callback: Callback<T>): Promise<void>;
  async deleteUserProperty<T = void>(parameters: Parameters.DeleteUserProperty, callback?: undefined): Promise<T>;
  async deleteUserProperty<T = void>(parameters: Parameters.DeleteUserProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/user/properties/${parameters.propertyKey}`,
      method: 'DELETE',
      params: {
        accountId: parameters.accountId,
        userKey: parameters.userKey,
        username: parameters.username,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
