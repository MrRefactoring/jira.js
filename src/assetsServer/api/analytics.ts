import { SchemaStatsSchema, type SchemaStats } from '../models/schemaStats';
import type { Client, SendRequestOptions } from '#/core';

/** Get the shape of the data held in each schema. */
export async function getSchemaAnalytics(client: Client): Promise<SchemaStats> {
  const config: SendRequestOptions<SchemaStats> = {
    url: '/rest/assets/1.0/analytics/schema',
    method: 'GET',
    schema: SchemaStatsSchema,
  };

  return await client.sendRequest(config);
}
