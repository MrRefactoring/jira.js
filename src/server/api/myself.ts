import { UserSchema, type User } from '../models/user';
import { UserWriteSchema, type UserWrite } from '../models/userWrite';
import type { UpdateCurrentUser } from '../parameters/updateCurrentUser';
import type { ChangeMyPassword } from '../parameters/changeMyPassword';
import type { Client, SendRequestOptions } from '#/core';

/** Returns currently logged user. This resource cannot be accessed anonymously */
export async function getCurrentUser(client: Client): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/api/2/myself',
    method: 'GET',
    schema: UserSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Modify currently logged user. The 'value' fields present will override the existing value. Fields skipped in request
 * will not be changed. Only email and display name can be change that way. Requires user password.
 */
export async function updateCurrentUser(client: Client, parameters: UpdateCurrentUser): Promise<UserWrite> {
  const config: SendRequestOptions<UserWrite> = {
    url: '/rest/api/2/myself',
    method: 'PUT',
    body: {
      active: parameters.active,
      applicationKeys: parameters.applicationKeys,
      displayName: parameters.displayName,
      emailAddress: parameters.emailAddress,
      key: parameters.key,
      name: parameters.name,
      notification: parameters.notification,
      password: parameters.password,
      self: parameters.self,
    },
    schema: UserWriteSchema,
  };

  return await client.sendRequest(config);
}

/** Modify caller password. */
export async function changeMyPassword(client: Client, parameters: ChangeMyPassword): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/myself/password',
    method: 'PUT',
    body: {
      currentPassword: parameters.currentPassword,
      password: parameters.password,
    },
  };

  return await client.sendRequest(config);
}
