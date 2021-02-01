import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class DynamicModules {
  constructor(private client: Client) { }
  /**
     * Returns all modules registered dynamically by the calling app.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this request. */
  async getModules<T = Models.ConnectModules>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns all modules registered dynamically by the calling app.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this request. */
  async getModules<T = Models.ConnectModules>(callback?: undefined): Promise<T>;
  async getModules<T = Models.ConnectModules>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getModules' });
  }
  /**
     * Registers a list of modules.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this request. */
  async registerModules<T = any>(parameters?: Parameters.RegisterModules, callback?: Callback<T>): Promise<void>;
  /**
     * Registers a list of modules.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this request. */
  async registerModules<T = any>(parameters?: Parameters.RegisterModules, callback?: undefined): Promise<T>;
  async registerModules<T = any>(parameters?: Parameters.RegisterModules, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'POST',
      data: {
        modules: parameters?.modules,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'registerModules' });
  }
  /**
     * Remove all or a list of modules registered by the calling app.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this request. */
  async removeModules<T = void>(parameters?: Parameters.RemoveModules, callback?: Callback<T>): Promise<void>;
  /**
     * Remove all or a list of modules registered by the calling app.
     *
     * **[Permissions](#permissions) required:** Only Connect apps can make this request. */
  async removeModules<T = void>(parameters?: Parameters.RemoveModules, callback?: undefined): Promise<T>;
  async removeModules<T = void>(parameters?: Parameters.RemoveModules, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/atlassian-connect/1/app/module/dynamic',
      method: 'DELETE',
      params: {
        moduleKey: parameters?.moduleKey,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'removeModules' });
  }
}
