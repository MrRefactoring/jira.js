import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class ScreenSchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of screen
   * schemes.
   *
   * Only screen schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreenSchemes<T = Models.PageScreenScheme>(
    parameters: Parameters.GetScreenSchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of screen
   * schemes.
   *
   * Only screen schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getScreenSchemes<T = Models.PageScreenScheme>(
    parameters?: Parameters.GetScreenSchemes,
    callback?: never,
  ): Promise<T>;
  async getScreenSchemes<T = Models.PageScreenScheme>(
    parameters?: Parameters.GetScreenSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/screenscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        expand: parameters?.expand,
        queryString: parameters?.queryString,
        orderBy: parameters?.orderBy,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createScreenScheme<T = Models.ScreenSchemeId>(
    parameters: Parameters.CreateScreenScheme | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createScreenScheme<T = Models.ScreenSchemeId>(
    parameters: Parameters.CreateScreenScheme | string,
    callback?: never,
  ): Promise<T>;
  async createScreenScheme<T = Models.ScreenSchemeId>(
    parameters: Parameters.CreateScreenScheme | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const name = typeof parameters === 'string' ? parameters : parameters.name;

    const config: RequestConfig = {
      url: '/rest/api/2/screenscheme',
      method: 'POST',
      data: {
        name,
        description: typeof parameters !== 'string' && parameters.description,
        screens: typeof parameters !== 'string' && parameters.screens,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a screen scheme. Only screen schemes used in classic projects can be updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateScreenScheme<T = void>(parameters: Parameters.UpdateScreenScheme, callback: Callback<T>): Promise<void>;
  /**
   * Updates a screen scheme. Only screen schemes used in classic projects can be updated.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateScreenScheme<T = void>(parameters: Parameters.UpdateScreenScheme, callback?: never): Promise<T>;
  async updateScreenScheme<T = void>(
    parameters: Parameters.UpdateScreenScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        screens: parameters.screens,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.
   *
   * Only screens schemes used in classic projects can be deleted.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteScreenScheme<T = void>(
    parameters: Parameters.DeleteScreenScheme | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.
   *
   * Only screens schemes used in classic projects can be deleted.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteScreenScheme<T = void>(parameters: Parameters.DeleteScreenScheme | string, callback?: never): Promise<T>;
  async deleteScreenScheme<T = void>(
    parameters: Parameters.DeleteScreenScheme | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const screenSchemeId = typeof parameters === 'string' ? parameters : parameters.screenSchemeId;

    const config: RequestConfig = {
      url: `/rest/api/2/screenscheme/${screenSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
