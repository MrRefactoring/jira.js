import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class Screens {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of the
   * screens a field is used in.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreensForField<T = Models.PageScreenWithTab>(
    parameters: Parameters.GetScreensForField | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of the
   * screens a field is used in.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreensForField<T = Models.PageScreenWithTab>(
    parameters: Parameters.GetScreensForField | string,
    callback?: never,
  ): Promise<T>;
  async getScreensForField<T = Models.PageScreenWithTab>(
    parameters: Parameters.GetScreensForField | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const fieldId = typeof parameters === 'string' ? parameters : parameters.fieldId;

    const config: RequestConfig = {
      url: `/rest/api/3/field/${fieldId}/screens`,
      method: 'GET',
      params: {
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
        expand: typeof parameters !== 'string' && parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * screens or those specified by one or more screen IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreens<T = Models.PageScreen>(
    parameters: Parameters.GetScreens | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * screens or those specified by one or more screen IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreens<T = Models.PageScreen>(parameters?: Parameters.GetScreens, callback?: never): Promise<T>;
  async getScreens<T = Models.PageScreen>(
    parameters?: Parameters.GetScreens,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/screens',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        queryString: parameters?.queryString,
        scope: parameters?.scope,
        orderBy: parameters?.orderBy,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a screen with a default field tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createScreen<T = Models.Screen>(parameters: Parameters.CreateScreen, callback: Callback<T>): Promise<void>;
  /**
   * Creates a screen with a default field tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createScreen<T = Models.Screen>(parameters: Parameters.CreateScreen, callback?: never): Promise<T>;
  async createScreen<T = Models.Screen>(
    parameters: Parameters.CreateScreen,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/screens',
      method: 'POST',
      data: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a field to the default tab of the default screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addFieldToDefaultScreen<T = unknown>(
    parameters: Parameters.AddFieldToDefaultScreen | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds a field to the default tab of the default screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addFieldToDefaultScreen<T = unknown>(
    parameters: Parameters.AddFieldToDefaultScreen | string,
    callback?: never,
  ): Promise<T>;
  async addFieldToDefaultScreen<T = unknown>(
    parameters: Parameters.AddFieldToDefaultScreen | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const fieldId = typeof parameters === 'string' ? parameters : parameters.fieldId;

    const config: RequestConfig = {
      url: `/rest/api/3/screens/addToDefault/${fieldId}`,
      method: 'POST',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a screen. Only screens used in classic projects can be updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback: Callback<T>): Promise<void>;
  /**
   * Updates a screen. Only screens used in classic projects can be updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback?: never): Promise<T>;
  async updateScreen<T = Models.Screen>(
    parameters: Parameters.UpdateScreen,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/screens/${parameters.screenId}`,
      method: 'PUT',
      data: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft.
   *
   * Only screens used in classic projects can be deleted.
   */
  async deleteScreen<T = void>(parameters: Parameters.DeleteScreen | string, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft.
   *
   * Only screens used in classic projects can be deleted.
   */
  async deleteScreen<T = void>(parameters: Parameters.DeleteScreen | string, callback?: never): Promise<T>;
  async deleteScreen<T = void>(
    parameters: Parameters.DeleteScreen | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const screenId = typeof parameters === 'string' ? parameters : parameters.screenId;

    const config: RequestConfig = {
      url: `/rest/api/3/screens/${screenId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the fields that can be added to a tab on a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAvailableScreenFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAvailableScreenFields | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the fields that can be added to a tab on a screen.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAvailableScreenFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAvailableScreenFields | string,
    callback?: never,
  ): Promise<T>;
  async getAvailableScreenFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAvailableScreenFields | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const screenId = typeof parameters === 'string' ? parameters : parameters.screenId;

    const config: RequestConfig = {
      url: `/rest/api/3/screens/${screenId}/availableFields`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
