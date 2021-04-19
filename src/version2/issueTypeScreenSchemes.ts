import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueTypeScreenSchemes {
  constructor(private client: Client) { }
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue type screen schemes.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters: Parameters.GetIssueTypeScreenSchemes | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue type screen schemes.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: never): Promise<T>;
  async getIssueTypeScreenSchemes<T = Models.PageBeanIssueTypeScreenScheme>(parameters?: Parameters.GetIssueTypeScreenSchemes, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescreenscheme',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: parameters?.id,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getIssueTypeScreenSchemes' });
  }
  /**
     * Creates an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(parameters: Parameters.CreateIssueTypeScreenScheme | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Creates an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(parameters?: Parameters.CreateIssueTypeScreenScheme, callback?: never): Promise<T>;
  async createIssueTypeScreenScheme<T = Models.IssueTypeScreenSchemeId>(parameters?: Parameters.CreateIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescreenscheme',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        issueTypeMappings: parameters?.issueTypeMappings,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'createIssueTypeScreenScheme' });
  }
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue type screen scheme items.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters: Parameters.GetIssueTypeScreenSchemeMappings | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue type screen scheme items.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: never): Promise<T>;
  async getIssueTypeScreenSchemeMappings<T = Models.PageBeanIssueTypeScreenSchemeItem>(parameters?: Parameters.GetIssueTypeScreenSchemeMappings, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescreenscheme/mapping',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        issueTypeScreenSchemeId: parameters?.issueTypeScreenSchemeId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getIssueTypeScreenSchemeMappings' });
  }
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue type screen schemes and, for each issue type screen scheme, a list of the projects that use it.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations, callback: Callback<T>): Promise<void>;
  /**
     * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue type screen schemes and, for each issue type screen scheme, a list of the projects that use it.
     *
     * Only issue type screen schemes used in classic projects are returned.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations, callback?: never): Promise<T>;
  async getIssueTypeScreenSchemeProjectAssociations<T = Models.PageBeanIssueTypeScreenSchemesProjects>(parameters: Parameters.GetIssueTypeScreenSchemeProjectAssociations, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescreenscheme/project',
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        projectId: parameters.projectId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'getIssueTypeScreenSchemeProjectAssociations' });
  }
  /**
     * Assigns an issue type screen scheme to a project.
     *
     * Issue type screen schemes can only be assigned to classic projects.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignIssueTypeScreenSchemeToProject<T = void>(parameters: Parameters.AssignIssueTypeScreenSchemeToProject | undefined, callback: Callback<T>): Promise<void>;
  /**
     * Assigns an issue type screen scheme to a project.
     *
     * Issue type screen schemes can only be assigned to classic projects.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async assignIssueTypeScreenSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeScreenSchemeToProject, callback?: never): Promise<T>;
  async assignIssueTypeScreenSchemeToProject<T = void>(parameters?: Parameters.AssignIssueTypeScreenSchemeToProject, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: '/rest/api/2/issuetypescreenscheme/project',
      method: 'PUT',
      data: {
        issueTypeScreenSchemeId: parameters?.issueTypeScreenSchemeId,
        projectId: parameters?.projectId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'assignIssueTypeScreenSchemeToProject' });
  }
  /**
     * Updates an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateIssueTypeScreenScheme<T = void>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  /**
     * Updates an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateIssueTypeScreenScheme<T = void>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback?: never): Promise<T>;
  async updateIssueTypeScreenScheme<T = void>(parameters: Parameters.UpdateIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateIssueTypeScreenScheme' });
  }
  /**
     * Deletes an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteIssueTypeScreenScheme<T = void>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  /**
     * Deletes an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteIssueTypeScreenScheme<T = void>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback?: never): Promise<T>;
  async deleteIssueTypeScreenScheme<T = void>(parameters: Parameters.DeleteIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'DELETE',
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'deleteIssueTypeScreenScheme' });
  }
  /**
     * Appends issue type to screen scheme mappings to an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async appendMappingsForIssueTypeScreenScheme<T = void>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  /**
     * Appends issue type to screen scheme mappings to an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async appendMappingsForIssueTypeScreenScheme<T = void>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback?: never): Promise<T>;
  async appendMappingsForIssueTypeScreenScheme<T = void>(parameters: Parameters.AppendMappingsForIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping`,
      method: 'PUT',
      data: {
        issueTypeMappings: parameters.issueTypeMappings,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'appendMappingsForIssueTypeScreenScheme' });
  }
  /**
     * Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all unmapped issue types.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateDefaultScreenScheme<T = void>(parameters: Parameters.UpdateDefaultScreenScheme, callback: Callback<T>): Promise<void>;
  /**
     * Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all unmapped issue types.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async updateDefaultScreenScheme<T = void>(parameters: Parameters.UpdateDefaultScreenScheme, callback?: never): Promise<T>;
  async updateDefaultScreenScheme<T = void>(parameters: Parameters.UpdateDefaultScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/default`,
      method: 'PUT',
      data: {
        screenSchemeId: parameters.screenSchemeId,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'updateDefaultScreenScheme' });
  }
  /**
     * Removes issue type to screen scheme mappings from an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeMappingsFromIssueTypeScreenScheme<T = void>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback: Callback<T>): Promise<void>;
  /**
     * Removes issue type to screen scheme mappings from an issue type screen scheme.
     *
     * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async removeMappingsFromIssueTypeScreenScheme<T = void>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback?: never): Promise<T>;
  async removeMappingsFromIssueTypeScreenScheme<T = void>(parameters: Parameters.RemoveMappingsFromIssueTypeScreenScheme, callback?: Callback<T>): Promise<void | T> {
    const config = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/remove`,
      method: 'POST',
      data: {
        issueTypeIds: parameters.issueTypeIds,
      },
    } as RequestConfig;

    return this.client.sendRequest(config, callback, { methodName: 'removeMappingsFromIssueTypeScreenScheme' });
  }
}
