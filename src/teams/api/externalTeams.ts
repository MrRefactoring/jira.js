import { TeamResponseSchema, type TeamResponse } from '../models/teamResponse';
import { BulkOperationResponseSchema, type BulkOperationResponse } from '../models/bulkOperationResponse';
import type { CreateExternalLinkedTeam } from '../parameters/createExternalLinkedTeam';
import type { UnlinkTeamsFromExternalSource } from '../parameters/unlinkTeamsFromExternalSource';
import type { LinkTeamToExternalSource } from '../parameters/linkTeamToExternalSource';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Creates an external linked team, and membership will be synced with the external reference. */
export async function createExternalLinkedTeam(
  client: Client,
  parameters: CreateExternalLinkedTeam,
  options?: RequestOptions,
): Promise<TeamResponse> {
  const config: SendRequestOptions<TeamResponse> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/external`,
    method: 'POST',
    body: {
      description: parameters.description,
      externalReference: parameters.externalReference,
      siteId: parameters.siteId,
    },
    schema: TeamResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Unlinks managed teams from their external references in bulk. Each team's membership setting will be transitioned
 * from EXTERNAL to ORG_ADMIN_MANAGED.
 */
export async function unlinkTeamsFromExternalSource(
  client: Client,
  parameters: UnlinkTeamsFromExternalSource,
  options?: RequestOptions,
): Promise<BulkOperationResponse> {
  const config: SendRequestOptions<BulkOperationResponse> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/external/bulk/unlink`,
    method: 'POST',
    body: {
      teamIds: parameters.teamIds,
    },
    schema: BulkOperationResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Links an existing team to an external reference, and membership and team name will be synced with the external
 * reference.
 */
export async function linkTeamToExternalSource(
  client: Client,
  parameters: LinkTeamToExternalSource,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/${parameters.teamId}/external/link`,
    method: 'POST',
    body: {
      externalReference: parameters.externalReference,
      siteId: parameters.siteId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
