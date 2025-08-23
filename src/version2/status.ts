import type { Client } from '../client';
import type { Request } from '../request';
import type { DeleteStatusesByIdParameters } from './parameters/deleteStatusesByIdParameters';
import type { GetStatusesByIdParameters } from './parameters/getStatusesByIdParameters';
import type { CreateStatusesParameters } from './parameters/createStatusesParameters';
import type { UpdateStatusesParameters } from './parameters/updateStatusesParameters';
import type { SearchParameters } from './parameters/searchParameters';
import type { GetProjectIssueTypeUsagesForStatusParameters } from './parameters/getProjectIssueTypeUsagesForStatusParameters';
import type { GetProjectUsagesForStatusParameters } from './parameters/getProjectUsagesForStatusParameters';
import type { GetWorkflowUsagesForStatusParameters } from './parameters/getWorkflowUsagesForStatusParameters';

export class Status {
  constructor(private client: Client) {}
  /**
   * Deletes statuses by ID. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async deleteStatusesById(parameters: DeleteStatusesByIdParameters) {
    const request: Request = {
      url: '/rest/api/2/statuses',
      method: 'DELETE',
      query: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of the statuses specified by one or more status IDs. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async getStatusesById(parameters: GetStatusesByIdParameters) {
    const request: Request = {
      url: '/rest/api/2/statuses',
      method: 'GET',
      query: {
        id: parameters.id,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates statuses for a global or project scope. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async createStatuses(parameters: CreateStatusesParameters) {
    const request: Request = {
      url: '/rest/api/2/statuses',
      method: 'POST',
      body: {
        scope: parameters.scope,
        statuses: parameters.statuses,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates statuses by ID. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async updateStatuses(parameters: UpdateStatusesParameters) {
    const request: Request = {
      url: '/rest/api/2/statuses',
      method: 'PUT',
      body: {
        statuses: parameters.statuses,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * statuses that match a search on name or project. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer projects_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   * - - _Administer Jira_ [project permission.](https://confluence.atlassian.com/x/yodKLg)
   */
  async search(parameters: SearchParameters) {
    const request: Request = {
      url: '/rest/api/2/statuses/search',
      method: 'GET',
      query: {
        projectId: parameters.projectId,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        searchString: parameters.searchString,
        statusCategory: parameters.statusCategory,
      },
    };

    return this.client.sendRequest(request);
  }

  /** Returns a page of issue types in a project using a given status. */
  async getProjectIssueTypeUsagesForStatus(parameters: GetProjectIssueTypeUsagesForStatusParameters) {
    const request: Request = {
      url: `/rest/api/2/statuses/${parameters.statusId}/project/${parameters.projectId}/issueTypeUsages`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /** Returns a page of projects using a given status. */
  async getProjectUsagesForStatus(parameters: GetProjectUsagesForStatusParameters) {
    const request: Request = {
      url: `/rest/api/2/statuses/${parameters.statusId}/projectUsages`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /** Returns a page of workflows using a given status. */
  async getWorkflowUsagesForStatus(parameters: GetWorkflowUsagesForStatusParameters) {
    const request: Request = {
      url: `/rest/api/2/statuses/${parameters.statusId}/workflowUsages`,
      method: 'GET',
      query: {
        nextPageToken: parameters.nextPageToken,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }
}
