import type { DeactivateUser } from '../parameters/deactivateUser';
import type { ActivateUser } from '../parameters/activateUser';
import type { DeleteAccount } from '../parameters/deleteAccount';
import type { CancelAccountDeletion } from '../parameters/cancelAccountDeletion';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Deactivate (block) the specified user account from logging into Atlassian. The permission to make use of this
 * resource is exposed by the `lifecycle.enablement` privilege. You can optionally set a message associated with the
 * block. If none is supplied, a default message will be used.
 */
export async function deactivateUser(
  client: Client,
  parameters: DeactivateUser,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/users/${parameters.accountId}/manage/lifecycle/disable`,
    method: 'POST',
    body: {
      message: parameters.message,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Activates the specified user account. The permission to make use of this resource is exposed by the
 * `lifecycle.enablement` privilege.
 *
 * User accounts that were deactivated due to US export controls cannot be reactivated using this API. If you believe
 * the account was incorrectly blocked, please contact [Atlassian Support](https://support.atlassian.com/contact).
 *
 * User accounts that have been deleted need the deletion to be canceled before reactivating.
 */
export async function activateUser(client: Client, parameters: ActivateUser, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/users/${parameters.accountId}/manage/lifecycle/enable`,
    method: 'POST',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * This API will:
 *
 * - Delete a managed account from Atlassian Administration.
 * - Withdraw complete access to all products and services listed in Atlassian Administration.
 * - Remove reference to the account from all lists under Directory in Atlassian Administration.
 *
 * Specifications:
 *
 * - Deleting an account is permanent. If you think you’ll need the account again, we recommend you
 *   [deactivate](https://support.atlassian.com/user-management/docs/deactivate-a-managed-account/) it instead.
 * - Before you permanently delete the account, you’ll have a 14-day grace period, during which the account will appear as
 *   temporarily deactivated.
 *
 * Learn more about [deleting a managed
 * account](https://support.atlassian.com/user-management/docs/delete-a-managed-account/).
 *
 * Learn the fastest way to get the paramaters and delete account with a detailed
 * [tutorial](https://developer.atlassian.com/cloud/admin/user-management/delete-managed-account/#delete-account).
 *
 * The permission to make use of this resource is exposed by the `lifecycle.delete` privilege. Learn more about [Get
 * user management permissions
 * API](https://developer.atlassian.com/cloud/admin/user-management/rest/api-group-manage/#api-users-account-id-manage-get)
 * to manage the specified user.
 */
export async function deleteAccount(
  client: Client,
  parameters: DeleteAccount,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/users/${parameters.accountId}/manage/lifecycle/delete`,
    method: 'POST',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * This API will:
 *
 * - Cancel the scheduled deletion of the specified managed account.
 * - Restore and activate the user’s account.
 *
 * Specifications:
 *
 * - You can cancel the deletion within the 14-day grace period of deleting a managed account. After that the account is
 *   permanently deleted.
 *
 * The permission to make use of this resource is exposed by the `lifecycle.delete` privilege. Learn more about [Get
 * user management permissions
 * API](https://developer.atlassian.com/cloud/admin/user-management/rest/api-group-manage/#api-users-account-id-manage-get)
 * to manage the specified user.
 */
export async function cancelAccountDeletion(
  client: Client,
  parameters: CancelAccountDeletion,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/users/${parameters.accountId}/manage/lifecycle/cancel-delete`,
    method: 'POST',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
