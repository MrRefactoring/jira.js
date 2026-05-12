import { SubmitFeatureFlagsSchema, type SubmitFeatureFlags } from '#/models/submitFeatureFlags';
import { GetFeatureFlagByIdSchema, type GetFeatureFlagById } from '#/models/getFeatureFlagById';
import { type SubmitFeatureFlags as SubmitFeatureFlagsParameters } from '#/parameters/submitFeatureFlags';
import { type DeleteFeatureFlagsByProperty } from '#/parameters/deleteFeatureFlagsByProperty';
import { type GetFeatureFlagById as GetFeatureFlagByIdParameters } from '#/parameters/getFeatureFlagById';
import { type DeleteFeatureFlagById } from '#/parameters/deleteFeatureFlagById';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Update / insert Feature Flag data.
 *
 * Feature Flags are identified by their ID, and existing Feature Flag data for the same ID will be replaced if it
 * exists and the updateSequenceId of existing data is less than the incoming data.
 *
 * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
 * available within a short period of time, but may take some time during peak load and/or maintenance times. The
 * getFeatureFlagById operation can be used to confirm that data has been stored successfully (if needed).
 *
 * In the case of multiple Feature Flags being submitted in one request, each is validated individually prior to
 * submission. Details of which Feature Flags failed submission (if any) are available in the response object.
 */
export async function submitFeatureFlags(
  client: Client,
  parameters: SubmitFeatureFlagsParameters,
): Promise<SubmitFeatureFlags> {
  const config: SendRequestOptions<SubmitFeatureFlags> = {
    url: '/rest/featureflags/0.1/bulk',
    method: 'POST',
    body: {
      properties: parameters.properties,
      flags: parameters.flags,
      providerMetadata: parameters.providerMetadata,
    },
    schema: SubmitFeatureFlagsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all Feature Flags that match the given request.
 *
 * One or more query params must be supplied to specify Properties to delete by. Optional param `_updateSequenceId` is
 * no longer supported. If more than one Property is provided, data will be deleted that matches ALL of the Properties
 * (e.g. treated as an AND). See the documentation for the submitFeatureFlags operation for more details.
 *
 * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
 *
 * Deletion is performed asynchronously. The getFeatureFlagById operation can be used to confirm that data has been
 * deleted successfully (if needed).
 */
export async function deleteFeatureFlagsByProperty(
  client: Client,
  parameters: DeleteFeatureFlagsByProperty,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/featureflags/0.1/bulkByProperties',
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
      createdBy: parameters.createdBy,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the currently stored Feature Flag data for the given ID.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 */
export async function getFeatureFlagById(
  client: Client,
  parameters: GetFeatureFlagByIdParameters,
): Promise<GetFeatureFlagById> {
  const config: SendRequestOptions<GetFeatureFlagById> = {
    url: `/rest/featureflags/0.1/flag/${parameters.featureFlagId}`,
    method: 'GET',
    schema: GetFeatureFlagByIdSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete the Feature Flag data currently stored for the given ID.
 *
 * Deletion is performed asynchronously. The getFeatureFlagById operation can be used to confirm that data has been
 * deleted successfully (if needed).
 */
export async function deleteFeatureFlagById(client: Client, parameters: DeleteFeatureFlagById): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/featureflags/0.1/flag/${parameters.featureFlagId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
