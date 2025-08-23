import type { Client } from '../client';
import type { Request } from '../request';
import type { GetPrioritySchemesParameters } from './parameters/getPrioritySchemesParameters';
import type { CreatePrioritySchemeParameters } from './parameters/createPrioritySchemeParameters';
import type { SuggestedPrioritiesForMappingsParameters } from './parameters/suggestedPrioritiesForMappingsParameters';
import type { GetAvailablePrioritiesByPrioritySchemeParameters } from './parameters/getAvailablePrioritiesByPrioritySchemeParameters';
import type { DeletePrioritySchemeParameters } from './parameters/deletePrioritySchemeParameters';
import type { UpdatePrioritySchemeParameters } from './parameters/updatePrioritySchemeParameters';
import type { GetPrioritiesByPrioritySchemeParameters } from './parameters/getPrioritiesByPrioritySchemeParameters';
import type { GetProjectsByPrioritySchemeParameters } from './parameters/getProjectsByPrioritySchemeParameters';

export class PrioritySchemes {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priority schemes. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getPrioritySchemes(parameters: GetPrioritySchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/priorityscheme',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        priorityId: parameters.priorityId,
        schemeId: parameters.schemeId,
        schemeName: parameters.schemeName,
        onlyDefault: parameters.onlyDefault,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a new priority scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriorityScheme(parameters: CreatePrioritySchemeParameters) {
    const request: Request = {
      url: '/rest/api/2/priorityscheme',
      method: 'POST',
      body: {
        defaultPriorityId: parameters.defaultPriorityId,
        description: parameters.description,
        mappings: parameters.mappings,
        name: parameters.name,
        priorityIds: parameters.priorityIds,
        projectIds: parameters.projectIds,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities that would require mapping, given a change in priorities or projects associated with a priority scheme.
   * *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async suggestedPrioritiesForMappings(parameters: SuggestedPrioritiesForMappingsParameters) {
    const request: Request = {
      url: '/rest/api/2/priorityscheme/mappings',
      method: 'POST',
      body: {
        maxResults: parameters.maxResults,
        priorities: parameters.priorities,
        projects: parameters.projects,
        schemeId: parameters.schemeId,
        startAt: parameters.startAt,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities available for adding to a priority scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getAvailablePrioritiesByPriorityScheme(parameters: GetAvailablePrioritiesByPrioritySchemeParameters) {
    const request: Request = {
      url: '/rest/api/2/priorityscheme/priorities/available',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        query: parameters.query,
        schemeId: parameters.schemeId,
        exclude: parameters.exclude,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a priority scheme. *
   *
   * - This operation is only available for priority schemes without any associated projects. Any associated projects must
   *   be removed from the priority scheme before this operation can be performed.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePriorityScheme(parameters: DeletePrioritySchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/priorityscheme/${parameters.schemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a priority scheme. This includes its details, the lists of priorities and projects in it *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePriorityScheme(parameters: UpdatePrioritySchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/priorityscheme/${parameters.schemeId}`,
      method: 'PUT',
      body: {
        defaultPriorityId: parameters.defaultPriorityId,
        description: parameters.description,
        mappings: parameters.mappings,
        name: parameters.name,
        priorities: parameters.priorities,
        projects: parameters.projects,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities by scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getPrioritiesByPriorityScheme(parameters: GetPrioritiesByPrioritySchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/priorityscheme/${parameters.schemeId}/priorities`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * projects by scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async getProjectsByPriorityScheme(parameters: GetProjectsByPrioritySchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/priorityscheme/${parameters.schemeId}/projects`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
        query: parameters.query,
      },
    };

    return this.client.sendRequest(request);
  }
}
