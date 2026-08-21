import { UserSchema, type User } from '../models/user';
import type { CreateCustomer } from '../parameters/createCustomer';
import type { AddCustomers } from '../parameters/addCustomers';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Creates a customer that is not associated with a service project.
 *
 * The customer's username is their email address. They can set a password by clicking "Forgotten your password" onthe
 * portal login screen, or a Jira administrator can set one in User Management. By default, the customer canemail
 * requests to [public service
 * projects](https://confluence.atlassian.com/display/SERVICEDESKSERVER032/Managing+access+to+your+service+desk). If
 * they have a password, they can also raise requests in customer portals that allowpublic signup. To raise requests in
 * closed service projects, the customer must be added to a service projectusing [Add
 * customers](#servicedeskapi-servicedesk-{serviceDeskId}-customer-post).
 *
 * This operation does not cause invitation email to be sent to the newly created customer.
 *
 * Jira administrator global permission is required to create a customer.
 */
export async function createCustomer(client: Client, parameters: CreateCustomer): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/servicedeskapi/customer',
    method: 'POST',
    body: {
      email: parameters.email,
      fullName: parameters.fullName,
    },
    schema: UserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Adds one or more existing customers to the given service project. If you need to create a customer, see Create
 * customer.
 *
 * Administer project permission is required, or agents if public signups and invites are enabled for the service
 * project.)
 */
export async function addCustomers(client: Client, parameters: AddCustomers): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/customer`,
    method: 'POST',
    body: {
      usernames: parameters.usernames,
    },
    schema: UserSchema,
  };

  return await client.sendRequest(config);
}
