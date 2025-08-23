import type { Client } from '../client';
import type { Request } from '../request';
import type { CreateFilterParameters } from './parameters/createFilterParameters';
import type { GetFavouriteFiltersParameters } from './parameters/getFavouriteFiltersParameters';
import type { GetMyFiltersParameters } from './parameters/getMyFiltersParameters';
import type { GetFiltersPaginatedParameters } from './parameters/getFiltersPaginatedParameters';
import type { DeleteFilterParameters } from './parameters/deleteFilterParameters';
import type { GetFilterParameters } from './parameters/getFilterParameters';
import type { UpdateFilterParameters } from './parameters/updateFilterParameters';
import type { ResetColumnsParameters } from './parameters/resetColumnsParameters';
import type { GetColumnsParameters } from './parameters/getColumnsParameters';
import type { SetColumnsParameters } from './parameters/setColumnsParameters';
import type { DeleteFavouriteForFilterParameters } from './parameters/deleteFavouriteForFilterParameters';
import type { SetFavouriteForFilterParameters } from './parameters/setFavouriteForFilterParameters';
import type { ChangeFilterOwnerParameters } from './parameters/changeFilterOwnerParameters';

export class Filters {
  constructor(private client: Client) {}
  /**
   * Creates a filter. The filter is shared according to the [default share scope](#api-rest-api-2-filter-post). The
   * filter is not selected as a favorite. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async createFilter(parameters: CreateFilterParameters) {
    const request: Request = {
      url: '/rest/api/2/filter',
      method: 'POST',
      query: {
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
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the visible favorite filters of the user. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** A
   *   favorite filter is only visible to the user where the filter is:
   * -
   * - - Owned by the user.
   * - - Shared with a group that the user is a member of.
   * - - Shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Shared with a public project.
   * - - Shared with the public.
   * -
   * - For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
   *   this operation.
   */
  async getFavouriteFilters(parameters: GetFavouriteFiltersParameters) {
    const request: Request = {
      url: '/rest/api/2/filter/favourite',
      method: 'GET',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are
   * also returned. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:
   * -
   * - - Owned by the user.
   * - - Shared with a group that the user is a member of.
   * - - Shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Shared with a public project.
   * - - Shared with the public.
   * -
   * - For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
   *   this operation.
   */
  async getMyFilters(parameters: GetMyFiltersParameters) {
    const request: Request = {
      url: '/rest/api/2/filter/my',
      method: 'GET',
      query: {
        expand: parameters.expand,
        includeFavourites: parameters.includeFavourites,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * filters. Use this operation to get: *
   *
   * - - Specific filters, by defining `id` only.
   * - - Filters that match all of the specified attributes. For example, all filters for a user with a particular word in
   *       their name. When multiple attributes are specified only filters matching all attributes are returned.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   *   however, only the following filters that match the query parameters are returned:
   * -
   * - - Filters owned by the user.
   * - - Filters shared with a group that the user is a member of.
   * - - Filters shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Filters shared with a public project.
   * - - Filters shared with the public.
   */
  async getFiltersPaginated(parameters: GetFiltersPaginatedParameters) {
    const request: Request = {
      url: '/rest/api/2/filter/search',
      method: 'GET',
      query: {
        filterName: parameters.filterName,
        accountId: parameters.accountId,
        owner: parameters.owner,
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        projectId: parameters.projectId,
        id: parameters.id,
        orderBy: parameters.orderBy,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        expand: parameters.expand,
        overrideSharePermissions: parameters.overrideSharePermissions,
        isSubstringMatch: parameters.isSubstringMatch,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Delete a filter. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with
   *   _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFilter(parameters: DeleteFilterParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a filter. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   *   however, the filter is only returned where it is:
   * -
   * - - Owned by the user.
   * - - Shared with a group that the user is a member of.
   * - - Shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Shared with a public project.
   * - - Shared with the public.
   */
  async getFilter(parameters: GetFilterParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}`,
      method: 'GET',
      query: {
        expand: parameters.expand,
        overrideSharePermissions: parameters.overrideSharePermissions,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however the user must own the filter.
   */
  async updateFilter(parameters: UpdateFilterParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}`,
      method: 'PUT',
      query: {
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
    };

    return this.client.sendRequest(request);
  }

  /**
   * Reset the user's column configuration for the filter to the default. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however, columns are only reset for:
   * -
   * - - Filters owned by the user.
   * - - Filters shared with a group that the user is a member of.
   * - - Filters shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Filters shared with a public project.
   * - - Filters shared with the public.
   */
  async resetColumns(parameters: ResetColumnsParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/columns`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed
   * in _List View_ with the _Columns_ set to _Filter_. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   *   however, column details are only returned for:
   * -
   * - - Filters owned by the user.
   * - - Filters shared with a group that the user is a member of.
   * - - Filters shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Filters shared with a public project.
   * - - Filters shared with the public.
   */
  async getColumns(parameters: GetColumnsParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/columns`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get
   * fields](#api-rest-api-2-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.
   * *
   *
   * - The parameters for this resource are expressed as HTML form data. For example, in curl:
   * -
   * - `curl -X PUT -d columns=summary -d columns=description
   *   https://your-domain.atlassian.net/rest/api/2/filter/10000/columns`
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however, columns are only set for:
   * -
   * - - Filters owned by the user.
   * - - Filters shared with a group that the user is a member of.
   * - - Filters shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Filters shared with a public project.
   * - - Filters shared with the public.
   */
  async setColumns(parameters: SetColumnsParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/columns`,
      method: 'PUT',
      body: {
        columns: parameters.columns,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from
   * the user's favorites list. For example, if the user favorites a public filter that is subsequently made private
   * (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira.
   */
  async deleteFavouriteForFilter(parameters: DeleteFavouriteForFilterParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/favourite`,
      method: 'DELETE',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Add a filter as a favorite for the user. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira, however, the user can only favorite:
   * -
   * - - Filters owned by the user.
   * - - Filters shared with a group that the user is a member of.
   * - - Filters shared with a private project that the user has _Browse projects_ [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - - Filters shared with a public project.
   * - - Filters shared with the public.
   */
  async setFavouriteForFilter(parameters: SetFavouriteForFilterParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/favourite`,
      method: 'PUT',
      query: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Changes the owner of the filter. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   *   Permission to access Jira. However, the user must own the filter or have the _Administer Jira_ [global
   *   permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async changeFilterOwner(parameters: ChangeFilterOwnerParameters) {
    const request: Request = {
      url: `/rest/api/2/filter/${parameters.id}/owner`,
      method: 'PUT',
      body: {
        accountId: parameters.accountId,
      },
    };

    return this.client.sendRequest(request);
  }
}
