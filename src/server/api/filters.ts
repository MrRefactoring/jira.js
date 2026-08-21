import { FilterSchema, type Filter } from '../models/filter';
import { DefaultShareScopeSchema, type DefaultShareScope } from '../models/defaultShareScope';
import { ColumnLayoutSchema, type ColumnLayout } from '../models/columnLayout';
import { FilterPermissionSchema, type FilterPermission } from '../models/filterPermission';
import type { CreateFilter } from '../parameters/createFilter';
import type { SetDefaultShareScope } from '../parameters/setDefaultShareScope';
import type { GetFavouriteFilters } from '../parameters/getFavouriteFilters';
import type { GetFilter } from '../parameters/getFilter';
import type { EditFilter } from '../parameters/editFilter';
import type { DeleteFilter } from '../parameters/deleteFilter';
import type { GetFilterColumns } from '../parameters/getFilterColumns';
import type { SetColumns } from '../parameters/setColumns';
import type { ResetColumns } from '../parameters/resetColumns';
import type { GetSharePermissions } from '../parameters/getSharePermissions';
import type { AddSharePermission } from '../parameters/addSharePermission';
import type { GetSharePermission } from '../parameters/getSharePermission';
import type { DeleteSharePermission } from '../parameters/deleteSharePermission';
import type { Client, SendRequestOptions } from '#/core';
import { z } from 'zod';

/**
 * Creates a new filter, and returns newly created filter. Currently sets permissions just using the users default
 * sharing permissions
 */
export async function createFilter(client: Client, parameters: CreateFilter): Promise<Filter> {
  const config: SendRequestOptions<Filter> = {
    url: '/rest/api/2/filter',
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
    },
    body: {
      description: parameters.description,
      editable: parameters.editable,
      favourite: parameters.favourite,
      id: parameters.id,
      jql: parameters.jql,
      name: parameters.name,
      owner: parameters.owner,
      searchUrl: parameters.searchUrl,
      self: parameters.self,
      sharePermissions: parameters.sharePermissions,
      sharedUsers: parameters.sharedUsers,
      viewUrl: parameters.viewUrl,
    },
    schema: FilterSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the default share scope of the logged-in user */
export async function getDefaultShareScope(client: Client): Promise<DefaultShareScope> {
  const config: SendRequestOptions<DefaultShareScope> = {
    url: '/rest/api/2/filter/defaultShareScope',
    method: 'GET',
    schema: DefaultShareScopeSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the default share scope of the logged-in user. Available values are: AUTHENTICATED (for sharing with all
 * logged-in users) and PRIVATE (for no shares).
 */
export async function setDefaultShareScope(
  client: Client,
  parameters: SetDefaultShareScope,
): Promise<DefaultShareScope> {
  const config: SendRequestOptions<DefaultShareScope> = {
    url: '/rest/api/2/filter/defaultShareScope',
    method: 'PUT',
    body: {
      scope: parameters.scope,
    },
    schema: DefaultShareScopeSchema,
  };

  return await client.sendRequest(config);
}

/** Returns the favourite filters of the logged-in user */
export async function getFavouriteFilters(client: Client, parameters?: GetFavouriteFilters): Promise<Filter[]> {
  const config: SendRequestOptions<Filter[]> = {
    url: '/rest/api/2/filter/favourite',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
    },
    schema: z.array(FilterSchema),
  };

  return await client.sendRequest(config);
}

/** Returns a filter given an id */
export async function getFilter(client: Client, parameters: GetFilter): Promise<Filter> {
  const config: SendRequestOptions<Filter> = {
    url: `/rest/api/2/filter/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
    },
    schema: FilterSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates an existing filter, and returns its new value. The following properties of a filter can be updated: 'jql',
 * 'name', 'description'. Additionally, administrators can also update the 'owner' field. To get, set or unset
 * 'favourite', use rest/api/1.0/filters/{id}/favourite with GET, PUT and DELETE methods instead.
 */
export async function editFilter(client: Client, parameters: EditFilter): Promise<Filter> {
  const config: SendRequestOptions<Filter> = {
    url: `/rest/api/2/filter/${parameters.id}`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
    },
    body: parameters.body,
    schema: FilterSchema,
  };

  return await client.sendRequest(config);
}

/** Delete a filter */
export async function deleteFilter(client: Client, parameters: DeleteFilter): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/filter/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the default columns for the given filter. Currently logged in user will be used as the user making such
 * request.
 */
export async function getFilterColumns(client: Client, parameters: GetFilterColumns): Promise<ColumnLayout[]> {
  const config: SendRequestOptions<ColumnLayout[]> = {
    url: `/rest/api/2/filter/${parameters.id}/columns`,
    method: 'GET',
    schema: z.array(ColumnLayoutSchema),
  };

  return await client.sendRequest(config);
}

/** Sets the default columns for the given filter */
export async function setColumns(client: Client, parameters: SetColumns): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/filter/${parameters.id}/columns`,
    method: 'PUT',
    body: {
      columns: parameters.columns,
    },
  };

  return await client.sendRequest(config);
}

/** Resets the columns for the given filter such that the filter no longer has its own column config */
export async function resetColumns(client: Client, parameters: ResetColumns): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/filter/${parameters.id}/columns`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/** Returns all share permissions of the given filter */
export async function getSharePermissions(
  client: Client,
  parameters: GetSharePermissions,
): Promise<FilterPermission[]> {
  const config: SendRequestOptions<FilterPermission[]> = {
    url: `/rest/api/2/filter/${parameters.id}/permission`,
    method: 'GET',
    schema: z.array(FilterPermissionSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Adds a share permissions to the given filter. Adding a global permission removes all previous permissions from the
 * filter
 */
export async function addSharePermission(client: Client, parameters: AddSharePermission): Promise<FilterPermission[]> {
  const config: SendRequestOptions<FilterPermission[]> = {
    url: `/rest/api/2/filter/${parameters.id}/permission`,
    method: 'POST',
    body: {
      edit: parameters.edit,
      groupname: parameters.groupname,
      projectId: parameters.projectId,
      projectRoleId: parameters.projectRoleId,
      type: parameters.type,
      userKey: parameters.userKey,
      view: parameters.view,
    },
    schema: z.array(FilterPermissionSchema),
  };

  return await client.sendRequest(config);
}

/** Returns a single share permission of the given filter */
export async function getSharePermission(client: Client, parameters: GetSharePermission): Promise<FilterPermission> {
  const config: SendRequestOptions<FilterPermission> = {
    url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
    method: 'GET',
    schema: FilterPermissionSchema,
  };

  return await client.sendRequest(config);
}

/** Removes a share permissions from the given filter */
export async function deleteSharePermission(client: Client, parameters: DeleteSharePermission): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/filter/${parameters.id}/permission/${parameters.permissionId}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}
