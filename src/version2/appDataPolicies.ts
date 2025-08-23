import type { Client } from '../client';
import type { Request } from '../request';
import type { GetPoliciesParameters } from './parameters/getPoliciesParameters';

export class AppDataPolicies {
  constructor(private client: Client) {}
  /** Returns data policy for the workspace. */
  async getPolicy() {
    const request: Request = {
      url: '/rest/api/2/data-policy',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /** Returns data policies for the projects specified in the request. */
  async getPolicies(parameters: GetPoliciesParameters) {
    const request: Request = {
      url: '/rest/api/2/data-policy/project',
      method: 'GET',
      query: {
        ids: parameters.ids,
      },
    };

    return this.client.sendRequest(request);
  }
}
