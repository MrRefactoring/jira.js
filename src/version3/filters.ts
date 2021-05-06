import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Filters {
  constructor(private client: Client) {
  }

  /**
   * @deprecated
   * Returns all filters. Deprecated, use [ Search for filters](#api-rest-api-3-filter-search-get) that supports search and pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None, however, only the following filters are returned:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async getFilters<T = Models.Filter[]>(parameters: Parameters.GetFilters | undefined, callback: Callback<T>): Promise<void>;
  /**
   * @deprecated
   * Returns all filters. Deprecated, use [ Search for filters](#api-rest-api-3-filter-search-get) that supports search and pagination.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None, however, only the following filters are returned:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async getFilters<T = Models.Filter[]>(parameters?: Parameters.GetFilters, callback?: never): Promise<T>;
  async getFilters<T = Models.Filter[]>(parameters?: Parameters.GetFilters, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/filter',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.getFilters' });
  }

  /**
   * Creates a filter. The filter is shared according to the [default share scope](#api-rest-api-3-filter-post). The filter is not selected as a favorite.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async createFilter<T = Models.Filter>(parameters: Parameters.CreateFilter | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates a filter. The filter is shared according to the [default share scope](#api-rest-api-3-filter-post). The filter is not selected as a favorite.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async createFilter<T = Models.Filter>(parameters?: Parameters.CreateFilter, callback?: never): Promise<T>;
  async createFilter<T = Models.Filter>(parameters?: Parameters.CreateFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/filter',
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

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.createFilter' });
  }

  /**
   * Returns the visible favorite filters of the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** A favorite filter is only visible to the user where the filter is:
   *
   *  *  owned by the user.
   *  *  shared with a group that the user is a member of.
   *  *  shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  shared with a public project.
   *  *  shared with the public.
   *
   * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by this operation. */
  async getFavouriteFilters<T = Models.Filter[]>(parameters: Parameters.GetFavouriteFilters | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns the visible favorite filters of the user.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** A favorite filter is only visible to the user where the filter is:
   *
   *  *  owned by the user.
   *  *  shared with a group that the user is a member of.
   *  *  shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  shared with a public project.
   *  *  shared with the public.
   *
   * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by this operation. */
  async getFavouriteFilters<T = Models.Filter[]>(parameters?: Parameters.GetFavouriteFilters, callback?: never): Promise<T>;
  async getFavouriteFilters<T = Models.Filter[]>(parameters?: Parameters.GetFavouriteFilters, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/filter/favourite',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.getFavouriteFilters' });
  }

  /**
   * Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are also returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:
   *
   *  *  owned by the user.
   *  *  shared with a group that the user is a member of.
   *  *  shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  shared with a public project.
   *  *  shared with the public.
   *
   * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by this operation. */
  async getMyFilters<T = Models.Filter[]>(parameters: Parameters.GetMyFilters | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns the filters owned by the user. If `includeFavourites` is `true`, the user's visible favorite filters are also returned.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however, a favorite filters is only visible to the user where the filter is:
   *
   *  *  owned by the user.
   *  *  shared with a group that the user is a member of.
   *  *  shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  shared with a public project.
   *  *  shared with the public.
   *
   * For example, if the user favorites a public filter that is subsequently made private that filter is not returned by this operation. */
  async getMyFilters<T = Models.Filter[]>(parameters?: Parameters.GetMyFilters, callback?: never): Promise<T>;
  async getMyFilters<T = Models.Filter[]>(parameters?: Parameters.GetMyFilters, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/filter/my',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        includeFavourites: parameters?.includeFavourites,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.getMyFilters' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of filters. Use this operation to get:
   *
   *  *  specific filters, by defining `id` only.
   *  *  filters that match all of the specified attributes. For example, all filters for a user with a particular word in their name. When multiple attributes are specified only filters matching all attributes are returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None, however, only the following filters that match the query parameters are returned:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters: Parameters.GetFiltersPaginated | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of filters. Use this operation to get:
   *
   *  *  specific filters, by defining `id` only.
   *  *  filters that match all of the specified attributes. For example, all filters for a user with a particular word in their name. When multiple attributes are specified only filters matching all attributes are returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None, however, only the following filters that match the query parameters are returned:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters?: Parameters.GetFiltersPaginated, callback?: never): Promise<T>;
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters?: Parameters.GetFiltersPaginated, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/filter/search',
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

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.getFiltersPaginated' });
  }

  /**
   * Returns a filter.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None, however, the filter is only returned where it is:
   *
   *  *  owned by the user.
   *  *  shared with a group that the user is a member of.
   *  *  shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  shared with a public project.
   *  *  shared with the public. */
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback: Callback<T>): Promise<void>;
  /**
   * Returns a filter.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None, however, the filter is only returned where it is:
   *
   *  *  owned by the user.
   *  *  shared with a group that the user is a member of.
   *  *  shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  shared with a public project.
   *  *  shared with the public. */
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback?: never): Promise<T>;
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.getFilter' });
  }

  /**
   * Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however the user must own the filter. */
  async updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback: Callback<T>): Promise<void>;
  /**
   * Updates a filter. Use this operation to update a filter's name, description, JQL, or sharing.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however the user must own the filter. */
  async updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback?: never): Promise<T>;
  async updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}`,
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

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.updateFilter' });
  }

  /**
   * Delete a filter.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback: Callback<T>): Promise<void>;
  /**
   * Delete a filter.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however filters can only be deleted by the creator of the filter or a user with *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg). */
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback?: never): Promise<T>;
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.deleteFilter' });
  }

  /**
   * Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed in *List View* with the *Columns* set to *Filter*.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None, however, column details are only returned for:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async getColumns<T = Models.ColumnItem[]>(parameters: Parameters.GetColumns, callback: Callback<T>): Promise<void>;
  /**
   * Returns the columns configured for a filter. The column configuration is used when the filter's results are viewed in *List View* with the *Columns* set to *Filter*.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None, however, column details are only returned for:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async getColumns<T = Models.ColumnItem[]>(parameters: Parameters.GetColumns, callback?: never): Promise<T>;
  async getColumns<T = Models.ColumnItem[]>(parameters: Parameters.GetColumns, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.getColumns' });
  }

  /**
   * Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get fields](#api-rest-api-3-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.
   *
   * The parameters for this resource are expressed as HTML form data. For example, in curl:
   *
   * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/3/filter/10000/columns`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however, columns are only set for:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async setColumns<T = unknown>(parameters: Parameters.SetColumns, callback: Callback<T>): Promise<void>;
  /**
   * Sets the columns for a filter. Only navigable fields can be set as columns. Use [Get fields](#api-rest-api-3-field-get) to get the list fields in Jira. A navigable field has `navigable` set to `true`.
   *
   * The parameters for this resource are expressed as HTML form data. For example, in curl:
   *
   * `curl -X PUT -d columns=summary -d columns=description https://your-domain.atlassian.net/rest/api/3/filter/10000/columns`
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however, columns are only set for:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async setColumns<T = unknown>(parameters: Parameters.SetColumns, callback?: never): Promise<T>;
  async setColumns<T = unknown>(parameters: Parameters.SetColumns, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.setColumns' });
  }

  /**
   * Reset the user's column configuration for the filter to the default.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however, columns are only reset for:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback: Callback<T>): Promise<void>;
  /**
   * Reset the user's column configuration for the filter to the default.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however, columns are only reset for:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback?: never): Promise<T>;
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.resetColumns' });
  }

  /**
   * Add a filter as a favorite for the user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however, the user can only favorite:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async setFavouriteForFilter<T = Models.Filter>(parameters: Parameters.SetFavouriteForFilter, callback: Callback<T>): Promise<void>;
  /**
   * Add a filter as a favorite for the user.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira, however, the user can only favorite:
   *
   *  *  filters owned by the user.
   *  *  filters shared with a group that the user is a member of.
   *  *  filters shared with a private project that the user has *Browse projects* [project permission](https://confluence.atlassian.com/x/yodKLg) for.
   *  *  filters shared with a public project.
   *  *  filters shared with the public. */
  async setFavouriteForFilter<T = Models.Filter>(parameters: Parameters.SetFavouriteForFilter, callback?: never): Promise<T>;
  async setFavouriteForFilter<T = Models.Filter>(parameters: Parameters.SetFavouriteForFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/favourite`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.setFavouriteForFilter' });
  }

  /**
   * Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from the user's favorites list. For example, if the user favorites a public filter that is subsequently made private (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async deleteFavouriteForFilter<T = Models.Filter>(parameters: Parameters.DeleteFavouriteForFilter, callback: Callback<T>): Promise<void>;
  /**
   * Removes a filter as a favorite for the user. Note that this operation only removes filters visible to the user from the user's favorites list. For example, if the user favorites a public filter that is subsequently made private (and is therefore no longer visible on their favorites list) they cannot remove it from their favorites list.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** Permission to access Jira. */
  async deleteFavouriteForFilter<T = Models.Filter>(parameters: Parameters.DeleteFavouriteForFilter, callback?: never): Promise<T>;
  async deleteFavouriteForFilter<T = Models.Filter>(parameters: Parameters.DeleteFavouriteForFilter, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/favourite`,
      method: 'DELETE',
      params: {
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version3.filters.deleteFavouriteForFilter' });
  }
}
