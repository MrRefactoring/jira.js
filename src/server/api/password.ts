import type { GetPasswordPolicy } from '../parameters/getPasswordPolicy';
import type { PolicyCheckCreateUser } from '../parameters/policyCheckCreateUser';
import type { PolicyCheckUpdateUser } from '../parameters/policyCheckUpdateUser';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns the list of requirements for the current password policy. For example, "The password must have at least 10
 * characters.", "The password must not be similar to the user's name or email address.", etc.
 */
export async function getPasswordPolicy(
  client: Client,
  parameters?: GetPasswordPolicy,
  options?: RequestOptions,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/password/policy',
    method: 'GET',
    searchParams: {
      hasOldPassword: parameters?.hasOldPassword,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of statements explaining why the password policy would disallow a proposed password for a new user.
 * You can use this method to test the password policy validation. This could be done prior to an action where a new
 * user and related password are created, using methods like the ones in
 * [UserService](https://docs.atlassian.com/software/jira/docs/api/latest/com/atlassian/jira/bc/user/UserService.html).
 * For example, you could use this to validate a password in a create user form in the user interface, as the user
 * enters it. The username and new password must be not empty to perform the validation. Note, this method will help you
 * validate against the policy only. It won't check any other validations that might be performed when creating a new
 * user, e.g. checking whether a user with the same name already exists.
 */
export async function policyCheckCreateUser(
  client: Client,
  parameters: PolicyCheckCreateUser,
  options?: RequestOptions,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/password/policy/createUser',
    method: 'POST',
    body: {
      displayName: parameters.displayName,
      emailAddress: parameters.emailAddress,
      password: parameters.password,
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of statements explaining why the password policy would disallow a proposed new password for a user
 * with an existing password. You can use this method to test the password policy validation. This could be done prior
 * to an action where the password is actually updated, using methods like ChangePassword or ResetPassword. For example,
 * you could use this to validate a password in a change password form in the user interface, as the user enters it. The
 * user must exist and the username and new password must be not empty, to perform the validation. Note, this method
 * will help you validate against the policy only. It won't check any other validations that might be performed when
 * submitting a password change/reset request, e.g. verifying whether the old password is valid.
 */
export async function policyCheckUpdateUser(
  client: Client,
  parameters: PolicyCheckUpdateUser,
  options?: RequestOptions,
): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/password/policy/updateUser',
    method: 'POST',
    body: {
      newPassword: parameters.newPassword,
      oldPassword: parameters.oldPassword,
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
