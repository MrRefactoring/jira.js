import { UserSchema, type User } from '../models/user';
import type { CreateCustomer } from '../parameters/createCustomer';
import type { CreateCustomerSkippingPermissionCheck } from '../parameters/createCustomerSkippingPermissionCheck';
import type { RevokePortalOnlyAccessForUser } from '../parameters/revokePortalOnlyAccessForUser';
import type { Client, SendRequestOptions } from '#/core';

/**
 * This method adds a customer to the Jira Service Management instance by passing a JSON file including an email address
 * and display name. The display name does not need to be unique. The record's identifiers, `name` and `key`, are
 * automatically generated from the request details.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required**: Jira
 * Administrator Global permission
 */
export async function createCustomer(client: Client, parameters: CreateCustomer): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/servicedeskapi/customer',
    method: 'POST',
    searchParams: {
      strictConflictStatusCode: parameters.strictConflictStatusCode,
    },
    body: {
      displayName: parameters.displayName,
      email: parameters.email,
      fullName: parameters.fullName,
    },
    schema: UserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a customer account on behalf of jsd-nutmeg.
 *
 * This endpoint is restricted to jsd-nutmeg via ASAP authentication. It provides the same capability as the public
 * `POST /servicedeskapi/customer` endpoint, but does not require a User Context Token (UCT) or Connect app user —
 * authorization is enforced entirely via the ASAP token.
 *
 * No user permission checks are performed; `null` is passed as the acting user to bypass the permission check in the
 * underlying service.
 */
export async function createCustomerSkippingPermissionCheck(
  client: Client,
  parameters: CreateCustomerSkippingPermissionCheck,
): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/servicedeskapi/customer/skip-permission-check',
    method: 'POST',
    searchParams: {
      strictConflictStatusCode: parameters.strictConflictStatusCode,
    },
    body: {
      displayName: parameters.displayName,
      email: parameters.email,
      fullName: parameters.fullName,
    },
    schema: UserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * This method revokes portal-only access for a particular user, removing their ability to log in to the Jira Service
 * Management customer portal as a portal-only user. After revocation, the user cannot submit or view requests through
 * the portal.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/service-desk/rest/intro#permissions) required:** Site
 * administration (that is, member of the _site-admin_ [group](https://confluence.atlassian.com/x/24xjL)).
 */
export async function revokePortalOnlyAccessForUser(
  client: Client,
  parameters: RevokePortalOnlyAccessForUser,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/customer/user/${parameters.accountId}/revoke-portal-only-access`,
    method: 'PUT',
  };

  return await client.sendRequest(config);
}
