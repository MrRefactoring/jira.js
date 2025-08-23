import type { Client } from '../client';
import type { Request } from '../request';
import type { GetIssueTypeScreenSchemesParameters } from './parameters/getIssueTypeScreenSchemesParameters';
import type { CreateIssueTypeScreenSchemeParameters } from './parameters/createIssueTypeScreenSchemeParameters';
import type { GetIssueTypeScreenSchemeMappingsParameters } from './parameters/getIssueTypeScreenSchemeMappingsParameters';
import type { GetIssueTypeScreenSchemeProjectAssociationsParameters } from './parameters/getIssueTypeScreenSchemeProjectAssociationsParameters';
import type { AssignIssueTypeScreenSchemeToProjectParameters } from './parameters/assignIssueTypeScreenSchemeToProjectParameters';
import type { DeleteIssueTypeScreenSchemeParameters } from './parameters/deleteIssueTypeScreenSchemeParameters';
import type { UpdateIssueTypeScreenSchemeParameters } from './parameters/updateIssueTypeScreenSchemeParameters';
import type { AppendMappingsForIssueTypeScreenSchemeParameters } from './parameters/appendMappingsForIssueTypeScreenSchemeParameters';
import type { UpdateDefaultScreenSchemeParameters } from './parameters/updateDefaultScreenSchemeParameters';
import type { RemoveMappingsFromIssueTypeScreenSchemeParameters } from './parameters/removeMappingsFromIssueTypeScreenSchemeParameters';
import type { GetProjectsForIssueTypeScreenSchemeParameters } from './parameters/getProjectsForIssueTypeScreenSchemeParameters';

export class IssueTypeScreenSchemes {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * type screen schemes. *
   *
   * - Only issue type screen schemes used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemes(parameters: GetIssueTypeScreenSchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescreenscheme',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        queryString: parameters.queryString,
        orderBy: parameters.orderBy,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates an issue type screen scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueTypeScreenScheme(parameters: CreateIssueTypeScreenSchemeParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescreenscheme',
      method: 'POST',
      body: {
        description: parameters.description,
        issueTypeMappings: parameters.issueTypeMappings,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * type screen scheme items. *
   *
   * - Only issue type screen schemes used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemeMappings(parameters: GetIssueTypeScreenSchemeMappingsParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescreenscheme/mapping',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        issueTypeScreenSchemeId: parameters.issueTypeScreenSchemeId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * type screen schemes and, for each issue type screen scheme, a list of the projects that use it. *
   *
   * - Only issue type screen schemes used in classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueTypeScreenSchemeProjectAssociations(parameters: GetIssueTypeScreenSchemeProjectAssociationsParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescreenscheme/project',
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
   * Assigns an issue type screen scheme to a project. *
   *
   * - Issue type screen schemes can only be assigned to classic projects.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async assignIssueTypeScreenSchemeToProject(parameters: AssignIssueTypeScreenSchemeToProjectParameters) {
    const request: Request = {
      url: '/rest/api/2/issuetypescreenscheme/project',
      method: 'PUT',
      body: {
        issueTypeScreenSchemeId: parameters.issueTypeScreenSchemeId,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue type screen scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteIssueTypeScreenScheme(parameters: DeleteIssueTypeScreenSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates an issue type screen scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueTypeScreenScheme(parameters: UpdateIssueTypeScreenSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Appends issue type to screen scheme mappings to an issue type screen scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async appendMappingsForIssueTypeScreenScheme(parameters: AppendMappingsForIssueTypeScreenSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping`,
      method: 'PUT',
      body: {
        issueTypeMappings: parameters.issueTypeMappings,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the default screen scheme of an issue type screen scheme. The default screen scheme is used for all
   * unmapped issue types. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateDefaultScreenScheme(parameters: UpdateDefaultScreenSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/default`,
      method: 'PUT',
      body: {
        screenSchemeId: parameters.screenSchemeId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes issue type to screen scheme mappings from an issue type screen scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeMappingsFromIssueTypeScreenScheme(parameters: RemoveMappingsFromIssueTypeScreenSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/mapping/remove`,
      method: 'POST',
      body: {
        issueTypeIds: parameters.issueTypeIds,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * projects associated with an issue type screen scheme. *
   *
   * - Only company-managed projects associated with an issue type screen scheme are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getProjectsForIssueTypeScreenScheme(parameters: GetProjectsForIssueTypeScreenSchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuetypescreenscheme/${parameters.issueTypeScreenSchemeId}/project`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        query: parameters.query,
      },
    };

    return this.client.sendRequest(request);
  }
}
