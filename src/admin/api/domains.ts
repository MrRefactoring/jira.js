import { DomainPageSchema, type DomainPage } from '../models/domainPage';
import { DomainSchema, type Domain } from '../models/domain';
import type { GetDomains } from '../parameters/getDomains';
import type { GetDomainById } from '../parameters/getDomainById';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns a list of domains in an organization one page at a time.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:domains:admin`
 */
export async function getDomains(
  client: Client,
  parameters: GetDomains,
  options?: RequestOptions,
): Promise<DomainPage> {
  const config: SendRequestOptions<DomainPage> = {
    url: `/admin/v1/orgs/${parameters.orgId}/domains`,
    method: 'GET',
    searchParams: {
      cursor: parameters.cursor,
    },
    schema: DomainPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns information about a single verified domain by ID.
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:domains:admin`
 */
export async function getDomainById(
  client: Client,
  parameters: GetDomainById,
  options?: RequestOptions,
): Promise<Domain> {
  const config: SendRequestOptions<Domain> = {
    url: `/admin/v1/orgs/${parameters.orgId}/domains/${parameters.domainId}`,
    method: 'GET',
    schema: DomainSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
