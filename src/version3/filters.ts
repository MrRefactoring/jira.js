import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Filters {
  constructor(private client: Client) { }
  async getFilters<T = any>(parameters?: Parameters.GetFilters, callback?: Callback<T>): Promise<void>;
  async getFilters<T = any>(parameters?: Parameters.GetFilters, callback?: undefined): Promise<T>;
  async getFilters<T = any>(parameters?: Parameters.GetFilters, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/filter',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createFilter<T = Models.Filter>(parameters?: Parameters.CreateFilter, callback?: Callback<T>): Promise<void>;
  async createFilter<T = Models.Filter>(parameters?: Parameters.CreateFilter, callback?: undefined): Promise<T>;
  async createFilter<T = Models.Filter>(parameters?: Parameters.CreateFilter, callback?: Callback<T>): Promise<void | T> {
    const config = ({
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
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFavouriteFilters<T = any>(parameters?: Parameters.GetFavouriteFilters, callback?: Callback<T>): Promise<void>;
  async getFavouriteFilters<T = any>(parameters?: Parameters.GetFavouriteFilters, callback?: undefined): Promise<T>;
  async getFavouriteFilters<T = any>(parameters?: Parameters.GetFavouriteFilters, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/filter/favourite',
      method: 'GET',
      params: {
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getMyFilters<T = any>(parameters?: Parameters.GetMyFilters, callback?: Callback<T>): Promise<void>;
  async getMyFilters<T = any>(parameters?: Parameters.GetMyFilters, callback?: undefined): Promise<T>;
  async getMyFilters<T = any>(parameters?: Parameters.GetMyFilters, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/3/filter/my',
      method: 'GET',
      params: {
        expand: parameters?.expand,
        includeFavourites: parameters?.includeFavourites,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters?: Parameters.GetFiltersPaginated, callback?: Callback<T>): Promise<void>;
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters?: Parameters.GetFiltersPaginated, callback?: undefined): Promise<T>;
  async getFiltersPaginated<T = Models.PageBeanFilterDetails>(parameters?: Parameters.GetFiltersPaginated, callback?: Callback<T>): Promise<void | T> {
    const config = ({
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
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback: Callback<T>): Promise<void>;
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback?: undefined): Promise<T>;
  async getFilter<T = Models.Filter>(parameters: Parameters.GetFilter, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}`,
      method: 'GET',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback: Callback<T>): Promise<void>;
  async updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback?: undefined): Promise<T>;
  async updateFilter<T = Models.Filter>(parameters: Parameters.UpdateFilter, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
      data: parameters.body,
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback: Callback<T>): Promise<void>;
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback?: undefined): Promise<T>;
  async deleteFilter<T = void>(parameters: Parameters.DeleteFilter, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getColumns<T = any>(parameters: Parameters.GetColumns, callback: Callback<T>): Promise<void>;
  async getColumns<T = any>(parameters: Parameters.GetColumns, callback?: undefined): Promise<T>;
  async getColumns<T = any>(parameters: Parameters.GetColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setColumns<T = any>(parameters: Parameters.SetColumns, callback: Callback<T>): Promise<void>;
  async setColumns<T = any>(parameters: Parameters.SetColumns, callback?: undefined): Promise<T>;
  async setColumns<T = any>(parameters: Parameters.SetColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback: Callback<T>): Promise<void>;
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback?: undefined): Promise<T>;
  async resetColumns<T = void>(parameters: Parameters.ResetColumns, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setFavouriteForFilter<T = Models.Filter>(parameters: Parameters.SetFavouriteForFilter, callback: Callback<T>): Promise<void>;
  async setFavouriteForFilter<T = Models.Filter>(parameters: Parameters.SetFavouriteForFilter, callback?: undefined): Promise<T>;
  async setFavouriteForFilter<T = Models.Filter>(parameters: Parameters.SetFavouriteForFilter, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/favourite`,
      method: 'PUT',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteFavouriteForFilter<T = Models.Filter>(parameters: Parameters.DeleteFavouriteForFilter, callback: Callback<T>): Promise<void>;
  async deleteFavouriteForFilter<T = Models.Filter>(parameters: Parameters.DeleteFavouriteForFilter, callback?: undefined): Promise<T>;
  async deleteFavouriteForFilter<T = Models.Filter>(parameters: Parameters.DeleteFavouriteForFilter, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/3/filter/${parameters.id}/favourite`,
      method: 'DELETE',
      params: {
        expand: parameters.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
