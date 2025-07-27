import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { Request } from '../request';

export class ScreenTabFields {
  constructor(private client: Client) {}

  /**
   * Returns all fields for a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
   *   specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen
   *   Scheme.
   */
  async getAllScreenTabFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAllScreenTabFields,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all fields for a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - _Administer projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) when the project key is
   *   specified, providing that the screen is associated with the project through a Screen Scheme and Issue Type Screen
   *   Scheme.
   */
  async getAllScreenTabFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAllScreenTabFields,
    callback?: never,
  ): Promise<T>;
  async getAllScreenTabFields<T = Models.ScreenableField[]>(
    parameters: Parameters.GetAllScreenTabFields,
  ): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
      method: 'GET',
      query: {
        projectKey: parameters.projectKey,
      },
    };

    return this.client.sendRequest(config);
  }

  /**
   * Adds a field to a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addScreenTabField<T = Models.ScreenableField>(
    parameters: Parameters.AddScreenTabField,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds a field to a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addScreenTabField<T = Models.ScreenableField>(
    parameters: Parameters.AddScreenTabField,
    callback?: never,
  ): Promise<T>;
  async addScreenTabField<T = Models.ScreenableField>(parameters: Parameters.AddScreenTabField): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields`,
      method: 'POST',
      body: {
        fieldId: parameters.fieldId,
      },
    };

    return this.client.sendRequest(config);
  }

  /**
   * Removes a field from a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeScreenTabField<T = void>(
    parameters: Parameters.RemoveScreenTabField,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes a field from a screen tab.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeScreenTabField<T = void>(parameters: Parameters.RemoveScreenTabField, callback?: never): Promise<T>;
  async removeScreenTabField<T = void>(parameters: Parameters.RemoveScreenTabField): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config);
  }

  /**
   * Moves a screen tab field.
   *
   * If `after` and `position` are provided in the request, `position` is ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveScreenTabField<T = void>(parameters: Parameters.MoveScreenTabField, callback: Callback<T>): Promise<void>;
  /**
   * Moves a screen tab field.
   *
   * If `after` and `position` are provided in the request, `position` is ignored.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveScreenTabField<T = void>(parameters: Parameters.MoveScreenTabField, callback?: never): Promise<T>;
  async moveScreenTabField<T = void>(parameters: Parameters.MoveScreenTabField): Promise<void | T> {
    const config: Request = {
      url: `/rest/api/3/screens/${parameters.screenId}/tabs/${parameters.tabId}/fields/${parameters.id}/move`,
      method: 'POST',
      body: {
        after: parameters.after,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(config);
  }
}
