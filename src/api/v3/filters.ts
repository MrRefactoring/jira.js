import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import { Filter as FilterResponse, PageBeanFilterDetails as PageBeanFilterDetailsResponse } from '../../models/v3';

export class Filters {
  constructor(private readonly client: Client) { }

  async getFilters(parameters?: {
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/filter',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createFilter(parameters?: {
    expand?: string;
  }, callback?: Callback<FilterResponse>): Promise<FilterResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/filter',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFavouriteFilters(parameters?: {
    expand?: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/filter/favourite',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getMyFilters(parameters?: {
    expand?: string;
    includeFavourites?: boolean;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/filter/my',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFiltersPaginated(parameters?: {
    filterName?: string;
    accountId?: string;
    owner?: string;
    groupname?: string;
    projectId?: number;
    id?: number[];
    orderBy?: string;
    startAt?: number;
    maxResults?: number;
    expand?: string;
  }, callback?: Callback<PageBeanFilterDetailsResponse>): Promise<PageBeanFilterDetailsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/filter/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getFilter(parameters: {
    id: number;
    expand?: string;
  }, callback?: Callback<FilterResponse>): Promise<FilterResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateFilter(parameters: {
    id: number;
    expand?: string;
  }, callback?: Callback<FilterResponse>): Promise<FilterResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteFilter(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getColumns(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setColumns(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async resetColumns(parameters: {
    id: number;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/columns`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async setFavouriteForFilter(parameters: {
    id: number;
    expand?: string;
  }, callback?: Callback<FilterResponse>): Promise<FilterResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/favourite`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteFavouriteForFilter(parameters: {
    id: number;
    expand?: string;
  }, callback?: Callback<FilterResponse>): Promise<FilterResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/filter/${parameters.id}/favourite`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }
}
