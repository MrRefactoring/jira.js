import type { Client } from '../client';
import type { Request } from '../request';
import type { GetUserPropertyKeysParameters } from './parameters/getUserPropertyKeysParameters';
import type { DeleteUserPropertyParameters } from './parameters/deleteUserPropertyParameters';
import type { GetUserPropertyParameters } from './parameters/getUserPropertyParameters';
import type { SetUserPropertyParameters } from './parameters/setUserPropertyParameters';

export class UserProperties {
  constructor(private client: Client) {}
  /**
   * Returns the keys of all properties for a user. *
   *
   * - Note: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and
   *   maintained in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to access the property keys on
   *       any user.
   * - - Access to Jira, to access the calling user's property keys.
   */
  async getUserPropertyKeys(parameters: GetUserPropertyKeysParameters) {
    const request: Request = {
      url: '/rest/api/2/user/properties',
      method: 'GET',
      query: {
        accountId: parameters.accountId,
        userKey: parameters.userKey,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a property from a user. *
   *
   * - Note: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and
   *   maintained in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to delete a property from any
   *       user.
   * - - Access to Jira, to delete a property from the calling user's record.
   */
  async deleteUserProperty(parameters: DeleteUserPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
      method: 'DELETE',
      query: {
        accountId: parameters.accountId,
        userKey: parameters.userKey,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the value of a user's property. If no property key is provided [Get user property
   * keys](#api-rest-api-2-user-properties-get) is called. *
   *
   * - Note: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and
   *   maintained in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to get a property from any user.
   * - - Access to Jira, to get a property from the calling user's record.
   */
  async getUserProperty(parameters: GetUserPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
      method: 'GET',
      query: {
        accountId: parameters.accountId,
        userKey: parameters.userKey,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the value of a user's property. Use this resource to store custom data against a user. *
   *
   * - Note: This operation does not access the [user properties](https://confluence.atlassian.com/x/8YxjL) created and
   *   maintained in Jira.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set a property on any user.
   * - - Access to Jira, to set a property on the calling user's record.
   */
  async setUserProperty(parameters: SetUserPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
      method: 'PUT',
      query: {
        accountId: parameters.accountId,
        userKey: parameters.userKey,
        username: parameters.username,
      },
    };

    return this.client.sendRequest(request);
  }
}
