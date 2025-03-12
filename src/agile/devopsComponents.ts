import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class DevopsComponents {
  constructor(private client: Client) {}

  /**
   * Update / insert DevOps Component data.
   *
   * Components are identified by their ID, and existing Component data for the same ID will be replaced if it exists
   * and the updateSequenceNumber of existing data is less than the incoming data.
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
  async submitComponents<T = Models.SubmitComponents>(
    parameters: Parameters.SubmitComponents,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update / insert DevOps Component data.
   *
   * Components are identified by their ID, and existing Component data for the same ID will be replaced if it exists
   * and the updateSequenceNumber of existing data is less than the incoming data.
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
  async submitComponents<T = Models.SubmitComponents>(
    parameters: Parameters.SubmitComponents,
    callback?: never,
  ): Promise<T>;
  async submitComponents<T = Models.SubmitComponents>(
    parameters: Parameters.SubmitComponents,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/devopscomponents/1.0/bulk',
      method: 'POST',
      data: {
        properties: parameters.properties,
        components: parameters.components,
        providerMetadata: parameters.providerMetadata,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Bulk delete all Components that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by. If more than one Property is
   * provided, data will be deleted that matches ALL of the Properties (e.g. treated as an AND). See the documentation
   * for the submitComponents operation for more details.
   *
   * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
   *
   * Deletion is performed asynchronously. The getComponentById operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteComponentsByProperty<T = void>(
    parameters: Parameters.DeleteComponentsByProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Bulk delete all Components that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by. If more than one Property is
   * provided, data will be deleted that matches ALL of the Properties (e.g. treated as an AND). See the documentation
   * for the submitComponents operation for more details.
   *
   * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
   *
   * Deletion is performed asynchronously. The getComponentById operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteComponentsByProperty<T = void>(
    parameters: Parameters.DeleteComponentsByProperty,
    callback?: never,
  ): Promise<T>;
  async deleteComponentsByProperty<T = void>(
    parameters: Parameters.DeleteComponentsByProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/devopscomponents/1.0/bulkByProperties',
      method: 'DELETE',
      params: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieve the currently stored Component data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getComponentById<T = Models.GetComponentById>(
    parameters: Parameters.GetComponentById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieve the currently stored Component data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getComponentById<T = Models.GetComponentById>(
    parameters: Parameters.GetComponentById,
    callback?: never,
  ): Promise<T>;
  async getComponentById<T = Models.GetComponentById>(
    parameters: Parameters.GetComponentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/devopscomponents/1.0/${parameters.componentId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
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
  async deleteComponentById<T = void>(parameters: Parameters.DeleteComponentById, callback: Callback<T>): Promise<void>;
  /**
   * Delete the Component data currently stored for the given ID.
   *
   * Deletion is performed asynchronously. The getComponentById operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraDevOpsComponentProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteComponentById<T = void>(parameters: Parameters.DeleteComponentById, callback?: never): Promise<T>;
  async deleteComponentById<T = void>(
    parameters: Parameters.DeleteComponentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/devopscomponents/1.0/${parameters.componentId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
