import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Users {
  constructor(private client: Client) { }
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: Callback<T>): Promise<void>;
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: undefined): Promise<T>;
  async getUser<T = Models.User>(parameters?: Parameters.GetUser, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
        username: parameters?.username,
        key: parameters?.key,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createUser<T = any>(callback?: Callback<T>): Promise<void>;
  async createUser<T = any>(callback?: undefined): Promise<T>;
  async createUser<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async removeUser<T = any>(parameters: Parameters.RemoveUser, callback: Callback<T>): Promise<void>;
  async removeUser<T = any>(parameters: Parameters.RemoveUser, callback?: undefined): Promise<T>;
  async removeUser<T = any>(parameters: Parameters.RemoveUser, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user',
      method: 'DELETE',
      params: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async bulkGetUsers<T = Models.PageBeanUser>(parameters: Parameters.BulkGetUsers, callback: Callback<T>): Promise<void>;
  async bulkGetUsers<T = Models.PageBeanUser>(parameters: Parameters.BulkGetUsers, callback?: undefined): Promise<T>;
  async bulkGetUsers<T = Models.PageBeanUser>(parameters: Parameters.BulkGetUsers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/bulk',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        username: parameters.username,
        key: parameters.key,
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async bulkGetUsersMigration<T = any>(parameters?: Parameters.BulkGetUsersMigration, callback?: Callback<T>): Promise<void>;
  async bulkGetUsersMigration<T = any>(parameters?: Parameters.BulkGetUsersMigration, callback?: undefined): Promise<T>;
  async bulkGetUsersMigration<T = any>(parameters?: Parameters.BulkGetUsersMigration, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/bulk/migration',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        username: parameters?.username,
        key: parameters?.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getUserDefaultColumns<T = any>(parameters?: Parameters.GetUserDefaultColumns, callback?: Callback<T>): Promise<void>;
  async getUserDefaultColumns<T = any>(parameters?: Parameters.GetUserDefaultColumns, callback?: undefined): Promise<T>;
  async getUserDefaultColumns<T = any>(parameters?: Parameters.GetUserDefaultColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/columns',
      method: 'GET',
      params: {
        accountId: parameters?.accountId,
        username: parameters?.username,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setUserColumns<T = any>(parameters?: Parameters.SetUserColumns, callback?: Callback<T>): Promise<void>;
  async setUserColumns<T = any>(parameters?: Parameters.SetUserColumns, callback?: undefined): Promise<T>;
  async setUserColumns<T = any>(parameters?: Parameters.SetUserColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/columns',
      method: 'PUT',
      params: {
        accountId: parameters?.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async resetUserColumns<T = any>(parameters?: Parameters.ResetUserColumns, callback?: Callback<T>): Promise<void>;
  async resetUserColumns<T = any>(parameters?: Parameters.ResetUserColumns, callback?: undefined): Promise<T>;
  async resetUserColumns<T = any>(parameters?: Parameters.ResetUserColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/columns',
      method: 'DELETE',
      params: {
        accountId: parameters?.accountId,
        username: parameters?.username,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmail, callback: Callback<T>): Promise<void>;
  async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmail, callback?: undefined): Promise<T>;
  async getUserEmail<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmail, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/email',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmailBulk, callback: Callback<T>): Promise<void>;
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmailBulk, callback?: undefined): Promise<T>;
  async getUserEmailBulk<T = Models.UnrestrictedUserEmail>(parameters: Parameters.GetUserEmailBulk, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/email/bulk',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getUserGroups<T = any>(parameters: Parameters.GetUserGroups, callback: Callback<T>): Promise<void>;
  async getUserGroups<T = any>(parameters: Parameters.GetUserGroups, callback?: undefined): Promise<T>;
  async getUserGroups<T = any>(parameters: Parameters.GetUserGroups, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/user/groups',
      method: 'GET',
      params: {
        accountId: parameters.accountId,
        username: parameters.username,
        key: parameters.key,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllUsersDefault<T = any>(parameters?: Parameters.GetAllUsersDefault, callback?: Callback<T>): Promise<void>;
  async getAllUsersDefault<T = any>(parameters?: Parameters.GetAllUsersDefault, callback?: undefined): Promise<T>;
  async getAllUsersDefault<T = any>(parameters?: Parameters.GetAllUsersDefault, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/users',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getAllUsers<T = any>(parameters?: Parameters.GetAllUsers, callback?: Callback<T>): Promise<void>;
  async getAllUsers<T = any>(parameters?: Parameters.GetAllUsers, callback?: undefined): Promise<T>;
  async getAllUsers<T = any>(parameters?: Parameters.GetAllUsers, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/users/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
