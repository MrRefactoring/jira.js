import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class ScreenTabs {
  constructor(private client: Client) {}

  /**
   * Returns the list of tabs for a bulk of screens.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getBulkScreenTabs<T = unknown>(
    parameters: Parameters.GetBulkScreenTabs | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the list of tabs for a bulk of screens.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getBulkScreenTabs<T = unknown>(parameters?: Parameters.GetBulkScreenTabs, callback?: never): Promise<T>;
  async getBulkScreenTabs<T = unknown>(
    parameters?: Parameters.GetBulkScreenTabs,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/screens/tabs',
      method: 'GET',
      params: {
        screenId: parameters?.screenId,
        tabId: parameters?.tabId,
        startAt: parameters?.startAt,
        maxResult: parameters?.maxResult,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the list of tabs for a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
   *   specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen
   *   Scheme.
   */
  async getAllScreenTabs<T = Models.ScreenableTab[]>(
    parameters: Parameters.GetAllScreenTabs | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the list of tabs for a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
   *   specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen
   *   Scheme.
   */
  async getAllScreenTabs<T = Models.ScreenableTab[]>(
    parameters: Parameters.GetAllScreenTabs | string,
    callback?: never,
  ): Promise<T>;
  async getAllScreenTabs<T = Models.ScreenableTab[]>(
    parameters: Parameters.GetAllScreenTabs | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const screenId = typeof parameters === 'string' ? parameters : parameters.screenId;

    const config: RequestConfig = {
      url: `/rest/api/2/screens/${screenId}/tabs`,
      method: 'GET',
      params: {
        projectKey: typeof parameters !== 'string' && parameters.projectKey,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a tab for a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addScreenTab<T = Models.ScreenableTab>(
    parameters: Parameters.AddScreenTab,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a tab for a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addScreenTab<T = Models.ScreenableTab>(parameters: Parameters.AddScreenTab, callback?: never): Promise<T>;
  async addScreenTab<T = Models.ScreenableTab>(
    parameters: Parameters.AddScreenTab,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs`,
      method: 'POST',
      data: {
        id: parameters.id,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the name of a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async renameScreenTab<T = Models.ScreenableTab>(
    parameters: Parameters.RenameScreenTab,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the name of a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async renameScreenTab<T = Models.ScreenableTab>(parameters: Parameters.RenameScreenTab, callback?: never): Promise<T>;
  async renameScreenTab<T = Models.ScreenableTab>(
    parameters: Parameters.RenameScreenTab,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback?: never): Promise<T>;
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Moves a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback: Callback<T>): Promise<void>;
  /**
   * Moves a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback?: never): Promise<T>;
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/tabs/${parameters.tabId}/move/${parameters.pos}`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }
}
