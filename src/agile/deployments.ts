import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Deployments {
  constructor(private client: Client) {}

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
   *
   * Only Connect apps that define the `jiraDeploymentInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async submitDeployments<T = Models.SubmitDeployments>(
    parameters: Parameters.SubmitDeployments | undefined,
    callback: Callback<T>
  ): Promise<void>;
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
   *
   * Only Connect apps that define the `jiraDeploymentInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'WRITE' scope for Connect apps.
   */
  async submitDeployments<T = Models.SubmitDeployments>(
    parameters?: Parameters.SubmitDeployments,
    callback?: never
  ): Promise<T>;
  async submitDeployments<T = Models.SubmitDeployments>(
    parameters?: Parameters.SubmitDeployments,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/deployments/0.1/bulk',
      method: 'POST',
      data: {
        properties: parameters?.properties,
        deployments: parameters?.deployments,
        providerMetadata: parameters?.providerMetadata,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.deployments.submitDeployments' });
  }

  /**
   * Bulk delete all deployments that match the given request.
   *
   * One or more query params must be supplied to specify the Properties to delete by. Optional param
   * `_updateSequenceNumber` is no longer supported. If more than one Property is provided, data will be deleted that
   * matches ALL of the Properties (i.e. treated as AND). See the documentation for the `submitDeployments` operation
   * for more details.
   *
   * Example operation: DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
   *
   * Deletion is performed asynchronously. The `getDeploymentByKey` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraDeploymentInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'DELETE' scope for Connect apps.
   */
  async deleteDeploymentsByProperty<T = unknown>(
    parameters: Parameters.DeleteDeploymentsByProperty | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Bulk delete all deployments that match the given request.
   *
   * One or more query params must be supplied to specify the Properties to delete by. Optional param
   * `_updateSequenceNumber` is no longer supported. If more than one Property is provided, data will be deleted that
   * matches ALL of the Properties (i.e. treated as AND). See the documentation for the `submitDeployments` operation
   * for more details.
   *
   * Example operation: DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
   *
   * Deletion is performed asynchronously. The `getDeploymentByKey` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraDeploymentInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'DELETE' scope for Connect apps.
   */
  async deleteDeploymentsByProperty<T = unknown>(
    parameters?: Parameters.DeleteDeploymentsByProperty,
    callback?: never
  ): Promise<T>;
  async deleteDeploymentsByProperty<T = unknown>(
    parameters?: Parameters.DeleteDeploymentsByProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/deployments/0.1/bulkByProperties',
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters?._updateSequenceNumber || parameters?.updateSequenceNumber,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.deployments.deleteDeploymentsByProperty' });
  }

  /**
   * Retrieve the currently stored deployment data for the given `pipelineId`, `environmentId` and
   * `deploymentSequenceNumber` combination.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraDeploymentInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'READ' scope for Connect apps.
   */
  async getDeploymentByKey<T = Models.GetDeploymentByKey>(
    parameters: Parameters.GetDeploymentByKey,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieve the currently stored deployment data for the given `pipelineId`, `environmentId` and
   * `deploymentSequenceNumber` combination.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraDeploymentInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'READ' scope for Connect apps.
   */
  async getDeploymentByKey<T = Models.GetDeploymentByKey>(
    parameters: Parameters.GetDeploymentByKey,
    callback?: never
  ): Promise<T>;
  async getDeploymentByKey<T = Models.GetDeploymentByKey>(
    parameters: Parameters.GetDeploymentByKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.deployments.getDeploymentByKey' });
  }

  /**
   * Delete the currently stored deployment data for the given `pipelineId`, `environmentId` and
   * `deploymentSequenceNumber` combination.
   *
   * Deletion is performed asynchronously. The `getDeploymentByKey` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraDeploymentInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'DELETE' scope for Connect apps.
   */
  async deleteDeploymentByKey<T = unknown>(
    parameters: Parameters.DeleteDeploymentByKey,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Delete the currently stored deployment data for the given `pipelineId`, `environmentId` and
   * `deploymentSequenceNumber` combination.
   *
   * Deletion is performed asynchronously. The `getDeploymentByKey` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraDeploymentInfoProvider` module, and on-premise integrations, can access this
   * resource. This resource requires the 'DELETE' scope for Connect apps.
   */
  async deleteDeploymentByKey<T = unknown>(parameters: Parameters.DeleteDeploymentByKey, callback?: never): Promise<T>;
  async deleteDeploymentByKey<T = unknown>(
    parameters: Parameters.DeleteDeploymentByKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}`,
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters._updateSequenceNumber || parameters.updateSequenceNumber,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.deployments.deleteDeploymentByKey' });
  }

  /**
   * Retrieve the Deployment gating status for the given `pipelineId + environmentId + deploymentSequenceNumber`
   * combination. Only apps that define the `jiraDeploymentInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope.
   */
  async getDeploymentGatingStatusByKey<T = Models.GetDeploymentGatingStatusByKey>(
    parameters: Parameters.GetDeploymentGatingStatusByKey,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Retrieve the Deployment gating status for the given `pipelineId + environmentId + deploymentSequenceNumber`
   * combination. Only apps that define the `jiraDeploymentInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope.
   */
  async getDeploymentGatingStatusByKey<T = Models.GetDeploymentGatingStatusByKey>(
    parameters: Parameters.GetDeploymentGatingStatusByKey,
    callback?: never
  ): Promise<T>;
  async getDeploymentGatingStatusByKey<T = Models.GetDeploymentGatingStatusByKey>(
    parameters: Parameters.GetDeploymentGatingStatusByKey,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/deployments/0.1/pipelines/${parameters.pipelineId}/environments/${parameters.environmentId}/deployments/${parameters.deploymentSequenceNumber}/gating-status`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, {
      methodName: 'agile.deployments.getDeploymentGatingStatusByKey',
    });
  }
}
