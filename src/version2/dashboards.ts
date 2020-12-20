import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Dashboards {
  constructor(private client: Client) { }
  async getAllDashboards<T = Models.PageOfDashboards>(parameters?: Parameters.GetAllDashboards, callback?: Callback<T>): Promise<void>;
  async getAllDashboards<T = Models.PageOfDashboards>(parameters?: Parameters.GetAllDashboards, callback?: undefined): Promise<T>;
  async getAllDashboards<T = Models.PageOfDashboards>(parameters?: Parameters.GetAllDashboards, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/dashboard',
      method: 'GET',
      params: {
        filter: parameters?.filter,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async createDashboard<T = Models.Dashboard>(parameters?: Parameters.CreateDashboard, callback?: Callback<T>): Promise<void>;
  async createDashboard<T = Models.Dashboard>(parameters?: Parameters.CreateDashboard, callback?: undefined): Promise<T>;
  async createDashboard<T = Models.Dashboard>(parameters?: Parameters.CreateDashboard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/dashboard',
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters?: Parameters.GetDashboardsPaginated, callback?: Callback<T>): Promise<void>;
  async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters?: Parameters.GetDashboardsPaginated, callback?: undefined): Promise<T>;
  async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters?: Parameters.GetDashboardsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: '/rest/api/2/dashboard/search',
      method: 'GET',
      params: {
        dashboardName: parameters?.dashboardName,
        accountId: parameters?.accountId,
        owner: parameters?.owner,
        groupname: parameters?.groupname,
        projectId: parameters?.projectId,
        orderBy: parameters?.orderBy,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        expand: parameters?.expand,
      },
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetDashboardItemPropertyKeys, callback: Callback<T>): Promise<void>;
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetDashboardItemPropertyKeys, callback?: undefined): Promise<T>;
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetDashboardItemPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDashboardItemProperty<T = Models.EntityProperty>(parameters: Parameters.GetDashboardItemProperty, callback: Callback<T>): Promise<void>;
  async getDashboardItemProperty<T = Models.EntityProperty>(parameters: Parameters.GetDashboardItemProperty, callback?: undefined): Promise<T>;
  async getDashboardItemProperty<T = Models.EntityProperty>(parameters: Parameters.GetDashboardItemProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async setDashboardItemProperty<T = any>(parameters: Parameters.SetDashboardItemProperty, callback: Callback<T>): Promise<void>;
  async setDashboardItemProperty<T = any>(parameters: Parameters.SetDashboardItemProperty, callback?: undefined): Promise<T>;
  async setDashboardItemProperty<T = any>(parameters: Parameters.SetDashboardItemProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteDashboardItemProperty<T = any>(parameters: Parameters.DeleteDashboardItemProperty, callback: Callback<T>): Promise<void>;
  async deleteDashboardItemProperty<T = any>(parameters: Parameters.DeleteDashboardItemProperty, callback?: undefined): Promise<T>;
  async deleteDashboardItemProperty<T = any>(parameters: Parameters.DeleteDashboardItemProperty, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async getDashboard<T = Models.Dashboard>(parameters: Parameters.GetDashboard, callback: Callback<T>): Promise<void>;
  async getDashboard<T = Models.Dashboard>(parameters: Parameters.GetDashboard, callback?: undefined): Promise<T>;
  async getDashboard<T = Models.Dashboard>(parameters: Parameters.GetDashboard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'GET',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async updateDashboard<T = Models.Dashboard>(parameters: Parameters.UpdateDashboard, callback: Callback<T>): Promise<void>;
  async updateDashboard<T = Models.Dashboard>(parameters: Parameters.UpdateDashboard, callback?: undefined): Promise<T>;
  async updateDashboard<T = Models.Dashboard>(parameters: Parameters.UpdateDashboard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'PUT',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async deleteDashboard<T = any>(parameters: Parameters.DeleteDashboard, callback: Callback<T>): Promise<void>;
  async deleteDashboard<T = any>(parameters: Parameters.DeleteDashboard, callback?: undefined): Promise<T>;
  async deleteDashboard<T = any>(parameters: Parameters.DeleteDashboard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'DELETE',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
  async copyDashboard<T = Models.Dashboard>(parameters: Parameters.CopyDashboard, callback: Callback<T>): Promise<void>;
  async copyDashboard<T = Models.Dashboard>(parameters: Parameters.CopyDashboard, callback?: undefined): Promise<T>;
  async copyDashboard<T = Models.Dashboard>(parameters: Parameters.CopyDashboard, callback?: Callback<T>): Promise<void | T> {
    const config = ({
      url: `/rest/api/2/dashboard/${parameters.id}/copy`,
      method: 'POST',
    } as RequestConfig);

    return this.client.sendRequest(config, callback);
  }
}
