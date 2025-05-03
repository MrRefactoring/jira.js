import type * as Models from './models';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class InstanceInformation {
  constructor(private client: Client) {}

  /**
   * Returns licensing information about the Jira instance.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   *
   * @deprecated This method is deprecated and will be removed in a future version. Please use an alternative method.
   */
  async getLicense<T = Models.License>(callback: Callback<T>): Promise<void>;
  /**
   * Returns licensing information about the Jira instance.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   *
   * @deprecated This method is deprecated and will be removed in a future version. Please use an alternative method.
   */
  async getLicense<T = Models.License>(callback?: never): Promise<T>;
  async getLicense<T = Models.License>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/instance/license',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
