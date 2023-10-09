import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { paramSerializer } from '../paramSerializer';
import { RequestConfig } from '../requestConfig';

export class IssuePriorities {
  constructor(private client: Client) {}

  /**
   * Returns the list of all issue priorities.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPriorities<T = Models.Priority[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns the list of all issue priorities.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPriorities<T = Models.Priority[]>(callback?: never): Promise<T>;
  async getPriorities<T = Models.Priority[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/priority',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriority<T = Models.PriorityId>(
    parameters: Parameters.CreatePriority,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriority<T = Models.PriorityId>(parameters: Parameters.CreatePriority, callback?: never): Promise<T>;
  async createPriority<T = Models.PriorityId>(
    parameters: Parameters.CreatePriority,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/priority',
      method: 'POST',
      data: {
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultPriority<T = void>(
    parameters: Parameters.SetDefaultPriority | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets default issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultPriority<T = void>(parameters?: Parameters.SetDefaultPriority, callback?: never): Promise<T>;
  async setDefaultPriority<T = void>(
    parameters?: Parameters.SetDefaultPriority,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/priority/default',
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async movePriorities<T = void>(parameters: Parameters.MovePriorities, callback: Callback<T>): Promise<void>;
  /**
   * Changes the order of issue priorities.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async movePriorities<T = void>(parameters: Parameters.MovePriorities, callback?: never): Promise<T>;
  async movePriorities<T = void>(parameters: Parameters.MovePriorities, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/priority/move',
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
   * priorities. The list can contain all priorities or a subset determined by any combination of these criteria:
   *
   * - A list of priority IDs. Any invalid priority IDs are ignored.
   * - A list of project IDs. Only priorities that are available in these projects will be returned. Any invalid project
   *   IDs are ignored.
   * - Whether the field configuration is a default. This returns priorities from company-managed (classic) projects only,
   *   as there is no concept of default priorities in team-managed projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async searchPriorities<T = Models.PagePriority>(
    parameters: Parameters.SearchPriorities | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities. The list can contain all priorities or a subset determined by any combination of these criteria:
   *
   * - A list of priority IDs. Any invalid priority IDs are ignored.
   * - A list of project IDs. Only priorities that are available in these projects will be returned. Any invalid project
   *   IDs are ignored.
   * - Whether the field configuration is a default. This returns priorities from company-managed (classic) projects only,
   *   as there is no concept of default priorities in team-managed projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
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
      url: '/rest/api/2/priority/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        projectId: paramSerializer('projectId', parameters?.projectId),
        onlyDefault: parameters?.onlyDefault,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPriority<T = Models.Priority>(
    parameters: Parameters.GetPriority | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority | string, callback?: never): Promise<T>;
  async getPriority<T = Models.Priority>(
    parameters: Parameters.GetPriority | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/priority/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePriority<T = void>(parameters: Parameters.UpdatePriority, callback: Callback<T>): Promise<void>;
  /**
   * Updates an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePriority<T = void>(parameters: Parameters.UpdatePriority, callback?: never): Promise<T>;
  async updatePriority<T = void>(parameters: Parameters.UpdatePriority, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/priority/${parameters.id}`,
      method: 'PUT',
      data: {
        description: parameters.description,
        iconUrl: parameters.iconUrl,
        name: parameters.name,
        statusColor: parameters.statusColor,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
