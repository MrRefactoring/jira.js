import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Status {
  constructor(private client: Client) {}

  /**
   * Returns a list of the statuses specified by one or more status IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Browse projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - If set up, _View (read-only) workflow_ [project permission](https://confluence.atlassian.com/x/yodKLg) for any
   *   workflows the statuses are used on.
   */
  async getStatusesById<T = Models.JiraStatus[]>(
    parameters: Parameters.GetStatusesById | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of the statuses specified by one or more status IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Browse projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - If set up, _View (read-only) workflow_ [project permission](https://confluence.atlassian.com/x/yodKLg) for any
   *   workflows the statuses are used on.
   */
  async getStatusesById<T = Models.JiraStatus[]>(parameters?: Parameters.GetStatusesById, callback?: never): Promise<T>;
  async getStatusesById<T = Models.JiraStatus[]>(
    parameters?: Parameters.GetStatusesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/statuses',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        id: parameters?.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates statuses for a global or project scope.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async createStatuses<T = Models.JiraStatus[]>(
    parameters: Parameters.CreateStatuses | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates statuses for a global or project scope.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async createStatuses<T = Models.JiraStatus[]>(parameters?: Parameters.CreateStatuses, callback?: never): Promise<T>;
  async createStatuses<T = Models.JiraStatus[]>(
    parameters?: Parameters.CreateStatuses,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/statuses',
      method: 'POST',
      data: {
        statuses: parameters?.statuses,
        scope: parameters?.scope,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateStatuses<T = void>(
    parameters: Parameters.UpdateStatuses | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateStatuses<T = void>(parameters?: Parameters.UpdateStatuses, callback?: never): Promise<T>;
  async updateStatuses<T = void>(parameters?: Parameters.UpdateStatuses, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/statuses',
      method: 'PUT',
      data: {
        statuses: parameters?.statuses,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async deleteStatusesById<T = void>(
    parameters: Parameters.DeleteStatusesById | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async deleteStatusesById<T = void>(parameters?: Parameters.DeleteStatusesById, callback?: never): Promise<T>;
  async deleteStatusesById<T = void>(
    parameters?: Parameters.DeleteStatusesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/statuses',
      method: 'DELETE',
      params: {
        id: parameters?.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * statuses that match a search on name or project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Browse projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - If set up, _View (read-only) workflow_ [project permission](https://confluence.atlassian.com/x/yodKLg) for any
   *   workflows the statuses are used on.
   */
  async search<T = Models.PageOfStatuses>(
    parameters: Parameters.Search | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * statuses that match a search on name or project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Browse projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - If set up, _View (read-only) workflow_ [project permission](https://confluence.atlassian.com/x/yodKLg) for any
   *   workflows the statuses are used on.
   */
  async search<T = Models.PageOfStatuses>(parameters?: Parameters.Search, callback?: never): Promise<T>;
  async search<T = Models.PageOfStatuses>(parameters?: Parameters.Search, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/statuses/search',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        projectId: parameters?.projectId,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        searchString: parameters?.searchString,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
