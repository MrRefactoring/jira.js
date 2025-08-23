import type { Client } from '../client';
import type { Request } from '../request';
import type { GetProjectVersionsPaginatedParameters } from './parameters/getProjectVersionsPaginatedParameters';
import type { GetProjectVersionsParameters } from './parameters/getProjectVersionsParameters';
import type { CreateVersionParameters } from './parameters/createVersionParameters';
import type { GetVersionParameters } from './parameters/getVersionParameters';
import type { UpdateVersionParameters } from './parameters/updateVersionParameters';
import type { MergeVersionsParameters } from './parameters/mergeVersionsParameters';
import type { MoveVersionParameters } from './parameters/moveVersionParameters';
import type { GetVersionRelatedIssuesParameters } from './parameters/getVersionRelatedIssuesParameters';
import type { GetRelatedWorkParameters } from './parameters/getRelatedWorkParameters';
import type { CreateRelatedWorkParameters } from './parameters/createRelatedWorkParameters';
import type { UpdateRelatedWorkParameters } from './parameters/updateRelatedWorkParameters';
import type { DeleteAndReplaceVersionParameters } from './parameters/deleteAndReplaceVersionParameters';
import type { GetVersionUnresolvedIssuesParameters } from './parameters/getVersionUnresolvedIssuesParameters';
import type { DeleteRelatedWorkParameters } from './parameters/deleteRelatedWorkParameters';

export class ProjectVersions {
  constructor(private client: Client) {}
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of all
   * versions in a project. See the [Get project versions](#api-rest-api-2-project-projectIdOrKey-versions-get) resource
   * if you want to get a full list of versions without pagination. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectVersionsPaginated(parameters: GetProjectVersionsPaginatedParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/version`,
      method: 'GET',
      query: {
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        orderBy: parameters.orderBy,
        query: parameters.query,
        status: parameters.status,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns all versions in a project. The response is not paginated. Use [Get project versions
   * paginated](#api-rest-api-2-project-projectIdOrKey-version-get) if you want to get the versions in a project with
   * pagination. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
   */
  async getProjectVersions(parameters: GetProjectVersionsParameters) {
    const request: Request = {
      url: `/rest/api/2/project/${parameters.projectIdOrKey}/versions`,
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a project version. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_
   *   [project permission](https://confluence.atlassian.com/x/yodKLg) for the project the version is added to.
   */
  async createVersion(parameters: CreateVersionParameters) {
    const request: Request = {
      url: '/rest/api/2/version',
      method: 'POST',
      body: {
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
        project: parameters.project,
        projectId: parameters.projectId,
        releaseDate: parameters.releaseDate,
        released: parameters.released,
        self: parameters.self,
        startDate: parameters.startDate,
        userReleaseDate: parameters.userReleaseDate,
        userStartDate: parameters.userStartDate,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a project version. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *   version.
   */
  async getVersion(parameters: GetVersionParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}`,
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a project version. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_
   *   [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async updateVersion(parameters: UpdateVersionParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}`,
      method: 'PUT',
      body: {
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
        project: parameters.project,
        projectId: parameters.projectId,
        releaseDate: parameters.releaseDate,
        released: parameters.released,
        self: parameters.self,
        startDate: parameters.startDate,
        userReleaseDate: parameters.userReleaseDate,
        userStartDate: parameters.userStartDate,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any
   * occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`. *
   *
   * - Consider using [ Delete and replace version](#api-rest-api-2-version-id-removeAndSwap-post) instead. This resource
   *   supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_
   *   [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async mergeVersions(parameters: MergeVersionsParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Modifies the version's sequence within the project, which affects the display order of the versions in Jira. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ project permission for the project that contains the version.
   */
  async moveVersion(parameters: MoveVersionParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}/move`,
      method: 'POST',
      body: {
        after: parameters.after,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the following counts for a version: *
   *
   * - - Number of issues where the `fixVersion` is set to the version.
   * - - Number of issues where the `affectedVersion` is set to the version.
   * - - Number of issues where a version custom field is set to the version.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ project permission for the project that contains the version.
   */
  async getVersionRelatedIssues(parameters: GetVersionRelatedIssuesParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}/relatedIssueCounts`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns related work items for the given version id. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the
   *   version.
   */
  async getRelatedWork(parameters: GetRelatedWorkParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}/relatedwork`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a related work for the given version. You can only create a generic link type of related works via this
   * API. relatedWorkId will be auto-generated UUID, that does not need to be provided. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Resolve issues:_ and _Edit issues_ [Managing project
   *   permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for
   *   the project that contains the version.
   */
  async createRelatedWork(parameters: CreateRelatedWorkParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}/relatedwork`,
      method: 'POST',
      body: {
        category: parameters.category,
        issueId: parameters.issueId,
        relatedWorkId: parameters.relatedWorkId,
        title: parameters.title,
        url: parameters.url,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates the given related work. You can only update generic link related works via Rest APIs. Any archived version
   * related works can't be edited. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Resolve issues:_ and _Edit issues_ [Managing project
   *   permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for
   *   the project that contains the version.
   */
  async updateRelatedWork(parameters: UpdateRelatedWorkParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}/relatedwork`,
      method: 'PUT',
      body: {
        category: parameters.category,
        issueId: parameters.issueId,
        relatedWorkId: parameters.relatedWorkId,
        title: parameters.title,
        url: parameters.url,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a project version. *
   *
   * - Alternative versions can be provided to update issues that use the deleted version in `fixVersion`,
   *   `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of
   *   `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are
   *   cleared. Any replacement version must be in the same project as the version being deleted and cannot be the
   *   version being deleted.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_
   *   [project permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
   */
  async deleteAndReplaceVersion(parameters: DeleteAndReplaceVersionParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}/removeAndSwap`,
      method: 'POST',
      body: {
        customFieldReplacementList: parameters.customFieldReplacementList,
        moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
        moveFixIssuesTo: parameters.moveFixIssuesTo,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns counts of the issues and unresolved issues for the project version. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** _Browse
   *   projects_ project permission for the project that contains the version.
   */
  async getVersionUnresolvedIssues(parameters: GetVersionUnresolvedIssuesParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.id}/unresolvedIssueCount`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes the given related work for the given version. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   _Resolve issues:_ and _Edit issues_ [Managing project
   *   permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for
   *   the project that contains the version.
   */
  async deleteRelatedWork(parameters: DeleteRelatedWorkParameters) {
    const request: Request = {
      url: `/rest/api/2/version/${parameters.versionId}/relatedwork/${parameters.relatedWorkId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }
}
