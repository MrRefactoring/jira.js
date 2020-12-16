import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../client';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class FilterSharing {
  constructor(private client: Client) { }
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback?: Callback<T>): Promise<void>;
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback?: undefined): Promise<T>;
  async getDefaultShareScope<T = Models.DefaultShareScope>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/filter/defaultShareScope',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setDefaultShareScope<T = Models.DefaultShareScope>(callback?: Callback<T>): Promise<void>;
  async setDefaultShareScope<T = Models.DefaultShareScope>(callback?: undefined): Promise<T>;
  async setDefaultShareScope<T = Models.DefaultShareScope>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/filter/defaultShareScope',
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getSharePermissions<T = any>(parameters: Parameters.GetSharePermissions, callback: Callback<T>): Promise<void>;
  async getSharePermissions<T = any>(parameters: Parameters.GetSharePermissions, callback?: undefined): Promise<T>;
  async getSharePermissions<T = any>(parameters: Parameters.GetSharePermissions, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/filter/${parameters.id}/permission`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async addSharePermission<T = any>(parameters: Parameters.AddSharePermission, callback: Callback<T>): Promise<void>;
  async addSharePermission<T = any>(parameters: Parameters.AddSharePermission, callback?: undefined): Promise<T>;
  async addSharePermission<T = any>(parameters: Parameters.AddSharePermission, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/filter/${parameters.id}/permission`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getSharePermission<T = Models.SharePermission>(parameters: Parameters.GetSharePermission, callback: Callback<T>): Promise<void>;
  async getSharePermission<T = Models.SharePermission>(parameters: Parameters.GetSharePermission, callback?: undefined): Promise<T>;
  async getSharePermission<T = Models.SharePermission>(parameters: Parameters.GetSharePermission, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteSharePermission<T = any>(parameters: Parameters.DeleteSharePermission, callback: Callback<T>): Promise<void>;
  async deleteSharePermission<T = any>(parameters: Parameters.DeleteSharePermission, callback?: undefined): Promise<T>;
  async deleteSharePermission<T = any>(parameters: Parameters.DeleteSharePermission, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
