import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class UserNavProperties {
  constructor(private client: Client) {}

  /**
   * Returns the value of a user nav preference.
   *
   * Note: This operation fetches the property key value directly from RbacClient.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to get a property from any user.
   * - Access to Jira, to get a property from the calling user's record.
   */
  async getUserNavProperty<T = Models.UserNavProperty>(
    parameters: Parameters.GetUserNavProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the value of a user nav preference.
   *
   * Note: This operation fetches the property key value directly from RbacClient.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to get a property from any user.
   * - Access to Jira, to get a property from the calling user's record.
   */
  async getUserNavProperty<T = Models.UserNavProperty>(
    parameters: Parameters.GetUserNavProperty,
    callback?: never,
  ): Promise<T>;
  async getUserNavProperty<T = Models.UserNavProperty>(
    parameters: Parameters.GetUserNavProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/user/nav4-opt-property/${parameters.propertyKey}`,
      method: 'GET',
      params: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of a Nav4 preference. Use this resource to store Nav4 preference data against a user in the Identity
   * service.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set a property on any user.
   * - Access to Jira, to set a property on the calling user's record.
   */
  async setUserNavProperty<T = unknown>(
    parameters: Parameters.SetUserNavProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets the value of a Nav4 preference. Use this resource to store Nav4 preference data against a user in the Identity
   * service.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set a property on any user.
   * - Access to Jira, to set a property on the calling user's record.
   */
  async setUserNavProperty<T = unknown>(parameters: Parameters.SetUserNavProperty, callback?: never): Promise<T>;
  async setUserNavProperty<T = unknown>(
    parameters: Parameters.SetUserNavProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/user/nav4-opt-property/${parameters.propertyKey}`,
      method: 'PUT',
      params: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
