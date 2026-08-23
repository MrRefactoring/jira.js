import {
  GetScimLinksForAaIdInAnOrgResponseSchema,
  type GetScimLinksForAaIdInAnOrgResponse,
} from '../models/getScimLinksForAaIdInAnOrgResponse';
import {
  GetScimLinksForEmailResponseSchema,
  type GetScimLinksForEmailResponse,
} from '../models/getScimLinksForEmailResponse';
import type { GetScimLinks } from '../parameters/getScimLinks';
import type { GetScimLinksByEmail } from '../parameters/getScimLinksByEmail';
import type { UnlinkScimUser } from '../parameters/unlinkScimUser';
import type { DeleteProvisioningRecord } from '../parameters/deleteProvisioningRecord';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Get SCIM Links for a Atlassian Account ID (AAID). */
export async function getScimLinks(
  client: Client,
  parameters: GetScimLinks,
  options?: RequestOptions,
): Promise<GetScimLinksForAaIdInAnOrgResponse> {
  const config: SendRequestOptions<GetScimLinksForAaIdInAnOrgResponse> = {
    url: `/admin/user-provisioning/v1/org/${parameters.orgId}/user/${parameters.aaId}/get-scim-links`,
    method: 'GET',
    schema: GetScimLinksForAaIdInAnOrgResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get SCIM Links for an email address in an organization. */
export async function getScimLinksByEmail(
  client: Client,
  parameters: GetScimLinksByEmail,
  options?: RequestOptions,
): Promise<GetScimLinksForEmailResponse> {
  const config: SendRequestOptions<GetScimLinksForEmailResponse> = {
    url: `/admin/user-provisioning/v1/org/${parameters.orgId}/get-scim-links-for-email`,
    method: 'POST',
    body: {
      email: parameters.email,
    },
    schema: GetScimLinksForEmailResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Unlinks a SCIM user from their Atlassian account without deleting the user. */
export async function unlinkScimUser(
  client: Client,
  parameters: UnlinkScimUser,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/user-provisioning/v1/org/${parameters.orgId}/scimDirectoryId/${parameters.scimDirectoryId}/scimUserId/${parameters.scimUserId}/unlink`,
    method: 'PATCH',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a user in our SCIM DB with a Atlassian Account ID (AAID). This will apply to all directories in your
 * organization matching that AAID and only works for managed users.
 *
 * You will have to completely reprovision the user to their respective groups after deletion.
 *
 * Explore more about [updating managed SCIM email addresses](../../email-change/).
 */
export async function deleteProvisioningRecord(
  client: Client,
  parameters: DeleteProvisioningRecord,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/admin/user-provisioning/v1/org/${parameters.orgId}/user/${parameters.aaId}/onlyDeleteUserInDB`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
