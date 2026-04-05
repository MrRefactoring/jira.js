import { SubmitComponentsSchema, type SubmitComponents } from '#/models/submitComponents';
import { GetComponentByIdSchema, type GetComponentById } from '#/models/getComponentById';
import { type SubmitComponents as SubmitComponentsParameters } from '#/parameters/submitComponents';
import { type DeleteComponentsByProperty } from '#/parameters/deleteComponentsByProperty';
import { type GetComponentById as GetComponentByIdParameters } from '#/parameters/getComponentById';
import { type DeleteComponentById } from '#/parameters/deleteComponentById';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Update / insert DevOps Component data.
 *
 * Components are identified by their ID, and existing Component data for the same ID will be replaced if it exists and
 * the updateSequenceNumber of existing data is less than the incoming data.
 *
 * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
 * available within a short period of time, but may take some time during peak load and/or maintenance times. The
 * getComponentById operation can be used to confirm that data has been stored successfully (if needed).
 *
 * In the case of multiple Components being submitted in one request, each is validated individually prior to
 * submission. Details of which Components failed submission (if any) are available in the response object.
 *
 * A maximum of 1000 components can be submitted in one request.
 *
 * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
 * requires the 'WRITE' scope for Connect apps.
 */
export async function submitComponents(
  client: Client,
  parameters: SubmitComponentsParameters,
): Promise<SubmitComponents> {
  const config: SendRequestOptions<SubmitComponents> = {
    url: '/rest/devopscomponents/1.0/bulk',
    method: 'POST',
    body: {
      properties: parameters.properties,
      devopsComponents: parameters.devopsComponents,
      providerMetadata: parameters.providerMetadata,
    },
    schema: SubmitComponentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all Components that match the given request.
 *
 * One or more query params must be supplied to specify Properties to delete by. If more than one Property is provided,
 * data will be deleted that matches ALL of the Properties (e.g. treated as an AND). See the documentation for the
 * submitComponents operation for more details.
 *
 * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
 *
 * Deletion is performed asynchronously. The getComponentById operation can be used to confirm that data has been
 * deleted successfully (if needed).
 *
 * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
 * requires the 'DELETE' scope for Connect apps.
 */
export async function deleteComponentsByProperty(
  client: Client,
  parameters: DeleteComponentsByProperty,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/devopscomponents/1.0/bulkByProperties',
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
      createdBy: parameters.createdBy,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the currently stored Component data for the given ID.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 *
 * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
 * requires the 'READ' scope for Connect apps.
 */
export async function getComponentById(
  client: Client,
  parameters: GetComponentByIdParameters,
): Promise<GetComponentById> {
  const config: SendRequestOptions<GetComponentById> = {
    url: `/rest/devopscomponents/1.0/devopscomponents/${parameters.componentId}`,
    method: 'GET',
    schema: GetComponentByIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete the Component data currently stored for the given ID.
 *
 * Deletion is performed asynchronously. The getComponentById operation can be used to confirm that data has been
 * deleted successfully (if needed).
 *
 * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
 * requires the 'DELETE' scope for Connect apps.
 */
export async function deleteComponentById(client: Client, parameters: DeleteComponentById): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/devopscomponents/1.0/devopscomponents/${parameters.componentId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
