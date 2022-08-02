import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class IssueResolutions {
  constructor(private client: Client) {}

  /**
   * Returns a list of all issue resolution values.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getResolutions<T = Models.Resolution[]>(callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of all issue resolution values.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getResolutions<T = Models.Resolution[]>(callback?: never): Promise<T>;
  async getResolutions<T = Models.Resolution[]>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/resolution',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns an issue resolution value.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getResolution<T = Models.Resolution>(
    parameters: Parameters.GetResolution | string,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns an issue resolution value.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async getResolution<T = Models.Resolution>(
    parameters: Parameters.GetResolution | string,
    callback?: never
  ): Promise<T>;
  async getResolution<T = Models.Resolution>(
    parameters: Parameters.GetResolution | string,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const id = typeof parameters === 'string' ? parameters : parameters.id;

    const config: RequestConfig = {
      url: `/rest/api/2/resolution/${id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }
}
