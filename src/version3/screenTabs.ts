import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ScreenTabs {
  constructor(private client: Client) {}

  /**
   * Returns the list of tabs for a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
   *   specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen Scheme.
   */
  async getAllScreenTabs<T = Models.ScreenableTab[]>(
    parameters: Parameters.GetAllScreenTabs,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the list of tabs for a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - *Administer projects* [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
   *   specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen Scheme.
   */
  async getAllScreenTabs<T = Models.ScreenableTab[]>(
    parameters: Parameters.GetAllScreenTabs,
    callback?: never
  ): Promise<T>;
  async getAllScreenTabs<T = Models.ScreenableTab[]>(
    parameters: Parameters.GetAllScreenTabs,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
      method: 'GET',
      params: {
        projectKey: parameters.projectKey,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.screenTabs.getAllScreenTabs' });
  }

  /**
   * Creates a tab for a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addScreenTab<T = Models.ScreenableTab>(
    parameters: Parameters.AddScreenTab,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a tab for a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addScreenTab<T = Models.ScreenableTab>(parameters: Parameters.AddScreenTab, callback?: never): Promise<T>;
  async addScreenTab<T = Models.ScreenableTab>(
    parameters: Parameters.AddScreenTab,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs`,
      method: 'POST',
      data: {
        id: parameters.id,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.screenTabs.addScreenTab' });
  }

  /**
   * Updates the name of a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async renameScreenTab<T = Models.ScreenableTab>(
    parameters: Parameters.RenameScreenTab,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates the name of a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async renameScreenTab<T = Models.ScreenableTab>(parameters: Parameters.RenameScreenTab, callback?: never): Promise<T>;
  async renameScreenTab<T = Models.ScreenableTab>(
    parameters: Parameters.RenameScreenTab,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'PUT',
      data: {
        id: parameters.id,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.screenTabs.renameScreenTab' });
  }

  /**
   * Deletes a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback?: never): Promise<T>;
  async deleteScreenTab<T = void>(parameters: Parameters.DeleteScreenTab, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.screenTabs.deleteScreenTab' });
  }

  /**
   * Moves a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback: Callback<T>): Promise<void>;
  /**
   * Moves a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback?: never): Promise<T>;
  async moveScreenTab<T = void>(parameters: Parameters.MoveScreenTab, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/move/${parameters.pos}`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.screenTabs.moveScreenTab' });
  }
}
