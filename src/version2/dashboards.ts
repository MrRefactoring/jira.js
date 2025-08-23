import type { Client } from '../client';
import type { Request } from '../request';
import type { GetAllDashboardsParameters } from './parameters/getAllDashboardsParameters';
import type { CreateDashboardParameters } from './parameters/createDashboardParameters';
import type { BulkEditDashboardsParameters } from './parameters/bulkEditDashboardsParameters';
import type { GetDashboardsPaginatedParameters } from './parameters/getDashboardsPaginatedParameters';
import type { GetAllGadgetsParameters } from './parameters/getAllGadgetsParameters';
import type { AddGadgetParameters } from './parameters/addGadgetParameters';
import type { RemoveGadgetParameters } from './parameters/removeGadgetParameters';
import type { UpdateGadgetParameters } from './parameters/updateGadgetParameters';
import type { GetDashboardItemPropertyKeysParameters } from './parameters/getDashboardItemPropertyKeysParameters';
import type { DeleteDashboardItemPropertyParameters } from './parameters/deleteDashboardItemPropertyParameters';
import type { GetDashboardItemPropertyParameters } from './parameters/getDashboardItemPropertyParameters';
import type { SetDashboardItemPropertyParameters } from './parameters/setDashboardItemPropertyParameters';
import type { DeleteDashboardParameters } from './parameters/deleteDashboardParameters';
import type { GetDashboardParameters } from './parameters/getDashboardParameters';
import type { UpdateDashboardParameters } from './parameters/updateDashboardParameters';
import type { CopyDashboardParameters } from './parameters/copyDashboardParameters';

