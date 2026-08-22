import { PortalSchema, type Portal } from '../models/portal';
import { PagedPortalSchema } from '../models/pagedPortal';
import type { Page } from '../models/page';
import type { GetPortal } from '../parameters/getPortal';
import type { GetPortalByProjectKey } from '../parameters/getPortalByProjectKey';
import type { GetPortals } from '../parameters/getPortals';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Get a portal with the specified ID. */
export async function getPortal(client: Client, parameters: GetPortal, options?: RequestOptions): Promise<Portal> {
  const config: SendRequestOptions<Portal> = {
    url: `/rest/servicedeskapi/portals/${parameters.portalId}`,
    method: 'GET',
    schema: PortalSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get a portal for the project by key. */
export async function getPortalByProjectKey(
  client: Client,
  parameters: GetPortalByProjectKey,
  options?: RequestOptions,
): Promise<Portal> {
  const config: SendRequestOptions<Portal> = {
    url: `/rest/servicedeskapi/portals/project/${parameters.projectKey}`,
    method: 'GET',
    schema: PortalSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Get all portals. Returns a maximum of 50 portals per page. */
export async function getPortals(
  client: Client,
  parameters?: GetPortals,
  options?: RequestOptions,
): Promise<Page<Portal>> {
  const config: SendRequestOptions<Page<Portal>> = {
    url: '/rest/servicedeskapi/portals',
    method: 'GET',
    searchParams: {
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: PagedPortalSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
