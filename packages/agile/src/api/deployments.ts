import { SubmitDeploymentsSchema, type SubmitDeployments } from '#/models/submitDeployments';
import { GetDeploymentByKeySchema, type GetDeploymentByKey } from '#/models/getDeploymentByKey';
import {
  GetDeploymentGatingStatusByKeySchema,
  type GetDeploymentGatingStatusByKey,
} from '#/models/getDeploymentGatingStatusByKey';
import { type SubmitDeployments as SubmitDeploymentsParameters } from '#/parameters/submitDeployments';
import { type DeleteDeploymentsByProperty } from '#/parameters/deleteDeploymentsByProperty';
import { type GetDeploymentByKey as GetDeploymentByKeyParameters } from '#/parameters/getDeploymentByKey';
import { type DeleteDeploymentByKey } from '#/parameters/deleteDeploymentByKey';
import { type GetDeploymentGatingStatusByKey as GetDeploymentGatingStatusByKeyParameters } from '#/parameters/getDeploymentGatingStatusByKey';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Update / insert deployment data.
 *
 * Deployments are identified by the combination of `pipelineId`, `environmentId` and `deploymentSequenceNumber`, and
 * existing deployment data for the same deployment will be replaced if it exists and the `updateSequenceNumber` of
 * existing data is less than the incoming data.
 *
 * Submissions are processed asynchronously. Submitted data will eventually be available in Jira. Most updates are
 * available within a short period of time, but may take some time during peak load and/or maintenance times. The
 * `getDeploymentByKey` operation can be used to confirm that data has been stored successfully (if needed).
 *
 * In the case of multiple deployments being submitted in one request, each is validated individually prior to
 * submission. Details of which deployments failed submission (if any) are available in the response object.
 */
export async function submitDeployments(
  client: Client,
  parameters: SubmitDeploymentsParameters,
): Promise<SubmitDeployments> {
  const config: SendRequestOptions<SubmitDeployments> = {
    url: '/rest/deployments/0.1/bulk',
    method: 'POST',
    body: {
      properties: parameters.properties,
      deployments: parameters.deployments,
      providerMetadata: parameters.providerMetadata,
    },
    schema: SubmitDeploymentsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all deployments that match the given request.
 *
 * One or more query params must be supplied to specify the Properties to delete by. Optional param
 * `_updateSequenceNumber` is no longer supported. If more than one Property is provided, data will be deleted that
 * matches ALL of the Properties (i.e. treated as AND). See the documentation for the `submitDeployments` operation for
 * more details.
 *
 * Example operation: DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
 *
 * Deletion is performed asynchronously. The `getDeploymentByKey` operation can be used to confirm that data has been
 * deleted successfully (if needed).
 */
export async function deleteDeploymentsByProperty(
  client: Client,
  parameters: DeleteDeploymentsByProperty,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/deployments/0.1/bulkByProperties',
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
      createdBy: parameters.createdBy,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the currently stored deployment data for the given `pipelineId`, `environmentId` and
 * `deploymentSequenceNumber` combination.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 */
export async function getDeploymentByKey(
  client: Client,
  parameters: GetDeploymentByKeyParameters,
): Promise<GetDeploymentByKey> {
  const config: SendRequestOptions<GetDeploymentByKey> = {
    url: `/rest/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
    method: 'GET',
    schema: GetDeploymentByKeySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete the currently stored deployment data for the given `pipelineId`, `environmentId` and
 * `deploymentSequenceNumber` combination.
 *
 * Deletion is performed asynchronously. The `getDeploymentByKey` operation can be used to confirm that data has been
 * deleted successfully (if needed).
 */
export async function deleteDeploymentByKey(client: Client, parameters: DeleteDeploymentByKey): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the Deployment gating status for the given `pipelineId + environmentId + deploymentSequenceNumber`
 * combination. Only apps that define the `jiraDeploymentInfoProvider` module can access this resource. This resource
 * requires the 'READ' scope.
 */
export async function getDeploymentGatingStatusByKey(
  client: Client,
  parameters: GetDeploymentGatingStatusByKeyParameters,
): Promise<GetDeploymentGatingStatusByKey> {
  const config: SendRequestOptions<GetDeploymentGatingStatusByKey> = {
    url: `/rest/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}/gating-status`,
    method: 'GET',
    schema: GetDeploymentGatingStatusByKeySchema,
  };

  return await client.sendRequest(config);
}
