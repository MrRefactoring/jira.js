import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Screens {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
   * screens a field is used in.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreensForField<T = Models.PageBeanScreenWithTab>(
    parameters: Parameters.GetScreensForField,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of the
   * screens a field is used in.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreensForField<T = Models.PageBeanScreenWithTab>(
    parameters: Parameters.GetScreensForField,
    callback?: never
  ): Promise<T>;
  async getScreensForField<T = Models.PageBeanScreenWithTab>(
    parameters: Parameters.GetScreensForField,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/field/${parameters.fieldId}/screens`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.screens.getScreensForField' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * screens or those specified by one or more screen IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreens<T = Models.PageBeanScreen>(
    parameters: Parameters.GetScreens | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * screens or those specified by one or more screen IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreens<T = Models.PageBeanScreen>(parameters?: Parameters.GetScreens, callback?: never): Promise<T>;
  async getScreens<T = Models.PageBeanScreen>(
    parameters?: Parameters.GetScreens,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/screens',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.screens.getScreens' });
  }

  /**
   * Creates a screen with a default field tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createScreen<T = Models.Screen>(
    parameters: Parameters.CreateScreen | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a screen with a default field tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createScreen<T = Models.Screen>(parameters?: Parameters.CreateScreen, callback?: never): Promise<T>;
  async createScreen<T = Models.Screen>(
    parameters?: Parameters.CreateScreen,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/screens',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.screens.createScreen' });
  }

  /**
   * Adds a field to the default tab of the default screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addFieldToDefaultScreen<T = unknown>(
    parameters: Parameters.AddFieldToDefaultScreen,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Adds a field to the default tab of the default screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addFieldToDefaultScreen<T = unknown>(
    parameters: Parameters.AddFieldToDefaultScreen,
    callback?: never
  ): Promise<T>;
  async addFieldToDefaultScreen<T = unknown>(
    parameters: Parameters.AddFieldToDefaultScreen,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screens/addToDefault/${parameters.fieldId}`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.screens.addFieldToDefaultScreen' });
  }

  /**
   * Updates a screen. Only screens used in classic projects can be updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback: Callback<T>): Promise<void>;
  /**
   * Updates a screen. Only screens used in classic projects can be updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback?: never): Promise<T>;
  async updateScreen<T = Models.Screen>(
    parameters: Parameters.UpdateScreen,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.screens.updateScreen' });
  }

  /**
   * Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft.
   *
   * Only screens used in classic projects can be deleted.
   */
  async deleteScreen<T = void>(parameters: Parameters.DeleteScreen, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft.
   *
   * Only screens used in classic projects can be deleted.
   */
  async deleteScreen<T = void>(parameters: Parameters.DeleteScreen, callback?: never): Promise<T>;
  async deleteScreen<T = void>(parameters: Parameters.DeleteScreen, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.screens.deleteScreen' });
  }

  /**
   * Returns the fields that can be added to a tab on a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAvailableScreenFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAvailableScreenFields,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the fields that can be added to a tab on a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAvailableScreenFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAvailableScreenFields,
    callback?: never
  ): Promise<T>;
  async getAvailableScreenFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAvailableScreenFields,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screens/${parameters.screenId}/availableFields`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.screens.getAvailableScreenFields' });
  }
}
