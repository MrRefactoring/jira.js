import { PermissionSchemesSchema, type PermissionSchemes } from '../models/permissionSchemes';
import { PermissionSchemeSchema, type PermissionScheme } from '../models/permissionScheme';
import { PermissionSchemeAttributeSchema, type PermissionSchemeAttribute } from '../models/permissionSchemeAttribute';
import { PermissionGrantsSchema, type PermissionGrants } from '../models/permissionGrants';
import { PermissionGrantSchema, type PermissionGrant } from '../models/permissionGrant';
import type { GetPermissionSchemes } from '../parameters/getPermissionSchemes';
import type { CreatePermissionScheme } from '../parameters/createPermissionScheme';
import type { GetSchemeAttribute } from '../parameters/getSchemeAttribute';
import type { SetSchemeAttribute } from '../parameters/setSchemeAttribute';
import type { GetPermissionScheme } from '../parameters/getPermissionScheme';
import type { UpdatePermissionScheme } from '../parameters/updatePermissionScheme';
import type { DeletePermissionScheme } from '../parameters/deletePermissionScheme';
import type { GetPermissionSchemeGrants } from '../parameters/getPermissionSchemeGrants';
import type { CreatePermissionGrant } from '../parameters/createPermissionGrant';
import type { GetPermissionSchemeGrant } from '../parameters/getPermissionSchemeGrant';
import type { DeletePermissionSchemeEntity } from '../parameters/deletePermissionSchemeEntity';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns a list of all permission schemes. By default only shortened beans are returned. If you want to include
 * permissions of all the schemes, then specify the permissions expand parameter. Permissions will be included also if
 * you specify any other expand parameter.
 */
export async function getPermissionSchemes(
  client: Client,
  parameters?: GetPermissionSchemes,
  options?: RequestOptions,
): Promise<PermissionSchemes> {
  const config: SendRequestOptions<PermissionSchemes> = {
    url: '/rest/api/2/permissionscheme',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
    },
    schema: PermissionSchemesSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Create a new permission scheme. This method can create schemes with a defined permission set, or without. */
export async function createPermissionScheme(
  client: Client,
  parameters: CreatePermissionScheme,
  options?: RequestOptions,
): Promise<PermissionScheme> {
  const config: SendRequestOptions<PermissionScheme> = {
    url: '/rest/api/2/permissionscheme',
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
    },
    body: parameters.body,
    schema: PermissionSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the attribute for a permission scheme specified by permission scheme id and attribute key. */
export async function getSchemeAttribute(
  client: Client,
  parameters: GetSchemeAttribute,
  options?: RequestOptions,
): Promise<PermissionSchemeAttribute> {
  const config: SendRequestOptions<PermissionSchemeAttribute> = {
    url: `/rest/api/2/permissionscheme/${parameters.permissionSchemeId}/attribute/${parameters.attributeKey}`,
    method: 'GET',
    schema: PermissionSchemeAttributeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates or inserts the attribute for a permission scheme specified by permission scheme id. The attribute consists of
 * the key and the value. The value will be converted to Boolean using Boolean#valueOf.
 */
export async function setSchemeAttribute(
  client: Client,
  parameters: SetSchemeAttribute,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/permissionscheme/${parameters.permissionSchemeId}/attribute/${parameters.key}`,
    method: 'PUT',
    body: parameters.body,
    contentType: 'text/plain',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a permission scheme identified by the given id. */
export async function getPermissionScheme(
  client: Client,
  parameters: GetPermissionScheme,
  options?: RequestOptions,
): Promise<PermissionScheme> {
  const config: SendRequestOptions<PermissionScheme> = {
    url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: PermissionSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a permission scheme. If the permissions list is present then it will be set in the permission scheme, which
 * basically means it will overwrite any permission grants that existed in the permission scheme. Sending an empty list
 * will remove all permission grants from the permission scheme. To update just the name and description, do not send
 * permissions list at all. To add or remove a single permission grant instead of updating the whole list at once use
 * the {schemeId}/permission/ resource.
 */
export async function updatePermissionScheme(
  client: Client,
  parameters: UpdatePermissionScheme,
  options?: RequestOptions,
): Promise<PermissionScheme> {
  const config: SendRequestOptions<PermissionScheme> = {
    url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
    },
    body: parameters.body,
    schema: PermissionSchemeSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes a permission scheme identified by the given id. */
export async function deletePermissionScheme(
  client: Client,
  parameters: DeletePermissionScheme,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/permissionscheme/${parameters.schemeId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns all permission grants of the given permission scheme. */
export async function getPermissionSchemeGrants(
  client: Client,
  parameters: GetPermissionSchemeGrants,
  options?: RequestOptions,
): Promise<PermissionGrants> {
  const config: SendRequestOptions<PermissionGrants> = {
    url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: PermissionGrantsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Creates a permission grant in a permission scheme. */
export async function createPermissionGrant(
  client: Client,
  parameters: CreatePermissionGrant,
  options?: RequestOptions,
): Promise<PermissionGrant> {
  const config: SendRequestOptions<PermissionGrant> = {
    url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission`,
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      holder: parameters.holder,
      id: parameters.id,
      permission: parameters.permission,
      self: parameters.self,
    },
    schema: PermissionGrantSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a permission grant identified by the given id. */
export async function getPermissionSchemeGrant(
  client: Client,
  parameters: GetPermissionSchemeGrant,
  options?: RequestOptions,
): Promise<PermissionGrant> {
  const config: SendRequestOptions<PermissionGrant> = {
    url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: PermissionGrantSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Deletes a permission grant from a permission scheme. */
export async function deletePermissionSchemeEntity(
  client: Client,
  parameters: DeletePermissionSchemeEntity,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/permissionscheme/${parameters.schemeId}/permission/${parameters.permissionId}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
