import * as Models from './models';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class LicenseMetrics {
  constructor(private client: Client) {}

  /**
   * Returns the total approximate user account across all jira licenced application keys. Please note this information
   * is cached with a 7-day lifecycle and could be stale at the time of call.
   */
  async getApproximateLicenseCount<T = Models.LicenseMetric>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the total approximate user account across all jira licenced application keys. Please note this information
   * is cached with a 7-day lifecycle and could be stale at the time of call.
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
   * Returns the total approximate user account for a specific `jira licence application key`. Please note this
   * information is cached with a 7-day lifecycle and could be stale at the time of call.
   */
  async getApproximateApplicationLicenseCount<T = Models.LicenseMetric>(
    applicationKey: string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the total approximate user account for a specific `jira licence application key`. Please note this
   * information is cached with a 7-day lifecycle and could be stale at the time of call.
   */
  async getApproximateApplicationLicenseCount<T = Models.LicenseMetric>(
    applicationKey: string,
    callback?: never
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
