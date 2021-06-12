import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Builds {
  constructor(private client: Client) {}

  /**
   * Update / insert builds data.
   *
   * Builds are identified by the combination of `pipelineId` and `buildNumber`, and existing build data for the same
   * build will be replaced if it exists and the `updateSequenceNumber` of the existing data is less than the incoming data.
   *
   * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
   * available within a short period of time, but may take some time during peak load and/or maintenance times. The
   * `getBuildByKey` operation can be used to confirm that data has been stored successfully (if needed).
   *
   * In the case of multiple builds being submitted in one request, each is validated individually prior to submission.
   * Details of which build failed submission (if any) are available in the response object.
   *
   * Only Connect apps that define the `jiraBuildInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async submitBuilds<T = Models.SubmitBuilds>(
    parameters: Parameters.SubmitBuilds | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Update / insert builds data.
   *
   * Builds are identified by the combination of `pipelineId` and `buildNumber`, and existing build data for the same
   * build will be replaced if it exists and the `updateSequenceNumber` of the existing data is less than the incoming data.
   *
   * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
   * available within a short period of time, but may take some time during peak load and/or maintenance times. The
   * `getBuildByKey` operation can be used to confirm that data has been stored successfully (if needed).
   *
   * In the case of multiple builds being submitted in one request, each is validated individually prior to submission.
   * Details of which build failed submission (if any) are available in the response object.
   *
   * Only Connect apps that define the `jiraBuildInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async submitBuilds<T = Models.SubmitBuilds>(parameters?: Parameters.SubmitBuilds, callback?: never): Promise<T>;
  async submitBuilds<T = Models.SubmitBuilds>(
    parameters?: Parameters.SubmitBuilds,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/builds/0.1/bulk',
      method: 'POST',
      data: {
        properties: parameters?.properties,
        builds: parameters?.builds,
        providerMetadata: parameters?.providerMetadata,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.builds.submitBuilds' });
  }

  /**
   * Bulk delete all builds data that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by. Optional param
   * `_updateSequenceNumber` is no longer supported. If more than one Property is provided, data will be deleted that
   * matches ALL of the Properties (e.g. treated as an AND).
   *
   * See the documentation for the `submitBuilds` operation for more details.
   *
   * E.g. DELETE /bulkByProperties?accountId=account-123&repoId=repo-345
   *
   * Deletion is performed asynchronously. The `getBuildByKey` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraBuildInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async deleteBuildsByProperty<T = unknown>(
    parameters: Parameters.DeleteBuildsByProperty | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Bulk delete all builds data that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by. Optional param
   * `_updateSequenceNumber` is no longer supported. If more than one Property is provided, data will be deleted that
   * matches ALL of the Properties (e.g. treated as an AND).
   *
   * See the documentation for the `submitBuilds` operation for more details.
   *
   * E.g. DELETE /bulkByProperties?accountId=account-123&repoId=repo-345
   *
   * Deletion is performed asynchronously. The `getBuildByKey` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraBuildInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async deleteBuildsByProperty<T = unknown>(
    parameters?: Parameters.DeleteBuildsByProperty,
    callback?: never
  ): Promise<T>;
  async deleteBuildsByProperty<T = unknown>(
    parameters?: Parameters.DeleteBuildsByProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/builds/0.1/bulkByProperties',
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters?._updateSequenceNumber || parameters?.updateSequenceNumber,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.builds.deleteBuildsByProperty' });
  }

  /**
   * Retrieve the currently stored build data for the given `pipelineId` and `buildNumber` combination.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraBuildInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async getBuildByKey<T = Models.GetBuildByKey>(
    parameters: Parameters.GetBuildByKey,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieve the currently stored build data for the given `pipelineId` and `buildNumber` combination.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraBuildInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async getBuildByKey<T = Models.GetBuildByKey>(parameters: Parameters.GetBuildByKey, callback?: never): Promise<T>;
  async getBuildByKey<T = Models.GetBuildByKey>(
    parameters: Parameters.GetBuildByKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.builds.getBuildByKey' });
  }

  /**
   * Delete the build data currently stored for the given `pipelineId` and `buildNumber` combination.
   *
   * Deletion is performed asynchronously. The `getBuildByKey` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraBuildInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async deleteBuildByKey<T = unknown>(parameters: Parameters.DeleteBuildByKey, callback: Callback<T>): Promise<void>;
  /**
   * Delete the build data currently stored for the given `pipelineId` and `buildNumber` combination.
   *
   * Deletion is performed asynchronously. The `getBuildByKey` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraBuildInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async deleteBuildByKey<T = unknown>(parameters: Parameters.DeleteBuildByKey, callback?: never): Promise<T>;
  async deleteBuildByKey<T = unknown>(
    parameters: Parameters.DeleteBuildByKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/builds/0.1/pipelines/${parameters.pipelineId}/builds/${parameters.buildNumber}`,
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters._updateSequenceNumber || parameters.updateSequenceNumber,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.builds.deleteBuildByKey' });
  }
}
