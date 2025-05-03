import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { RequestConfig } from '../requestConfig';

export class AppDataPolicies {
  constructor(private client: Client) {}

  /** Returns data policy for the workspace. */
  async getPolicy<T = Models.WorkspaceDataPolicy>(callback: Callback<T>): Promise<void>;
  /** Returns data policy for the workspace. */
  async getPolicy<T = Models.WorkspaceDataPolicy>(callback?: never): Promise<T>;
  async getPolicy<T = Models.WorkspaceDataPolicy>(callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/data-policy',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /** Returns data policies for the projects specified in the request. */
  async getPolicies<T = Models.ProjectDataPolicies>(
    parameters: Parameters.GetPolicies | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns data policies for the projects specified in the request. */
  async getPolicies<T = Models.ProjectDataPolicies>(parameters?: Parameters.GetPolicies, callback?: never): Promise<T>;
  async getPolicies<T = Models.ProjectDataPolicies>(
    parameters?: Parameters.GetPolicies,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/data-policy/project',
      method: 'GET',
      params: {
        ids: parameters?.ids,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
