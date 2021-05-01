import * as Models from './models';
import * as Parameters from './parameters';
import { Client } from '../clients';
import { Callback } from '../callback';
import { RequestConfig } from '../requestConfig';

export class Dashboards {
  constructor(private client: Client) {
  }

  /**
   * Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or owned dashboards.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async getAllDashboards<T = Models.PageOfDashboards>(parameters: Parameters.GetAllDashboards | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or owned dashboards.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async getAllDashboards<T = Models.PageOfDashboards>(parameters?: Parameters.GetAllDashboards, callback?: never): Promise<T>;
  async getAllDashboards<T = Models.PageOfDashboards>(parameters?: Parameters.GetAllDashboards, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/dashboard',
      method: 'GET',
      params: {
        filter: parameters?.filter,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getAllDashboards' });
  }

  /**
   * Creates a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async createDashboard<T = Models.Dashboard>(parameters: Parameters.CreateDashboard | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Creates a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None. */
  async createDashboard<T = Models.Dashboard>(parameters?: Parameters.CreateDashboard, callback?: never): Promise<T>;
  async createDashboard<T = Models.Dashboard>(parameters?: Parameters.CreateDashboard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/2/dashboard',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        sharePermissions: parameters?.sharePermissions,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.createDashboard' });
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of dashboards. This operation is similar to [Get dashboards](#api-rest-api-2-dashboard-get) except that the results can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name. When multiple attributes are specified only filters matching all attributes are returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The following dashboards that match the query parameters are returned:
   *
   *  *  Dashboards owned by the user. Not returned for anonymous users.
   *  *  Dashboards shared with a group that the user is a member of. Not returned for anonymous users.
   *  *  Dashboards shared with a private project that the user can browse. Not returned for anonymous users.
   *  *  Dashboards shared with a public project.
   *  *  Dashboards shared with the public. */
  async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters: Parameters.GetDashboardsPaginated | undefined, callback: Callback<T>): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of dashboards. This operation is similar to [Get dashboards](#api-rest-api-2-dashboard-get) except that the results can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name. When multiple attributes are specified only filters matching all attributes are returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The following dashboards that match the query parameters are returned:
   *
   *  *  Dashboards owned by the user. Not returned for anonymous users.
   *  *  Dashboards shared with a group that the user is a member of. Not returned for anonymous users.
   *  *  Dashboards shared with a private project that the user can browse. Not returned for anonymous users.
   *  *  Dashboards shared with a public project.
   *  *  Dashboards shared with the public. */
  async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters?: Parameters.GetDashboardsPaginated, callback?: never): Promise<T>;
  async getDashboardsPaginated<T = Models.PageBeanDashboard>(parameters?: Parameters.GetDashboardsPaginated, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
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
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getDashboardsPaginated' });
  }

  /**
   * Returns the keys of all properties for a dashboard item.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The user must be the owner of the dashboard or be shared the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users. */
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetDashboardItemPropertyKeys, callback: Callback<T>): Promise<void>;
  /**
   * Returns the keys of all properties for a dashboard item.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The user must be the owner of the dashboard or be shared the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users. */
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetDashboardItemPropertyKeys, callback?: never): Promise<T>;
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(parameters: Parameters.GetDashboardItemPropertyKeys, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getDashboardItemPropertyKeys' });
  }

  /**
   * Returns the key and value of a dashboard item property.
   *
   * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   *
   * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this resource to store the item's content or configuration details. For more information on working with dashboard items, see [ Building a dashboard item for a JIRA Connect add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/) and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
   *
   * There is no resource to set or get dashboard items.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The user must be the owner of the dashboard or be shared the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users. */
  async getDashboardItemProperty<T = Models.EntityProperty>(parameters: Parameters.GetDashboardItemProperty, callback: Callback<T>): Promise<void>;
  /**
   * Returns the key and value of a dashboard item property.
   *
   * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   *
   * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this resource to store the item's content or configuration details. For more information on working with dashboard items, see [ Building a dashboard item for a JIRA Connect add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/) and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
   *
   * There is no resource to set or get dashboard items.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The user must be the owner of the dashboard or be shared the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users. */
  async getDashboardItemProperty<T = Models.EntityProperty>(parameters: Parameters.GetDashboardItemProperty, callback?: never): Promise<T>;
  async getDashboardItemProperty<T = Models.EntityProperty>(parameters: Parameters.GetDashboardItemProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getDashboardItemProperty' });
  }

  /**
   * Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard item.
   *
   * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   *
   * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this resource to store the item's content or configuration details. For more information on working with dashboard items, see [ Building a dashboard item for a JIRA Connect add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/) and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
   *
   * There is no resource to set or get dashboard items.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The user must be the owner of the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. */
  async setDashboardItemProperty<T = unknown>(parameters: Parameters.SetDashboardItemProperty, callback: Callback<T>): Promise<void>;
  /**
   * Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard item.
   *
   * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   *
   * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this resource to store the item's content or configuration details. For more information on working with dashboard items, see [ Building a dashboard item for a JIRA Connect add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/) and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
   *
   * There is no resource to set or get dashboard items.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The user must be the owner of the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. */
  async setDashboardItemProperty<T = unknown>(parameters: Parameters.SetDashboardItemProperty, callback?: never): Promise<T>;
  async setDashboardItemProperty<T = unknown>(parameters: Parameters.SetDashboardItemProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.setDashboardItemProperty' });
  }

  /**
   * Deletes a dashboard item property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The user must be the owner of the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. */
  async deleteDashboardItemProperty<T = void>(parameters: Parameters.DeleteDashboardItemProperty, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a dashboard item property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The user must be the owner of the dashboard. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. */
  async deleteDashboardItemProperty<T = void>(parameters: Parameters.DeleteDashboardItemProperty, callback?: never): Promise<T>;
  async deleteDashboardItemProperty<T = void>(parameters: Parameters.DeleteDashboardItemProperty, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.deleteDashboardItemProperty' });
  }

  /**
   * Returns a dashboard.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   *
   * However, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users. */
  async getDashboard<T = Models.Dashboard>(parameters: Parameters.GetDashboard, callback: Callback<T>): Promise<void>;
  /**
   * Returns a dashboard.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   *
   * However, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with the *Administer Jira* [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard. The System dashboard is considered to be shared with all other users. */
  async getDashboard<T = Models.Dashboard>(parameters: Parameters.GetDashboard, callback?: never): Promise<T>;
  async getDashboard<T = Models.Dashboard>(parameters: Parameters.GetDashboard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.getDashboard' });
  }

  /**
   * Updates a dashboard, replacing all the dashboard details with those provided.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   *
   * The dashboard to be updated must be owned by the user. */
  async updateDashboard<T = Models.Dashboard>(parameters: Parameters.UpdateDashboard, callback: Callback<T>): Promise<void>;
  /**
   * Updates a dashboard, replacing all the dashboard details with those provided.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   *
   * The dashboard to be updated must be owned by the user. */
  async updateDashboard<T = Models.Dashboard>(parameters: Parameters.UpdateDashboard, callback?: never): Promise<T>;
  async updateDashboard<T = Models.Dashboard>(parameters: Parameters.UpdateDashboard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        sharePermissions: parameters.sharePermissions,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.updateDashboard' });
  }

  /**
   * Deletes a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   *
   * The dashboard to be deleted must be owned by the user. */
  async deleteDashboard<T = void>(parameters: Parameters.DeleteDashboard, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   *
   * The dashboard to be deleted must be owned by the user. */
  async deleteDashboard<T = void>(parameters: Parameters.DeleteDashboard, callback?: never): Promise<T>;
  async deleteDashboard<T = void>(parameters: Parameters.DeleteDashboard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.deleteDashboard' });
  }

  /**
   * Copies a dashboard. Any values provided in the `dashboard` parameter replace those in the copied dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   *
   * The dashboard to be copied must be owned by or shared with the user. */
  async copyDashboard<T = Models.Dashboard>(parameters: Parameters.CopyDashboard, callback: Callback<T>): Promise<void>;
  /**
   * Copies a dashboard. Any values provided in the `dashboard` parameter replace those in the copied dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   *
   * The dashboard to be copied must be owned by or shared with the user. */
  async copyDashboard<T = Models.Dashboard>(parameters: Parameters.CopyDashboard, callback?: never): Promise<T>;
  async copyDashboard<T = Models.Dashboard>(parameters: Parameters.CopyDashboard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/2/dashboard/${parameters.id}/copy`,
      method: 'POST',
      data: {
        name: parameters.name,
        description: parameters.description,
        sharePermissions: parameters.sharePermissions,
      },
    };

    return this.client.sendRequest(config, callback, { methodName: 'version2.dashboards.copyDashboard' });
  }
}
