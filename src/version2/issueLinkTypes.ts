import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateIssueLinkTypeParameters } from './parameters/createIssueLinkTypeParameters';
import type { DeleteIssueLinkTypeParameters } from './parameters/deleteIssueLinkTypeParameters';
import type { GetIssueLinkTypeParameters } from './parameters/getIssueLinkTypeParameters';
import type { UpdateIssueLinkTypeParameters } from './parameters/updateIssueLinkTypeParameters';

export class IssueLinkTypes {
  constructor(private client: Client) {}
  /**
   * Returns a list of all issue link types. *
   *
   * - To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkTypes() {
    const request: Request = {
      url: '/rest/api/2/issueLinkType',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates an issue link type. Use this operation to create descriptions of the reasons why issues are linked. The
   * issue link type consists of a name and descriptions for a link's inward and outward relationships. *
   *
   * - To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueLinkType(parameters: CreateIssueLinkTypeParameters) {
    const request: Request = {
      url: '/rest/api/2/issueLinkType',
      method: 'POST',
      body: {
        id: parameters.id,
        inward: parameters.inward,
        name: parameters.name,
        outward: parameters.outward,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue link type. *
   *
   * - To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueLinkType(parameters: DeleteIssueLinkTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns an issue link type. *
   *
   * - To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project in the site.
   */
  async getIssueLinkType(parameters: GetIssueLinkTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates an issue link type. *
   *
   * - To use this operation, the site must have [issue linking](https://confluence.atlassian.com/x/yoXKM) enabled.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueLinkType(parameters: UpdateIssueLinkTypeParameters) {
    const request: Request = {
      url: `/rest/api/2/issueLinkType/${parameters.issueLinkTypeId}`,
      method: 'PUT',
      body: {
        id: parameters.id,
        inward: parameters.inward,
        name: parameters.name,
        outward: parameters.outward,
        self: parameters.self,
      },
    };

    return this.client.sendRequest(request);
  }
}
