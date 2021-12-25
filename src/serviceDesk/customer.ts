import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Customer {
  constructor(private client: Client) {}
  /**
   * This method adds a customer to the Jira Service Management instance by passing a JSON file including an email
   * address and display name. The display name does not need to be unique. The record's identifiers, `name` and
   * `key`, are automatically generated from the request details.
   *
   * **[Permissions](#permissions) required**: Jira Administrator Global permission
   */
  async createCustomer<T = Models.User>(
    parameters: Parameters.CreateCustomer | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * This method adds a customer to the Jira Service Management instance by passing a JSON file including an email
   * address and display name. The display name does not need to be unique. The record's identifiers, `name` and
   * `key`, are automatically generated from the request details.
   *
   * **[Permissions](#permissions) required**: Jira Administrator Global permission
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
        fullName: parameters?.fullName,
        displayName: parameters?.displayName,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
