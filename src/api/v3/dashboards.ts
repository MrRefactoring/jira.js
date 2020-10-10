import { AxiosRequestConfig } from 'axios';
import { Client } from '../../client';
import { Callback } from '../../callback';
import {
  PageOfDashboards as PageOfDashboardsResponse, Dashboard as DashboardResponse, PageBeanDashboard as PageBeanDashboardResponse, PropertyKeys as PropertyKeysResponse, EntityProperty as EntityPropertyResponse,
} from '../../models/v3';

export class Dashboards {
  constructor(private readonly client: Client) { }

  async getAllDashboards(parameters?: {
    filter?: string;
    startAt?: number;
    maxResults?: number;
  }, callback?: Callback<PageOfDashboardsResponse>): Promise<PageOfDashboardsResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/dashboard',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async createDashboard(parameters?: any, callback?: Callback<DashboardResponse>): Promise<DashboardResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/dashboard',
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDashboardsPaginated(parameters?: {
    dashboardName?: string;
    accountId?: string;
    owner?: string;
    groupname?: string;
    projectId?: number;
    orderBy?: string;
    startAt?: number;
    maxResults?: number;
    expand?: string;
  }, callback?: Callback<PageBeanDashboardResponse>): Promise<PageBeanDashboardResponse> {
    const request: AxiosRequestConfig = {
      url: '/rest/api/3/dashboard/search',
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDashboardItemPropertyKeys(parameters: {
    dashboardId: string;
    itemId: string;
  }, callback?: Callback<PropertyKeysResponse>): Promise<PropertyKeysResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDashboardItemProperty(parameters: {
    dashboardId: string;
    itemId: string;
    propertyKey: string;
  }, callback?: Callback<EntityPropertyResponse>): Promise<EntityPropertyResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async setDashboardItemProperty(parameters: {
    dashboardId: string;
    itemId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteDashboardItemProperty(parameters: {
    dashboardId: string;
    itemId: string;
    propertyKey: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async getDashboard(parameters: {
    id: string;
  }, callback?: Callback<DashboardResponse>): Promise<DashboardResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request, callback);
  }

  async updateDashboard(parameters: {
    id: string;
  }, callback?: Callback<DashboardResponse>): Promise<DashboardResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.id}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request, callback);
  }

  async deleteDashboard(parameters: {
    id: string;
  }, callback?: Callback<any>): Promise<any> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request, callback);
  }

  async copyDashboard(parameters: {
    id: string;
  }, callback?: Callback<DashboardResponse>): Promise<DashboardResponse> {
    const request: AxiosRequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.id}/copy`,
      method: 'POST',
    };

    return this.client.sendRequest(request, callback);
  }
}
