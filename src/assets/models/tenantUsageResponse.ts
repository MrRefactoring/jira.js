import { z } from 'zod';
import { apiObject } from '#/core';
import { SchemaUsageInfoSchema } from './schemaUsageInfo';
/** Comprehensive usage statistics for a tenant. */

export const TenantUsageResponseSchema = apiObject({
  /** Total number of objects across all schemas in the tenant. */
  totalObjectsCount: z.number(),
  /** Per-schema breakdown of usage information. */
  perSchemaUsageInfo: z.array(SchemaUsageInfoSchema),
});

export type TenantUsageResponse = z.infer<typeof TenantUsageResponseSchema>;
