import { SubmitRemoteLinksSchema, type SubmitRemoteLinks } from '#/models/submitRemoteLinks';
import { GetRemoteLinkByIdSchema, type GetRemoteLinkById } from '#/models/getRemoteLinkById';
import { type SubmitRemoteLinks as SubmitRemoteLinksParameters } from '#/parameters/submitRemoteLinks';
import { type DeleteRemoteLinksByProperty } from '#/parameters/deleteRemoteLinksByProperty';
import { type GetRemoteLinkById as GetRemoteLinkByIdParameters } from '#/parameters/getRemoteLinkById';
import { type DeleteRemoteLinkById } from '#/parameters/deleteRemoteLinkById';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Update / insert Remote Link data.
 *
 * Remote Links are identified by their ID, existing Remote Link data for the same ID will be replaced if it exists and
 * the updateSequenceId of existing data is less than the incoming data.
 *
 * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
 * available within a short period of time, but may take some time during peak load and/or maintenance times. The
 * `getRemoteLinkById` operation can be used to confirm that data has been stored successfully (if needed).
 *
 * In the case of multiple Remote Links being submitted in one request, each is validated individually prior to
 * submission. Details of which Remote LInk failed submission (if any) are available in the response object.
 */
export async function submitRemoteLinks(
  client: Client,
  parameters: SubmitRemoteLinksParameters,
): Promise<SubmitRemoteLinks> {
  const config: SendRequestOptions<SubmitRemoteLinks> = {
    url: '/rest/remotelinks/1.0/bulk',
    method: 'POST',
    body: {
      properties: parameters.properties,
      remoteLinks: parameters.remoteLinks,
      providerMetadata: parameters.providerMetadata,
    },
    schema: SubmitRemoteLinksSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all Remote Links data that match the given request.
 *
 * One or more query params must be supplied to specify Properties to delete by. Optional param `_updateSequenceNumber`
 * is no longer supported. If more than one Property is provided, data will be deleted that matches ALL of the
 * Properties (e.g. treated as an AND).
 *
 * See the documentation for the `submitRemoteLinks` operation for more details.
 *
 * E.g. DELETE /bulkByProperties?accountId=account-123&repoId=repo-345
 *
 * Deletion is performed asynchronously. The `getRemoteLinkById` operation can be used to confirm that data has been
 * deleted successfully (if needed).
 */
export async function deleteRemoteLinksByProperty(
  client: Client,
  parameters: DeleteRemoteLinksByProperty,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/remotelinks/1.0/bulkByProperties',
    method: 'DELETE',
    searchParams: {
      params: parameters.params,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the currently stored Remote Link data for the given ID.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 */
export async function getRemoteLinkById(
  client: Client,
  parameters: GetRemoteLinkByIdParameters,
): Promise<GetRemoteLinkById> {
  const config: SendRequestOptions<GetRemoteLinkById> = {
    url: `/rest/remotelinks/1.0/remotelink/${parameters.remoteLinkId}`,
    method: 'GET',
    schema: GetRemoteLinkByIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete the Remote Link data currently stored for the given ID.
 *
 * Deletion is performed asynchronously. The `getRemoteLinkById` operation can be used to confirm that data has been
 * deleted successfully (if needed).
 */
export async function deleteRemoteLinkById(client: Client, parameters: DeleteRemoteLinkById): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/remotelinks/1.0/remotelink/${parameters.remoteLinkId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
