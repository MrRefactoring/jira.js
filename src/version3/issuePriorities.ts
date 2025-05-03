import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import { paramSerializer } from '../paramSerializer';
import type { RequestConfig } from '../requestConfig';

export class IssuePriorities {
  constructor(private client: Client) {}

  /**
   * Returns the list of all issue priorities.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPriorities<T = Models.Priority[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the list of all issue priorities.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPriorities<T = Models.Priority[]>(callback?: never): Promise<T>;
  async getPriorities<T = Models.Priority[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/priority',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an issue priority.
   *
   * Deprecation applies to iconUrl param in request body which will be sunset on 16th Mar 2025. For more details refer
   * to [changelog](https://developer.atlassian.com/changelog/#CHANGE-1525).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriority<T = Models.PriorityId>(
    parameters: Parameters.CreatePriority,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates an issue priority.
   *
   * Deprecation applies to iconUrl param in request body which will be sunset on 16th Mar 2025. For more details refer
   * to [changelog](https://developer.atlassian.com/changelog/#CHANGE-1525).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriority<T = Models.PriorityId>(parameters: Parameters.CreatePriority, callback?: never): Promise<T>;
  async createPriority<T = Models.PriorityId>(
    parameters: Parameters.CreatePriority,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/priority',
      method: 'POST',
      data: {
        avatarId: parameters.avatarId,
        description: parameters.description,
        iconUrl: parameters.iconUrl,
        name: parameters.name,
        statusColor: parameters.statusColor,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets default issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultPriority<T = void>(
    parameters: Parameters.SetDefaultPriority | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets default issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultPriority<T = void>(parameters?: Parameters.SetDefaultPriority, callback?: never): Promise<T>;
  async setDefaultPriority<T = void>(
    parameters?: Parameters.SetDefaultPriority,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/priority/default',
      method: 'PUT',
      data: {
        id: parameters?.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Changes the order of issue priorities.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async movePriorities<T = void>(parameters: Parameters.MovePriorities, callback: Callback<T>): Promise<void>;
  /**
   * Changes the order of issue priorities.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async movePriorities<T = void>(parameters: Parameters.MovePriorities, callback?: never): Promise<T>;
  async movePriorities<T = void>(parameters: Parameters.MovePriorities, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/priority/move',
      method: 'PUT',
      data: {
        after: parameters.after,
        ids: parameters.ids,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * priorities. The list can contain all priorities or a subset determined by any combination of these criteria:
   *
   * - A list of priority IDs. Any invalid priority IDs are ignored.
   * - A list of project IDs. Only priorities that are available in these projects will be returned. Any invalid project
   *   IDs are ignored.
   * - Whether the field configuration is a default. This returns priorities from company-managed (classic) projects only,
   *   as there is no concept of default priorities in team-managed projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async searchPriorities<T = Models.PagePriority>(
    parameters: Parameters.SearchPriorities | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * priorities. The list can contain all priorities or a subset determined by any combination of these criteria:
   *
   * - A list of priority IDs. Any invalid priority IDs are ignored.
   * - A list of project IDs. Only priorities that are available in these projects will be returned. Any invalid project
   *   IDs are ignored.
   * - Whether the field configuration is a default. This returns priorities from company-managed (classic) projects only,
   *   as there is no concept of default priorities in team-managed projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async searchPriorities<T = Models.PagePriority>(
    parameters?: Parameters.SearchPriorities,
    callback?: never,
  ): Promise<T>;
  async searchPriorities<T = Models.PagePriority>(
    parameters?: Parameters.SearchPriorities,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/priority/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        projectId: paramSerializer('projectId', parameters?.projectId),
        priorityName: parameters?.priorityName,
        onlyDefault: parameters?.onlyDefault,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority, callback: Callback<T>): Promise<void>;
  /**
   * Returns an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority, callback?: never): Promise<T>;
  async getPriority<T = Models.Priority>(
    parameters: Parameters.GetPriority,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/priority/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates an issue priority.
   *
   * At least one request body parameter must be defined.
   *
   * Deprecation applies to iconUrl param in request body which will be sunset on 16th Mar 2025. For more details refer
   * to [changelog](https://developer.atlassian.com/changelog/#CHANGE-1525).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePriority<T = void>(parameters: Parameters.UpdatePriority, callback: Callback<T>): Promise<void>;
  /**
   * Updates an issue priority.
   *
   * At least one request body parameter must be defined.
   *
   * Deprecation applies to iconUrl param in request body which will be sunset on 16th Mar 2025. For more details refer
   * to [changelog](https://developer.atlassian.com/changelog/#CHANGE-1525).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePriority<T = void>(parameters: Parameters.UpdatePriority, callback?: never): Promise<T>;
  async updatePriority<T = void>(parameters: Parameters.UpdatePriority, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/priority/${parameters.id}`,
      method: 'PUT',
      data: {
        avatarId: parameters.avatarId,
        description: parameters.description,
        iconUrl: parameters.iconUrl,
        name: parameters.name,
        statusColor: parameters.statusColor,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue priority.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePriority<T = unknown>(parameters: Parameters.DeletePriority, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an issue priority.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-3-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePriority<T = unknown>(parameters: Parameters.DeletePriority, callback?: never): Promise<T>;
  async deletePriority<T = unknown>(parameters: Parameters.DeletePriority, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/priority/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
