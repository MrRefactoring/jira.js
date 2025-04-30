import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';
import { paramSerializer } from '../paramSerializer';
import type { Paginated } from '../paginated';

export class PrioritySchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priority schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPrioritySchemes<T = Paginated<Models.PrioritySchemeWithPaginatedPrioritiesAndProjects>>(
    parameters: Parameters.GetPrioritySchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priority schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPrioritySchemes<T = Paginated<Models.PrioritySchemeWithPaginatedPrioritiesAndProjects>>(
    parameters?: Parameters.GetPrioritySchemes,
    callback?: never,
  ): Promise<T>;
  async getPrioritySchemes<T = Paginated<Models.PrioritySchemeWithPaginatedPrioritiesAndProjects>>(
    parameters?: Parameters.GetPrioritySchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/priorityscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        priorityId: paramSerializer('priorityId', parameters?.priorityId),
        schemeId: paramSerializer('schemeId', parameters?.schemeId),
        schemeName: parameters?.schemeName,
        onlyDefault: parameters?.onlyDefault,
        orderBy: parameters?.orderBy,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a new priority scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriorityScheme<T = Models.PrioritySchemeId>(
    parameters: Parameters.CreatePriorityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a new priority scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createPriorityScheme<T = Models.PrioritySchemeId>(
    parameters: Parameters.CreatePriorityScheme,
    callback?: never,
  ): Promise<T>;
  async createPriorityScheme<T = Models.PrioritySchemeId>(
    parameters: Parameters.CreatePriorityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/priorityscheme',
      method: 'POST',
      data: {
        defaultPriorityId: parameters.defaultPriorityId,
        description: parameters.description,
        mappings: parameters.mappings,
        name: parameters.name,
        priorityIds: parameters.priorityIds,
        projectIds: parameters.projectIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities that would require mapping, given a change in priorities or projects associated with a priority scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async suggestedPrioritiesForMappings<T = Paginated<Models.PriorityWithSequence>>(
    parameters: Parameters.SuggestedPrioritiesForMappings | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities that would require mapping, given a change in priorities or projects associated with a priority scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async suggestedPrioritiesForMappings<T = Paginated<Models.PriorityWithSequence>>(
    parameters?: Parameters.SuggestedPrioritiesForMappings,
    callback?: never,
  ): Promise<T>;
  async suggestedPrioritiesForMappings<T = Paginated<Models.PriorityWithSequence>>(
    parameters?: Parameters.SuggestedPrioritiesForMappings,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/priorityscheme/mappings',
      method: 'POST',
      data: {
        maxResults: parameters?.maxResults,
        priorities: parameters?.priorities,
        projects: parameters?.projects,
        schemeId: parameters?.schemeId,
        startAt: parameters?.startAt,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities available for adding to a priority scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAvailablePrioritiesByPriorityScheme<T = Paginated<Models.PriorityWithSequence>>(
    parameters: Parameters.GetAvailablePrioritiesByPriorityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities available for adding to a priority scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getAvailablePrioritiesByPriorityScheme<T = Paginated<Models.PriorityWithSequence>>(
    parameters: Parameters.GetAvailablePrioritiesByPriorityScheme,
    callback?: never,
  ): Promise<T>;
  async getAvailablePrioritiesByPriorityScheme<T = Paginated<Models.PriorityWithSequence>>(
    parameters: Parameters.GetAvailablePrioritiesByPriorityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/priorityscheme/priorities/available',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        query: parameters.query,
        schemeId: parameters.schemeId,
        exclude: parameters.exclude,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a priority scheme. This includes its details, the lists of priorities and projects in it
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePriorityScheme<T = Models.UpdatePrioritySchemeResponse>(
    parameters: Parameters.UpdatePriorityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates a priority scheme. This includes its details, the lists of priorities and projects in it
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updatePriorityScheme<T = Models.UpdatePrioritySchemeResponse>(
    parameters: Parameters.UpdatePriorityScheme,
    callback?: never,
  ): Promise<T>;
  async updatePriorityScheme<T = Models.UpdatePrioritySchemeResponse>(
    parameters: Parameters.UpdatePriorityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/priorityscheme/${parameters.schemeId}`,
      method: 'PUT',
      data: {
        defaultPriorityId: parameters.defaultPriorityId,
        description: parameters.description,
        mappings: parameters.mappings,
        name: parameters.name,
        priorities: parameters.priorities,
        projects: parameters.projects,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a priority scheme.
   *
   * This operation is only available for priority schemes without any associated projects. Any associated projects must
   * be removed from the priority scheme before this operation can be performed.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePriorityScheme<T = void>(
    parameters: Parameters.DeletePriorityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a priority scheme.
   *
   * This operation is only available for priority schemes without any associated projects. Any associated projects must
   * be removed from the priority scheme before this operation can be performed.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deletePriorityScheme<T = void>(parameters: Parameters.DeletePriorityScheme, callback?: never): Promise<T>;
  async deletePriorityScheme<T = void>(
    parameters: Parameters.DeletePriorityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/priorityscheme/${parameters.schemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities by scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPrioritiesByPriorityScheme<T = Paginated<Models.PriorityWithSequence>>(
    parameters: Parameters.GetPrioritiesByPriorityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * priorities by scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getPrioritiesByPriorityScheme<T = Paginated<Models.PriorityWithSequence>>(
    parameters: Parameters.GetPrioritiesByPriorityScheme,
    callback?: never,
  ): Promise<T>;
  async getPrioritiesByPriorityScheme<T = Paginated<Models.PriorityWithSequence>>(
    parameters: Parameters.GetPrioritiesByPriorityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/priorityscheme/${parameters.schemeId}/priorities`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * projects by scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getProjectsByPriorityScheme<T = Models.PageProject>(
    parameters: Parameters.GetProjectsByPriorityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * projects by scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getProjectsByPriorityScheme<T = Models.PageProject>(
    parameters: Parameters.GetProjectsByPriorityScheme,
    callback?: never,
  ): Promise<T>;
  async getProjectsByPriorityScheme<T = Models.PageProject>(
    parameters: Parameters.GetProjectsByPriorityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/priorityscheme/${parameters.schemeId}/projects`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: paramSerializer('projectId', parameters.projectId),
        query: parameters.query,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
