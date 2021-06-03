import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Filters {
  constructor(private client: Client) {}

  /**
   * @deprecated Returns all filters. Deprecated, use [ Search for filters](#api-rest-api-2-filter-search-get) that
   *   supports search and pagination.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   *   however, only the following filters are returned:
   *
   *   - Filters owned by the user.
   *   - Filters shared with a group that the user is a member of.
   *   - Filters shared with a private project that the user has *Browse projects* [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   *   - Filters shared with a public project.
   *   - Filters shared with the public.
   */
  async getFilters<T = Models.Filter[]>(
    parameters: Parameters.GetFilters | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * @deprecated Returns all filters. Deprecated, use [ Search for filters](#api-rest-api-2-filter-search-get) that
   *   supports search and pagination.
   *
   *   This operation can be accessed anonymously.
   *
   *   **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   *   however, only the following filters are returned:
   *
   *   - Filters owned by the user.
   *   - Filters shared with a group that the user is a member of.
   *   - Filters shared with a private project that the user has *Browse projects* [project
   *       permission](https://confluence.atlassian.com/x/yodKLg) for.
   *   - Filters shared with a public project.
   *   - Filters shared with the public.
   */
  async getFilters<T = Models.Filter[]>(parameters?: Parameters.GetFilters, callback?: never): Promise<T>;
  async getFilters<T = Models.Filter[]>(parameters?: Parameters.GetFilters, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/filter',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getFilters' });
  }

  /**
   * Creates a filter. The filter is shared according to the [default share scope](#api-rest-api-2-filter-post). The
   * filter is not selected as a favorite.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async createFilter<T = Models.Filter>(
    parameters: Parameters.CreateFilter | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a filter. The filter is shared according to the [default share scope](#api-rest-api-2-filter-post). The
   * filter is not selected as a favorite.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async createFilter<T = Models.Filter>(parameters?: Parameters.CreateFilter, callback?: never): Promise<T>;
  async createFilter<T = Models.Filter>(
    parameters?: Parameters.CreateFilter,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/filter',
      method: 'POST',
      params: {
        expand: parameters?.expand,
      },
      data: {
        self: parameters?.self,
        id: parameters?.id,
        name: parameters?.name,
        description: parameters?.description,
        owner: parameters?.owner,
        jql: parameters?.jql,
        viewUrl: parameters?.viewUrl,
        searchUrl: parameters?.searchUrl,
        favourite: parameters?.favourite,
        favouritedCount: parameters?.favouritedCount,
        sharePermissions: parameters?.sharePermissions,
        sharedUsers: parameters?.sharedUsers,
        subscriptions: parameters?.subscriptions,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.createFilter' });
  }

  /**
   * Returns the visible favorite filters of the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** A
   * favorite filter is only visible to the user where the filter is:
   *
   * - Owned by the user.
   * - Shared with a group that the user is a member of.
   * - Shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Shared with a public project.
   * - Shared with the public.
   *
   * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
   * this operation.
   */
  async getFavouriteFilters<T = Models.Filter[]>(
    parameters: Parameters.GetFavouriteFilters | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the visible favorite filters of the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** A
   * favorite filter is only visible to the user where the filter is:
   *
   * - Owned by the user.
   * - Shared with a group that the user is a member of.
   * - Shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Shared with a public project.
   * - Shared with the public.
   *
   * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
   * this operation.
   */
  async getFavouriteFilters<T = Models.Filter[]>(
    parameters?: Parameters.GetFavouriteFilters,
    callback?: never
  ): Promise<T>;
  async getFavouriteFilters<T = Models.Filter[]>(
    parameters?: Parameters.GetFavouriteFilters,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/filter/favourite',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getFavouriteFilters' });
  }

  /**
   * Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are
   * also returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:
   *
   * - Owned by the user.
   * - Shared with a group that the user is a member of.
   * - Shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Shared with a public project.
   * - Shared with the public.
   *
   * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
   * this operation.
   */
  async getMyFilters<T = Models.Filter[]>(
    parameters: Parameters.GetMyFilters | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are
   * also returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:
   *
   * - Owned by the user.
   * - Shared with a group that the user is a member of.
   * - Shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Shared with a public project.
   * - Shared with the public.
   *
   * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by
   * this operation.
   */
  async getMyFilters<T = Models.Filter[]>(parameters?: Parameters.GetMyFilters, callback?: never): Promise<T>;
  async getMyFilters<T = Models.Filter[]>(
    parameters?: Parameters.GetMyFilters,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/filter/my',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        includeFavourites: parameters?.includeFavourites,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getMyFilters' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * filters. Use this operation to get:
   *
   * - Specific filters, by defining `id` only.
   * - Filters that match all of the specified attributes. For example, all filters for a user with a particular word in
   *   their name. When multiple attributes are specified only filters matching all attributes are returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, only the following filters that match the query parameters are returned:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(
    parameters: Parameters.GetFiltersPaginated | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * filters. Use this operation to get:
   *
   * - Specific filters, by defining `id` only.
   * - Filters that match all of the specified attributes. For example, all filters for a user with a particular word in
   *   their name. When multiple attributes are specified only filters matching all attributes are returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, only the following filters that match the query parameters are returned:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(
    parameters?: Parameters.GetFiltersPaginated,
    callback?: never
  ): Promise<T>;
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(
    parameters?: Parameters.GetFiltersPaginated,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/filter/search',
      method: 'GET',
      params: {
        filterName: parameters?.filterName,
        accountId: parameters?.accountId,
        owner: parameters?.owner,
        groupname: parameters?.groupname,
        projectId: parameters?.projectId,
        id: parameters?.id,
        orderBy: parameters?.orderBy,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getFiltersPaginated' });
  }

  /**
   * Returns a filter.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, the filter is only returned where it is:
   *
   * - Owned by the user.
   * - Shared with a group that the user is a member of.
   * - Shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Shared with a public project.
   * - Shared with the public.
   */
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback: Callback<T>): Promise<void>;
  /**
   * Returns a filter.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, the filter is only returned where it is:
   *
   * - Owned by the user.
   * - Shared with a group that the user is a member of.
   * - Shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Shared with a public project.
   * - Shared with the public.
   */
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback?: never): Promise<T>;
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getFilter' });
  }

  /**
   * Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however the user must own the filter.
   */
  async updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback: Callback<T>): Promise<void>;
  /**
   * Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however the user must own the filter.
   */
  async updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback?: never): Promise<T>;
  async updateFilter<T = Models.Filter>(
    parameters: Parameters.UpdateFilter,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: {
        name: parameters.name,
        description: parameters.description,
        jql: parameters.jql,
        favourite: parameters.favourite,
        sharePermissions: parameters.sharePermissions,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.updateFilter' });
  }

  /**
   * Delete a filter.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback: Callback<T>): Promise<void>;
  /**
   * Delete a filter.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with
   * *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg).
   */
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback?: never): Promise<T>;
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.deleteFilter' });
  }

  /**
   * Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed
   * in *List View* with the *Columns* set to *Filter*.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, column details are only returned for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async getColumns<T = Models.ColumnItem[]>(parameters: Parameters.GetColumns, callback: Callback<T>): Promise<void>;
  /**
   * Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed
   * in *List View* with the *Columns* set to *Filter*.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None,
   * however, column details are only returned for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async getColumns<T = Models.ColumnItem[]>(parameters: Parameters.GetColumns, callback?: never): Promise<T>;
  async getColumns<T = Models.ColumnItem[]>(
    parameters: Parameters.GetColumns,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}/columns`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.getColumns' });
  }

  /**
   * Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get
   * fields](#api-rest-api-2-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.
   *
   * The parameters for this resource are expressed as HTML form data. For example, in curl:
   *
   * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/2/filter/10000/columns`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, columns are only set for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async setColumns<T = unknown>(parameters: Parameters.SetColumns, callback: Callback<T>): Promise<void>;
  /**
   * Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get
   * fields](#api-rest-api-2-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.
   *
   * The parameters for this resource are expressed as HTML form data. For example, in curl:
   *
   * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/2/filter/10000/columns`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, columns are only set for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async setColumns<T = unknown>(parameters: Parameters.SetColumns, callback?: never): Promise<T>;
  async setColumns<T = unknown>(parameters: Parameters.SetColumns, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}/columns`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.setColumns' });
  }

  /**
   * Reset the user's column configuration for the filter to the default.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, columns are only reset for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback: Callback<T>): Promise<void>;
  /**
   * Reset the user's column configuration for the filter to the default.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, columns are only reset for:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback?: never): Promise<T>;
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}/columns`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.resetColumns' });
  }

  /**
   * Add a filter as a favorite for the user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, the user can only favorite:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async setFavouriteForFilter<T = Models.Filter>(
    parameters: Parameters.SetFavouriteForFilter,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Add a filter as a favorite for the user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira, however, the user can only favorite:
   *
   * - Filters owned by the user.
   * - Filters shared with a group that the user is a member of.
   * - Filters shared with a private project that the user has *Browse projects* [project
   *   permission](https://confluence.atlassian.com/x/yodKLg) for.
   * - Filters shared with a public project.
   * - Filters shared with the public.
   */
  async setFavouriteForFilter<T = Models.Filter>(
    parameters: Parameters.SetFavouriteForFilter,
    callback?: never
  ): Promise<T>;
  async setFavouriteForFilter<T = Models.Filter>(
    parameters: Parameters.SetFavouriteForFilter,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}/favourite`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.setFavouriteForFilter' });
  }

  /**
   * Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from
   * the user's favorites list. For example, if the user favorites a public filter that is subsequently made private
   * (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async deleteFavouriteForFilter<T = Models.Filter>(
    parameters: Parameters.DeleteFavouriteForFilter,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from
   * the user's favorites list. For example, if the user favorites a public filter that is subsequently made private
   * (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:**
   * Permission to access Jira.
   */
  async deleteFavouriteForFilter<T = Models.Filter>(
    parameters: Parameters.DeleteFavouriteForFilter,
    callback?: never
  ): Promise<T>;
  async deleteFavouriteForFilter<T = Models.Filter>(
    parameters: Parameters.DeleteFavouriteForFilter,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/filter/${parameters.id}/favourite`,
      method: 'DELETE',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.filters.deleteFavouriteForFilter' });
  }
}
