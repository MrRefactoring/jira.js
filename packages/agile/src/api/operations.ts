import { SubmitOperationsWorkspacesSchema, type SubmitOperationsWorkspaces } from '#/models/submitOperationsWorkspaces';
import { GetWorkspacesSchema, type GetWorkspaces } from '#/models/getWorkspaces';
import { SubmitEntitySchema, type SubmitEntity } from '#/models/submitEntity';
import { GetIncidentByIdSchema, type GetIncidentById } from '#/models/getIncidentById';
import { GetReviewByIdSchema, type GetReviewById } from '#/models/getReviewById';
import { type SubmitOperationsWorkspaces as SubmitOperationsWorkspacesParameters } from '#/parameters/submitOperationsWorkspaces';
import { type DeleteWorkspaces } from '#/parameters/deleteWorkspaces';
import { type GetWorkspaces as GetWorkspacesParameters } from '#/parameters/getWorkspaces';
import { type SubmitEntity as SubmitEntityParameters } from '#/parameters/submitEntity';
import { type DeleteEntityByProperty } from '#/parameters/deleteEntityByProperty';
import { type GetIncidentById as GetIncidentByIdParameters } from '#/parameters/getIncidentById';
import { type DeleteIncidentById } from '#/parameters/deleteIncidentById';
import { type GetReviewById as GetReviewByIdParameters } from '#/parameters/getReviewById';
import { type DeleteReviewById } from '#/parameters/deleteReviewById';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Insert Operations Workspace IDs to establish a relationship between them and the Jira site the app is installed in.
 * If a relationship between the Workspace ID and Jira already exists then the workspace ID will be ignored and Jira
 * will process the rest of the entries.
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'WRITE' scope for Connect apps.
 */
export async function submitOperationsWorkspaces(
  client: Client,
  parameters: SubmitOperationsWorkspacesParameters,
): Promise<SubmitOperationsWorkspaces> {
  const config: SendRequestOptions<SubmitOperationsWorkspaces> = {
    url: '/rest/operations/1.0/linkedWorkspaces/bulk',
    method: 'POST',
    body: {
      workspaceIds: parameters.workspaceIds,
    },
    schema: SubmitOperationsWorkspacesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all Operations Workspaces that match the given request.
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'DELETE' scope for Connect apps.
 *
 * E.g. DELETE /bulk?workspaceIds=111-222-333,444-555-666
 */
export async function deleteWorkspaces(client: Client, parameters: DeleteWorkspaces): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/operations/1.0/linkedWorkspaces/bulk',
    method: 'DELETE',
    searchParams: {
      workspaceIds: parameters.workspaceIds,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the either all Operations Workspace IDs associated with the Jira site or a specific Operations Workspace ID
 * for the given ID.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 *
 * E.g. GET /workspace?workspaceId=111-222-333
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'READ' scope for Connect apps.
 */
export async function getWorkspaces(client: Client, parameters?: GetWorkspacesParameters): Promise<GetWorkspaces> {
  const config: SendRequestOptions<GetWorkspaces> = {
    url: '/rest/operations/1.0/linkedWorkspaces',
    method: 'GET',
    searchParams: {
      workspaceId: parameters?.workspaceId,
    },
    schema: GetWorkspacesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update / insert Incident or Review data.
 *
 * Incidents and reviews are identified by their ID, and existing Incident and Review data for the same ID will be
 * replaced if it exists and the updateSequenceNumber of existing data is less than the incoming data.
 *
 * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
 * available within a short period of time, but may take some time during peak load and/or maintenance times. The
 * getIncidentById or getReviewById operation can be used to confirm that data has been stored successfully (if
 * needed).
 *
 * In the case of multiple Incidents and Reviews being submitted in one request, each is validated individually prior to
 * submission. Details of which entities failed submission (if any) are available in the response object.
 *
 * A maximum of 1000 incidents can be submitted in one request.
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'WRITE' scope for Connect apps.
 */
export async function submitEntity(client: Client, parameters: SubmitEntityParameters): Promise<SubmitEntity> {
  const config: SendRequestOptions<SubmitEntity> = {
    url: '/rest/operations/1.0/bulk',
    method: 'POST',
    body: {
      properties: parameters.properties,
      providerMetadata: parameters.providerMetadata,
    },
    schema: SubmitEntitySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all Entties that match the given request.
 *
 * One or more query params must be supplied to specify Properties to delete by. If more than one Property is provided,
 * data will be deleted that matches ALL of the Properties (e.g. treated as an AND). See the documentation for the
 * submitEntity operation for more details.
 *
 * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
 *
 * Deletion is performed asynchronously. The getIncidentById operation can be used to confirm that data has been deleted
 * successfully (if needed).
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'DELETE' scope for Connect apps.
 */
export async function deleteEntityByProperty(client: Client, parameters: DeleteEntityByProperty): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/operations/1.0/bulkByProperties',
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
      createdBy: parameters.createdBy,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the currently stored Incident data for the given ID.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'READ' scope for Connect apps.
 */
export async function getIncidentById(client: Client, parameters: GetIncidentByIdParameters): Promise<GetIncidentById> {
  const config: SendRequestOptions<GetIncidentById> = {
    url: `/rest/operations/1.0/incidents/${parameters.incidentId}`,
    method: 'GET',
    schema: GetIncidentByIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete the Incident data currently stored for the given ID.
 *
 * Deletion is performed asynchronously. The getIncidentById operation can be used to confirm that data has been deleted
 * successfully (if needed).
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'DELETE' scope for Connect apps.
 */
export async function deleteIncidentById(client: Client, parameters: DeleteIncidentById): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/operations/1.0/incidents/${parameters.incidentId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the currently stored Review data for the given ID.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'READ' scope for Connect apps.
 */
export async function getReviewById(client: Client, parameters: GetReviewByIdParameters): Promise<GetReviewById> {
  const config: SendRequestOptions<GetReviewById> = {
    url: `/rest/operations/1.0/post-incident-reviews/${parameters.reviewId}`,
    method: 'GET',
    schema: GetReviewByIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete the Review data currently stored for the given ID.
 *
 * Deletion is performed asynchronously. The getReviewById operation can be used to confirm that data has been deleted
 * successfully (if needed).
 *
 * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
 * requires the 'DELETE' scope for Connect apps.
 */
export async function deleteReviewById(client: Client, parameters: DeleteReviewById): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/operations/1.0/post-incident-reviews/${parameters.reviewId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
