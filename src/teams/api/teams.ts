import { TeamPaginationResultSchema, type TeamPaginationResult } from '../models/teamPaginationResult';
import { TeamResponseWithMembersSchema, type TeamResponseWithMembers } from '../models/teamResponseWithMembers';
import { BulkOperationResponseSchema, type BulkOperationResponse } from '../models/bulkOperationResponse';
import { TeamResponseSchema, type TeamResponse } from '../models/teamResponse';
import type { QueryTeams } from '../parameters/queryTeams';
import type { CreateTeam } from '../parameters/createTeam';
import type { ArchiveTeams } from '../parameters/archiveTeams';
import type { UnarchiveTeams } from '../parameters/unarchiveTeams';
import type { GetTeam } from '../parameters/getTeam';
import type { DeleteTeam } from '../parameters/deleteTeam';
import type { UpdateTeam } from '../parameters/updateTeam';
import type { RestoreTeam } from '../parameters/restoreTeam';
import type { UploadAndSetTeamCoverPhoto } from '../parameters/uploadAndSetTeamCoverPhoto';
import { type Client, type RequestOptions, type SendRequestOptions, toFormDataFile } from '#/core';

/**
 * This returns a list of all teams contained under an organization. This may be used as an option to export teams data
 * within your organization.
 */
export async function queryTeams(
  client: Client,
  parameters: QueryTeams,
  options?: RequestOptions,
): Promise<TeamPaginationResult> {
  const config: SendRequestOptions<TeamPaginationResult> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams`,
    method: 'GET',
    searchParams: {
      siteId: parameters.siteId,
      size: parameters.size,
      cursor: parameters.cursor,
    },
    schema: TeamPaginationResultSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Creates a team, and adds the requesting user as the initial member. */
export async function createTeam(
  client: Client,
  parameters: CreateTeam,
  options?: RequestOptions,
): Promise<TeamResponseWithMembers> {
  const config: SendRequestOptions<TeamResponseWithMembers> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams`,
    method: 'POST',
    body: {
      description: parameters.description,
      displayName: parameters.displayName,
      siteId: parameters.siteId,
      teamType: parameters.teamType,
    },
    schema: TeamResponseWithMembersSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

export async function archiveTeams(
  client: Client,
  parameters: ArchiveTeams,
  options?: RequestOptions,
): Promise<BulkOperationResponse> {
  const config: SendRequestOptions<BulkOperationResponse> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/archive`,
    method: 'POST',
    body: {
      teamIds: parameters.teamIds,
    },
    schema: BulkOperationResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

export async function unarchiveTeams(
  client: Client,
  parameters: UnarchiveTeams,
  options?: RequestOptions,
): Promise<BulkOperationResponse> {
  const config: SendRequestOptions<BulkOperationResponse> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/unarchive`,
    method: 'POST',
    body: {
      teamIds: parameters.teamIds,
    },
    schema: BulkOperationResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

export async function getTeam(client: Client, parameters: GetTeam, options?: RequestOptions): Promise<TeamResponse> {
  const config: SendRequestOptions<TeamResponse> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/${parameters.teamId}`,
    method: 'GET',
    searchParams: {
      siteId: parameters.siteId,
    },
    schema: TeamResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

export async function deleteTeam(client: Client, parameters: DeleteTeam, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/${parameters.teamId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** This will only update the fields that get passed in and leave the rest as unmodified. */
export async function updateTeam(
  client: Client,
  parameters: UpdateTeam,
  options?: RequestOptions,
): Promise<TeamResponse> {
  const config: SendRequestOptions<TeamResponse> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/${parameters.teamId}`,
    method: 'PATCH',
    body: {
      description: parameters.description,
      displayName: parameters.displayName,
    },
    schema: TeamResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

export async function restoreTeam(client: Client, parameters: RestoreTeam, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/${parameters.teamId}/restore`,
    method: 'POST',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** This updates the cover photo of the team. The cover photo must be a valid image file. */
export async function uploadAndSetTeamCoverPhoto(
  client: Client,
  parameters: UploadAndSetTeamCoverPhoto,
  options?: RequestOptions,
): Promise<void> {
  const formData = new FormData();
  const items = Array.isArray(parameters.file) ? parameters.file : [parameters.file];

  for (const attachment of items) {
    formData.append('file', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<void> = {
    url: `/gateway/api/public/teams/v1/${parameters.teamId}/cover-photo`,
    method: 'PUT',
    body: formData,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
