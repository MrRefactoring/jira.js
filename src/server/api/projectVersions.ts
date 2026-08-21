import { VersionSchema, type Version } from '../models/version';
import { RemoteEntityLinksJsonSchema, type RemoteEntityLinksJson } from '../models/remoteEntityLinksJson';
import { VersionIssueCountsSchema, type VersionIssueCounts } from '../models/versionIssueCounts';
import {
  VersionUnresolvedIssueCountsSchema,
  type VersionUnresolvedIssueCounts,
} from '../models/versionUnresolvedIssueCounts';
import { RemoteEntityLinkJsonSchema, type RemoteEntityLinkJson } from '../models/remoteEntityLinkJson';
import type { GetPaginatedVersions } from '../parameters/getPaginatedVersions';
import type { CreateVersion } from '../parameters/createVersion';
import type { GetRemoteVersionLinks } from '../parameters/getRemoteVersionLinks';
import type { GetVersion } from '../parameters/getVersion';
import type { UpdateVersion } from '../parameters/updateVersion';
import type { Merge } from '../parameters/merge';
import type { MoveVersion } from '../parameters/moveVersion';
import type { GetVersionRelatedIssues } from '../parameters/getVersionRelatedIssues';
import type { DeleteVersionAndSwap } from '../parameters/deleteVersionAndSwap';
import type { GetVersionUnresolvedIssues } from '../parameters/getVersionUnresolvedIssues';
import type { GetRemoteVersionLinksByVersionId } from '../parameters/getRemoteVersionLinksByVersionId';
import type { CreateOrUpdateRemoteVersionLink } from '../parameters/createOrUpdateRemoteVersionLink';
import type { DeleteRemoteVersionLinksByVersionId } from '../parameters/deleteRemoteVersionLinksByVersionId';
import type { GetRemoteVersionLink } from '../parameters/getRemoteVersionLink';
import type { CreateOrUpdateRemoteVersionLinkByGlobalId } from '../parameters/createOrUpdateRemoteVersionLinkByGlobalId';
import type { DeleteRemoteVersionLink } from '../parameters/deleteRemoteVersionLink';
import type { Client, SendRequestOptions } from '#/core';

/** Retrieve paginated collection of versions matching given query optionally filtered by given project IDs. */
export async function getPaginatedVersions(client: Client, parameters?: GetPaginatedVersions): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: '/rest/api/2/version',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      projectIds: parameters?.projectIds,
      startAt: parameters?.startAt,
    },
    schema: VersionSchema,
  };

  return await client.sendRequest(config);
}

/** Creates a version. */
export async function createVersion(client: Client, parameters: CreateVersion): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: '/rest/api/2/version',
    method: 'POST',
    body: {
      archived: parameters.archived,
      description: parameters.description,
      expand: parameters.expand,
      id: parameters.id,
      moveUnfixedIssuesTo: parameters.moveUnfixedIssuesTo,
      name: parameters.name,
      overdue: parameters.overdue,
      project: parameters.project,
      projectId: parameters.projectId,
      releaseDate: parameters.releaseDate,
      releaseDateSet: parameters.releaseDateSet,
      released: parameters.released,
      self: parameters.self,
      startDate: parameters.startDate,
      startDateSet: parameters.startDateSet,
      userReleaseDate: parameters.userReleaseDate,
      userStartDate: parameters.userStartDate,
    },
    schema: VersionSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the remote version links for a given global ID. */
export async function getRemoteVersionLinks(
  client: Client,
  parameters?: GetRemoteVersionLinks,
): Promise<RemoteEntityLinksJson> {
  const config: SendRequestOptions<RemoteEntityLinksJson> = {
    url: '/rest/api/2/version/remotelink',
    method: 'GET',
    searchParams: {
      globalId: parameters?.globalId,
    },
    schema: RemoteEntityLinksJsonSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a version. */
export async function getVersion(client: Client, parameters: GetVersion): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: `/rest/api/2/version/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: VersionSchema,
  };

  return await client.sendRequest(config);
}

/** Updates a version. */
export async function updateVersion(client: Client, parameters: UpdateVersion): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/version/${parameters.id}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/** Merge versions */
export async function merge(client: Client, parameters: Merge): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/version/${parameters.id}/mergeto/${parameters.moveIssuesTo}`,
    method: 'PUT',
  };

  return await client.sendRequest(config);
}

