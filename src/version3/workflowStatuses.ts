import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class WorkflowStatuses {
  constructor(private client: Client) {}

  /**
   * Returns a list of all statuses associated with active workflows.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getStatuses<T = Models.StatusDetails[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of all statuses associated with active workflows.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getStatuses<T = Models.StatusDetails[]>(callback?: never): Promise<T>;
  async getStatuses<T = Models.StatusDetails[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/status',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a status. The status must be associated with an active workflow to be returned.
   *
   * If a name is used on more than one status, only the status found first is returned. Therefore, identifying the
   * status by its ID may be preferable.
   *
   * This operation can be accessed anonymously.
   *
   * [Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required: None.
   */
  async getStatus<T = Models.StatusDetails>(
    parameters: Parameters.GetStatus | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a status. The status must be associated with an active workflow to be returned.
   *
   * If a name is used on more than one status, only the status found first is returned. Therefore, identifying the
   * status by its ID may be preferable.
   *
   * This operation can be accessed anonymously.
   *
   * [Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required: None.
   */
  async getStatus<T = Models.StatusDetails>(parameters: Parameters.GetStatus | string, callback?: never): Promise<T>;
  async getStatus<T = Models.StatusDetails>(
    parameters: Parameters.GetStatus | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const idOrName = typeof parameters === 'string' ? parameters : parameters.idOrName;

    const config: RequestConfig = {
      url: `/rest/api/3/status/${idOrName}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
