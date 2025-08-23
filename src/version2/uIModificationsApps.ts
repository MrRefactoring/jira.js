import type { Client } from '../client';
import type { Request } from '../request';
import type { GetUiModificationsParameters } from './parameters/getUiModificationsParameters';
import type { CreateUiModificationParameters } from './parameters/createUiModificationParameters';
import type { DeleteUiModificationParameters } from './parameters/deleteUiModificationParameters';
import type { UpdateUiModificationParameters } from './parameters/updateUiModificationParameters';

export class UIModificationsApps {
  constructor(private client: Client) {}
  /**
   * Gets UI modifications. UI modifications can only be retrieved by Forge apps. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   * -
   * - The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async getUiModifications(parameters: GetUiModificationsParameters) {
    const request: Request = {
      url: '/rest/api/2/uiModifications',
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
   * Creates a UI modification. UI modification can only be created by Forge apps. *
   *
   * - Each app can define up to 3000 UI modifications. Each UI modification can define up to 1000 contexts. The same
   *   context can be assigned to maximum 100 UI modifications.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _None_ if the UI modification is created without contexts.
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *       UI modification is created with contexts.
   * -
   * - The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async createUiModification(parameters: CreateUiModificationParameters) {
    const request: Request = {
      url: '/rest/api/2/uiModifications',
      method: 'POST',
      body: {
        contexts: parameters.contexts,
        data: parameters.data,
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a UI modification. All the contexts that belong to the UI modification are deleted too. UI modification can
   * only be deleted by Forge apps. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   * -
   * - The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async deleteUiModification(parameters: DeleteUiModificationParameters) {
    const request: Request = {
      url: `/rest/api/2/uiModifications/${parameters.uiModificationId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a UI modification. UI modification can only be updated by Forge apps. *
   *
   * - Each UI modification can define up to 1000 contexts. The same context can be assigned to maximum 100 UI
   *   modifications.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _None_ if the UI modification is created without contexts.
   * - - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *       UI modification is created with contexts.
   * -
   * - The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   *   recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async updateUiModification(parameters: UpdateUiModificationParameters) {
    const request: Request = {
      url: `/rest/api/2/uiModifications/${parameters.uiModificationId}`,
      method: 'PUT',
      body: {
        contexts: parameters.contexts,
        data: parameters.data,
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }
}
