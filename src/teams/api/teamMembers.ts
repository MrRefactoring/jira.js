import { MembershipPageSchema, type MembershipPage } from '../models/membershipPage';
import { MembershipAddResponseSchema, type MembershipAddResponse } from '../models/membershipAddResponse';
import { MembershipRemoveResponseSchema, type MembershipRemoveResponse } from '../models/membershipRemoveResponse';
import type { FetchMembers } from '../parameters/fetchMembers';
import type { AddMembers } from '../parameters/addMembers';
import type { RemoveMembers } from '../parameters/removeMembers';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns a set of account IDs who are members of the team, alongside a pagination cursor to retrieve the next page (if
 * available).
 */
export async function fetchMembers(
  client: Client,
  parameters: FetchMembers,
  options?: RequestOptions,
): Promise<MembershipPage> {
  const config: SendRequestOptions<MembershipPage> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/${parameters.teamId}/members`,
    method: 'POST',
    searchParams: {
      siteId: parameters.siteId,
    },
    body: {
      after: parameters.after,
      first: parameters.first,
    },
    schema: MembershipPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** The account IDs specified will be added to the team. */
export async function addMembers(
  client: Client,
  parameters: AddMembers,
  options?: RequestOptions,
): Promise<MembershipAddResponse> {
  const config: SendRequestOptions<MembershipAddResponse> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/${parameters.teamId}/members/add`,
    method: 'POST',
    body: {
      members: parameters.members,
    },
    schema: MembershipAddResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** The account IDs specified will be removed from the team. */
export async function removeMembers(
  client: Client,
  parameters: RemoveMembers,
  options?: RequestOptions,
): Promise<MembershipRemoveResponse> {
  const config: SendRequestOptions<MembershipRemoveResponse> = {
    url: `/gateway/api/public/teams/v1/org/${parameters.orgId}/teams/${parameters.teamId}/members/remove`,
    method: 'POST',
    body: {
      members: parameters.members,
    },
    schema: MembershipRemoveResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
