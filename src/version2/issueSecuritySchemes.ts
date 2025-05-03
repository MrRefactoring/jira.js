import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import { paramSerializer } from '../paramSerializer';
import type { RequestConfig } from '../requestConfig';

export class IssueSecuritySchemes {
  constructor(private client: Client) {}

  /**
   * Returns all [issue security schemes](https://confluence.atlassian.com/x/J4lKLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback: Callback<T>): Promise<void>;
  /**
   * Returns all [issue security schemes](https://confluence.atlassian.com/x/J4lKLg).
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback?: never): Promise<T>;
  async getIssueSecuritySchemes<T = Models.SecuritySchemes>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuesecurityschemes',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a security scheme with security scheme levels and levels' members. You can create up to 100 security scheme
   * levels and security scheme levels' members per request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueSecurityScheme<T = Models.SecuritySchemeId>(
    parameters: Parameters.CreateIssueSecurityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a security scheme with security scheme levels and levels' members. You can create up to 100 security scheme
   * levels and security scheme levels' members per request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async createIssueSecurityScheme<T = Models.SecuritySchemeId>(
    parameters: Parameters.CreateIssueSecurityScheme,
    callback?: never,
  ): Promise<T>;
  async createIssueSecurityScheme<T = Models.SecuritySchemeId>(
    parameters: Parameters.CreateIssueSecurityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuesecurityschemes',
      method: 'POST',
      data: {
        description: parameters.description,
        levels: parameters.levels,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security levels.
   *
   * Only issue security levels in the context of classic projects are returned.
   *
   * Filtering using IDs is inclusive: if you specify both security scheme IDs and level IDs, the result will include
   * both specified issue security levels and all issue security levels from the specified schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getSecurityLevels<T = Models.PageSecurityLevel>(
    parameters: Parameters.GetSecurityLevels | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security levels.
   *
   * Only issue security levels in the context of classic projects are returned.
   *
   * Filtering using IDs is inclusive: if you specify both security scheme IDs and level IDs, the result will include
   * both specified issue security levels and all issue security levels from the specified schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getSecurityLevels<T = Models.PageSecurityLevel>(
    parameters?: Parameters.GetSecurityLevels,
    callback?: never,
  ): Promise<T>;
  async getSecurityLevels<T = Models.PageSecurityLevel>(
    parameters?: Parameters.GetSecurityLevels,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuesecurityschemes/level',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: paramSerializer('id', parameters?.id),
        schemeId: paramSerializer('schemeId', parameters?.schemeId),
        onlyDefault: parameters?.onlyDefault,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets default issue security levels for schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultLevels<T = void>(
    parameters: Parameters.SetDefaultLevels | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Sets default issue security levels for schemes.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async setDefaultLevels<T = void>(parameters?: Parameters.SetDefaultLevels, callback?: never): Promise<T>;
  async setDefaultLevels<T = void>(
    parameters?: Parameters.SetDefaultLevels,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuesecurityschemes/level/default',
      method: 'PUT',
      data: {
        defaultValues: parameters?.defaultValues,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security level members.
   *
   * Only issue security level members in the context of classic projects are returned.
   *
   * Filtering using parameters is inclusive: if you specify both security scheme IDs and level IDs, the result will
   * include all issue security level members from the specified schemes and levels.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getSecurityLevelMembers<T = Models.PageSecurityLevelMember>(
    parameters: Parameters.GetSecurityLevelMembers | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security level members.
   *
   * Only issue security level members in the context of classic projects are returned.
   *
   * Filtering using parameters is inclusive: if you specify both security scheme IDs and level IDs, the result will
   * include all issue security level members from the specified schemes and levels.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async getSecurityLevelMembers<T = Models.PageSecurityLevelMember>(
    parameters?: Parameters.GetSecurityLevelMembers,
    callback?: never,
  ): Promise<T>;
  async getSecurityLevelMembers<T = Models.PageSecurityLevelMember>(
    parameters?: Parameters.GetSecurityLevelMembers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuesecurityschemes/level/member',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: paramSerializer('id', parameters?.id),
        schemeId: paramSerializer('schemeId', parameters?.schemeId),
        levelId: paramSerializer('levelId', parameters?.levelId),
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) mapping of
   * projects that are using security schemes. You can provide either one or multiple security scheme IDs or project IDs
   * to filter by. If you don't provide any, this will return a list of all mappings. Only issue security schemes in the
   * context of classic projects are supported.
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchProjectsUsingSecuritySchemes<T = Models.PageIssueSecuritySchemeToProjectMapping>(
    parameters: Parameters.SearchProjectsUsingSecuritySchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) mapping of
   * projects that are using security schemes. You can provide either one or multiple security scheme IDs or project IDs
   * to filter by. If you don't provide any, this will return a list of all mappings. Only issue security schemes in the
   * context of classic projects are supported.
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchProjectsUsingSecuritySchemes<T = Models.PageIssueSecuritySchemeToProjectMapping>(
    parameters?: Parameters.SearchProjectsUsingSecuritySchemes,
    callback?: never,
  ): Promise<T>;
  async searchProjectsUsingSecuritySchemes<T = Models.PageIssueSecuritySchemeToProjectMapping>(
    parameters?: Parameters.SearchProjectsUsingSecuritySchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuesecurityschemes/project',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        issueSecuritySchemeId: parameters?.issueSecuritySchemeId,
        projectId: parameters?.projectId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Associates an issue security scheme with a project and remaps security levels of issues to the new levels, if
   * provided.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async associateSchemesToProjects<T = Models.TaskProgressObject>(
    parameters: Parameters.AssociateSchemesToProjects,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Associates an issue security scheme with a project and remaps security levels of issues to the new levels, if
   * provided.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async associateSchemesToProjects<T = Models.TaskProgressObject>(
    parameters: Parameters.AssociateSchemesToProjects,
    callback?: never,
  ): Promise<T>;
  async associateSchemesToProjects<T = Models.TaskProgressObject>(
    parameters: Parameters.AssociateSchemesToProjects,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuesecurityschemes/project',
      method: 'PUT',
      data: {
        oldToNewSecurityLevelMappings: parameters.oldToNewSecurityLevelMappings,
        projectId: parameters.projectId,
        schemeId: parameters.schemeId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security schemes.\
   * If you specify the project ID parameter, the result will contain issue security schemes and related project IDs you
   * filter by. Use {@link IssueSecuritySchemeResource#searchProjectsUsingSecuritySchemes(String, String, Set, Set)} to
   * obtain all projects related to scheme.
   *
   * Only issue security schemes in the context of classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchSecuritySchemes<T = Models.PageSecuritySchemeWithProjects>(
    parameters: Parameters.SearchSecuritySchemes | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of issue
   * security schemes.\
   * If you specify the project ID parameter, the result will contain issue security schemes and related project IDs you
   * filter by. Use {@link IssueSecuritySchemeResource#searchProjectsUsingSecuritySchemes(String, String, Set, Set)} to
   * obtain all projects related to scheme.
   *
   * Only issue security schemes in the context of classic projects are returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async searchSecuritySchemes<T = Models.PageSecuritySchemeWithProjects>(
    parameters?: Parameters.SearchSecuritySchemes,
    callback?: never,
  ): Promise<T>;
  async searchSecuritySchemes<T = Models.PageSecuritySchemeWithProjects>(
    parameters?: Parameters.SearchSecuritySchemes,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/issuesecurityschemes/search',
      method: 'GET',
      params: {
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        id: paramSerializer('id', parameters?.id),
        projectId: paramSerializer('projectId', parameters?.projectId),
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns an issue security scheme along with its security levels.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project that uses the
   *   requested issue security scheme.
   */
  async getIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetIssueSecurityScheme | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns an issue security scheme along with its security levels.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *
   * - _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   * - _Administer Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for a project that uses the
   *   requested issue security scheme.
   */
  async getIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetIssueSecurityScheme | string,
    callback?: never,
  ): Promise<T>;
  async getIssueSecurityScheme<T = Models.SecurityScheme>(
    parameters: Parameters.GetIssueSecurityScheme | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the issue security scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueSecurityScheme<T = void>(
    parameters: Parameters.UpdateIssueSecurityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the issue security scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateIssueSecurityScheme<T = void>(
    parameters: Parameters.UpdateIssueSecurityScheme,
    callback?: never,
  ): Promise<T>;
  async updateIssueSecurityScheme<T = void>(
    parameters: Parameters.UpdateIssueSecurityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.id}`,
      method: 'PUT',
      data: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue security scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteSecurityScheme<T = void>(
    parameters: Parameters.DeleteSecurityScheme,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes an issue security scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteSecurityScheme<T = void>(parameters: Parameters.DeleteSecurityScheme, callback?: never): Promise<T>;
  async deleteSecurityScheme<T = void>(
    parameters: Parameters.DeleteSecurityScheme,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds levels and levels' members to the issue security scheme. You can add up to 100 levels per request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addSecurityLevel<T = void>(parameters: Parameters.AddSecurityLevel, callback: Callback<T>): Promise<void>;
  /**
   * Adds levels and levels' members to the issue security scheme. You can add up to 100 levels per request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addSecurityLevel<T = void>(parameters: Parameters.AddSecurityLevel, callback?: never): Promise<T>;
  async addSecurityLevel<T = void>(parameters: Parameters.AddSecurityLevel, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level`,
      method: 'PUT',
      data: {
        levels: parameters.levels,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the issue security level.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateSecurityLevel<T = void>(parameters: Parameters.UpdateSecurityLevel, callback: Callback<T>): Promise<void>;
  /**
   * Updates the issue security level.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async updateSecurityLevel<T = void>(parameters: Parameters.UpdateSecurityLevel, callback?: never): Promise<T>;
  async updateSecurityLevel<T = void>(
    parameters: Parameters.UpdateSecurityLevel,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level/${parameters.levelId}`,
      method: 'PUT',
      data: {
        description: parameters.description,
        name: parameters.name,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes an issue security level.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeLevel<T = unknown>(parameters: Parameters.RemoveLevel, callback: Callback<T>): Promise<void>;
  /**
   * Deletes an issue security level.
   *
   * This operation is
   * [asynchronous](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#async-operations). Follow the
   * `location` link in the response to determine the status of the task and use [Get
   * task](#api-rest-api-2-task-taskId-get) to obtain subsequent updates.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeLevel<T = unknown>(parameters: Parameters.RemoveLevel, callback?: never): Promise<T>;
  async removeLevel<T = unknown>(parameters: Parameters.RemoveLevel, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level/${parameters.levelId}`,
      method: 'DELETE',
      params: {
        replaceWith: parameters.replaceWith,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds members to the issue security level. You can add up to 100 members per request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addSecurityLevelMembers<T = void>(
    parameters: Parameters.AddSecurityLevelMembers,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Adds members to the issue security level. You can add up to 100 members per request.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async addSecurityLevelMembers<T = void>(parameters: Parameters.AddSecurityLevelMembers, callback?: never): Promise<T>;
  async addSecurityLevelMembers<T = void>(
    parameters: Parameters.AddSecurityLevelMembers,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level/${parameters.levelId}/member`,
      method: 'PUT',
      data: {
        members: parameters.members,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes an issue security level member from an issue security scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeMemberFromSecurityLevel<T = void>(
    parameters: Parameters.RemoveMemberFromSecurityLevel,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Removes an issue security level member from an issue security scheme.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async removeMemberFromSecurityLevel<T = void>(
    parameters: Parameters.RemoveMemberFromSecurityLevel,
    callback?: never,
  ): Promise<T>;
  async removeMemberFromSecurityLevel<T = void>(
    parameters: Parameters.RemoveMemberFromSecurityLevel,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/issuesecurityschemes/${parameters.schemeId}/level/${parameters.levelId}/member/${parameters.memberId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
