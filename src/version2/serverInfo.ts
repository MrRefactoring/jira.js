import * as Models from './models';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ServerInfo {
  constructor(private client: Client) {}

  /**
   * Returns information about the Jira instance.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getServerInfo<T = Models.ServerInformation>(callback: Callback<T>): Promise<void>;
  /**
   * Returns information about the Jira instance.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getServerInfo<T = Models.ServerInformation>(callback?: never): Promise<T>;
  async getServerInfo<T = Models.ServerInformation>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/serverInfo',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.serverInfo.getServerInfo' });
  }
}
