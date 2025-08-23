import type { Client } from '../client';
import type { Request } from '../request';
import type { ServicesParameters } from './parameters/servicesParameters';

export class ServiceRegistry {
  constructor(private client: Client) {}
  /**
   * Retrieve the attributes of given service registries. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** Only
   *   Connect apps can make this request and the servicesIds belong to the tenant you are requesting
   */
  async services(parameters: ServicesParameters) {
    const request: Request = {
      url: '/rest/atlassian-connect/1/service-registry',
      method: 'GET',
      query: {
        serviceIds: parameters.serviceIds,
      },
    };

    return this.client.sendRequest(request);
  }
}
