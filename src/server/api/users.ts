import { UserSchema, type User } from '../models/user';
import { UserWriteSchema, type UserWrite } from '../models/userWrite';
import { A11yPersonalSettingSchema, type A11yPersonalSetting } from '../models/a11yPersonalSetting';
import {
  UserAnonymizationValidationSchema,
  type UserAnonymizationValidation,
} from '../models/userAnonymizationValidation';
import { AvatarSchema, type Avatar } from '../models/avatar';
import { GetAllUserAvatarsSchema, type GetAllUserAvatars } from '../models/getAllUserAvatars';
import { ColumnOptionsSchema, type ColumnOptions } from '../models/columnOptions';
import { StreamPageSchema, type StreamPage } from '../models/streamPage';
import { UserPickerResultsSchema, type UserPickerResults } from '../models/userPickerResults';
import { EntityPropertiesKeysSchema, type EntityPropertiesKeys } from '../models/entityPropertiesKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import type { GetUser } from '../parameters/getUser';
import type { CreateUser } from '../parameters/createUser';
import type { UpdateUser } from '../parameters/updateUser';
import type { RemoveUser } from '../parameters/removeUser';
import type { ValidateUserAnonymization } from '../parameters/validateUserAnonymization';
import type { ScheduleUserAnonymization } from '../parameters/scheduleUserAnonymization';
import type { GetUserAnonymizationProgress } from '../parameters/getUserAnonymizationProgress';
import type { ValidateUserAnonymizationRerun } from '../parameters/validateUserAnonymizationRerun';
import type { ScheduleUserAnonymizationRerun } from '../parameters/scheduleUserAnonymizationRerun';
import type { AddUserToApplication } from '../parameters/addUserToApplication';
import type { RemoveUserFromApplication } from '../parameters/removeUserFromApplication';
import type { FindBulkAssignableUsers } from '../parameters/findBulkAssignableUsers';
import type { FindAssignableUsers } from '../parameters/findAssignableUsers';
import type { CreateUserAvatarFromTemporary } from '../parameters/createUserAvatarFromTemporary';
import type { UpdateUserAvatar } from '../parameters/updateUserAvatar';
import type { StoreTemporaryUserAvatarUsingMultiPart } from '../parameters/storeTemporaryUserAvatarUsingMultiPart';
import type { DeleteUserAvatar } from '../parameters/deleteUserAvatar';
import type { GetAllUserAvatars as GetAllUserAvatarsParameters } from '../parameters/getAllUserAvatars';
import type { DefaultColumns } from '../parameters/defaultColumns';
import type { SetColumnsUrlEncoded } from '../parameters/setColumnsUrlEncoded';
import type { ResetUserColumns } from '../parameters/resetUserColumns';
import type { GetDuplicatedUsersCount } from '../parameters/getDuplicatedUsersCount';
import type { GetDuplicatedUsersMapping } from '../parameters/getDuplicatedUsersMapping';
import type { GetUserList } from '../parameters/getUserList';
import type { ChangeUserPassword } from '../parameters/changeUserPassword';
import type { FindUsersForPicker } from '../parameters/findUsersForPicker';
import type { GetUserPropertyKeys } from '../parameters/getUserPropertyKeys';
import type { GetUserProperty } from '../parameters/getUserProperty';
import type { SetUserProperty } from '../parameters/setUserProperty';
import type { DeleteUserProperty } from '../parameters/deleteUserProperty';
import type { FindUsers } from '../parameters/findUsers';
import type { DeleteSession } from '../parameters/deleteSession';
import type { FindUsersWithBrowsePermission } from '../parameters/findUsersWithBrowsePermission';
import { type Client, type RequestOptions, type SendRequestOptions, toFormDataFile } from '#/core';
import { z } from 'zod';

/** Returns a user. */
export async function getUser(client: Client, parameters?: GetUser, options?: RequestOptions): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/api/2/user',
    method: 'GET',
    searchParams: {
      includeDeleted: parameters?.includeDeleted,
      key: parameters?.key,
      username: parameters?.username,
    },
    schema: UserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Create user. By default created user will not be notified with email. If password field is not set then password will
 * be randomly generated.
 */
