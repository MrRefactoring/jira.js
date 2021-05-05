import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ProjectVersions {
  constructor(private client: Client) {
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all versions in a project. See the [Get project versions](#api-rest-api-3-project-projectIdOrKey-versions-get) resource if you want to get a full list of versions without pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: Parameters.GetProjectVersionsPaginated, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of all versions in a project. See the [Get project versions](#api-rest-api-3-project-projectIdOrKey-versions-get) resource if you want to get a full list of versions without pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: Parameters.GetProjectVersionsPaginated, callback?: never): Promise<T>;
  async getProjectVersionsPaginated<T = Models.PageBeanVersion>(parameters: Parameters.GetProjectVersionsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/version`,
      method: 'GET',
      params: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        query: parameters.query,
        status: parameters.status,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.getProjectVersionsPaginated' });
  }

  /**
   * Returns all versions in a project. The response is not paginated. Use [Get project versions paginated](#api-rest-api-3-project-projectIdOrKey-version-get) if you want to get the versions in a project with pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProjectVersions<T = Models.Version[]>(parameters: Parameters.GetProjectVersions, callback: Callback<T>): Promise<void>;
  /**
   * Returns all versions in a project. The response is not paginated. Use [Get project versions paginated](#api-rest-api-3-project-projectIdOrKey-version-get) if you want to get the versions in a project with pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project. */
  async getProjectVersions<T = Models.Version[]>(parameters: Parameters.GetProjectVersions, callback?: never): Promise<T>;
  async getProjectVersions<T = Models.Version[]>(parameters: Parameters.GetProjectVersions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/project/${parameters.projectIdOrKey}/versions`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.getProjectVersions' });
  }

  /**
   * Creates a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project the version is added to. */
  async createVersion<T = Models.Version>(parameters: Parameters.CreateVersion | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project the version is added to. */
  async createVersion<T = Models.Version>(parameters?: Parameters.CreateVersion, callback?: never): Promise<T>;
  async createVersion<T = Models.Version>(parameters?: Parameters.CreateVersion, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/version',
      method: 'POST',
      data: {
        expand: parameters?.expand,
        self: parameters?.self,
        id: parameters?.id,
        description: parameters?.description,
        name: parameters?.name,
        archived: parameters?.archived,
        released: parameters?.released,
        startDate: parameters?.startDate,
        releaseDate: parameters?.releaseDate,
        overdue: parameters?.overdue,
        userStartDate: parameters?.userStartDate,
        userReleaseDate: parameters?.userReleaseDate,
        project: parameters?.project,
        projectId: parameters?.projectId,
        moveUnfixedIssuesTo: parameters?.moveUnfixedIssuesTo,
        operations: parameters?.operations,
        issuesStatusForFixVersion: parameters?.issuesStatusForFixVersion,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.createVersion' });
  }

  /**
   * Returns a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version. */
  async getVersion<T = Models.Version>(parameters: Parameters.GetVersion, callback: Callback<T>): Promise<void>;
  /**
   * Returns a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version. */
  async getVersion<T = Models.Version>(parameters: Parameters.GetVersion, callback?: never): Promise<T>;
  async getVersion<T = Models.Version>(parameters: Parameters.GetVersion, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.getVersion' });
  }

  /**
   * Updates a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version. */
  async updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback: Callback<T>): Promise<void>;
  /**
   * Updates a project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version. */
  async updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback?: never): Promise<T>;
  async updateVersion<T = Models.Version>(parameters: Parameters.UpdateVersion, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}`,
      method: 'PUT',
      data: {
        expand: parameters.expand,
        description: parameters.description,
        name: parameters.name,
        archived: parameters.archived,
        released: parameters.released,
        startDate: parameters.startDate,
        releaseDate: parameters.releaseDate,
        project: parameters.project,
        projectId: parameters.projectId,
        moveUnfixedIssuesTo: parameters.moveUnfixedIssuesTo,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.updateVersion' });
  }

  /**
   * Deletes a project version.
   *
   * @deprecated Deprecated, use [ Delete and replace version](#api-rest-api-3-version-id-removeAndSwap-post) that supports swapping version values in custom fields, in addition to the swapping for `fixVersion` and `affectedVersion` provided in this resource.
   *
   * Alternative versions can be provided to update issues that use the deleted version in `fixVersion` or `affectedVersion`. If alternatives are not provided, occurrences of `fixVersion` and `affectedVersion` that contain the deleted version are cleared.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version. */
  async deleteVersion<T = void>(parameters: Parameters.DeleteVersion, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a project version.
   *
   * @deprecated Deprecated, use [ Delete and replace version](#api-rest-api-3-version-id-removeAndSwap-post) that supports swapping version values in custom fields, in addition to the swapping for `fixVersion` and `affectedVersion` provided in this resource.
   *
   * Alternative versions can be provided to update issues that use the deleted version in `fixVersion` or `affectedVersion`. If alternatives are not provided, occurrences of `fixVersion` and `affectedVersion` that contain the deleted version are cleared.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version. */
  async deleteVersion<T = void>(parameters: Parameters.DeleteVersion, callback?: never): Promise<T>;
  async deleteVersion<T = void>(parameters: Parameters.DeleteVersion, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}`,
      method: 'DELETE',
      params: {
        moveFixIssuesTo: parameters.moveFixIssuesTo,
        moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.deleteVersion' });
  }

  /**
   * Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.
   *
   * Consider using [ Delete and replace version](#api-rest-api-3-version-id-removeAndSwap-post) instead. This resource supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version. */
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback: Callback<T>): Promise<void>;
  /**
   * Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.
   *
   * Consider using [ Delete and replace version](#api-rest-api-3-version-id-removeAndSwap-post) instead. This resource supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version. */
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback?: never): Promise<T>;
  async mergeVersions<T = void>(parameters: Parameters.MergeVersions, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.mergeVersions' });
  }

  /**
   * Modifies the version's sequence within the project, which affects the display order of the versions in Jira.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* project permission for the project that contains the version. */
  async moveVersion<T = Models.Version>(parameters: Parameters.MoveVersion, callback: Callback<T>): Promise<void>;
  /**
   * Modifies the version's sequence within the project, which affects the display order of the versions in Jira.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* project permission for the project that contains the version. */
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

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.moveVersion' });
  }

  /**
   * Returns the following counts for a version:
   *
   *  *  Number of issues where the `fixVersion` is set to the version.
   *  *  Number of issues where the `affectedVersion` is set to the version.
   *  *  Number of issues where a version custom field is set to the version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* project permission for the project that contains the version. */
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: Parameters.GetVersionRelatedIssues, callback: Callback<T>): Promise<void>;
  /**
   * Returns the following counts for a version:
   *
   *  *  Number of issues where the `fixVersion` is set to the version.
   *  *  Number of issues where the `affectedVersion` is set to the version.
   *  *  Number of issues where a version custom field is set to the version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* project permission for the project that contains the version. */
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: Parameters.GetVersionRelatedIssues, callback?: never): Promise<T>;
  async getVersionRelatedIssues<T = Models.VersionIssueCounts>(parameters: Parameters.GetVersionRelatedIssues, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/relatedIssueCounts`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.getVersionRelatedIssues' });
  }

  /**
   * Deletes a project version.
   *
   * Alternative versions can be provided to update issues that use the deleted version in `fixVersion`, `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version being deleted.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version. */
  async deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a project version.
   *
   * Alternative versions can be provided to update issues that use the deleted version in `fixVersion`, `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are cleared. Any replacement version must be in the same project as the version being deleted and cannot be the version being deleted.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) or *Administer Projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version. */
  async deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback?: never): Promise<T>;
  async deleteAndReplaceVersion<T = void>(parameters: Parameters.DeleteAndReplaceVersion, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/removeAndSwap`,
      method: 'POST',
      data: {
        moveFixIssuesTo: parameters.moveFixIssuesTo,
        moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
        customFieldReplacementList: parameters.customFieldReplacementList,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.deleteAndReplaceVersion' });
  }

  /**
   * Returns counts of the issues and unresolved issues for the project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* project permission for the project that contains the version. */
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: Parameters.GetVersionUnresolvedIssues, callback: Callback<T>): Promise<void>;
  /**
   * Returns counts of the issues and unresolved issues for the project version.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** *Browse projects* project permission for the project that contains the version. */
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: Parameters.GetVersionUnresolvedIssues, callback?: never): Promise<T>;
  async getVersionUnresolvedIssues<T = Models.VersionUnresolvedIssuesCount>(parameters: Parameters.GetVersionUnresolvedIssues, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/version/${parameters.id}/unresolvedIssueCount`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.projectVersions.getVersionUnresolvedIssues' });
  }
}
