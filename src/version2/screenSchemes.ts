import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ScreenSchemes {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](#pagination) list of screen schemes.
     *
     * Only screen schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of screen schemes.
     *
     * Only screen schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: undefined): Promise<T>;
  async getScreenSchemes<T = Models.PageBeanScreenScheme>(parameters?: Parameters.GetScreenSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/screenscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getScreenSchemes' });
  }
  /**
     * Creates a screen scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createScreenScheme<T = Models.ScreenSchemeId>(parameters?: Parameters.CreateScreenScheme, callback?: Callback<T>): Promise<void>;
  /**
     * Creates a screen scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createScreenScheme<T = Models.ScreenSchemeId>(parameters?: Parameters.CreateScreenScheme, callback?: undefined): Promise<T>;
  async createScreenScheme<T = Models.ScreenSchemeId>(parameters?: Parameters.CreateScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/screenscheme',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        screens: parameters?.screens,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'createScreenScheme' });
  }
  /**
     * Updates a screen scheme. Only screen schemes used in classic projects can be updated.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateScreenScheme<T = void>(parameters: Parameters.UpdateScreenScheme, callback: Callback<T>): Promise<void>;
  /**
     * Updates a screen scheme. Only screen schemes used in classic projects can be updated.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateScreenScheme<T = void>(parameters: Parameters.UpdateScreenScheme, callback?: undefined): Promise<T>;
  async updateScreenScheme<T = void>(parameters: Parameters.UpdateScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        screens: parameters.screens,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'updateScreenScheme' });
  }
  /**
     * Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.
     *
     * Only screens schemes used in classic projects can be deleted.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteScreenScheme<T = void>(parameters: Parameters.DeleteScreenScheme, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a screen scheme. A screen scheme cannot be deleted if it is used in an issue type screen scheme.
     *
     * Only screens schemes used in classic projects can be deleted.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteScreenScheme<T = void>(parameters: Parameters.DeleteScreenScheme, callback?: undefined): Promise<T>;
  async deleteScreenScheme<T = void>(parameters: Parameters.DeleteScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/screenscheme/${parameters.screenSchemeId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'deleteScreenScheme' });
  }
}
