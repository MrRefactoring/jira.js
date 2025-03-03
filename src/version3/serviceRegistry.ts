import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class ServiceRegistry {
  constructor(private client: Client) {}

  /**
   * Retrieve the attributes of given service registries.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can make this request and the servicesIds belong to the tenant you are requesting
   */
  async services<T = Models.ServiceRegistry[]>(parameters: Parameters.Services, callback: Callback<T>): Promise<void>;
  /**
   * Retrieve the attributes of given service registries.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Only
   * Connect apps can make this request and the servicesIds belong to the tenant you are requesting
   */
  async services<T = Models.ServiceRegistry[]>(parameters: Parameters.Services, callback?: never): Promise<T>;
  async services<T = Models.ServiceRegistry[]>(
    parameters: Parameters.Services,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/atlassian-connect/1/service-registry',
      method: 'GET',
      params: {
        serviceIds: parameters.serviceIds,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
