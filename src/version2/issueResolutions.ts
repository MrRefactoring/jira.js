import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueResolutions {
  constructor(private client: Client) {}

  /**
   * @deprecated Returns a list of all issue resolution values.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getResolutions<T = Models.Resolution[]>(callback: Callback<T>): Promise<void>;
  /**
   * @deprecated Returns a list of all issue resolution values.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getResolutions<T = Models.Resolution[]>(callback?: never): Promise<T>;
  async getResolutions<T = Models.Resolution[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/resolution',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an issue resolution.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createResolution<T = Models.ResolutionId>(
    parameters: Parameters.CreateResolution,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates an issue resolution.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createResolution<T = Models.ResolutionId>(
    parameters: Parameters.CreateResolution,
    callback?: never
  ): Promise<T>;
  async createResolution<T = Models.ResolutionId>(
    parameters: Parameters.CreateResolution,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/resolution',
      method: 'POST',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets default issue resolution.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultResolution<T = void>(
    parameters: Parameters.SetDefaultResolution,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets default issue resolution.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultResolution<T = void>(parameters: Parameters.SetDefaultResolution, callback?: never): Promise<T>;
  async setDefaultResolution<T = void>(
    parameters: Parameters.SetDefaultResolution,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/resolution/default',
      method: 'PUT',
      data: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Changes the order of issue resolutions.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveResolutions<T = void>(parameters: Parameters.MoveResolutions, callback: Callback<T>): Promise<void>;
  /**
   * Changes the order of issue resolutions.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async moveResolutions<T = void>(parameters: Parameters.MoveResolutions, callback?: never): Promise<T>;
  async moveResolutions<T = void>(parameters: Parameters.MoveResolutions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/resolution/move',
      method: 'PUT',
      data: {
        ids: parameters.ids,
        after: parameters.after,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * resolutions. The list can contain all resolutions or a subset determined by any combination of these criteria:
   *
   * - A list of resolutions IDs.
   * - Whether the field configuration is a default. This returns resolutions from company-managed (classic) projects
   *   only, as there is no concept of default resolutions in team-managed projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async searchResolutions<T = Models.PageResolution>(
    parameters: Parameters.SearchResolutions | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * resolutions. The list can contain all resolutions or a subset determined by any combination of these criteria:
   *
   * - A list of resolutions IDs.
   * - Whether the field configuration is a default. This returns resolutions from company-managed (classic) projects
   *   only, as there is no concept of default resolutions in team-managed projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async searchResolutions<T = Models.PageResolution>(
    parameters?: Parameters.SearchResolutions,
    callback?: never
  ): Promise<T>;
  async searchResolutions<T = Models.PageResolution>(
    parameters?: Parameters.SearchResolutions,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/resolution/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        onlyDefault: parameters?.onlyDefault,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * @deprecated Returns an issue resolution value.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getResolution<T = Models.Resolution>(
    parameters: Parameters.GetResolution | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Returns an issue resolution value.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getResolution<T = Models.Resolution>(
    parameters: Parameters.GetResolution | string,
    callback?: never
  ): Promise<T>;
  async getResolution<T = Models.Resolution>(
    parameters: Parameters.GetResolution | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/resolution/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates an issue resolution.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateResolution<T = void>(parameters: Parameters.UpdateResolution, callback: Callback<T>): Promise<void>;
  /**
   * Updates an issue resolution.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateResolution<T = void>(parameters: Parameters.UpdateResolution, callback?: never): Promise<T>;
  async updateResolution<T = void>(parameters: Parameters.UpdateResolution, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/resolution/${parameters.id}`,
      method: 'PUT',
      data: {
        ...parameters,
        name: parameters.name,
        description: parameters.description,
        id: undefined,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue resolution.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteResolution<T = Models.TaskProgressObject>(
    parameters: Parameters.DeleteResolution,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes an issue resolution.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteResolution<T = Models.TaskProgressObject>(
    parameters: Parameters.DeleteResolution,
    callback?: never
  ): Promise<T>;
  async deleteResolution<T = Models.TaskProgressObject>(
    parameters: Parameters.DeleteResolution,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/resolution/${parameters.id}`,
      method: 'DELETE',
      params: {
        replaceWith: parameters.replaceWith,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
