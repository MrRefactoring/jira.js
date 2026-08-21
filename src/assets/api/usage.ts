import { TenantUsageResponseSchema, type TenantUsageResponse } from '../models/tenantUsageResponse';
import type { Client, SendRequestOptions } from '#/core';

/**
 * Retrieves comprehensive usage statistics for the current tenant including total object counts and a per-schema
 * breakdown for billing and analytics.
 */
export async function getTenantUsageInfo(client: Client): Promise<TenantUsageResponse> {
  const config: SendRequestOptions<TenantUsageResponse> = {
    url: '/usage',
    method: 'GET',
    schema: TenantUsageResponseSchema,
  };

  return await client.sendRequest(config);
}
