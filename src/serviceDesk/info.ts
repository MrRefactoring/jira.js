import * as Models from './models/index.js';
import type { Callback } from '../callback.js';
import type { Client } from '../clients/index.js';
import type { RequestConfig } from '../requestConfig.js';

export class Info {
  constructor(private client: Client) {}

  /**
   * This method retrieves information about the Jira Service Management instance such as software version, builds, and
   * related links.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: None,
   * the user does not need to be logged in.
   */
  async getInfo<T = Models.SoftwareInfo>(callback: Callback<T>): Promise<void>;
  /**
   * This method retrieves information about the Jira Service Management instance such as software version, builds, and
   * related links.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: None,
   * the user does not need to be logged in.
   */
  async getInfo<T = Models.SoftwareInfo>(callback?: never): Promise<T>;
  async getInfo<T = Models.SoftwareInfo>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/info',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
