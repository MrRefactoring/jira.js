import type { Client } from '../client';
import type { Request } from '../request';
import type { GetScreenSchemesParameters } from './parameters/getScreenSchemesParameters';
import type { CreateScreenSchemeParameters } from './parameters/createScreenSchemeParameters';
import type { DeleteScreenSchemeParameters } from './parameters/deleteScreenSchemeParameters';
import type { UpdateScreenSchemeParameters } from './parameters/updateScreenSchemeParameters';

export class ScreenSchemes {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of screen
   * schemes. *
   *
   * - Only screen schemes used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreenSchemes(parameters: GetScreenSchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/screenscheme',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        expand: parameters.expand,
        queryString: parameters.queryString,
        orderBy: parameters.orderBy,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a screen scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createScreenScheme(parameters: CreateScreenSchemeParameters) {
    const request: Request = {
      url: '/rest/api/2/screenscheme',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
        screens: parameters.screens,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme. *
   *
   * - Only screens schemes used in classic projects can be deleted.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteScreenScheme(parameters: DeleteScreenSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a screen scheme. Only screen schemes used in classic projects can be updated. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateScreenScheme(parameters: UpdateScreenSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
        screens: parameters.screens,
      },
    };

    return this.client.sendRequest(request);
  }
}
