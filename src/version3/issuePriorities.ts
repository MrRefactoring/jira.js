import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriority<T = Models.PriorityId>(
    parameters: Parameters.CreatePriority | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates an issue priority.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriority<T = Models.PriorityId>(parameters?: Parameters.CreatePriority, callback?: never): Promise<T>;
  async createPriority<T = Models.PriorityId>(
    parameters?: Parameters.CreatePriority,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/priority',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        iconUrl: parameters?.iconUrl,
        statusColor: parameters?.statusColor,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * priorities. The list can contain all priorities or a subset determined by any combination of these criteria:
   *
   * - A list of priority IDs. Any invalid priority IDs are ignored.
   * - Whether the field configuration is a default. This returns priorities from company-managed (classic) projects only,
   *   as there is no concept of default priorities in team-managed projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async searchPriorities<T = Models.PagePriority>(
    parameters: Parameters.SearchPriorities | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * priorities. The list can contain all priorities or a subset determined by any combination of these criteria:
   *
   * - A list of priority IDs. Any invalid priority IDs are ignored.
   * - Whether the field configuration is a default. This returns priorities from company-managed (classic) projects only,
   *   as there is no concept of default priorities in team-managed projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async searchPriorities<T = Models.PagePriority>(
    parameters?: Parameters.SearchPriorities,
    callback?: never
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
        onlyDefault: parameters?.onlyDefault,
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePriority<T = void>(parameters: Parameters.UpdatePriority, callback: Callback<T>): Promise<void>;
  /**
   * Updates an issue priority.
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
        name: parameters.name,
        description: parameters.description,
        iconUrl: parameters.iconUrl,
        statusColor: parameters.statusColor,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
