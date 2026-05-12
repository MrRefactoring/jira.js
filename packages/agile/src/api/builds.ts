import { SubmitBuildsSchema, type SubmitBuilds } from '#/models/submitBuilds';
import { GetBuildByKeySchema, type GetBuildByKey } from '#/models/getBuildByKey';
import { type SubmitBuilds as SubmitBuildsParameters } from '#/parameters/submitBuilds';
import { type DeleteBuildsByProperty } from '#/parameters/deleteBuildsByProperty';
import { type GetBuildByKey as GetBuildByKeyParameters } from '#/parameters/getBuildByKey';
import { type DeleteBuildByKey } from '#/parameters/deleteBuildByKey';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Update / insert builds data.
 *
 * Builds are identified by the combination of `pipelineId` and `buildNumber`, and existing build data for the same
 * build will be replaced if it exists and the `updateSequenceNumber` of the existing data is less than the incoming
 * data.
 *
 * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
 * available within a short period of time, but may take some time during peak load and/or maintenance times. The
 * `getBuildByKey` operation can be used to confirm that data has been stored successfully (if needed).
 *
 * In the case of multiple builds being submitted in one request, each is validated individually prior to submission.
 * Details of which build failed submission (if any) are available in the response object.
 */
export async function submitBuilds(client: Client, parameters: SubmitBuildsParameters): Promise<SubmitBuilds> {
  const config: SendRequestOptions<SubmitBuilds> = {
    url: '/rest/builds/0.1/bulk',
    method: 'POST',
    body: {
      properties: parameters.properties,
      builds: parameters.builds,
      providerMetadata: parameters.providerMetadata,
    },
    schema: SubmitBuildsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Bulk delete all builds data that match the given request.
 *
 * One or more query params must be supplied to specify Properties to delete by. Optional param `_updateSequenceNumber`
 * is no longer supported. If more than one Property is provided, data will be deleted that matches ALL of the
 * Properties (e.g. treated as an AND).
 *
 * See the documentation for the `submitBuilds` operation for more details.
 *
 * E.g. DELETE /bulkByProperties?accountId=account-123&repoId=repo-345
 *
 * Deletion is performed asynchronously. The `getBuildByKey` operation can be used to confirm that data has been deleted
 * successfully (if needed).
 */
export async function deleteBuildsByProperty(client: Client, parameters: DeleteBuildsByProperty): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/builds/0.1/bulkByProperties',
    method: 'DELETE',
    searchParams: {
      accountId: parameters.accountId,
      repoId: parameters.repoId,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Retrieve the currently stored build data for the given `pipelineId` and `buildNumber` combination.
 *
 * The result will be what is currently stored, ignoring any pending updates or deletes.
 */
export async function getBuildByKey(client: Client, parameters: GetBuildByKeyParameters): Promise<GetBuildByKey> {
  const config: SendRequestOptions<GetBuildByKey> = {
    url: `/rest/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
    method: 'GET',
    schema: GetBuildByKeySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete the build data currently stored for the given `pipelineId` and `buildNumber` combination.
 *
 * Deletion is performed asynchronously. The `getBuildByKey` operation can be used to confirm that data has been deleted
 * successfully (if needed).
 */
export async function deleteBuildByKey(client: Client, parameters: DeleteBuildByKey): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
