import type { Client } from '../client';
import type { Request } from '../request';
import type { GetScreensForFieldParameters } from './parameters/getScreensForFieldParameters';
import type { GetScreensParameters } from './parameters/getScreensParameters';
import type { CreateScreenParameters } from './parameters/createScreenParameters';
import type { AddFieldToDefaultScreenParameters } from './parameters/addFieldToDefaultScreenParameters';
import type { DeleteScreenParameters } from './parameters/deleteScreenParameters';
import type { UpdateScreenParameters } from './parameters/updateScreenParameters';
import type { GetAvailableScreenFieldsParameters } from './parameters/getAvailableScreenFieldsParameters';

export class Screens {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
   * screens a field is used in. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreensForField(parameters: GetScreensForFieldParameters) {
    const request: Request = {
      url: `/rest/api/2/field/${parameters.fieldId}/screens`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * screens or those specified by one or more screen IDs. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreens(parameters: GetScreensParameters) {
    const request: Request = {
      url: '/rest/api/2/screens',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        queryString: parameters.queryString,
        scope: parameters.scope,
        orderBy: parameters.orderBy,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a screen with a default field tab. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createScreen(parameters: CreateScreenParameters) {
    const request: Request = {
      url: '/rest/api/2/screens',
      method: 'POST',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds a field to the default tab of the default screen. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addFieldToDefaultScreen(parameters: AddFieldToDefaultScreenParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/addToDefault/${parameters.fieldId}`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft. *
   *
   * - Only screens used in classic projects can be deleted.
   */
  async deleteScreen(parameters: DeleteScreenParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a screen. Only screens used in classic projects can be updated. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateScreen(parameters: UpdateScreenParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the fields that can be added to a tab on a screen. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAvailableScreenFields(parameters: GetAvailableScreenFieldsParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/availableFields`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }
}
