import { ScimUserSchema, type ScimUser } from '../models/scimUser';
import { ScimUserListResponseSchema, type ScimUserListResponse } from '../models/scimUserListResponse';
import type { GetUser } from '../parameters/getUser';
import type { ReplaceUser } from '../parameters/replaceUser';
import type { DeleteUser } from '../parameters/deleteUser';
import type { PatchUser } from '../parameters/patchUser';
import type { GetUsers } from '../parameters/getUsers';
import type { CreateUser } from '../parameters/createUser';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Retrieves a user from the directory based on their `userId`. */
export async function getUser(client: Client, parameters: GetUser, options?: RequestOptions): Promise<ScimUser> {
  const config: SendRequestOptions<ScimUser> = {
    url: `/scim/directory/${parameters.directoryId}/Users/${parameters.userId}`,
    method: 'GET',
    searchParams: {
      attributes: parameters.attributes,
      excludedAttributes: parameters.excludedAttributes,
    },
    schema: ScimUserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Update the directory-based user information using the user attributes associated with their `userId`. User
 * information is replaced attribute-by-attribute, with the exception of immutable and read-only attributes. Existing
 * values of unspecified attributes are cleaned.
 */
export async function replaceUser(
  client: Client,
  parameters: ReplaceUser,
  options?: RequestOptions,
): Promise<ScimUser> {
  const config: SendRequestOptions<ScimUser> = {
    url: `/scim/directory/${parameters.directoryId}/Users/${parameters.userId}`,
    method: 'PUT',
    searchParams: {
      attributes: parameters.attributes,
      excludedAttributes: parameters.excludedAttributes,
    },
    body: {
      schemas: parameters.schemas,
      userName: parameters.userName,
      emails: parameters.emails,
      id: parameters.id,
      externalId: parameters.externalId,
      name: parameters.name,
      displayName: parameters.displayName,
      nickName: parameters.nickName,
      title: parameters.title,
      preferredLanguage: parameters.preferredLanguage,
      department: parameters.department,
      organization: parameters.organization,
      timezone: parameters.timezone,
      phoneNumbers: parameters.phoneNumbers,
      meta: parameters.meta,
      groups: parameters.groups,
      'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User':
        parameters['urn:ietf:params:scim:schemas:extension:enterprise:2.0:User'],
      'urn:scim:schemas:extension:atlassian-external:1.0':
        parameters['urn:scim:schemas:extension:atlassian-external:1.0'],
      active: parameters.active,
    },
    schema: ScimUserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Deleting a user via the SCIM APIs will unlink the user from your identity provider and deactivate the user within
 * Atlassian if they are managed by your organization.
 *
 * The deleted user is not available for future requests until created with a new `userId`. If the user is deactivated
 * they can be activated again via [Atlassian Administration](https://admin.atlassian.com/).
 *
 * **Note:** Executing this API call will result in the deletion of the SCIM record, and there is no method to reverse
 * these changes except by creating a new SCIM record with [Create a user
 * API](https://developer.atlassian.com/cloud/admin/user-provisioning/rest/api-group-users/#api-scim-directory-directoryid-users-post).
 */
export async function deleteUser(client: Client, parameters: DeleteUser, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/scim/directory/${parameters.directoryId}/Users/${parameters.userId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a user's information in the directory based on their `userId` via `PATCH`. Refer to [Service Provider
 * Configuration
 * APIs](https://developer.atlassian.com/cloud/admin/user-provisioning/rest/api-group-service-provider-configuration/#api-group-service-provider-configuration)
 * for details on supported operations.
 */
export async function patchUser(client: Client, parameters: PatchUser, options?: RequestOptions): Promise<ScimUser> {
  const config: SendRequestOptions<ScimUser> = {
    url: `/scim/directory/${parameters.directoryId}/Users/${parameters.userId}`,
    method: 'PATCH',
    searchParams: {
      attributes: parameters.attributes,
      excludedAttributes: parameters.excludedAttributes,
    },
    body: {
      schemas: parameters.schemas,
      operations: parameters.operations,
    },
    schema: ScimUserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Get users from the specified directory. Filtering is supported with a single exact match (`eq`) against the
 * `userName` and `externalId` attributes.
 *
 * **Note**: While this API enables pagination, sorting functionality is not supported.
 */
export async function getUsers(
  client: Client,
  parameters: GetUsers,
  options?: RequestOptions,
): Promise<ScimUserListResponse> {
  const config: SendRequestOptions<ScimUserListResponse> = {
    url: `/scim/directory/${parameters.directoryId}/Users`,
    method: 'GET',
    searchParams: {
      attributes: parameters.attributes,
      excludedAttributes: parameters.excludedAttributes,
      filter: parameters.filter,
      startIndex: parameters.startIndex,
      count: parameters.count,
    },
    schema: ScimUserListResponseSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a user in the directory. **Note:** An attempt to create an existing user will fail with a 409 (Conflict)
 * error.
 *
 * Use this API to manage accounts outside your organization when assigning these users to SCIM groups.
 *
 * If there's already a managed Atlassian account associated with the specified email address on the Atlassian platform,
 * the user in your identity provider will be connected or linked to the user in your Atlassian organization.
 */
export async function createUser(client: Client, parameters: CreateUser, options?: RequestOptions): Promise<ScimUser> {
  const config: SendRequestOptions<ScimUser> = {
    url: `/scim/directory/${parameters.directoryId}/Users`,
    method: 'POST',
    searchParams: {
      attributes: parameters.attributes,
      excludedAttributes: parameters.excludedAttributes,
    },
    body: {
      schemas: parameters.schemas,
      userName: parameters.userName,
      emails: parameters.emails,
      id: parameters.id,
      externalId: parameters.externalId,
      name: parameters.name,
      displayName: parameters.displayName,
      nickName: parameters.nickName,
      title: parameters.title,
      preferredLanguage: parameters.preferredLanguage,
      department: parameters.department,
      organization: parameters.organization,
      timezone: parameters.timezone,
      phoneNumbers: parameters.phoneNumbers,
      meta: parameters.meta,
      groups: parameters.groups,
      'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User':
        parameters['urn:ietf:params:scim:schemas:extension:enterprise:2.0:User'],
      'urn:scim:schemas:extension:atlassian-external:1.0':
        parameters['urn:scim:schemas:extension:atlassian-external:1.0'],
      active: parameters.active,
    },
    schema: ScimUserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
