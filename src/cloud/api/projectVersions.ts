import { PageVersionSchema } from '../models/pageVersion';
import type { Page } from '../models/page';
import { VersionSchema, type Version } from '../models/version';
import { VersionIssueCountsSchema, type VersionIssueCounts } from '../models/versionIssueCounts';
import { VersionRelatedWorkSchema, type VersionRelatedWork } from '../models/versionRelatedWork';
import {
  VersionUnresolvedIssuesCountSchema,
  type VersionUnresolvedIssuesCount,
} from '../models/versionUnresolvedIssuesCount';
import type { GetProjectVersionsPaginated } from '../parameters/getProjectVersionsPaginated';
import type { GetProjectVersions } from '../parameters/getProjectVersions';
import type { CreateVersion } from '../parameters/createVersion';
import type { GetVersion } from '../parameters/getVersion';
import type { UpdateVersion } from '../parameters/updateVersion';
import type { MergeVersions } from '../parameters/mergeVersions';
import type { MoveVersion } from '../parameters/moveVersion';
import type { GetVersionRelatedIssues } from '../parameters/getVersionRelatedIssues';
import type { GetRelatedWork } from '../parameters/getRelatedWork';
import type { CreateRelatedWork } from '../parameters/createRelatedWork';
import type { UpdateRelatedWork } from '../parameters/updateRelatedWork';
import type { DeleteAndReplaceVersion } from '../parameters/deleteAndReplaceVersion';
import type { GetVersionUnresolvedIssues } from '../parameters/getVersionUnresolvedIssues';
import type { DeleteRelatedWork } from '../parameters/deleteRelatedWork';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of all
 * versions in a project. See the [Get project
 * versions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project/#api-rest-api-3-project-projectIdOrKey-versions-get)
 * resource if you want to get a full list of versions without pagination.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getProjectVersionsPaginated(
  client: Client,
  parameters: GetProjectVersionsPaginated,
  options?: RequestOptions,
): Promise<Page<Version>> {
  const config: SendRequestOptions<Page<Version>> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/version`,
    method: 'GET',
    searchParams: {
      startAt: parameters.startAt,
      maxResults: parameters.maxResults,
      orderBy: parameters.orderBy,
      query: parameters.query,
      status: parameters.status,
      expand: parameters.expand,
    },
    schema: PageVersionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all versions in a project. The response is not paginated. Use [Get project versions
 * paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-project/#api-rest-api-3-project-projectIdOrKey-version-get)
 * if you want to get the versions in a project with pagination.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * Projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project.
 */
export async function getProjectVersions(
  client: Client,
  parameters: GetProjectVersions,
  options?: RequestOptions,
): Promise<Version[]> {
  const config: SendRequestOptions<Version[]> = {
    url: `/rest/api/3/project/${parameters.projectIdOrKey}/versions`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: z.array(VersionSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a project version.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg) for the project the version is added to.
 */
export async function createVersion(
  client: Client,
  parameters: CreateVersion,
  options?: RequestOptions,
): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: '/rest/api/3/version',
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
      projectId: parameters.projectId,
      releaseDate: parameters.releaseDate,
      released: parameters.released,
      self: parameters.self,
      startDate: parameters.startDate,
      userReleaseDate: parameters.userReleaseDate,
      userStartDate: parameters.userStartDate,
    },
    schema: VersionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a project version.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version.
 */
export async function getVersion(client: Client, parameters: GetVersion, options?: RequestOptions): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: `/rest/api/3/version/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: VersionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a project version.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
 */
export async function updateVersion(
  client: Client,
  parameters: UpdateVersion,
  options?: RequestOptions,
): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: `/rest/api/3/version/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
    schema: VersionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Merges two project versions. The merge is completed by deleting the version specified in `id` and replacing any
 * occurrences of its ID in `fixVersion` with the version ID specified in `moveIssuesTo`.
 *
 * Consider using [ Delete and replace
 * version](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-version/#api-rest-api-3-version-id-removeAndSwap-post)
 * instead. This resource supports swapping version values in `fixVersion`, `affectedVersion`, and custom fields.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
 */
export async function mergeVersions(
  client: Client,
  parameters: MergeVersions,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
    method: 'PUT',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Modifies the version's sequence within the project, which affects the display order of the versions in Jira.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ project permission for the project that contains the version.
 */
export async function moveVersion(client: Client, parameters: MoveVersion, options?: RequestOptions): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: `/rest/api/3/version/${parameters.id}/move`,
    method: 'POST',
    body: {
      after: parameters.after,
      position: parameters.position,
    },
    schema: VersionSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
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
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ project permission for the project that contains the version.
 */
export async function getVersionRelatedIssues(
  client: Client,
  parameters: GetVersionRelatedIssues,
  options?: RequestOptions,
): Promise<VersionIssueCounts> {
  const config: SendRequestOptions<VersionIssueCounts> = {
    url: `/rest/api/3/version/${parameters.id}/relatedIssueCounts`,
    method: 'GET',
    schema: VersionIssueCountsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns related work items for the given version id.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ [project permission](https://confluence.atlassian.com/x/yodKLg) for the project containing the version.
 */
export async function getRelatedWork(
  client: Client,
  parameters: GetRelatedWork,
  options?: RequestOptions,
): Promise<VersionRelatedWork[]> {
  const config: SendRequestOptions<VersionRelatedWork[]> = {
    url: `/rest/api/3/version/${parameters.id}/relatedwork`,
    method: 'GET',
    schema: z.array(VersionRelatedWorkSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a related work for the given version. You can only create a generic link type of related works via this API.
 * relatedWorkId will be auto-generated UUID, that does not need to be provided.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Resolve
 * issues:_ and _Edit issues_ [Managing project
 * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
 * project that contains the version.
 */
export async function createRelatedWork(
  client: Client,
  parameters: CreateRelatedWork,
  options?: RequestOptions,
): Promise<VersionRelatedWork> {
  const config: SendRequestOptions<VersionRelatedWork> = {
    url: `/rest/api/3/version/${parameters.id}/relatedwork`,
    method: 'POST',
    body: {
      category: parameters.category,
      issueId: parameters.issueId,
      relatedWorkId: parameters.relatedWorkId,
      title: parameters.title,
      url: parameters.url,
    },
    schema: VersionRelatedWorkSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates the given related work. You can only update generic link related works via Rest APIs. Any archived version
 * related works can't be edited.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Resolve
 * issues:_ and _Edit issues_ [Managing project
 * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
 * project that contains the version.
 */
export async function updateRelatedWork(
  client: Client,
  parameters: UpdateRelatedWork,
  options?: RequestOptions,
): Promise<VersionRelatedWork> {
  const config: SendRequestOptions<VersionRelatedWork> = {
    url: `/rest/api/3/version/${parameters.id}/relatedwork`,
    method: 'PUT',
    body: {
      category: parameters.category,
      issueId: parameters.issueId,
      relatedWorkId: parameters.relatedWorkId,
      title: parameters.title,
      url: parameters.url,
    },
    schema: VersionRelatedWorkSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a project version.
 *
 * Alternative versions can be provided to update issues that use the deleted version in `fixVersion`,
 * `affectedVersion`, or any version picker custom fields. If alternatives are not provided, occurrences of
 * `fixVersion`, `affectedVersion`, and any version picker custom field, that contain the deleted version, are cleared.
 * Any replacement version must be in the same project as the version being deleted and cannot be the version being
 * deleted.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:**
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) or _Administer Projects_ [project
 * permission](https://confluence.atlassian.com/x/yodKLg) for the project that contains the version.
 */
export async function deleteAndReplaceVersion(
  client: Client,
  parameters: DeleteAndReplaceVersion,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/version/${parameters.id}/removeAndSwap`,
    method: 'POST',
    body: {
      customFieldReplacementList: parameters.customFieldReplacementList,
      moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
      moveFixIssuesTo: parameters.moveFixIssuesTo,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns counts of the issues and unresolved issues for the project version.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Browse
 * projects_ project permission for the project that contains the version.
 */
export async function getVersionUnresolvedIssues(
  client: Client,
  parameters: GetVersionUnresolvedIssues,
  options?: RequestOptions,
): Promise<VersionUnresolvedIssuesCount> {
  const config: SendRequestOptions<VersionUnresolvedIssuesCount> = {
    url: `/rest/api/3/version/${parameters.id}/unresolvedIssueCount`,
    method: 'GET',
    schema: VersionUnresolvedIssuesCountSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes the given related work for the given version.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** _Resolve
 * issues:_ and _Edit issues_ [Managing project
 * permissions](https://confluence.atlassian.com/adminjiraserver/managing-project-permissions-938847145.html) for the
 * project that contains the version.
 */
export async function deleteRelatedWork(
  client: Client,
  parameters: DeleteRelatedWork,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/version/${parameters.versionId}/relatedwork/${parameters.relatedWorkId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
