import { SchemaStatsSchema, type SchemaStats } from '../models/schemaStats';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';
import { z } from 'zod';

/** Get the shape of the data held in each schema. */
export async function getSchemaAnalytics(client: Client, options?: RequestOptions): Promise<SchemaStats[]> {
  const config: SendRequestOptions<SchemaStats[]> = {
    url: '/rest/assets/1.0/analytics/schema',
    method: 'GET',
    schema: z.array(SchemaStatsSchema),
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
