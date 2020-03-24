import { AxiosRequestConfig } from 'axios';
import { Sender } from '../sender';
import { Callback } from '../callback';
export class Dashboards {
  constructor(private readonly client: Sender) { }

  public async getAllDashboards(
    params?: {
      filter?: string;
      startAt?: number;
      maxResults?: number;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/dashboard',
      method: 'GET',
      params: {
        filter: params.filter,
        startAt: params.startAt,
        maxResults: params.maxResults
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async createDashboard(
    params?: {
      description?: string;
      name?: string;
      sharePermissions?: Array<any>;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/dashboard',
      method: 'POST',
      data: {
        description: params.description,
        name: params.name,
        sharePermissions: params.sharePermissions
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async searchForDashboards(
    params?: {
      dashboardName?: string;
      accountId?: string;
      owner?: string;
      groupname?: string;
      projectId?: number;
      orderBy?: string;
      startAt?: number;
      maxResults?: number;
      expand?: string;
    },
    callback?: Callback
  ): Promise<any> {
    params = params || {};
    const request: AxiosRequestConfig = {
      url: '/rest/api/2/dashboard/search',
      method: 'GET',
      params: {
        dashboardName: params.dashboardName,
        accountId: params.accountId,
        owner: params.owner,
        groupname: params.groupname,
        projectId: params.projectId,
        orderBy: params.orderBy,
        startAt: params.startAt,
        maxResults: params.maxResults,
        expand: params.expand
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async getDashboardItemPropertyKeys(
    params: {
      dashboardId: string;
      itemId: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/dashboard/${params.dashboardId}/items/${params.itemId}/properties`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getDashboardItemProperty(
    params: {
      dashboardId: string;
      itemId: string;
      propertyKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/dashboard/${params.dashboardId}/items/${params.itemId}/properties/${params.propertyKey}`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async setDashboardItemProperty(
    params: {
      dashboardId: string;
      itemId: string;
      propertyKey: string;
      [key: string]: any;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/dashboard/${params.dashboardId}/items/${params.itemId}/properties/${params.propertyKey}`,
      method: 'PUT',
      data: {
        ...params,
        dashboardId: undefined,
        itemId: undefined,
        propertyKey: undefined
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteDashboardItemProperty(
    params: {
      dashboardId: string;
      itemId: string;
      propertyKey: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/dashboard/${params.dashboardId}/items/${params.itemId}/properties/${params.propertyKey}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }

  public async getDashboard(
    params: {
      id: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/dashboard/${params.id}`,
      method: 'GET'
    };
    return this.client.sendRequest(request, callback);
  }

  public async updateDashboard(
    params: {
      id: string;
      description?: string;
      name?: string;
      sharePermissions?: Array<any>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/dashboard/${params.id}`,
      method: 'PUT',
      data: {
        description: params.description,
        name: params.name,
        sharePermissions: params.sharePermissions
      }
    };
    return this.client.sendRequest(request, callback);
  }

  public async deleteDashboard(
    params: {
      id: string;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/dashboard/${params.id}`,
      method: 'DELETE'
    };
    return this.client.sendRequest(request, callback);
  }

  public async copyDashboard(
    params: {
      id: string;
      description?: string;
      name?: string;
      sharePermissions?: Array<any>;
    },
    callback?: Callback
  ): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/2/dashboard/${params.id}/copy`,
      method: 'POST',
      data: {
        description: params.description,
        name: params.name,
        sharePermissions: params.sharePermissions
      }
    };
    return this.client.sendRequest(request, callback);
  }
}
