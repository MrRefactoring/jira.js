import * as Models from './models/index.js';
import type { Callback } from '../callback.js';
import type { Client } from '../clients/index.js';
import type { RequestConfig } from '../requestConfig.js';

export class ServerInfo {
  constructor(private client: Client) {}

  /**
   * Returns information about the Jira instance.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getServerInfo<T = Models.ServerInformation>(callback: Callback<T>): Promise<void>;
  /**
   * Returns information about the Jira instance.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getServerInfo<T = Models.ServerInformation>(callback?: never): Promise<T>;
  async getServerInfo<T = Models.ServerInformation>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/serverInfo',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
