import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssuePriorities {
  constructor(private client: Client) { }
  /**
     * Returns the list of all issue priorities.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getPriorities<T = unknown>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns the list of all issue priorities.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getPriorities<T = unknown>(callback?: undefined): Promise<T>;
  async getPriorities<T = unknown>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/priority',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getPriorities' });
  }
  /**
     * Returns an issue priority.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority, callback: Callback<T>): Promise<void>;
  /**
     * Returns an issue priority.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority, callback?: undefined): Promise<T>;
  async getPriority<T = Models.Priority>(parameters: Parameters.GetPriority, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/priority/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getPriority' });
  }
}
