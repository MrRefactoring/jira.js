import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypeSchemes {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](#pagination) list of issue type schemes.
     *
     * Only issue type schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters: Parameters.GetAllIssueTypeSchemes | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of issue type schemes.
     *
     * Only issue type schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters?: Parameters.GetAllIssueTypeSchemes, callback?: never): Promise<T>;
  async getAllIssueTypeSchemes<T = Models.PageBeanIssueTypeScheme>(parameters?: Parameters.GetAllIssueTypeSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getAllIssueTypeSchemes' });
  }
  /**
     * Creates an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(parameters: Parameters.CreateIssueTypeScheme | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Creates an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(parameters?: Parameters.CreateIssueTypeScheme, callback?: never): Promise<T>;
  async createIssueTypeScheme<T = Models.IssueTypeSchemeID>(parameters?: Parameters.CreateIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescheme',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        defaultIssueTypeId: parameters?.defaultIssueTypeId,
        issueTypeIds: parameters?.issueTypeIds,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createIssueTypeScheme' });
  }
  /**
     * Returns a [paginated](#pagination) list of issue type scheme items.
     *
     * Only issue type scheme items used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters: Parameters.GetIssueTypeSchemesMapping | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of issue type scheme items.
     *
     * Only issue type scheme items used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters?: Parameters.GetIssueTypeSchemesMapping, callback?: never): Promise<T>;
  async getIssueTypeSchemesMapping<T = Models.PageBeanIssueTypeSchemeMapping>(parameters?: Parameters.GetIssueTypeSchemesMapping, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        issueTypeSchemeId: parameters?.issueTypeSchemeId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getIssueTypeSchemesMapping' });
  }
  /**
     * Returns a [paginated](#pagination) list of issue type schemes and, for each issue type scheme, a list of the projects that use it.
     *
     * Only issue type schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: Parameters.GetIssueTypeSchemeForProjects, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](#pagination) list of issue type schemes and, for each issue type scheme, a list of the projects that use it.
     *
     * Only issue type schemes used in classic projects are returned.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: Parameters.GetIssueTypeSchemeForProjects, callback?: never): Promise<T>;
  async getIssueTypeSchemeForProjects<T = Models.PageBeanIssueTypeSchemeProjects>(parameters: Parameters.GetIssueTypeSchemeForProjects, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getIssueTypeSchemeForProjects' });
  }
  /**
     * Assigns an issue type scheme to a project.
     *
     * If any issues in the project are assigned issue types not present in the new scheme, the operation will fail. To complete the assignment those issues must be updated to use issue types in the new scheme.
     *
     * Issue type schemes can only be assigned to classic projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignIssueTypeSchemeToProject<T = void>(parameters: Parameters.AssignIssueTypeSchemeToProject | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Assigns an issue type scheme to a project.
     *
     * If any issues in the project are assigned issue types not present in the new scheme, the operation will fail. To complete the assignment those issues must be updated to use issue types in the new scheme.
     *
     * Issue type schemes can only be assigned to classic projects.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignIssueTypeSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeSchemeToProject, callback?: never): Promise<T>;
  async assignIssueTypeSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeSchemeToProject, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescheme/project',
      method: 'PUT',
      data: {
        issueTypeSchemeId: parameters?.issueTypeSchemeId,
        projectId: parameters?.projectId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'assignIssueTypeSchemeToProject' });
  }
  /**
     * Updates an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateIssueTypeScheme<T = void>(parameters: Parameters.UpdateIssueTypeScheme, callback: Callback<T>): Promise<void>;
  /**
     * Updates an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateIssueTypeScheme<T = void>(parameters: Parameters.UpdateIssueTypeScheme, callback?: never): Promise<T>;
  async updateIssueTypeScheme<T = void>(parameters: Parameters.UpdateIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        defaultIssueTypeId: parameters.defaultIssueTypeId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateIssueTypeScheme' });
  }
  /**
     * Deletes an issue type scheme.
     *
     * Only issue type schemes used in classic projects can be deleted.
     *
     * Any projects assigned to the scheme are reassigned to the default issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteIssueTypeScheme<T = void>(parameters: Parameters.DeleteIssueTypeScheme, callback: Callback<T>): Promise<void>;
  /**
     * Deletes an issue type scheme.
     *
     * Only issue type schemes used in classic projects can be deleted.
     *
     * Any projects assigned to the scheme are reassigned to the default issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteIssueTypeScheme<T = void>(parameters: Parameters.DeleteIssueTypeScheme, callback?: never): Promise<T>;
  async deleteIssueTypeScheme<T = void>(parameters: Parameters.DeleteIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}`,
      method: 'DELETE',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'deleteIssueTypeScheme' });
  }
  /**
     * Adds issue types to an issue type scheme.
     *
     * The added issue types are appended to the issue types list.
     *
     * If any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addIssueTypesToIssueTypeScheme<T = void>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback: Callback<T>): Promise<void>;
  /**
     * Adds issue types to an issue type scheme.
     *
     * The added issue types are appended to the issue types list.
     *
     * If any of the issue types exist in the issue type scheme, the operation fails and no issue types are added.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async addIssueTypesToIssueTypeScheme<T = void>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback?: never): Promise<T>;
  async addIssueTypesToIssueTypeScheme<T = void>(parameters: Parameters.AddIssueTypesToIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype`,
      method: 'PUT',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'addIssueTypesToIssueTypeScheme' });
  }
  /**
     * Changes the order of issue types in an issue type scheme.
     *
     * The request body parameters must meet the following requirements:
     *
     *  *  all of the issue types must belong to the issue type scheme.
     *  *  either `after` or `position` must be provided.
     *  *  the issue type in `after` must not be in the issue type list.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async reorderIssueTypesInIssueTypeScheme<T = void>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback: Callback<T>): Promise<void>;
  /**
     * Changes the order of issue types in an issue type scheme.
     *
     * The request body parameters must meet the following requirements:
     *
     *  *  all of the issue types must belong to the issue type scheme.
     *  *  either `after` or `position` must be provided.
     *  *  the issue type in `after` must not be in the issue type list.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async reorderIssueTypesInIssueTypeScheme<T = void>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback?: never): Promise<T>;
  async reorderIssueTypesInIssueTypeScheme<T = void>(parameters: Parameters.ReorderIssueTypesInIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/move`,
      method: 'PUT',
      data: {
        issueTypeIds: parameters.issueTypeIds,
        after: parameters.after,
        position: parameters.position,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'reorderIssueTypesInIssueTypeScheme' });
  }
  /**
     * Removes an issue type from an issue type scheme.
     *
     * This operation cannot remove:
     *
     *  *  any issue type used by issues.
     *  *  any issue types from the default issue type scheme.
     *  *  the last standard issue type from an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeIssueTypeFromIssueTypeScheme<T = void>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback: Callback<T>): Promise<void>;
  /**
     * Removes an issue type from an issue type scheme.
     *
     * This operation cannot remove:
     *
     *  *  any issue type used by issues.
     *  *  any issue types from the default issue type scheme.
     *  *  the last standard issue type from an issue type scheme.
     *
     * **[Permissions](#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeIssueTypeFromIssueTypeScheme<T = void>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback?: never): Promise<T>;
  async removeIssueTypeFromIssueTypeScheme<T = void>(parameters: Parameters.RemoveIssueTypeFromIssueTypeScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescheme/${parameters.issueTypeSchemeId}/issuetype/${parameters.issueTypeId}`,
      method: 'DELETE',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'removeIssueTypeFromIssueTypeScheme' });
  }
}