export async function createUser(client: Client, parameters: CreateUser, options?: RequestOptions): Promise<UserWrite> {
  const config: SendRequestOptions<UserWrite> = {
    url: '/rest/api/2/user',
    method: 'POST',
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
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Modify user. The 'value' fields present will override the existing value. Fields skipped in request will not be
 * changed.
 */
export async function updateUser(client: Client, parameters: UpdateUser, options?: RequestOptions): Promise<UserWrite> {
  const config: SendRequestOptions<UserWrite> = {
    url: '/rest/api/2/user',
    method: 'PUT',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
    },
    body: parameters.body,
    schema: UserWriteSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Removes user and its references (like project roles associations, watches, history). Note: user references will not
 * be removed if multiple User Directories are used and there is a user with the same name existing in another directory
 * (shadowing user).
 */
export async function removeUser(client: Client, parameters: RemoveUser, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user',
    method: 'DELETE',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns available accessibility personal settings along with `enabled` property that indicates the currently
 * logged-in user preference.
 */
export async function getA11yPersonalSettings(
  client: Client,
  options?: RequestOptions,
): Promise<A11yPersonalSetting[]> {
  const config: SendRequestOptions<A11yPersonalSetting[]> = {
    url: '/rest/api/2/user/a11y/personal-settings',
    method: 'GET',
    schema: z.array(A11yPersonalSettingSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Validates user anonymization process. */
export async function validateUserAnonymization(
  client: Client,
  parameters?: ValidateUserAnonymization,
  options?: RequestOptions,
): Promise<UserAnonymizationValidation> {
  const config: SendRequestOptions<UserAnonymizationValidation> = {
    url: '/rest/api/2/user/anonymization',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
      userKey: parameters?.userKey,
    },
    schema: UserAnonymizationValidationSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Schedules a user anonymization process. Requires system admin permission. */
export async function scheduleUserAnonymization(
  client: Client,
  parameters: ScheduleUserAnonymization,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/anonymization',
    method: 'POST',
    body: {
      newOwnerKey: parameters.newOwnerKey,
      userKey: parameters.userKey,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns information about a user anonymization operation progress. */
export async function getUserAnonymizationProgress(
  client: Client,
  parameters?: GetUserAnonymizationProgress,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/anonymization/progress',
    method: 'GET',
    searchParams: {
      taskId: parameters?.taskId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Validates user anonymization re-run process. */
export async function validateUserAnonymizationRerun(
  client: Client,
  parameters?: ValidateUserAnonymizationRerun,
  options?: RequestOptions,
): Promise<UserAnonymizationValidation> {
  const config: SendRequestOptions<UserAnonymizationValidation> = {
    url: '/rest/api/2/user/anonymization/rerun',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
      oldUserKey: parameters?.oldUserKey,
      oldUserName: parameters?.oldUserName,
      userKey: parameters?.userKey,
    },
    schema: UserAnonymizationValidationSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Schedules a user anonymization process. Requires system admin permission. */
export async function scheduleUserAnonymizationRerun(
  client: Client,
  parameters: ScheduleUserAnonymizationRerun,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/anonymization/rerun',
    method: 'POST',
    body: {
      newOwnerKey: parameters.newOwnerKey,
      oldUserKey: parameters.oldUserKey,
      oldUserName: parameters.oldUserName,
      userKey: parameters.userKey,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Removes stale user anonymization task, for scenarios when the node that was executing it is no longer alive. Use it
 * only after making sure that the parent node of the task is actually down, and not just having connectivity issues.
 */
export async function unlockAnonymization(client: Client, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/anonymization/unlock',
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Add user to given application. Admin permission will be required to perform this operation. */
export async function addUserToApplication(
  client: Client,
  parameters: AddUserToApplication,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/application',
    method: 'POST',
    searchParams: {
      applicationKey: parameters.applicationKey,
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Remove user from given application. Admin permission will be required to perform this operation. */
export async function removeUserFromApplication(
  client: Client,
  parameters: RemoveUserFromApplication,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/application',
    method: 'DELETE',
    searchParams: {
      applicationKey: parameters.applicationKey,
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a list of users that match the search string and can be assigned issues for all the given projects. */
export async function findBulkAssignableUsers(
  client: Client,
  parameters?: FindBulkAssignableUsers,
  options?: RequestOptions,
): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/api/2/user/assignable/multiProjectSearch',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      projectKeys: parameters?.projectKeys,
      username: parameters?.username,
    },
    schema: UserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of users that match the search string. This resource cannot be accessed anonymously. Please note that
 * this resource should be called with an issue key when a list of assignable users is retrieved. For create only a
 * project key should be supplied. The list of assignable users may be incorrect if it's called with the project key for
 * editing.
 */
export async function findAssignableUsers(
  client: Client,
  parameters?: FindAssignableUsers,
  options?: RequestOptions,
): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/api/2/user/assignable/search',
    method: 'GET',
    searchParams: {
      issueKey: parameters?.issueKey,
      maxResults: parameters?.maxResults,
      project: parameters?.project,
      actionDescriptorId: parameters?.actionDescriptorId,
      username: parameters?.username,
    },
    schema: UserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Converts temporary avatar into a real avatar */
export async function createUserAvatarFromTemporary(
  client: Client,
  parameters: CreateUserAvatarFromTemporary,
  options?: RequestOptions,
): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: '/rest/api/2/user/avatar',
    method: 'POST',
    searchParams: {
      username: parameters.username,
    },
    body: {
      cropperOffsetX: parameters.cropperOffsetX,
      cropperOffsetY: parameters.cropperOffsetY,
      cropperWidth: parameters.cropperWidth,
      needsCropping: parameters.needsCropping,
      url: parameters.url,
    },
    schema: AvatarSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Updates the avatar for the user. */
export async function updateUserAvatar(
  client: Client,
  parameters: UpdateUserAvatar,
  options?: RequestOptions,
): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: '/rest/api/2/user/avatar',
    method: 'PUT',
    searchParams: {
      username: parameters.username,
    },
    body: {
      id: parameters.id,
      owner: parameters.owner,
      selected: parameters.selected,
      isSelected: parameters.isSelected,
      isSystemAvatar: parameters.isSystemAvatar,
      isDeletable: parameters.isDeletable,
      fileName: parameters.fileName,
      urls: parameters.urls,
    },
    schema: AvatarSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates temporary avatar using multipart. The response is sent back as JSON stored in a textarea. This is because the
 * client uses remote iframing to submit avatars using multipart. So we must send them a valid HTML page back from which
 * the client parses the JSON from. Creating a temporary avatar is part of a 3-step process in uploading a new avatar
 * for a user: upload, crop, confirm. This endpoint allows you to use a multipart upload instead of sending the image
 * directly as the request body. You _must_ use "avatar" as the name of the upload parameter: curl -c cookiejar.txt -X
 * POST -u admin:admin -H "X-Atlassian-Token: no-check"\
 * -F "avatar=@mynewavatar.png;type=image/png"\
 * 'http://localhost:8090/jira/rest/api/2/user/avatar/temporary?username=admin'
 */
export async function storeTemporaryUserAvatarUsingMultiPart(
  client: Client,
  parameters: StoreTemporaryUserAvatarUsingMultiPart,
  options?: RequestOptions,
): Promise<unknown> {
  const formData = new FormData();
  const items = Array.isArray(parameters.avatar) ? parameters.avatar : [parameters.avatar];

  for (const attachment of items) {
    formData.append('avatar', await toFormDataFile(attachment), attachment.filename);
  }

  const config: SendRequestOptions<unknown> = {
    url: '/rest/api/2/user/avatar/temporary',
    method: 'POST',
    headers: {
      'X-Atlassian-Token': 'no-check',
    },
    searchParams: {
      username: parameters.username,
    },
    body: formData,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes avatar */
export async function deleteUserAvatar(
  client: Client,
  parameters: DeleteUserAvatar,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/user/avatar/${parameters.id}`,
    method: 'DELETE',
    searchParams: {
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns all avatars which are visible for the currently logged in user. */
export async function getAllUserAvatars(
  client: Client,
  parameters?: GetAllUserAvatarsParameters,
  options?: RequestOptions,
): Promise<GetAllUserAvatars> {
  const config: SendRequestOptions<GetAllUserAvatars> = {
    url: '/rest/api/2/user/avatars',
    method: 'GET',
    searchParams: {
      username: parameters?.username,
    },
    schema: GetAllUserAvatarsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the default columns for the given user. Admin permission will be required to get columns for a user other
 * than the currently logged in user.
 */
export async function defaultColumns(
  client: Client,
  parameters?: DefaultColumns,
  options?: RequestOptions,
): Promise<ColumnOptions[]> {
  const config: SendRequestOptions<ColumnOptions[]> = {
    url: '/rest/api/2/user/columns',
    method: 'GET',
    searchParams: {
      username: parameters?.username,
    },
    schema: z.array(ColumnOptionsSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the default columns for the given user. Admin permission will be required to get columns for a user other than
 * the currently logged in user.
 */
export async function setColumnsUrlEncoded(
  client: Client,
  parameters: SetColumnsUrlEncoded,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/columns',
    method: 'PUT',
    body: {
      username: parameters.username,
      columns: parameters.columns,
    },
    contentType: 'application/x-www-form-urlencoded',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Reset the default columns for the given user to the system default. Admin permission will be required to get columns
 * for a user other than the currently logged in user.
 */
export async function resetUserColumns(
  client: Client,
  parameters: ResetUserColumns,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/columns',
    method: 'DELETE',
    searchParams: {
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of users that match the search string. This resource cannot be accessed anonymously. Duplicated means
 * that the user has an account in more than one directory and either more than one account is active or the only active
 * account does not belong to the directory with the highest priority. The data returned by this endpoint is cached for
 * 10 minutes and the cache is flushed when any User Directory is added, removed, enabled, disabled, or synchronized. A
 * System Administrator can also flush the cache manually. Related JAC ticket:
 * https://jira.atlassian.com/browse/JRASERVER-68797
 */
export async function getDuplicatedUsersCount(
  client: Client,
  parameters?: GetDuplicatedUsersCount,
  options?: RequestOptions,
): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/api/2/user/duplicated/count',
    method: 'GET',
    searchParams: {
      flush: parameters?.flush,
    },
    schema: UserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns duplicated users mapped to their directories with an indication if their accounts are active or not.
 * Duplicated means that the user has an account in more than one directory and either more than one account is active
 * or the only active account does not belong to the directory with the highest priority. The data returned by this
 * endpoint is cached for 10 minutes and the cache is flushed when any User Directory is added, removed, enabled,
 * disabled, or synchronized. A System Administrator can also flush the cache manually. Related JAC ticket:
 * https://jira.atlassian.com/browse/JRASERVER-68797
 */
export async function getDuplicatedUsersMapping(
  client: Client,
  parameters?: GetDuplicatedUsersMapping,
  options?: RequestOptions,
): Promise<Avatar> {
  const config: SendRequestOptions<Avatar> = {
    url: '/rest/api/2/user/duplicated/list',
    method: 'GET',
    searchParams: {
      flush: parameters?.flush,
    },
    schema: AvatarSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of all users. This resource cannot be accessed anonymously. This Api is a streaming-like endpoint. For
 * performance and security reasons, it is not indicating the total number of users available in the system. The first
 * call should be done without the cursor parameter. Subsequent calls should use the value of the next cursor returned
 * in the previous call. Specific values of cursor are not guaranteed to be valid in the future and are not part of the
 * API, so they should not be used as a key for caching or storing data. The order in which the users are returned is
 * not defined. It is guaranteed that the same user will not be returned twice in the sequence of calls. For resiliency
 * reason this endpoint never returns 404 code, even if called with a cursor parameter that was not returned in the
 * previous call.
 *
 * Available since Jira Data Center 11.0, and in 10.3 LTS.
 */
export async function getUserList(
  client: Client,
  parameters?: GetUserList,
  options?: RequestOptions,
): Promise<StreamPage> {
  const config: SendRequestOptions<StreamPage> = {
    url: '/rest/api/2/user/list',
    method: 'GET',
    searchParams: {
      cursor: parameters?.cursor,
      maxResults: parameters?.maxResults,
    },
    schema: StreamPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Modify user password. */
export async function changeUserPassword(
  client: Client,
  parameters: ChangeUserPassword,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/api/2/user/password',
    method: 'PUT',
    searchParams: {
      key: parameters.key,
      username: parameters.username,
    },
    body: {
      currentPassword: parameters.currentPassword,
      password: parameters.password,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a list of users matching query with highlighting. */
export async function findUsersForPicker(
  client: Client,
  parameters?: FindUsersForPicker,
  options?: RequestOptions,
): Promise<UserPickerResults> {
  const config: SendRequestOptions<UserPickerResults> = {
    url: '/rest/api/2/user/picker',
    method: 'GET',
    searchParams: {
      maxResults: parameters?.maxResults,
      query: parameters?.query,
      exclude: parameters?.exclude,
      showAvatar: parameters?.showAvatar,
    },
    schema: UserPickerResultsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the keys of all properties for the user identified by the key or by the id. */
export async function getUserPropertyKeys(
  client: Client,
  parameters?: GetUserPropertyKeys,
  options?: RequestOptions,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: '/rest/api/2/user/properties',
    method: 'GET',
    searchParams: {
      userKey: parameters?.userKey,
      username: parameters?.username,
    },
    schema: EntityPropertiesKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the value of the property with a given key from the user identified by the key or by the id. */
export async function getUserProperty(
  client: Client,
  parameters: GetUserProperty,
  options?: RequestOptions,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
    method: 'GET',
    searchParams: {
      userKey: parameters.userKey,
      username: parameters.username,
    },
    schema: EntityPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of the specified user's property. You can use this resource to store a custom data against the user
 * identified by the key or by the id. The user who stores the data is required to have permissions to administer the
 * user.
 */
export async function setUserProperty(
  client: Client,
  parameters: SetUserProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
    method: 'PUT',
    searchParams: {
      userKey: parameters.userKey,
      username: parameters.username,
    },
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Removes the property from the user identified by the key or by the id. The user who removes the property is required
 * to have permissions to administer the user.
 */
export async function deleteUserProperty(
  client: Client,
  parameters: DeleteUserProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/user/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    searchParams: {
      userKey: parameters.userKey,
      username: parameters.username,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Finds users. */
export async function findUsers(client: Client, parameters?: FindUsers, options?: RequestOptions): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/api/2/user/search',
    method: 'GET',
    searchParams: {
      includeInactive: parameters?.includeInactive,
      maxResults: parameters?.maxResults,
      includeActive: parameters?.includeActive,
      startAt: parameters?.startAt,
      username: parameters?.username,
    },
    schema: UserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Invalidates session of given user. */
export async function deleteSession(
  client: Client,
  parameters: DeleteSession,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/user/session/${parameters.username}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a list of active users that match the search string. This resource cannot be accessed anonymously and
 * requires the Browse Users global permission. Given an issue key this resource will provide a list of users that match
 * the search string and have the browse issue permission for the issue provided.
 */
export async function findUsersWithBrowsePermission(
  client: Client,
  parameters?: FindUsersWithBrowsePermission,
  options?: RequestOptions,
): Promise<User> {
  const config: SendRequestOptions<User> = {
    url: '/rest/api/2/user/viewissue/search',
    method: 'GET',
    searchParams: {
      projectKey: parameters?.projectKey,
      issueKey: parameters?.issueKey,
      maxResults: parameters?.maxResults,
      username: parameters?.username,
    },
    schema: UserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
