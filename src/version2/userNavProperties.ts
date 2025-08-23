import type { Client } from '../client';
import type { Request } from '../request';
import type { GetUserNavPropertyParameters } from './parameters/getUserNavPropertyParameters';
import type { SetUserNavPropertyParameters } from './parameters/setUserNavPropertyParameters';

export class Usernavproperties {
  constructor(private client: Client) {}
  /**
   * Returns the value of a user nav preference. *
   *
   * - Note: This operation fetches the property key value directly from RbacClient.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to get a property from any user.
   * - - Access to Jira, to get a property from the calling user's record.
   */
  async getUserNavProperty(parameters: GetUserNavPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/user/nav4-opt-property/${parameters.propertyKey}`,
      method: 'GET',
      query: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the value of a Nav4 preference. Use this resource to store Nav4 preference data against a user in the Identity
   * service. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg), to set a property on any user.
   * - - Access to Jira, to set a property on the calling user's record.
   */
  async setUserNavProperty(parameters: SetUserNavPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/user/nav4-opt-property/${parameters.propertyKey}`,
      method: 'PUT',
      query: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(request);
  }
}
