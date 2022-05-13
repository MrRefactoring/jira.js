import * as Models from './models';
import * as Parameters from './parameters';
import { Callback } from '../callback';
import { Client } from '../clients';
import { RequestConfig } from '../requestConfig';

export class Dashboards {
  constructor(private client: Client) {}

  /**
   * Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or
   * owned dashboards.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAllDashboards<T = Models.PageOfDashboards>(
    parameters: Parameters.GetAllDashboards | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or
   * owned dashboards.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAllDashboards<T = Models.PageOfDashboards>(
    parameters?: Parameters.GetAllDashboards,
    callback?: never
  ): Promise<T>;
  async getAllDashboards<T = Models.PageOfDashboards>(
    parameters?: Parameters.GetAllDashboards,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/dashboard',
      method: 'GET',
      params: {
        filter: parameters?.filter,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Creates a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async createDashboard<T = Models.Dashboard>(
    parameters: Parameters.CreateDashboard | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Creates a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async createDashboard<T = Models.Dashboard>(parameters?: Parameters.CreateDashboard, callback?: never): Promise<T>;
  async createDashboard<T = Models.Dashboard>(
    parameters?: Parameters.CreateDashboard,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/dashboard',
      method: 'POST',
      data: {
        name: parameters?.name,
        description: parameters?.description,
        sharePermissions: parameters?.sharePermissions,
        editPermissions: parameters?.editPermissions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Gets a list of all available gadgets that can be added to all dashboards.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAllAvailableDashboardGadgets<T = Models.AvailableDashboardGadgetsResponse>(
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Gets a list of all available gadgets that can be added to all dashboards.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAllAvailableDashboardGadgets<T = Models.AvailableDashboardGadgetsResponse>(callback?: never): Promise<T>;
  async getAllAvailableDashboardGadgets<T = Models.AvailableDashboardGadgetsResponse>(
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/dashboard/gadgets',
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * dashboards. This operation is similar to [Get dashboards](#api-rest-api-3-dashboard-get) except that the results
   * can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name.
   * When multiple attributes are specified only filters matching all attributes are returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * following dashboards that match the query parameters are returned:
   *
   * - Dashboards owned by the user. Not returned for anonymous users.
   * - Dashboards shared with a group that the user is a member of. Not returned for anonymous users.
   * - Dashboards shared with a private project that the user can browse. Not returned for anonymous users.
   * - Dashboards shared with a public project.
   * - Dashboards shared with the public.
   */
  async getDashboardsPaginated<T = Models.PageDashboard>(
    parameters: Parameters.GetDashboardsPaginated | undefined,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#pagination) list of
   * dashboards. This operation is similar to [Get dashboards](#api-rest-api-3-dashboard-get) except that the results
   * can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name.
   * When multiple attributes are specified only filters matching all attributes are returned.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * following dashboards that match the query parameters are returned:
   *
   * - Dashboards owned by the user. Not returned for anonymous users.
   * - Dashboards shared with a group that the user is a member of. Not returned for anonymous users.
   * - Dashboards shared with a private project that the user can browse. Not returned for anonymous users.
   * - Dashboards shared with a public project.
   * - Dashboards shared with the public.
   */
  async getDashboardsPaginated<T = Models.PageDashboard>(
    parameters?: Parameters.GetDashboardsPaginated,
    callback?: never
  ): Promise<T>;
  async getDashboardsPaginated<T = Models.PageDashboard>(
    parameters?: Parameters.GetDashboardsPaginated,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: '/rest/api/3/dashboard/search',
      method: 'GET',
      params: {
        dashboardName: parameters?.dashboardName,
        accountId: parameters?.accountId,
        owner: parameters?.owner,
        groupname: parameters?.groupname,
        groupId: parameters?.groupId,
        projectId: parameters?.projectId,
        orderBy: parameters?.orderBy,
        startAt: parameters?.startAt,
        maxResults: parameters?.maxResults,
        status: parameters?.status,
        expand: parameters?.expand,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a list of dashboard gadgets on a dashboard.
   *
   * This operation returns:
   *
   * - Gadgets from a list of IDs, when `id` is set.
   * - Gadgets with a module key, when `moduleKey` is set.
   * - Gadgets from a list of URIs, when `uri` is set.
   * - All gadgets, when no other parameters are set.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAllGadgets<T = Models.DashboardGadgetResponse>(
    parameters: Parameters.GetAllGadgets,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns a list of dashboard gadgets on a dashboard.
   *
   * This operation returns:
   *
   * - Gadgets from a list of IDs, when `id` is set.
   * - Gadgets with a module key, when `moduleKey` is set.
   * - Gadgets from a list of URIs, when `uri` is set.
   * - All gadgets, when no other parameters are set.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async getAllGadgets<T = Models.DashboardGadgetResponse>(
    parameters: Parameters.GetAllGadgets,
    callback?: never
  ): Promise<T>;
  async getAllGadgets<T = Models.DashboardGadgetResponse>(
    parameters: Parameters.GetAllGadgets,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/gadget`,
      method: 'GET',
      params: {
        moduleKey: parameters.moduleKey,
        uri: parameters.uri,
        gadgetId: parameters.gadgetId,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Adds a gadget to a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async addGadget<T = Models.DashboardGadget>(parameters: Parameters.AddGadget, callback: Callback<T>): Promise<void>;
  /**
   * Adds a gadget to a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async addGadget<T = Models.DashboardGadget>(parameters: Parameters.AddGadget, callback?: never): Promise<T>;
  async addGadget<T = Models.DashboardGadget>(
    parameters: Parameters.AddGadget,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/gadget`,
      method: 'POST',
      data: {
        moduleKey: parameters.moduleKey,
        uri: parameters.uri,
        color: parameters.color,
        position: parameters.position,
        title: parameters.title,
        ignoreUriAndModuleKeyValidation: parameters.ignoreUriAndModuleKeyValidation,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Changes the title, position, and color of the gadget on a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async updateGadget<T = void>(parameters: Parameters.UpdateGadget, callback: Callback<T>): Promise<void>;
  /**
   * Changes the title, position, and color of the gadget on a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async updateGadget<T = void>(parameters: Parameters.UpdateGadget, callback?: never): Promise<T>;
  async updateGadget<T = void>(parameters: Parameters.UpdateGadget, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/gadget/${parameters.gadgetId}`,
      method: 'PUT',
      data: {
        title: parameters.title,
        color: parameters.color,
        position: parameters.position,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Removes a dashboard gadget from a dashboard.
   *
   * When a gadget is removed from a dashboard, other gadgets in the same column are moved up to fill the emptied position.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async removeGadget<T = void>(parameters: Parameters.RemoveGadget, callback: Callback<T>): Promise<void>;
  /**
   * Removes a dashboard gadget from a dashboard.
   *
   * When a gadget is removed from a dashboard, other gadgets in the same column are moved up to fill the emptied position.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   */
  async removeGadget<T = void>(parameters: Parameters.RemoveGadget, callback?: never): Promise<T>;
  async removeGadget<T = void>(parameters: Parameters.RemoveGadget, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/gadget/${parameters.gadgetId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the keys of all properties for a dashboard item.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * user must be the owner of the dashboard or have the dashboard shared with them. Note, users with the _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   * The System dashboard is considered to be shared with all other users, and is accessible to anonymous users when
   * Jira’s anonymous access is permitted.
   */
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetDashboardItemPropertyKeys,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the keys of all properties for a dashboard item.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * user must be the owner of the dashboard or have the dashboard shared with them. Note, users with the _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   * The System dashboard is considered to be shared with all other users, and is accessible to anonymous users when
   * Jira’s anonymous access is permitted.
   */
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetDashboardItemPropertyKeys,
    callback?: never
  ): Promise<T>;
  async getDashboardItemPropertyKeys<T = Models.PropertyKeys>(
    parameters: Parameters.GetDashboardItemPropertyKeys,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns the key and value of a dashboard item property.
   *
   * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed
   * to users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding
   * and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   *
   * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires
   * whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this
   * resource to store the item's content or configuration details. For more information on working with dashboard
   * items, see [ Building a dashboard item for a JIRA Connect
   * add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/)
   * and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
   *
   * There is no resource to set or get dashboard items.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * user must be the owner of the dashboard or have the dashboard shared with them. Note, users with the _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   * The System dashboard is considered to be shared with all other users, and is accessible to anonymous users when
   * Jira’s anonymous access is permitted.
   */
  async getDashboardItemProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetDashboardItemProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Returns the key and value of a dashboard item property.
   *
   * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed
   * to users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding
   * and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   *
   * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires
   * whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this
   * resource to store the item's content or configuration details. For more information on working with dashboard
   * items, see [ Building a dashboard item for a JIRA Connect
   * add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/)
   * and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
   *
   * There is no resource to set or get dashboard items.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * user must be the owner of the dashboard or have the dashboard shared with them. Note, users with the _Administer
   * Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   * The System dashboard is considered to be shared with all other users, and is accessible to anonymous users when
   * Jira’s anonymous access is permitted.
   */
  async getDashboardItemProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetDashboardItemProperty,
    callback?: never
  ): Promise<T>;
  async getDashboardItemProperty<T = Models.EntityProperty>(
    parameters: Parameters.GetDashboardItemProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard item.
   *
   * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed
   * to users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding
   * and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   *
   * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires
   * whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this
   * resource to store the item's content or configuration details. For more information on working with dashboard
   * items, see [ Building a dashboard item for a JIRA Connect
   * add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/)
   * and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
   *
   * There is no resource to set or get dashboard items.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * user must be the owner of the dashboard. Note, users with the _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   */
  async setDashboardItemProperty<T = unknown>(
    parameters: Parameters.SetDashboardItemProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard item.
   *
   * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed
   * to users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding
   * and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   *
   * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires
   * whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this
   * resource to store the item's content or configuration details. For more information on working with dashboard
   * items, see [ Building a dashboard item for a JIRA Connect
   * add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/)
   * and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
   *
   * There is no resource to set or get dashboard items.
   *
   * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   * maximum length is 32768 characters.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * user must be the owner of the dashboard. Note, users with the _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   */
  async setDashboardItemProperty<T = unknown>(
    parameters: Parameters.SetDashboardItemProperty,
    callback?: never
  ): Promise<T>;
  async setDashboardItemProperty<T = unknown>(
    parameters: Parameters.SetDashboardItemProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a dashboard item property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * user must be the owner of the dashboard. Note, users with the _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   */
  async deleteDashboardItemProperty<T = void>(
    parameters: Parameters.DeleteDashboardItemProperty,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Deletes a dashboard item property.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** The
   * user must be the owner of the dashboard. Note, users with the _Administer Jira_ [global
   * permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   */
  async deleteDashboardItemProperty<T = void>(
    parameters: Parameters.DeleteDashboardItemProperty,
    callback?: never
  ): Promise<T>;
  async deleteDashboardItemProperty<T = void>(
    parameters: Parameters.DeleteDashboardItemProperty,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Returns a dashboard.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   *
   * However, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with
   * the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the
   * System dashboard. The System dashboard is considered to be shared with all other users.
   */
  async getDashboard<T = Models.Dashboard>(parameters: Parameters.GetDashboard, callback: Callback<T>): Promise<void>;
  /**
   * Returns a dashboard.
   *
   * This operation can be accessed anonymously.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None.
   *
   * However, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with
   * the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the
   * System dashboard. The System dashboard is considered to be shared with all other users.
   */
  async getDashboard<T = Models.Dashboard>(parameters: Parameters.GetDashboard, callback?: never): Promise<T>;
  async getDashboard<T = Models.Dashboard>(
    parameters: Parameters.GetDashboard,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Updates a dashboard, replacing all the dashboard details with those provided.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None
   *
   * The dashboard to be updated must be owned by the user.
   */
  async updateDashboard<T = Models.Dashboard>(
    parameters: Parameters.UpdateDashboard,
    callback: Callback<T>
  ): Promise<void>;
  /**
   * Updates a dashboard, replacing all the dashboard details with those provided.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None
   *
   * The dashboard to be updated must be owned by the user.
   */
  async updateDashboard<T = Models.Dashboard>(parameters: Parameters.UpdateDashboard, callback?: never): Promise<T>;
  async updateDashboard<T = Models.Dashboard>(
    parameters: Parameters.UpdateDashboard,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.id}`,
      method: 'PUT',
      data: {
        name: parameters.name,
        description: parameters.description,
        sharePermissions: parameters.sharePermissions,
        editPermissions: parameters.editPermissions,
      },
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Deletes a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None
   *
   * The dashboard to be deleted must be owned by the user.
   */
  async deleteDashboard<T = void>(parameters: Parameters.DeleteDashboard, callback: Callback<T>): Promise<void>;
  /**
   * Deletes a dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None
   *
   * The dashboard to be deleted must be owned by the user.
   */
  async deleteDashboard<T = void>(parameters: Parameters.DeleteDashboard, callback?: never): Promise<T>;
  async deleteDashboard<T = void>(parameters: Parameters.DeleteDashboard, callback?: Callback<T>): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(config, callback);
  }

  /**
   * Copies a dashboard. Any values provided in the `dashboard` parameter replace those in the copied dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None
   *
   * The dashboard to be copied must be owned by or shared with the user.
   */
  async copyDashboard<T = Models.Dashboard>(parameters: Parameters.CopyDashboard, callback: Callback<T>): Promise<void>;
  /**
   * Copies a dashboard. Any values provided in the `dashboard` parameter replace those in the copied dashboard.
   *
   * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/#permissions) required:** None
   *
   * The dashboard to be copied must be owned by or shared with the user.
   */
  async copyDashboard<T = Models.Dashboard>(parameters: Parameters.CopyDashboard, callback?: never): Promise<T>;
  async copyDashboard<T = Models.Dashboard>(
    parameters: Parameters.CopyDashboard,
    callback?: Callback<T>,
  ): Promise<void | T> {
    const config: RequestConfig = {
      url: `/rest/api/3/dashboard/${parameters.id}/copy`,
      method: 'POST',
      data: {
        name: parameters.name,
        description: parameters.description,
        sharePermissions: parameters.sharePermissions,
        editPermissions: parameters.editPermissions,
      },
    };

    return this.client.sendRequest(config, callback);
  }
}
