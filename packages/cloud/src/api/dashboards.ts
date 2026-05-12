import { PageOfDashboardsSchema, type PageOfDashboards } from '#/models/pageOfDashboards';
import { PageDashboardSchema, type PageDashboard } from '#/models/pageDashboard';
import { PropertyKeysSchema, type PropertyKeys } from '#/models/propertyKeys';
import { EntityPropertySchema, type EntityProperty } from '#/models/entityProperty';
import { DashboardSchema, type Dashboard } from '#/models/dashboard';
import { type GetAllDashboards } from '#/parameters/getAllDashboards';
import { type GetDashboardsPaginated } from '#/parameters/getDashboardsPaginated';
import { type GetDashboardItemPropertyKeys } from '#/parameters/getDashboardItemPropertyKeys';
import { type GetDashboardItemProperty } from '#/parameters/getDashboardItemProperty';
import { type SetDashboardItemProperty } from '#/parameters/setDashboardItemProperty';
import { type DeleteDashboardItemProperty } from '#/parameters/deleteDashboardItemProperty';
import { type GetDashboard } from '#/parameters/getDashboard';
import { type Client, type SendRequestOptions } from '@jira.js/base';

/**
 * Returns a list of dashboards owned by or shared with the user. The list may be filtered to include only favorite or
 * owned dashboards.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 */
export async function getAllDashboards(client: Client, parameters?: GetAllDashboards): Promise<PageOfDashboards> {
  const config: SendRequestOptions<PageOfDashboards> = {
    url: '/rest/api/3/dashboard',
    method: 'GET',
    searchParams: {
      filter: parameters?.filter,
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
    },
    schema: PageOfDashboardsSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns a [paginated](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#pagination) list of
 * dashboards. This operation is similar to [Get
 * dashboards](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-dashboard/#api-rest-api-3-dashboard-get)
 * except that the results can be refined to include dashboards that have specific attributes. For example, dashboards
 * with a particular name. When multiple attributes are specified only filters matching all attributes are returned.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** The
 * following dashboards that match the query parameters are returned:
 *
 * - Dashboards owned by the user. Not returned for anonymous users.
 * - Dashboards shared with a group that the user is a member of. Not returned for anonymous users.
 * - Dashboards shared with a private project that the user can browse. Not returned for anonymous users.
 * - Dashboards shared with a public project.
 * - Dashboards shared with the public.
 */
export async function getDashboardsPaginated(
  client: Client,
  parameters?: GetDashboardsPaginated,
): Promise<PageDashboard> {
  const config: SendRequestOptions<PageDashboard> = {
    url: '/rest/api/3/dashboard/search',
    method: 'GET',
    searchParams: {
      dashboardName: parameters?.dashboardName,
      accountId: parameters?.accountId,
      groupname: parameters?.groupname,
      groupId: parameters?.groupId,
      projectId: parameters?.projectId,
      orderBy: parameters?.orderBy,
      startAt: parameters?.startAt,
      maxResults: parameters?.maxResults,
      status: parameters?.status,
      expand: parameters?.expand,
    },
    schema: PageDashboardSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the keys of all properties for a dashboard item.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** The user
 * must have read permission of the dashboard or have the dashboard shared with them.
 */
export async function getDashboardItemPropertyKeys(
  client: Client,
  parameters: GetDashboardItemPropertyKeys,
): Promise<PropertyKeys> {
  const config: SendRequestOptions<PropertyKeys> = {
    url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
    method: 'GET',
    schema: PropertyKeysSchema,
  };

  return await client.sendRequest(config);
}

/**
 * Returns the key and value of a dashboard item property.
 *
 * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to
 * users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding and
 * customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
 *
 * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires
 * whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this
 * resource to store the item's content or configuration details. For more information on working with dashboard items,
 * see [ Building a dashboard item for a JIRA Connect
 * add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/)
 * and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
 *
 * There is no resource to set or get dashboard items.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** The user
 * must have read permission of the dashboard or have the dashboard shared with them.
 */
export async function getDashboardItemProperty(
  client: Client,
  parameters: GetDashboardItemProperty,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
  };

  return await client.sendRequest(config);
}

/**
 * Sets the value of a dashboard item property. Use this resource in apps to store custom data against a dashboard item.
 *
 * A dashboard item enables an app to add user-specific information to a user dashboard. Dashboard items are exposed to
 * users as gadgets that users can add to their dashboards. For more information on how users do this, see [Adding and
 * customizing gadgets](https://confluence.atlassian.com/x/7AeiLQ).
 *
 * When an app creates a dashboard item it registers a callback to receive the dashboard item ID. The callback fires
 * whenever the item is rendered or, where the item is configurable, the user edits the item. The app then uses this
 * resource to store the item's content or configuration details. For more information on working with dashboard items,
 * see [ Building a dashboard item for a JIRA Connect
 * add-on](https://developer.atlassian.com/server/jira/platform/guide-building-a-dashboard-item-for-a-jira-connect-add-on-33746254/)
 * and the [Dashboard Item](https://developer.atlassian.com/cloud/jira/platform/modules/dashboard-item/) documentation.
 *
 * There is no resource to set or get dashboard items.
 *
 * The value of the request body must be a [valid](http://tools.ietf.org/html/rfc4627), non-empty JSON blob. The maximum
 * length is 32768 characters.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** The user
 * must have edit permisson of the dashboard.
 */
export async function setDashboardItemProperty(client: Client, parameters: SetDashboardItemProperty): Promise<unknown> {
  const config: SendRequestOptions<unknown> = {
    url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
  };

  return await client.sendRequest(config);
}

/**
 * Deletes a dashboard item property.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** The user
 * must have edit permission of the dashboard.
 */
export async function deleteDashboardItemProperty(
  client: Client,
  parameters: DeleteDashboardItemProperty,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/3/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
  };

  return await client.sendRequest(config);
}

/**
 * Returns a dashboard.
 *
 * This operation can be accessed anonymously.
 *
 * **[Permissions](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro#permissions) required:** None.
 *
 * However, to get a dashboard, the dashboard must be shared with the user or the user must own it. Note, users with the
 * _Administer Jira_ [global permission](https://confluence.atlassian.com/x/x4dKLg) are considered owners of the System
 * dashboard. The System dashboard is considered to be shared with all other users.
 */
export async function getDashboard(client: Client, parameters: GetDashboard): Promise<Dashboard> {
  const config: SendRequestOptions<Dashboard> = {
    url: `/rest/api/3/dashboard/${parameters.id}`,
    method: 'GET',
    schema: DashboardSchema,
  };

  return await client.sendRequest(config);
}
