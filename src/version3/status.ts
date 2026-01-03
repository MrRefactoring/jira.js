import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';
import type { Page } from '../schemas';
import { PageSchema } from '../schemas';
import { JiraStatusSchema } from './models';
import { paramSerializer } from '../paramSerializer';

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
    parameters: Parameters.GetStatusesById | string,
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
  async getStatusesById<T = Models.JiraStatus[]>(
    parameters: Parameters.GetStatusesById | string,
    callback?: never,
  ): Promise<T>;
  async getStatusesById<T = Models.JiraStatus[]>(
    parameters: Parameters.GetStatusesById | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: '/rest/api/3/statuses',
      method: 'GET',
      params: {
        id,
        expand: typeof parameters !== 'string' ? parameters.expand : undefined,
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
    parameters: Parameters.CreateStatuses,
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
  async createStatuses<T = Models.JiraStatus[]>(parameters: Parameters.CreateStatuses, callback?: never): Promise<T>;
  async createStatuses<T = Models.JiraStatus[]>(
    parameters: Parameters.CreateStatuses,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/statuses',
      method: 'POST',
      data: {
        scope: parameters.scope,
        statuses: parameters.statuses,
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
  async updateStatuses<T = void>(parameters: Parameters.UpdateStatuses, callback: Callback<T>): Promise<void>;
  /**
   * Updates statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateStatuses<T = void>(parameters: Parameters.UpdateStatuses, callback?: never): Promise<T>;
  async updateStatuses<T = void>(parameters: Parameters.UpdateStatuses, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/statuses',
      method: 'PUT',
      data: {
        statuses: parameters.statuses,
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
  async deleteStatusesById<T = void>(
    parameters: Parameters.DeleteStatusesById | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes statuses by ID.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async deleteStatusesById<T = void>(parameters: Parameters.DeleteStatusesById | string, callback?: never): Promise<T>;
  async deleteStatusesById<T = void>(
    parameters: Parameters.DeleteStatusesById | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: '/rest/api/3/statuses',
      method: 'DELETE',
      params: {
        id,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of the statuses specified by one or more status names.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Browse projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async getStatusesByName<T = Models.JiraStatus[]>(
    parameters: Parameters.GetStatusesByName,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a list of the statuses specified by one or more status names.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   *
   * - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - _Browse projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async getStatusesByName<T = Models.JiraStatus[]>(
    parameters: Parameters.GetStatusesByName,
    callback?: never,
  ): Promise<T>;
  async getStatusesByName<T = Models.JiraStatus[]>(
    parameters: Parameters.GetStatusesByName,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/statuses/byNames',
      method: 'GET',
      params: {
        name: paramSerializer('name', parameters.name),
        projectId: parameters.projectId,
      },
    };

    const statuses = await this.client.sendRequest(config, callback);

    return JiraStatusSchema.array().parse(statuses) as T;
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
  async search<T = Page<typeof JiraStatusSchema>>(
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
  async search<T = Page<typeof JiraStatusSchema>>(parameters?: Parameters.Search, callback?: never): Promise<T>;
  async search<T = Page<typeof JiraStatusSchema>>(parameters?: Parameters.Search, callback?: Callback<T>): Promise<T> {
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

    const statuses = await this.client.sendRequest(config, callback);

    return PageSchema(JiraStatusSchema).parse(statuses) as T;
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
