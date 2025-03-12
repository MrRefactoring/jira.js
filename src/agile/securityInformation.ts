import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class SecurityInformation {
  constructor(private client: Client) {}

  /**
   * Insert Security Workspace IDs to establish a relationship between them and the Jira site the app is installed on.
   * If a relationship between the workspace ID and Jira already exists then the workspace ID will be ignored and Jira
   * will process the rest of the entries.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   */
  async submitWorkspaces<T = void>(parameters: Parameters.SubmitWorkspaces, callback: Callback<T>): Promise<void>;
  /**
   * Insert Security Workspace IDs to establish a relationship between them and the Jira site the app is installed on.
   * If a relationship between the workspace ID and Jira already exists then the workspace ID will be ignored and Jira
   * will process the rest of the entries.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   */
  async submitWorkspaces<T = void>(parameters: Parameters.SubmitWorkspaces, callback?: never): Promise<T>;
  async submitWorkspaces<T = void>(parameters: Parameters.SubmitWorkspaces, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/security/1.0/linkedWorkspaces/bulk',
      method: 'POST',
      data: {
        workspaceIds: parameters.workspaceIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Bulk delete all linked Security Workspaces that match the given request.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   *
   * E.g. DELETE /bulk?workspaceIds=111-222-333,444-555-666
   */
  async deleteLinkedWorkspaces<T = void>(
    parameters: Parameters.DeleteLinkedWorkspaces,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Bulk delete all linked Security Workspaces that match the given request.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   *
   * E.g. DELETE /bulk?workspaceIds=111-222-333,444-555-666
   */
  async deleteLinkedWorkspaces<T = void>(parameters: Parameters.DeleteLinkedWorkspaces, callback?: never): Promise<T>;
  async deleteLinkedWorkspaces<T = void>(
    parameters: Parameters.DeleteLinkedWorkspaces,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/security/1.0/linkedWorkspaces/bulk',
      method: 'DELETE',
      params: {
        workspaceIds: parameters.workspaceIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieve all Security Workspaces linked with the Jira site.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getLinkedWorkspaces<T = Models.GetLinkedWorkspaces>(callback: Callback<T>): Promise<void>;
  /**
   * Retrieve all Security Workspaces linked with the Jira site.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getLinkedWorkspaces<T = Models.GetLinkedWorkspaces>(callback?: never): Promise<T>;
  async getLinkedWorkspaces<T = Models.GetLinkedWorkspaces>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/security/1.0/linkedWorkspaces',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieve a specific Security Workspace linked to the Jira site for the given workspace ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getLinkedWorkspaceById<T = Models.GetLinkedWorkspaceById>(
    parameters: Parameters.GetLinkedWorkspaceById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieve a specific Security Workspace linked to the Jira site for the given workspace ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getLinkedWorkspaceById<T = Models.GetLinkedWorkspaceById>(
    parameters: Parameters.GetLinkedWorkspaceById,
    callback?: never,
  ): Promise<T>;
  async getLinkedWorkspaceById<T = Models.GetLinkedWorkspaceById>(
    parameters: Parameters.GetLinkedWorkspaceById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/security/1.0/linkedWorkspaces/${parameters.workspaceId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Update / Insert Vulnerability data.
   *
   * Vulnerabilities are identified by their ID, any existing Vulnerability data with the same ID will be replaced if it
   * exists and the updateSequenceNumber of the existing data is less than the incoming data.
   *
   * Submissions are performed asynchronously. Most updates are available within a short period of time but may take
   * some time during peak load and/or maintenance times. The GET vulnerability endpoint can be used to confirm that
   * data has been stored successfully (if needed).
   *
   * In the case of multiple Vulnerabilities being submitted in one request, each is validated individually prior to
   * submission. Details of Vulnerabilities that failed submission (if any) are available in the response object.
   *
   * A maximum of 1000 vulnerabilities can be submitted in one request.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   */
  async submitVulnerabilities<T = Models.SubmitVulnerabilities>(
    parameters: Parameters.SubmitVulnerabilities,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Update / Insert Vulnerability data.
   *
   * Vulnerabilities are identified by their ID, any existing Vulnerability data with the same ID will be replaced if it
   * exists and the updateSequenceNumber of the existing data is less than the incoming data.
   *
   * Submissions are performed asynchronously. Most updates are available within a short period of time but may take
   * some time during peak load and/or maintenance times. The GET vulnerability endpoint can be used to confirm that
   * data has been stored successfully (if needed).
   *
   * In the case of multiple Vulnerabilities being submitted in one request, each is validated individually prior to
   * submission. Details of Vulnerabilities that failed submission (if any) are available in the response object.
   *
   * A maximum of 1000 vulnerabilities can be submitted in one request.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   */
  async submitVulnerabilities<T = Models.SubmitVulnerabilities>(
    parameters: Parameters.SubmitVulnerabilities,
    callback?: never,
  ): Promise<T>;
  async submitVulnerabilities<T = Models.SubmitVulnerabilities>(
    parameters: Parameters.SubmitVulnerabilities,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/security/1.0/bulk',
      method: 'POST',
      data: {
        operationType: parameters.operationType,
        properties: parameters.properties,
        vulnerabilities: parameters.vulnerabilities,
        providerMetadata: parameters.providerMetadata,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Bulk delete all Vulnerabilities that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by. If more than one Property is
   * provided, data will be deleted that matches ALL of the Properties (e.g. treated as an AND). Read the POST bulk
   * endpoint documentation for more details.
   *
   * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
   *
   * Deletion is performed asynchronously. The GET vulnerability endpoint can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteVulnerabilitiesByProperty<T = void>(
    parameters: Parameters.DeleteVulnerabilitiesByProperty,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Bulk delete all Vulnerabilities that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by. If more than one Property is
   * provided, data will be deleted that matches ALL of the Properties (e.g. treated as an AND). Read the POST bulk
   * endpoint documentation for more details.
   *
   * E.g. DELETE /bulkByProperties?accountId=account-123&createdBy=user-456
   *
   * Deletion is performed asynchronously. The GET vulnerability endpoint can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteVulnerabilitiesByProperty<T = void>(
    parameters: Parameters.DeleteVulnerabilitiesByProperty,
    callback?: never,
  ): Promise<T>;
  async deleteVulnerabilitiesByProperty<T = void>(
    parameters: Parameters.DeleteVulnerabilitiesByProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/security/1.0/bulkByProperties',
      method: 'DELETE',
      params: parameters,
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Retrieve the currently stored Vulnerability data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getVulnerabilityById<T = Models.GetVulnerabilityById>(
    parameters: Parameters.GetVulnerabilityById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Retrieve the currently stored Vulnerability data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'READ' scope for Connect apps.
   */
  async getVulnerabilityById<T = Models.GetVulnerabilityById>(
    parameters: Parameters.GetVulnerabilityById,
    callback?: never,
  ): Promise<T>;
  async getVulnerabilityById<T = Models.GetVulnerabilityById>(
    parameters: Parameters.GetVulnerabilityById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/security/1.0/vulnerability/${parameters.vulnerabilityId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Delete the Vulnerability data currently stored for the given ID.
   *
   * Deletion is performed asynchronously. The GET vulnerability endpoint can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteVulnerabilityById<T = void>(
    parameters: Parameters.DeleteVulnerabilityById,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * Delete the Vulnerability data currently stored for the given ID.
   *
   * Deletion is performed asynchronously. The GET vulnerability endpoint can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraSecurityInfoProvider` module can access this resource. This resource
   * requires the 'DELETE' scope for Connect apps.
   */
  async deleteVulnerabilityById<T = void>(parameters: Parameters.DeleteVulnerabilityById, callback?: never): Promise<T>;
  async deleteVulnerabilityById<T = void>(
    parameters: Parameters.DeleteVulnerabilityById,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/security/1.0/vulnerability/${parameters.vulnerabilityId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }
}
