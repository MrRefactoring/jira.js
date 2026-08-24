import { ServiceDeskSchema, type ServiceDesk } from '../models/serviceDesk';
import { PagedServiceDeskSchema } from '../models/pagedServiceDesk';
import type { Page } from '../models/page';
import type { GetServiceDeskById } from '../parameters/getServiceDeskById';
import type { GetServiceDesks } from '../parameters/getServiceDesks';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns the service project for a given service project Id. */
export async function getServiceDeskById(
  client: Client,
  parameters: GetServiceDeskById,
  options?: RequestOptions,
): Promise<ServiceDesk> {
  const config: SendRequestOptions<ServiceDesk> = {
    url: `/rest/servicedeskapi/servicedesk/${parameters.serviceDeskId}`,
    method: 'GET',
    schema: ServiceDeskSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns all service projects in the Jira Service Management application with the option to include archived service
 * projects.
 */
export async function getServiceDesks(
  client: Client,
  parameters?: GetServiceDesks,
  options?: RequestOptions,
): Promise<Page<ServiceDesk>> {
  const config: SendRequestOptions<Page<ServiceDesk>> = {
    url: '/rest/servicedeskapi/servicedesk',
    method: 'GET',
    searchParams: {
      includeArchived: parameters?.includeArchived,
      start: parameters?.start,
      limit: parameters?.limit,
    },
    schema: PagedServiceDeskSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
