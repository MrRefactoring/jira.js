import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class Operations {
  constructor(private client: Client) {}

  /**
   * Insert Operations Workspace IDs to establish a relationship between them and the Jira site the app is installed in.
   * If a relationship between the Workspace ID and Jira already exists then the workspace ID will be ignored and Jira
   * will process the rest of the entries.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   */
  async submitOperationsWorkspaces<T = Models.SubmitOperationsWorkspaces>(
    parameters: Parameters.SubmitOperationsWorkspaces,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Insert Operations Workspace IDs to establish a relationship between them and the Jira site the app is installed in.
   * If a relationship between the Workspace ID and Jira already exists then the workspace ID will be ignored and Jira
   * will process the rest of the entries.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   */
  async submitOperationsWorkspaces<T = Models.SubmitOperationsWorkspaces>(
    parameters: Parameters.SubmitOperationsWorkspaces,
    callback?: never,
  ): Promise<T>;
  async submitOperationsWorkspaces<T = Models.SubmitOperationsWorkspaces>(
    parameters: Parameters.SubmitOperationsWorkspaces,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/operations/1.0/linkedWorkspaces/bulk',
      method: 'POST',
      data: {
        workspaceIds: parameters.workspaceIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Bulk delete all Operations Workspaces that match the given request.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   *
   * E.g. DELETE /bulk?workspaceIds=111-222-333,444-555-666
   */
  async deleteWorkspaces<T = void>(parameters: Parameters.DeleteWorkspaces, callback: Callback<T>): Promise<void>;
  /**
   * Bulk delete all Operations Workspaces that match the given request.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   *
   * E.g. DELETE /bulk?workspaceIds=111-222-333,444-555-666
   */
  async deleteWorkspaces<T = void>(parameters: Parameters.DeleteWorkspaces, callback?: never): Promise<T>;
  async deleteWorkspaces<T = void>(parameters: Parameters.DeleteWorkspaces, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/operations/1.0/linkedWorkspaces/bulk',
      method: 'DELETE',
      params: {
        workspaceIds: parameters.workspaceIds.join(','),
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieve the either all Operations Workspace IDs associated with the Jira site or a specific Operations Workspace
   * ID for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * E.g. GET /workspace?workspaceId=111-222-333
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getWorkspaces<T = Models.GetWorkspaces>(
    parameters: Parameters.GetWorkspaces,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieve the either all Operations Workspace IDs associated with the Jira site or a specific Operations Workspace
   * ID for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * E.g. GET /workspace?workspaceId=111-222-333
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getWorkspaces<T = Models.GetWorkspaces>(parameters: Parameters.GetWorkspaces, callback?: never): Promise<T>;
  async getWorkspaces<T = Models.GetWorkspaces>(
    parameters: Parameters.GetWorkspaces,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/operations/1.0/linkedWorkspaces',
      method: 'GET',
      params: {
        workspaceId: parameters.workspaceId,
      },
    };

    return this.client.sendRequest(config, callback);
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
   * In the case of multiple Incidents and Reviews being submitted in one request, each is validated individually prior
   * to submission. Details of which entities failed submission (if any) are available in the response object.
   *
   * A maximum of 1000 incidents can be submitted in one request.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   */
  async submitEntity<T = Models.SubmitEntity>(
    parameters: Parameters.SubmitEntity,
    callback: Callback<T>,
  ): Promise<void>;
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
   * In the case of multiple Incidents and Reviews being submitted in one request, each is validated individually prior
   * to submission. Details of which entities failed submission (if any) are available in the response object.
   *
   * A maximum of 1000 incidents can be submitted in one request.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   */
  async submitEntity<T = Models.SubmitEntity>(parameters: Parameters.SubmitEntity, callback?: never): Promise<T>;
  async submitEntity<T = Models.SubmitEntity>(
    parameters: Parameters.SubmitEntity,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/operations/1.0/bulk',
      method: 'POST',
      data: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Bulk delete all Entries that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by. If more than one Property is
   * provided, data will be deleted that matches ALL of the Properties (e.g. treated as an AND). See the documentation
   * for the submitEntity operation for more details.
   *
   * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
   *
   * Deletion is performed asynchronously. The getIncidentById operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteEntityByProperty<T = unknown>(
    parameters: Parameters.DeleteEntityByProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Bulk delete all Entries that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by. If more than one Property is
   * provided, data will be deleted that matches ALL of the Properties (e.g. treated as an AND). See the documentation
   * for the submitEntity operation for more details.
   *
   * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
   *
   * Deletion is performed asynchronously. The getIncidentById operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteEntityByProperty<T = unknown>(
    parameters: Parameters.DeleteEntityByProperty,
    callback?: never,
  ): Promise<T>;
  async deleteEntityByProperty<T = unknown>(
    parameters: Parameters.DeleteEntityByProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/operations/1.0/bulkByProperties',
      method: 'DELETE',
      params: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieve the currently stored Incident data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getIncidentById<T = Models.GetIncidentById>(
    parameters: Parameters.GetIncidentById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieve the currently stored Incident data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getIncidentById<T = Models.GetIncidentById>(
    parameters: Parameters.GetIncidentById,
    callback?: never,
  ): Promise<T>;
  async getIncidentById<T = Models.GetIncidentById>(
    parameters: Parameters.GetIncidentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/operations/1.0/incidents/${parameters.incidentId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete the Incident data currently stored for the given ID.
   *
   * Deletion is performed asynchronously. The getIncidentById operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteIncidentById<T = void>(parameters: Parameters.DeleteIncidentById, callback: Callback<T>): Promise<void>;
  /**
   * Delete the Incident data currently stored for the given ID.
   *
   * Deletion is performed asynchronously. The getIncidentById operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteIncidentById<T = void>(parameters: Parameters.DeleteIncidentById, callback?: never): Promise<T>;
  async deleteIncidentById<T = void>(
    parameters: Parameters.DeleteIncidentById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/operations/1.0/incidents/${parameters.incidentId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieve the currently stored Review data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getReviewById<T = Models.GetReviewById>(
    parameters: Parameters.GetReviewById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieve the currently stored Review data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getReviewById<T = Models.GetReviewById>(parameters: Parameters.GetReviewById, callback?: never): Promise<T>;
  async getReviewById<T = Models.GetReviewById>(
    parameters: Parameters.GetReviewById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/operations/1.0/post-incident-reviews/${parameters.reviewId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
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
  async deleteReviewById<T = void>(parameters: Parameters.DeleteReviewById, callback: Callback<T>): Promise<void>;
  /**
   * Delete the Review data currently stored for the given ID.
   *
   * Deletion is performed asynchronously. The getReviewById operation can be used to confirm that data has been deleted
   * successfully (if needed).
   *
   * Only Connect apps that define the `jiraOperationsInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteReviewById<T = void>(parameters: Parameters.DeleteReviewById, callback?: never): Promise<T>;
  async deleteReviewById<T = void>(parameters: Parameters.DeleteReviewById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/operations/1.0/post-incident-reviews/${parameters.reviewId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
