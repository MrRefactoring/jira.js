import { z } from 'zod';
import { apiObject } from '#/core';

/** Usage statistics for a single object schema within the tenant. */
export const SchemaUsageInfoSchema = apiObject({
  /** The unique identifier of the schema. */
  schemaId: z.number(),
  /** The name of the schema. */
  schemaName: z.string(),
  /** The user-facing display name of the schema. */
  displayName: z.string().nullish(),
  /** The timestamp when the schema was created (ISO 8601). */
  schemaCreatedAt: z.coerce.date(),
  /** The number of objects in this schema. */
  objectCount: z.number(),
});

export type SchemaUsageInfo = z.infer<typeof SchemaUsageInfoSchema>;
