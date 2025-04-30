import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueTypeSchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type schemes.
   *
   * Only issue type schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllIssueTypeSchemes<T = Models.PageIssueTypeScheme>(
    parameters: Parameters.GetAllIssueTypeSchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type schemes.
   *
   * Only issue type schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getAllIssueTypeSchemes<T = Models.PageIssueTypeScheme>(
    parameters?: Parameters.GetAllIssueTypeSchemes,
    callback?: never,
  ): Promise<T>;
  async getAllIssueTypeSchemes<T = Models.PageIssueTypeScheme>(
    parameters?: Parameters.GetAllIssueTypeSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        orderBy: parameters?.orderBy,
        expand: parameters?.expand,
        queryString: parameters?.queryString,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(
    parameters: Parameters.CreateIssueTypeScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates an issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(
    parameters: Parameters.CreateIssueTypeScheme,
    callback?: never,
  ): Promise<T>;
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(
    parameters: Parameters.CreateIssueTypeScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescheme',
      method: 'POST',
      data: {
        defaultIssueTypeId: parameters.defaultIssueTypeId,
        description: parameters.description,
        issueTypeIds: parameters.issueTypeIds,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type scheme items.
   *
   * Only issue type scheme items used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeSchemesMapping<T = Models.PageIssueTypeSchemeMapping>(
    parameters: Parameters.GetIssueTypeSchemesMapping | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type scheme items.
   *
   * Only issue type scheme items used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeSchemesMapping<T = Models.PageIssueTypeSchemeMapping>(
    parameters?: Parameters.GetIssueTypeSchemesMapping,
    callback?: never,
  ): Promise<T>;
  async getIssueTypeSchemesMapping<T = Models.PageIssueTypeSchemeMapping>(
    parameters?: Parameters.GetIssueTypeSchemesMapping,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        issueTypeSchemeId: parameters?.issueTypeSchemeId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type schemes and, for each issue type scheme, a list of the projects that use it.
   *
   * Only issue type schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeSchemeForProjects<T = Models.PageIssueTypeSchemeProjects>(
    parameters: Parameters.GetIssueTypeSchemeForProjects,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type schemes and, for each issue type scheme, a list of the projects that use it.
   *
   * Only issue type schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeSchemeForProjects<T = Models.PageIssueTypeSchemeProjects>(
    parameters: Parameters.GetIssueTypeSchemeForProjects,
    callback?: never,
  ): Promise<T>;
  async getIssueTypeSchemeForProjects<T = Models.PageIssueTypeSchemeProjects>(
    parameters: Parameters.GetIssueTypeSchemeForProjects,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Assigns an issue type scheme to a project.
   *
   * If any issues in the project are assigned issue types not present in the new scheme, the operation will fail. To
   * complete the assignment those issues must be updated to use issue types in the new scheme.
   *
   * Issue type schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignIssueTypeSchemeToProject<T = void>(
    parameters: Parameters.AssignIssueTypeSchemeToProject,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Assigns an issue type scheme to a project.
   *
   * If any issues in the project are assigned issue types not present in the new scheme, the operation will fail. To
   * complete the assignment those issues must be updated to use issue types in the new scheme.
   *
   * Issue type schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignIssueTypeSchemeToProject<T = void>(
    parameters: Parameters.AssignIssueTypeSchemeToProject,
    callback?: never,
  ): Promise<T>;
  async assignIssueTypeSchemeToProject<T = void>(
    parameters: Parameters.AssignIssueTypeSchemeToProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescheme/project',
      method: 'PUT',
      data: {
        issueTypeSchemeId: parameters.issueTypeSchemeId,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates an issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueTypeScheme<T = void>(
    parameters: Parameters.UpdateIssueTypeScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates an issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueTypeScheme<T = void>(parameters: Parameters.UpdateIssueTypeScheme, callback?: never): Promise<T>;
  async updateIssueTypeScheme<T = void>(
    parameters: Parameters.UpdateIssueTypeScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'PUT',
      data: {
        defaultIssueTypeId: parameters.defaultIssueTypeId,
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue type scheme.
   *
   * Only issue type schemes used in classic projects can be deleted.
   *
   * Any projects assigned to the scheme are reassigned to the default issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeScheme<T = void>(
    parameters: Parameters.DeleteIssueTypeScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes an issue type scheme.
   *
   * Only issue type schemes used in classic projects can be deleted.
   *
   * Any projects assigned to the scheme are reassigned to the default issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeScheme<T = void>(parameters: Parameters.DeleteIssueTypeScheme, callback?: never): Promise<T>;
  async deleteIssueTypeScheme<T = void>(
    parameters: Parameters.DeleteIssueTypeScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds issue types to an issue type scheme.
   *
   * The added issue types are appended to the issue types list.
   *
   * If any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addIssueTypesToIssueTypeScheme<T = void>(
    parameters: Parameters.AddIssueTypesToIssueTypeScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds issue types to an issue type scheme.
   *
   * The added issue types are appended to the issue types list.
   *
   * If any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addIssueTypesToIssueTypeScheme<T = void>(
    parameters: Parameters.AddIssueTypesToIssueTypeScheme,
    callback?: never,
  ): Promise<T>;
  async addIssueTypesToIssueTypeScheme<T = void>(
    parameters: Parameters.AddIssueTypesToIssueTypeScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype`,
      method: 'PUT',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Changes the order of issue types in an issue type scheme.
   *
   * The request body parameters must meet the following requirements:
   *
   * - All of the issue types must belong to the issue type scheme.
   * - Either `after` or `position` must be provided.
   * - The issue type in `after` must not be in the issue type list.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async reorderIssueTypesInIssueTypeScheme<T = void>(
    parameters: Parameters.ReorderIssueTypesInIssueTypeScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Changes the order of issue types in an issue type scheme.
   *
   * The request body parameters must meet the following requirements:
   *
   * - All of the issue types must belong to the issue type scheme.
   * - Either `after` or `position` must be provided.
   * - The issue type in `after` must not be in the issue type list.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async reorderIssueTypesInIssueTypeScheme<T = void>(
    parameters: Parameters.ReorderIssueTypesInIssueTypeScheme,
    callback?: never,
  ): Promise<T>;
  async reorderIssueTypesInIssueTypeScheme<T = void>(
    parameters: Parameters.ReorderIssueTypesInIssueTypeScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/move`,
      method: 'PUT',
      data: {
        after: parameters.after,
        issueTypeIds: parameters.issueTypeIds,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes an issue type from an issue type scheme.
   *
   * This operation cannot remove:
   *
   * - Any issue type used by issues.
   * - Any issue types from the default issue type scheme.
   * - The last standard issue type from an issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeIssueTypeFromIssueTypeScheme<T = void>(
    parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes an issue type from an issue type scheme.
   *
   * This operation cannot remove:
   *
   * - Any issue type used by issues.
   * - Any issue types from the default issue type scheme.
   * - The last standard issue type from an issue type scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeIssueTypeFromIssueTypeScheme<T = void>(
    parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme,
    callback?: never,
  ): Promise<T>;
  async removeIssueTypeFromIssueTypeScheme<T = void>(
    parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/${parameters.issueTypeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
