import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Client } from '../clients';
import type { Callback } from '../callback';
import type { Request } from '../request';

export class AppDataPolicies {
  constructor(private client: Client) {}

  /** Returns data policy for the workspace. */
  async getPolicy<T = Models.WorkspaceDataPolicy>(callback: Callback<T>): Promise<void>;
  /** Returns data policy for the workspace. */
  async getPolicy<T = Models.WorkspaceDataPolicy>(callback?: never): Promise<T>;
  async getPolicy<T = Models.WorkspaceDataPolicy>(): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/data-policy',
      method: 'GET',
    };

    return this.client.sendRequest(config);
  }

  /** Returns data policies for the projects specified in the request. */
  async getPolicies<T = Models.ProjectDataPolicies>(
    parameters: Parameters.GetPolicies,
    callback: Callback<T>,
  ): Promise<void>;
  /** Returns data policies for the projects specified in the request. */
  async getPolicies<T = Models.ProjectDataPolicies>(parameters: Parameters.GetPolicies, callback?: never): Promise<T>;
  async getPolicies<T = Models.ProjectDataPolicies>(parameters: Parameters.GetPolicies): Promise<void | T> {
    const config: Request = {
      url: '/rest/api/3/data-policy/project',
      method: 'GET',
      query: {
        ids: typeof parameters.ids === 'string' ? parameters.ids : parameters.ids.join(','),
      },
    };

    return this.client.sendRequest(config);
  }
}
