import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class RemoteLinks {
  constructor(private client: Client) {
  }

  /**
   * Update / insert Remote Link data.
   *
   * Remote Links are identified by their ID, existing Remote Link data for the same ID will be replaced if it
   * exists and the updateSequenceId of existing data is less than the incoming data.
   *
   * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
   * available within a short period of time, but may take some time during peak load and/or maintenance times.
   * The `getRemoteLinkById` operation can be used to confirm that data has been stored successfully (if needed).
   *
   * In the case of multiple Remote Links being submitted in one request, each is validated individually prior to
   * submission. Details of which Remote LInk failed submission (if any) are available in the response object.
   *
   * Only Connect apps that define the `jiraRemoteLinkInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   *  */
  async submitRemoteLinks<T = Models.SubmitRemoteLinks>(parameters: Parameters.SubmitRemoteLinks | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Update / insert Remote Link data.
   *
   * Remote Links are identified by their ID, existing Remote Link data for the same ID will be replaced if it
   * exists and the updateSequenceId of existing data is less than the incoming data.
   *
   * Submissions are performed asynchronously. Submitted data will eventually be available in Jira; most updates are
   * available within a short period of time, but may take some time during peak load and/or maintenance times.
   * The `getRemoteLinkById` operation can be used to confirm that data has been stored successfully (if needed).
   *
   * In the case of multiple Remote Links being submitted in one request, each is validated individually prior to
   * submission. Details of which Remote LInk failed submission (if any) are available in the response object.
   *
   * Only Connect apps that define the `jiraRemoteLinkInfoProvider` module can access this resource. This resource
   * requires the 'WRITE' scope for Connect apps.
   *  */
  async submitRemoteLinks<T = Models.SubmitRemoteLinks>(parameters?: Parameters.SubmitRemoteLinks, callback?: never): Promise<T>;
  async submitRemoteLinks<T = Models.SubmitRemoteLinks>(parameters?: Parameters.SubmitRemoteLinks, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/remotelinks/1.0/bulk',
      method: 'POST',
      data: {
        properties: parameters?.properties,
        remoteLinks: parameters?.remoteLinks,
        providerMetadata: parameters?.providerMetadata,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.remoteLinks.submitRemoteLinks' });
  }

  /**
   * Bulk delete all Remote Links data that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by.
   * Optional param `_updateSequenceNumber` is no longer supported. If more than one Property is provided,
   * data will be deleted that matches ALL of the Properties (e.g. treated as an AND).
   *
   * See the documentation for the `submitRemoteLinks` operation for more details.
   *
   * e.g. DELETE /bulkByProperties?accountId=account-123&repoId=repo-345
   *
   * Deletion is performed asynchronously. The `getRemoteLinkById` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraRemoteLinkInfoProvider` module, and on-premise integrations, can access this resource.
   * This resource requires the 'WRITE' scope for Connect apps.
   *  */
  async deleteRemoteLinksByProperty<T = unknown>(parameters: Parameters.DeleteRemoteLinksByProperty | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Bulk delete all Remote Links data that match the given request.
   *
   * One or more query params must be supplied to specify Properties to delete by.
   * Optional param `_updateSequenceNumber` is no longer supported. If more than one Property is provided,
   * data will be deleted that matches ALL of the Properties (e.g. treated as an AND).
   *
   * See the documentation for the `submitRemoteLinks` operation for more details.
   *
   * e.g. DELETE /bulkByProperties?accountId=account-123&repoId=repo-345
   *
   * Deletion is performed asynchronously. The `getRemoteLinkById` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraRemoteLinkInfoProvider` module, and on-premise integrations, can access this resource.
   * This resource requires the 'WRITE' scope for Connect apps.
   *  */
  async deleteRemoteLinksByProperty<T = unknown>(parameters?: Parameters.DeleteRemoteLinksByProperty, callback?: never): Promise<T>;
  async deleteRemoteLinksByProperty<T = unknown>(parameters?: Parameters.DeleteRemoteLinksByProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/remotelinks/1.0/bulkByProperties',
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters?._updateSequenceNumber || parameters?.updateSequenceNumber,
        params: parameters?.params,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.remoteLinks.deleteRemoteLinksByProperty' });
  }

  /**
   * Retrieve the currently stored Remote Link data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraRemoteLinkInfoProvider` module, and on-premise integrations, can access this resource.
   * This resource requires the 'WRITE' scope for Connect apps.
   *  */
  async getRemoteLinkById<T = Models.GetRemoteLinkById>(parameters: Parameters.GetRemoteLinkById, callback: Callback<T>): Promise<void>;
  /**
   * Retrieve the currently stored Remote Link data for the given ID.
   *
   * The result will be what is currently stored, ignoring any pending updates or deletes.
   *
   * Only Connect apps that define the `jiraRemoteLinkInfoProvider` module, and on-premise integrations, can access this resource.
   * This resource requires the 'WRITE' scope for Connect apps.
   *  */
  async getRemoteLinkById<T = Models.GetRemoteLinkById>(parameters: Parameters.GetRemoteLinkById, callback?: never): Promise<T>;
  async getRemoteLinkById<T = Models.GetRemoteLinkById>(parameters: Parameters.GetRemoteLinkById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/remotelinks/1.0/remotelink/${parameters.remoteLinkId}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.remoteLinks.getRemoteLinkById' });
  }

  /**
   * Delete the Remote Link data currently stored for the given ID.
   *
   * Deletion is performed asynchronously. The `getRemoteLinkById` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraRemoteLinkInfoProvider` module, and on-premise integrations, can access this resource.
   * This resource requires the 'WRITE' scope for Connect apps.
   *  */
  async deleteRemoteLinkById<T = unknown>(parameters: Parameters.DeleteRemoteLinkById, callback: Callback<T>): Promise<void>;
  /**
   * Delete the Remote Link data currently stored for the given ID.
   *
   * Deletion is performed asynchronously. The `getRemoteLinkById` operation can be used to confirm that data has been
   * deleted successfully (if needed).
   *
   * Only Connect apps that define the `jiraRemoteLinkInfoProvider` module, and on-premise integrations, can access this resource.
   * This resource requires the 'WRITE' scope for Connect apps.
   *  */
  async deleteRemoteLinkById<T = unknown>(parameters: Parameters.DeleteRemoteLinkById, callback?: never): Promise<T>;
  async deleteRemoteLinkById<T = unknown>(parameters: Parameters.DeleteRemoteLinkById, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/remotelinks/1.0/remotelink/${parameters.remoteLinkId}`,
      method: 'DELETE',
      params: {
        _updateSequenceNumber: parameters._updateSequenceNumber || parameters.updateSequenceNumber,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'agile.remoteLinks.deleteRemoteLinkById' });
  }
}
