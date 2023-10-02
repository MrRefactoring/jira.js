import * as Models from './models';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

/** @deprecated Use {@link LicenseMetrics} */
export class InstanceInformation {
  constructor(private client: Client) {}

  /**
   * @deprecated Use {@link LicenseMetrics.getLicense}. Returns licensing information about the Jira instance.
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   None.
   */
  async getLicense<T = Models.License>(callback: Callback<T>): Promise<void>;
  /**
   * @deprecated Use {@link LicenseMetrics.getLicense}. Returns licensing information about the Jira instance.
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   None.
   */
  async getLicense<T = Models.License>(callback?: never): Promise<T>;
  async getLicense<T = Models.License>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/instance/license',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
