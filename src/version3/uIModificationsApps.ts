import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class UIModificationsApps {
  constructor(private client: Client) {}

  /**
   * Gets UI modifications. UI modifications can only be retrieved by Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getUiModifications<T = Models.PageUiModificationDetails>(
    parameters: Parameters.GetUiModifications | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Gets UI modifications. UI modifications can only be retrieved by Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getUiModifications<T = Models.PageUiModificationDetails>(
    parameters?: Parameters.GetUiModifications,
    callback?: never
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
   * Each app can define up to 100 UI modifications. Each UI modification can define up to 1000 contexts.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _None_ if the UI modification is created without contexts.
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *   UI modification is created with contexts.
   */
  async createUiModification<T = Models.UiModificationIdentifiers>(
    parameters: Parameters.CreateUiModification | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a UI modification. UI modification can only be created by Forge apps.
   *
   * Each app can define up to 100 UI modifications. Each UI modification can define up to 1000 contexts.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _None_ if the UI modification is created without contexts.
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *   UI modification is created with contexts.
   */
  async createUiModification<T = Models.UiModificationIdentifiers>(
    parameters?: Parameters.CreateUiModification,
    callback?: never
  ): Promise<T>;
  async createUiModification<T = Models.UiModificationIdentifiers>(
    parameters?: Parameters.CreateUiModification,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/uiModifications',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        data: parameters?.data,
        contexts: parameters?.contexts,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a UI modification. UI modification can only be updated by Forge apps.
   *
   * Each UI modification can define up to 1000 contexts.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _None_ if the UI modification is created without contexts.
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *   UI modification is created with contexts.
   */
  async updateUiModification<T = void>(
    parameters: Parameters.UpdateUiModification,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a UI modification. UI modification can only be updated by Forge apps.
   *
   * Each UI modification can define up to 1000 contexts.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _None_ if the UI modification is created without contexts.
   * - _Browse projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for one or more projects, if the
   *   UI modification is created with contexts.
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
        name: parameters.name,
        description: parameters.description,
        data: parameters.data,
        contexts: parameters.contexts,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a UI modification. All the contexts that belong to the UI modification are deleted too. UI modification can
   * only be deleted by Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async deleteUiModification<T = void>(
    parameters: Parameters.DeleteUiModification,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a UI modification. All the contexts that belong to the UI modification are deleted too. UI modification can
   * only be deleted by Forge apps.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async deleteUiModification<T = void>(parameters: Parameters.DeleteUiModification, callback?: never): Promise<T>;
  async deleteUiModification<T = void>(
    parameters: Parameters.DeleteUiModification,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/uiModifications/${parameters.uiModificationId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
