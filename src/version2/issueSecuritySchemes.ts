import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateIssueSecuritySchemeParameters } from './parameters/createIssueSecuritySchemeParameters';
import type { GetSecurityLevelsParameters } from './parameters/getSecurityLevelsParameters';
import type { SetDefaultLevelsParameters } from './parameters/setDefaultLevelsParameters';
import type { GetSecurityLevelMembersParameters } from './parameters/getSecurityLevelMembersParameters';
import type { SearchProjectsUsingSecuritySchemesParameters } from './parameters/searchProjectsUsingSecuritySchemesParameters';
import type { AssociateSchemesToProjectsParameters } from './parameters/associateSchemesToProjectsParameters';
import type { SearchSecuritySchemesParameters } from './parameters/searchSecuritySchemesParameters';
import type { GetIssueSecuritySchemeParameters } from './parameters/getIssueSecuritySchemeParameters';
import type { UpdateIssueSecuritySchemeParameters } from './parameters/updateIssueSecuritySchemeParameters';
import type { DeleteSecuritySchemeParameters } from './parameters/deleteSecuritySchemeParameters';
import type { AddSecurityLevelParameters } from './parameters/addSecurityLevelParameters';
import type { RemoveLevelParameters } from './parameters/removeLevelParameters';
import type { UpdateSecurityLevelParameters } from './parameters/updateSecurityLevelParameters';
import type { AddSecurityLevelMembersParameters } from './parameters/addSecurityLevelMembersParameters';
import type { RemoveMemberFromSecurityLevelParameters } from './parameters/removeMemberFromSecurityLevelParameters';

export class IssueSecuritySchemes {
  constructor(private client: Client) {}
  /**
   * Returns all [issue security schemes](https://confluence.atlassian.com/x/J4lKLg). *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecuritySchemes() {
    const request: Request = {
      url: '/rest/api/2/issuesecurityschemes',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a security scheme with security scheme levels and levels' members. You can create up to 100 security scheme
   * levels and security scheme levels' members per request. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueSecurityScheme(parameters: CreateIssueSecuritySchemeParameters) {
    const request: Request = {
      url: '/rest/api/2/issuesecurityschemes',
      method: 'POST',
      body: {
        description: parameters.description,
        levels: parameters.levels,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security levels. *
   *
   * - Only issue security levels in the context of classic projects are returned.
   * -
   * - Filtering using IDs is inclusive: if you specify both security scheme IDs and level IDs, the result will include
   *   both specified issue security levels and all issue security levels from the specified schemes.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getSecurityLevels(parameters: GetSecurityLevelsParameters) {
    const request: Request = {
      url: '/rest/api/2/issuesecurityschemes/level',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        schemeId: parameters.schemeId,
        onlyDefault: parameters.onlyDefault,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets default issue security levels for schemes. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultLevels(parameters: SetDefaultLevelsParameters) {
    const request: Request = {
      url: '/rest/api/2/issuesecurityschemes/level/default',
      method: 'PUT',
      body: {
        defaultValues: parameters.defaultValues,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security level members. *
   *
   * - Only issue security level members in the context of classic projects are returned.
   * -
   * - Filtering using parameters is inclusive: if you specify both security scheme IDs and level IDs, the result will
   *   include all issue security level members from the specified schemes and levels.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getSecurityLevelMembers(parameters: GetSecurityLevelMembersParameters) {
    const request: Request = {
      url: '/rest/api/2/issuesecurityschemes/level/member',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        schemeId: parameters.schemeId,
        levelId: parameters.levelId,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) mapping of
   * projects that are using security schemes. You can provide either one or multiple security scheme IDs or project IDs
   * to filter by. If you don't provide any, this will return a list of all mappings. Only issue security schemes in the
   * context of classic projects are supported.
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchProjectsUsingSecuritySchemes(parameters: SearchProjectsUsingSecuritySchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/issuesecurityschemes/project',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        issueSecuritySchemeId: parameters.issueSecuritySchemeId,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Associates an issue security scheme with a project and remaps security levels of issues to the new levels, if
   * provided. *
   *
   * - This operation is
   *   [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async associateSchemesToProjects(parameters: AssociateSchemesToProjectsParameters) {
    const request: Request = {
      url: '/rest/api/2/issuesecurityschemes/project',
      method: 'PUT',
      body: {
        oldToNewSecurityLevelMappings: parameters.oldToNewSecurityLevelMappings,
        projectId: parameters.projectId,
        schemeId: parameters.schemeId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security schemes.
   *
   * - If you specify the project ID parameter, the result will contain issue security schemes and related project IDs you
   *   filter by. Use {@link IssueSecuritySchemeResource#searchProjectsUsingSecuritySchemes(String, String, Set, Set)} to
   *   obtain all projects related to scheme.
   * -
   * - Only issue security schemes in the context of classic projects are returned.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchSecuritySchemes(parameters: SearchSecuritySchemesParameters) {
    const request: Request = {
      url: '/rest/api/2/issuesecurityschemes/search',
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        id: parameters.id,
        projectId: parameters.projectId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns an issue security scheme along with its security levels. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * -
   * - - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project that uses the
   *       requested issue security scheme.
   */
  async getIssueSecurityScheme(parameters: GetIssueSecuritySchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the issue security scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueSecurityScheme(parameters: UpdateIssueSecuritySchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.id}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue security scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteSecurityScheme(parameters: DeleteSecuritySchemeParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds levels and levels' members to the issue security scheme. You can add up to 100 levels per request. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addSecurityLevel(parameters: AddSecurityLevelParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level`,
      method: 'PUT',
      body: {
        levels: parameters.levels,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes an issue security level. *
   *
   * - This operation is
   *   [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   *   `location` link in the response to determine the status of the task and use [Get
   *   task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeLevel(parameters: RemoveLevelParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level/${parameters.levelId}`,
      method: 'DELETE',
      query: {
        replaceWith: parameters.replaceWith,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the issue security level. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateSecurityLevel(parameters: UpdateSecurityLevelParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level/${parameters.levelId}`,
      method: 'PUT',
      body: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds members to the issue security level. You can add up to 100 members per request. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addSecurityLevelMembers(parameters: AddSecurityLevelMembersParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level/${parameters.levelId}/member`,
      method: 'PUT',
      body: {
        members: parameters.members,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes an issue security level member from an issue security scheme. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeMemberFromSecurityLevel(parameters: RemoveMemberFromSecurityLevelParameters) {
    const request: Request = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level/${parameters.levelId}/member/${parameters.memberId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }
}
