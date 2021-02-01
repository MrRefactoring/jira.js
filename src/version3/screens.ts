import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Screens {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](#pagination) list of the screens a field is used in.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getScreensForField<T = Models.PageBeanScreen>(parameters: Parameters.GetScreensForField, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of the screens a field is used in.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getScreensForField<T = Models.PageBeanScreen>(parameters: Parameters.GetScreensForField, callback?: undefined): Promise<T>;
  async getScreensForField<T = Models.PageBeanScreen>(parameters: Parameters.GetScreensForField, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/field/${parameters.fieldId}/screens`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getScreensForField' });
  }
  /**
     * Returns a [paginated](#pagination) list of all screens or those specified by one or more screen IDs.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getScreens<T = Models.PageBeanScreen>(parameters?: Parameters.GetScreens, callback?: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of all screens or those specified by one or more screen IDs.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getScreens<T = Models.PageBeanScreen>(parameters?: Parameters.GetScreens, callback?: undefined): Promise<T>;
  async getScreens<T = Models.PageBeanScreen>(parameters?: Parameters.GetScreens, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/screens',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getScreens' });
  }
  /**
     * Creates a screen with a default field tab.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createScreen<T = Models.Screen>(parameters?: Parameters.CreateScreen, callback?: Callback<T>): Promise<void>;
  /**
     * Creates a screen with a default field tab.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createScreen<T = Models.Screen>(parameters?: Parameters.CreateScreen, callback?: undefined): Promise<T>;
  async createScreen<T = Models.Screen>(parameters?: Parameters.CreateScreen, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/screens',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'createScreen' });
  }
  /**
     * Adds a field to the default tab of the default screen.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addFieldToDefaultScreen<T = any>(parameters: Parameters.AddFieldToDefaultScreen, callback: Callback<T>): Promise<void>;
  /**
     * Adds a field to the default tab of the default screen.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addFieldToDefaultScreen<T = any>(parameters: Parameters.AddFieldToDefaultScreen, callback?: undefined): Promise<T>;
  async addFieldToDefaultScreen<T = any>(parameters: Parameters.AddFieldToDefaultScreen, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/addToDefault/${parameters.fieldId}`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'addFieldToDefaultScreen' });
  }
  /**
     * Updates a screen. Only screens used in classic projects can be updated.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback: Callback<T>): Promise<void>;
  /**
     * Updates a screen. Only screens used in classic projects can be updated.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback?: undefined): Promise<T>;
  async updateScreen<T = Models.Screen>(parameters: Parameters.UpdateScreen, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/${parameters.screenId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'updateScreen' });
  }
  /**
     * Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft.
     *
     * Only screens used in classic projects can be deleted. */
  async deleteScreen<T = void>(parameters: Parameters.DeleteScreen, callback: Callback<T>): Promise<void>;
  /**
     * Deletes a screen. A screen cannot be deleted if it is used in a screen scheme, workflow, or workflow draft.
     *
     * Only screens used in classic projects can be deleted. */
  async deleteScreen<T = void>(parameters: Parameters.DeleteScreen, callback?: undefined): Promise<T>;
  async deleteScreen<T = void>(parameters: Parameters.DeleteScreen, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/${parameters.screenId}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'deleteScreen' });
  }
  /**
     * Returns the fields that can be added to a tab on a screen.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAvailableScreenFields<T = any>(parameters: Parameters.GetAvailableScreenFields, callback: Callback<T>): Promise<void>;
  /**
     * Returns the fields that can be added to a tab on a screen.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAvailableScreenFields<T = any>(parameters: Parameters.GetAvailableScreenFields, callback?: undefined): Promise<T>;
  async getAvailableScreenFields<T = any>(parameters: Parameters.GetAvailableScreenFields, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/screens/${parameters.screenId}/availableFields`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getAvailableScreenFields' });
  }
}
