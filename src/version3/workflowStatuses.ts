import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class WorkflowStatuses {
  constructor(private client: Client) { }
  /**
     * Returns a list of all statuses associated with workflows.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None. */
  async getStatuses<T = unknown>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns a list of all statuses associated with workflows.
     *
     * This operation can be accessed anonymously.
     *
     * **[Permissions](#permissions) required:** None. */
  async getStatuses<T = unknown>(callback?: undefined): Promise<T>;
  async getStatuses<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/status',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getStatuses' });
  }
  /**
     * Returns a status. The status must be associated with a workflow to be returned.
     *
     * If a name is used on more than one status, only the status found first is returned. Therefore, identifying the status by its ID may be preferable.
     *
     * This operation can be accessed anonymously.
     *
     * [Permissions](#permissions) required: None. */
  async getStatus<T = Models.StatusDetails>(parameters: Parameters.GetStatus, callback: Callback<T>): Promise<void>;
  /**
     * Returns a status. The status must be associated with a workflow to be returned.
     *
     * If a name is used on more than one status, only the status found first is returned. Therefore, identifying the status by its ID may be preferable.
     *
     * This operation can be accessed anonymously.
     *
     * [Permissions](#permissions) required: None. */
  async getStatus<T = Models.StatusDetails>(parameters: Parameters.GetStatus, callback?: undefined): Promise<T>;
  async getStatus<T = Models.StatusDetails>(parameters: Parameters.GetStatus, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/status/${parameters.idOrName}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getStatus' });
  }
}