export class Dashboards {
  constructor(private client: Client) {}
  /**
   * Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or
   * owned dashboards. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllDashboards(parameters: GetAllDashboardsParameters) {
    const request: Request = {
      url: '/rest/api/2/dashboard',
      method: 'GET',
      query: {
        filter: parameters.filter,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Creates a dashboard. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async createDashboard(parameters: CreateDashboardParameters) {
    const request: Request = {
      url: '/rest/api/2/dashboard',
      method: 'POST',
      query: {
        extendAdminPermissions: parameters.extendAdminPermissions,
      },
      body: {
        description: parameters.description,
        editPermissions: parameters.editPermissions,
        name: parameters.name,
        sharePermissions: parameters.sharePermissions,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Bulk edit dashboards. Maximum number of dashboards to be edited at the same time is 100. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   * -
   * - The dashboards to be updated must be owned by the user, or the user must be an administrator.
   */
  async bulkEditDashboards(parameters: BulkEditDashboardsParameters) {
    const request: Request = {
      url: '/rest/api/2/dashboard/bulk/edit',
      method: 'PUT',
      body: {
        action: parameters.action,
        changeOwnerDetails: parameters.changeOwnerDetails,
        entityIds: parameters.entityIds,
        extendAdminPermissions: parameters.extendAdminPermissions,
        permissionDetails: parameters.permissionDetails,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Gets a list of all available gadgets that can be added to all dashboards. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllAvailableDashboardGadgets() {
    const request: Request = {
      url: '/rest/api/2/dashboard/gadgets',
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#pagination) list of
   * dashboards. This operation is similar to [Get dashboards](#api-rest-api-2-dashboard-get) except that the results
   * can be refined to include dashboards that have specific attributes. For example, dashboards with a particular name.
   * When multiple attributes are specified only filters matching all attributes are returned. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The
   *   following dashboards that match the query parameters are returned:
   * -
   * - - Dashboards owned by the user. Not returned for anonymous users.
   * - - Dashboards shared with a group that the user is a member of. Not returned for anonymous users.
   * - - Dashboards shared with a private project that the user can browse. Not returned for anonymous users.
   * - - Dashboards shared with a public project.
   * - - Dashboards shared with the public.
   */
  async getDashboardsPaginated(parameters: GetDashboardsPaginatedParameters) {
    const request: Request = {
      url: '/rest/api/2/dashboard/search',
      method: 'GET',
      query: {
        dashboardName: parameters.dashboardName,
        accountId: parameters.accountId,
        owner: parameters.owner,
        groupname: parameters.groupname,
        groupId: parameters.groupId,
        projectId: parameters.projectId,
        orderBy: parameters.orderBy,
        startAt: parameters.startAt,
        maxResults: parameters.maxResults,
        status: parameters.status,
        expand: parameters.expand,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a list of dashboard gadgets on a dashboard. *
   *
   * - This operation returns:
   * -
   * - - Gadgets from a list of IDs, when `id` is set.
   * - - Gadgets with a module key, when `moduleKey` is set.
   * - - Gadgets from a list of URIs, when `uri` is set.
   * - - All gadgets, when no other parameters are set.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async getAllGadgets(parameters: GetAllGadgetsParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/gadget`,
      method: 'GET',
      query: {
        moduleKey: parameters.moduleKey,
        uri: parameters.uri,
        gadgetId: parameters.gadgetId,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Adds a gadget to a dashboard. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async addGadget(parameters: AddGadgetParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/gadget`,
      method: 'POST',
      body: {
        color: parameters.color,
        ignoreUriAndModuleKeyValidation: parameters.ignoreUriAndModuleKeyValidation,
        moduleKey: parameters.moduleKey,
        position: parameters.position,
        title: parameters.title,
        uri: parameters.uri,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Removes a dashboard gadget from a dashboard. *
   *
   * - When a gadget is removed from a dashboard, other gadgets in the same column are moved up to fill the emptied
   *   position.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async removeGadget(parameters: RemoveGadgetParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/gadget/${parameters.gadgetId}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Changes the title, position, and color of the gadget on a dashboard. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   */
  async updateGadget(parameters: UpdateGadgetParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/gadget/${parameters.gadgetId}`,
      method: 'PUT',
      body: {
        color: parameters.color,
        position: parameters.position,
        title: parameters.title,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the keys of all properties for a dashboard item. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The
   *   user must be the owner of the dashboard or have the dashboard shared with them. Note, users with the _Administer
   *   Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System
   *   dashboard. The System dashboard is considered to be shared with all other users, and is accessible to anonymous
   *   users when Jira\u2019s anonymous access is permitted.
   */
  async getDashboardItemPropertyKeys(parameters: GetDashboardItemPropertyKeysParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a dashboard item property. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The
   *   user must be the owner of the dashboard. Note, users with the _Administer Jira_ [global
   *   permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   */
  async deleteDashboardItemProperty(parameters: DeleteDashboardItemPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns the key and value of a dashboard item property. *
   *
   * - A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed
   *   to users as gadgets that users can add to their dashboards. For more information on how users do this, see
   *   [Adding and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   * -
   * - When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires
   *   whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this
   *   resource to store the item's content or configuration details. For more information on working with dashboard
   *   items, see [ Building a dashboard item for a JIRA Connect
   *   add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/)
   *   and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/)
   *   documentation.
   * -
   * - There is no resource to set or get dashboard items.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The
   *   user must be the owner of the dashboard or have the dashboard shared with them. Note, users with the _Administer
   *   Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System
   *   dashboard. The System dashboard is considered to be shared with all other users, and is accessible to anonymous
   *   users when Jira\u2019s anonymous access is permitted.
   */
  async getDashboardItemProperty(parameters: GetDashboardItemPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard
   * item. *
   *
   * - A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed
   *   to users as gadgets that users can add to their dashboards. For more information on how users do this, see
   *   [Adding and customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
   * -
   * - When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires
   *   whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this
   *   resource to store the item's content or configuration details. For more information on working with dashboard
   *   items, see [ Building a dashboard item for a JIRA Connect
   *   add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/)
   *   and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/)
   *   documentation.
   * -
   * - There is no resource to set or get dashboard items.
   * -
   * - The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The
   *   maximum length is 32768 characters.
   * -
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** The
   *   user must be the owner of the dashboard. Note, users with the _Administer Jira_ [global
   *   permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System dashboard.
   */
  async setDashboardItemProperty(parameters: SetDashboardItemPropertyParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
      method: 'PUT',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Deletes a dashboard. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   * -
   * - The dashboard to be deleted must be owned by the user.
   */
  async deleteDashboard(parameters: DeleteDashboardParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'DELETE',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Returns a dashboard. *
   *
   * - This operation can be accessed anonymously.
   * -
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None.
   * -
   * - However, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with
   *   the _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the
   *   System dashboard. The System dashboard is considered to be shared with all other users.
   */
  async getDashboard(parameters: GetDashboardParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'GET',
    };

    return this.client.sendRequest(request);
  }

  /**
   * Updates a dashboard, replacing all the dashboard details with those provided. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   * -
   * - The dashboard to be updated must be owned by the user.
   */
  async updateDashboard(parameters: UpdateDashboardParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.id}`,
      method: 'PUT',
      query: {
        extendAdminPermissions: parameters.extendAdminPermissions,
      },
      body: {
        description: parameters.description,
        editPermissions: parameters.editPermissions,
        name: parameters.name,
        sharePermissions: parameters.sharePermissions,
      },
    };

    return this.client.sendRequest(request);
  }

  /**
   * Copies a dashboard. Any values provided in the `dashboard` parameter replace those in the copied dashboard. *
   *
   * - **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v2/intro/#permissions) required:** None
   * -
   * - The dashboard to be copied must be owned by or shared with the user.
   */
  async copyDashboard(parameters: CopyDashboardParameters) {
    const request: Request = {
      url: `/rest/api/2/dashboard/${parameters.id}/copy`,
      method: 'POST',
      query: {
        extendAdminPermissions: parameters.extendAdminPermissions,
      },
      body: {
        description: parameters.description,
        editPermissions: parameters.editPermissions,
        name: parameters.name,
        sharePermissions: parameters.sharePermissions,
      },
    };

    return this.client.sendRequest(request);
  }
}
