import type * as Models from './models';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class LicenseMetrics {
  constructor(private client: Client) {}

  /**
   * Returns licensing information about the Jira instance.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getLicense<T = Models.License>(callback: Callback<T>): Promise<void>;
  /**
   * Returns licensing information about the Jira instance.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getLicense<T = Models.License>(callback?: never): Promise<T>;
  async getLicense<T = Models.License>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/instance/license',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the approximate number of user accounts across all Jira licenses. Note that this information is cached with
   * a 7-day lifecycle and could be stale at the time of call.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApproximateLicenseCount<T = Models.LicenseMetric>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the approximate number of user accounts across all Jira licenses. Note that this information is cached with
   * a 7-day lifecycle and could be stale at the time of call.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApproximateLicenseCount<T = Models.LicenseMetric>(callback?: never): Promise<T>;
  async getApproximateLicenseCount<T = Models.LicenseMetric>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/license/approximateLicenseCount',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the total approximate number of user accounts for a single Jira license. Note that this information is
   * cached with a 7-day lifecycle and could be stale at the time of call.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApproximateApplicationLicenseCount<T = Models.LicenseMetric>(
    applicationKey: string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the total approximate number of user accounts for a single Jira license. Note that this information is
   * cached with a 7-day lifecycle and could be stale at the time of call.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApproximateApplicationLicenseCount<T = Models.LicenseMetric>(
    applicationKey: string,
    callback?: never,
  ): Promise<T>;
  async getApproximateApplicationLicenseCount<T = Models.LicenseMetric>(
    applicationKey: string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/license/approximateLicenseCount/product/${applicationKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