/**
 * Modify a version's sequence within a project. The move version bean has 2 alternative field value pairs:
 *
 * - Position: An absolute position, which may have a value of 'First', 'Last', 'Earlier' or 'Later'
 * - After: A version to place this version after. The value should be the self link of another version
 */
export async function moveVersion(client: Client, parameters: MoveVersion): Promise<Version> {
  const config: SendRequestOptions<Version> = {
    url: `/rest/api/2/version/${parameters.id}/move`,
    method: 'POST',
    body: {
      after: parameters.after,
      position: parameters.position,
    },
    schema: VersionSchema,
  };

  return await client.sendRequest(config);
}

/** Returns a bean containing the number of fixed in and affected issues for the given version. */
export async function getVersionRelatedIssues(
  client: Client,
  parameters: GetVersionRelatedIssues,
): Promise<VersionIssueCounts> {
  const config: SendRequestOptions<VersionIssueCounts> = {
    url: `/rest/api/2/version/${parameters.id}/relatedIssueCounts`,
    method: 'GET',
    schema: VersionIssueCountsSchema,
  };

  return await client.sendRequest(config);
}

/** Delete a project version, removed values will be replaced with ones specified by the parameters. */
export async function deleteVersionAndSwap(client: Client, parameters: DeleteVersionAndSwap): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/version/${parameters.id}/removeAndSwap`,
    method: 'POST',
    body: {
      customFieldReplacementList: parameters.customFieldReplacementList,
      moveAffectedIssuesTo: parameters.moveAffectedIssuesTo,
      moveFixIssuesTo: parameters.moveFixIssuesTo,
    },
  };

  return await client.sendRequest(config);
}

/** Returns the number of unresolved issues for the given version */
export async function getVersionUnresolvedIssues(
  client: Client,
  parameters: GetVersionUnresolvedIssues,
): Promise<VersionUnresolvedIssueCounts> {
  const config: SendRequestOptions<VersionUnresolvedIssueCounts> = {
    url: `/rest/api/2/version/${parameters.id}/unresolvedIssueCount`,
    method: 'GET',
    schema: VersionUnresolvedIssueCountsSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the remote version links associated with the given version ID. */
export async function getRemoteVersionLinksByVersionId(
  client: Client,
  parameters: GetRemoteVersionLinksByVersionId,
): Promise<RemoteEntityLinksJson> {
  const config: SendRequestOptions<RemoteEntityLinksJson> = {
    url: `/rest/api/2/version/${parameters.versionId}/remotelink`,
    method: 'GET',
    schema: RemoteEntityLinksJsonSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Create a remote version link via POST. The link's global ID will be taken from the JSON payload if provided;
 * otherwise, it will be generated.
 */
export async function createOrUpdateRemoteVersionLink(
  client: Client,
  parameters: CreateOrUpdateRemoteVersionLink,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/version/${parameters.versionId}/remotelink`,
    method: 'POST',
    body: {
      link: parameters.link,
      name: parameters.name,
      self: parameters.self,
    },
  };

  return await client.sendRequest(config);
}

/** Delete all remote version links for a given version ID. */
export async function deleteRemoteVersionLinksByVersionId(
  client: Client,
  parameters: DeleteRemoteVersionLinksByVersionId,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/version/${parameters.versionId}/remotelink`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Returns the remote version link associated with the given version ID and global ID. */
export async function getRemoteVersionLink(
  client: Client,
  parameters: GetRemoteVersionLink,
): Promise<RemoteEntityLinkJson> {
  const config: SendRequestOptions<RemoteEntityLinkJson> = {
    url: `/rest/api/2/version/${parameters.versionId}/remotelink/${parameters.globalId}`,
    method: 'GET',
    schema: RemoteEntityLinkJsonSchema,
  };

  return await client.sendRequest(config);
}

/** Create a remote version link via POST using the provided global ID. */
export async function createOrUpdateRemoteVersionLinkByGlobalId(
  client: Client,
  parameters: CreateOrUpdateRemoteVersionLinkByGlobalId,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/version/${parameters.versionId}/remotelink/${parameters.globalId}`,
    method: 'POST',
    body: {
      link: parameters.link,
      name: parameters.name,
      self: parameters.self,
    },
  };

  return await client.sendRequest(config);
}

/** Delete a specific remote version link with the given version ID and global ID. */
export async function deleteRemoteVersionLink(client: Client, parameters: DeleteRemoteVersionLink): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/version/${parameters.versionId}/remotelink/${parameters.globalId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
