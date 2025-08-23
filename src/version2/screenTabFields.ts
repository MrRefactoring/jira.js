import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAllScreenTabFieldsParameters } from './parameters/getAllScreenTabFieldsParameters';
import type { AddScreenTabFieldParameters } from './parameters/addScreenTabFieldParameters';
import type { RemoveScreenTabFieldParameters } from './parameters/removeScreenTabFieldParameters';
import type { MoveScreenTabFieldParameters } from './parameters/moveScreenTabFieldParameters';

export class ScreenTabFields {
  constructor(private client: Client) {}
  /**
   * Returns all fields for a screen tab. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
   *       specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type
   *       Screen Scheme.
   */
  async getAllScreenTabFields(parameters: GetAllScreenTabFieldsParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
      method: 'GET',
      query: {
        projectKey: parameters.projectKey,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds a field to a screen tab. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addScreenTabField(parameters: AddScreenTabFieldParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
      method: 'POST',
      body: {
        fieldId: parameters.fieldId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes a field from a screen tab. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeScreenTabField(parameters: RemoveScreenTabFieldParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Moves a screen tab field. *
   *
   * - If `after` and `position` are provided in the request, `position` is ignored.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveScreenTabField(parameters: MoveScreenTabFieldParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/move`,
      method: 'POST',
      body: {
        after: parameters.after,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(request);
  }
}
