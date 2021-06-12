import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class DynamicModules {
  constructor(private client: Client) {}

  /**
   * Returns all modules registered dynamically by the calling app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Connect apps can make this request.
   */
  async getModules<T = Models.ConnectModules>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all modules registered dynamically by the calling app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Connect apps can make this request.
   */
  async getModules<T = Models.ConnectModules>(callback?: never): Promise<T>;
  async getModules<T = Models.ConnectModules>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dynamicModules.getModules' });
  }

  /**
   * Registers a list of modules.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Connect apps can make this request.
   */
  async registerModules<T = unknown>(
    parameters: Parameters.RegisterModules | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Registers a list of modules.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Connect apps can make this request.
   */
  async registerModules<T = unknown>(parameters?: Parameters.RegisterModules, callback?: never): Promise<T>;
  async registerModules<T = unknown>(
    parameters?: Parameters.RegisterModules,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'POST',
      data: {
        modules: parameters?.modules,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dynamicModules.registerModules' });
  }

  /**
   * Remove all or a list of modules registered by the calling app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Connect apps can make this request.
   */
  async removeModules<T = void>(parameters: Parameters.RemoveModules | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Remove all or a list of modules registered by the calling app.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   * Connect apps can make this request.
   */
  async removeModules<T = void>(parameters?: Parameters.RemoveModules, callback?: never): Promise<T>;
  async removeModules<T = void>(parameters?: Parameters.RemoveModules, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'DELETE',
      params: {
        moduleKey: parameters?.moduleKey,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dynamicModules.removeModules' });
  }
}
