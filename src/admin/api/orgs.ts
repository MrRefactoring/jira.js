import { OrgPageSchema, type OrgPage } from '../models/orgPage';
import { OrgSchema, type Org } from '../models/org';
import type { GetOrgs } from '../parameters/getOrgs';
import type { GetOrgById } from '../parameters/getOrgById';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns a list of your organizations (based on your API key). */
export async function getOrgs(client: Client, parameters?: GetOrgs, options?: RequestOptions): Promise<OrgPage> {
  const config: SendRequestOptions<OrgPage> = {
    url: '/admin/v1/orgs',
    method: 'GET',
    searchParams: {
      cursor: parameters?.cursor,
    },
    schema: OrgPageSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Returns information about a single organization by ID
 *
 * #### Scopes
 *
 * **[Authorization scopes](/cloud/admin/scopes/) required:** `read:orgs:admin`
 */
export async function getOrgById(client: Client, parameters: GetOrgById, options?: RequestOptions): Promise<Org> {
  const config: SendRequestOptions<Org> = {
    url: `/admin/v1/orgs/${parameters.orgId}`,
    method: 'GET',
    schema: OrgSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
