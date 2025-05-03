import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class UIModificationsApps {
  constructor(private client: Client) {}

  /**
   * Gets UI modifications. UI modifications can only be retrieved by Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   *
   * The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async getUiModifications<T = Models.PageUiModificationDetails>(
    parameters: Parameters.GetUiModifications | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Gets UI modifications. UI modifications can only be retrieved by Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   *
   * The new `read:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async getUiModifications<T = Models.PageUiModificationDetails>(
    parameters?: Parameters.GetUiModifications,
    callback?: never,
  ): Promise<T>;
  async getUiModifications<T = Models.PageUiModificationDetails>(
    parameters?: Parameters.GetUiModifications,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/uiModifications',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a UI modification. UI modification can only be created by Forge apps.
   *
   * Each app can define up to 3000 UI modifications. Each UI modification can define up to 1000 contexts. The same
   * context can be assigned to maximum 100 UI modifications.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _None_ if the UI modification is created without contexts.
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *   UI modification is created with contexts.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async createUiModification<T = Models.UiModificationIdentifiers>(
    parameters: Parameters.CreateUiModification,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a UI modification. UI modification can only be created by Forge apps.
   *
   * Each app can define up to 3000 UI modifications. Each UI modification can define up to 1000 contexts. The same
   * context can be assigned to maximum 100 UI modifications.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _None_ if the UI modification is created without contexts.
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *   UI modification is created with contexts.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async createUiModification<T = Models.UiModificationIdentifiers>(
    parameters: Parameters.CreateUiModification,
    callback?: never,
  ): Promise<T>;
  async createUiModification<T = Models.UiModificationIdentifiers>(
    parameters: Parameters.CreateUiModification,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/uiModifications',
      method: 'POST',
      data: {
        name: parameters.name,
        description: parameters.description,
        data: parameters.data,
        contexts: parameters.contexts,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a UI modification. UI modification can only be updated by Forge apps.
   *
   * Each UI modification can define up to 1000 contexts. The same context can be assigned to maximum 100 UI
   * modifications.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _None_ if the UI modification is created without contexts.
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *   UI modification is created with contexts.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async updateUiModification<T = void>(
    parameters: Parameters.UpdateUiModification,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates a UI modification. UI modification can only be updated by Forge apps.
   *
   * Each UI modification can define up to 1000 contexts. The same context can be assigned to maximum 100 UI
   * modifications.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _None_ if the UI modification is created without contexts.
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *   UI modification is created with contexts.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async updateUiModification<T = void>(parameters: Parameters.UpdateUiModification, callback?: never): Promise<T>;
  async updateUiModification<T = void>(
    parameters: Parameters.UpdateUiModification,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/uiModifications/${parameters.uiModificationId}`,
      method: 'PUT',
      data: {
        contexts: parameters.contexts,
        data: parameters.data,
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a UI modification. All the contexts that belong to the UI modification are deleted too. UI modification can
   * only be deleted by Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async deleteUiModification<T = void>(
    parameters: Parameters.DeleteUiModification | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a UI modification. All the contexts that belong to the UI modification are deleted too. UI modification can
   * only be deleted by Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   *
   * The new `write:app-data:jira` OAuth scope is 100% optional now, and not using it won't break your app. However, we
   * recommend adding it to your app's scope list because we will eventually make it mandatory.
   */
  async deleteUiModification<T = void>(
    parameters: Parameters.DeleteUiModification | string,
    callback?: never,
  ): Promise<T>;
  async deleteUiModification<T = void>(
    parameters: Parameters.DeleteUiModification | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const uiModificationId = typeof parameters === 'string' ? parameters : parameters.uiModificationId;

    const config: RequestConfig = {
      url: `/rest/api/3/uiModifications/${uiModificationId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
