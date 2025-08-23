import type { Client } from '../client';
import type { Request } from '../request';
import type { GetBulkScreenTabsParameters } from './parameters/getBulkScreenTabsParameters';
import type { GetAllScreenTabsParameters } from './parameters/getAllScreenTabsParameters';
import type { AddScreenTabParameters } from './parameters/addScreenTabParameters';
import type { DeleteScreenTabParameters } from './parameters/deleteScreenTabParameters';
import type { RenameScreenTabParameters } from './parameters/renameScreenTabParameters';
import type { MoveScreenTabParameters } from './parameters/moveScreenTabParameters';

export class ScreenTabs {
  constructor(private client: Client) {}
  /**
   * Returns the list of tabs for a bulk of screens. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getBulkScreenTabs(parameters: GetBulkScreenTabsParameters) {
    const request: Request = {
      url: '/rest/api/2/screens/tabs',
      method: 'GET',
      query: {
        screenId: parameters.screenId,
        tabId: parameters.tabId,
        startAt: parameters.startAt,
        maxResult: parameters.maxResult,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the list of tabs for a screen. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
   *       specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type
   *       Screen Scheme.
   */
  async getAllScreenTabs(parameters: GetAllScreenTabsParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs`,
      method: 'GET',
      query: {
        projectKey: parameters.projectKey,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a tab for a screen. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addScreenTab(parameters: AddScreenTabParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs`,
      method: 'POST',
      body: {
        id: parameters.id,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a screen tab. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteScreenTab(parameters: DeleteScreenTabParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the name of a screen tab. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async renameScreenTab(parameters: RenameScreenTabParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'PUT',
      body: {
        id: parameters.id,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Moves a screen tab. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveScreenTab(parameters: MoveScreenTabParameters) {
    const request: Request = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/move/${parameters.pos}`,
      method: 'POST',
    };

    return this.client.sendRequest(request);
  }
}
