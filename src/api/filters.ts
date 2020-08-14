import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
import * as Schemas from '../schemas';
export class Filters {
  constructor(private readonly client: Sender) {}

  public async getFilters(
    params?: {
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/filter',
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async createFilter(
    params: {
      expand?: string;
      self?: string;
      id?: string;
      name: string;
      description?: string;
      owner?: any;
      jql?: string;
      viewUrl?: string;
      searchUrl?: string;
      favourite?: boolean;
      favouritedCount?: number;
      sharePermissions?: Array<any>;
      sharedUsers?: any;
      subscriptions?: any;
    },
    callback?: Callback,
  ): Promise<Schemas.Filter> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/filter',
      method: 'POST',
      params: {
        expand: params.expand,
      },
      data: {
        self: params.self,
        id: params.id,
        name: params.name,
        description: params.description,
        owner: params.owner,
        jql: params.jql,
        viewUrl: params.viewUrl,
        searchUrl: params.searchUrl,
        favourite: params.favourite,
        favouritedCount: params.favouritedCount,
        sharePermissions: params.sharePermissions,
        sharedUsers: params.sharedUsers,
        subscriptions: params.subscriptions,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getFavoriteFilters(
    params?: {
      expand?: string;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/filter/favourite',
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getMyFilters(
    params?: {
      expand?: string;
      includeFavourites?: boolean;
    },
    callback?: Callback,
  ): Promise<any> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/filter/my',
      method: 'GET',
      params: {
        expand: params.expand,
        includeFavourites: params.includeFavourites,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async searchForFilters(
    params?: {
      filterName?: string;
      accountId?: string;
      owner?: string;
      groupname?: string;
      projectId?: number;
      orderBy?: string;
      startAt?: number;
      maxResults?: number;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<Schemas.PageBeanFoundFilter> {
    params = params || {};

    const request: AxiosRequestConfig = {
      url: '/rest/api/2/filter/search',
      method: 'GET',
      params: {
        filterName: params.filterName,
        accountId: params.accountId,
        owner: params.owner,
        groupname: params.groupname,
        projectId: params.projectId,
        orderBy: params.orderBy,
        startAt: params.startAt,
        maxResults: params.maxResults,
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async getFilter(
    params: {
      id: number;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<Schemas.Filter> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}`,
      method: 'GET',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async updateFilter(
    params: {
      id: number;
      expand?: string;
      self?: string;
      name: string;
      description?: string;
      owner?: any;
      jql?: string;
      viewUrl?: string;
      searchUrl?: string;
      favourite?: boolean;
      favouritedCount?: number;
      sharePermissions?: Array<any>;
      sharedUsers?: any;
      subscriptions?: any;
    },
    callback?: Callback,
  ): Promise<Schemas.Filter> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}`,
      method: 'PUT',
      params: {
        expand: params.expand,
      },
      data: {
        self: params.self,
        id: params.id,
        name: params.name,
        description: params.description,
        owner: params.owner,
        jql: params.jql,
        viewUrl: params.viewUrl,
        searchUrl: params.searchUrl,
        favourite: params.favourite,
        favouritedCount: params.favouritedCount,
        sharePermissions: params.sharePermissions,
        sharedUsers: params.sharedUsers,
        subscriptions: params.subscriptions,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async deleteFilter(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async getColumns(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/columns`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  public async setColumns(
    params: {
      id: number;
      [key: string]: any;
    },
    callback?: Callback,
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/columns`,
      method: 'PUT',
      data: { ...params, id: undefined },
    };

    return this.client.sendRequest(request, callback);
  }

  public async resetColumns(
    params: {
      id: number;
    },
    callback?: Callback,
  ): Promise<void> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/columns`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  public async addFilterAsFavorite(
    params: {
      id: number;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<Schemas.Filter> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/favourite`,
      method: 'PUT',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }

  public async removeFilterAsFavorite(
    params: {
      id: number;
      expand?: string;
    },
    callback?: Callback,
  ): Promise<Schemas.Filter> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/filter/${params.id}/favourite`,
      method: 'DELETE',
      params: {
        expand: params.expand,
      },
    };

    return this.client.sendRequest(request, callback);
  }
}
