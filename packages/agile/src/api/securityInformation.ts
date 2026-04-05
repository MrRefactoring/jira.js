import { GetLinkedWorkspacesSchema, type GetLinkedWorkspaces } from '#/models/getLinkedWorkspaces';
import { GetLinkedWorkspaceByIdSchema, type GetLinkedWorkspaceById } from '#/models/getLinkedWorkspaceById';
import { SubmitVulnerabilitiesSchema, type SubmitVulnerabilities } from '#/models/submitVulnerabilities';
import { GetVulnerabilityByIdSchema, type GetVulnerabilityById } from '#/models/getVulnerabilityById';
import { type SubmitWorkspaces } from '#/parameters/submitWorkspaces';
import { type DeleteLinkedWorkspaces } from '#/parameters/deleteLinkedWorkspaces';
import { type GetLinkedWorkspaceById as GetLinkedWorkspaceByIdParameters } from '#/parameters/getLinkedWorkspaceById';
import { type SubmitVulnerabilities as SubmitVulnerabilitiesParameters } from '#/parameters/submitVulnerabilities';
import { type DeleteVulnerabilitiesByProperty } from '#/parameters/deleteVulnerabilitiesByProperty';
import { type GetVulnerabilityById as GetVulnerabilityByIdParameters } from '#/parameters/getVulnerabilityById';
import { type DeleteVulnerabilityById } from '#/parameters/deleteVulnerabilityById';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Insert Security Workspace IDs to establish a relationship between them and the Jira site the app is installed on. If
 * a relationship between the workspace ID and Jira already exists then the workspace ID will be ignored and Jira will
 * process the rest of the entries.
 *
 * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource requires
 * the 'WRITE' scope for Connect apps.
 */
export async function submitWorkspaces(client: Client, parameters: SubmitWorkspaces): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/security/1.0/linkedWorkspaces/bulk',
    method: 'POST',
    body: {
      workspaceIds: parameters.workspaceIds,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all linked Security Workspaces that match the given request.
 *
 * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource requires
 * the 'DELETE' scope for Connect apps.
 *
 * E.g. DELETE /bulk?workspaceIds=111-222-333,444-555-666
 */
export async function deleteLinkedWorkspaces(client: Client, parameters: DeleteLinkedWorkspaces): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/security/1.0/linkedWorkspaces/bulk',
    method: 'DELETE',
    searchParams: {
      workspaceIds: parameters.workspaceIds,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve all Security Workspaces linked with the Jira site.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 *
 * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource requires
 * the 'READ' scope for Connect apps.
 */
export async function getLinkedWorkspaces(client: Client): Promise<GetLinkedWorkspaces> {
  const config: SendRequestOptions<GetLinkedWorkspaces> = {
    url: '/rest/security/1.0/linkedWorkspaces',
    method: 'GET',
    schema: GetLinkedWorkspacesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve a specific Security Workspace linked to the Jira site for the given workspace ID.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 *
 * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource requires
 * the 'READ' scope for Connect apps.
 */
export async function getLinkedWorkspaceById(
  client: Client,
  parameters: GetLinkedWorkspaceByIdParameters,
): Promise<GetLinkedWorkspaceById> {
  const config: SendRequestOptions<GetLinkedWorkspaceById> = {
    url: `/rest/security/1.0/linkedWorkspaces/${parameters.workspaceId}`,
    method: 'GET',
    schema: GetLinkedWorkspaceByIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Update / Insert Vulnerability data.
 *
 * Vulnerabilities are identified by their ID, any existing Vulnerability data with the same ID will be replaced if it
 * exists and the updateSequenceNumber of the existing data is less than the incoming data.
 *
 * Submissions are performed asynchronously. Most updates are available within a short period of time but may take some
 * time during peak load and/or maintenance times. The GET vulnerability endpoint can be used to confirm that data has
 * been stored successfully (if needed).
 *
 * In the case of multiple Vulnerabilities being submitted in one request, each is validated individually prior to
 * submission. Details of Vulnerabilities that failed submission (if any) are available in the response object.
 *
 * A maximum of 1000 vulnerabilities can be submitted in one request.
 *
 * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource requires
 * the 'WRITE' scope for Connect apps.
 */
export async function submitVulnerabilities(
  client: Client,
  parameters: SubmitVulnerabilitiesParameters,
): Promise<SubmitVulnerabilities> {
  const config: SendRequestOptions<SubmitVulnerabilities> = {
    url: '/rest/security/1.0/bulk',
    method: 'POST',
    body: {
      operationType: parameters.operationType,
      properties: parameters.properties,
      vulnerabilities: parameters.vulnerabilities,
      providerMetadata: parameters.providerMetadata,
    },
    schema: SubmitVulnerabilitiesSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all Vulnerabilities that match the given request.
 *
 * One or more query params must be supplied to specify Properties to delete by. If more than one Property is provided,
 * data will be deleted that matches ALL of the Properties (e.g. treated as an AND). Read the POST bulk endpoint
 * documentation for more details.
 *
 * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
 *
 * Deletion is performed asynchronously. The GET vulnerability endpoint can be used to confirm that data has been
 * deleted successfully (if needed).
 *
 * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource requires
 * the 'DELETE' scope for Connect apps.
 */
export async function deleteVulnerabilitiesByProperty(
  client: Client,
  parameters: DeleteVulnerabilitiesByProperty,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/security/1.0/bulkByProperties',
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
      createdBy: parameters.createdBy,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the currently stored Vulnerability data for the given ID.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 *
 * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource requires
 * the 'READ' scope for Connect apps.
 */
export async function getVulnerabilityById(
  client: Client,
  parameters: GetVulnerabilityByIdParameters,
): Promise<GetVulnerabilityById> {
  const config: SendRequestOptions<GetVulnerabilityById> = {
    url: `/rest/security/1.0/vulnerability/${parameters.vulnerabilityId}`,
    method: 'GET',
    schema: GetVulnerabilityByIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete the Vulnerability data currently stored for the given ID.
 *
 * Deletion is performed asynchronously. The GET vulnerability endpoint can be used to confirm that data has been
 * deleted successfully (if needed).
 *
 * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource requires
 * the 'DELETE' scope for Connect apps.
 */
export async function deleteVulnerabilityById(client: Client, parameters: DeleteVulnerabilityById): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/security/1.0/vulnerability/${parameters.vulnerabilityId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
