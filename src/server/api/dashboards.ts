import { DashboardsSchema, type Dashboards } from '../models/dashboards';
import { EntityPropertiesKeysSchema, type EntityPropertiesKeys } from '../models/entityPropertiesKeys';
import { EntityPropertySchema, type EntityProperty } from '../models/entityProperty';
import { DashboardSchema, type Dashboard } from '../models/dashboard';
import type { List } from '../parameters/list';
import type { GetDashboardItemPropertyKeys } from '../parameters/getDashboardItemPropertyKeys';
import type { GetDashboardItemProperty } from '../parameters/getDashboardItemProperty';
import type { SetDashboardItemProperty } from '../parameters/setDashboardItemProperty';
import type { DeleteDashboardItemProperty } from '../parameters/deleteDashboardItemProperty';
import type { GetDashboard } from '../parameters/getDashboard';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns a list of all dashboards, optionally filtering them. */
export async function list(client: Client, parameters?: List, options?: RequestOptions): Promise<Dashboards> {
  const config: SendRequestOptions<Dashboards> = {
    url: '/rest/api/2/dashboard',
    method: 'GET',
    searchParams: {
      filter: parameters?.filter,
      maxResults: parameters?.maxResults,
      startAt: parameters?.startAt,
    },
    schema: DashboardsSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the keys of all properties for the dashboard item identified by the id. */
export async function getDashboardItemPropertyKeys(
  client: Client,
  parameters: GetDashboardItemPropertyKeys,
  options?: RequestOptions,
): Promise<EntityPropertiesKeys> {
  const config: SendRequestOptions<EntityPropertiesKeys> = {
    url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties`,
    method: 'GET',
    schema: EntityPropertiesKeysSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the value of the property with a given key from the dashboard item identified by the id. */
export async function getDashboardItemProperty(
  client: Client,
  parameters: GetDashboardItemProperty,
  options?: RequestOptions,
): Promise<EntityProperty> {
  const config: SendRequestOptions<EntityProperty> = {
    url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
    method: 'GET',
    schema: EntityPropertySchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Sets the value of the property with a given key on the dashboard item identified by the id. */
export async function setDashboardItemProperty(
  client: Client,
  parameters: SetDashboardItemProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
    method: 'PUT',
    body: parameters.body,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Removes the property from the dashboard item identified by the key or by the id. */
export async function deleteDashboardItemProperty(
  client: Client,
  parameters: DeleteDashboardItemProperty,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/api/2/dashboard/${parameters.dashboardId}/items/${parameters.itemId}/properties/${parameters.propertyKey}`,
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns a single dashboard. */
export async function getDashboard(
  client: Client,
  parameters: GetDashboard,
  options?: RequestOptions,
): Promise<Dashboard> {
  const config: SendRequestOptions<Dashboard> = {
    url: `/rest/api/2/dashboard/${parameters.id}`,
    method: 'GET',
    schema: DashboardSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
