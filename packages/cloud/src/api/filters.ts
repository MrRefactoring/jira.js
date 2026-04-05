import { FilterSchema, type Filter } from '#/models/filter';
import { PageFilterDetailsSchema, type PageFilterDetails } from '#/models/pageFilterDetails';
import { ColumnItemSchema, type ColumnItem } from '#/models/columnItem';
import { type CreateFilter } from '#/parameters/createFilter';
import { type GetFavouriteFilters } from '#/parameters/getFavouriteFilters';
import { type GetMyFilters } from '#/parameters/getMyFilters';
import { type GetFiltersPaginated } from '#/parameters/getFiltersPaginated';
import { type GetFilter } from '#/parameters/getFilter';
import { type UpdateFilter } from '#/parameters/updateFilter';
import { type DeleteFilter } from '#/parameters/deleteFilter';
import { type GetColumns } from '#/parameters/getColumns';
import { type SetColumns } from '#/parameters/setColumns';
import { type ResetColumns } from '#/parameters/resetColumns';
import { type SetFavouriteForFilter } from '#/parameters/setFavouriteForFilter';
import { type DeleteFavouriteForFilter } from '#/parameters/deleteFavouriteForFilter';
import { type Client, type SendRequestOptions } from '@jira.js/base';
import { z } from 'zod';

/**
 * Creates a filter. The filter is shared according to the [default share
 * scope](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-filters/#api-rest-api-3-filter-post).
 * The filter is not selected as a favorite.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function createFilter(client: Client, parameters: CreateFilter): Promise<Filter> {
  const config: SendRequestOptions<Filter> = {
    url: '/rest/api/3/filter',
    method: 'POST',
    searchParams: {
      expand: parameters.expand,
      overrideSharePermissions: parameters.overrideSharePermissions,
    },
    body: {
      approximateLastUsed: parameters.approximateLastUsed,
      description: parameters.description,
      editPermissions: parameters.editPermissions,
      favourite: parameters.favourite,
      favouritedCount: parameters.favouritedCount,
      id: parameters.id,
      jql: parameters.jql,
      name: parameters.name,
      owner: parameters.owner,
      searchUrl: parameters.searchUrl,
      self: parameters.self,
      sharePermissions: parameters.sharePermissions,
      sharedUsers: parameters.sharedUsers,
      subscriptions: parameters.subscriptions,
      viewUrl: parameters.viewUrl,
    },
    schema: FilterSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the visible favorite filters of the user.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** A favorite
 * filter is only visible to the user where the filter is:
 *
 * - Owned by the user.
 * - Shared with a group that the user is a member of.
 * - Shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Shared with a public project.
 * - Shared with the public.
 *
 * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
 * this operation.
 */
