import { PagedOrganizationSchema } from '../models/pagedOrganization';
import type { Page } from '../models/page';
import type { Organization } from '../models/organization';
import type { GetServiceDeskOrganizations } from '../parameters/getServiceDeskOrganizations';
import type { AddOrganization } from '../parameters/addOrganization';
import type { RemoveOrganization } from '../parameters/removeOrganization';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns all organizations within a service project for a given service project id. */
export async function getServiceDeskOrganizations(
  client: Client,
  parameters: GetServiceDeskOrganizations,
  options?: RequestOptions,
): Promise<Page<Organization>> {
  const config: SendRequestOptions<Page<Organization>> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
    method: 'GET',
    searchParams: {
      start: parameters.start,
      limit: parameters.limit,
    },
    schema: PagedOrganizationSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Adds an organization to a service project for a given service project id and organization id. */
export async function addOrganization(
  client: Client,
  parameters: AddOrganization,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
    method: 'POST',
    body: {
      organizationId: parameters.organizationId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Removes an organization from a service project for a given service project id and organization id. */
export async function removeOrganization(
  client: Client,
  parameters: RemoveOrganization,
  options?: RequestOptions,
): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}/organization`,
    method: 'DELETE',
    body: {
      organizationId: parameters.organizationId,
    },
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
