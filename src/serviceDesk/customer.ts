import type * as Models from './models';
import type * as Parameters from './parameters';
import type { Callback } from '../callback';
import type { Client } from '../clients';
import type { RequestConfig } from '../requestConfig';

export class Customer {
  constructor(private client: Client) {}

  /**
   * This method adds a customer to the Jira Service Management instance by passing a JSON file including an email
   * address and display name. The display name does not need to be unique. The record's identifiers, `name` and `key`,
   * are automatically generated from the request details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Jira
   * Administrator Global permission
   */
  async createCustomer<T = Models.User>(
    parameters: Parameters.CreateCustomer | undefined,
    callback: Callback<T>,
  ): Promise<void>;
  /**
   * This method adds a customer to the Jira Service Management instance by passing a JSON file including an email
   * address and display name. The display name does not need to be unique. The record's identifiers, `name` and `key`,
   * are automatically generated from the request details.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro/#permissions) required**: Jira
   * Administrator Global permission
   */
  async createCustomer<T = Models.User>(parameters?: Parameters.CreateCustomer, callback?: never): Promise<T>;
  async createCustomer<T = Models.User>(
    parameters?: Parameters.CreateCustomer,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/servicedeskapi/customer',
      method: 'POST',
      data: {
        email: parameters?.email,
        displayName: parameters?.displayName,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
