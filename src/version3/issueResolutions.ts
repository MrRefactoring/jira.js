import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class IssueResolutions {
  constructor(private client: Client) { }
  /**
     * Returns a list of all issue resolution values.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getResolutions<T = any>(callback?: Callback<T>): Promise<void>;
  /**
     * Returns a list of all issue resolution values.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getResolutions<T = any>(callback?: undefined): Promise<T>;
  async getResolutions<T = any>(callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/resolution',
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getResolutions' });
  }
  /**
     * Returns an issue resolution value.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getResolution<T = Models.Resolution>(parameters: Parameters.GetResolution, callback: Callback<T>): Promise<void>;
  /**
     * Returns an issue resolution value.
     *
     * **[Permissions](#permissions) required:** Permission to access Jira. */
  async getResolution<T = Models.Resolution>(parameters: Parameters.GetResolution, callback?: undefined): Promise<T>;
  async getResolution<T = Models.Resolution>(parameters: Parameters.GetResolution, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/resolution/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback, { methodName: 'getResolution' });
  }
}
