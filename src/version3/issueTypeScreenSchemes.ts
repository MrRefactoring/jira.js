import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class IssueTypeScreenSchemes {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type screen schemes.
   *
   * Only issue type screen schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemes<T = Models.PageIssueTypeScreenScheme>(
    parameters: Parameters.GetIssueTypeScreenSchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type screen schemes.
   *
   * Only issue type screen schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemes<T = Models.PageIssueTypeScreenScheme>(
    parameters?: Parameters.GetIssueTypeScreenSchemes,
    callback?: never,
  ): Promise<T>;
  async getIssueTypeScreenSchemes<T = Models.PageIssueTypeScreenScheme>(
    parameters?: Parameters.GetIssueTypeScreenSchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
        queryString: parameters?.queryString,
        orderBy: parameters?.orderBy,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(
    parameters: Parameters.CreateIssueTypeScreenScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(
    parameters: Parameters.CreateIssueTypeScreenScheme,
    callback?: never,
  ): Promise<T>;
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(
    parameters: Parameters.CreateIssueTypeScreenScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme',
      method: 'POST',
      data: {
        description: parameters.description,
        issueTypeMappings: parameters.issueTypeMappings,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type screen scheme items.
   *
   * Only issue type screen schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemeMappings<T = Models.PageIssueTypeScreenSchemeItem>(
    parameters: Parameters.GetIssueTypeScreenSchemeMappings | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type screen scheme items.
   *
   * Only issue type screen schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemeMappings<T = Models.PageIssueTypeScreenSchemeItem>(
    parameters?: Parameters.GetIssueTypeScreenSchemeMappings,
    callback?: never,
  ): Promise<T>;
  async getIssueTypeScreenSchemeMappings<T = Models.PageIssueTypeScreenSchemeItem>(
    parameters?: Parameters.GetIssueTypeScreenSchemeMappings,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        issueTypeScreenSchemeId: parameters?.issueTypeScreenSchemeId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type screen schemes and, for each issue type screen scheme, a list of the projects that use it.
   *
   * Only issue type screen schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageIssueTypeScreenSchemesProjects>(
    parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of issue
   * type screen schemes and, for each issue type screen scheme, a list of the projects that use it.
   *
   * Only issue type screen schemes used in classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageIssueTypeScreenSchemesProjects>(
    parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations,
    callback?: never,
  ): Promise<T>;
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageIssueTypeScreenSchemesProjects>(
    parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme/project',
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
   * Assigns an issue type screen scheme to a project.
   *
   * Issue type screen schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignIssueTypeScreenSchemeToProject<T = void>(
    parameters: Parameters.AssignIssueTypeScreenSchemeToProject | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Assigns an issue type screen scheme to a project.
   *
   * Issue type screen schemes can only be assigned to classic projects.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignIssueTypeScreenSchemeToProject<T = void>(
    parameters?: Parameters.AssignIssueTypeScreenSchemeToProject,
    callback?: never,
  ): Promise<T>;
  async assignIssueTypeScreenSchemeToProject<T = void>(
    parameters?: Parameters.AssignIssueTypeScreenSchemeToProject,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/issuetypescreenscheme/project',
      method: 'PUT',
      data: {
        issueTypeScreenSchemeId: parameters?.issueTypeScreenSchemeId,
        projectId: parameters?.projectId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueTypeScreenScheme<T = void>(
    parameters: Parameters.UpdateIssueTypeScreenScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueTypeScreenScheme<T = void>(
    parameters: Parameters.UpdateIssueTypeScreenScheme,
    callback?: never,
  ): Promise<T>;
  async updateIssueTypeScreenScheme<T = void>(
    parameters: Parameters.UpdateIssueTypeScreenScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'PUT',
      data: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeScreenScheme<T = void>(
    parameters: Parameters.DeleteIssueTypeScreenScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeScreenScheme<T = void>(
    parameters: Parameters.DeleteIssueTypeScreenScheme,
    callback?: never,
  ): Promise<T>;
  async deleteIssueTypeScreenScheme<T = void>(
    parameters: Parameters.DeleteIssueTypeScreenScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Appends issue type to screen scheme mappings to an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async appendMappingsForIssueTypeScreenScheme<T = void>(
    parameters: Parameters.AppendMappingsForIssueTypeScreenScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Appends issue type to screen scheme mappings to an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async appendMappingsForIssueTypeScreenScheme<T = void>(
    parameters: Parameters.AppendMappingsForIssueTypeScreenScheme,
    callback?: never,
  ): Promise<T>;
  async appendMappingsForIssueTypeScreenScheme<T = void>(
    parameters: Parameters.AppendMappingsForIssueTypeScreenScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping`,
      method: 'PUT',
      data: {
        issueTypeMappings: parameters.issueTypeMappings,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all
   * unmapped issue types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultScreenScheme<T = void>(
    parameters: Parameters.UpdateDefaultScreenScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all
   * unmapped issue types.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultScreenScheme<T = void>(
    parameters: Parameters.UpdateDefaultScreenScheme,
    callback?: never,
  ): Promise<T>;
  async updateDefaultScreenScheme<T = void>(
    parameters: Parameters.UpdateDefaultScreenScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/default`,
      method: 'PUT',
      data: {
        screenSchemeId: parameters.screenSchemeId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes issue type to screen scheme mappings from an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeMappingsFromIssueTypeScreenScheme<T = void>(
    parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes issue type to screen scheme mappings from an issue type screen scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeMappingsFromIssueTypeScreenScheme<T = void>(
    parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme,
    callback?: never,
  ): Promise<T>;
  async removeMappingsFromIssueTypeScreenScheme<T = void>(
    parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/remove`,
      method: 'POST',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * projects associated with an issue type screen scheme.
   *
   * Only company-managed projects associated with an issue type screen scheme are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectsForIssueTypeScreenScheme<T = Models.PageProjectDetails>(
    parameters: Parameters.GetProjectsForIssueTypeScreenScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * projects associated with an issue type screen scheme.
   *
   * Only company-managed projects associated with an issue type screen scheme are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectsForIssueTypeScreenScheme<T = Models.PageProjectDetails>(
    parameters: Parameters.GetProjectsForIssueTypeScreenScheme,
    callback?: never,
  ): Promise<T>;
  async getProjectsForIssueTypeScreenScheme<T = Models.PageProjectDetails>(
    parameters: Parameters.GetProjectsForIssueTypeScreenScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/project`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        query: parameters.query,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
