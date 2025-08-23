import type { Client } from '../client';
import type { Request } from '../request';
import type { GetApproximateApplicationLicenseCountParameters } from './parameters/getApproximateApplicationLicenseCountParameters';

export class LicenseMetrics {
  constructor(private client: Client) {}
  /**
   * Returns licensing information about the Jira instance. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getLicense() {
    const request: Request = {
      url: '/rest/api/2/instance/license',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the approximate number of user accounts across all Jira licenses. Note that this information is cached with
   * a 7-day lifecycle and could be stale at the time of call. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApproximateLicenseCount() {
    const request: Request = {
      url: '/rest/api/2/license/approximateLicenseCount',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the total approximate number of user accounts for a single Jira license. Note that this information is
   * cached with a 7-day lifecycle and could be stale at the time of call. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getApproximateApplicationLicenseCount(parameters: GetApproximateApplicationLicenseCountParameters) {
    const request: Request = {
      url: `/rest/api/2/license/approximateLicenseCount/product/${parameters.applicationKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
