import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class ProjectVersions {
  constructor(private client: Client) {}

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * versions in a project. See the [Get project versions](#api-rest-api-3-project-projectIdOrKey-versions-get) resource
   * if you want to get a full list of versions without pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectVersionsPaginated<T = Models.PageVersion>(
    parameters: Parameters.GetProjectVersionsPaginated | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all
   * versions in a project. See the [Get project versions](#api-rest-api-3-project-projectIdOrKey-versions-get) resource
   * if you want to get a full list of versions without pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectVersionsPaginated<T = Models.PageVersion>(
    parameters: Parameters.GetProjectVersionsPaginated | string,
    callback?: never,
  ): Promise<T>;
  async getProjectVersionsPaginated<T = Models.PageVersion>(
    parameters: Parameters.GetProjectVersionsPaginated | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/3/project/${projectIdOrKey}/version`,
      method: 'GET',
      params: {
        startAt: typeof parameters !== 'string' && parameters.startAt,
        maxResults: typeof parameters !== 'string' && parameters.maxResults,
        orderBy: typeof parameters !== 'string' && parameters.orderBy,
        query: typeof parameters !== 'string' && parameters.query,
        status: typeof parameters !== 'string' && parameters.status,
        expand: typeof parameters !== 'string' && parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns all versions in a project. The response is not paginated. Use [Get project versions
   * paginated](#api-rest-api-3-project-projectIdOrKey-version-get) if you want to get the versions in a project with
   * pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectVersions<T = Models.Version[]>(
    parameters: Parameters.GetProjectVersions | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns all versions in a project. The response is not paginated. Use [Get project versions
   * paginated](#api-rest-api-3-project-projectIdOrKey-version-get) if you want to get the versions in a project with
   * pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectVersions<T = Models.Version[]>(
    parameters: Parameters.GetProjectVersions | string,
    callback?: never,
  ): Promise<T>;
  async getProjectVersions<T = Models.Version[]>(
    parameters: Parameters.GetProjectVersions | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const projectIdOrKey = typeof parameters === 'string' ? parameters : parameters.projectIdOrKey;

    const config: RequestConfig = {
      url: `/rest/api/3/project/${projectIdOrKey}/versions`,
      method: 'GET',
      params: {
        expand: typeof parameters !== 'string' && parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project the version is added to.
   */
  async createVersion<T = Models.Version>(parameters: Parameters.CreateVersion, callback: Callback<T>): Promise<void>;
  /**
   * Creates a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project the version is added to.
   */
  async createVersion<T = Models.Version>(parameters: Parameters.CreateVersion, callback?: never): Promise<T>;
  async createVersion<T = Models.Version>(
    parameters: Parameters.CreateVersion,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/version',
      method: 'POST',
      data: {
        approvers: parameters.approvers,
        archived: parameters.archived,
        description: parameters.description,
        driver: parameters.driver,
        expand: parameters.expand,
        id: parameters.id,
        issuesStatusForFixVersion: parameters.issuesStatusForFixVersion,
        moveUnfixedIssuesTo: parameters.moveUnfixedIssuesTo,
        name: parameters.name,
        operations: parameters.operations,
        overdue: parameters.overdue,
        projectId: parameters.projectId,
        releaseDate: parameters.releaseDate,
        released: parameters.released,
        self: parameters.self,
        startDate: parameters.startDate,
        userReleaseDate: parameters.userReleaseDate,
        userStartDate: parameters.userStartDate,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version.
   */
  async getVersion<T = Models.Version>(
    parameters: Parameters.GetVersion | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version.
   */
  async getVersion<T = Models.Version>(parameters: Parameters.GetVersion | string, callback?: never): Promise<T>;
  async getVersion<T = Models.Version>(
    parameters: Parameters.GetVersion | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/version/${id}`,
      method: 'GET',
      params: {
        expand: typeof parameters !== 'string' && parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback: Callback<T>): Promise<void>;
  /**
   * Updates a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback?: never): Promise<T>;
  async updateVersion<T = Models.Version>(
    parameters: Parameters.UpdateVersion,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}`,
      method: 'PUT',
      data: {
        approvers: parameters.approvers,
        driver: parameters.driver,
        expand: parameters.expand,
        description: parameters.description,
        name: parameters.name,
        archived: parameters.archived,
        released: parameters.released,
        startDate: parameters.startDate,
        releaseDate: parameters.releaseDate,
        projectId: parameters.projectId,
        moveUnfixedIssuesTo: parameters.moveUnfixedIssuesTo,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any
   * occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.
   *
   * Consider using [ Delete and replace version](#api-rest-api-3-version-id-removeAndSwap-post) instead. This resource
   * supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback: Callback<T>): Promise<void>;
  /**
   * Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any
   * occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.
   *
   * Consider using [ Delete and replace version](#api-rest-api-3-version-id-removeAndSwap-post) instead. This resource
   * supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback?: never): Promise<T>;
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Modifies the version's sequence within the project, which affects the display order of the versions in Jira.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ project permission for the project that contains the version.
   */
  async moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback: Callback<T>): Promise<void>;
  /**
   * Modifies the version's sequence within the project, which affects the display order of the versions in Jira.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ project permission for the project that contains the version.
   */
  async moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback?: never): Promise<T>;
  async moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/move`,
      method: 'POST',
      data: {
        after: parameters.after,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the following counts for a version:
   *
   * - Number of issues where the `fixVersion` is set to the version.
   * - Number of issues where the `affectedVersion` is set to the version.
   * - Number of issues where a version custom field is set to the version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ project permission for the project that contains the version.
   */
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(
    parameters: Parameters.GetVersionRelatedIssues | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns the following counts for a version:
   *
   * - Number of issues where the `fixVersion` is set to the version.
   * - Number of issues where the `affectedVersion` is set to the version.
   * - Number of issues where a version custom field is set to the version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ project permission for the project that contains the version.
   */
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(
    parameters: Parameters.GetVersionRelatedIssues | string,
    callback?: never,
  ): Promise<T>;
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(
    parameters: Parameters.GetVersionRelatedIssues | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/version/${id}/relatedIssueCounts`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns related work items for the given version id.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version.
   */
  async getRelatedWork<T = Models.VersionRelatedWork[]>(
    parameters: Parameters.GetRelatedWork,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns related work items for the given version id.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version.
   */
  async getRelatedWork<T = Models.VersionRelatedWork[]>(
    parameters: Parameters.GetRelatedWork,
    callback?: never,
  ): Promise<T>;
  async getRelatedWork<T = Models.VersionRelatedWork[]>(
    parameters: Parameters.GetRelatedWork,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/relatedwork`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a related work for the given version. You can only create a generic link type of related works via this
   * API. relatedWorkId will be auto-generated UUID, that does not need to be provided.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Resolve issues:_ and _Edit issues_ [Managing project
   * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
   * project that contains the version.
   */
  async createRelatedWork<T = Models.VersionRelatedWork>(
    parameters: Parameters.CreateRelatedWork,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Creates a related work for the given version. You can only create a generic link type of related works via this
   * API. relatedWorkId will be auto-generated UUID, that does not need to be provided.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Resolve issues:_ and _Edit issues_ [Managing project
   * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
   * project that contains the version.
   */
  async createRelatedWork<T = Models.VersionRelatedWork>(
    parameters: Parameters.CreateRelatedWork,
    callback?: never,
  ): Promise<T>;
  async createRelatedWork<T = Models.VersionRelatedWork>(
    parameters: Parameters.CreateRelatedWork,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/relatedwork`,
      method: 'POST',
      data: {
        category: parameters.category,
        issueId: parameters.issueId,
        relatedWorkId: parameters.relatedWorkId,
        title: parameters.title,
        url: parameters.url,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates the given related work. You can only update generic link related works via Rest APIs. Any archived version
   * related works can't be edited.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Resolve issues:_ and _Edit issues_ [Managing project
   * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
   * project that contains the version.
   */
  async updateRelatedWork<T = Models.VersionRelatedWork>(
    parameters: Parameters.UpdateRelatedWork,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Updates the given related work. You can only update generic link related works via Rest APIs. Any archived version
   * related works can't be edited.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Resolve issues:_ and _Edit issues_ [Managing project
   * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
   * project that contains the version.
   */
  async updateRelatedWork<T = Models.VersionRelatedWork>(
    parameters: Parameters.UpdateRelatedWork,
    callback?: never,
  ): Promise<T>;
  async updateRelatedWork<T = Models.VersionRelatedWork>(
    parameters: Parameters.UpdateRelatedWork,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/relatedwork`,
      method: 'PUT',
      data: {
        category: parameters.category,
        issueId: parameters.issueId,
        relatedWorkId: parameters.relatedWorkId,
        title: parameters.title,
        url: parameters.url,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a project version.
   *
   * Alternative versions can be provided to update issues that use the deleted version in `fixVersion`,
   * `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of
   * `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are
   * cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version
   * being deleted.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async deleteAndReplaceVersion<T = void>(
    parameters: Parameters.DeleteAndReplaceVersion,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Deletes a project version.
   *
   * Alternative versions can be provided to update issues that use the deleted version in `fixVersion`,
   * `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of
   * `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are
   * cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version
   * being deleted.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
   * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback?: never): Promise<T>;
  async deleteAndReplaceVersion<T = void>(
    parameters: Parameters.DeleteAndReplaceVersion,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/removeAndSwap`,
      method: 'POST',
      data: {
        customFieldReplacementList: parameters.customFieldReplacementList,
        moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
        moveFixIssuesTo: parameters.moveFixIssuesTo,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns counts of the issues and unresolved issues for the project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ project permission for the project that contains the version.
   */
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(
    parameters: Parameters.GetVersionUnresolvedIssues | string,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Returns counts of the issues and unresolved issues for the project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** _Browse
   * projects_ project permission for the project that contains the version.
   */
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(
    parameters: Parameters.GetVersionUnresolvedIssues | string,
    callback?: never,
  ): Promise<T>;
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(
    parameters: Parameters.GetVersionUnresolvedIssues | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/3/version/${id}/unresolvedIssueCount`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes the given related work for the given version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Resolve issues:_ and _Edit issues_ [Managing project
   * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
   * project that contains the version.
   */
  async deleteRelatedWork<T = void>(parameters: Parameters.DeleteRelatedWork, callback: Callback<T>): Promise<void>;
  /**
   * Deletes the given related work for the given version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:**
   * _Resolve issues:_ and _Edit issues_ [Managing project
   * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
   * project that contains the version.
   */
  async deleteRelatedWork<T = void>(parameters: Parameters.DeleteRelatedWork, callback?: never): Promise<T>;
  async deleteRelatedWork<T = void>(
    parameters: Parameters.DeleteRelatedWork,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.versionId}/relatedwork/${parameters.relatedWorkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