export async function getFavouriteFilters(client: Client, parameters?: GetFavouriteFilters): Promise<Filter[]> {
  const config: SendRequestOptions<Filter[]> = {
    url: '/rest/api/3/filter/favourite',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
    },
    schema: z.array(FilterSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are also
 * returned.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however, a favorite filters is only visible to the user where the filter is:
 *
 * - Owned by the user.
 * - Shared with a group that the user is a member of.
 * - Shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Shared with a public project.
 * - Shared with the public.
 *
 * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
 * this operation.
 */
export async function getMyFilters(client: Client, parameters?: GetMyFilters): Promise<Filter[]> {
  const config: SendRequestOptions<Filter[]> = {
    url: '/rest/api/3/filter/my',
    method: 'GET',
    searchParams: {
      expand: parameters?.expand,
      includeFavourites: parameters?.includeFavourites,
    },
    schema: z.array(FilterSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of filters.
 * Use this operation to get:
 *
 * - Specific filters, by defining `id` only.
 * - Filters that match all of the specified attributes. For example, all filters for a user with a particular word in
 *   their name. When multiple attributes are specified only filters matching all attributes are returned.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None,
 * however, only the following filters that match the query parameters are returned:
 *
 * - Filters owned by the user.
 * - Filters shared with a group that the user is a member of.
 * - Filters shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Filters shared with a public project.
 * - Filters shared with the public.
 */
export async function getFiltersPaginated(
  client: Client,
  parameters?: GetFiltersPaginated,
): Promise<PageFilterDetails> {
  const config: SendRequestOptions<PageFilterDetails> = {
    url: '/rest/api/3/filter/search',
    method: 'GET',
    searchParams: {
      filterName: parameters?.filterName,
      accountId: parameters?.accountId,
      groupname: parameters?.groupname,
      groupId: parameters?.groupId,
      projectId: parameters?.projectId,
      id: parameters?.id,
      orderBy: parameters?.orderBy,
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      expand: parameters?.expand,
      overrideSharePermissions: parameters?.overrideSharePermissions,
      isSubstringMatch: parameters?.isSubstringMatch,
    },
    schema: PageFilterDetailsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a filter.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None,
 * however, the filter is only returned where it is:
 *
 * - Owned by the user.
 * - Shared with a group that the user is a member of.
 * - Shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Shared with a public project.
 * - Shared with the public.
 */
export async function getFilter(client: Client, parameters: GetFilter): Promise<Filter> {
  const config: SendRequestOptions<Filter> = {
    url: `/rest/api/3/filter/${parameters.id}`,
    method: 'GET',
    searchParams: {
      expand: parameters.expand,
      overrideSharePermissions: parameters.overrideSharePermissions,
    },
    schema: FilterSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however the user must own the filter.
 */
export async function updateFilter(client: Client, parameters: UpdateFilter): Promise<Filter> {
  const config: SendRequestOptions<Filter> = {
    url: `/rest/api/3/filter/${parameters.id}`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
      overrideSharePermissions: parameters.overrideSharePermissions,
    },
    body: {
      approximateLastUsed: parameters.approximateLastUsed,
      description: parameters.description,
      editPermissions: parameters.editPermissions,
      favourite: parameters.favourite,
      favouritedCount: parameters.favouritedCount,
      id: parameters.id,
      jql: parameters.jql,
      name: parameters.name,
      owner: parameters.owner,
      searchUrl: parameters.searchUrl,
      self: parameters.self,
      sharePermissions: parameters.sharePermissions,
      sharedUsers: parameters.sharedUsers,
      subscriptions: parameters.subscriptions,
      viewUrl: parameters.viewUrl,
    },
    schema: FilterSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Delete a filter.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however filters can only be deleted by the creator of the filter or a user with _Administer Jira_
 * [global permission](https://confluence.atlassian.com/x/x4dKLg).
 */
export async function deleteFilter(client: Client, parameters: DeleteFilter): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/filter/${parameters.id}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed in
 * _List View_ with the _Columns_ set to _Filter_.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None,
 * however, column details are only returned for:
 *
 * - Filters owned by the user.
 * - Filters shared with a group that the user is a member of.
 * - Filters shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Filters shared with a public project.
 * - Filters shared with the public.
 */
export async function getColumns(client: Client, parameters: GetColumns): Promise<ColumnItem[]> {
  const config: SendRequestOptions<ColumnItem[]> = {
    url: `/rest/api/3/filter/${parameters.id}/columns`,
    method: 'GET',
    schema: z.array(ColumnItemSchema),
  };

  return await client.sendRequest(config);
}

/**
 * Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get
 * fields](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-issue-fields/#api-rest-api-3-field-get)
 * to get the list fields in Jira. A navigable field has `navigable` set to `true`.
 *
 * The parameters for this resource are expressed as HTML form data. For example, in curl:
 *
 * `curl -X PUT -d columns=summary -d columns=description
 * https://your-domain.atlassian.net/rest/api/3/filter/10000/columns`
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however, columns are only set for:
 *
 * - Filters owned by the user.
 * - Filters shared with a group that the user is a member of.
 * - Filters shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Filters shared with a public project.
 * - Filters shared with the public.
 */
export async function setColumns(client: Client, parameters: SetColumns): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/filter/${parameters.id}/columns`,
    method: 'PUT',
    body: {
      columns: parameters.columns,
    },
  };

  return await client.sendRequest(config);
}

/**
 * Reset the user's column configuration for the filter to the default.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however, columns are only reset for:
 *
 * - Filters owned by the user.
 * - Filters shared with a group that the user is a member of.
 * - Filters shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Filters shared with a public project.
 * - Filters shared with the public.
 */
export async function resetColumns(client: Client, parameters: ResetColumns): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/filter/${parameters.id}/columns`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Add a filter as a favorite for the user.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira, however, the user can only favorite:
 *
 * - Filters owned by the user.
 * - Filters shared with a group that the user is a member of.
 * - Filters shared with a private project that the user has _Browse projects_ [project
 *   permission](https://confluence.atlassian.com/x/yodKLg) for.
 * - Filters shared with a public project.
 * - Filters shared with the public.
 */
export async function setFavouriteForFilter(client: Client, parameters: SetFavouriteForFilter): Promise<Filter> {
  const config: SendRequestOptions<Filter> = {
    url: `/rest/api/3/filter/${parameters.id}/favourite`,
    method: 'PUT',
    searchParams: {
      expand: parameters.expand,
    },
    schema: FilterSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from
 * the user's favorites list. For example, if the user favorites a public filter that is subsequently made private (and
 * is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** Permission
 * to access Jira.
 */
export async function deleteFavouriteForFilter(client: Client, parameters: DeleteFavouriteForFilter): Promise<Filter> {
  const config: SendRequestOptions<Filter> = {
    url: `/rest/api/3/filter/${parameters.id}/favourite`,
    method: 'DELETE',
    searchParams: {
      expand: parameters.expand,
    },
    schema: FilterSchema,
  };

  return await client.sendRequest(config);
}
