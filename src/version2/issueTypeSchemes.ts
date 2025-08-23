import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAllIssueTypeSchemesParameters } from './parameters/getAllIssueTypeSchemesParameters';
import type { CreateIssueTypeSchemeParameters } from './parameters/createIssueTypeSchemeParameters';
import type { GetIssueTypeSchemesMappingParameters } from './parameters/getIssueTypeSchemesMappingParameters';
import type { GetIssueTypeSchemeForProjectsParameters } from './parameters/getIssueTypeSchemeForProjectsParameters';
import type { AssignIssueTypeSchemeToProjectParameters } from './parameters/assignIssueTypeSchemeToProjectParameters';
import type { DeleteIssueTypeSchemeParameters } from './parameters/deleteIssueTypeSchemeParameters';
import type { UpdateIssueTypeSchemeParameters } from './parameters/updateIssueTypeSchemeParameters';
import type { AddIssueTypesToIssueTypeSchemeParameters } from './parameters/addIssueTypesToIssueTypeSchemeParameters';
import type { ReorderIssueTypesInIssueTypeSchemeParameters } from './parameters/reorderIssueTypesInIssueTypeSchemeParameters';
import type { RemoveIssueTypeFromIssueTypeSchemeParameters } from './parameters/removeIssueTypeFromIssueTypeSchemeParameters';

export class IssueTypeSchemes {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * type schemes. *
   *
   * - Only issue type schemes used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllIssueTypeSchemes(parameters: GetAllIssueTypeSchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescheme',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
        queryString: parameters.queryString,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates an issue type scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeScheme(parameters: CreateIssueTypeSchemeParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescheme',
      method: 'POST',
      body: {
        defaultIssueTypeId: parameters.defaultIssueTypeId,
        description: parameters.description,
        issueTypeIds: parameters.issueTypeIds,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * type scheme items. *
   *
   * - Only issue type scheme items used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeSchemesMapping(parameters: GetIssueTypeSchemesMappingParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescheme/mapping',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        issueTypeSchemeId: parameters.issueTypeSchemeId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * type schemes and, for each issue type scheme, a list of the projects that use it. *
   *
   * - Only issue type schemes used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeSchemeForProjects(parameters: GetIssueTypeSchemeForProjectsParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescheme/project',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Assigns an issue type scheme to a project. *
   *
   * - If any issues in the project are assigned issue types not present in the new scheme, the operation will fail. To
   *   complete the assignment those issues must be updated to use issue types in the new scheme.
   * -
   * - Issue type schemes can only be assigned to classic projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignIssueTypeSchemeToProject(parameters: AssignIssueTypeSchemeToProjectParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescheme/project',
      method: 'PUT',
      body: {
        issueTypeSchemeId: parameters.issueTypeSchemeId,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue type scheme. *
   *
   * - Only issue type schemes used in classic projects can be deleted.
   * -
   * - Any projects assigned to the scheme are reassigned to the default issue type scheme.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeScheme(parameters: DeleteIssueTypeSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates an issue type scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueTypeScheme(parameters: UpdateIssueTypeSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'PUT',
      body: {
        defaultIssueTypeId: parameters.defaultIssueTypeId,
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds issue types to an issue type scheme. *
   *
   * - The added issue types are appended to the issue types list.
   * -
   * - If any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addIssueTypesToIssueTypeScheme(parameters: AddIssueTypesToIssueTypeSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype`,
      method: 'PUT',
      body: {
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Changes the order of issue types in an issue type scheme. *
   *
   * - The request body parameters must meet the following requirements:
   * -
   * - - All of the issue types must belong to the issue type scheme.
   * - - Either `after` or `position` must be provided.
   * - - The issue type in `after` must not be in the issue type list.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async reorderIssueTypesInIssueTypeScheme(parameters: ReorderIssueTypesInIssueTypeSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/move`,
      method: 'PUT',
      body: {
        after: parameters.after,
        issueTypeIds: parameters.issueTypeIds,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes an issue type from an issue type scheme. *
   *
   * - This operation cannot remove:
   * -
   * - - Any issue type used by issues.
   * - - Any issue types from the default issue type scheme.
   * - - The last standard issue type from an issue type scheme.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeIssueTypeFromIssueTypeScheme(parameters: RemoveIssueTypeFromIssueTypeSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/${parameters.issueTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }
}
