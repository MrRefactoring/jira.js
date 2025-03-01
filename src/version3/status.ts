import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Status {
  constructor(private client: Client) {}
  /**
   * Returns a list of the statuses specified by one or more status IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async getStatusesById<T = Models.JiraStatus[]>(
    parameters: Parameters.GetStatusesById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of the statuses specified by one or more status IDs.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async getStatusesById<T = Models.JiraStatus[]>(parameters: Parameters.GetStatusesById, callback?: never): Promise<T>;
  async getStatusesById<T = Models.JiraStatus[]>(
    parameters: Parameters.GetStatusesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/statuses',
      method: 'GET',
      params: {
        expand: parameters.expand,
        id: parameters.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Creates statuses for a global or project scope.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async createStatuses<T = Models.JiraStatus[]>(
    parameters: Parameters.CreateStatuses | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates statuses for a global or project scope.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
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
      url: '/rest/api/3/statuses',
      method: 'POST',
      data: {
        scope: parameters?.scope,
        statuses: parameters?.statuses,
      },
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Updates statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateStatuses<T = void>(
    parameters: Parameters.UpdateStatuses | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateStatuses<T = void>(parameters?: Parameters.UpdateStatuses, callback?: never): Promise<T>;
  async updateStatuses<T = void>(parameters?: Parameters.UpdateStatuses, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/statuses',
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
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async deleteStatusesById<T = void>(parameters: Parameters.DeleteStatusesById, callback: Callback<T>): Promise<void>;
  /**
   * Deletes statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async deleteStatusesById<T = void>(parameters: Parameters.DeleteStatusesById, callback?: never): Promise<T>;
  async deleteStatusesById<T = void>(
    parameters: Parameters.DeleteStatusesById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/statuses',
      method: 'DELETE',
      params: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(config, callback);
  }
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * statuses that match a search on name or project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async search<T = Models.PageOfStatuses>(
    parameters: Parameters.Search | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * statuses that match a search on name or project.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async search<T = Models.PageOfStatuses>(parameters?: Parameters.Search, callback?: never): Promise<T>;
  async search<T = Models.PageOfStatuses>(parameters?: Parameters.Search, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/statuses/search',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        projectId: parameters?.projectId,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        searchString: parameters?.searchString,
        statusCategory: parameters?.statusCategory,
      },
    };

    return this.client.sendRequest(config, callback);
  }
  /** Returns a page of issue types in a project using a given status. */
  async getProjectIssueTypeUsagesForStatus<T = Models.StatusProjectIssueTypeUsage>(
    parameters: Parameters.GetProjectIssueTypeUsagesForStatus,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns a page of issue types in a project using a given status. */
  async getProjectIssueTypeUsagesForStatus<T = Models.StatusProjectIssueTypeUsage>(
    parameters: Parameters.GetProjectIssueTypeUsagesForStatus,
    callback?: never,
  ): Promise<T>;
  async getProjectIssueTypeUsagesForStatus<T = Models.StatusProjectIssueTypeUsage>(
    parameters: Parameters.GetProjectIssueTypeUsagesForStatus,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/statuses/${parameters.statusId}/project/${parameters.projectId}/issueTypeUsages`,
      method: 'GET',
      params: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a page of projects using a given status. */
  async getProjectUsagesForStatus<T = Models.StatusProjectUsage>(
    parameters: Parameters.GetProjectUsagesForStatus,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns a page of projects using a given status. */
  async getProjectUsagesForStatus<T = Models.StatusProjectUsage>(
    parameters: Parameters.GetProjectUsagesForStatus,
    callback?: never,
  ): Promise<T>;
  async getProjectUsagesForStatus<T = Models.StatusProjectUsage>(
    parameters: Parameters.GetProjectUsagesForStatus,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/statuses/${parameters.statusId}/projectUsages`,
      method: 'GET',
      params: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns a page of workflows using a given status. */
  async getWorkflowUsagesForStatus<T = Models.StatusWorkflowUsage>(
    parameters: Parameters.GetWorkflowUsagesForStatus,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns a page of workflows using a given status. */
  async getWorkflowUsagesForStatus<T = Models.StatusWorkflowUsage>(
    parameters: Parameters.GetWorkflowUsagesForStatus,
    callback?: never,
  ): Promise<T>;
  async getWorkflowUsagesForStatus<T = Models.StatusWorkflowUsage>(
    parameters: Parameters.GetWorkflowUsagesForStatus,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/statuses/${parameters.statusId}/workflowUsages`,
      method: 'GET',
      params: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
